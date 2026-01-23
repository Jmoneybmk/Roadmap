(()=>{'use strict';
const $=s=>document.querySelector(s);
const pillRound=$('#pillRound'),pillPack=$('#pillPack'),pillPhase=$('#pillPhase');
const playerCountSel=$('#playerCount'),questionCountInp=$('#questionCount'),packSelect=$('#packSelect'),modsEnabledChk=$('#modsEnabled');
const alarmVol=$('#alarmVol'),alarmVolLabel=$('#alarmVolLabel'),btnPreviewAlarm=$('#btnPreviewAlarm');
const nameFields=$('#nameFields'),btnStartGame=$('#btnStartGame'),btnResetAll=$('#btnResetAll');
const btnRevealModifier=$('#btnRevealModifier'),btnLockVotes=$('#btnLockVotes'),btnRevealAnswer=$('#btnRevealAnswer'),btnNextQuestion=$('#btnNextQuestion'),btnResetGame=$('#btnResetGame');
const voteCard=$('#voteCard'),lobbyCard=$('#lobbyCard'),voteGrid=$('#voteGrid'),scoreList=$('#scoreList'),voteHint=$('#voteHint'),skipNote=$('#skipNote');
const qText=$('#qText'),qSource=$('#qSource'),qState=$('#qState'),answersEl=$('#answers');
const modBanner=$('#modBanner'),modText=$('#modText'),revealBox=$('#revealBox'),revealAnswerText=$('#revealAnswerText'),winnerText=$('#winnerText');

const STORAGE_KEY='bd_trivia_state_v1';
const PHASE={LOBBY:'Lobby',QUESTION:'Question',VOTING:'Voting',REVEAL:'Reveal',TIEBREAK:'Tiebreak'};
let state={phase:PHASE.LOBBY,packKey:'anime',modsEnabled:true,mainQuestions:10,round:0,roundTarget:0,tiebreakActive:false,
players:[],eligiblePlayerIds:null,questionPool:[],usedQuestionIds:new Set(),current:null,votes:{},locked:false,revealed:false,
alarmVolume:.6,alarm:{ctx:null,node:null,playing:false}};
const clamp=(n,lo,hi)=>Math.max(lo,Math.min(hi,n));
const shuffle=(arr)=>{const a=arr.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;};
const uid=()=>Math.random().toString(36).slice(2,9);
function save(){localStorage.setItem(STORAGE_KEY,JSON.stringify({...state,usedQuestionIds:Array.from(state.usedQuestionIds)}));}
function load(){try{const raw=localStorage.getItem(STORAGE_KEY);if(!raw)return;const d=JSON.parse(raw);state={...state,...d,usedQuestionIds:new Set(d.usedQuestionIds||[])};}catch(e){}}

function ensureAudio(){if(state.alarm.ctx)return;const Ctx=window.AudioContext||window.webkitAudioContext;if(!Ctx)return;state.alarm.ctx=new Ctx();}
function stopAlarm(){const ctx=state.alarm.ctx;if(!ctx||!state.alarm.node){state.alarm.playing=false;return;}try{state.alarm.node.g.gain.setValueAtTime(.0001,ctx.currentTime);state.alarm.node.o.stop(ctx.currentTime+.03);}catch(e){}state.alarm.node=null;state.alarm.playing=false;}
function playAlarm(){ensureAudio();const ctx=state.alarm.ctx;if(!ctx)return;stopAlarm();const o=ctx.createOscillator(),g=ctx.createGain();o.type='square';o.frequency.value=880;g.gain.value=.0001;
const vol=clamp(state.alarmVolume,0,1);g.gain.linearRampToValueAtTime(vol*.18,ctx.currentTime+.02);o.connect(g).connect(ctx.destination);o.start();
state.alarm.node={o,g};state.alarm.playing=true;let pulses=0;const iv=setInterval(()=>{if(!state.alarm.playing){clearInterval(iv);return;}
pulses++;const t=ctx.currentTime;g.gain.cancelScheduledValues(t);g.gain.setValueAtTime(.0001,t);g.gain.linearRampToValueAtTime(vol*.22,t+.02);g.gain.linearRampToValueAtTime(.0001,t+.28);
if(pulses>=6){clearInterval(iv);g.gain.setValueAtTime(vol*.10,ctx.currentTime);}},320);}

function normalizePackKey(key,packs){
  if(!key) return null;
  const raw=String(key).trim();
  if(!raw) return null;
  if(packs && packs[raw]) return raw;
  const lower=raw.toLowerCase();
  if(packs && packs[lower]) return lower;
  const alias={'anime trivia':'anime','movie trivia':'movies','movies':'movies','movie':'movies','cartoon trivia':'cartoons','cartoons':'cartoons','cartoon':'cartoons','tv / series':'series','series':'series','tv':'series','anime / cartoon movies':'anime_movies','anime_movies':'anime_movies'};
  const mapped=alias[lower];
  if(mapped && packs && packs[mapped]) return mapped;
  return null;
}

function initPacks(){
  const packs=window.TRIVIA_PACKS||{};
  packSelect.innerHTML='';
  const keys=Object.keys(packs);
  keys.forEach(k=>{
    const opt=document.createElement('option');
    opt.value=k;
    opt.textContent=(packs[k]&&packs[k].title)||k;
    packSelect.appendChild(opt);
  });
  const norm=normalizePackKey(state.packKey,packs);
  state.packKey=norm||keys[0]||'anime';
  packSelect.value=state.packKey;
  pillPack.textContent=`Pack: ${(packs[state.packKey]&&packs[state.packKey].title)||state.packKey}`;
}
function getPack(){
  const packs=window.TRIVIA_PACKS||{};
  const key=normalizePackKey(state.packKey||packSelect.value,packs)||normalizePackKey(packSelect.value,packs);
  if(key && key!==state.packKey) state.packKey=key;
  return packs[state.packKey];
}

function escapeHtml(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function renderNameFields(){const n=parseInt(playerCountSel.value,10);nameFields.innerHTML='';for(let i=1;i<=n;i++){const wrap=document.createElement('div');wrap.className='namefield';
wrap.innerHTML=`<div class="label">Player ${i} name</div><input type="text" value="${escapeHtml(state.players[i-1]?.name||`Player ${i}`)}" data-index="${i-1}" />`;nameFields.appendChild(wrap);}
nameFields.querySelectorAll('input').forEach(inp=>{inp.addEventListener('input',()=>{const idx=parseInt(inp.getAttribute('data-index'),10);
while(state.players.length<n)state.players.push({id:uid(),name:`Player ${state.players.length+1}`,points:0,active:true});
state.players[idx].name=inp.value.trim()||`Player ${idx+1}`;save();renderScoreboard();});});}
function applyLobbyToState(){
  const packs=window.TRIVIA_PACKS||{};
  const n=parseInt(playerCountSel.value,10);
  const qn=clamp(parseInt(questionCountInp.value,10)||1,1,999);
  const chosen=normalizePackKey(packSelect.value,packs);
  state.packKey=chosen||normalizePackKey(state.packKey,packs)||Object.keys(packs)[0]||'anime';
  packSelect.value=state.packKey;
  state.modsEnabled=!!modsEnabledChk.checked;
  state.mainQuestions=qn;
  const players=[];
  for(let i=0;i<n;i++){
    const inp=nameFields.querySelector(`input[data-index="${i}"]`);
    const name=(inp&&inp.value?inp.value:`Player ${i+1}`).trim()||`Player ${i+1}`;
    players.push({id:(state.players[i]&&state.players[i].id)||uid(),name,points:(state.players[i]&&state.players[i].points)||0,active:true});
  }
  state.players=players;
  state.alarmVolume=clamp((parseInt(alarmVol.value,10)||0)/100,0,1);
}

const OPTION_KEYS_4=['A','B','C','D'],OPTION_KEYS_6=['A','B','C','D','E','F'];
const MODS={
DOUBLE:"Double points on correct answer (+2 instead of +1).",
MINUS_WRONG:"Wrong answer penalty (-1 point on wrong answer).",
ONLY_TIED:"Only players tied for 1st can score this round.",
PLUS_ANSWERS:"Add 2 additional answers (6 options total).",
BET:"Bet on who gets it right (cannot bet on yourself).",
SKIP_LEADER:"Player(s) with the most points are skipped this round."
};

function buildQuestionPool(){const pack=getPack();const qs=(pack?.questions||[]).filter(q=>q&&q.question&&q.answer);state.questionPool=shuffle(qs);state.usedQuestionIds=new Set();}
function nextQuestionFromPool(){if(state.questionPool.length===0)buildQuestionPool();const pool=state.questionPool;
const unused=pool.filter(q=>!state.usedQuestionIds.has(q.id));const pick=(unused.length?unused:pool)[0];state.usedQuestionIds.add(pick.id);
const idx=pool.findIndex(q=>q.id===pick.id);if(idx>=0){const sp=pool.splice(idx,1)[0];pool.push(sp);}return pick;}
function buildOptionsForQuestion(q,useSix){
  const keys=useSix?OPTION_KEYS_6:OPTION_KEYS_4;
  const need=keys.length-1;
  const pool=state.questionPool.filter(x=>x.id!==q.id&&x.answer);
  
  // First try to get distractors of the same type
  const sameType=pool.filter(x=>x.type&&x.type===q.type);
  let distract=[];
  
  if(sameType.length>=need){
    // Enough same-type answers available
    distract=shuffle(sameType).slice(0,need).map(x=>x.answer);
  }else{
    // Not enough same-type, use what we have then fill from other types
    distract=shuffle(sameType).map(x=>x.answer);
    const otherTypes=pool.filter(x=>!x.type||x.type!==q.type);
    const remaining=need-distract.length;
    distract=[...distract,...shuffle(otherTypes).slice(0,remaining).map(x=>x.answer)];
  }
  
  // Remove duplicates and ensure we have enough unique answers
  distract=[...new Set(distract)].slice(0,need);
  
  const all=[q.answer,...distract];
  const shuffled=shuffle(all);
  const options=shuffled.map((txt,i)=>({key:keys[i],text:txt,isCorrect:txt===q.answer}));
  const correctKey=options.find(o=>o.isCorrect)?.key||keys[0];
  return {options,correctKey};
}
function getLeaderIds(){const max=Math.max(...state.players.map(p=>p.points),0);return state.players.filter(p=>p.points===max).map(p=>p.id);}
function getTiedTopIds(){const max=Math.max(...state.players.map(p=>p.points),0);const tied=state.players.filter(p=>p.points===max);return tied.length>=2?tied.map(p=>p.id):[];}

function startNewRound(){state.round+=1;state.locked=false;state.revealed=false;state.votes={};state.current=null;
const q=nextQuestionFromPool();const {options,correctKey}=buildOptionsForQuestion(q,false);
state.current={q,options,correctKey,modifierText:null,skipIds:new Set(),bets:null};
state.players.forEach(p=>state.votes[p.id]=null);
state.phase=state.tiebreakActive?PHASE.TIEBREAK:PHASE.QUESTION;save();render();}
function revealRandomModifier(){if(!state.modsEnabled||!state.current||state.current.modifierText)return;const pack=getPack();
const pool=(pack?.modifiers||[]).length?pack.modifiers:Object.values(MODS);const pick=pool[Math.floor(Math.random()*pool.length)];
state.current.modifierText=pick;
if(pick===MODS.PLUS_ANSWERS){const {options,correctKey}=buildOptionsForQuestion(state.current.q,true);state.current.options=options;state.current.correctKey=correctKey;state.players.forEach(p=>state.votes[p.id]=null);}
if(pick===MODS.SKIP_LEADER){const leaders=getLeaderIds();state.current.skipIds=new Set(leaders);leaders.forEach(pid=>state.votes[pid]='SKIP');}
if(pick===MODS.BET){state.current.bets={};}
save();render();}
function lockVotes(){if(!state.current)return;const missing=state.players.filter(p=>!state.current.skipIds.has(p.id)).filter(p=>state.votes[p.id]===null);
if(missing.length){playAlarm();alert(`Missing votes for: ${missing.map(p=>p.name).join(', ')}`);return;}
if(state.current.modifierText===MODS.BET){const bets=state.current.bets||{};for(const pid of Object.keys(bets)){const b=bets[pid];const pl=state.players.find(p=>p.id===pid);if(!pl)continue;
const amt=clamp(parseInt(b.amount,10)||0,0,9999);if(amt<=0)continue;pl.points=Math.max(0,pl.points-amt);}}
state.locked=true;state.phase=PHASE.VOTING;save();render();}
function revealAnswerFn(){if(!state.locked||!state.current)return;state.revealed=true;state.phase=PHASE.REVEAL;
const correctKey=state.current.correctKey,mod=state.current.modifierText;
const double=(mod===MODS.DOUBLE),minusWrong=(mod===MODS.MINUS_WRONG),onlyTied=(mod===MODS.ONLY_TIED);
const tiedTop=new Set(getTiedTopIds());const gotRight=new Set();
state.players.forEach(p=>{if(state.current.skipIds.has(p.id))return;if(state.votes[p.id]===correctKey)gotRight.add(p.id);});
state.players.forEach(p=>{if(state.current.skipIds.has(p.id))return;const voted=state.votes[p.id];const isRight=voted===correctKey;
if(onlyTied&&!tiedTop.has(p.id))return;if(isRight)p.points+=double?2:1;else if(minusWrong)p.points=Math.max(0,p.points-1);});
if(mod===MODS.BET){const bets=state.current.bets||{};for(const bettorId of Object.keys(bets)){const b=bets[bettorId];if(!b||!b.targetId)continue;
const bettor=state.players.find(p=>p.id===bettorId);if(!bettor)continue;const amt=clamp(parseInt(b.amount,10)||0,0,9999);if(amt<=0)continue;
if(b.targetId===bettorId)continue;if (gotRight.has(b.targetId)) bettor.points += (amt * 3);}}
stopAlarm();save();render();checkWinner();}
function checkWinner(){const doneMain=(!state.tiebreakActive&&state.round>=state.roundTarget);if(!doneMain||!state.revealed)return;
const max=Math.max(...state.players.map(p=>p.points),0);const top=state.players.filter(p=>p.points===max);
if(top.length===1){winnerText.textContent=`Winner: ${top[0].name} (${top[0].points} pts)`;state.tiebreakActive=false;state.eligiblePlayerIds=null;save();render();return;}
state.tiebreakActive=true;state.eligiblePlayerIds=top.map(p=>p.id);winnerText.textContent=`Tie at ${max} pts: ${top.map(p=>p.name).join(', ')}. Tiebreak continues.`;save();render();}
function nextStep(){if(!state.revealed){playAlarm();return;}
if(state.tiebreakActive){const max=Math.max(...state.players.map(p=>p.points),0);const top=state.players.filter(p=>p.points===max);if(top.length===1){winnerText.textContent=`Winner: ${top[0].name} (${top[0].points} pts)`;state.tiebreakActive=false;state.eligiblePlayerIds=null;save();render();return;}}
else{if(state.round>=state.roundTarget)return;}
startNewRound();}

function renderPills(){const pack=getPack();pillPack.textContent=`Pack: ${pack?.title||state.packKey}`;pillPhase.textContent=`Phase: ${state.phase}`;pillRound.textContent=`Round: ${state.round} / ${state.roundTarget||0}`;}
function renderScoreboard(){scoreList.innerHTML='';state.players.slice().sort((a,b)=>b.points-a.points).forEach(p=>{const row=document.createElement('div');row.className='scoreItem';
row.innerHTML=`<div class="name">${escapeHtml(p.name)}</div><div class="pts">${p.points} pts</div>`;scoreList.appendChild(row);});}
function renderVotes(){voteGrid.innerHTML='';const optionKeys=state.current?.options?.map(o=>o.key)||OPTION_KEYS_4;
const eligible=state.tiebreakActive&&state.eligiblePlayerIds?new Set(state.eligiblePlayerIds):null;
skipNote.textContent=(state.current?.modifierText===MODS.SKIP_LEADER&&state.current.skipIds.size)?`Skipped: ${state.players.filter(p=>state.current.skipIds.has(p.id)).map(p=>p.name).join(', ')}`:'';
state.players.forEach(p=>{if(eligible&&!eligible.has(p.id))return;const isSkipped=state.current?.skipIds?.has(p.id);
const row=document.createElement('div');row.className='voteRow';
let opts=isSkipped?`<option value="SKIP">SKIP</option>`:`<option value="" ${(state.votes[p.id]===null)?'selected':''}>—</option>`+optionKeys.map(k=>`<option value="${k}" ${(state.votes[p.id]===k)?'selected':''}>${k}</option>`).join('');
row.innerHTML=`<div class="who"><div class="pname">${escapeHtml(p.name)}</div><div class="ppts">${p.points} pts</div></div><select data-pid="${p.id}" ${state.locked?'disabled':''}>${opts}</select>`;
voteGrid.appendChild(row);const sel=row.querySelector('select');sel.addEventListener('change',()=>{state.votes[p.id]=sel.value||null;save();});
if(state.current?.modifierText===MODS.BET&&!isSkipped){const bet=document.createElement('div');bet.className='voteRow';bet.style.gridTemplateColumns='1fr 120px';
bet.innerHTML=`<div class="who"><div class="pname">Bet: ${escapeHtml(p.name)}</div><div class="ppts">Stake</div></div>
<div style="display:flex;gap:8px;">
<select data-bettor="${p.id}" class="betTarget" style="flex:1;"><option value="">Target</option>${state.players.filter(x=>x.id!==p.id).map(x=>`<option value="${x.id}">${escapeHtml(x.name)}</option>`).join('')}</select>
<input data-bettor="${p.id}" class="betAmt" type="number" min="0" value="0" style="width:88px;padding:10px 12px;border-radius:12px;border:1px solid rgba(255,255,255,.08);background:rgba(0,0,0,.25);color:rgba(255,255,255,.92);" />
</div>`;voteGrid.appendChild(bet);
const t=bet.querySelector('.betTarget'),a=bet.querySelector('.betAmt');const ex=state.current.bets?.[p.id]||{targetId:'',amount:0};t.value=ex.targetId||'';a.value=ex.amount||0;
const upd=()=>{if(!state.current.bets)state.current.bets={};const amt=clamp(parseInt(a.value,10)||0,0,p.points);a.value=amt;state.current.bets[p.id]={targetId:t.value||'',amount:amt};save();};
t.addEventListener('change',upd);a.addEventListener('input',upd);if(state.locked){t.disabled=true;a.disabled=true;}}});
voteHint.textContent=(state.tiebreakActive&&eligible)?`Tiebreak voting — only: ${state.players.filter(p=>eligible.has(p.id)).map(p=>p.name).join(', ')}`:`Enter each player's answer (${optionKeys.join('–')}). Keep this panel off-stream.`;}
function renderQuestion(){if(!state.current){qText.textContent='Start the game to begin.';qSource.textContent='Source: —';qState.textContent='Waiting…';answersEl.innerHTML='';modBanner.classList.add('hidden');revealBox.classList.add('hidden');return;}
qText.textContent=state.current.q.question;qSource.textContent=`Source: ${state.current.q.source}`;qState.textContent=state.revealed?'Revealed':(state.locked?'Votes locked':'Voting…');
if(state.current.modifierText){modText.textContent=state.current.modifierText;modBanner.classList.remove('hidden');}else modBanner.classList.add('hidden');
answersEl.innerHTML='';state.current.options.forEach(opt=>{const d=document.createElement('div');d.className='answer';
if(state.revealed)d.classList.add(opt.isCorrect?'correct':'wrong');
d.innerHTML=`<div class="badge">${opt.key}</div><div class="txt">${escapeHtml(opt.text)}</div>`;answersEl.appendChild(d);});
if(state.revealed){revealAnswerText.textContent=`${state.current.correctKey}. ${state.current.options.find(o=>o.isCorrect)?.text||state.current.q.answer}`;revealBox.classList.remove('hidden');}
else revealBox.classList.add('hidden');}
function renderButtons(){const inLobby=state.phase===PHASE.LOBBY;lobbyCard.style.display=inLobby?'':'none';voteCard.style.display=inLobby?'none':'';
btnRevealModifier.disabled=!state.modsEnabled||!state.current||state.locked||!!state.current?.modifierText;
btnLockVotes.disabled=!state.current||state.locked;btnRevealAnswer.disabled=!state.locked||state.revealed;btnNextQuestion.disabled=!state.revealed;
btnRevealModifier.style.display=state.modsEnabled?'':'none';}
function render(){renderPills();renderQuestion();renderButtons();renderScoreboard();if(state.current)renderVotes();}
function resetToLobby(){stopAlarm();state.phase=PHASE.LOBBY;state.round=0;state.roundTarget=0;state.tiebreakActive=false;state.eligiblePlayerIds=null;
state.players=[];state.questionPool=[];state.usedQuestionIds=new Set();state.current=null;state.votes={};state.locked=false;state.revealed=false;save();render();}
function resetGameMid(){
  stopAlarm();

  // keep lobby settings + player names, just reset the run
  state.round = 0;
  state.roundTarget = state.mainQuestions;
  state.tiebreakActive = false;
  state.eligiblePlayerIds = null;

  // reset scoring + current question state
  state.players.forEach(p => { p.points = 0; });
  state.questionPool = [];
  state.usedQuestionIds = new Set();
  state.current = null;
  state.votes = {};
  state.locked = false;
  state.revealed = false;

  // back to lobby so host can start clean
  state.phase = PHASE.LOBBY;

  save();
  render();
}
function startGame(){
  applyLobbyToState();
  const packs=window.TRIVIA_PACKS||{};
  let pack=packs[state.packKey];
  if(!pack){
    const first=Object.keys(packs)[0];
    state.packKey=first||'anime';
    packSelect.value=state.packKey;
    pack=packs[state.packKey];
  }
  if(!pack || !(pack.questions||[]).length){
    playAlarm();
    alert(`This pack has no questions yet. (Selected: ${state.packKey||'—'})`);
    return;
  }
  state.players.forEach(p=>p.points=0);
  state.round=0;
  state.roundTarget=clamp(state.mainQuestions,1,999);
  buildQuestionPool();
  state.usedQuestionIds=new Set();
  state.tiebreakActive=false;
  state.eligiblePlayerIds=null;
  winnerText.textContent='—';
  startNewRound();
}
load();initPacks();
playerCountSel.value=String(clamp(state.players.length||parseInt(playerCountSel.value,10),1,8));
questionCountInp.value=String(state.mainQuestions||10);modsEnabledChk.checked=!!state.modsEnabled;
alarmVol.value=String(Math.round(clamp(state.alarmVolume||.6,0,1)*100));alarmVolLabel.textContent=`${alarmVol.value}%`;
renderNameFields();
playerCountSel.addEventListener('change',()=>{const n=parseInt(playerCountSel.value,10);while(state.players.length<n)state.players.push({id:uid(),name:`Player ${state.players.length+1}`,points:0,active:true});
state.players=state.players.slice(0,n);renderNameFields();save();});
packSelect.addEventListener('change',()=>{state.packKey=packSelect.value;save();renderPills();});
alarmVol.addEventListener('input',()=>{alarmVolLabel.textContent=`${alarmVol.value}%`;state.alarmVolume=clamp((parseInt(alarmVol.value,10)||0)/100,0,1);save();});
btnPreviewAlarm.addEventListener('click',()=>{playAlarm();setTimeout(()=>stopAlarm(),1200);});
btnStartGame.addEventListener('click',startGame);
btnResetAll.addEventListener('click',resetToLobby);
btnResetGame.addEventListener('click',()=>{ if(confirm('Reset the current game and return to lobby?')) resetGameMid(); });
btnRevealModifier.addEventListener('click',()=>revealRandomModifier());
btnLockVotes.addEventListener('click',()=>lockVotes());
btnRevealAnswer.addEventListener('click',()=>revealAnswerFn());
btnNextQuestion.addEventListener('click',()=>nextStep());
render();
})();