// data.js
// Pack-based data structure.
// Each pack contains: prompts[], characters[], modifiers[]
// Add new content by selecting a pack and filling its arrays.

window.ANIME_DEBATE_DATA = {
  maxRounds: 10,

  packs: {
    // =========================================================
    // ANIME PACK (ACTIVE)
    // =========================================================
    anime: {
      label: "Anime",

      modifiers: [
        "No outside help allowed (no allies, summons, squads, backup).",
        "No killing allowed (must succeed non-lethally).",
        "No flying allowed.",
        "They start injured (already damaged or exhausted).",
        "They can only use one signature ability (pick ONE move/power style only).",
        "They must protect one civilian the entire time.",
        "No powers for the first 60 seconds (must survive the start with skill only).",
        "They have 10 minutes prep time (quick planning, no long setups).",
        "They must keep it secret (no public reveal, no announcing intentions).",
        "Opponent adapts mid-way and the situation gets harder."
      ],

      prompts: [

        {
          id: 1,
          prompt: "This character can deliver an 'Erwin's Final Charge' level speech that makes soldiers ride into guaranteed death.",
          source: "Attack on Titan — Erwin's Final Charge",
          explanation: "The scenario: A commander must convince soldiers to charge directly at a threat they cannot defeat, knowing most will die, purely to buy time for others. The speech must be so powerful that trained soldiers willingly accept certain death without hesitation. Your pick must have the charisma, conviction, and emotional intelligence to make people choose sacrifice over survival in seconds."
        },
        {
          id: 2,
          prompt: "This character can survive and pass the Hunter Exam and earn a Hunter License.",
          source: "Hunter x Hunter — Hunter Exam Arc",
          explanation: "The scenario: A multi-stage survival test where candidates face deadly wildlife, psychological manipulation, combat against other applicants, and challenges designed to have a 99% failure rate. Examiners can kill candidates at will, and other test-takers are encouraged to sabotage each other. Your pick must have physical endurance, combat ability, quick thinking, and the ruthlessness to outlast hundreds of desperate competitors."
        },
        {
          id: 3,
          prompt: "This character can successfully pull off Lelouch's 'Zero Requiem' and make the world unite through their own sacrifice.",
          source: "Code Geass — Zero Requiem",
          explanation: "The scenario: Deliberately become the most hated tyrant in history, concentrate all of the world's hatred onto yourself, then arrange your own public assassination so that your death becomes a symbol of hope and unity. Your pick must have the strategic mind to orchestrate global politics, the acting ability to play a villain convincingly, and the willingness to be remembered as a monster forever."
        },
        {
          id: 4,
          prompt: "This character can win Duelist Kingdom and defeat Pegasus.",
          source: "Yu-Gi-Oh! — Duelist Kingdom Arc",
          explanation: "The scenario: A card game tournament on a private island where the host can literally read minds during duels. Losing means your soul gets trapped in a card forever. Your pick must win multiple high-stakes duels against elite players, then defeat someone who knows every card in your hand and every move you're planning before you make it."
        },
        {
          id: 5,
          prompt: "This character can clear the Forest of Death and retrieve the correct scroll without their team getting wiped.",
          source: "Naruto — Chūnin Exams: Forest of Death",
          explanation: "The scenario: A 5-day survival test in a monster-filled forest where teams must steal a specific scroll from other armed teams while protecting their own. Giant predators, poison, traps, and enemy ninja who are allowed to kill. Your pick must lead a 3-person squad to find the right target, win the fight, and reach the tower alive while being hunted by dozens of other teams."
        },
        {
          id: 6,
          prompt: "This character can win the Cell Games and stop Cell from destroying Earth.",
          source: "Dragon Ball Z — Cell Games Saga",
          explanation: "The scenario: A public tournament against a bio-engineered monster who can regenerate from a single cell, copy any fighting technique he sees, and has decided to blow up the planet if he gets bored. No ring-outs, no time limits—fight until one side is completely destroyed. Your pick must defeat an opponent who adapts to everything and has planet-destroying power as a backup plan."
        },
        {
          id: 7,
          prompt: "This character can complete Ainz's 'Lizardmen Arc' conquest without unnecessary slaughter and still secure control.",
          source: "Overlord — Lizardmen Heroes Arc",
          explanation: "The scenario: Conquer a tribal nation of warrior reptiles who would rather die than submit, but do it with minimal casualties so the survivors become loyal subjects instead of resentful slaves. Your pick must demonstrate overwhelming power to break their will to resist, while also showing enough mercy that they choose cooperation over extinction."
        },
        {
          id: 8,
          prompt: "This character can win a Shokugeki cooking duel against Soma Yukihira.",
          source: "Food Wars! Shokugeki no Soma — Shokugeki Battles",
          explanation: "The scenario: A formal cooking battle where both chefs make a dish with the same theme, judged by experts whose reactions are involuntary and extreme. Your opponent is a creative genius who thrives under pressure and specializes in unexpected flavor combinations that shouldn't work but do. Your pick must out-cook someone who has never lost when it truly mattered."
        },
        {
          id: 9,
          prompt: "This character can pull off the Ocean's Eleven casino vault heist successfully.",
          source: "Ocean's Eleven — Casino Vault Heist",
          explanation: "The scenario: Rob three Las Vegas casinos simultaneously by breaking into an underground vault protected by armed guards, motion sensors, voice-print ID, and a time-locked door that requires an override code. Your pick must coordinate a team, handle unexpected problems in real-time, and escape with $150 million without anyone knowing they were robbed until it's over."
        },
        {
          id: 10,
          prompt: "This character can execute the Grace Field House escape plan and get the kids out successfully.",
          source: "The Promised Neverland — Grace Field House Escape",
          explanation: "The scenario: Escape from an orphanage that's actually a farm raising children as livestock for demons. The 'mother' running the house is a trained hunter who monitors everything, the walls are cliffs, the forest outside is demon territory, and you must escape with as many children as possible—including toddlers who can't run or keep secrets. Your pick must outsmart constant surveillance and execute a mass escape."
        },
        {
          id: 11,
          prompt: "This character can win the Dark Tournament and keep their team alive to the end.",
          source: "Yu Yu Hakusho — Dark Tournament",
          explanation: "The scenario: A martial arts tournament hosted by demons where human contestants are expected to die for entertainment. Teams fight elimination rounds against increasingly powerful demons, the crowd wants you dead, and the organizers rig matches against you. Your pick must win enough fights to advance while keeping weaker teammates from being killed in their matches."
        },
        {
          id: 12,
          prompt: "This character can survive Subaru's Return-by-Death psychological pressure without mentally breaking.",
          source: "Re:Zero — Return by Death Loops",
          explanation: "The scenario: Every time you die, you respawn at a checkpoint with full memory of your death. You've watched friends die dozens of times. You've been eaten, stabbed, frozen, and tortured—and you remember all of it. No one believes you, telling anyone causes them to die, and you must keep trying until you get it right. Your pick must endure hundreds of traumatic deaths without going insane."
        },
        {
          id: 13,
          prompt: "This character can expose the corrupt government in FMAB without getting eliminated first.",
          source: "Fullmetal Alchemist: Brotherhood — Central Conspiracy",
          explanation: "The scenario: The entire military leadership is controlled by immortal beings planning a nationwide human sacrifice, and they have eyes everywhere. Investigating gets people killed or disappeared. Your pick must gather proof, build a resistance network, and expose the conspiracy to the public—while being hunted by special forces, shapeshifters, and alchemists who can kill with a snap."
        },
        {
          id: 14,
          prompt: "This character can win the Royal Knights Selection Tournament without using lethal force.",
          source: "Black Clover — Royal Knights Selection Exam",
          explanation: "The scenario: A team battle tournament where magic users fight to destroy a crystal while protecting their own. Opponents include nobles with overwhelming magic power and no restraint. Your pick must win every round decisively enough to be selected for an elite squad, but without killing anyone—even opponents trying to kill you."
        },
        {
          id: 15,
          prompt: "This character can negotiate peace between Marley and Paradis without triggering more war.",
          source: "Attack on Titan — Marley/Paradis Conflict",
          explanation: "The scenario: Two nations with generations of mutual genocide, where one side views the other as literal devils who deserve extinction. Both have weapons of mass destruction and factions that profit from war. Your pick must find diplomatic common ground between populations who have been taught since birth to hate each other, with extremists on both sides trying to sabotage peace."
        },
        {
          id: 16,
          prompt: "This character can successfully run Nazarick's public image without exposing the truth.",
          source: "Overlord — Sorcerer Kingdom Politics",
          explanation: "The scenario: You rule a kingdom run by literal monsters—undead, demons, and insects—who consider humans as cattle. Neighboring nations are terrified, adventurers want to raid you, and your own subjects are former enemies. Your pick must maintain diplomatic relations, manage propaganda, and present a benevolent image while hiding that the kingdom's citizens occasionally get eaten."
        },
        {
          id: 17,
          prompt: "This character can survive the Shibuya Incident and still accomplish the mission.",
          source: "Jujutsu Kaisen — Shibuya Incident",
          explanation: "The scenario: A trap designed to seal humanity's strongest protector, sprung in a crowded subway station with thousands of civilians as hostages. Multiple special-grade curses attacking simultaneously, traitors among allies, and ordinary people being slaughtered as distractions. Your pick must fight through elite enemies, make impossible triage decisions, and complete the objective while the death toll climbs."
        },
        {
          id: 18,
          prompt: "This character can win the Grand Magic Games and keep their guild's reputation intact.",
          source: "Fairy Tail — Grand Magic Games",
          explanation: "The scenario: A tournament between wizard guilds where your team has been publicly mocked as the weakest for years. Events include combat, endurance challenges, and puzzle-solving against guilds with dark secrets and cheating strategies. Your pick must win enough events to claim victory while dealing with sabotage, rigged matches, and an audience that wants to see you fail."
        },
        {
          id: 19,
          prompt: "This character can stop the Paranormal Liberation War from escalating into full collapse.",
          source: "My Hero Academia — Paranormal Liberation War",
          explanation: "The scenario: A coordinated villain assault on hero society with 100,000+ enemies, including multiple threats capable of destroying cities. Heroes are spread thin, civilians are in danger everywhere, and the villains' goal is societal collapse—not just victory. Your pick must make command decisions that prevent total breakdown while key heroes are occupied with their own critical fights."
        },
        {
          id: 20,
          prompt: "This character can keep a perfect fake identity inside a hostile organization for 30 days.",
          source: "Tokyo Revengers — Gang Infiltration Tension",
          explanation: "The scenario: Infiltrate a violent gang where loyalty is tested through beatings, crimes, and constant surveillance by paranoid leaders. One slip—wrong story, wrong reaction, wrong body language—means torture and death. Your pick must maintain a false identity for a month while participating in gang activities, building trust, and gathering intel without ever breaking character."
        },
        {
          id: 21,
          prompt: "This character can keep their humanity intact after a life-changing transformation and still function normally.",
          source: "Parasyte: The Maxim — Shinichi's Transformation",
          explanation: "The scenario: An alien parasite merges with your body, giving you superhuman abilities but slowly eroding your emotions. You can feel yourself becoming colder, less empathetic, more willing to kill. Your pick must gain the power while fighting to retain their core identity—still caring about people, still feeling fear and love, still being recognizably themselves."
        },
        {
          id: 22,
          prompt: "This character can build a trade empire from nothing without triggering a war.",
          source: "Tsukimichi: Moonlit Fantasy — Kuzunoha Company",
          explanation: "The scenario: Start a business in a fantasy world where established merchants have assassination guilds on retainer, nobles demand bribes, and undercutting prices gets your caravans raided. Your pick must grow from nothing to a major economic power through negotiation, quality products, and strategic alliances—without provoking retaliation that destroys everything."
        },
        {
          id: 23,
          prompt: "This character can survive being targeted by a top-tier assassin and still complete their mission.",
          source: "The World's Finest Assassin — Assassin World Rules",
          explanation: "The scenario: A professional killer with decades of experience, custom tools, and no moral limits has been paid to eliminate you. They know surveillance, poison, sniping, infiltration, and will attack when you're most vulnerable. Your pick must stay alive while still accomplishing their goal—not just hiding forever, but actively operating while being hunted by an expert."
        },
        {
          id: 24,
          prompt: "This character can win a battle royale where alliances constantly shift and still come out on top.",
          source: "Dragon Ball Super — Tournament of Power",
          explanation: "The scenario: 80 fighters from 8 universes on a shrinking arena—fall off and you're eliminated. Teams form and betray constantly based on who's winning, and the losing universes get erased from existence. Your pick must fight non-stop for 48 minutes against desperate opponents who will do anything to survive, while managing stamina, positioning, and knowing when to betray temporary allies."
        },
        {
          id: 25,
          prompt: "This character can lead a squad to victory while hiding a massive secret from their own team.",
          source: "Seraph of the End — Military Secrets",
          explanation: "The scenario: Command a military squad in demon-infested territory while hiding that you're partially inhuman yourself. Discovery means execution by your own side. Your pick must make tactical decisions, build genuine trust, and lead effective missions—while constantly managing what teammates see, deflecting suspicion, and never slipping up under stress."
        },
        {
          id: 26,
          prompt: "This character can take control of an underdog team and win through pure preparation and manipulation.",
          source: "Classroom of the Elite — Class Battles",
          explanation: "The scenario: Lead the lowest-ranked class in a school where rankings determine resources, privileges, and futures. Competitions are designed so the elite class wins by default, teachers are hostile, and your own classmates are demoralized and uncooperative. Your pick must manipulate students, exploit rules, and orchestrate victories while never appearing to be in charge."
        },
        {
          id: 27,
          prompt: "This character can prevent a major betrayal inside their organization before it destroys everything.",
          source: "Code Geass — Internal Betrayal & Power Plays",
          explanation: "The scenario: Someone in your inner circle is planning to defect and take critical assets with them—soldiers, secrets, or weapons. You don't know who, their timing, or their contact. Your pick must identify the traitor, neutralize the threat, and prevent the damage—without false accusations that destroy trust or tip off the real betrayer."
        },
        {
          id: 28,
          prompt: "This character can win a high-stakes cooking duel using creativity alone (no perfect technique carry).",
          source: "Food Wars! — Shokugeki Battles",
          explanation: "The scenario: Defeat a technically superior chef who has better training, better ingredients access, and more experience. The judges can taste the difference in skill. Your pick must win purely through unexpected flavor combinations, presentation innovation, and creative risks that surprise even experts—technique alone won't be enough to close the gap."
        },
        {
          id: 29,
          prompt: "This character can survive a city-wide monster outbreak and still keep civilians organized.",
          source: "Kaiju No. 8 — Kaiju Disaster Response",
          explanation: "The scenario: Giant monsters breach a major city with millions of civilians panicking. Emergency services are overwhelmed, evacuation routes are blocked, and smaller monsters are hunting stragglers. Your pick must coordinate civilian evacuation, establish safe zones, manage limited resources, and maintain order—while fighting is still happening blocks away."
        },
        {
          id: 30,
          prompt: "This character can stop a powerful villain's ideology from spreading and radicalizing the public.",
          source: "My Hero Academia — Society & Ideology Fallout",
          explanation: "The scenario: A charismatic villain publicly exposed real corruption in the hero system before being arrested. Now his message is spreading—people agree with him, copycats are emerging, and trust in heroes is collapsing. Your pick must counter the narrative, address legitimate grievances, and prevent radicalization—through words, actions, and policy, not just fighting."
        },
        {
          id: 31,
          prompt: "This character can defeat the Ten Commandments.",
          source: "Seven Deadly Sins — The Ten Commandments",
          explanation: "The scenario: Fight ten elite demon warriors who each carry a 'Commandment'—a curse that punishes specific behaviors. One makes anyone who hates in his presence lose the will to fight. Another kills anyone who shows cowardice. Your pick must defeat beings with overwhelming power while navigating psychological traps that punish normal combat instincts."
        },
        {
          id: 32,
          prompt: "This character can learn Nen.",
          source: "Hunter x Hunter — Nen (Aura Technique)",
          explanation: "The scenario: Master a power system that requires opening your aura nodes (excruciatingly painful), learning four fundamental techniques, discovering your personal ability type, and developing a unique power with strict self-imposed limitations. Training takes months of meditation and near-death experiences. Your pick must have the discipline, creativity, and pain tolerance to develop usable Nen abilities."
        },
        {
          id: 33,
          prompt: "This character can convince the entire world to give Goku their energy for the Spirit Bomb.",
          source: "Dragon Ball Z — Spirit Bomb (Genki Dama)",
          explanation: "The scenario: Earth is about to be destroyed and the only hope is a technique that requires every living person to voluntarily raise their hands and share life energy with a stranger. Most people have never heard of you. Your pick must convince 7 billion people—across every language, culture, and level of skepticism—to participate simultaneously."
        },
        {
          id: 34,
          prompt: "This character can reach the 250th floor on Heaven's Arena.",
          source: "Hunter x Hunter — Heaven's Arena",
          explanation: "The scenario: Fight your way up a 251-floor combat tower where each floor's opponents are stronger. Below floor 200, it's just skilled fighters. Above 200, everyone uses supernatural aura techniques, and you must learn to use them too or die. Your pick must win dozens of consecutive fights against increasingly superhuman opponents while learning an entirely new power system mid-climb."
        },
        {
          id: 35,
          prompt: "This character can endure being tortured by Jason (Yamori) without breaking.",
          source: "Tokyo Ghoul — Kaneki vs Jason Torture",
          explanation: "The scenario: A sadistic torturer with regeneration abilities uses you as entertainment for weeks. He cuts off fingers and toes repeatedly (they grow back, then he cuts them again), forces you to count down while he decides what to remove next, and is specifically trying to destroy your sanity—not extract information. Your pick must endure physical agony and psychological warfare without losing their mind."
        },
        {
          id: 36,
          prompt: "This character is unaffected by Estarossa's Commandment.",
          source: "Seven Deadly Sins — Estarossa's Commandment of Love",
          explanation: "The scenario: Fight an opponent whose mere presence neutralizes anyone who feels hatred toward him. The moment you feel genuine hostility, your ability to attack shuts off completely. Your pick must fight and win while feeling zero hatred, anger, or malice—pure combat without emotional investment, or a mindset that genuinely doesn't process hostility normally."
        },
        {
          id: 37,
          prompt: "This character will defend you even when you're wrong.",
          source: "N/A — Loyalty & Ride-or-Die Energy",
          explanation: "The scenario: You made a mistake—morally, strategically, or personally—and the world knows it. This isn't about whether you deserve defense. Your pick must be someone who would publicly stand with you, argue on your behalf, and protect you from consequences purely out of loyalty, love, or personal code—even knowing you're in the wrong."
        },
        {
          id: 38,
          prompt: "This character can win Greed Island.",
          source: "Hunter x Hunter — Greed Island",
          explanation: "The scenario: Complete a deadly video game that takes place in a real pocket dimension. You must collect 100 specific cards, but cards are also players' lives—some kill to steal, others form alliances. Monsters guard rare cards, puzzles require lateral thinking, and player-killers have been farming here for years. Your pick must survive and collect everything while being hunted by veterans."
        },
        {
          id: 39,
          prompt: "This character can beat Igris.",
          source: "Solo Leveling — Igris the Bloodred Commander",
          explanation: "The scenario: Duel an undead knight commander in full armor with a broadsword, possessing superhuman speed, strength, and technique refined over centuries. He shows no emotion, makes no mistakes, and pressures constantly. Your pick must match or exceed elite swordsmanship and reaction speed in a straight fight with no tricks—pure combat against a perfected warrior."
        },
        {
          id: 40,
          prompt: "This character's strategic mind rivals that of Shikamaru.",
          source: "Naruto — Shikamaru's Battle IQ",
          explanation: "The scenario: Outthink an opponent renowned for seeing 200+ moves ahead, turning environmental factors into weapons, and winning unwinnable fights through pure planning. Your pick must demonstrate comparable battlefield analysis, enemy prediction, resource management, and the ability to create victory conditions from nothing while under pressure."
        },
        {
          id: 41,
          prompt: "This character will do the ultimate sacrifice.",
          source: "Dragon Ball Z — Final Sacrifice Moments",
          explanation: "The scenario: The only way to win is to die. Not 'risk death'—guaranteed death, with no loopholes, no resurrection, no coming back. Everyone you love survives because you don't. Your pick must be someone who would make that choice without hesitation when the moment comes, valuing others' lives over their own existence."
        },
        {
          id: 42,
          prompt: "This character can survive the Gate of Truth's toll and still complete a human transmutation to bring someone back.",
          source: "Fullmetal Alchemist: Brotherhood — Human Transmutation & The Truth",
          explanation: "The scenario: Attempting to resurrect the dead forces you before a cosmic entity that takes something of equal value—limbs, organs, senses, or years of life. Most people who try die or become crippled. Your pick must pay a devastating toll, survive the loss, and still successfully complete the transmutation to bring back a real, complete person."
        },
        {
          id: 43,
          prompt: "This character can win Duelist Kingdom without cheating, rule-breaking mind games, or outside interference.",
          source: "Yu-Gi-Oh! (Original) — Duelist Kingdom Tournament",
          explanation: "The scenario: Win a card game tournament playing completely fair. No illegal cards, no rule exploitation, no intimidation tactics, no friends giving you cards mid-duel. Your pick must beat elite duelists through pure strategy, deck building, and adaptation—in a tournament where cheating is normal and playing fair is a handicap."
        },
        {
          id: 44,
          prompt: "This character can keep Subaru alive through the Mansion Arc without knowing about Return by Death.",
          source: "Re:Zero — Roswaal's Mansion Arc (Early Loops)",
          explanation: "The scenario: Protect someone who keeps dying to hidden causes in a mansion full of distrustful strangers. A curse kills him in his sleep. A maid secretly hates him. The information you need is held by people who won't talk. Your pick must identify the threats and neutralize them in one attempt—no do-overs, no resets, no prior knowledge of what goes wrong."
        },
        {
          id: 45,
          prompt: "This character can win the Greed Island game and secure the victory condition without relying on brute force alone.",
          source: "Hunter x Hunter — Greed Island Completion",
          explanation: "The scenario: Complete a game where card collection is mandatory, cards have complex rules about trading/stealing/using, and other players have years of experience. Combat is just one tool—you also need trading networks, information gathering, and understanding game mechanics well enough to acquire specific rare cards that can't just be taken by force."
        },
        {
          id: 46,
          prompt: "This character can prevent a wave of copycat villains after the Stain incident by controlling the narrative and inspiring the right kind of heroism.",
          source: "My Hero Academia — Hero Killer Stain Aftermath",
          explanation: "The scenario: A villain publicly called out corrupt heroes before his arrest, and his message went viral. Now criminals are invoking his name, civilians distrust heroes, and his ideology is spreading. Your pick must counter the narrative through public relations, policy change, or inspiring alternatives—not just arresting copycats, but stopping the idea from spreading."
        },
        {
          id: 47,
          prompt: "This character can infiltrate the Great Tomb of Nazarick and escape with meaningful intel without triggering a full wipe.",
          source: "Overlord — Nazarick's Lethal Defense & Information Control",
          explanation: "The scenario: Spy on a dungeon fortress run by an undead god, protected by traps that kill instantly, guardians that can solo armies, and surveillance covering every inch. Intruders are tortured for information, then killed painfully. Your pick must enter, learn something useful (layout, capabilities, weaknesses, plans), and escape before the alarm means death."
        },
        {
          id: 48,
          prompt: "This character can keep Kaneki from losing himself during Jason (Yamori)'s torture by stabilizing him psychologically before the breaking point.",
          source: "Tokyo Ghoul — Yamori Torture & Kaneki's Break",
          explanation: "The scenario: Rescue or stabilize someone being psychologically destroyed through extended torture designed to shatter identity. The torturer wants his victim to 'break' and become something else. Your pick must intervene—through rescue, support, or disruption—before the victim's core personality is permanently destroyed by trauma."
        },
        {
          id: 49,
          prompt: "This character can capture a dungeon and obtain a Djinn Metal Vessel without dying or being mentally broken by the trials.",
          source: "Magi: The Labyrinth of Magic — Dungeon Capture",
          explanation: "The scenario: Complete a gauntlet dungeon designed by a godlike being to test worthiness. Monsters, puzzles, moral choices, and illusions that prey on fears and regrets. At the end, a supernatural entity judges if you deserve power. Your pick must clear every trial and be found worthy—surviving physically and mentally intact."
        },
        {
          id: 50,
          prompt: "This character can stop Kira before he identifies them—while operating in Kanto with only the same basic early-case info the task force had.",
          source: "Death Note — Early Kira Investigation",
          explanation: "The scenario: Hunt a serial killer who can murder anyone whose name and face he knows, using only a notebook. He monitors police, controls victims' actions before death, and has a god-complex. Your pick must identify 'Kira' before he learns their identity—using early-case clues: death patterns, victim selection, broadcast timing. One mistake and your name gets written."
        },

        // ============================================
        // 10 NEW SCENARIOS (IDs 51-60)
        // ============================================
        {
          id: 51,
          prompt: "This character can survive Floor 100 of Aincrad and clear Sword Art Online.",
          source: "Sword Art Online — Death Game Clear Condition",
          explanation: "The scenario: You're trapped in a VR game where dying in-game kills your real body. 100 floors of dungeons, each with a boss that has wiped entire raid parties. No respawns, no logout, and 4,000 players have already died. Your pick must survive two years of combat, clear increasingly impossible bosses, and reach the final floor—knowing every fight could be their last."
        },
        {
          id: 52,
          prompt: "This character can talk Thorfinn out of his revenge path and redirect him toward peace.",
          source: "Vinland Saga — Thorfinn's Revenge Arc",
          explanation: "The scenario: Convince a young warrior consumed by hatred to abandon revenge against the man who killed his father—a man he's followed for years specifically to kill. His entire identity is built around this vengeance. Your pick must reach him emotionally, philosophically, or spiritually and give him a reason to live for something other than murder."
        },
        {
          id: 53,
          prompt: "This character can escape Tartarus prison.",
          source: "My Hero Academia — Tartarus Maximum Security Prison",
          explanation: "The scenario: Break out of a prison designed to hold the world's most dangerous superhumans. Quirk-suppressing technology everywhere, guards with lethal authorization, cells designed for each prisoner's specific abilities, and located on a remote island. Your pick must escape containment designed specifically to counter their abilities and reach freedom."
        },
        {
          id: 54,
          prompt: "This character can beat Saitama in an eating contest.",
          source: "One Punch Man — Saitama's Casual Competitions",
          explanation: "The scenario: Out-eat a man who lives for bargain sales and free food, whose entire budget goes to groceries, and who treats eating as one of the few pleasures in his boring life. This isn't about power—it's about appetite, stomach capacity, and competitive eating determination. Your pick must genuinely out-consume him."
        },
        {
          id: 55,
          prompt: "This character can convince Guts to let them travel with him.",
          source: "Berserk — Guts' Lone Wolf Phase",
          explanation: "The scenario: Convince a traumatized warrior who pushes everyone away—because everyone close to him dies horribly—to let you join his journey. He's been betrayed by his best friend, lost everything, and actively believes companionship is a death sentence. Your pick must break through walls of trauma, distrust, and self-isolation."
        },
        {
          id: 56,
          prompt: "This character can pass the State Alchemist examination.",
          source: "Fullmetal Alchemist — State Alchemist Certification",
          explanation: "The scenario: Pass a military examination that requires demonstrating unique alchemical ability valuable to the state, passing written tests on advanced chemistry and transmutation theory, and impressing a panel of existing State Alchemists. Most applicants fail for years. Your pick must show either exceptional knowledge or a unique talent worth military investment."
        },
        {
          id: 57,
          prompt: "This character can become a Hashira.",
          source: "Demon Slayer — Hashira Rank Achievement",
          explanation: "The scenario: Reach the highest rank of demon slayers by killing 50 demons OR killing at least one of the Twelve Kizuki (elite demons who have slaughtered hundreds of slayers each). Your pick must master a breathing style, survive countless near-death battles, and either grind through 50 kills or defeat a demon that one-shots most humans."
        },
        {
          id: 58,
          prompt: "This character can outsmart Johan Liebert.",
          source: "Monster — Johan's Psychological Manipulation",
          explanation: "The scenario: Outmaneuver a genius manipulator who has driven dozens of people to suicide or murder using only words, understands human psychology at a terrifying level, and has no emotional vulnerabilities to exploit. He's always three steps ahead because he genuinely doesn't care if he lives or dies. Your pick must predict and counter someone with no weaknesses and perfect read on human nature."
        },
        {
          id: 59,
          prompt: "This character can survive one year in the world of Goblin Slayer as a rookie adventurer.",
          source: "Goblin Slayer — Rookie Adventurer Survival",
          explanation: "The scenario: Survive 12 months as a starting adventurer in a world where goblins specifically target beginners, experienced adventurers ignore goblin quests, and one ambush means death or worse. No plot armor, no rescue—just the quests available to newcomers and the knowledge that most rookies don't last their first month."
        },
        {
          id: 60,
          prompt: "This character can make it through the Eclipse and survive the God Hand's advent.",
          source: "Berserk — The Eclipse",
          explanation: "The scenario: Survive a nightmarish ritual where thousands of demons manifest to slaughter everyone present as a sacrifice. Space warps, escape routes vanish, and god-like entities orchestrate the massacre. Even elite warriors die in seconds. Your pick must survive until dawn against endless demons in a dimension designed for their death—where only two people canonically survived."
        }
      ],

      // Character pool: objects so we can display origin title on the board
      characters: [
        // Dragon Ball Series
        { name: "Goku", anime: "Dragon Ball Series" },
        { name: "Vegeta", anime: "Dragon Ball Series" },
        { name: "Gohan", anime: "Dragon Ball Series" },
        { name: "Trunks", anime: "Dragon Ball Series" },
        { name: "Piccolo", anime: "Dragon Ball Series" },
        { name: "Frieza", anime: "Dragon Ball Series" },
        { name: "Cell", anime: "Dragon Ball Series" },
        { name: "Majin Buu", anime: "Dragon Ball Series" },
        { name: "Beerus", anime: "Dragon Ball Series" },
        { name: "Whis", anime: "Dragon Ball Series" },
        { name: "Jiren", anime: "Dragon Ball Series" },
        { name: "Broly", anime: "Dragon Ball Series" },
        { name: "Hit", anime: "Dragon Ball Series" },
        { name: "Goku Black", anime: "Dragon Ball Series" },
        { name: "Zamasu", anime: "Dragon Ball Series" },
        { name: "Vegito", anime: "Dragon Ball Series" },
        { name: "Gogeta", anime: "Dragon Ball Series" },
        { name: "Gotenks", anime: "Dragon Ball Series" },
        { name: "Android 17", anime: "Dragon Ball Series" },
        { name: "Android 18", anime: "Dragon Ball Series" },
        { name: "Future Trunks", anime: "Dragon Ball Series" },
        { name: "Master Roshi", anime: "Dragon Ball Series" },
        { name: "Krillin", anime: "Dragon Ball Series" },
        { name: "Tien Shinhan", anime: "Dragon Ball Series" },
        { name: "Bulma", anime: "Dragon Ball Series" },
        { name: "Kid Buu", anime: "Dragon Ball Series" },
        { name: "Omega Shenron", anime: "Dragon Ball Series" },
        { name: "Super Saiyan 4 Gogeta", anime: "Dragon Ball Series" },
        { name: "Super 17", anime: "Dragon Ball Series" },
        { name: "Bardock", anime: "Dragon Ball Series" },

        // Naruto Series
        { name: "Naruto Uzumaki", anime: "Naruto Series" },
        { name: "Sasuke Uchiha", anime: "Naruto Series" },
        { name: "Kakashi Hatake", anime: "Naruto Series" },
        { name: "Rock Lee", anime: "Naruto Series" },
        { name: "Orochimaru", anime: "Naruto Series" },
        { name: "Itachi Uchiha", anime: "Naruto Series" },
        { name: "Madara Uchiha", anime: "Naruto Series" },
        { name: "Obito Uchiha", anime: "Naruto Series" },
        { name: "Pain (Nagato)", anime: "Naruto Series" },
        { name: "Minato Namikaze", anime: "Naruto Series" },
        { name: "Jiraiya", anime: "Naruto Series" },
        { name: "Tsunade", anime: "Naruto Series" },
        { name: "Might Guy", anime: "Naruto Series" },
        { name: "Hashirama Senju", anime: "Naruto Series" },
        { name: "Hiruzen Sarutobi", anime: "Naruto Series" },
        { name: "Killer Bee", anime: "Naruto Series" },
        { name: "Shikamaru Nara", anime: "Naruto Series" },
        { name: "Neji Hyuga", anime: "Naruto Series" },
        { name: "Kabuto Yakushi", anime: "Naruto Series" },
        { name: "Kaguya Otsutsuki", anime: "Naruto Series" },

        // Attack on Titan
        { name: "Eren Yeager", anime: "Attack on Titan" },
        { name: "Armin Arlert", anime: "Attack on Titan" },
        { name: "Reiner Braun", anime: "Attack on Titan" },
        { name: "Zeke Yeager", anime: "Attack on Titan" },
        { name: "Annie Leonhart", anime: "Attack on Titan" },
        { name: "Bertholdt Hoover", anime: "Attack on Titan" },
        { name: "Levi Ackerman", anime: "Attack on Titan" },
        { name: "Erwin Smith", anime: "Attack on Titan" },

        // My Hero Academia
        { name: "Izuku Midoriya (Deku)", anime: "My Hero Academia" },
        { name: "Katsuki Bakugo", anime: "My Hero Academia" },
        { name: "Shoto Todoroki", anime: "My Hero Academia" },
        { name: "All Might", anime: "My Hero Academia" },
        { name: "Endeavor", anime: "My Hero Academia" },
        { name: "Shota Aizawa (Eraser Head)", anime: "My Hero Academia" },
        { name: "Hawks", anime: "My Hero Academia" },
        { name: "Tomura Shigaraki", anime: "My Hero Academia" },
        { name: "Dabi", anime: "My Hero Academia" },
        { name: "All For One", anime: "My Hero Academia" },

        // Jujutsu Kaisen
        { name: "Yuji Itadori", anime: "Jujutsu Kaisen" },
        { name: "Megumi Fushiguro", anime: "Jujutsu Kaisen" },
        { name: "Nobara Kugisaki", anime: "Jujutsu Kaisen" },
        { name: "Satoru Gojo", anime: "Jujutsu Kaisen" },
        { name: "Ryomen Sukuna", anime: "Jujutsu Kaisen" },
        { name: "Yuta Okkotsu", anime: "Jujutsu Kaisen" },
        { name: "Maki Zenin", anime: "Jujutsu Kaisen" },
        { name: "Toji Fushiguro", anime: "Jujutsu Kaisen" },
        { name: "Suguru Geto", anime: "Jujutsu Kaisen" },
        { name: "Kento Nanami", anime: "Jujutsu Kaisen" },

        // Black Clover
        { name: "Asta", anime: "Black Clover" },
        { name: "Yuno", anime: "Black Clover" },
        { name: "Noelle Silva", anime: "Black Clover" },
        { name: "Yami Sukehiro", anime: "Black Clover" },
        { name: "Julius Novachrono", anime: "Black Clover" },
        { name: "Mereoleona Vermillion", anime: "Black Clover" },
        { name: "Fuegoleon Vermillion", anime: "Black Clover" },
        { name: "Nozel Silva", anime: "Black Clover" },
        { name: "Luck Voltia", anime: "Black Clover" },
        { name: "Charmy Pappitson", anime: "Black Clover" },
        { name: "Nacht Faust", anime: "Black Clover" },
        { name: "Lucius Zogratis", anime: "Black Clover" },
        { name: "Zenon Zogratis", anime: "Black Clover" },
        { name: "Dante Zogratis", anime: "Black Clover" },
        { name: "Vanica Zogratis", anime: "Black Clover" },

        // One Piece
        { name: "Monkey D. Luffy", anime: "One Piece" },
        { name: "Roronoa Zoro", anime: "One Piece" },
        { name: "Sanji", anime: "One Piece" },
        { name: "Nami", anime: "One Piece" },
        { name: "Nico Robin", anime: "One Piece" },
        { name: "Shanks", anime: "One Piece" },
        { name: "Whitebeard", anime: "One Piece" },
        { name: "Kaido", anime: "One Piece" },
        { name: "Big Mom", anime: "One Piece" },
        { name: "Blackbeard", anime: "One Piece" },

        // Tokyo Ghoul
        { name: "Ken Kaneki", anime: "Tokyo Ghoul" },
        { name: "Touka Kirishima", anime: "Tokyo Ghoul" },
        { name: "Juuzou Suzuya", anime: "Tokyo Ghoul" },
        { name: "Kuzen Yoshimura", anime: "Tokyo Ghoul" },
        { name: "Koutarou Amon", anime: "Tokyo Ghoul" },
        { name: "Rize Kamishiro", anime: "Tokyo Ghoul" },
        { name: "Eto Yoshimura", anime: "Tokyo Ghoul" },
        { name: "Kishou Arima", anime: "Tokyo Ghoul" },
        { name: "Hinami Fueguchi", anime: "Tokyo Ghoul" },
        { name: "Shuu Tsukiyama", anime: "Tokyo Ghoul" },

        // Hunter x Hunter
        { name: "Gon Freecss", anime: "Hunter x Hunter" },
        { name: "Killua Zoldyck", anime: "Hunter x Hunter" },
        { name: "Kurapika", anime: "Hunter x Hunter" },
        { name: "Leorio Paradinight", anime: "Hunter x Hunter" },
        { name: "Hisoka", anime: "Hunter x Hunter" },
        { name: "Chrollo Lucilfer", anime: "Hunter x Hunter" },
        { name: "Isaac Netero", anime: "Hunter x Hunter" },
        { name: "Meruem", anime: "Hunter x Hunter" },
        { name: "Neferpitou", anime: "Hunter x Hunter" },
        { name: "Biscuit Krueger", anime: "Hunter x Hunter" },
        { name: "Illumi Zoldyck", anime: "Hunter x Hunter" },
        { name: "Feitan Portor", anime: "Hunter x Hunter" },
        { name: "Shaiapouf", anime: "Hunter x Hunter" },
        { name: "Menthuthuyoupi", anime: "Hunter x Hunter" },
        { name: "Kite", anime: "Hunter x Hunter" },

        // Bleach
        { name: "Ichigo Kurosaki", anime: "Bleach" },
        { name: "Rukia Kuchiki", anime: "Bleach" },
        { name: "Byakuya Kuchiki", anime: "Bleach" },
        { name: "Kenpachi Zaraki", anime: "Bleach" },
        { name: "Sosuke Aizen", anime: "Bleach" },
        { name: "Ulquiorra Cifer", anime: "Bleach" },
        { name: "Grimmjow Jaegerjaquez", anime: "Bleach" },
        { name: "Toshiro Hitsugaya", anime: "Bleach" },
        { name: "Yoruichi Shihouin", anime: "Bleach" },
        { name: "Kisuke Urahara", anime: "Bleach" },

        // Tokyo Revengers
        { name: "Takemichi Hanagaki", anime: "Tokyo Revengers" },
        { name: "Manjiro Sano (Mikey)", anime: "Tokyo Revengers" },
        { name: "Ken Ryuguji (Draken)", anime: "Tokyo Revengers" },
        { name: "Tetta Kisaki", anime: "Tokyo Revengers" },
        { name: "Keisuke Baji", anime: "Tokyo Revengers" },
        { name: "Chifuyu Matsuno", anime: "Tokyo Revengers" },
        { name: "Kazutora Hanemiya", anime: "Tokyo Revengers" },
        { name: "Taiju Shiba", anime: "Tokyo Revengers" },
        { name: "Hakkai Shiba", anime: "Tokyo Revengers" },
        { name: "Izana Kurokawa", anime: "Tokyo Revengers" },

        // Fullmetal Alchemist
        { name: "Edward Elric", anime: "Fullmetal Alchemist: Brotherhood" },
        { name: "Alphonse Elric", anime: "Fullmetal Alchemist: Brotherhood" },
        { name: "Roy Mustang", anime: "Fullmetal Alchemist: Brotherhood" },
        { name: "Scar", anime: "Fullmetal Alchemist: Brotherhood" },
        { name: "King Bradley", anime: "Fullmetal Alchemist: Brotherhood" },

        // Wind Breaker
        { name: "Haruka Sakura", anime: "Wind Breaker" },
        { name: "Hajime Umemiya", anime: "Wind Breaker" },
        { name: "Hayato Suo", anime: "Wind Breaker" },
        { name: "Kyotaro Sugishita", anime: "Wind Breaker" },
        { name: "Jo Togame", anime: "Wind Breaker" },
        { name: "Akihiko Nirei", anime: "Wind Breaker" },
        { name: "Ren Kaji", anime: "Wind Breaker" },
        { name: "Taiga Tsugeura", anime: "Wind Breaker" },
        { name: "Mitsuki Kiryu", anime: "Wind Breaker" },
        { name: "Tsubakino Tasuku", anime: "Wind Breaker" },

        // Mushoku Tensei
        { name: "Rudeus Greyrat", anime: "Mushoku Tensei" },
        { name: "Eris Boreas Greyrat", anime: "Mushoku Tensei" },
        { name: "Roxy Migurdia", anime: "Mushoku Tensei" },
        { name: "Sylphiette", anime: "Mushoku Tensei" },
        { name: "Orsted", anime: "Mushoku Tensei" },
        { name: "Ruijerd Superdia", anime: "Mushoku Tensei" },
        { name: "Paul Greyrat", anime: "Mushoku Tensei" },
        { name: "Ghislaine Dedoldia", anime: "Mushoku Tensei" },
        { name: "Kishirika Kishirisu", anime: "Mushoku Tensei" },
        { name: "Hitogami", anime: "Mushoku Tensei" },

        // Kaiju No. 8
        { name: "Kafka Hibino", anime: "Kaiju No. 8" },
        { name: "Mina Ashiro", anime: "Kaiju No. 8" },
        { name: "Reno Ichikawa", anime: "Kaiju No. 8" },
        { name: "Kikoru Shinomiya", anime: "Kaiju No. 8" },
        { name: "Soshiro Hoshina", anime: "Kaiju No. 8" },

        // Solo Leveling
        { name: "Sung Jinwoo", anime: "Solo Leveling" },
        { name: "Cha Hae-In", anime: "Solo Leveling" },
        { name: "Yoo Jinho", anime: "Solo Leveling" },
        { name: "Go Gunhee", anime: "Solo Leveling" },
        { name: "Thomas Andre", anime: "Solo Leveling" },
        { name: "Liu Zhigang", anime: "Solo Leveling" },
        { name: "Igris", anime: "Solo Leveling" },
        { name: "Beru", anime: "Solo Leveling" },
        { name: "Antares", anime: "Solo Leveling" },
        { name: "Choi Jong-In", anime: "Solo Leveling" },

        // Arifureta
        { name: "Hajime Nagumo", anime: "Arifureta" },
        { name: "Yue", anime: "Arifureta" },
        { name: "Shea Haulia", anime: "Arifureta" },
        { name: "Tio Klarus", anime: "Arifureta" },
        { name: "Kaori Shirasaki", anime: "Arifureta" },

        // Code Geass
        { name: "Lelouch vi Britannia", anime: "Code Geass" },
        { name: "Suzaku Kururugi", anime: "Code Geass" },
        { name: "C.C.", anime: "Code Geass" },
        { name: "Kallen Kozuki", anime: "Code Geass" },
        { name: "Schneizel el Britannia", anime: "Code Geass" },

        // Fairy Tail
        { name: "Natsu Dragneel", anime: "Fairy Tail" },
        { name: "Lucy Heartfilia", anime: "Fairy Tail" },
        { name: "Erza Scarlet", anime: "Fairy Tail" },
        { name: "Gray Fullbuster", anime: "Fairy Tail" },
        { name: "Happy", anime: "Fairy Tail" },
        { name: "Wendy Marvell", anime: "Fairy Tail" },
        { name: "Jellal Fernandes", anime: "Fairy Tail" },
        { name: "Gajeel Redfox", anime: "Fairy Tail" },
        { name: "Zeref", anime: "Fairy Tail" },
        { name: "Acnologia", anime: "Fairy Tail" },

        // Seven Deadly Sins
        { name: "Meliodas", anime: "Seven Deadly Sins" },
        { name: "Ban", anime: "Seven Deadly Sins" },
        { name: "Escanor", anime: "Seven Deadly Sins" },
        { name: "King", anime: "Seven Deadly Sins" },
        { name: "Diane", anime: "Seven Deadly Sins" },
        { name: "Merlin", anime: "Seven Deadly Sins" },
        { name: "Gowther", anime: "Seven Deadly Sins" },
        { name: "Elizabeth Liones", anime: "Seven Deadly Sins" },
        { name: "Mael", anime: "Seven Deadly Sins" },
        { name: "Zeldris", anime: "Seven Deadly Sins" },
        { name: "Estarossa", anime: "Seven Deadly Sins" },
        { name: "Drole", anime: "Seven Deadly Sins" },
        { name: "Gloxinia", anime: "Seven Deadly Sins" },
        { name: "Chandler", anime: "Seven Deadly Sins" },
        { name: "Cusack", anime: "Seven Deadly Sins" },

        // Overlord
        { name: "Ainz Ooal Gown", anime: "Overlord" },
        { name: "Albedo", anime: "Overlord" },
        { name: "Demiurge", anime: "Overlord" },
        { name: "Shalltear Bloodfallen", anime: "Overlord" },
        { name: "Cocytus", anime: "Overlord" },
        { name: "Sebas Tian", anime: "Overlord" },
        { name: "Aura Bella Fiora", anime: "Overlord" },
        { name: "Mare Bello Fiore", anime: "Overlord" },
        { name: "Pandora's Actor", anime: "Overlord" },
        { name: "Gazef Stronoff", anime: "Overlord" },

        // Re:Zero
        { name: "Subaru Natsuki", anime: "Re:Zero" },
        { name: "Emilia", anime: "Re:Zero" },
        { name: "Rem", anime: "Re:Zero" },
        { name: "Ram", anime: "Re:Zero" },
        { name: "Reinhard van Astrea", anime: "Re:Zero" },

        // Tower of God
        { name: "Twenty-Fifth Baam", anime: "Tower of God" },
        { name: "Khun Aguero Agnis", anime: "Tower of God" },
        { name: "Rak Wraithraiser", anime: "Tower of God" },
        { name: "Endorsi Jahad", anime: "Tower of God" },
        { name: "Rachel", anime: "Tower of God" },

        // Yu Yu Hakusho
        { name: "Yusuke Urameshi", anime: "Yu Yu Hakusho" },
        { name: "Kazuma Kuwabara", anime: "Yu Yu Hakusho" },
        { name: "Kurama", anime: "Yu Yu Hakusho" },
        { name: "Hiei", anime: "Yu Yu Hakusho" },
        { name: "Genkai", anime: "Yu Yu Hakusho" },
        { name: "Toguro (Younger)", anime: "Yu Yu Hakusho" },
        { name: "Shinobu Sensui", anime: "Yu Yu Hakusho" },
        { name: "Koenma", anime: "Yu Yu Hakusho" },
        { name: "Raizen", anime: "Yu Yu Hakusho" },
        { name: "Yomi", anime: "Yu Yu Hakusho" },

        // Tsukimichi: Moonlit Fantasy
        { name: "Makoto Misumi", anime: "Tsukimichi: Moonlit Fantasy" },
        { name: "Tomoe", anime: "Tsukimichi: Moonlit Fantasy" },
        { name: "Mio", anime: "Tsukimichi: Moonlit Fantasy" },
        { name: "Sofia Bulga", anime: "Tsukimichi: Moonlit Fantasy" },
        { name: "Shiki", anime: "Tsukimichi: Moonlit Fantasy" },

        // The Wrong Way to Use Healing Magic
        { name: "Usato", anime: "The Wrong Way to Use Healing Magic" },
        { name: "Rose", anime: "The Wrong Way to Use Healing Magic" },
        { name: "Suzune Inukami", anime: "The Wrong Way to Use Healing Magic" },
        { name: "Kazuki Ryuusen", anime: "The Wrong Way to Use Healing Magic" },
        { name: "Amako", anime: "The Wrong Way to Use Healing Magic" },

        // The Misfit of Demon King Academy
        { name: "Anos Voldigoad", anime: "The Misfit of Demon King Academy" },
        { name: "Misha Necron", anime: "The Misfit of Demon King Academy" },
        { name: "Sasha Necron", anime: "The Misfit of Demon King Academy" },
        { name: "Lay Glanzudlii", anime: "The Misfit of Demon King Academy" },
        { name: "Shin Reglia", anime: "The Misfit of Demon King Academy" },

        // "Overly Cautious Hero
        { name: "Seiya Ryuuguuin", anime: "Overly Cautious Hero" },
        { name: "Ristarte", anime: "Overly Cautious Hero" },
        { name: "Valkyrie", anime: "Overly Cautious Hero" },
        { name: "Aria", anime: "Overly Cautious Hero" },
        { name: "Ishtar", anime: "Overly Cautious Hero" },

        // Magi
        { name: "Aladdin", anime: "Magi (Labyrinth + Sinbad)" },
        { name: "Alibaba Saluja", anime: "Magi (Labyrinth + Sinbad)" },
        { name: "Morgiana", anime: "Magi (Labyrinth + Sinbad)" },
        { name: "Sinbad", anime: "Magi (Labyrinth + Sinbad)" },
        { name: "Judar", anime: "Magi (Labyrinth + Sinbad)" },
        { name: "Hakuryuu Ren", anime: "Magi (Labyrinth + Sinbad)" },
        { name: "Kouen Ren", anime: "Magi (Labyrinth + Sinbad)" },
        { name: "Jafar", anime: "Magi (Labyrinth + Sinbad)" },
        { name: "Yunan", anime: "Magi (Labyrinth + Sinbad)" },
        { name: "Masrur", anime: "Magi (Labyrinth + Sinbad)" },

        // The World’s Finest Assassin Gets Reincarnated as an Aristocrat
        { name: "Lugh Tuatha Dé", anime: "The World’s Finest Assassin Gets Reincarnated as an Aristocrat" },
        { name: "Dia Viekone", anime: "The World’s Finest Assassin Gets Reincarnated as an Aristocrat" },
        { name: "Tarte", anime: "The World’s Finest Assassin Gets Reincarnated as an Aristocrat" },
        { name: "Maha", anime: "The World’s Finest Assassin Gets Reincarnated as an Aristocrat" },
        { name: "Cian Tuatha Dé", anime: "The World’s Finest Assassin Gets Reincarnated as an Aristocrat" },

        // Parasyte: The Maxim
        { name: "Shinichi Izumi", anime: "Parasyte: The Maxim" },
        { name: "Migi", anime: "Parasyte: The Maxim" },
        { name: "Reiko Tamura", anime: "Parasyte: The Maxim" },
        { name: "Gotou", anime: "Parasyte: The Maxim" },
        { name: "Satomi Murano", anime: "Parasyte: The Maxim" },

        // The Avatar Series
        { name: "Aang", anime: "Avatar (ATLA + Korra)" },
        { name: "Katara", anime: "Avatar (ATLA + Korra)" },
        { name: "Sokka", anime: "Avatar (ATLA + Korra)" },
        { name: "Toph Beifong", anime: "Avatar (ATLA + Korra)" },
        { name: "Zuko", anime: "Avatar (ATLA + Korra)" },
        { name: "Uncle Iroh", anime: "Avatar (ATLA + Korra)" },
        { name: "Azula", anime: "Avatar (ATLA + Korra)" },
        { name: "Appa", anime: "Avatar (ATLA + Korra)" },
        { name: "Momo", anime: "Avatar (ATLA + Korra)" },
        { name: "Fire Lord Ozai", anime: "Avatar (ATLA + Korra)" },
        { name: "Korra", anime: "Avatar (ATLA + Korra)" },
        { name: "Asami Sato", anime: "Avatar (ATLA + Korra)" },
        { name: "Mako", anime: "Avatar (ATLA + Korra)" },
        { name: "Bolin", anime: "Avatar (ATLA + Korra)" },
        { name: "Tenzin", anime: "Avatar (ATLA + Korra)" },

      ]
    },

    // =========================================================
    // EMPTY PACK TEMPLATES (READY FOR FUTURE CONTENT)
    // =========================================================
    movies: {
      label: "Movies",
      modifiers: [],
      prompts: [],
      characters: [],
      templates: {
        modifier: "Example: Time limit is 24 hours.",
        prompt: {
          id: 1, prompt: "This character can survive the John Wick nightclub sequence and escape clean.",
          source: "John Wick — Red Circle Club",
          explanation: "A high-pressure action setpiece with stealth, gunfights, and quick decisions under chaos."
        },
        character: { name: "John Wick", anime: "John Wick" }
      }
    },

    series: {
      label: "Series",
      modifiers: [],
      prompts: [],
      characters: [],
      templates: {
        modifier: "Example: Must do it without using violence.",
        prompt: {
          id: 1, prompt: "This character can uncover Hawkins Lab’s secrets without getting caught.",
          source: "Stranger Things — Hawkins Lab Mystery",
          explanation: "Investigation + stealth + survival against a powerful organization monitoring the town."
        },
        character: { name: "Eleven", anime: "Stranger Things" }
      }
    },

    cartoons: {
      label: "Cartoons",
      modifiers: [],
      prompts: [],
      characters: [],
      templates: {
        modifier: [
          "No gadgets/equipments/weapons allowed.",
          "No magic/elemental powers allowed.",
          "Sokka from Avatar, the last airbender decided to join you.",
          "Disregard the prompt. Can your pick beat Goku?",
        ],
        prompts: [
          // 1) Batman: The Animated Series
          {
            id: 1,
            prompt: "This character can solve a Gotham-level murder mystery in one night while avoiding being targeted by the killer.",
            source: "Batman: The Animated Series — Detective case under deadline",
            explanation: "This is brains + survival. The character must gather clues, interrogate suspects, and connect the full story before morning while the criminal actively tries to silence them."
          },
          {
            id: 2,
            prompt: "This character can survive being trapped in a Joker-style 'choice game' where every option risks innocent lives.",
            source: "Batman: The Animated Series — Joker trap scenario",
            explanation: "The villain controls the environment and forces brutal decisions. Winning means keeping control mentally, saving civilians, and escaping without falling for distractions."
          },
          {
            id: 3,
            prompt: "This character can escape Arkham Asylum during a full breakout event without being captured or injured.",
            source: "Batman: The Animated Series — Arkham breakout chaos",
            explanation: "Multiple threats everywhere, doors locked, traps possible, and nobody trustworthy. The character must navigate chaos and survive long enough to escape clean."
          },

          // 2) Superman: The Animated Series
          {
            id: 4,
            prompt: "This character can stop a city-wide disaster without causing massive collateral damage.",
            source: "Superman: The Animated Series — Metropolis crisis response",
            explanation: "Power is dangerous here. The character must save civilians, stabilize the situation, and neutralize the threat without accidentally leveling the city."
          },
          {
            id: 5,
            prompt: "This character can defeat a Brainiac-level enemy that adapts, hacks systems, and learns mid-fight.",
            source: "Superman: The Animated Series — Brainiac escalation threat",
            explanation: "This isn’t just fighting strength. The opponent is intelligent and upgrades strategy as it goes, forcing the character to adapt and outthink the threat."
          },

          // 3) Justice League (DCAU)
          {
            id: 6,
            prompt: "This character can keep a superhero team together after a betrayal and still win the war.",
            source: "Justice League (DCAU) — Team trust collapse scenario",
            explanation: "The hardest part is leadership. The character must prevent panic, rebuild coordination, and win while people doubt each other and the enemy gains ground."
          },
          {
            id: 7,
            prompt: "This character can stop a global invasion when the enemy has superior technology and numbers.",
            source: "Justice League (DCAU) — World invasion event",
            explanation: "This is large-scale strategy and endurance. The character must survive multiple battles, protect civilians, and make the correct call under extreme pressure."
          },
          {
            id: 8,
            prompt: "This character can defeat an alternate 'evil version' of heroes who have no morals holding them back.",
            source: "Justice League (DCAU) — Justice Lords-style threat",
            explanation: "The enemy is just as skilled but fights dirty. Winning requires either outsmarting them or matching their power without losing control of the situation."
          },

          // 4) Static Shock (ONLY Static in pool)
          {
            id: 9,
            prompt: "This character can stop a dangerous city threat while protecting bystanders with zero backup.",
            source: "Static Shock — Solo hero crisis",
            explanation: "The character has to manage crowd safety, fast movement, and multiple dangers at once. Even if they can fight, they must avoid civilians getting hurt."
          },

          // 5) Xiaolin Showdown
          {
            id: 10,
            prompt: "This character can win a magical artifact duel where the rules of the arena matter as much as power.",
            source: "Xiaolin Showdown — Shen Gong Wu Showdown",
            explanation: "Showdowns aren’t always raw combat. The environment, the artifact rules, and the win-condition can flip the match if you’re not careful."
          },

          // 6) Teen Titans (2003)
          {
            id: 11,
            prompt: "This character can survive a Slade-style psychological war and still beat him without losing their mind.",
            source: "Teen Titans (2003) — Slade manipulation arc",
            explanation: "Slade attacks confidence, relationships, and patience. Winning requires mental toughness, not just combat skill."
          },
          {
            id: 12,
            prompt: "This character can stop a teammate from turning on the group while also surviving the mission.",
            source: "Teen Titans (2003) — Betrayal inside the team",
            explanation: "The danger comes from emotional conflict, divided focus, and hesitation. The character must keep the team alive while preventing internal collapse."
          },

          // 7) Samurai Jack
          {
            id: 13,
            prompt: "This character can cross enemy-controlled territory filled with assassins and still reach the objective on time.",
            source: "Samurai Jack — Aku’s world survival run",
            explanation: "This is endurance and discipline. The character must survive nonstop danger, avoid ambushes, and keep moving even while exhausted."
          },

          // 8) Ben 10 (2005)
          {
            id: 14,
            prompt: "This character can win a fight while their powers randomly change mid-battle.",
            source: "Ben 10 (2005) — Omnitrix misfire challenge",
            explanation: "The character can’t rely on one moveset. They must instantly adjust strategy as abilities swap at the worst possible times."
          },
          {
            id: 15,
            prompt: "This character can defeat a Vilgax-level opponent who refuses to go down and keeps escalating.",
            source: "Ben 10 (2005) — Final boss pressure fight",
            explanation: "The enemy is relentless. Winning means staying alive long enough to find a weakness or strategy that actually ends the fight."
          },

          // 9) The Powerpuff Girls
          {
            id: 16,
            prompt: "This character can stop a city from being destroyed in under 10 minutes.",
            source: "The Powerpuff Girls — Townsville emergency",
            explanation: "This is speed + efficiency. The character has to identify the real threat instantly, protect civilians, and end it fast."
          },
          {
            id: 17,
            prompt: "This character can defeat a supernatural villain who attacks with fear and mind games instead of punches.",
            source: "The Powerpuff Girls — HIM-style psychological threat",
            explanation: "The opponent tries to break your confidence and twist reality. Winning requires resisting fear and staying focused."
          },

          // 10) Courage the Cowardly Dog (ONLY Courage in pool)
          {
            id: 18,
            prompt: "This character can survive a supernatural curse where the enemy follows creepy rules that ignore logic.",
            source: "Courage the Cowardly Dog — Curse survival scenario",
            explanation: "This is horror survival. The character has to keep moving even while terrified, solve the situation fast, and protect others from the unknown."
          },

          // 11) Steven Universe
          {
            id: 19,
            prompt: "This character can calm down a powerful enemy and prevent a larger war from starting.",
            source: "Steven Universe — Peaceful resolution under pressure",
            explanation: "This tests empathy and persuasion. The character must win without brute force, even when the enemy is stronger and ready to fight."
          },
          {
            id: 20,
            prompt: "This character can win a battle where teamwork and combination abilities decide the outcome.",
            source: "Steven Universe — Fusion/team strategy scenario",
            explanation: "Some fights are designed for synergy. The character must coordinate, protect allies, and exploit openings instead of solo carrying."
          },

          // 12) Adventure Time
          {
            id: 21,
            prompt: "This character can survive a dungeon where magic rules change mid-run.",
            source: "Adventure Time — Chaos dungeon crawl",
            explanation: "Traps and enemies aren’t consistent. The character must adapt constantly when the world keeps changing the rules."
          },
          {
            id: 22,
            prompt: "This character can resist a world-ending evil that manipulates fear and destiny.",
            source: "Adventure Time — Lich-level threat",
            explanation: "The threat isn’t just physical—it’s existential. Winning means resisting panic, staying smart, and preventing catastrophe."
          },

          // 13) Regular Show
          {
            id: 23,
            prompt: "This character can survive a normal job shift that escalates into a universe-level disaster.",
            source: "Regular Show — Small problem becomes cosmic",
            explanation: "This prompt is about improvisation. The character must fix things before the chaos scales beyond control."
          },

          // 14) Avatar: The Last Airbender
          {
            id: 24,
            prompt: "This character can lead a stealth mission through enemy territory without getting captured.",
            source: "Avatar: The Last Airbender — Enemy territory infiltration",
            explanation: "The character must avoid patrols, keep the team quiet, and escape if discovered. One mistake can blow the entire mission."
          },
          {
            id: 25,
            prompt: "This character can win a final-boss duel while staying emotionally controlled and not making reckless choices.",
            source: "Avatar: The Last Airbender — Endgame showdown discipline",
            explanation: "Power alone isn’t enough. The character must fight smart, resist rage, and avoid getting baited into losing."
          },
          {
            id: 26,
            prompt: "This character can recover after a devastating defeat and still keep the team moving forward.",
            source: "Avatar: The Last Airbender — Comeback after collapse",
            explanation: "This tests leadership and resilience. The character must rebuild morale, regroup, and continue the mission when hope is low."
          },

          // 15) The Legend of Korra
          {
            id: 27,
            prompt: "This character can handle a city-wide political crisis while also fighting a top-tier villain.",
            source: "The Legend of Korra — Politics + combat pressure",
            explanation: "The character needs judgment and leadership. Winning includes managing public fear while surviving the real threat."
          },

          // 16) Danny Phantom
          {
            id: 28,
            prompt: "This character can defeat a ghost threat that uses possession, fear tactics, and intangibility.",
            source: "Danny Phantom — Ghost Zone rules fight",
            explanation: "Ghost powers ignore normal combat logic. The character must counter abilities like possession and survive mental pressure."
          },
          {
            id: 29,
            prompt: "This character can stop their future from turning into a nightmare timeline by making the right choice now.",
            source: "Danny Phantom — Ultimate Enemy-style turning point",
            explanation: "The enemy represents consequences. The character must prevent disaster through decision-making, not only fighting."
          },

          // 17) SpongeBob SquarePants
          {
            id: 30,
            prompt: "This character can lead a dysfunctional team to victory in front of a huge crowd.",
            source: "SpongeBob SquarePants — Band Geeks-style pressure win",
            explanation: "This tests leadership, motivation, and keeping people focused. The team should fail, but the character must force success."
          },
          {
            id: 31,
            prompt: "This character can survive working an entire disaster shift where everything goes wrong nonstop.",
            source: "SpongeBob SquarePants — Krusty Krab chaos day",
            explanation: "It’s endurance and problem-solving under stress: customers, mistakes, sabotage, and constant bad luck."
          },

          // 18) The Fairly OddParents
          {
            id: 32,
            prompt: "This character can fix a reality-breaking wish situation before it becomes permanent.",
            source: "The Fairly OddParents — Wish meltdown scenario",
            explanation: "The world bends to words. The character must outsmart loopholes, reverse damage, and act fast before reality locks in."
          },
          {
            id: 33,
            prompt: "This character can win a conflict where the enemy’s power comes from exploiting loopholes in the rules.",
            source: "The Fairly OddParents — Rule-lawyer magic battle",
            explanation: "The opponent wins by twisting logic. The character must be clever, careful with wording, and anticipate traps."
          },

          // 19) Jimmy Neutron: Boy Genius
          {
            id: 34,
            prompt: "This character can save the town using only their intelligence and one last-second invention.",
            source: "Jimmy Neutron — Genius under time pressure",
            explanation: "No time to prepare. The character must design, build, and deploy a solution while everything collapses around them."
          },
          {
            id: 35,
            prompt: "This character can recover after their invention backfires and creates a worse problem than before.",
            source: "Jimmy Neutron — Invention backlash scenario",
            explanation: "Fixing the first mistake isn’t enough—now the character must handle a bigger threat created by their own actions."
          },

          // 20) Teenage Mutant Ninja Turtles (2003)
          {
            id: 36,
            prompt: "This character can defeat a Shredder-level enemy while protecting their team from getting wiped out.",
            source: "TMNT (2003) — High-stakes boss fight",
            explanation: "This isn’t a clean duel. The enemy is deadly, relentless, and smart. The character must fight while keeping teammates alive."
          },
          {
            id: 37,
            prompt: "This character can survive being hunted by a powerful organization that wants to capture them alive.",
            source: "TMNT (2003) — Bishop-style containment threat",
            explanation: "It’s not just fighting. The enemy uses traps, surveillance, and strategy. The character must escape and outsmart a system."
          },

          // 21) Invader Zim (ONLY Zim + GIR in pool)
          {
            id: 38,
            prompt: "This character can carry out a secret invasion plan without getting exposed by the world around them.",
            source: "Invader Zim — Secret mission sabotage risk",
            explanation: "The character must blend in, hide evidence, and stay focused while chaos and stupidity constantly threaten the cover."
          },

          // 22) Kim Possible
          {
            id: 39,
            prompt: "This character can infiltrate a villain base, steal the objective, and escape clean without backup.",
            source: "Kim Possible — Full infiltration mission",
            explanation: "This is stealth + combat + improvisation. One alarm turns it into a nonstop chase, so the character must be efficient and smart."
          },
          {
            id: 40,
            prompt: "This character can fix a broken timeline after a mission goes wrong and the future becomes a disaster.",
            source: "Kim Possible — A Sitch in Time-style crisis",
            explanation: "The character must solve the problem across multiple situations, adapt quickly, and stop the future from locking in permanently."
          },

          // 23) American Dragon: Jake Long
          {
            id: 41,
            prompt: "This character can protect their city while keeping their secret identity safe from hunters.",
            source: "American Dragon: Jake Long — Identity pressure mission",
            explanation: "The character is fighting while also hiding who they are. If the secret is exposed, their normal life and allies become targets."
          },

          // 24) Phineas and Ferb
          {
            id: 42,
            prompt: "This character can build something impossible in one day and still avoid getting caught.",
            source: "Phineas and Ferb — Candace bust challenge",
            explanation: "This is creativity + speed + stealth. The project must be finished and somehow disappear before consequences hit."
          },
          {
            id: 43,
            prompt: "This character can defeat a goofy villain plan that becomes genuinely dangerous if ignored.",
            source: "Phineas and Ferb — Doofenshmirtz scheme escalates",
            explanation: "The enemy looks silly, but the device can wreck everything. The character must counter it with timing and cleverness."
          },

          // 25) Jackie Chan Adventures
          {
            id: 44,
            prompt: "This character can secure a powerful magic talisman before villains collect enough to become unstoppable.",
            source: "Jackie Chan Adventures — Talisman race scenario",
            explanation: "The stakes climb every time a talisman is stolen. The character must win quickly because the enemy becomes stronger with each artifact."
          },
          {
            id: 45,
            prompt: "This character can defeat a Shendu-level enemy who gains stacked powers and refuses to go down.",
            source: "Jackie Chan Adventures — Final boss empowered threat",
            explanation: "The villain becomes overwhelming. Winning requires strategy, teamwork, and exploiting weaknesses instead of brute force."
          },
        ],
        characters: [
          // Batman: The Animated Series
          { name: "Batman", anime: "Batman: The Animated Series" },
          { name: "Joker", anime: "Batman: The Animated Series" },
          { name: "Harley Quinn", anime: "Batman: The Animated Series" },
          { name: "Catwoman", anime: "Batman: The Animated Series" },
          { name: "Robin (Dick Grayson)", anime: "Batman: The Animated Series" },
          { name: "Bane", anime: "Batman: The Animated Series" },
          { name: "Two-Face", anime: "Batman: The Animated Series" },
          { name: "Mr. Freeze", anime: "Batman: The Animated Series" },
          { name: "Batman (Terry McGinnis)", anime: "Batman: The Animated Series" },

          // Superman: The Animated Series
          { name: "Superman", anime: "Superman: The Animated Series" },
          { name: "Lois Lane", anime: "Superman: The Animated Series" },
          { name: "Lex Luthor", anime: "Superman: The Animated Series" },
          { name: "Brainiac", anime: "Superman: The Animated Series" },
          { name: "Darkseid", anime: "Superman: The Animated Series" },
          { name: "Supergirl", anime: "Superman: The Animated Series" },

          // Justice League (DCAU)
          { name: "Wonder Woman", anime: "Justice League (DCAU)" },
          { name: "The Flash (Wally West)", anime: "Justice League (DCAU)" },
          { name: "Green Lantern (John Stewart)", anime: "Justice League (DCAU)" },
          { name: "Martian Manhunter", anime: "Justice League (DCAU)" },
          { name: "Hawkgirl", anime: "Justice League (DCAU)" },
          { name: "Doomsday", anime: "Justice League (DCAU)" },

          // Static Shock (ONLY Static)
          { name: "Static Shock", anime: "Static Shock" },

          // Xiaolin Showdown (Main 4 + 2 villains)
          { name: "Omi", anime: "Xiaolin Showdown" },
          { name: "Kimiko", anime: "Xiaolin Showdown" },
          { name: "Raimundo", anime: "Xiaolin Showdown" },
          { name: "Clay", anime: "Xiaolin Showdown" },
          { name: "Jack Spicer", anime: "Xiaolin Showdown" },
          { name: "Chase Young", anime: "Xiaolin Showdown" },

          // Teen Titans (2003)
          { name: "Robin", anime: "Teen Titans (2003)" },
          { name: "Starfire", anime: "Teen Titans (2003)" },
          { name: "Raven", anime: "Teen Titans (2003)" },
          { name: "Cyborg", anime: "Teen Titans (2003)" },
          { name: "Beast Boy", anime: "Teen Titans (2003)" },
          { name: "Slade", anime: "Teen Titans (2003)" },
          { name: "Terra", anime: "Teen Titans (2003)" },

          // Samurai Jack (ONLY Jack + Aku)
          { name: "Samurai Jack", anime: "Samurai Jack" },
          { name: "Aku", anime: "Samurai Jack" },

          // Ben 10 (2005)
          { name: "Ben Tennyson", anime: "Ben 10 (2005)" },
          { name: "Gwen Tennyson", anime: "Ben 10 (2005)" },
          { name: "Grandpa Max", anime: "Ben 10 (2005)" },
          { name: "Kevin Levin", anime: "Ben 10 (2005)" },
          { name: "Vilgax", anime: "Ben 10 (2005)" },
          { name: "Azmuth", anime: "Ben 10 (2005)" },

          // The Powerpuff Girls
          { name: "Blossom", anime: "The Powerpuff Girls" },
          { name: "Bubbles", anime: "The Powerpuff Girls" },
          { name: "Buttercup", anime: "The Powerpuff Girls" },
          { name: "Mojo Jojo", anime: "The Powerpuff Girls" },
          { name: "HIM", anime: "The Powerpuff Girls" },
          { name: "Princess Morbucks", anime: "The Powerpuff Girls" },

          // Courage the Cowardly Dog (ONLY Courage)
          { name: "Courage", anime: "Courage the Cowardly Dog" },

          // Steven Universe
          { name: "Steven Universe", anime: "Steven Universe" },
          { name: "Garnet", anime: "Steven Universe" },
          { name: "Amethyst", anime: "Steven Universe" },
          { name: "Pearl", anime: "Steven Universe" },
          { name: "Connie Maheswaran", anime: "Steven Universe" },
          { name: "Lapis Lazuli", anime: "Steven Universe" },
          { name: "Peridot", anime: "Steven Universe" },
          { name: "Jasper", anime: "Steven Universe" },

          // Adventure Time
          { name: "Finn", anime: "Adventure Time" },
          { name: "Jake", anime: "Adventure Time" },
          { name: "Princess Bubblegum", anime: "Adventure Time" },
          { name: "Marceline", anime: "Adventure Time" },
          { name: "Ice King", anime: "Adventure Time" },
          { name: "BMO", anime: "Adventure Time" },
          { name: "Flame Princess", anime: "Adventure Time" },

          // Regular Show
          { name: "Mordecai", anime: "Regular Show" },
          { name: "Rigby", anime: "Regular Show" },
          { name: "Benson", anime: "Regular Show" },
          { name: "Skips", anime: "Regular Show" },
          { name: "Muscle Man", anime: "Regular Show" },
          { name: "Pops", anime: "Regular Show" },

          // Avatar: The Last Airbender
          { name: "Aang", anime: "Avatar: The Last Airbender" },
          { name: "Katara", anime: "Avatar: The Last Airbender" },
          { name: "Sokka", anime: "Avatar: The Last Airbender" },
          { name: "Toph Beifong", anime: "Avatar: The Last Airbender" },
          { name: "Zuko", anime: "Avatar: The Last Airbender" },
          { name: "Iroh", anime: "Avatar: The Last Airbender" },
          { name: "Azula", anime: "Avatar: The Last Airbender" },
          { name: "Fire Lord Ozai", anime: "Avatar: The Last Airbender" },

          // The Legend of Korra
          { name: "Korra", anime: "The Legend of Korra" },
          { name: "Mako", anime: "The Legend of Korra" },
          { name: "Bolin", anime: "The Legend of Korra" },
          { name: "Asami Sato", anime: "The Legend of Korra" },
          { name: "Tenzin", anime: "The Legend of Korra" },
          { name: "Lin Beifong", anime: "The Legend of Korra" },
          { name: "Amon", anime: "The Legend of Korra" },
          { name: "Zaheer", anime: "The Legend of Korra" },

          // Danny Phantom
          { name: "Danny Phantom", anime: "Danny Phantom" },
          { name: "Sam Manson", anime: "Danny Phantom" },
          { name: "Tucker Foley", anime: "Danny Phantom" },
          { name: "Vlad Plasmius", anime: "Danny Phantom" },
          { name: "Jazz Fenton", anime: "Danny Phantom" },

          // SpongeBob SquarePants
          { name: "SpongeBob SquarePants", anime: "SpongeBob SquarePants" },
          { name: "Patrick Star", anime: "SpongeBob SquarePants" },
          { name: "Squidward Tentacles", anime: "SpongeBob SquarePants" },
          { name: "Mr. Krabs", anime: "SpongeBob SquarePants" },
          { name: "Sandy Cheeks", anime: "SpongeBob SquarePants" },
          { name: "Plankton", anime: "SpongeBob SquarePants" },
          { name: "Mrs. Puff", anime: "SpongeBob SquarePants" },
          { name: "Larry the Lobster", anime: "SpongeBob SquarePants" },

          // The Fairly OddParents
          { name: "Timmy Turner", anime: "The Fairly OddParents" },
          { name: "Cosmo", anime: "The Fairly OddParents" },
          { name: "Wanda", anime: "The Fairly OddParents" },
          { name: "Vicky", anime: "The Fairly OddParents" },
          { name: "Mr. Crocker", anime: "The Fairly OddParents" },
          { name: "Jorgen Von Strangle", anime: "The Fairly OddParents" },

          // Jimmy Neutron: Boy Genius
          { name: "Jimmy Neutron", anime: "Jimmy Neutron: Boy Genius" },
          { name: "Carl Wheezer", anime: "Jimmy Neutron: Boy Genius" },
          { name: "Sheen Estevez", anime: "Jimmy Neutron: Boy Genius" },
          { name: "Cindy Vortex", anime: "Jimmy Neutron: Boy Genius" },
          { name: "Goddard", anime: "Jimmy Neutron: Boy Genius" },
          { name: "Professor Calamitous", anime: "Jimmy Neutron: Boy Genius" },

          // Teenage Mutant Ninja Turtles (2003)
          { name: "Leonardo", anime: "Teenage Mutant Ninja Turtles (2003)" },
          { name: "Raphael", anime: "Teenage Mutant Ninja Turtles (2003)" },
          { name: "Donatello", anime: "Teenage Mutant Ninja Turtles (2003)" },
          { name: "Michelangelo", anime: "Teenage Mutant Ninja Turtles (2003)" },
          { name: "Master Splinter", anime: "Teenage Mutant Ninja Turtles (2003)" },
          { name: "Shredder", anime: "Teenage Mutant Ninja Turtles (2003)" },

          // Invader Zim (ONLY Zim + GIR)
          { name: "Zim", anime: "Invader Zim" },
          { name: "GIR", anime: "Invader Zim" },

          // Kim Possible
          { name: "Kim Possible", anime: "Kim Possible" },
          { name: "Ron Stoppable", anime: "Kim Possible" },
          { name: "Shego", anime: "Kim Possible" },
          { name: "Dr. Drakken", anime: "Kim Possible" },

          // American Dragon: Jake Long
          { name: "Jake Long", anime: "American Dragon: Jake Long" },
          { name: "Rose (Huntsgirl)", anime: "American Dragon: Jake Long" },
          { name: "Fu Dog", anime: "American Dragon: Jake Long" },
          { name: "The Huntsman", anime: "American Dragon: Jake Long" },

          // Phineas and Ferb
          { name: "Phineas Flynn", anime: "Phineas and Ferb" },
          { name: "Ferb Fletcher", anime: "Phineas and Ferb" },
          { name: "Candace Flynn", anime: "Phineas and Ferb" },
          { name: "Perry the Platypus", anime: "Phineas and Ferb" },
          { name: "Dr. Heinz Doofenshmirtz", anime: "Phineas and Ferb" },
          { name: "Isabella Garcia-Shapiro", anime: "Phineas and Ferb" },

          // Jackie Chan Adventures
          { name: "Jackie Chan", anime: "Jackie Chan Adventures" },
          { name: "Jade Chan", anime: "Jackie Chan Adventures" },
          { name: "Uncle Chan", anime: "Jackie Chan Adventures" },
          { name: "Tohru", anime: "Jackie Chan Adventures" },
          { name: "Valmont", anime: "Jackie Chan Adventures" },
          { name: "Shendu", anime: "Jackie Chan Adventures" },
        ]
      }
    },

    anime_cartoon_movies: {
      label: "Anime/Cartoon Movies",
      modifiers: [],
      prompts: [],
      characters: [],
      templates: {
        modifier: "Example: They start with zero equipment.",
        prompt: {
          id: 1, prompt: "This character can survive a movie-scale disaster and still protect their allies.",
          source: "Example Movie Pack — Disaster Scenario",
          explanation: "Movie pacing: escalating threats, limited time, and big stakes with little room for mistakes."
        },
        character: { name: "Example Character", anime: "Example Movie Title" }
      }
    }
  }
};
