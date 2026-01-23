// Trivia data packs
// Each question: { id, question, answer, source, type }
// Types help generate relevant wrong answers from the same category

// Available types:
// - "attack" (special moves, techniques)
// - "character" (names of people)
// - "location" (places, villages, worlds)
// - "event" (arcs, exams, battles)
// - "item" (objects, weapons, artifacts)
// - "organization" (groups, teams, clans)
// - "concept" (powers, abilities, systems)
// - "creature" (species, monsters, summons)

window.TRIVIA_PACKS = {
  anime: {
    title: "Anime Trivia",
    questions: [
      // Concepts / Power Systems
      { id: 1, question: "In Fullmetal Alchemist: Brotherhood, what is the 'law' that alchemy cannot break without consequences?", answer: "Equivalent Exchange", source: "Fullmetal Alchemist: Brotherhood", type: "concept" },
      { id: 7, question: "In Jujutsu Kaisen, what is the main energy source used by sorcerers to fight curses?", answer: "Cursed Energy", source: "Jujutsu Kaisen", type: "concept" },
      { id: 8, question: "In My Hero Academia, what is the term for superpowers people are born with?", answer: "Quirks", source: "My Hero Academia", type: "concept" },
      { id: 11, question: "In Hunter x Hunter, what is the name of the energy system that Hunters use?", answer: "Nen", source: "Hunter x Hunter", type: "concept" },
      { id: 12, question: "In Bleach, what is the name of a Soul Reaper's weapon?", answer: "Zanpakuto", source: "Bleach", type: "concept" },
      { id: 13, question: "In Naruto, what is the life energy that ninjas use to perform jutsu?", answer: "Chakra", source: "Naruto", type: "concept" },
      { id: 14, question: "In One Piece, what is the mysterious power that allows users to sense others' presence?", answer: "Haki", source: "One Piece", type: "concept" },
      { id: 15, question: "In Dragon Ball, what is the energy that fighters manipulate for attacks?", answer: "Ki", source: "Dragon Ball", type: "concept" },

      // Events / Arcs
      { id: 2, question: "In Hunter x Hunter, what is the name of the exam that determines if someone can become a Hunter?", answer: "Hunter Exam", source: "Hunter x Hunter", type: "event" },
      { id: 20, question: "In Naruto, what is the name of the exam where Genin compete to become Chunin?", answer: "Chunin Exams", source: "Naruto", type: "event" },
      { id: 21, question: "In Dragon Ball Z, what tournament does Cell host to test Earth's fighters?", answer: "Cell Games", source: "Dragon Ball Z", type: "event" },
      { id: 22, question: "In One Piece, what is the name of the war fought to rescue Ace?", answer: "Marineford War", source: "One Piece", type: "event" },
      { id: 23, question: "In Attack on Titan, what operation aims to reclaim Wall Maria?", answer: "Operation to Retake Wall Maria", source: "Attack on Titan", type: "event" },
      { id: 24, question: "In My Hero Academia, what is the name of the annual sports competition at U.A.?", answer: "U.A. Sports Festival", source: "My Hero Academia", type: "event" },
      { id: 25, question: "In Jujutsu Kaisen, what major incident occurs in Shibuya?", answer: "Shibuya Incident", source: "Jujutsu Kaisen", type: "event" },
      { id: 26, question: "In Bleach, what is the name of the arc where Soul Society is invaded?", answer: "Soul Society Arc", source: "Bleach", type: "event" },

      // Attacks / Techniques
      { id: 3, question: "In Dragon Ball Z, what attack famously relies on gathering energy from living beings?", answer: "Spirit Bomb", source: "Dragon Ball Z", type: "attack" },
      { id: 30, question: "In Naruto, what is the name of Naruto's signature spinning chakra ball attack?", answer: "Rasengan", source: "Naruto", type: "attack" },
      { id: 31, question: "In Bleach, what is the name of Ichigo's signature black energy attack?", answer: "Getsuga Tensho", source: "Bleach", type: "attack" },
      { id: 32, question: "In One Piece, what is Luffy's attack where he stretches his arm back and punches?", answer: "Gomu Gomu no Pistol", source: "One Piece", type: "attack" },
      { id: 33, question: "In Dragon Ball, what is Goku's iconic blue energy wave attack?", answer: "Kamehameha", source: "Dragon Ball", type: "attack" },
      { id: 34, question: "In Naruto, what is Sasuke's lightning-based assassination technique?", answer: "Chidori", source: "Naruto", type: "attack" },
      { id: 35, question: "In My Hero Academia, what is All Might's ultimate finishing move?", answer: "United States of Smash", source: "My Hero Academia", type: "attack" },
      { id: 36, question: "In Jujutsu Kaisen, what is Gojo's domain expansion technique?", answer: "Infinite Void", source: "Jujutsu Kaisen", type: "attack" },
      { id: 37, question: "In Hunter x Hunter, what is the name of Gon's rock-based Jajanken attack?", answer: "Rock (Jajanken)", source: "Hunter x Hunter", type: "attack" },
      { id: 38, question: "In Demon Slayer, what is the name of Tanjiro's primary breathing style?", answer: "Water Breathing", source: "Demon Slayer", type: "attack" },

      // Locations
      { id: 4, question: "In Naruto, what is the name of the village where Naruto and many main characters are from?", answer: "Konohagakure (Hidden Leaf Village)", source: "Naruto", type: "location" },
      { id: 10, question: "In Overlord, what is the name of the Great Tomb Ainz rules?", answer: "Nazarick", source: "Overlord", type: "location" },
      { id: 40, question: "In One Piece, what is the name of the final island on the Grand Line?", answer: "Laugh Tale", source: "One Piece", type: "location" },
      { id: 41, question: "In Attack on Titan, what is the name of the island where Eldians live?", answer: "Paradis Island", source: "Attack on Titan", type: "location" },
      { id: 42, question: "In Bleach, what is the afterlife realm where Soul Reapers live?", answer: "Soul Society", source: "Bleach", type: "location" },
      { id: 43, question: "In Dragon Ball, what planet do the Saiyans originally come from?", answer: "Planet Vegeta", source: "Dragon Ball Z", type: "location" },
      { id: 44, question: "In My Hero Academia, what is the name of the top hero school?", answer: "U.A. High School", source: "My Hero Academia", type: "location" },
      { id: 45, question: "In Hunter x Hunter, what is the unexplored dangerous land beyond the known world?", answer: "Dark Continent", source: "Hunter x Hunter", type: "location" },
      { id: 46, question: "In Demon Slayer, what mountain is the final selection held on?", answer: "Mount Fujikasane", source: "Demon Slayer", type: "location" },

      // Creatures / Species
      { id: 5, question: "In Attack on Titan, what are the giant humanoid creatures called?", answer: "Titans", source: "Attack on Titan", type: "creature" },
      { id: 50, question: "In Naruto, what are the nine powerful beasts sealed inside hosts called?", answer: "Tailed Beasts", source: "Naruto", type: "creature" },
      { id: 51, question: "In Jujutsu Kaisen, what are the malevolent spirits born from negative emotions?", answer: "Cursed Spirits", source: "Jujutsu Kaisen", type: "creature" },
      { id: 52, question: "In Bleach, what are the evil spirits that Soul Reapers hunt?", answer: "Hollows", source: "Bleach", type: "creature" },
      { id: 53, question: "In Dragon Ball, what is the warrior race that Goku belongs to?", answer: "Saiyans", source: "Dragon Ball Z", type: "creature" },
      { id: 54, question: "In One Piece, what are the massive sea creatures in the Calm Belt?", answer: "Sea Kings", source: "One Piece", type: "creature" },
      { id: 55, question: "In Hunter x Hunter, what are the powerful ant-like creatures in the Chimera Ant arc?", answer: "Chimera Ants", source: "Hunter x Hunter", type: "creature" },
      { id: 56, question: "In Demon Slayer, what type of supernatural creature is Muzan Kibutsuji?", answer: "Demon", source: "Demon Slayer", type: "creature" },

      // Characters
      { id: 6, question: "In Death Note, what is the name of the shinigami who drops the Death Note to the human world?", answer: "Ryuk", source: "Death Note", type: "character" },
      { id: 9, question: "In Yu Yu Hakusho, who is the main protagonist that becomes a Spirit Detective?", answer: "Yusuke Urameshi", source: "Yu Yu Hakusho", type: "character" },
      { id: 60, question: "In Naruto, who is the leader of the Akatsuki?", answer: "Pain (Nagato)", source: "Naruto", type: "character" },
      { id: 61, question: "In One Piece, who is the captain of the Straw Hat Pirates?", answer: "Monkey D. Luffy", source: "One Piece", type: "character" },
      { id: 62, question: "In Dragon Ball Z, who is the prince of all Saiyans?", answer: "Vegeta", source: "Dragon Ball Z", type: "character" },
      { id: 63, question: "In Bleach, who is the captain of Squad 6?", answer: "Byakuya Kuchiki", source: "Bleach", type: "character" },
      { id: 64, question: "In Attack on Titan, who is humanity's strongest soldier?", answer: "Levi Ackerman", source: "Attack on Titan", type: "character" },
      { id: 65, question: "In My Hero Academia, who is the Symbol of Peace?", answer: "All Might", source: "My Hero Academia", type: "character" },
      { id: 66, question: "In Jujutsu Kaisen, who is known as the strongest sorcerer?", answer: "Gojo Satoru", source: "Jujutsu Kaisen", type: "character" },
      { id: 67, question: "In Demon Slayer, who is the leader of the Demon Slayer Corps?", answer: "Kagaya Ubuyashiki", source: "Demon Slayer", type: "character" },

      // Organizations
      { id: 70, question: "In Naruto, what is the name of the criminal organization of S-rank rogue ninjas?", answer: "Akatsuki", source: "Naruto", type: "organization" },
      { id: 71, question: "In One Piece, what is the name of the world government's secret intelligence agency?", answer: "Cipher Pol", source: "One Piece", type: "organization" },
      { id: 72, question: "In Bleach, what is the military organization of Soul Reapers called?", answer: "Gotei 13", source: "Bleach", type: "organization" },
      { id: 73, question: "In Hunter x Hunter, what is the name of the notorious group of thieves led by Chrollo?", answer: "Phantom Troupe", source: "Hunter x Hunter", type: "organization" },
      { id: 74, question: "In My Hero Academia, what is the name of the main villain organization?", answer: "League of Villains", source: "My Hero Academia", type: "organization" },
      { id: 75, question: "In Demon Slayer, what are the twelve most powerful demons under Muzan called?", answer: "Twelve Kizuki", source: "Demon Slayer", type: "organization" },
      { id: 76, question: "In Attack on Titan, what military branch explores outside the walls?", answer: "Survey Corps", source: "Attack on Titan", type: "organization" },
      { id: 77, question: "In Jujutsu Kaisen, what school trains jujutsu sorcerers in Tokyo?", answer: "Tokyo Jujutsu High", source: "Jujutsu Kaisen", type: "organization" },

      // Items
      { id: 80, question: "In Death Note, what supernatural notebook allows the user to kill anyone whose name is written in it?", answer: "Death Note", source: "Death Note", type: "item" },
      { id: 81, question: "In One Piece, what mystical fruits grant supernatural powers to those who eat them?", answer: "Devil Fruits", source: "One Piece", type: "item" },
      { id: 82, question: "In Dragon Ball, what are the seven magical orbs that can summon a wish-granting dragon?", answer: "Dragon Balls", source: "Dragon Ball", type: "item" },
      { id: 83, question: "In Naruto, what is the forbidden scroll that Naruto steals in episode one?", answer: "Scroll of Seals", source: "Naruto", type: "item" },
      { id: 84, question: "In Fullmetal Alchemist, what legendary stone bypasses the law of equivalent exchange?", answer: "Philosopher's Stone", source: "Fullmetal Alchemist", type: "item" },
      { id: 85, question: "In Attack on Titan, what gear do soldiers use to fight Titans?", answer: "ODM Gear (Omni-Directional Mobility Gear)", source: "Attack on Titan", type: "item" },
      { id: 86, question: "In Bleach, what badge identifies a Substitute Soul Reaper?", answer: "Substitute Shinigami Badge", source: "Bleach", type: "item" },
      { id: 87, question: "In Hunter x Hunter, what card grants the holder special privileges worldwide?", answer: "Hunter License", source: "Hunter x Hunter", type: "item" },
    ],
    modifiers: [
      "Double points on correct answer (+2 instead of +1).",
      "Wrong answer penalty (-1 point on wrong answer).",
      "Only players tied for 1st can score this round.",
      "Add 2 additional answers (6 options total).",
      "Bet on who gets it right (cannot bet on yourself).",
      "Player(s) with the most points are skipped this round."
    ]
  },

  movies: { 
    title: "Movie Trivia (Template)", 
    questions: [
      { id: 1, question: "TEMPLATE: Example question?", answer: "Example answer", source: "Movie Pack", type: "concept" }
    ], 
    modifiers: [] 
  },
  cartoons: { 
    title: "Cartoon Trivia (Template)", 
    questions: [
      { id: 1, question: "TEMPLATE: Example question?", answer: "Example answer", source: "Cartoon Pack", type: "concept" }
    ], 
    modifiers: [] 
  },
  series: { 
    title: "TV / Series Trivia (Template)", 
    questions: [
      { id: 1, question: "TEMPLATE: Example question?", answer: "Example answer", source: "Series Pack", type: "concept" }
    ], 
    modifiers: [] 
  },
  anime_movies: { 
    title: "Anime / Cartoon Movies Trivia (Template)", 
    questions: [
      { id: 1, question: "TEMPLATE: Example question?", answer: "Example answer", source: "Anime/Cartoon Movies Pack", type: "concept" }
    ], 
    modifiers: [] 
  }
};
