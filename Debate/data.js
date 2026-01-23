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
          id: 1, prompt: "This character can deliver an “Erwin’s Final Charge” level speech that makes soldiers ride into guaranteed death.",
          source: "Attack on Titan — Erwin’s Final Charge",
          explanation: "Recreate the exact stakes of Attack on Titan — Erwin’s Final Charge: your pick must deliver an “Erwin’s Final Charge” level speech that makes soldiers ride into guaranteed death. It’s not about raw power—success means the same kind of outcome happens under pressure (morale, timing, and consequences), not just a lucky moment or an off-screen shortcut."
        },
        {
          id: 2, prompt: "This character can survive and pass the Hunter Exam and earn a Hunter License.",
          source: "Hunter x Hunter — Hunter Exam Arc",
          explanation: "Recreate the exact stakes of Hunter x Hunter — Hunter Exam Arc: your pick must survive and pass the Hunter Exam and earn a Hunter License. It’s not about raw power—success means the same kind of outcome happens under pressure (morale, timing, and consequences), not just a lucky moment or an off-screen shortcut."
        },
        {
          id: 3, prompt: "This character can successfully pull off Lelouch’s “Zero Requiem” and make the world unite through their own sacrifice.",
          source: "Code Geass — Zero Requiem",
          explanation: "Recreate the exact stakes of Code Geass — Zero Requiem: your pick must successfully pull off Lelouch’s “Zero Requiem” and make the world unite through their own sacrifice. It’s not about raw power—success means the same kind of outcome happens under pressure (morale, timing, and consequences), not just a lucky moment or an off-screen shortcut."
        },
        {
          id: 4, prompt: "This character can win Duelist Kingdom and defeat Pegasus.",
          source: "Yu-Gi-Oh! — Duelist Kingdom Arc",
          explanation: "Recreate the exact stakes of Yu-Gi-Oh! — Duelist Kingdom Arc: your pick must win Duelist Kingdom and defeat Pegasus. It’s not about raw power—success means the same kind of outcome happens under pressure (morale, timing, and consequences), not just a lucky moment or an off-screen shortcut."
        },
        {
          id: 5, prompt: "This character can clear the Forest of Death and retrieve the correct scroll without their team getting wiped.",
          source: "Naruto — Chūnin Exams: Forest of Death",
          explanation: "Recreate the exact stakes of Naruto — Chūnin Exams: Forest of Death: your pick must clear the Forest of Death and retrieve the correct scroll without their team getting wiped. It’s not about raw power—success means the same kind of outcome happens under pressure (morale, timing, and consequences), not just a lucky moment or an off-screen shortcut."
        },
        {
          id: 6, prompt: "This character can win the Cell Games and stop Cell from destroying Earth.",
          source: "Dragon Ball Z — Cell Games Saga",
          explanation: "Recreate the exact stakes of Dragon Ball Z — Cell Games Saga: your pick must win the Cell Games and stop Cell from destroying Earth. It’s not about raw power—success means the same kind of outcome happens under pressure (morale, timing, and consequences), not just a lucky moment or an off-screen shortcut."
        },
        {
          id: 7, prompt: "This character can complete Ainz’s “Lizardmen Arc” conquest without unnecessary slaughter and still secure control.",
          source: "Overlord — Lizardmen Heroes Arc",
          explanation: "Recreate the exact stakes of Overlord — Lizardmen Heroes Arc: your pick must complete Ainz’s “Lizardmen Arc” conquest without unnecessary slaughter and still secure control. It’s not about raw power—success means the same kind of outcome happens under pressure (morale, timing, and consequences), not just a lucky moment or an off-screen shortcut."
        },
        {
          id: 8, prompt: "This character can win a Shokugeki cooking duel against Soma Yukihira.",
          source: "Food Wars! Shokugeki no Soma — Shokugeki Battles",
          explanation: "Recreate the exact stakes of Food Wars! Shokugeki no Soma — Shokugeki Battles: your pick must win a Shokugeki cooking duel against Soma Yukihira. It’s not about raw power—success means the same kind of outcome happens under pressure (morale, timing, and consequences), not just a lucky moment or an off-screen shortcut."
        },
        {
          id: 9, prompt: "This character can pull off the Ocean’s Eleven casino vault heist successfully.",
          source: "Ocean’s Eleven — Casino Vault Heist",
          explanation: "Recreate the exact stakes of Ocean’s Eleven — Casino Vault Heist: your pick must pull off the Ocean’s Eleven casino vault heist successfully. It’s not about raw power—success means the same kind of outcome happens under pressure (morale, timing, and consequences), not just a lucky moment or an off-screen shortcut."
        },
        {
          id: 10, prompt: "This character can execute the Grace Field House escape plan and get the kids out successfully.",
          source: "The Promised Neverland — Grace Field House Escape",
          explanation: "Recreate the exact stakes of The Promised Neverland — Grace Field House Escape: your pick must execute the Grace Field House escape plan and get the kids out successfully. It’s not about raw power—success means the same kind of outcome happens under pressure (morale, timing, and consequences), not just a lucky moment or an off-screen shortcut."
        },
        {
          id: 11, prompt: "This character can win the Dark Tournament and keep their team alive to the end.",
          source: "Yu Yu Hakusho — Dark Tournament",
          explanation: "Recreate the exact stakes of Yu Yu Hakusho — Dark Tournament: your pick must win the Dark Tournament and keep their team alive to the end. It’s not about raw power—success means the same kind of outcome happens under pressure (morale, timing, and consequences), not just a lucky moment or an off-screen shortcut."
        },
        {
          id: 12, prompt: "This character can survive Subaru’s Return-by-Death psychological pressure without mentally breaking.",
          source: "Re:Zero — Return by Death Loops",
          explanation: "Recreate the exact stakes of Re:Zero — Return by Death Loops: your pick must survive Subaru’s Return-by-Death psychological pressure without mentally breaking. It’s not about raw power—success means the same kind of outcome happens under pressure (morale, timing, and consequences), not just a lucky moment or an off-screen shortcut."
        },
        {
          id: 13, prompt: "This character can expose the corrupt government in FMAB without getting eliminated first.",
          source: "Fullmetal Alchemist: Brotherhood — Central Conspiracy",
          explanation: "Recreate the exact stakes of Fullmetal Alchemist: Brotherhood — Central Conspiracy: your pick must expose the corrupt government in FMAB without getting eliminated first. It’s not about raw power—success means the same kind of outcome happens under pressure (morale, timing, and consequences), not just a lucky moment or an off-screen shortcut."
        },
        {
          id: 14, prompt: "This character can win the Royal Knights Selection Tournament without using lethal force.",
          source: "Black Clover — Royal Knights Selection Exam",
          explanation: "Recreate the exact stakes of Black Clover — Royal Knights Selection Exam: your pick must win the Royal Knights Selection Tournament without using lethal force. It’s not about raw power—success means the same kind of outcome happens under pressure (morale, timing, and consequences), not just a lucky moment or an off-screen shortcut."
        },
        {
          id: 15, prompt: "This character can negotiate peace between Marley and Paradis without triggering more war.",
          source: "Attack on Titan — Marley/Paradis Conflict",
          explanation: "Recreate the exact stakes of Attack on Titan — Marley/Paradis Conflict: your pick must negotiate peace between Marley and Paradis without triggering more war. It’s not about raw power—success means the same kind of outcome happens under pressure (morale, timing, and consequences), not just a lucky moment or an off-screen shortcut."
        },
        {
          id: 16, prompt: "This character can successfully run Nazarick’s public image without exposing the truth.",
          source: "Overlord — Sorcerer Kingdom Politics",
          explanation: "Recreate the exact stakes of Overlord — Sorcerer Kingdom Politics: your pick must successfully run Nazarick’s public image without exposing the truth. It’s not about raw power—success means the same kind of outcome happens under pressure (morale, timing, and consequences), not just a lucky moment or an off-screen shortcut."
        },
        {
          id: 17, prompt: "This character can survive the Shibuya Incident and still accomplish the mission.",
          source: "Jujutsu Kaisen — Shibuya Incident",
          explanation: "Recreate the exact stakes of Jujutsu Kaisen — Shibuya Incident: your pick must survive the Shibuya Incident and still accomplish the mission. It’s not about raw power—success means the same kind of outcome happens under pressure (morale, timing, and consequences), not just a lucky moment or an off-screen shortcut."
        },
        {
          id: 18, prompt: "This character can win the Grand Magic Games and keep their guild’s reputation intact.",
          source: "Fairy Tail — Grand Magic Games",
          explanation: "Recreate the exact stakes of Fairy Tail — Grand Magic Games: your pick must win the Grand Magic Games and keep their guild’s reputation intact. It’s not about raw power—success means the same kind of outcome happens under pressure (morale, timing, and consequences), not just a lucky moment or an off-screen shortcut."
        },
        {
          id: 19, prompt: "This character can stop the Paranormal Liberation War from escalating into full collapse.",
          source: "My Hero Academia — Paranormal Liberation War",
          explanation: "Recreate the exact stakes of My Hero Academia — Paranormal Liberation War: your pick must stop the Paranormal Liberation War from escalating into full collapse. It’s not about raw power—success means the same kind of outcome happens under pressure (morale, timing, and consequences), not just a lucky moment or an off-screen shortcut."
        },
        {
          id: 20, prompt: "This character can keep a perfect fake identity inside a hostile organization for 30 days.",
          source: "Tokyo Revengers — Gang Infiltration Tension",
          explanation: "Recreate the exact stakes of Tokyo Revengers — Gang Infiltration Tension: your pick must keep a perfect fake identity inside a hostile organization for 30 days. It’s not about raw power—success means the same kind of outcome happens under pressure (morale, timing, and consequences), not just a lucky moment or an off-screen shortcut."
        },
        {
          id: 21, prompt: "This character can keep their humanity intact after a life-changing transformation and still function normally.",
          source: "Parasyte: The Maxim — Shinichi’s Transformation",
          explanation: "Recreate the exact stakes of Parasyte: The Maxim — Shinichi’s Transformation: your pick must keep their humanity intact after a life-changing transformation and still function normally. It’s not about raw power—success means the same kind of outcome happens under pressure (morale, timing, and consequences), not just a lucky moment or an off-screen shortcut."
        },
        {
          id: 22, prompt: "This character can build a trade empire from nothing without triggering a war.",
          source: "Tsukimichi: Moonlit Fantasy — Kuzunoha Company",
          explanation: "Recreate the exact stakes of Tsukimichi: Moonlit Fantasy — Kuzunoha Company: your pick must build a trade empire from nothing without triggering a war. It’s not about raw power—success means the same kind of outcome happens under pressure (morale, timing, and consequences), not just a lucky moment or an off-screen shortcut."
        },
        {
          id: 23, prompt: "This character can survive being targeted by a top-tier assassin and still complete their mission.",
          source: "The World’s Finest Assassin — Assassin World Rules",
          explanation: "Recreate the exact stakes of The World’s Finest Assassin — Assassin World Rules: your pick must survive being targeted by a top-tier assassin and still complete their mission. It’s not about raw power—success means the same kind of outcome happens under pressure (morale, timing, and consequences), not just a lucky moment or an off-screen shortcut."
        },
        {
          id: 24, prompt: "This character can win a battle royale where alliances constantly shift and still come out on top.",
          source: "Dragon Ball Super — Tournament of Power",
          explanation: "Recreate the exact stakes of Dragon Ball Super — Tournament of Power: your pick must win a battle royale where alliances constantly shift and still come out on top. It’s not about raw power—success means the same kind of outcome happens under pressure (morale, timing, and consequences), not just a lucky moment or an off-screen shortcut."
        },
        {
          id: 25, prompt: "This character can lead a squad to victory while hiding a massive secret from their own team.",
          source: "Seraph of the End — Military Secrets",
          explanation: "Recreate the exact stakes of Seraph of the End — Military Secrets: your pick must lead a squad to victory while hiding a massive secret from their own team. It’s not about raw power—success means the same kind of outcome happens under pressure (morale, timing, and consequences), not just a lucky moment or an off-screen shortcut."
        },
        {
          id: 26, prompt: "This character can take control of an underdog team and win through pure preparation and manipulation.",
          source: "Classroom of the Elite — Class Battles",
          explanation: "Recreate the exact stakes of Classroom of the Elite — Class Battles: your pick must take control of an underdog team and win through pure preparation and manipulation. It’s not about raw power—success means the same kind of outcome happens under pressure (morale, timing, and consequences), not just a lucky moment or an off-screen shortcut."
        },
        {
          id: 27, prompt: "This character can prevent a major betrayal inside their organization before it destroys everything.",
          source: "Code Geass — Internal Betrayal & Power Plays",
          explanation: "Recreate the exact stakes of Code Geass — Internal Betrayal & Power Plays: your pick must prevent a major betrayal inside their organization before it destroys everything. It’s not about raw power—success means the same kind of outcome happens under pressure (morale, timing, and consequences), not just a lucky moment or an off-screen shortcut."
        },
        {
          id: 28, prompt: "This character can win a high-stakes cooking duel using creativity alone (no perfect technique carry).",
          source: "Food Wars! — Shokugeki Battles",
          explanation: "Recreate the exact stakes of Food Wars! — Shokugeki Battles: your pick must win a high-stakes cooking duel using creativity alone (no perfect technique carry). It’s not about raw power—success means the same kind of outcome happens under pressure (morale, timing, and consequences), not just a lucky moment or an off-screen shortcut."
        },
        {
          id: 29, prompt: "This character can survive a city-wide monster outbreak and still keep civilians organized.",
          source: "Kaiju No. 8 — Kaiju Disaster Response",
          explanation: "Recreate the exact stakes of Kaiju No. 8 — Kaiju Disaster Response: your pick must survive a city-wide monster outbreak and still keep civilians organized. It’s not about raw power—success means the same kind of outcome happens under pressure (morale, timing, and consequences), not just a lucky moment or an off-screen shortcut."
        },
        {
          id: 30, prompt: "This character can stop a powerful villain’s ideology from spreading and radicalizing the public.",
          source: "My Hero Academia — Society & Ideology Fallout",
          explanation: "Recreate the exact stakes of My Hero Academia — Society & Ideology Fallout: your pick must stop a powerful villain’s ideology from spreading and radicalizing the public. It’s not about raw power—success means the same kind of outcome happens under pressure (morale, timing, and consequences), not just a lucky moment or an off-screen shortcut."
        },
        {
          id: 31, prompt: "This character can defeat the Ten Commandments.",
          source: "Seven Deadly Sins — The Ten Commandments",
          explanation: "The Ten Commandments are elite demon warriors with overwhelming raw power and curse-based abilities called Commandments that punish specific actions (like hatred or betrayal). To defeat them, a character needs absurd combat strength, endurance, resistance to hax/curse effects, and the ability to survive multiple high-tier threats at once."
        },
        {
          id: 32, prompt: "This character can learn Nen.",
          source: "Hunter x Hunter — Nen (Aura Technique)",
          explanation: "Nen is a complex power system that requires intense training, discipline, and the ability to control life energy through techniques like Ten, Zetsu, Ren, and Hatsu. Learning Nen isn’t just about talent—it's about mental focus, adaptability, and surviving the physical strain and risk of aura backlash."
        },
        {
          id: 33, prompt: "This character can convince the entire world to give Goku their energy for the Spirit Bomb.",
          source: "Dragon Ball Z — Spirit Bomb (Genki Dama)",
          explanation: "The Spirit Bomb requires living beings to willingly share a portion of their energy, meaning the user must gain trust fast on a global scale. This challenge is more about persuasion, charisma, reputation, and communication under pressure than combat."
        },
        {
          id: 34, prompt: "This character can reach the 250th floor on Heaven's Arena.",
          source: "Hunter x Hunter — Heaven's Arena",
          explanation: "Heaven’s Arena is a brutal combat tower where opponents get stronger every floor, eventually forcing fighters to face Nen users and unpredictable matchups. Reaching the 250th floor means consistent wins, fast learning, physical durability, and the ability to adapt to opponents who may outclass you in skill or aura control."
        },
        {
          id: 35, prompt: "This character can endure being tortured by Jason (Yamori) without breaking.",
          source: "Tokyo Ghoul — Kaneki vs Jason Torture",
          explanation: "Jason’s torture isn’t just physical—it’s psychological warfare designed to erase identity, willpower, and sanity through prolonged pain and hopelessness. Surviving without breaking means extreme mental resistance, emotional control, and the ability to cling to purpose even when your body and mind are being destroyed."
        },
        {
          id: 36, prompt: "This character is unaffected by Estarossa's Commandment.",
          source: "Seven Deadly Sins — Estarossa’s Commandment of Love",
          explanation: "Estarossa’s Commandment punishes anyone who feels hatred in his presence by stripping them of the ability to fight, making aggression itself a weakness. Being unaffected means the character can fight with complete calm, no hatred, no malice—either through pure emotional control, unnatural mindset, or a nature that doesn’t rely on hostile intent."
        },
        {
          id: 37, prompt: "This character will defend you even when you're wrong.",
          source: "N/A — Loyalty & Ride-or-Die Energy",
          explanation: "This isn’t about morality—this is about extreme loyalty. The character would back you publicly, argue your case, and protect you from consequences even if they know you're in the wrong, whether out of friendship, obsession, duty, or personal code."
        },
        {
          id: 38, prompt: "This character can win Greed Island.",
          source: "Hunter x Hunter — Greed Island",
          explanation: "Greed Island is a deadly real-world game that requires fighting skill, Nen mastery, puzzle-solving, strategy, and collecting specific cards with strict conditions. Winning means surviving hostile players, understanding the game mechanics, building smart alliances, and completing the card requirements without getting hunted down."
        },
        {
          id: 39, prompt: "This character can beat Igris.",
          source: "Solo Leveling — Igris the Bloodred Commander",
          explanation: "Igris is a high-speed, disciplined knight-class opponent with deadly swordsmanship, relentless pressure, and the ability to punish mistakes instantly. Beating him requires strong combat instincts, durability, speed, and the skill to win a high-difficulty duel where hesitation gets you killed."
        },
        {
          id: 40, prompt: "This character's strategic mind rivals that of Shikamaru.",
          source: "Naruto — Shikamaru’s Battle IQ",
          explanation: "Shikamaru is known for elite tactical thinking, predicting enemy behavior, manipulating positioning, and turning weak situations into wins through planning. Matching him means the character can analyze quickly, stay calm under pressure, and create winning strategies using limited information and limited resources."
        },
        {
          id: 41, prompt: "This character will do the ultimate sacrifice.",
          source: "Dragon Ball Z — Final Sacrifice Moments",
          explanation: "The ultimate sacrifice means giving up your life, future, or everything you value to protect others or secure victory, even when survival is possible. This tests a character’s courage, selflessness, and emotional strength—choosing duty over desire with zero hesitation."
        },
        {
          id: 42, prompt: "This character can survive the Gate of Truth’s toll and still complete a human transmutation to bring someone back.",
          source: "Fullmetal Alchemist: Brotherhood — Human Transmutation & The Truth",
          explanation: "Human transmutation drags you before “Truth” and demands an equivalent-exchange toll (body parts, senses, years, etc.). Your character must pay that price, stay functional, and still complete the attempt so the result is a real restored person—not a failed shell or a botched creation."
        },
        {
          id: 43, prompt: "This character can win Duelist Kingdom without cheating, rule-breaking mind games, or outside interference.",
          source: "Yu-Gi-Oh! (Original) — Duelist Kingdom Tournament",
          explanation: "Duelist Kingdom is messy, but you still have to win legitimate duels under pressure. Your pick must outplay multiple opponents back-to-back using strategy, reads, and adaptation—no hacks, no illegal rule abuse, and no outside help winning duels for them."
        },
        {
          id: 44, prompt: "This character can keep Subaru alive through the Mansion Arc without knowing about Return by Death.",
          source: "Re:Zero — Roswaal’s Mansion Arc (Early Loops)",
          explanation: "In the early mansion loops, Subaru keeps dying from hidden causes plus mistrust and bad timing. Your character must protect him, build trust with the mansion staff, and identify the true trigger in time—without remembering loops or getting a reset after mistakes."
        },
        {
          id: 45, prompt: "This character can win the Greed Island game and secure the victory condition without relying on brute force alone.",
          source: "Hunter x Hunter — Greed Island Completion",
          explanation: "Greed Island is a rule-and-resource game: cards, trading, alliances, scouting, and traps matter as much as fights. Your pick must collect what’s needed to clear the game while surviving other players hunting them—and do it through planning and adaptation, not just overpowering everyone."
        },
        {
          id: 46, prompt: "This character can prevent a wave of copycat villains after the Stain incident by controlling the narrative and inspiring the right kind of heroism.",
          source: "My Hero Academia — Hero Killer Stain Aftermath",
          explanation: "Stain’s beliefs spread because the message sticks and people start copying it. Your character must blunt that ideological spread—shaping public perception, reducing recruitment/copycats, and redirecting frustration—without “just beat them up” being the whole solution."
        },
        {
          id: 47, prompt: "This character can infiltrate the Great Tomb of Nazarick and escape with meaningful intel without triggering a full wipe.",
          source: "Overlord — Nazarick’s Lethal Defense & Information Control",
          explanation: "Nazarick is designed to erase intruders with traps, guardians, and constant monitoring. Your pick must get in, learn something valuable (layout, guardians, goals, weaknesses), and get out alive—without immediately provoking a response that wipes them on sight."
        },
        {
          id: 48, prompt: "This character can keep Kaneki from losing himself during Jason (Yamori)’s torture by stabilizing him psychologically before the breaking point.",
          source: "Tokyo Ghoul — Yamori Torture & Kaneki’s Break",
          explanation: "Jason’s torture aims to break identity, not just cause pain. Your character must prevent Kaneki’s mental collapse—through rescue timing, psychological support, manipulation of Jason, or disruption—so Kaneki doesn’t hit the irreversible “snap” point."
        },
        {
          id: 49, prompt: "This character can capture a dungeon and obtain a Djinn Metal Vessel without dying or being mentally broken by the trials.",
          source: "Magi: The Labyrinth of Magic — Dungeon Capture",
          explanation: "A dungeon capture is a gauntlet: monsters, puzzles, and judgment calls under extreme stress. Your pick must clear the dungeon, earn the Djinn’s contract, and come out functional—meaning they survive and keep their mind intact enough to actually use the Metal Vessel afterward."
        },
        {
          id: 50, prompt: "This character can stop Kira before he identifies them—while operating in Kanto with only the same basic early-case info the task force had.",
          source: "Death Note — Early Kira Investigation",
          explanation: "Early on, investigators only know that deaths look supernatural and patterns exist; Kira adapts quickly. Your character must narrow in on Light fast enough to stop him without getting identified and written down—using deduction, operational security, and pressure before Kira learns their name/face."
        },
      ],

      // Character pool: objects so we can display origin title on the board
      characters: [

        // Dragon Ball
        { name: "Kid Goku", anime: "Dragon Ball" },
        { name: "Bulma", anime: "Dragon Ball" },
        { name: "Master Roshi", anime: "Dragon Ball" },
        { name: "Krillin", anime: "Dragon Ball" },
        { name: "Piccolo", anime: "Dragon Ball" },
        { name: "Yamcha", anime: "Dragon Ball" },
        { name: "Tien Shinhan", anime: "Dragon Ball" },
        { name: "Chi-Chi", anime: "Dragon Ball" },
        { name: "Launch", anime: "Dragon Ball" },
        { name: "Emperor Pilaf", anime: "Dragon Ball" },

        // Dragon Ball Z
        { name: "Teen Gohan", anime: "Dragon Ball Z" },
        { name: "Future Trunks", anime: "Dragon Ball Z" },
        { name: "Frieza", anime: "Dragon Ball Z" },
        { name: "Cell", anime: "Dragon Ball Z" },
        { name: "Kid Buu", anime: "Dragon Ball Z" },
        { name: "Goten", anime: "Dragon Ball Z" },
        { name: "Trunks (Kid)", anime: "Dragon Ball Z" },
        { name: "Android 18", anime: "Dragon Ball Z" },
        { name: "Majin Vegeta", anime: "Dragon Ball Z" },
        { name: "Gotenks", anime: "Dragon Ball Z" },

        // Dragon Ball GT
        { name: "Super Saiyan 4 Gogeta", anime: "Dragon Ball GT" },
        { name: "Omega Shenron", anime: "Dragon Ball GT" },
        { name: "Super 17", anime: "Dragon Ball GT" },
        { name: "Pan", anime: "Dragon Ball GT" },
        { name: "Baby Vegeta", anime: "Dragon Ball GT" },
        { name: "Super Saiyan 4 Goku", anime: "Dragon Ball GT" },
        { name: "Super Saiyan 4 Vegeta", anime: "Dragon Ball GT" },
        { name: "Uub (GT)", anime: "Dragon Ball GT" },
        { name: "Nuova Shenron", anime: "Dragon Ball GT" },
        { name: "Giru", anime: "Dragon Ball GT" },

        // Dragon Ball Super
        { name: "Super Saiyan Blue Vegito", anime: "Dragon Ball Super" },
        { name: "Beerus", anime: "Dragon Ball Super" },
        { name: "Jiren", anime: "Dragon Ball Super" },
        { name: "Broly (DBS)", anime: "Dragon Ball Super" },
        { name: "Goku Black", anime: "Dragon Ball Super" },
        { name: "Ultra Instinct Goku", anime: "Dragon Ball Super" },
        { name: "Hit", anime: "Dragon Ball Super" },
        { name: "Fused Zamasu", anime: "Dragon Ball Super" },
        { name: "Golden Frieza (DBS)", anime: "Dragon Ball Super" },
        { name: "Gohan (DBS: Super Hero)", anime: "Dragon Ball Super" },

        // Naruto (Part 1)
        { name: "Naruto Uzumaki (Part 1)", anime: "Naruto (Part 1)" },
        { name: "Sasuke Uchiha (Part 1)", anime: "Naruto (Part 1)" },
        { name: "Rock Lee", anime: "Naruto (Part 1)" },
        { name: "Kakashi Hatake (Part 1)", anime: "Naruto (Part 1)" },
        { name: "Orochimaru", anime: "Naruto (Part 1)" },
        { name: "Neji Hyuga", anime: "Naruto (Part 1)" },
        { name: "Shikamaru Nara (Part 1)", anime: "Naruto (Part 1)" },
        { name: "Jiraiya", anime: "Naruto (Part 1)" },
        { name: "Tsunade", anime: "Naruto (Part 1)" },
        { name: "Hiruzen Sarutobi", anime: "Naruto (Part 1)" },

        // Naruto Shippuden
        { name: "Itachi Uchiha", anime: "Naruto Shippuden" },
        { name: "Pain (Nagato)", anime: "Naruto Shippuden" },
        { name: "Madara Uchiha", anime: "Naruto Shippuden" },
        { name: "Obito Uchiha (Tobi)", anime: "Naruto Shippuden" },
        { name: "Minato Namikaze", anime: "Naruto Shippuden" },
        { name: "Might Guy", anime: "Naruto Shippuden" },
        { name: "Killer Bee", anime: "Naruto Shippuden" },
        { name: "Hashirama Senju", anime: "Naruto Shippuden" },
        { name: "Kaguya Otsutsuki", anime: "Naruto Shippuden" },
        { name: "Shikamaru Nara (Shippuden)", anime: "Naruto Shippuden" },

        // Attack on Titan
        { name: "Eren Yeager", anime: "Attack on Titan" },
        { name: "Mikasa Ackerman", anime: "Attack on Titan" },
        { name: "Levi Ackerman", anime: "Attack on Titan" },
        { name: "Erwin Smith", anime: "Attack on Titan" },
        { name: "Armin Arlert", anime: "Attack on Titan" },
        { name: "Hange Zoë", anime: "Attack on Titan" },
        { name: "Jean Kirstein", anime: "Attack on Titan" },
        { name: "Reiner Braun", anime: "Attack on Titan" },
        { name: "Historia Reiss", anime: "Attack on Titan" },
        { name: "Zeke Yeager", anime: "Attack on Titan" },

        // My Hero Academia
        { name: "Deku (Izuku Midoriya)", anime: "My Hero Academia" },
        { name: "Bakugo Katsuki", anime: "My Hero Academia" },
        { name: "Shoto Todoroki", anime: "My Hero Academia" },
        { name: "All Might", anime: "My Hero Academia" },
        { name: "Dabi", anime: "My Hero Academia" },
        { name: "Shigaraki Tomura", anime: "My Hero Academia" },
        { name: "Endeavor", anime: "My Hero Academia" },
        { name: "Hawks", anime: "My Hero Academia" },
        { name: "Ochaco Uraraka", anime: "My Hero Academia" },
        { name: "Shota Aizawa (Eraser Head)", anime: "My Hero Academia" },

        // Jujutsu Kaisen
        { name: "Yuji Itadori", anime: "Jujutsu Kaisen" },
        { name: "Megumi Fushiguro", anime: "Jujutsu Kaisen" },
        { name: "Nobara Kugisaki", anime: "Jujutsu Kaisen" },
        { name: "Gojo Satoru", anime: "Jujutsu Kaisen" },
        { name: "Sukuna", anime: "Jujutsu Kaisen" },
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
        { name: "Luck Voltia", anime: "Black Clover" },
        { name: "Charmy Pappitson", anime: "Black Clover" },
        { name: "Mereoleona Vermillion", anime: "Black Clover" },
        { name: "Nozel Silva", anime: "Black Clover" },
        { name: "Fuegoleon Vermillion", anime: "Black Clover" },

        // Fire Force
        { name: "Shinra Kusakabe", anime: "Fire Force" },
        { name: "Arthur Boyle", anime: "Fire Force" },
        { name: "Benimaru Shinmon", anime: "Fire Force" },
        { name: "Tamaki Kotatsu", anime: "Fire Force" },
        { name: "Joker", anime: "Fire Force" },
        { name: "Maki Oze", anime: "Fire Force" },
        { name: "Iris", anime: "Fire Force" },
        { name: "Princess Hibana", anime: "Fire Force" },
        { name: "Sho Kusakabe", anime: "Fire Force" },
        { name: "Leonard Burns", anime: "Fire Force" },

        // Kaiju No. 8
        { name: "Kafka Hibino", anime: "Kaiju No. 8" },
        { name: "Mina Ashiro", anime: "Kaiju No. 8" },
        { name: "Reno Ichikawa", anime: "Kaiju No. 8" },
        { name: "Kikoru Shinomiya", anime: "Kaiju No. 8" },
        { name: "Soshiro Hoshina", anime: "Kaiju No. 8" },
        { name: "Gen Narumi", anime: "Kaiju No. 8" },
        { name: "Isao Shinomiya", anime: "Kaiju No. 8" },
        { name: "Haruichi Izumo", anime: "Kaiju No. 8" },
        { name: "Aoi Kaguragi", anime: "Kaiju No. 8" },
        { name: "Kaiju No. 9", anime: "Kaiju No. 8" },

        // Hunter x Hunter
        { name: "Gon Freecss", anime: "Hunter x Hunter" },
        { name: "Killua Zoldyck", anime: "Hunter x Hunter" },
        { name: "Kurapika", anime: "Hunter x Hunter" },
        { name: "Hisoka", anime: "Hunter x Hunter" },
        { name: "Chrollo Lucilfer", anime: "Hunter x Hunter" },
        { name: "Leorio Paradinight", anime: "Hunter x Hunter" },
        { name: "Isaac Netero", anime: "Hunter x Hunter" },
        { name: "Meruem", anime: "Hunter x Hunter" },
        { name: "Neferpitou", anime: "Hunter x Hunter" },
        { name: "Biscuit Krueger", anime: "Hunter x Hunter" },

        // FMAB
        { name: "Edward Elric", anime: "Fullmetal Alchemist: Brotherhood" },
        { name: "Alphonse Elric", anime: "Fullmetal Alchemist: Brotherhood" },
        { name: "Roy Mustang", anime: "Fullmetal Alchemist: Brotherhood" },
        { name: "Scar", anime: "Fullmetal Alchemist: Brotherhood" },
        { name: "King Bradley", anime: "Fullmetal Alchemist: Brotherhood" },
        { name: "Riza Hawkeye", anime: "Fullmetal Alchemist: Brotherhood" },
        { name: "Winry Rockbell", anime: "Fullmetal Alchemist: Brotherhood" },
        { name: "Ling Yao", anime: "Fullmetal Alchemist: Brotherhood" },
        { name: "Greed (Ling)", anime: "Fullmetal Alchemist: Brotherhood" },
        { name: "Envy", anime: "Fullmetal Alchemist: Brotherhood" },

        // Yu Yu Hakusho
        { name: "Yusuke Urameshi", anime: "Yu Yu Hakusho" },
        { name: "Kuwabara", anime: "Yu Yu Hakusho" },
        { name: "Kurama", anime: "Yu Yu Hakusho" },
        { name: "Hiei", anime: "Yu Yu Hakusho" },
        { name: "Toguro", anime: "Yu Yu Hakusho" },
        { name: "Genkai", anime: "Yu Yu Hakusho" },
        { name: "Shinobu Sensui", anime: "Yu Yu Hakusho" },
        { name: "Koenma", anime: "Yu Yu Hakusho" },
        { name: "Raizen", anime: "Yu Yu Hakusho" },
        { name: "Yomi", anime: "Yu Yu Hakusho" },

        // Rurouni Kenshin
        { name: "Kenshin Himura", anime: "Rurouni Kenshin" },
        { name: "Kaoru Kamiya", anime: "Rurouni Kenshin" },
        { name: "Sanosuke Sagara", anime: "Rurouni Kenshin" },
        { name: "Makoto Shishio", anime: "Rurouni Kenshin" },
        { name: "Aoshi Shinomori", anime: "Rurouni Kenshin" },
        { name: "Saito Hajime", anime: "Rurouni Kenshin" },
        { name: "Yahiko Myojin", anime: "Rurouni Kenshin" },
        { name: "Megumi Takani", anime: "Rurouni Kenshin" },
        { name: "Sojiro Seta", anime: "Rurouni Kenshin" },
        { name: "Enishi Yukishiro", anime: "Rurouni Kenshin" },

        // Fairy Tail
        { name: "Natsu Dragneel", anime: "Fairy Tail" },
        { name: "Lucy Heartfilia", anime: "Fairy Tail" },
        { name: "Erza Scarlet", anime: "Fairy Tail" },
        { name: "Gray Fullbuster", anime: "Fairy Tail" },
        { name: "Zeref", anime: "Fairy Tail" },
        { name: "Wendy Marvell", anime: "Fairy Tail" },
        { name: "Jellal Fernandes", anime: "Fairy Tail" },
        { name: "Gajeel Redfox", anime: "Fairy Tail" },
        { name: "Mirajane Strauss", anime: "Fairy Tail" },
        { name: "Laxus Dreyar", anime: "Fairy Tail" },

        // Akame ga Kill!
        { name: "Akame", anime: "Akame ga Kill!" },
        { name: "Tatsumi", anime: "Akame ga Kill!" },
        { name: "Esdeath", anime: "Akame ga Kill!" },
        { name: "Leone", anime: "Akame ga Kill!" },
        { name: "Mine", anime: "Akame ga Kill!" },
        { name: "Najenda", anime: "Akame ga Kill!" },
        { name: "Bulat", anime: "Akame ga Kill!" },
        { name: "Chelsea", anime: "Akame ga Kill!" },
        { name: "Wave", anime: "Akame ga Kill!" },
        { name: "Kurome", anime: "Akame ga Kill!" },

        // Tokyo Ghoul
        { name: "Ken Kaneki", anime: "Tokyo Ghoul" },
        { name: "Touka Kirishima", anime: "Tokyo Ghoul" },
        { name: "Juuzou Suzuya", anime: "Tokyo Ghoul" },
        { name: "Kuzen Yoshimura", anime: "Tokyo Ghoul" },
        { name: "Koutarou Amon", anime: "Tokyo Ghoul" },
        { name: "Rize Kamishiro", anime: "Tokyo Ghoul" },
        { name: "Shuu Tsukiyama", anime: "Tokyo Ghoul" },
        { name: "Eto Yoshimura", anime: "Tokyo Ghoul" },
        { name: "Kishou Arima", anime: "Tokyo Ghoul" },
        { name: "Hinami Fueguchi", anime: "Tokyo Ghoul" },

        // Tokyo Revengers
        { name: "Takemichi Hanagaki", anime: "Tokyo Revengers" },
        { name: "Mikey (Manjiro Sano)", anime: "Tokyo Revengers" },
        { name: "Draken", anime: "Tokyo Revengers" },
        { name: "Kisaki Tetta", anime: "Tokyo Revengers" },
        { name: "Baji Keisuke", anime: "Tokyo Revengers" },
        { name: "Chifuyu Matsuno", anime: "Tokyo Revengers" },
        { name: "Kazutora Hanemiya", anime: "Tokyo Revengers" },
        { name: "Hakkai Shiba", anime: "Tokyo Revengers" },
        { name: "Taiju Shiba", anime: "Tokyo Revengers" },
        { name: "Emma Sano", anime: "Tokyo Revengers" },

        // Blue Exorcist
        { name: "Rin Okumura", anime: "Blue Exorcist" },
        { name: "Yukio Okumura", anime: "Blue Exorcist" },
        { name: "Shura Kirigakure", anime: "Blue Exorcist" },
        { name: "Mephisto Pheles", anime: "Blue Exorcist" },
        { name: "Amaimon", anime: "Blue Exorcist" },
        { name: "Izumo Kamiki", anime: "Blue Exorcist" },
        { name: "Ryuji Suguro", anime: "Blue Exorcist" },
        { name: "Shiemi Moriyama", anime: "Blue Exorcist" },
        { name: "Shiro Fujimoto", anime: "Blue Exorcist" },
        { name: "Konekomaru Miwa", anime: "Blue Exorcist" },

        // Seraph of the End
        { name: "Yuuichirou Hyakuya", anime: "Seraph of the End" },
        { name: "Mikaela Hyakuya", anime: "Seraph of the End" },
        { name: "Guren Ichinose", anime: "Seraph of the End" },
        { name: "Shinoa Hiragi", anime: "Seraph of the End" },
        { name: "Ferid Bathory", anime: "Seraph of the End" },
        { name: "Krul Tepes", anime: "Seraph of the End" },
        { name: "Mitsuba Sangu", anime: "Seraph of the End" },
        { name: "Yoichi Saotome", anime: "Seraph of the End" },
        { name: "Kimizuki Shihou", anime: "Seraph of the End" },
        { name: "Mahiru Hiragi", anime: "Seraph of the End" },

        // Wind Breaker
        { name: "Haruka Sakura", anime: "Wind Breaker" },
        { name: "Hajime Umemiya", anime: "Wind Breaker" },
        { name: "Kyotaro Sugishita", anime: "Wind Breaker" },
        { name: "Hayato Suo", anime: "Wind Breaker" },
        { name: "Jo Togame", anime: "Wind Breaker" },
        { name: "Akihiko Nirei", anime: "Wind Breaker" },
        { name: "Ren Kaji", anime: "Wind Breaker" },
        { name: "Taiga Tsugeura", anime: "Wind Breaker" },
        { name: "Mitsuki Kiryu", anime: "Wind Breaker" },
        { name: "Masaki Anzai", anime: "Wind Breaker" },

        // Solo Leveling
        { name: "Sung Jinwoo", anime: "Solo Leveling" },
        { name: "Cha Hae-In", anime: "Solo Leveling" },
        { name: "Yoo Jinho", anime: "Solo Leveling" },
        { name: "Igris", anime: "Solo Leveling" },
        { name: "Beru", anime: "Solo Leveling" },
        { name: "Go Gunhee", anime: "Solo Leveling" },
        { name: "Thomas Andre", anime: "Solo Leveling" },
        { name: "Liu Zhigang", anime: "Solo Leveling" },
        { name: "Antares", anime: "Solo Leveling" },
        { name: "Kaisel", anime: "Solo Leveling" },

        // Shangri-La Frontier
        { name: "Sunraku (Rakuro Hizutome)", anime: "Shangri-La Frontier" },
        { name: "Psyger-0 (Rei Saiga)", anime: "Shangri-La Frontier" },
        { name: "Arthur Pencilgon", anime: "Shangri-La Frontier" },
        { name: "OiKatzo", anime: "Shangri-La Frontier" },
        { name: "Emul", anime: "Shangri-La Frontier" },
        { name: "Wezaemon the Tombguard", anime: "Shangri-La Frontier" },
        { name: "Lycaon the Nightslayer", anime: "Shangri-La Frontier" },
        { name: "Vysache", anime: "Shangri-La Frontier" },
        { name: "Ctarnidd of the Abyss", anime: "Shangri-La Frontier" },
        { name: "Setsuna", anime: "Shangri-La Frontier" },

        // Seven Deadly Sins
        { name: "Meliodas", anime: "Seven Deadly Sins" },
        { name: "Ban", anime: "Seven Deadly Sins" },
        { name: "Escanor", anime: "Seven Deadly Sins" },
        { name: "King", anime: "Seven Deadly Sins" },
        { name: "Diane", anime: "Seven Deadly Sins" },
        { name: "Elizabeth Liones", anime: "Seven Deadly Sins" },
        { name: "Merlin", anime: "Seven Deadly Sins" },
        { name: "Gowther", anime: "Seven Deadly Sins" },
        { name: "Hawk", anime: "Seven Deadly Sins" },
        { name: "Estarossa (Mael)", anime: "Seven Deadly Sins" },

        // Death Note
        { name: "Light Yagami", anime: "Death Note" },
        { name: "L", anime: "Death Note" },
        { name: "Misa Amane", anime: "Death Note" },
        { name: "Near", anime: "Death Note" },
        { name: "Ryuk", anime: "Death Note" },
        { name: "Soichiro Yagami", anime: "Death Note" },
        { name: "Touta Matsuda", anime: "Death Note" },
        { name: "Teru Mikami", anime: "Death Note" },
        { name: "Naomi Misora", anime: "Death Note" },
        { name: "Kiyomi Takada", anime: "Death Note" },

        // Classroom of the Elite
        { name: "Ayanokoji Kiyotaka", anime: "Classroom of the Elite" },
        { name: "Suzune Horikita", anime: "Classroom of the Elite" },
        { name: "Kikyo Kushida", anime: "Classroom of the Elite" },
        { name: "Kakeru Ryuen", anime: "Classroom of the Elite" },
        { name: "Arisu Sakayanagi", anime: "Classroom of the Elite" },
        { name: "Kei Karuizawa", anime: "Classroom of the Elite" },
        { name: "Honami Ichinose", anime: "Classroom of the Elite" },
        { name: "Manabu Horikita", anime: "Classroom of the Elite" },
        { name: "Rokusuke Koenji", anime: "Classroom of the Elite" },
        { name: "Sae Chabashira", anime: "Classroom of the Elite" },

        // Code Geass
        { name: "Lelouch vi Britannia", anime: "Code Geass" },
        { name: "Suzaku Kururugi", anime: "Code Geass" },
        { name: "C.C.", anime: "Code Geass" },
        { name: "Kallen Kozuki", anime: "Code Geass" },
        { name: "Schneizel el Britannia", anime: "Code Geass" },
        { name: "Nunnally vi Britannia", anime: "Code Geass" },
        { name: "Cornelia li Britannia", anime: "Code Geass" },
        { name: "Euphemia li Britannia", anime: "Code Geass" },
        { name: "Charles zi Britannia", anime: "Code Geass" },
        { name: "Jeremiah Gottwald", anime: "Code Geass" },

        // Death Parade
        { name: "Decim", anime: "Death Parade" },
        { name: "Chiyuki", anime: "Death Parade" },
        { name: "Nona", anime: "Death Parade" },
        { name: "Ginti", anime: "Death Parade" },
        { name: "Clavis", anime: "Death Parade" },
        { name: "Oculus", anime: "Death Parade" },
        { name: "Quin", anime: "Death Parade" },
        { name: "Mai Takada", anime: "Death Parade" },
        { name: "Misaki Tachibana", anime: "Death Parade" },
        { name: "Naoki Tachibana", anime: "Death Parade" },

        // Overlord
        { name: "Ainz Ooal Gown", anime: "Overlord" },
        { name: "Albedo", anime: "Overlord" },
        { name: "Demiurge", anime: "Overlord" },
        { name: "Shalltear Bloodfallen", anime: "Overlord" },
        { name: "Sebas Tian", anime: "Overlord" },
        { name: "Cocytus", anime: "Overlord" },
        { name: "Aura Bella Fiora", anime: "Overlord" },
        { name: "Mare Bello Fiore", anime: "Overlord" },
        { name: "Pandora's Actor", anime: "Overlord" },
        { name: "Victim", anime: "Overlord" },

        // Shield Hero
        { name: "Naofumi Iwatani", anime: "The Rising of the Shield Hero" },
        { name: "Raphtalia", anime: "The Rising of the Shield Hero" },
        { name: "Filo", anime: "The Rising of the Shield Hero" },
        { name: "Motoyasu", anime: "The Rising of the Shield Hero" },
        { name: "Malty", anime: "The Rising of the Shield Hero" },
        { name: "Fitoria", anime: "The Rising of the Shield Hero" },
        { name: "Queen Mirellia", anime: "The Rising of the Shield Hero" },
        { name: "Melty Q Melromarc", anime: "The Rising of the Shield Hero" },
        { name: "Glass", anime: "The Rising of the Shield Hero" },
        { name: "L'Arc Berg", anime: "The Rising of the Shield Hero" },

        // Re:Zero
        { name: "Subaru Natsuki", anime: "Re:Zero" },
        { name: "Emilia", anime: "Re:Zero" },
        { name: "Rem", anime: "Re:Zero" },
        { name: "Ram", anime: "Re:Zero" },
        { name: "Roswaal", anime: "Re:Zero" },
        { name: "Beatrice", anime: "Re:Zero" },
        { name: "Otto Suwen", anime: "Re:Zero" },
        { name: "Garfiel Tinsel", anime: "Re:Zero" },
        { name: "Elsa Granhiert", anime: "Re:Zero" },
        { name: "Echidna", anime: "Re:Zero" },

        // Mushoku Tensei
        { name: "Rudeus Greyrat", anime: "Mushoku Tensei" },
        { name: "Eris Boreas Greyrat", anime: "Mushoku Tensei" },
        { name: "Roxy Migurdia", anime: "Mushoku Tensei" },
        { name: "Sylphiette", anime: "Mushoku Tensei" },
        { name: "Orsted", anime: "Mushoku Tensei" },
        { name: "Paul Greyrat", anime: "Mushoku Tensei" },
        { name: "Zenith Greyrat", anime: "Mushoku Tensei" },
        { name: "Ruijerd Superdia", anime: "Mushoku Tensei" },
        { name: "Ghislaine Dedoldia", anime: "Mushoku Tensei" },
        { name: "Kishirika Kishirisu", anime: "Mushoku Tensei" },

        // Arifureta
        { name: "Hajime Nagumo", anime: "Arifureta" },
        { name: "Yue", anime: "Arifureta" },
        { name: "Shea Haulia", anime: "Arifureta" },
        { name: "Tio Klarus", anime: "Arifureta" },
        { name: "Kaori Shirasaki", anime: "Arifureta" },
        { name: "Myu", anime: "Arifureta" },
        { name: "Yuka Sonobe", anime: "Arifureta" },
        { name: "Kouki Amanogawa", anime: "Arifureta" },
        { name: "Endou Kousuke", anime: "Arifureta" },
        { name: "Meld Loggins", anime: "Arifureta" },

        // Tsukimichi
        { name: "Makoto Misumi", anime: "Tsukimichi: Moonlit Fantasy" },
        { name: "Tomoe", anime: "Tsukimichi: Moonlit Fantasy" },
        { name: "Mio", anime: "Tsukimichi: Moonlit Fantasy" },
        { name: "Sofia Bulga", anime: "Tsukimichi: Moonlit Fantasy" },
        { name: "Lime Latte", anime: "Tsukimichi: Moonlit Fantasy" },
        { name: "Shiki", anime: "Tsukimichi: Moonlit Fantasy" },
        { name: "Emma", anime: "Tsukimichi: Moonlit Fantasy" },
        { name: "Toa", anime: "Tsukimichi: Moonlit Fantasy" },
        { name: "Rona", anime: "Tsukimichi: Moonlit Fantasy" },
        { name: "Io", anime: "Tsukimichi: Moonlit Fantasy" },

        // Wrong Way to Use Healing Magic
        { name: "Usato", anime: "The Wrong Way to Use Healing Magic" },
        { name: "Rose", anime: "The Wrong Way to Use Healing Magic" },
        { name: "Suzune Inukami", anime: "The Wrong Way to Use Healing Magic" },
        { name: "Kazuki Ryuusen", anime: "The Wrong Way to Use Healing Magic" },
        { name: "Amako", anime: "The Wrong Way to Use Healing Magic" },
        { name: "Felm", anime: "The Wrong Way to Use Healing Magic" },
        { name: "Gurd", anime: "The Wrong Way to Use Healing Magic" },
        { name: "Blurin", anime: "The Wrong Way to Use Healing Magic" },
        { name: "Orga", anime: "The Wrong Way to Use Healing Magic" },
        { name: "Nero", anime: "The Wrong Way to Use Healing Magic" },

        // Beast Tamer
        { name: "Rein Shroud", anime: "Beast Tamer" },
        { name: "Kanade", anime: "Beast Tamer" },
        { name: "Tania", anime: "Beast Tamer" },
        { name: "Sora", anime: "Beast Tamer" },
        { name: "Runa", anime: "Beast Tamer" },
        { name: "Arios Orlando", anime: "Beast Tamer" },
        { name: "Nina", anime: "Beast Tamer" },
        { name: "Stella", anime: "Beast Tamer" },
        { name: "Helen", anime: "Beast Tamer" },
        { name: "Natalie", anime: "Beast Tamer" },

        // Overly Cautious Hero
        { name: "Seiya Ryuuguuin", anime: "Overly Cautious Hero" },
        { name: "Ristarte", anime: "Overly Cautious Hero" },
        { name: "Valkyrie", anime: "Overly Cautious Hero" },
        { name: "Adenela", anime: "Overly Cautious Hero" },
        { name: "Aria", anime: "Overly Cautious Hero" },
        { name: "Mash", anime: "Overly Cautious Hero" },
        { name: "Cerceus", anime: "Overly Cautious Hero" },
        { name: "Mitotis", anime: "Overly Cautious Hero" },
        { name: "Ishtar", anime: "Overly Cautious Hero" },
        { name: "Ariadoa", anime: "Overly Cautious Hero" },

        // Death March
        { name: "Satou Pendragon", anime: "Death March to the Parallel World Rhapsody" },
        { name: "Zena Marientail", anime: "Death March to the Parallel World Rhapsody" },
        { name: "Arisa", anime: "Death March to the Parallel World Rhapsody" },
        { name: "Lulu", anime: "Death March to the Parallel World Rhapsody" },
        { name: "Pochi", anime: "Death March to the Parallel World Rhapsody" },
        { name: "Tama", anime: "Death March to the Parallel World Rhapsody" },
        { name: "Nana", anime: "Death March to the Parallel World Rhapsody" },
        { name: "Mia", anime: "Death March to the Parallel World Rhapsody" },
        { name: "Zen", anime: "Death March to the Parallel World Rhapsody" },
        { name: "Dryad", anime: "Death March to the Parallel World Rhapsody" },

        // Smartphone Isekai
        { name: "Touya Mochizuki", anime: "In Another World With My Smartphone" },
        { name: "Yumina Urnea Belfast", anime: "In Another World With My Smartphone" },
        { name: "Elze Silhoueska", anime: "In Another World With My Smartphone" },
        { name: "Linze Silhoueska", anime: "In Another World With My Smartphone" },
        { name: "Leen", anime: "In Another World With My Smartphone" },
        { name: "Yae Kokonoe", anime: "In Another World With My Smartphone" },
        { name: "Sushie Ernea Ortlinde", anime: "In Another World With My Smartphone" },
        { name: "Leonia", anime: "In Another World With My Smartphone" },
        { name: "Kohaku", anime: "In Another World With My Smartphone" },
        { name: "Hildegard Minhas", anime: "In Another World With My Smartphone" },

        // World’s Finest Assassin
        { name: "Lugh Tuatha Dé", anime: "The World’s Finest Assassin Gets Reincarnated as an Aristocrat" },
        { name: "Dia Viekone", anime: "The World’s Finest Assassin Gets Reincarnated as an Aristocrat" },
        { name: "Tarte", anime: "The World’s Finest Assassin Gets Reincarnated as an Aristocrat" },
        { name: "Maha", anime: "The World’s Finest Assassin Gets Reincarnated as an Aristocrat" },
        { name: "Cian Tuatha Dé", anime: "The World’s Finest Assassin Gets Reincarnated as an Aristocrat" },
        { name: "Epona", anime: "The World’s Finest Assassin Gets Reincarnated as an Aristocrat" },
        { name: "Epsylon", anime: "The World’s Finest Assassin Gets Reincarnated as an Aristocrat" },
        { name: "Viekone (House) Head", anime: "The World’s Finest Assassin Gets Reincarnated as an Aristocrat" },
        { name: "Illig Balor", anime: "The World’s Finest Assassin Gets Reincarnated as an Aristocrat" },
        { name: "Demon Lord (Target)", anime: "The World’s Finest Assassin Gets Reincarnated as an Aristocrat" },

        // Misfit
        { name: "Anos Voldigoad", anime: "The Misfit of Demon King Academy" },
        { name: "Misha Necron", anime: "The Misfit of Demon King Academy" },
        { name: "Sasha Necron", anime: "The Misfit of Demon King Academy" },
        { name: "Lay Glanzudlii", anime: "The Misfit of Demon King Academy" },
        { name: "Eleonore Bianca", anime: "The Misfit of Demon King Academy" },
        { name: "Misa Ilioroagu", anime: "The Misfit of Demon King Academy" },
        { name: "Avos Dilhevia", anime: "The Misfit of Demon King Academy" },
        { name: "Shin Reglia", anime: "The Misfit of Demon King Academy" },
        { name: "Eugo La Raviaz", anime: "The Misfit of Demon King Academy" },
        { name: "Melheis Boran", anime: "The Misfit of Demon King Academy" },

        // Tower of God
        { name: "Bam (Twenty-Fifth Baam)", anime: "Tower of God" },
        { name: "Khun Aguero Agnis", anime: "Tower of God" },
        { name: "Rak Wraithraiser", anime: "Tower of God" },
        { name: "Endorsi Jahad", anime: "Tower of God" },
        { name: "Rachel", anime: "Tower of God" },
        { name: "Ha Yuri Jahad", anime: "Tower of God" },
        { name: "Hwa Ryun", anime: "Tower of God" },
        { name: "Quant Blitz", anime: "Tower of God" },
        { name: "Urek Mazino", anime: "Tower of God" },
        { name: "Kallavan", anime: "Tower of God" },

        // Yu-Gi-Oh! Original
        { name: "Yugi Muto", anime: "Yu-Gi-Oh! (Original)" },
        { name: "Seto Kaiba", anime: "Yu-Gi-Oh! (Original)" },
        { name: "Joey Wheeler", anime: "Yu-Gi-Oh! (Original)" },
        { name: "Mai Valentine", anime: "Yu-Gi-Oh! (Original)" },
        { name: "Maximillion Pegasus", anime: "Yu-Gi-Oh! (Original)" },
        { name: "Tea Gardner (Anzu)", anime: "Yu-Gi-Oh! (Original)" },
        { name: "Yami Yugi (Pharaoh Atem)", anime: "Yu-Gi-Oh! (Original)" },
        { name: "Yami Bakura", anime: "Yu-Gi-Oh! (Original)" },
        { name: "Marik Ishtar", anime: "Yu-Gi-Oh! (Original)" },
        { name: "Weevil Underwood", anime: "Yu-Gi-Oh! (Original)" },

        // Cowboy Bebop
        { name: "Spike Spiegel", anime: "Cowboy Bebop" },
        { name: "Jet Black", anime: "Cowboy Bebop" },
        { name: "Faye Valentine", anime: "Cowboy Bebop" },
        { name: "Edward", anime: "Cowboy Bebop" },
        { name: "Vicious", anime: "Cowboy Bebop" },
        { name: "Ein", anime: "Cowboy Bebop" },
        { name: "Julia", anime: "Cowboy Bebop" },
        { name: "Fad", anime: "Cowboy Bebop" },
        { name: "Punch", anime: "Cowboy Bebop" },
        { name: "Laughing Bull", anime: "Cowboy Bebop" },

        // Parasyte
        { name: "Shinichi Izumi", anime: "Parasyte: The Maxim" },
        { name: "Migi", anime: "Parasyte: The Maxim" },
        { name: "Kana Kimishima", anime: "Parasyte: The Maxim" },
        { name: "Gotou", anime: "Parasyte: The Maxim" },
        { name: "Reiko Tamura", anime: "Parasyte: The Maxim" },
        { name: "Murano Satomi", anime: "Parasyte: The Maxim" },
        { name: "Ryoko Tamiya", anime: "Parasyte: The Maxim" },
        { name: "Mr. Izumi", anime: "Parasyte: The Maxim" },
        { name: "Uragami", anime: "Parasyte: The Maxim" },
        { name: "Mitsuo", anime: "Parasyte: The Maxim" },

        // Mashle
        { name: "Mash Burnedead", anime: "Mashle" },
        { name: "Finn Ames", anime: "Mashle" },
        { name: "Lance Crown", anime: "Mashle" },
        { name: "Dot Barrett", anime: "Mashle" },
        { name: "Abel Walker", anime: "Mashle" },
        { name: "Rayne Ames", anime: "Mashle" },
        { name: "Cell War", anime: "Mashle" },
        { name: "Margarette Macaron", anime: "Mashle" },
        { name: "Innocent Zero", anime: "Mashle" },
        { name: "Wahlberg Baigan", anime: "Mashle" },

        // Magi
        { name: "Aladdin", anime: "Magi: The Labyrinth of Magic" },
        { name: "Alibaba Saluja", anime: "Magi: The Labyrinth of Magic" },
        { name: "Morgiana", anime: "Magi: The Labyrinth of Magic" },
        { name: "Hakuryuu Ren", anime: "Magi: The Labyrinth of Magic" },
        { name: "Judar", anime: "Magi: The Labyrinth of Magic" },
        { name: "Kouen Ren", anime: "Magi: The Labyrinth of Magic" },
        { name: "Cassim", anime: "Magi: The Labyrinth of Magic" },
        { name: "Titus Alexius", anime: "Magi: The Labyrinth of Magic" },
        { name: "Kougyoku Ren", anime: "Magi: The Labyrinth of Magic" },
        { name: "Sharrkan", anime: "Magi: The Labyrinth of Magic" },

        // Magi: Sinbad
        { name: "Sinbad", anime: "Magi: Adventure of Sinbad" },
        { name: "Jafar", anime: "Magi: Adventure of Sinbad" },
        { name: "Hinahoho", anime: "Magi: Adventure of Sinbad" },
        { name: "Drakon", anime: "Magi: Adventure of Sinbad" },
        { name: "Yunan", anime: "Magi: Adventure of Sinbad" },
        { name: "Serendine", anime: "Magi: Adventure of Sinbad" },
        { name: "Ja'far", anime: "Magi: Adventure of Sinbad" },
        { name: "Masrur", anime: "Magi: Adventure of Sinbad" },
        { name: "Badr", anime: "Magi: Adventure of Sinbad" },
        { name: "Sphintus", anime: "Magi: Adventure of Sinbad" },

        // Pokémon
        { name: "Ash Ketchum", anime: "Pokémon" },
        { name: "Brock", anime: "Pokémon" },
        { name: "Misty", anime: "Pokémon" },
        { name: "Team Rocket (Jessie & James)", anime: "Pokémon" },
        { name: "Nurse Joy", anime: "Pokémon" },
        { name: "Pikachu", anime: "Pokémon" },
        { name: "Professor Oak", anime: "Pokémon" },
        { name: "Gary Oak", anime: "Pokémon" },
        { name: "Cynthia", anime: "Pokémon" },
        { name: "Giovanni", anime: "Pokémon" },
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
