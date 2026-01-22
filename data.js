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
        "Time limit cut in half.",
        "They start injured (already damaged or exhausted).",
        "They can only use one signature ability (pick ONE move/power style only).",
        "They must protect one civilian the entire time.",
        "No powers for the first 60 seconds (must survive the start with skill only).",
        "They have 10 minutes prep time (quick planning, no long setups).",
        "They must keep it secret (no public reveal, no announcing intentions).",
        "Opponent adapts mid-way and the situation gets harder."
      ],

      prompts: [
        { id: 1, prompt: "This character can deliver an “Erwin’s Final Charge” level speech that makes soldiers ride into guaranteed death.",
          source: "Attack on Titan — Erwin’s Final Charge",
          explanation: "Erwin Smith turns fear into purpose and convinces soldiers to charge into a massacre anyway." },

        { id: 2, prompt: "This character can survive and pass the Hunter Exam and earn a Hunter License.",
          source: "Hunter x Hunter — Hunter Exam Arc",
          explanation: "The Hunter Exam is endurance, survival, mind-games, and deadly pressure where people fail without even fighting." },

        { id: 3, prompt: "This character can successfully pull off Lelouch’s “Zero Requiem” and make the world unite through their own sacrifice.",
          source: "Code Geass — Zero Requiem",
          explanation: "Lelouch becomes the world’s ultimate villain on purpose so his death creates unity, peace, and stability afterward." },

        { id: 4, prompt: "This character can win Duelist Kingdom and defeat Pegasus.",
          source: "Yu-Gi-Oh! — Duelist Kingdom Arc",
          explanation: "Duelist Kingdom requires strategy and endurance; Pegasus is a final boss who can cheat with mind-reading." },

        { id: 5, prompt: "This character can clear the Forest of Death and retrieve the correct scroll without their team getting wiped.",
          source: "Naruto — Chūnin Exams: Forest of Death",
          explanation: "Teams are hunted by enemies, monsters, and traps; you must secure the scroll and reach the tower alive." },

        { id: 6, prompt: "This character can win the Cell Games and stop Cell from destroying Earth.",
          source: "Dragon Ball Z — Cell Games Saga",
          explanation: "Cell hosts a hostage tournament with regeneration and escalation—winning requires ending it decisively." },

        { id: 7, prompt: "This character can complete Ainz’s “Lizardmen Arc” conquest without unnecessary slaughter and still secure control.",
          source: "Overlord — Lizardmen Heroes Arc",
          explanation: "Win control while minimizing pointless deaths and preventing rebellion afterward." },

        { id: 8, prompt: "This character can win a Shokugeki cooking duel against Soma Yukihira.",
          source: "Food Wars! Shokugeki no Soma — Shokugeki Battles",
          explanation: "A Shokugeki is judged on flavor + creativity; Soma wins by making insane ideas taste godlike." },

        { id: 9, prompt: "This character can pull off the Ocean’s Eleven casino vault heist successfully.",
          source: "Ocean’s Eleven — Casino Vault Heist",
          explanation: "A precision heist requiring timing, deception, stealth, and flawless execution—one mistake collapses the plan." },

        { id: 10, prompt: "This character can execute the Grace Field House escape plan and get the kids out successfully.",
          source: "The Promised Neverland — Grace Field House Escape",
          explanation: "Escaping requires intelligence, deception, teamwork, and zero mistakes against a monitored system." },

        { id: 11, prompt: "This character can win the Dark Tournament and keep their team alive to the end.",
          source: "Yu Yu Hakusho — Dark Tournament",
          explanation: "A brutal elimination tournament where opponents cheat and kill—winning requires both power and team management." },

        { id: 12, prompt: "This character can survive Subaru’s Return-by-Death psychological pressure without mentally breaking.",
          source: "Re:Zero — Return by Death Loops",
          explanation: "Repeating death and failure destroys sanity; success means mental endurance and adapting without losing hope." },

        { id: 13, prompt: "This character can expose the corrupt government in FMAB without getting eliminated first.",
          source: "Fullmetal Alchemist: Brotherhood — Central Conspiracy",
          explanation: "The system is rigged; winning means gathering proof and surviving assassinations and cover-ups." },

        { id: 14, prompt: "This character can win the Royal Knights Selection Tournament without using lethal force.",
          source: "Black Clover — Royal Knights Selection Exam",
          explanation: "Victory requires outplaying elite mages while keeping damage controlled and avoiding fatal attacks." },

        { id: 15, prompt: "This character can negotiate peace between Marley and Paradis without triggering more war.",
          source: "Attack on Titan — Marley/Paradis Conflict",
          explanation: "Both sides are traumatized; diplomacy requires credibility, leverage, and perfect timing." },

        { id: 16, prompt: "This character can successfully run Nazarick’s public image without exposing the truth.",
          source: "Overlord — Sorcerer Kingdom Politics",
          explanation: "Keeping control requires diplomacy, intimidation, and preventing the world from uniting against you." },

        { id: 17, prompt: "This character can survive the Shibuya Incident and still accomplish the mission.",
          source: "Jujutsu Kaisen — Shibuya Incident",
          explanation: "City-wide chaos with traps and elite enemies—plans collapse instantly and survival is not guaranteed." },

        { id: 18, prompt: "This character can win the Grand Magic Games and keep their guild’s reputation intact.",
          source: "Fairy Tail — Grand Magic Games",
          explanation: "It’s public and political; winning requires power plus not embarrassing your guild." },

        { id: 19, prompt: "This character can stop the Paranormal Liberation War from escalating into full collapse.",
          source: "My Hero Academia — Paranormal Liberation War",
          explanation: "A massive battlefield; success requires strategy, priority targeting, and saving allies." },

        { id: 20, prompt: "This character can keep a perfect fake identity inside a hostile organization for 30 days.",
          source: "Tokyo Revengers — Gang Infiltration Tension",
          explanation: "Survival depends on blending in and making no mistakes under constant suspicion." },

        { id: 21, prompt: "This character can keep their humanity intact after a life-changing transformation and still function normally.",
          source: "Parasyte: The Maxim — Shinichi’s Transformation",
          explanation: "Balancing survival instincts with morality and daily life becomes a constant psychological battle." },

        { id: 22, prompt: "This character can build a trade empire from nothing without triggering a war.",
          source: "Tsukimichi: Moonlit Fantasy — Kuzunoha Company",
          explanation: "Success requires negotiation, economics, and managing powerful factions carefully." },

        { id: 23, prompt: "This character can survive being targeted by a top-tier assassin and still complete their mission.",
          source: "The World’s Finest Assassin — Assassin World Rules",
          explanation: "Avoiding death requires strategy, misdirection, and planning around a lethal opponent." },

        { id: 24, prompt: "This character can win a battle royale where alliances constantly shift and still come out on top.",
          source: "Dragon Ball Super — Tournament of Power",
          explanation: "Winning requires endurance, alliances, and ring-out awareness, not just raw strength." },

        { id: 25, prompt: "This character can lead a squad to victory while hiding a massive secret from their own team.",
          source: "Seraph of the End — Military Secrets",
          explanation: "Success requires leadership, deception, and preventing allies from turning on you." },

        { id: 26, prompt: "This character can take control of an underdog team and win through pure preparation and manipulation.",
          source: "Classroom of the Elite — Class Battles",
          explanation: "Victory comes from hidden planning, leveraging people, and controlling outcomes without being exposed." },

        { id: 27, prompt: "This character can prevent a major betrayal inside their organization before it destroys everything.",
          source: "Code Geass — Internal Betrayal & Power Plays",
          explanation: "Preventing betrayal requires reading intentions, securing proof, and acting before the first domino falls." },

        { id: 28, prompt: "This character can win a high-stakes cooking duel using creativity alone (no perfect technique carry).",
          source: "Food Wars! — Shokugeki Battles",
          explanation: "Judges reward memorable flavor and bold ideas; you must innovate and execute enough to impress." },

        { id: 29, prompt: "This character can survive a city-wide monster outbreak and still keep civilians organized.",
          source: "Kaiju No. 8 — Kaiju Disaster Response",
          explanation: "Survival isn’t enough; you must manage chaos, evacuations, and fear while threats escalate." },

        { id: 30, prompt: "This character can stop a powerful villain’s ideology from spreading and radicalizing the public.",
          source: "My Hero Academia — Society & Ideology Fallout",
          explanation: "The fight is social and psychological: changing minds, limiting damage, and preventing copycats." }
      ],

      // Character pool: objects so we can display origin title on the board
      characters: [
        // Dragon Ball
        { name: "Kid Goku", anime: "Dragon Ball" },
        { name: "Bulma", anime: "Dragon Ball" },
        { name: "Master Roshi", anime: "Dragon Ball" },
        { name: "Krillin", anime: "Dragon Ball" },
        { name: "Piccolo", anime: "Dragon Ball" },

        // Dragon Ball Z
        { name: "Teen Gohan", anime: "Dragon Ball Z" },
        { name: "Future Trunks", anime: "Dragon Ball Z" },
        { name: "Frieza", anime: "Dragon Ball Z" },
        { name: "Cell", anime: "Dragon Ball Z" },
        { name: "Kid Buu", anime: "Dragon Ball Z" },

        // Dragon Ball GT
        { name: "Super Saiyan 4 Gogeta", anime: "Dragon Ball GT" },
        { name: "Omega Shenron", anime: "Dragon Ball GT" },
        { name: "Super 17", anime: "Dragon Ball GT" },
        { name: "Pan", anime: "Dragon Ball GT" },
        { name: "Baby Vegeta", anime: "Dragon Ball GT" },

        // Dragon Ball Super
        { name: "Super Saiyan Blue Vegito", anime: "Dragon Ball Super" },
        { name: "Beerus", anime: "Dragon Ball Super" },
        { name: "Jiren", anime: "Dragon Ball Super" },
        { name: "Broly (DBS)", anime: "Dragon Ball Super" },
        { name: "Goku Black", anime: "Dragon Ball Super" },

        // Naruto (Part 1)
        { name: "Naruto Uzumaki (Part 1)", anime: "Naruto (Part 1)" },
        { name: "Sasuke Uchiha (Part 1)", anime: "Naruto (Part 1)" },
        { name: "Rock Lee", anime: "Naruto (Part 1)" },
        { name: "Kakashi Hatake (Part 1)", anime: "Naruto (Part 1)" },
        { name: "Orochimaru", anime: "Naruto (Part 1)" },

        // Naruto Shippuden
        { name: "Itachi Uchiha", anime: "Naruto Shippuden" },
        { name: "Pain (Nagato)", anime: "Naruto Shippuden" },
        { name: "Madara Uchiha", anime: "Naruto Shippuden" },
        { name: "Obito Uchiha (Tobi)", anime: "Naruto Shippuden" },
        { name: "Minato Namikaze", anime: "Naruto Shippuden" },

        // Attack on Titan
        { name: "Eren Yeager", anime: "Attack on Titan" },
        { name: "Mikasa Ackerman", anime: "Attack on Titan" },
        { name: "Levi Ackerman", anime: "Attack on Titan" },
        { name: "Erwin Smith", anime: "Attack on Titan" },
        { name: "Armin Arlert", anime: "Attack on Titan" },

        // My Hero Academia
        { name: "Deku (Izuku Midoriya)", anime: "My Hero Academia" },
        { name: "Bakugo Katsuki", anime: "My Hero Academia" },
        { name: "Shoto Todoroki", anime: "My Hero Academia" },
        { name: "All Might", anime: "My Hero Academia" },
        { name: "Dabi", anime: "My Hero Academia" },

        // Jujutsu Kaisen
        { name: "Yuji Itadori", anime: "Jujutsu Kaisen" },
        { name: "Megumi Fushiguro", anime: "Jujutsu Kaisen" },
        { name: "Nobara Kugisaki", anime: "Jujutsu Kaisen" },
        { name: "Gojo Satoru", anime: "Jujutsu Kaisen" },
        { name: "Sukuna", anime: "Jujutsu Kaisen" },

        // Black Clover
        { name: "Asta", anime: "Black Clover" },
        { name: "Yuno", anime: "Black Clover" },
        { name: "Noelle Silva", anime: "Black Clover" },
        { name: "Yami Sukehiro", anime: "Black Clover" },
        { name: "Julius Novachrono", anime: "Black Clover" },

        // Fire Force
        { name: "Shinra Kusakabe", anime: "Fire Force" },
        { name: "Arthur Boyle", anime: "Fire Force" },
        { name: "Benimaru Shinmon", anime: "Fire Force" },
        { name: "Tamaki Kotatsu", anime: "Fire Force" },
        { name: "Joker", anime: "Fire Force" },

        // Kaiju No. 8
        { name: "Kafka Hibino", anime: "Kaiju No. 8" },
        { name: "Mina Ashiro", anime: "Kaiju No. 8" },
        { name: "Reno Ichikawa", anime: "Kaiju No. 8" },
        { name: "Kikoru Shinomiya", anime: "Kaiju No. 8" },
        { name: "Soshiro Hoshina", anime: "Kaiju No. 8" },

        // Hunter x Hunter
        { name: "Gon Freecss", anime: "Hunter x Hunter" },
        { name: "Killua Zoldyck", anime: "Hunter x Hunter" },
        { name: "Kurapika", anime: "Hunter x Hunter" },
        { name: "Hisoka", anime: "Hunter x Hunter" },
        { name: "Chrollo Lucilfer", anime: "Hunter x Hunter" },

        // FMAB
        { name: "Edward Elric", anime: "Fullmetal Alchemist: Brotherhood" },
        { name: "Alphonse Elric", anime: "Fullmetal Alchemist: Brotherhood" },
        { name: "Roy Mustang", anime: "Fullmetal Alchemist: Brotherhood" },
        { name: "Scar", anime: "Fullmetal Alchemist: Brotherhood" },
        { name: "King Bradley", anime: "Fullmetal Alchemist: Brotherhood" },

        // Yu Yu Hakusho
        { name: "Yusuke Urameshi", anime: "Yu Yu Hakusho" },
        { name: "Kuwabara", anime: "Yu Yu Hakusho" },
        { name: "Kurama", anime: "Yu Yu Hakusho" },
        { name: "Hiei", anime: "Yu Yu Hakusho" },
        { name: "Toguro", anime: "Yu Yu Hakusho" },

        // Rurouni Kenshin
        { name: "Kenshin Himura", anime: "Rurouni Kenshin" },
        { name: "Kaoru Kamiya", anime: "Rurouni Kenshin" },
        { name: "Sanosuke Sagara", anime: "Rurouni Kenshin" },
        { name: "Makoto Shishio", anime: "Rurouni Kenshin" },
        { name: "Aoshi Shinomori", anime: "Rurouni Kenshin" },

        // Fairy Tail
        { name: "Natsu Dragneel", anime: "Fairy Tail" },
        { name: "Lucy Heartfilia", anime: "Fairy Tail" },
        { name: "Erza Scarlet", anime: "Fairy Tail" },
        { name: "Gray Fullbuster", anime: "Fairy Tail" },
        { name: "Zeref", anime: "Fairy Tail" },

        // Akame ga Kill!
        { name: "Akame", anime: "Akame ga Kill!" },
        { name: "Tatsumi", anime: "Akame ga Kill!" },
        { name: "Esdeath", anime: "Akame ga Kill!" },
        { name: "Leone", anime: "Akame ga Kill!" },
        { name: "Mine", anime: "Akame ga Kill!" },

        // Tokyo Ghoul
        { name: "Ken Kaneki", anime: "Tokyo Ghoul" },
        { name: "Touka Kirishima", anime: "Tokyo Ghoul" },
        { name: "Juuzou Suzuya", anime: "Tokyo Ghoul" },
        { name: "Kuzen Yoshimura", anime: "Tokyo Ghoul" },
        { name: "Koutarou Amon", anime: "Tokyo Ghoul" },

        // Tokyo Revengers
        { name: "Takemichi Hanagaki", anime: "Tokyo Revengers" },
        { name: "Mikey (Manjiro Sano)", anime: "Tokyo Revengers" },
        { name: "Draken", anime: "Tokyo Revengers" },
        { name: "Kisaki Tetta", anime: "Tokyo Revengers" },
        { name: "Baji Keisuke", anime: "Tokyo Revengers" },

        // Blue Exorcist
        { name: "Rin Okumura", anime: "Blue Exorcist" },
        { name: "Yukio Okumura", anime: "Blue Exorcist" },
        { name: "Shura Kirigakure", anime: "Blue Exorcist" },
        { name: "Mephisto Pheles", anime: "Blue Exorcist" },
        { name: "Amaimon", anime: "Blue Exorcist" },

        // Seraph of the End
        { name: "Yuuichirou Hyakuya", anime: "Seraph of the End" },
        { name: "Mikaela Hyakuya", anime: "Seraph of the End" },
        { name: "Guren Ichinose", anime: "Seraph of the End" },
        { name: "Shinoa Hiragi", anime: "Seraph of the End" },
        { name: "Ferid Bathory", anime: "Seraph of the End" },

        // Wind Breaker
        { name: "Haruka Sakura", anime: "Wind Breaker" },
        { name: "Hajime Umemiya", anime: "Wind Breaker" },
        { name: "Kyotaro Sugishita", anime: "Wind Breaker" },
        { name: "Hayato Suo", anime: "Wind Breaker" },
        { name: "Jo Togame", anime: "Wind Breaker" },

        // Solo Leveling
        { name: "Sung Jinwoo", anime: "Solo Leveling" },
        { name: "Cha Hae-In", anime: "Solo Leveling" },
        { name: "Yoo Jinho", anime: "Solo Leveling" },
        { name: "Igris", anime: "Solo Leveling" },
        { name: "Beru", anime: "Solo Leveling" },

        // Shangri-La Frontier
        { name: "Sunraku (Rakuro Hizutome)", anime: "Shangri-La Frontier" },
        { name: "Psyger-0 (Rei Saiga)", anime: "Shangri-La Frontier" },
        { name: "Arthur Pencilgon", anime: "Shangri-La Frontier" },
        { name: "OiKatzo", anime: "Shangri-La Frontier" },
        { name: "Emul", anime: "Shangri-La Frontier" },

        // Seven Deadly Sins
        { name: "Meliodas", anime: "Seven Deadly Sins" },
        { name: "Ban", anime: "Seven Deadly Sins" },
        { name: "Escanor", anime: "Seven Deadly Sins" },
        { name: "King", anime: "Seven Deadly Sins" },
        { name: "Diane", anime: "Seven Deadly Sins" },

        // Death Note
        { name: "Light Yagami", anime: "Death Note" },
        { name: "L", anime: "Death Note" },
        { name: "Misa Amane", anime: "Death Note" },
        { name: "Near", anime: "Death Note" },
        { name: "Ryuk", anime: "Death Note" },

        // Classroom of the Elite
        { name: "Ayanokoji Kiyotaka", anime: "Classroom of the Elite" },
        { name: "Suzune Horikita", anime: "Classroom of the Elite" },
        { name: "Kikyo Kushida", anime: "Classroom of the Elite" },
        { name: "Kakeru Ryuen", anime: "Classroom of the Elite" },
        { name: "Arisu Sakayanagi", anime: "Classroom of the Elite" },

        // Code Geass
        { name: "Lelouch vi Britannia", anime: "Code Geass" },
        { name: "Suzaku Kururugi", anime: "Code Geass" },
        { name: "C.C.", anime: "Code Geass" },
        { name: "Kallen Kozuki", anime: "Code Geass" },
        { name: "Schneizel el Britannia", anime: "Code Geass" },

        // Death Parade
        { name: "Decim", anime: "Death Parade" },
        { name: "Chiyuki", anime: "Death Parade" },
        { name: "Nona", anime: "Death Parade" },
        { name: "Ginti", anime: "Death Parade" },
        { name: "Clavis", anime: "Death Parade" },

        // Overlord
        { name: "Ainz Ooal Gown", anime: "Overlord" },
        { name: "Albedo", anime: "Overlord" },
        { name: "Demiurge", anime: "Overlord" },
        { name: "Shalltear Bloodfallen", anime: "Overlord" },
        { name: "Sebas Tian", anime: "Overlord" },

        // Shield Hero
        { name: "Naofumi Iwatani", anime: "The Rising of the Shield Hero" },
        { name: "Raphtalia", anime: "The Rising of the Shield Hero" },
        { name: "Filo", anime: "The Rising of the Shield Hero" },
        { name: "Motoyasu", anime: "The Rising of the Shield Hero" },
        { name: "Malty", anime: "The Rising of the Shield Hero" },

        // Re:Zero
        { name: "Subaru Natsuki", anime: "Re:Zero" },
        { name: "Emilia", anime: "Re:Zero" },
        { name: "Rem", anime: "Re:Zero" },
        { name: "Ram", anime: "Re:Zero" },
        { name: "Roswaal", anime: "Re:Zero" },

        // Mushoku Tensei
        { name: "Rudeus Greyrat", anime: "Mushoku Tensei" },
        { name: "Eris Boreas Greyrat", anime: "Mushoku Tensei" },
        { name: "Roxy Migurdia", anime: "Mushoku Tensei" },
        { name: "Sylphiette", anime: "Mushoku Tensei" },
        { name: "Orsted", anime: "Mushoku Tensei" },

        // Arifureta
        { name: "Hajime Nagumo", anime: "Arifureta" },
        { name: "Yue", anime: "Arifureta" },
        { name: "Shea Haulia", anime: "Arifureta" },
        { name: "Tio Klarus", anime: "Arifureta" },
        { name: "Kaori Shirasaki", anime: "Arifureta" },

        // Tsukimichi
        { name: "Makoto Misumi", anime: "Tsukimichi: Moonlit Fantasy" },
        { name: "Tomoe", anime: "Tsukimichi: Moonlit Fantasy" },
        { name: "Mio", anime: "Tsukimichi: Moonlit Fantasy" },
        { name: "Sofia Bulga", anime: "Tsukimichi: Moonlit Fantasy" },
        { name: "Lime Latte", anime: "Tsukimichi: Moonlit Fantasy" },

        // Wrong Way to Use Healing Magic
        { name: "Usato", anime: "The Wrong Way to Use Healing Magic" },
        { name: "Rose", anime: "The Wrong Way to Use Healing Magic" },
        { name: "Suzune Inukami", anime: "The Wrong Way to Use Healing Magic" },
        { name: "Kazuki Ryuusen", anime: "The Wrong Way to Use Healing Magic" },
        { name: "Amako", anime: "The Wrong Way to Use Healing Magic" },

        // Beast Tamer
        { name: "Rein Shroud", anime: "Beast Tamer" },
        { name: "Kanade", anime: "Beast Tamer" },
        { name: "Tania", anime: "Beast Tamer" },
        { name: "Sora", anime: "Beast Tamer" },
        { name: "Runa", anime: "Beast Tamer" },

        // Overly Cautious Hero
        { name: "Seiya Ryuuguuin", anime: "Overly Cautious Hero" },
        { name: "Ristarte", anime: "Overly Cautious Hero" },
        { name: "Valkyrie", anime: "Overly Cautious Hero" },
        { name: "Adenela", anime: "Overly Cautious Hero" },
        { name: "Aria", anime: "Overly Cautious Hero" },

        // Death March
        { name: "Satou Pendragon", anime: "Death March to the Parallel World Rhapsody" },
        { name: "Zena Marientail", anime: "Death March to the Parallel World Rhapsody" },
        { name: "Arisa", anime: "Death March to the Parallel World Rhapsody" },
        { name: "Lulu", anime: "Death March to the Parallel World Rhapsody" },
        { name: "Pochi", anime: "Death March to the Parallel World Rhapsody" },

        // Smartphone Isekai
        { name: "Touya Mochizuki", anime: "In Another World With My Smartphone" },
        { name: "Yumina Urnea Belfast", anime: "In Another World With My Smartphone" },
        { name: "Elze Silhoueska", anime: "In Another World With My Smartphone" },
        { name: "Linze Silhoueska", anime: "In Another World With My Smartphone" },
        { name: "Leen", anime: "In Another World With My Smartphone" },

        // World’s Finest Assassin
        { name: "Lugh Tuatha Dé", anime: "The World’s Finest Assassin Gets Reincarnated as an Aristocrat" },
        { name: "Dia Viekone", anime: "The World’s Finest Assassin Gets Reincarnated as an Aristocrat" },
        { name: "Tarte", anime: "The World’s Finest Assassin Gets Reincarnated as an Aristocrat" },
        { name: "Maha", anime: "The World’s Finest Assassin Gets Reincarnated as an Aristocrat" },
        { name: "Cian Tuatha Dé", anime: "The World’s Finest Assassin Gets Reincarnated as an Aristocrat" },

        // Misfit
        { name: "Anos Voldigoad", anime: "The Misfit of Demon King Academy" },
        { name: "Misha Necron", anime: "The Misfit of Demon King Academy" },
        { name: "Sasha Necron", anime: "The Misfit of Demon King Academy" },
        { name: "Lay Glanzudlii", anime: "The Misfit of Demon King Academy" },
        { name: "Eleonore Bianca", anime: "The Misfit of Demon King Academy" },

        // Tower of God
        { name: "Bam (Twenty-Fifth Baam)", anime: "Tower of God" },
        { name: "Khun Aguero Agnis", anime: "Tower of God" },
        { name: "Rak Wraithraiser", anime: "Tower of God" },
        { name: "Endorsi Jahad", anime: "Tower of God" },
        { name: "Rachel", anime: "Tower of God" },

        // Yu-Gi-Oh! Original
        { name: "Yugi Muto", anime: "Yu-Gi-Oh! (Original)" },
        { name: "Seto Kaiba", anime: "Yu-Gi-Oh! (Original)" },
        { name: "Joey Wheeler", anime: "Yu-Gi-Oh! (Original)" },
        { name: "Mai Valentine", anime: "Yu-Gi-Oh! (Original)" },
        { name: "Maximillion Pegasus", anime: "Yu-Gi-Oh! (Original)" },

        // Cowboy Bebop
        { name: "Spike Spiegel", anime: "Cowboy Bebop" },
        { name: "Jet Black", anime: "Cowboy Bebop" },
        { name: "Faye Valentine", anime: "Cowboy Bebop" },
        { name: "Edward", anime: "Cowboy Bebop" },
        { name: "Vicious", anime: "Cowboy Bebop" },

        // Parasyte
        { name: "Shinichi Izumi", anime: "Parasyte: The Maxim" },
        { name: "Migi", anime: "Parasyte: The Maxim" },
        { name: "Kana Kimishima", anime: "Parasyte: The Maxim" },
        { name: "Gotou", anime: "Parasyte: The Maxim" },
        { name: "Reiko Tamura", anime: "Parasyte: The Maxim" },

        // Mashle
        { name: "Mash Burnedead", anime: "Mashle" },
        { name: "Finn Ames", anime: "Mashle" },
        { name: "Lance Crown", anime: "Mashle" },
        { name: "Dot Barrett", anime: "Mashle" },
        { name: "Abel Walker", anime: "Mashle" },

        // Magi
        { name: "Aladdin", anime: "Magi: The Labyrinth of Magic" },
        { name: "Alibaba Saluja", anime: "Magi: The Labyrinth of Magic" },
        { name: "Morgiana", anime: "Magi: The Labyrinth of Magic" },
        { name: "Sinbad", anime: "Magi: The Labyrinth of Magic" },
        { name: "Judar", anime: "Magi: The Labyrinth of Magic" },

        // Magi: Sinbad
        { name: "Sinbad", anime: "Magi: Adventure of Sinbad" },
        { name: "Jafar", anime: "Magi: Adventure of Sinbad" },
        { name: "Hinahoho", anime: "Magi: Adventure of Sinbad" },
        { name: "Drakon", anime: "Magi: Adventure of Sinbad" },
        { name: "Yunan", anime: "Magi: Adventure of Sinbad" },

        // Pokémon
        { name: "Ash Ketchum", anime: "Pokémon" },
        { name: "Brock", anime: "Pokémon" },
        { name: "Misty", anime: "Pokémon" },
        { name: "Team Rocket (Jessie & James)", anime: "Pokémon" },
        { name: "Nurse Joy", anime: "Pokémon" }
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
        prompt: { id: 1, prompt: "This character can survive the John Wick nightclub sequence and escape clean.",
          source: "John Wick — Red Circle Club",
          explanation: "A high-pressure action setpiece with stealth, gunfights, and quick decisions under chaos." },
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
        prompt: { id: 1, prompt: "This character can uncover Hawkins Lab’s secrets without getting caught.",
          source: "Stranger Things — Hawkins Lab Mystery",
          explanation: "Investigation + stealth + survival against a powerful organization monitoring the town." },
        character: { name: "Eleven", anime: "Stranger Things" }
      }
    },

    cartoons: {
      label: "Cartoons",
      modifiers: [],
      prompts: [],
      characters: [],
      templates: {
        modifier: "Example: No gadgets allowed.",
        prompt: { id: 1, prompt: "This character can solve a Gotham-level case before the villain strikes again.",
          source: "Batman: The Animated Series — Detective Work",
          explanation: "Requires deduction, interrogation, and piecing clues together under time pressure." },
        character: { name: "Batman", anime: "Batman: The Animated Series" }
      }
    },

    anime_cartoon_movies: {
      label: "Anime/Cartoon Movies",
      modifiers: [],
      prompts: [],
      characters: [],
      templates: {
        modifier: "Example: They start with zero equipment.",
        prompt: { id: 1, prompt: "This character can survive a movie-scale disaster and still protect their allies.",
          source: "Example Movie Pack — Disaster Scenario",
          explanation: "Movie pacing: escalating threats, limited time, and big stakes with little room for mistakes." },
        character: { name: "Example Character", anime: "Example Movie Title" }
      }
    }
  }
};
