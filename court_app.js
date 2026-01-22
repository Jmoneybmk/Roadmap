(() => {
  'use strict';
  const $ = (s) => document.querySelector(s);
  const clamp = (n,min,max)=>Math.max(min,Math.min(max,n));
  const PHASES = ['Prosecution','Defense','JudgeNotes','Verdict'];

  const state = {
    settings: {
      packKey:'anime', playerCount:3, players:['Host','Player 2','Player 3','','','','',''],
      roundsMax:5, modifierEvery:3, prosSeconds:120, defSeconds:120, judgeSeconds:60, alarmVolume:60
    },
    roundNow:1,
    phase:'Lobby',
    players:[], // {id,name,score}
    roles:{judge:null, prosecution:[], defense:[]},
    teamPoints:{prosecution:0, defense:0},
    used:{cases:[], modPros:[], modDef:[]},
    currentCase:null,
    currentModifier:null,
    timer:{phaseKey:'None', secondsLeft:0, running:false, interval:null, alarmInterval:null, alarmCtx:null, alarmOsc:null, alarmGain:null},
  };

  function fmtTime(secs){secs=Math.max(0,secs|0);return String(Math.floor(secs/60)).padStart(2,'0')+':'+String(secs%60).padStart(2,'0');}
  function getPack(){
    const packs=window.COURT_PACKS||{};
    return packs[state.settings.packKey] || packs.anime || {name:'Anime Court', cases:[], modifiers:{prosecution:[], defense:[]}};
  }
  function save(){try{localStorage.setItem('animeCourt_v3', JSON.stringify({
    settings:state.settings, roundNow:state.roundNow, phase:state.phase, players:state.players, roles:state.roles,
    teamPoints:state.teamPoints, used:state.used, currentCase:state.currentCase, currentModifier:state.currentModifier
  }))}catch(e){}}
  function load(){
    try{
      const raw=localStorage.getItem('animeCourt_v3'); if(!raw) return;
      const o=JSON.parse(raw);
      if(o.settings) Object.assign(state.settings,o.settings);
      Object.assign(state, {roundNow:o.roundNow||1, phase:o.phase||'Lobby', players:o.players||[], roles:o.roles||state.roles, teamPoints:o.teamPoints||state.teamPoints, used:o.used||state.used, currentCase:o.currentCase||null, currentModifier:o.currentModifier||null});
    }catch(e){}
  }

  function activeNames(){
    const n=clamp(parseInt(state.settings.playerCount,10)||2,2,8);
    return (state.settings.players||[]).slice(0,n).map((v,i)=> (String(v||'').trim()||`Player ${i+1}`));
  }
  function ensurePlayers(){
    const names=activeNames();
    state.players = names.map((name,i)=>({id:`p${i+1}`, name, score:(state.players[i]?.score||0)}));
  }

  function buildLobbyNameInputs(){
    const wrap=$('#nameFields'); if(!wrap) return;
    const n=clamp(parseInt($('#playerCount').value,10)||3,2,8);
    wrap.innerHTML='';
    for(let i=0;i<n;i++){
      const div=document.createElement('div'); div.className='namefield';
      const lab=document.createElement('label'); lab.textContent=`Player ${i+1} name`;
      const inp=document.createElement('input'); inp.type='text'; inp.value=state.settings.players[i]||''; inp.placeholder=`Player ${i+1}`;
      inp.addEventListener('input',()=>{state.settings.players[i]=inp.value;});
      div.appendChild(lab); div.appendChild(inp); wrap.appendChild(div);
    }
  }
  function updateLobbyReadout(){
    const pros=clamp(parseInt($('#prosSeconds').value,10)||120,10,3600);
    const def=clamp(parseInt($('#defSeconds').value,10)||120,10,3600);
    const judge=clamp(parseInt($('#judgeSeconds').value,10)||60,10,3600);
    $('#timersReadout').textContent=`Timers: Pros ${fmtTime(pros)} • Def ${fmtTime(def)} • Judge ${fmtTime(judge)}`;
  }

  function pickUnique(list, used){
    const avail=list.filter(x=>!used.includes(x.id));
    if(!avail.length) return null;
    return avail[Math.floor(Math.random()*avail.length)];
  }

  function newCase(auto=false){
    const pack=getPack(); const list=pack.cases||[];
    if(!list.length){state.currentCase=null; renderAll(); save(); return;}
    let pick=pickUnique(list,state.used.cases);
    if(!pick){ state.used.cases=[]; pick=pickUnique(list,state.used.cases) || list[0]; }
    state.currentCase={...pick}; state.used.cases.push(pick.id);
    state.currentModifier=null;
    if(!auto){ state.phase='Lobby'; stopAlarm(); stopTimer(true); }
    renderAll(); save();
  }

  function assignRoles(auto=false){
    ensurePlayers();
    const ids=state.players.map(p=>p.id).slice().sort(()=>Math.random()-0.5);
    const judge = ids.shift() || null;
    const pros=[], def=[];
    for(const pid of ids){
      if(pros.length===0) pros.push(pid);
      else if(def.length===0) def.push(pid);
      else if(pros.length<=def.length) pros.push(pid); else def.push(pid);
    }
    state.roles={judge, prosecution:pros, defense:def};
    if(!auto){ state.phase='Lobby'; stopAlarm(); stopTimer(true); }
    renderAll(); save();
  }

  function revealModifier(){
    const every=clamp(parseInt(state.settings.modifierEvery,10)||0,0,50);
    if(!every || (state.roundNow%every)!==0){ state.currentModifier=null; renderAll(); save(); return; }
    if(state.currentModifier) return;
    const pack=getPack();
    const side = Math.random()<0.5?'prosecution':'defense';
    const mods = side==='prosecution' ? (pack.modifiers?.prosecution||[]) : (pack.modifiers?.defense||[]);
    const used = side==='prosecution'? state.used.modPros : state.used.modDef;
    if(!mods.length){ state.currentModifier=null; renderAll(); save(); return; }
    let pick=pickUnique(mods,used);
    if(!pick){ if(side==='prosecution') state.used.modPros=[]; else state.used.modDef=[]; pick=pickUnique(mods,used) || mods[0]; }
    used.push(pick.id);
    state.currentModifier={side, text: pick.text};
    renderAll(); save();
  }

  function getPhaseSeconds(k){
    if(k==='Prosecution') return clamp(parseInt(state.settings.prosSeconds,10)||120,10,3600);
    if(k==='Defense') return clamp(parseInt(state.settings.defSeconds,10)||120,10,3600);
    if(k==='JudgeNotes') return clamp(parseInt(state.settings.judgeSeconds,10)||60,10,3600);
    return 0;
  }
  function setTimerForPhase(k){ state.timer.phaseKey=k; state.timer.secondsLeft=getPhaseSeconds(k); state.timer.running=false; updateTimerUI(); }
  function updateTimerUI(){ $('#timerPhase').textContent = state.timer.phaseKey==='None'?'Not started':state.timer.phaseKey; $('#timerValue').textContent=fmtTime(state.timer.secondsLeft); }

  function startTimer(){
    if(state.timer.running) return;
    if(state.timer.phaseKey==='None'||state.timer.secondsLeft<=0) return;
    state.timer.running=true;
    state.timer.interval=setInterval(()=>{
      state.timer.secondsLeft--; updateTimerUI();
      if(state.timer.secondsLeft<=0){ stopTimer(false); playAlarm(); }
    },1000);
  }
  function stopTimer(reset){
    if(state.timer.interval){ clearInterval(state.timer.interval); state.timer.interval=null; }
    state.timer.running=false;
    if(reset){ state.timer.secondsLeft=getPhaseSeconds(state.timer.phaseKey); updateTimerUI(); }
  }

  function playAlarm(){
    stopAlarm();
    try{
      const ctx=new (window.AudioContext||window.webkitAudioContext)();
      const osc=ctx.createOscillator(); const gain=ctx.createGain();
      osc.type='square'; osc.frequency.value=880;
      const vol=clamp(parseInt(state.settings.alarmVolume,10)||60,0,100);
      gain.gain.value=(vol/100)*0.18;
      osc.connect(gain); gain.connect(ctx.destination); osc.start();
      let on=true;
      state.timer.alarmCtx=ctx; state.timer.alarmOsc=osc; state.timer.alarmGain=gain;
      state.timer.alarmInterval=setInterval(()=>{on=!on; gain.gain.setValueAtTime(on?(vol/100)*0.18:0, ctx.currentTime);},220);
    }catch(e){}
  }
  function previewAlarm(){ playAlarm(); setTimeout(()=>stopAlarm(),1500); }
  function stopAlarm(){
    if(state.timer.alarmInterval){ clearInterval(state.timer.alarmInterval); state.timer.alarmInterval=null; }
    try{
      if(state.timer.alarmOsc){ state.timer.alarmOsc.stop(); state.timer.alarmOsc=null; }
      if(state.timer.alarmCtx){ state.timer.alarmCtx.close(); state.timer.alarmCtx=null; }
      state.timer.alarmGain=null;
    }catch(e){}
  }

  function startRound(){
    if(!state.currentCase) newCase(true);
    if(!state.roles.judge) assignRoles(true);
    state.phase='Prosecution'; setTimerForPhase('Prosecution'); stopAlarm(); stopTimer(true);
    renderAll(); save();
  }

  function nextPhase(){
    stopAlarm(); stopTimer(false);
    if(state.phase==='Lobby'){ startRound(); return; }
    if(state.phase==='Prosecution'){ state.phase='Defense'; setTimerForPhase('Defense'); renderAll(); save(); return; }
    if(state.phase==='Defense'){ state.phase='JudgeNotes'; setTimerForPhase('JudgeNotes'); renderAll(); save(); return; }
    if(state.phase==='JudgeNotes'){ state.phase='Verdict'; $('#verdictModal').classList.remove('hidden'); renderAll(); save(); return; }
  }
  function awardWin(side){
    state.teamPoints[side]+=1;
    const ids = side==='prosecution'? state.roles.prosecution : state.roles.defense;
    ids.forEach(pid=>{ const p=state.players.find(x=>x.id===pid); if(p) p.score+=1; });
  }
  function setVerdict(side){
    awardWin(side);
    $('#verdictModal').classList.add('hidden');
    state.phase='Lobby';
    renderAll(); save();
  }
  function hideVerdict(){ $('#verdictModal').classList.add('hidden'); state.phase='Lobby'; renderAll(); save(); }

  function nextRound(){
    stopAlarm(); stopTimer(true);
    state.roundNow+=1;
    state.phase='Lobby';
    newCase(true);
    assignRoles(true);
    renderAll(); save();
  }

  function applyLobbyAndStart(){
    state.settings.playerCount=clamp(parseInt($('#playerCount').value,10)||3,2,8);
    state.settings.roundsMax=clamp(parseInt($('#roundCount').value,10)||5,1,50);
    state.settings.modifierEvery=clamp(parseInt($('#modifierEvery').value,10)||0,0,50);
    state.settings.packKey=String($('#packSelect').value||'anime');
    state.settings.prosSeconds=clamp(parseInt($('#prosSeconds').value,10)||120,10,3600);
    state.settings.defSeconds=clamp(parseInt($('#defSeconds').value,10)||120,10,3600);
    state.settings.judgeSeconds=clamp(parseInt($('#judgeSeconds').value,10)||60,10,3600);
    state.settings.alarmVolume=clamp(parseInt($('#alarmVolume').value,10)||60,0,100);

    const names = Array.from(document.querySelectorAll('#nameFields input')).map(i=>(i.value||'').trim());
    const active = names.slice(0,state.settings.playerCount).map((v,i)=>v||`Player ${i+1}`);
    state.settings.players = active.concat(Array(8-active.length).fill(''));

    // reset
    state.roundNow=1; state.phase='Lobby'; state.teamPoints={prosecution:0, defense:0}; state.used={cases:[], modPros:[], modDef:[]}; state.currentModifier=null;
    state.players=[]; state.roles={judge:null, prosecution:[], defense:[]};
    stopAlarm(); stopTimer(true); state.timer.phaseKey='None'; state.timer.secondsLeft=0;

    ensurePlayers();
    newCase(true);
    assignRoles(true);

    $('#lobbyModal').classList.add('hidden');
    renderAll(); save();
  }

  function restartGame(){
    $('#lobbyModal').classList.remove('hidden');
    buildLobbyNameInputs(); updateLobbyReadout();
  }

  function renderCase(){
    const c=state.currentCase;
    $('#caseHeadline').textContent = c ? c.title : '—';
    $('#caseSource').textContent = c ? c.source : '—';
    $('#caseCharge').textContent = c ? c.charge : '—';
    $('#caseContext').textContent = c ? c.context : '—';
    $('#caseDecides').textContent = c ? c.decision : '—';
    if(state.currentModifier){
      $('#modBar').classList.remove('hidden');
      $('#modLabel').textContent = state.currentModifier.side==='prosecution'?'Modifier (Prosecution)':'Modifier (Defense)';
      $('#modText').textContent = state.currentModifier.text;
    } else {
      $('#modBar').classList.add('hidden');
    }
  }

  function renderRoles(){
    const roleCol=$('#roleCol'), playerCol=$('#playerCol');
    roleCol.innerHTML=''; playerCol.innerHTML='';
    const nameOf=(pid)=>state.players.find(p=>p.id===pid)?.name||'—';
    const judgeName=state.roles.judge?nameOf(state.roles.judge):'—';
    const pros=state.roles.prosecution.map(nameOf);
    const def=state.roles.defense.map(nameOf);

    roleCol.innerHTML = `
      <div class="rolecard">
        <div class="rtitle"><span>Judge</span><span class="badge">Role</span></div>
        <div class="rmeta">${judgeName}</div>
      </div>
      <div class="rolecard">
        <div class="rtitle"><span>Prosecution</span><span class="badge">Team</span></div>
        <div class="kv">Team points: <b>${state.teamPoints.prosecution}</b></div>
        ${pros.length?`<ul>${pros.map(n=>`<li>${n}</li>`).join('')}</ul>`:`<div class="rmeta">(No players assigned yet)</div>`}
      </div>
      <div class="rolecard">
        <div class="rtitle"><span>Defense</span><span class="badge">Team</span></div>
        <div class="kv">Team points: <b>${state.teamPoints.defense}</b></div>
        ${def.length?`<ul>${def.map(n=>`<li>${n}</li>`).join('')}</ul>`:`<div class="rmeta">(No players assigned yet)</div>`}
      </div>
    `;

    const list=document.createElement('div'); list.className='playerlist';
    state.players.forEach((p,idx)=>{
      const role = p.id===state.roles.judge?'Judge':(state.roles.prosecution.includes(p.id)?'Prosecution':(state.roles.defense.includes(p.id)?'Defense':'—'));
      const row=document.createElement('div'); row.className='playerrow';
      const left=document.createElement('div'); left.style.flex='1';
      const inp=document.createElement('input'); inp.className='nameinput'; inp.value=p.name;
      inp.addEventListener('input',()=>{ p.name=inp.value.trim()||p.name; state.settings.players[idx]=p.name; save(); renderAll(); });
      const meta=document.createElement('div'); meta.style.marginTop='6px'; meta.innerHTML=`<span class="badge">${role}</span>`;
      left.appendChild(inp); left.appendChild(meta);
      const sc=document.createElement('div'); sc.className='score'; sc.textContent=String(p.score);
      row.appendChild(left); row.appendChild(sc);
      list.appendChild(row);
    });
    playerCol.appendChild(list);
  }

  function renderStatus(){
    $('#pillRound').textContent=`Round: ${state.roundNow} / ${state.settings.roundsMax}`;
    $('#pillPhase').textContent=`Phase: ${state.phase}`;
    $('#pillPack').textContent=`Pack: ${getPack().name||'Anime Court'}`;
  }

  function renderAll(){
    ensurePlayers();
    renderStatus();
    renderCase();
    renderRoles();
    updateTimerUI();
  }

  function bind(){
    const on=(sel,ev,fn)=>{const el=$(sel); if(el) el.addEventListener(ev,fn);}
    on('#btnLobbyStart','click',applyLobbyAndStart);
    on('#playerCount','change',()=>{buildLobbyNameInputs();});
    on('#prosSeconds','input',updateLobbyReadout);
    on('#defSeconds','input',updateLobbyReadout);
    on('#judgeSeconds','input',updateLobbyReadout);
    on('#alarmVolume','input',updateLobbyReadout);
    on('#btnPreviewAlarm','click',previewAlarm);

    on('#btnNewCase','click',()=>newCase(false));
    on('#btnAssignRoles','click',()=>assignRoles(false));
    on('#btnStartRound','click',startRound);
    on('#btnRestart','click',restartGame);

    on('#btnRevealMod','click',revealModifier);
    on('#btnNextRound','click',nextRound);

    on('#btnTimerStart','click',startTimer);
    on('#btnTimerStop','click',()=>stopTimer(false));
    on('#btnTimerReset','click',()=>stopTimer(true));
    on('#btnNextPhase','click',nextPhase);
    on('#btnStopAlarm','click',stopAlarm);

    on('#btnVerdictPros','click',()=>setVerdict('prosecution'));
    on('#btnVerdictDef','click',()=>setVerdict('defense'));
    on('#btnVerdictCancel','click',hideVerdict);
  }

  function init(){
    load();
    // fill lobby from state.settings
    $('#playerCount').value=String(state.settings.playerCount||3);
    $('#roundCount').value=String(state.settings.roundsMax||5);
    $('#modifierEvery').value=String(state.settings.modifierEvery||3);
    $('#packSelect').value=String(state.settings.packKey||'anime');
    $('#prosSeconds').value=String(state.settings.prosSeconds||120);
    $('#defSeconds').value=String(state.settings.defSeconds||120);
    $('#judgeSeconds').value=String(state.settings.judgeSeconds||60);
    $('#alarmVolume').value=String(state.settings.alarmVolume||60);

    buildLobbyNameInputs();
    updateLobbyReadout();

    if(state.players && state.players.length){
      $('#lobbyModal').classList.add('hidden');
      if(!state.currentCase) newCase(true);
      if(!state.roles.judge) assignRoles(true);
    } else {
      $('#lobbyModal').classList.remove('hidden');
      state.timer.phaseKey='None'; state.timer.secondsLeft=0;
    }

    bind();
    renderAll();
  }

  window.addEventListener('DOMContentLoaded', init);
})();
