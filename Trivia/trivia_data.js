// Trivia data packs - EXPANDED
// Each question: { id, question, answer, source, type }
// 3-5 questions per category per anime for harder wrong answer generation

window.TRIVIA_PACKS = {
  anime: {
    title: "Anime Trivia",
    questions: [
      // =========================================================
      // NARUTO - Characters
      // =========================================================
      { id: 100, question: "In Naruto, who is the leader of the Akatsuki?", answer: "Pain (Nagato)", source: "Naruto", type: "character" },
      { id: 101, question: "In Naruto, who is the Copy Ninja and Naruto's team leader?", answer: "Kakashi Hatake", source: "Naruto", type: "character" },
      { id: 102, question: "In Naruto, who is the legendary Sannin known for his perverted behavior?", answer: "Jiraiya", source: "Naruto", type: "character" },
      { id: 103, question: "In Naruto, who is the Fifth Hokage and one of the Sannin?", answer: "Tsunade", source: "Naruto", type: "character" },
      { id: 104, question: "In Naruto, who is the snake-obsessed Sannin who wants immortality?", answer: "Orochimaru", source: "Naruto", type: "character" },
      { id: 105, question: "In Naruto, who is the genius of the Hyuga clan and Hinata's cousin?", answer: "Neji Hyuga", source: "Naruto", type: "character" },
      { id: 106, question: "In Naruto, who is the taijutsu specialist known as the Green Beast?", answer: "Rock Lee", source: "Naruto", type: "character" },
      { id: 107, question: "In Naruto, who is the shadow-controlling ninja from the Nara clan?", answer: "Shikamaru Nara", source: "Naruto", type: "character" },
      { id: 108, question: "In Naruto, who is the weapons specialist on Team Guy?", answer: "Tenten", source: "Naruto", type: "character" },
      { id: 109, question: "In Naruto, who is the insect-using ninja from the Aburame clan?", answer: "Shino Aburame", source: "Naruto", type: "character" },

      // NARUTO - Attacks
      { id: 110, question: "In Naruto, what is Naruto's signature spinning chakra ball attack?", answer: "Rasengan", source: "Naruto", type: "attack" },
      { id: 111, question: "In Naruto, what is Sasuke's lightning-based assassination technique?", answer: "Chidori", source: "Naruto", type: "attack" },
      { id: 112, question: "In Naruto, what jutsu creates shadow copies of the user?", answer: "Shadow Clone Jutsu", source: "Naruto", type: "attack" },
      { id: 113, question: "In Naruto, what is Kakashi's technique that copies enemy jutsu?", answer: "Sharingan", source: "Naruto", type: "attack" },
      { id: 114, question: "In Naruto, what is the Hyuga clan's signature gentle fist technique?", answer: "Eight Trigrams Sixty-Four Palms", source: "Naruto", type: "attack" },
      { id: 115, question: "In Naruto, what is Rock Lee's forbidden technique that opens chakra gates?", answer: "Eight Gates", source: "Naruto", type: "attack" },

      // NARUTO - Events
      { id: 120, question: "In Naruto, what is the exam where Genin compete to become Chunin?", answer: "Chunin Exams", source: "Naruto", type: "event" },
      { id: 121, question: "In Naruto, what invasion occurs during the Chunin Exams finals?", answer: "Konoha Crush", source: "Naruto", type: "event" },
      { id: 122, question: "In Naruto, what mission involves retrieving Sasuke after he defects?", answer: "Sasuke Recovery Mission", source: "Naruto", type: "event" },
      { id: 123, question: "In Naruto Shippuden, what war involves all five great nations?", answer: "Fourth Great Ninja War", source: "Naruto", type: "event" },
      { id: 124, question: "In Naruto, what arc involves the battle against Haku and Zabuza?", answer: "Land of Waves Arc", source: "Naruto", type: "event" },

      // NARUTO - Locations
      { id: 130, question: "In Naruto, what is the village where Naruto lives?", answer: "Konohagakure (Hidden Leaf Village)", source: "Naruto", type: "location" },
      { id: 131, question: "In Naruto, what is the village hidden in the sand?", answer: "Sunagakure", source: "Naruto", type: "location" },
      { id: 132, question: "In Naruto, what is the village hidden in the mist?", answer: "Kirigakure", source: "Naruto", type: "location" },
      { id: 133, question: "In Naruto, what is the village hidden in the clouds?", answer: "Kumogakure", source: "Naruto", type: "location" },
      { id: 134, question: "In Naruto, what is the village hidden in the rocks?", answer: "Iwagakure", source: "Naruto", type: "location" },

      // NARUTO - Organizations
      { id: 140, question: "In Naruto, what is the criminal organization of S-rank rogue ninjas?", answer: "Akatsuki", source: "Naruto", type: "organization" },
      { id: 141, question: "In Naruto, what is the ANBU subdivision that Danzo leads?", answer: "Root", source: "Naruto", type: "organization" },
      { id: 142, question: "In Naruto, what are the elite masked ninja called?", answer: "ANBU", source: "Naruto", type: "organization" },
      { id: 143, question: "In Naruto, what is Team 7's original name under Kakashi?", answer: "Team Kakashi", source: "Naruto", type: "organization" },

      // NARUTO - Concepts
      { id: 150, question: "In Naruto, what is the life energy that ninjas use to perform jutsu?", answer: "Chakra", source: "Naruto", type: "concept" },
      { id: 151, question: "In Naruto, what are the nine powerful beasts sealed inside hosts called?", answer: "Tailed Beasts", source: "Naruto", type: "creature" },
      { id: 152, question: "In Naruto, what eye technique does the Uchiha clan possess?", answer: "Sharingan", source: "Naruto", type: "concept" },
      { id: 153, question: "In Naruto, what eye technique does the Hyuga clan possess?", answer: "Byakugan", source: "Naruto", type: "concept" },

      // NARUTO - Items
      { id: 160, question: "In Naruto, what is the forbidden scroll that Naruto steals in episode one?", answer: "Scroll of Seals", source: "Naruto", type: "item" },
      { id: 161, question: "In Naruto, what headband do ninja wear to show village allegiance?", answer: "Forehead Protector", source: "Naruto", type: "item" },
      { id: 162, question: "In Naruto, what weapon does Asuma use that channels chakra?", answer: "Chakra Blades", source: "Naruto", type: "item" },

      // =========================================================
      // ONE PIECE - Characters
      // =========================================================
      { id: 200, question: "In One Piece, who is the captain of the Straw Hat Pirates?", answer: "Monkey D. Luffy", source: "One Piece", type: "character" },
      { id: 201, question: "In One Piece, who is the swordsman of the Straw Hat crew?", answer: "Roronoa Zoro", source: "One Piece", type: "character" },
      { id: 202, question: "In One Piece, who is the navigator of the Straw Hat crew?", answer: "Nami", source: "One Piece", type: "character" },
      { id: 203, question: "In One Piece, who is the cook of the Straw Hat crew?", answer: "Sanji", source: "One Piece", type: "character" },
      { id: 204, question: "In One Piece, who is the sniper of the Straw Hat crew?", answer: "Usopp", source: "One Piece", type: "character" },
      { id: 205, question: "In One Piece, who is the doctor of the Straw Hat crew?", answer: "Tony Tony Chopper", source: "One Piece", type: "character" },
      { id: 206, question: "In One Piece, who is the archaeologist of the Straw Hat crew?", answer: "Nico Robin", source: "One Piece", type: "character" },
      { id: 207, question: "In One Piece, who is the shipwright of the Straw Hat crew?", answer: "Franky", source: "One Piece", type: "character" },
      { id: 208, question: "In One Piece, who is the musician of the Straw Hat crew?", answer: "Brook", source: "One Piece", type: "character" },
      { id: 209, question: "In One Piece, who is the helmsman of the Straw Hat crew?", answer: "Jinbe", source: "One Piece", type: "character" },

      // ONE PIECE - Attacks
      { id: 210, question: "In One Piece, what is Luffy's attack where he stretches his arm and punches?", answer: "Gomu Gomu no Pistol", source: "One Piece", type: "attack" },
      { id: 211, question: "In One Piece, what is Zoro's three-sword style ultimate technique?", answer: "Santoryu", source: "One Piece", type: "attack" },
      { id: 212, question: "In One Piece, what is Sanji's fire-based kicking technique?", answer: "Diable Jambe", source: "One Piece", type: "attack" },
      { id: 213, question: "In One Piece, what is Luffy's Gear Fourth form focused on power?", answer: "Boundman", source: "One Piece", type: "attack" },
      { id: 214, question: "In One Piece, what is Luffy's awakened Devil Fruit form?", answer: "Gear Fifth", source: "One Piece", type: "attack" },

      // ONE PIECE - Events
      { id: 220, question: "In One Piece, what is the war fought to rescue Ace?", answer: "Marineford War", source: "One Piece", type: "event" },
      { id: 221, question: "In One Piece, what arc involves the Straw Hats on a sky island?", answer: "Skypiea Arc", source: "One Piece", type: "event" },
      { id: 222, question: "In One Piece, what arc involves fighting Doflamingo in Dressrosa?", answer: "Dressrosa Arc", source: "One Piece", type: "event" },
      { id: 223, question: "In One Piece, what arc involves the raid on Kaido's fortress?", answer: "Wano Country Arc", source: "One Piece", type: "event" },
      { id: 224, question: "In One Piece, what arc involves escaping Big Mom's territory?", answer: "Whole Cake Island Arc", source: "One Piece", type: "event" },

      // ONE PIECE - Locations
      { id: 230, question: "In One Piece, what is the final island on the Grand Line?", answer: "Laugh Tale", source: "One Piece", type: "location" },
      { id: 231, question: "In One Piece, what is the underwater island of the Fish-Men?", answer: "Fish-Man Island", source: "One Piece", type: "location" },
      { id: 232, question: "In One Piece, what is the Marine headquarters island?", answer: "Marineford", source: "One Piece", type: "location" },
      { id: 233, question: "In One Piece, what is the prison that Luffy breaks into?", answer: "Impel Down", source: "One Piece", type: "location" },
      { id: 234, question: "In One Piece, what is the isolated country ruled by Kaido?", answer: "Wano Country", source: "One Piece", type: "location" },

      // ONE PIECE - Organizations
      { id: 240, question: "In One Piece, what is the world government's secret intelligence agency?", answer: "Cipher Pol", source: "One Piece", type: "organization" },
      { id: 241, question: "In One Piece, what is the group of the most powerful pirates?", answer: "Four Emperors (Yonko)", source: "One Piece", type: "organization" },
      { id: 242, question: "In One Piece, what is the elite assassin agency CP9?", answer: "Cipher Pol No. 9", source: "One Piece", type: "organization" },
      { id: 243, question: "In One Piece, what are the seven powerful pirates allied with the World Government?", answer: "Seven Warlords of the Sea", source: "One Piece", type: "organization" },

      // ONE PIECE - Concepts
      { id: 250, question: "In One Piece, what power allows users to sense others' presence?", answer: "Haki", source: "One Piece", type: "concept" },
      { id: 251, question: "In One Piece, what type of Haki lets you sense emotions?", answer: "Observation Haki", source: "One Piece", type: "concept" },
      { id: 252, question: "In One Piece, what type of Haki creates invisible armor?", answer: "Armament Haki", source: "One Piece", type: "concept" },
      { id: 253, question: "In One Piece, what type of Haki can knock out weak-willed people?", answer: "Conqueror's Haki", source: "One Piece", type: "concept" },

      // ONE PIECE - Items
      { id: 260, question: "In One Piece, what mystical fruits grant supernatural powers?", answer: "Devil Fruits", source: "One Piece", type: "item" },
      { id: 261, question: "In One Piece, what is the treasure that Roger left behind?", answer: "One Piece", source: "One Piece", type: "item" },
      { id: 262, question: "In One Piece, what are the indestructible stone blocks with ancient writing?", answer: "Poneglyphs", source: "One Piece", type: "item" },
      { id: 263, question: "In One Piece, what is Zoro's cursed black sword?", answer: "Shusui", source: "One Piece", type: "item" },

      // ONE PIECE - Creatures
      { id: 270, question: "In One Piece, what are the massive sea creatures in the Calm Belt?", answer: "Sea Kings", source: "One Piece", type: "creature" },

      // =========================================================
      // DRAGON BALL - Characters
      // =========================================================
      { id: 300, question: "In Dragon Ball Z, who is the prince of all Saiyans?", answer: "Vegeta", source: "Dragon Ball Z", type: "character" },
      { id: 301, question: "In Dragon Ball, who is the main protagonist raised on Earth?", answer: "Goku", source: "Dragon Ball", type: "character" },
      { id: 302, question: "In Dragon Ball Z, who is Goku's oldest son?", answer: "Gohan", source: "Dragon Ball Z", type: "character" },
      { id: 303, question: "In Dragon Ball Z, who is the Namekian who merges with Kami?", answer: "Piccolo", source: "Dragon Ball Z", type: "character" },
      { id: 304, question: "In Dragon Ball Z, who is Goku's best friend since childhood?", answer: "Krillin", source: "Dragon Ball Z", type: "character" },
      { id: 305, question: "In Dragon Ball Z, who is the tyrant who destroyed Planet Vegeta?", answer: "Frieza", source: "Dragon Ball Z", type: "character" },
      { id: 306, question: "In Dragon Ball Z, who is the bio-android created by Dr. Gero?", answer: "Cell", source: "Dragon Ball Z", type: "character" },
      { id: 307, question: "In Dragon Ball Z, who is the pink demon created from pure evil?", answer: "Majin Buu", source: "Dragon Ball Z", type: "character" },
      { id: 308, question: "In Dragon Ball Super, who is the God of Destruction?", answer: "Beerus", source: "Dragon Ball Super", type: "character" },
      { id: 309, question: "In Dragon Ball Super, who is Beerus's attendant and teacher?", answer: "Whis", source: "Dragon Ball Super", type: "character" },

      // DRAGON BALL - Attacks
      { id: 310, question: "In Dragon Ball, what is Goku's iconic blue energy wave attack?", answer: "Kamehameha", source: "Dragon Ball", type: "attack" },
      { id: 311, question: "In Dragon Ball Z, what attack gathers energy from living beings?", answer: "Spirit Bomb", source: "Dragon Ball Z", type: "attack" },
      { id: 312, question: "In Dragon Ball Z, what is Vegeta's signature energy blast?", answer: "Final Flash", source: "Dragon Ball Z", type: "attack" },
      { id: 313, question: "In Dragon Ball Z, what is Piccolo's beam attack from his fingers?", answer: "Special Beam Cannon", source: "Dragon Ball Z", type: "attack" },
      { id: 314, question: "In Dragon Ball Z, what technique lets two people fuse into one?", answer: "Fusion Dance", source: "Dragon Ball Z", type: "attack" },
      { id: 315, question: "In Dragon Ball Super, what is Goku's silver-haired transformation?", answer: "Ultra Instinct", source: "Dragon Ball Super", type: "attack" },

      // DRAGON BALL - Events
      { id: 320, question: "In Dragon Ball Z, what tournament does Cell host?", answer: "Cell Games", source: "Dragon Ball Z", type: "event" },
      { id: 321, question: "In Dragon Ball Z, what saga involves fighting Frieza on Namek?", answer: "Frieza Saga", source: "Dragon Ball Z", type: "event" },
      { id: 322, question: "In Dragon Ball Z, what saga involves androids attacking?", answer: "Android Saga", source: "Dragon Ball Z", type: "event" },
      { id: 323, question: "In Dragon Ball Super, what is the multi-universe battle royale?", answer: "Tournament of Power", source: "Dragon Ball Super", type: "event" },
      { id: 324, question: "In Dragon Ball, what is the martial arts tournament held every few years?", answer: "World Martial Arts Tournament", source: "Dragon Ball", type: "event" },

      // DRAGON BALL - Locations
      { id: 330, question: "In Dragon Ball, what planet do the Saiyans come from?", answer: "Planet Vegeta", source: "Dragon Ball Z", type: "location" },
      { id: 331, question: "In Dragon Ball Z, what planet do the Namekians live on?", answer: "Planet Namek", source: "Dragon Ball Z", type: "location" },
      { id: 332, question: "In Dragon Ball Z, where does King Kai live?", answer: "King Kai's Planet", source: "Dragon Ball Z", type: "location" },
      { id: 333, question: "In Dragon Ball, what tower does Korin live atop?", answer: "Korin Tower", source: "Dragon Ball", type: "location" },
      { id: 334, question: "In Dragon Ball, what is the floating palace above Korin Tower?", answer: "Kami's Lookout", source: "Dragon Ball", type: "location" },

      // DRAGON BALL - Concepts
      { id: 340, question: "In Dragon Ball, what is the energy that fighters manipulate?", answer: "Ki", source: "Dragon Ball", type: "concept" },
      { id: 341, question: "In Dragon Ball Z, what is the warrior race that Goku belongs to?", answer: "Saiyans", source: "Dragon Ball Z", type: "creature" },
      { id: 342, question: "In Dragon Ball Z, what transformation multiplies Saiyan power?", answer: "Super Saiyan", source: "Dragon Ball Z", type: "concept" },

      // DRAGON BALL - Items
      { id: 350, question: "In Dragon Ball, what are the seven magical orbs?", answer: "Dragon Balls", source: "Dragon Ball", type: "item" },
      { id: 351, question: "In Dragon Ball Z, what device measures power levels?", answer: "Scouter", source: "Dragon Ball Z", type: "item" },
      { id: 352, question: "In Dragon Ball Z, what earrings allow permanent fusion?", answer: "Potara Earrings", source: "Dragon Ball Z", type: "item" },
      { id: 353, question: "In Dragon Ball, what beans instantly heal injuries?", answer: "Senzu Beans", source: "Dragon Ball", type: "item" },

      // =========================================================
      // BLEACH - Characters
      // =========================================================
      { id: 400, question: "In Bleach, who is the main protagonist who becomes a Soul Reaper?", answer: "Ichigo Kurosaki", source: "Bleach", type: "character" },
      { id: 401, question: "In Bleach, who is the captain of Squad 6?", answer: "Byakuya Kuchiki", source: "Bleach", type: "character" },
      { id: 402, question: "In Bleach, who is the captain of Squad 10 with ice powers?", answer: "Toshiro Hitsugaya", source: "Bleach", type: "character" },
      { id: 403, question: "In Bleach, who is the captain of Squad 11 obsessed with fighting?", answer: "Kenpachi Zaraki", source: "Bleach", type: "character" },
      { id: 404, question: "In Bleach, who is the female Soul Reaper who gives Ichigo her powers?", answer: "Rukia Kuchiki", source: "Bleach", type: "character" },
      { id: 405, question: "In Bleach, who is the main antagonist and former captain of Squad 5?", answer: "Sosuke Aizen", source: "Bleach", type: "character" },
      { id: 406, question: "In Bleach, who is Ichigo's Quincy friend with a bow?", answer: "Uryu Ishida", source: "Bleach", type: "character" },
      { id: 407, question: "In Bleach, who is Ichigo's large friend with superhuman strength?", answer: "Yasutora Sado (Chad)", source: "Bleach", type: "character" },
      { id: 408, question: "In Bleach, who is the orange-haired girl with healing powers?", answer: "Orihime Inoue", source: "Bleach", type: "character" },
      { id: 409, question: "In Bleach, who is the shopkeeper and former captain?", answer: "Kisuke Urahara", source: "Bleach", type: "character" },

      // BLEACH - Attacks
      { id: 410, question: "In Bleach, what is Ichigo's signature black energy attack?", answer: "Getsuga Tensho", source: "Bleach", type: "attack" },
      { id: 411, question: "In Bleach, what is Byakuya's technique that releases a thousand blades?", answer: "Senbonzakura", source: "Bleach", type: "attack" },
      { id: 412, question: "In Bleach, what is Hitsugaya's ice dragon technique?", answer: "Hyorinmaru", source: "Bleach", type: "attack" },
      { id: 413, question: "In Bleach, what is the Soul Reaper flash-step technique?", answer: "Shunpo", source: "Bleach", type: "attack" },
      { id: 414, question: "In Bleach, what is a Zanpakuto's second release form?", answer: "Bankai", source: "Bleach", type: "attack" },

      // BLEACH - Events
      { id: 420, question: "In Bleach, what arc involves Soul Society being invaded?", answer: "Soul Society Arc", source: "Bleach", type: "event" },
      { id: 421, question: "In Bleach, what arc involves the Arrancar and Hueco Mundo?", answer: "Arrancar Arc", source: "Bleach", type: "event" },
      { id: 422, question: "In Bleach, what war involves the Quincy attacking Soul Society?", answer: "Thousand-Year Blood War", source: "Bleach", type: "event" },
      { id: 423, question: "In Bleach, what arc involves Aizen's betrayal?", answer: "Fake Karakura Town Arc", source: "Bleach", type: "event" },

      // BLEACH - Locations
      { id: 430, question: "In Bleach, what is the afterlife realm where Soul Reapers live?", answer: "Soul Society", source: "Bleach", type: "location" },
      { id: 431, question: "In Bleach, what is the realm where Hollows reside?", answer: "Hueco Mundo", source: "Bleach", type: "location" },
      { id: 432, question: "In Bleach, what is the human town where Ichigo lives?", answer: "Karakura Town", source: "Bleach", type: "location" },
      { id: 433, question: "In Bleach, what is the prison in the Soul Society?", answer: "Muken", source: "Bleach", type: "location" },

      // BLEACH - Organizations
      { id: 440, question: "In Bleach, what is the military organization of Soul Reapers?", answer: "Gotei 13", source: "Bleach", type: "organization" },
      { id: 441, question: "In Bleach, what is Aizen's group of powerful Hollows?", answer: "Espada", source: "Bleach", type: "organization" },
      { id: 442, question: "In Bleach, what is the Quincy army led by Yhwach?", answer: "Wandenreich", source: "Bleach", type: "organization" },

      // BLEACH - Concepts
      { id: 450, question: "In Bleach, what is the name of a Soul Reaper's weapon?", answer: "Zanpakuto", source: "Bleach", type: "concept" },
      { id: 451, question: "In Bleach, what are the evil spirits that Soul Reapers hunt?", answer: "Hollows", source: "Bleach", type: "creature" },
      { id: 452, question: "In Bleach, what is the spiritual pressure that powerful beings emit?", answer: "Reiatsu", source: "Bleach", type: "concept" },

      // BLEACH - Items
      { id: 460, question: "In Bleach, what badge identifies a Substitute Soul Reaper?", answer: "Substitute Shinigami Badge", source: "Bleach", type: "item" },
      { id: 461, question: "In Bleach, what item allows a Soul Reaper to enter a human body?", answer: "Gigai", source: "Bleach", type: "item" },

      // =========================================================
      // ATTACK ON TITAN - Characters
      // =========================================================
      { id: 500, question: "In Attack on Titan, who is humanity's strongest soldier?", answer: "Levi Ackerman", source: "Attack on Titan", type: "character" },
      { id: 501, question: "In Attack on Titan, who is the main protagonist with Titan powers?", answer: "Eren Yeager", source: "Attack on Titan", type: "character" },
      { id: 502, question: "In Attack on Titan, who is Eren's adoptive sister?", answer: "Mikasa Ackerman", source: "Attack on Titan", type: "character" },
      { id: 503, question: "In Attack on Titan, who is Eren's intelligent best friend?", answer: "Armin Arlert", source: "Attack on Titan", type: "character" },
      { id: 504, question: "In Attack on Titan, who is the commander who gave the famous charge speech?", answer: "Erwin Smith", source: "Attack on Titan", type: "character" },
      { id: 505, question: "In Attack on Titan, who is the Female Titan's human form?", answer: "Annie Leonhart", source: "Attack on Titan", type: "character" },
      { id: 506, question: "In Attack on Titan, who is the Colossal Titan's human form?", answer: "Bertholdt Hoover", source: "Attack on Titan", type: "character" },
      { id: 507, question: "In Attack on Titan, who is the Armored Titan's human form?", answer: "Reiner Braun", source: "Attack on Titan", type: "character" },
      { id: 508, question: "In Attack on Titan, who is the Beast Titan?", answer: "Zeke Yeager", source: "Attack on Titan", type: "character" },

      // ATTACK ON TITAN - Events
      { id: 520, question: "In Attack on Titan, what operation aims to reclaim Wall Maria?", answer: "Operation to Retake Wall Maria", source: "Attack on Titan", type: "event" },
      { id: 521, question: "In Attack on Titan, what is the mission to capture the Female Titan?", answer: "57th Expedition", source: "Attack on Titan", type: "event" },
      { id: 522, question: "In Attack on Titan, what is Eren's plan to destroy the world?", answer: "The Rumbling", source: "Attack on Titan", type: "event" },
      { id: 523, question: "In Attack on Titan, what attack destroys Shiganshina's gate?", answer: "Fall of Wall Maria", source: "Attack on Titan", type: "event" },

      // ATTACK ON TITAN - Locations
      { id: 530, question: "In Attack on Titan, what is the island where Eldians live?", answer: "Paradis Island", source: "Attack on Titan", type: "location" },
      { id: 531, question: "In Attack on Titan, what is the nation across the sea?", answer: "Marley", source: "Attack on Titan", type: "location" },
      { id: 532, question: "In Attack on Titan, what is Eren's hometown?", answer: "Shiganshina District", source: "Attack on Titan", type: "location" },
      { id: 533, question: "In Attack on Titan, what is the underground city beneath the capital?", answer: "The Underground", source: "Attack on Titan", type: "location" },

      // ATTACK ON TITAN - Organizations
      { id: 540, question: "In Attack on Titan, what military branch explores outside the walls?", answer: "Survey Corps", source: "Attack on Titan", type: "organization" },
      { id: 541, question: "In Attack on Titan, what branch guards the walls?", answer: "Garrison Regiment", source: "Attack on Titan", type: "organization" },
      { id: 542, question: "In Attack on Titan, what is the elite branch protecting the king?", answer: "Military Police Brigade", source: "Attack on Titan", type: "organization" },
      { id: 543, question: "In Attack on Titan, what is the group of Marleyan Titan warriors?", answer: "Warriors", source: "Attack on Titan", type: "organization" },

      // ATTACK ON TITAN - Concepts
      { id: 550, question: "In Attack on Titan, what are the giant humanoid creatures called?", answer: "Titans", source: "Attack on Titan", type: "creature" },
      { id: 551, question: "In Attack on Titan, what are the nine special Titans called?", answer: "Nine Titans", source: "Attack on Titan", type: "concept" },

      // ATTACK ON TITAN - Items
      { id: 560, question: "In Attack on Titan, what gear do soldiers use to fight Titans?", answer: "ODM Gear (Omni-Directional Mobility Gear)", source: "Attack on Titan", type: "item" },
      { id: 561, question: "In Attack on Titan, what special blades can cut Titan flesh?", answer: "Ultrahard Steel Blades", source: "Attack on Titan", type: "item" },
      { id: 562, question: "In Attack on Titan, what injection transforms someone into a Titan?", answer: "Titan Serum", source: "Attack on Titan", type: "item" },

      // =========================================================
      // MY HERO ACADEMIA - Characters
      // =========================================================
      { id: 600, question: "In My Hero Academia, who is the Symbol of Peace?", answer: "All Might", source: "My Hero Academia", type: "character" },
      { id: 601, question: "In My Hero Academia, who is the main protagonist born Quirkless?", answer: "Izuku Midoriya (Deku)", source: "My Hero Academia", type: "character" },
      { id: 602, question: "In My Hero Academia, who is Deku's explosive rival?", answer: "Katsuki Bakugo", source: "My Hero Academia", type: "character" },
      { id: 603, question: "In My Hero Academia, who is the half-hot half-cold student?", answer: "Shoto Todoroki", source: "My Hero Academia", type: "character" },
      { id: 604, question: "In My Hero Academia, who is the gravity-controlling girl?", answer: "Ochaco Uraraka", source: "My Hero Academia", type: "character" },
      { id: 605, question: "In My Hero Academia, who is the main villain with decay powers?", answer: "Tomura Shigaraki", source: "My Hero Academia", type: "character" },
      { id: 606, question: "In My Hero Academia, who is the mysterious villain controlling Shigaraki?", answer: "All For One", source: "My Hero Academia", type: "character" },
      { id: 607, question: "In My Hero Academia, who is the pro hero with an erasing Quirk?", answer: "Shota Aizawa (Eraserhead)", source: "My Hero Academia", type: "character" },
      { id: 608, question: "In My Hero Academia, who is the #1 hero after All Might?", answer: "Endeavor", source: "My Hero Academia", type: "character" },

      // MY HERO ACADEMIA - Attacks
      { id: 610, question: "In My Hero Academia, what is All Might's ultimate finishing move?", answer: "United States of Smash", source: "My Hero Academia", type: "attack" },
      { id: 611, question: "In My Hero Academia, what is Deku's signature punch technique?", answer: "Detroit Smash", source: "My Hero Academia", type: "attack" },
      { id: 612, question: "In My Hero Academia, what is Bakugo's explosive attack?", answer: "Howitzer Impact", source: "My Hero Academia", type: "attack" },
      { id: 613, question: "In My Hero Academia, what is Todoroki's ice wall technique?", answer: "Heaven-Piercing Ice Wall", source: "My Hero Academia", type: "attack" },

      // MY HERO ACADEMIA - Events
      { id: 620, question: "In My Hero Academia, what is the annual sports competition at U.A.?", answer: "U.A. Sports Festival", source: "My Hero Academia", type: "event" },
      { id: 621, question: "In My Hero Academia, what attack devastates Kamino Ward?", answer: "Kamino Incident", source: "My Hero Academia", type: "event" },
      { id: 622, question: "In My Hero Academia, what battle involves Shigaraki's awakening?", answer: "Paranormal Liberation War", source: "My Hero Academia", type: "event" },
      { id: 623, question: "In My Hero Academia, what training camp gets attacked by villains?", answer: "Forest Training Camp Arc", source: "My Hero Academia", type: "event" },

      // MY HERO ACADEMIA - Locations
      { id: 630, question: "In My Hero Academia, what is the top hero school?", answer: "U.A. High School", source: "My Hero Academia", type: "location" },
      { id: 631, question: "In My Hero Academia, what is the villain hideout bar?", answer: "League of Villains Hideout", source: "My Hero Academia", type: "location" },
      { id: 632, question: "In My Hero Academia, what is the training facility with different zones?", answer: "Unforeseen Simulation Joint (USJ)", source: "My Hero Academia", type: "location" },

      // MY HERO ACADEMIA - Organizations
      { id: 640, question: "In My Hero Academia, what is the main villain organization?", answer: "League of Villains", source: "My Hero Academia", type: "organization" },
      { id: 641, question: "In My Hero Academia, what is the hero course class?", answer: "Class 1-A", source: "My Hero Academia", type: "organization" },
      { id: 642, question: "In My Hero Academia, what merged villain group does Shigaraki lead?", answer: "Paranormal Liberation Front", source: "My Hero Academia", type: "organization" },

      // MY HERO ACADEMIA - Concepts
      { id: 650, question: "In My Hero Academia, what is the term for superpowers?", answer: "Quirks", source: "My Hero Academia", type: "concept" },
      { id: 651, question: "In My Hero Academia, what is All Might's transferable power?", answer: "One For All", source: "My Hero Academia", type: "concept" },
      { id: 652, question: "In My Hero Academia, what is All For One's ability to steal powers?", answer: "All For One", source: "My Hero Academia", type: "concept" },

      // =========================================================
      // JUJUTSU KAISEN - Characters
      // =========================================================
      { id: 700, question: "In Jujutsu Kaisen, who is the strongest sorcerer?", answer: "Gojo Satoru", source: "Jujutsu Kaisen", type: "character" },
      { id: 701, question: "In Jujutsu Kaisen, who is the main protagonist who ate Sukuna's finger?", answer: "Yuji Itadori", source: "Jujutsu Kaisen", type: "character" },
      { id: 702, question: "In Jujutsu Kaisen, who is the cursed speech user from the Inumaki clan?", answer: "Toge Inumaki", source: "Jujutsu Kaisen", type: "character" },
      { id: 703, question: "In Jujutsu Kaisen, who is the panda that's actually a cursed corpse?", answer: "Panda", source: "Jujutsu Kaisen", type: "character" },
      { id: 704, question: "In Jujutsu Kaisen, who is the female sorcerer who uses cursed tools?", answer: "Maki Zenin", source: "Jujutsu Kaisen", type: "character" },
      { id: 705, question: "In Jujutsu Kaisen, who is the King of Curses?", answer: "Ryomen Sukuna", source: "Jujutsu Kaisen", type: "character" },
      { id: 706, question: "In Jujutsu Kaisen, who is the curse user with patchwork skin?", answer: "Suguru Geto", source: "Jujutsu Kaisen", type: "character" },
      { id: 707, question: "In Jujutsu Kaisen, who is the shadow technique user and Yuji's friend?", answer: "Megumi Fushiguro", source: "Jujutsu Kaisen", type: "character" },
      { id: 708, question: "In Jujutsu Kaisen, who is the female first-year from Kyoto?", answer: "Nobara Kugisaki", source: "Jujutsu Kaisen", type: "character" },

      // JUJUTSU KAISEN - Attacks
      { id: 710, question: "In Jujutsu Kaisen, what is Gojo's domain expansion?", answer: "Infinite Void", source: "Jujutsu Kaisen", type: "attack" },
      { id: 711, question: "In Jujutsu Kaisen, what is Sukuna's fire-based attack?", answer: "Malevolent Shrine", source: "Jujutsu Kaisen", type: "attack" },
      { id: 712, question: "In Jujutsu Kaisen, what is Megumi's shikigami summoning technique?", answer: "Ten Shadows Technique", source: "Jujutsu Kaisen", type: "attack" },
      { id: 713, question: "In Jujutsu Kaisen, what is Gojo's purple destruction technique?", answer: "Hollow Purple", source: "Jujutsu Kaisen", type: "attack" },
      { id: 714, question: "In Jujutsu Kaisen, what is the technique that creates a separate space?", answer: "Domain Expansion", source: "Jujutsu Kaisen", type: "attack" },

      // JUJUTSU KAISEN - Events
      { id: 720, question: "In Jujutsu Kaisen, what major incident occurs in Shibuya?", answer: "Shibuya Incident", source: "Jujutsu Kaisen", type: "event" },
      { id: 721, question: "In Jujutsu Kaisen, what event involves the students' competition?", answer: "Kyoto Goodwill Event", source: "Jujutsu Kaisen", type: "event" },
      { id: 722, question: "In Jujutsu Kaisen, what arc involves Yuji's execution?", answer: "Cursed Womb Arc", source: "Jujutsu Kaisen", type: "event" },
      { id: 723, question: "In Jujutsu Kaisen, what game does Kenjaku initiate?", answer: "Culling Game", source: "Jujutsu Kaisen", type: "event" },

      // JUJUTSU KAISEN - Locations
      { id: 730, question: "In Jujutsu Kaisen, what school trains sorcerers in Tokyo?", answer: "Tokyo Jujutsu High", source: "Jujutsu Kaisen", type: "location" },
      { id: 731, question: "In Jujutsu Kaisen, what is the rival school in Kyoto?", answer: "Kyoto Jujutsu High", source: "Jujutsu Kaisen", type: "location" },

      // JUJUTSU KAISEN - Concepts
      { id: 740, question: "In Jujutsu Kaisen, what energy do sorcerers use?", answer: "Cursed Energy", source: "Jujutsu Kaisen", type: "concept" },
      { id: 741, question: "In Jujutsu Kaisen, what are the malevolent spirits called?", answer: "Cursed Spirits", source: "Jujutsu Kaisen", type: "creature" },
      { id: 742, question: "In Jujutsu Kaisen, what binding restricts a sorcerer for more power?", answer: "Binding Vow", source: "Jujutsu Kaisen", type: "concept" },
      { id: 743, question: "In Jujutsu Kaisen, what grade are the most dangerous curses?", answer: "Special Grade", source: "Jujutsu Kaisen", type: "concept" },

      // =========================================================
      // DEMON SLAYER - Characters
      // =========================================================
      { id: 800, question: "In Demon Slayer, who is the main protagonist with a scar?", answer: "Tanjiro Kamado", source: "Demon Slayer", type: "character" },
      { id: 801, question: "In Demon Slayer, who is Tanjiro's demon sister?", answer: "Nezuko Kamado", source: "Demon Slayer", type: "character" },
      { id: 802, question: "In Demon Slayer, who is the cowardly boy with yellow hair?", answer: "Zenitsu Agatsuma", source: "Demon Slayer", type: "character" },
      { id: 803, question: "In Demon Slayer, who is the boar-headed fighter?", answer: "Inosuke Hashibira", source: "Demon Slayer", type: "character" },
      { id: 804, question: "In Demon Slayer, who is the leader of the Demon Slayer Corps?", answer: "Kagaya Ubuyashiki", source: "Demon Slayer", type: "character" },
      { id: 805, question: "In Demon Slayer, who is the first demon and main antagonist?", answer: "Muzan Kibutsuji", source: "Demon Slayer", type: "character" },
      { id: 806, question: "In Demon Slayer, who is the Flame Hashira?", answer: "Kyojuro Rengoku", source: "Demon Slayer", type: "character" },
      { id: 807, question: "In Demon Slayer, who is the Water Hashira?", answer: "Giyu Tomioka", source: "Demon Slayer", type: "character" },
      { id: 808, question: "In Demon Slayer, who is the Insect Hashira?", answer: "Shinobu Kocho", source: "Demon Slayer", type: "character" },

      // DEMON SLAYER - Attacks
      { id: 810, question: "In Demon Slayer, what is Tanjiro's primary breathing style?", answer: "Water Breathing", source: "Demon Slayer", type: "attack" },
      { id: 811, question: "In Demon Slayer, what is Zenitsu's lightning technique?", answer: "Thunder Breathing", source: "Demon Slayer", type: "attack" },
      { id: 812, question: "In Demon Slayer, what is Inosuke's self-taught breathing style?", answer: "Beast Breathing", source: "Demon Slayer", type: "attack" },
      { id: 813, question: "In Demon Slayer, what is Rengoku's breathing style?", answer: "Flame Breathing", source: "Demon Slayer", type: "attack" },
      { id: 814, question: "In Demon Slayer, what is the original breathing style?", answer: "Sun Breathing", source: "Demon Slayer", type: "attack" },
      { id: 815, question: "In Demon Slayer, what is Tanjiro's inherited breathing technique?", answer: "Hinokami Kagura", source: "Demon Slayer", type: "attack" },

      // DEMON SLAYER - Events
      { id: 820, question: "In Demon Slayer, what trial do slayers pass to join the Corps?", answer: "Final Selection", source: "Demon Slayer", type: "event" },
      { id: 821, question: "In Demon Slayer, what arc involves the Mugen Train?", answer: "Mugen Train Arc", source: "Demon Slayer", type: "event" },
      { id: 822, question: "In Demon Slayer, what arc takes place in the Entertainment District?", answer: "Entertainment District Arc", source: "Demon Slayer", type: "event" },
      { id: 823, question: "In Demon Slayer, what is the final battle against Muzan?", answer: "Infinity Castle Arc", source: "Demon Slayer", type: "event" },

      // DEMON SLAYER - Locations
      { id: 830, question: "In Demon Slayer, what mountain is the final selection held on?", answer: "Mount Fujikasane", source: "Demon Slayer", type: "location" },
      { id: 831, question: "In Demon Slayer, where does Muzan's final battle take place?", answer: "Infinity Castle", source: "Demon Slayer", type: "location" },
      { id: 832, question: "In Demon Slayer, what village makes demon slayer swords?", answer: "Swordsmith Village", source: "Demon Slayer", type: "location" },

      // DEMON SLAYER - Organizations
      { id: 840, question: "In Demon Slayer, what are the twelve most powerful demons called?", answer: "Twelve Kizuki", source: "Demon Slayer", type: "organization" },
      { id: 841, question: "In Demon Slayer, what are the highest-ranked demon slayers called?", answer: "Hashira", source: "Demon Slayer", type: "organization" },
      { id: 842, question: "In Demon Slayer, what organization hunts demons?", answer: "Demon Slayer Corps", source: "Demon Slayer", type: "organization" },

      // DEMON SLAYER - Concepts
      { id: 850, question: "In Demon Slayer, what type of creature is Muzan?", answer: "Demon", source: "Demon Slayer", type: "creature" },
      { id: 851, question: "In Demon Slayer, what technique do demon slayers use?", answer: "Total Concentration Breathing", source: "Demon Slayer", type: "concept" },

      // DEMON SLAYER - Items
      { id: 860, question: "In Demon Slayer, what special swords change color based on the user?", answer: "Nichirin Blades", source: "Demon Slayer", type: "item" },

      // =========================================================
      // HUNTER X HUNTER - Characters
      // =========================================================
      { id: 900, question: "In Hunter x Hunter, who is the main protagonist searching for his father?", answer: "Gon Freecss", source: "Hunter x Hunter", type: "character" },
      { id: 901, question: "In Hunter x Hunter, who is Gon's best friend and former assassin?", answer: "Killua Zoldyck", source: "Hunter x Hunter", type: "character" },
      { id: 902, question: "In Hunter x Hunter, who is Gon's father and legendary Hunter?", answer: "Ging Freecss", source: "Hunter x Hunter", type: "character" },
      { id: 903, question: "In Hunter x Hunter, who is the leader of the Phantom Troupe?", answer: "Chrollo Lucilfer", source: "Hunter x Hunter", type: "character" },
      { id: 904, question: "In Hunter x Hunter, who is the magician obsessed with fighting strong opponents?", answer: "Hisoka", source: "Hunter x Hunter", type: "character" },
      { id: 905, question: "In Hunter x Hunter, who is the Kurta clan survivor seeking revenge?", answer: "Kurapika", source: "Hunter x Hunter", type: "character" },
      { id: 906, question: "In Hunter x Hunter, who is the doctor aspiring to be a Hunter?", answer: "Leorio Paradinight", source: "Hunter x Hunter", type: "character" },
      { id: 907, question: "In Hunter x Hunter, who is the King of the Chimera Ants?", answer: "Meruem", source: "Hunter x Hunter", type: "character" },
      { id: 908, question: "In Hunter x Hunter, who is Killua's assassin grandfather?", answer: "Zeno Zoldyck", source: "Hunter x Hunter", type: "character" },

      // HUNTER X HUNTER - Attacks
      { id: 910, question: "In Hunter x Hunter, what is Gon's rock-based Jajanken attack?", answer: "Rock (Jajanken)", source: "Hunter x Hunter", type: "attack" },
      { id: 911, question: "In Hunter x Hunter, what is Killua's lightning-based technique?", answer: "Godspeed", source: "Hunter x Hunter", type: "attack" },
      { id: 912, question: "In Hunter x Hunter, what is Kurapika's chain ability?", answer: "Chain Jail", source: "Hunter x Hunter", type: "attack" },
      { id: 913, question: "In Hunter x Hunter, what is Hisoka's gum-like Nen ability?", answer: "Bungee Gum", source: "Hunter x Hunter", type: "attack" },
      { id: 914, question: "In Hunter x Hunter, what is Netero's ultimate attack?", answer: "Zero Hand", source: "Hunter x Hunter", type: "attack" },

      // HUNTER X HUNTER - Events
      { id: 920, question: "In Hunter x Hunter, what exam determines if someone becomes a Hunter?", answer: "Hunter Exam", source: "Hunter x Hunter", type: "event" },
      { id: 921, question: "In Hunter x Hunter, what arc involves the Chimera Ants?", answer: "Chimera Ant Arc", source: "Hunter x Hunter", type: "event" },
      { id: 922, question: "In Hunter x Hunter, what arc involves the video game Greed Island?", answer: "Greed Island Arc", source: "Hunter x Hunter", type: "event" },
      { id: 923, question: "In Hunter x Hunter, what arc involves the Phantom Troupe in Yorknew?", answer: "Yorknew City Arc", source: "Hunter x Hunter", type: "event" },
      { id: 924, question: "In Hunter x Hunter, what fighting tournament takes place at Heaven's Arena?", answer: "Heavens Arena Arc", source: "Hunter x Hunter", type: "event" },

      // HUNTER X HUNTER - Locations
      { id: 930, question: "In Hunter x Hunter, what is the unexplored dangerous land?", answer: "Dark Continent", source: "Hunter x Hunter", type: "location" },
      { id: 931, question: "In Hunter x Hunter, what is the city where the Phantom Troupe operates?", answer: "Yorknew City", source: "Hunter x Hunter", type: "location" },
      { id: 932, question: "In Hunter x Hunter, what is the tower where Nen fighters battle?", answer: "Heaven's Arena", source: "Hunter x Hunter", type: "location" },
      { id: 933, question: "In Hunter x Hunter, what island is the Zoldyck family home?", answer: "Kukuroo Mountain", source: "Hunter x Hunter", type: "location" },

      // HUNTER X HUNTER - Organizations
      { id: 940, question: "In Hunter x Hunter, what is the notorious group of thieves led by Chrollo?", answer: "Phantom Troupe", source: "Hunter x Hunter", type: "organization" },
      { id: 941, question: "In Hunter x Hunter, what is the assassin family that Killua belongs to?", answer: "Zoldyck Family", source: "Hunter x Hunter", type: "organization" },
      { id: 942, question: "In Hunter x Hunter, what organization manages Hunters?", answer: "Hunter Association", source: "Hunter x Hunter", type: "organization" },

      // HUNTER X HUNTER - Concepts
      { id: 950, question: "In Hunter x Hunter, what is the energy system that Hunters use?", answer: "Nen", source: "Hunter x Hunter", type: "concept" },
      { id: 951, question: "In Hunter x Hunter, what Nen category involves strengthening?", answer: "Enhancement", source: "Hunter x Hunter", type: "concept" },
      { id: 952, question: "In Hunter x Hunter, what Nen category involves creating objects?", answer: "Conjuration", source: "Hunter x Hunter", type: "concept" },
      { id: 953, question: "In Hunter x Hunter, what are the powerful ant-like creatures?", answer: "Chimera Ants", source: "Hunter x Hunter", type: "creature" },

      // HUNTER X HUNTER - Items
      { id: 960, question: "In Hunter x Hunter, what card grants the holder special privileges?", answer: "Hunter License", source: "Hunter x Hunter", type: "item" },

      // =========================================================
      // FULLMETAL ALCHEMIST - Characters & Concepts
      // =========================================================
      { id: 1000, question: "In Fullmetal Alchemist, who is the Fullmetal Alchemist?", answer: "Edward Elric", source: "Fullmetal Alchemist", type: "character" },
      { id: 1001, question: "In Fullmetal Alchemist, who is Edward's brother bound to armor?", answer: "Alphonse Elric", source: "Fullmetal Alchemist", type: "character" },
      { id: 1002, question: "In Fullmetal Alchemist, who is the Flame Alchemist?", answer: "Roy Mustang", source: "Fullmetal Alchemist", type: "character" },
      { id: 1003, question: "In Fullmetal Alchemist, who is the main antagonist homunculus?", answer: "Father", source: "Fullmetal Alchemist", type: "character" },
      { id: 1004, question: "In Fullmetal Alchemist, who is the Strong Arm Alchemist?", answer: "Alex Louis Armstrong", source: "Fullmetal Alchemist", type: "character" },
      { id: 1010, question: "In Fullmetal Alchemist, what is the law that alchemy cannot break?", answer: "Equivalent Exchange", source: "Fullmetal Alchemist", type: "concept" },
      { id: 1011, question: "In Fullmetal Alchemist, what stone bypasses equivalent exchange?", answer: "Philosopher's Stone", source: "Fullmetal Alchemist", type: "item" },
      { id: 1012, question: "In Fullmetal Alchemist, what are the seven artificial humans called?", answer: "Homunculi", source: "Fullmetal Alchemist", type: "creature" },

      // =========================================================
      // DEATH NOTE
      // =========================================================
      { id: 1100, question: "In Death Note, who is the shinigami who drops the Death Note?", answer: "Ryuk", source: "Death Note", type: "character" },
      { id: 1101, question: "In Death Note, who is the genius high schooler who finds the notebook?", answer: "Light Yagami", source: "Death Note", type: "character" },
      { id: 1102, question: "In Death Note, who is the eccentric detective trying to catch Kira?", answer: "L", source: "Death Note", type: "character" },
      { id: 1103, question: "In Death Note, who is L's successor with white hair?", answer: "Near", source: "Death Note", type: "character" },
      { id: 1104, question: "In Death Note, who is L's successor with blonde hair?", answer: "Mello", source: "Death Note", type: "character" },
      { id: 1110, question: "In Death Note, what notebook allows killing by writing names?", answer: "Death Note", source: "Death Note", type: "item" },
      { id: 1111, question: "In Death Note, what are the gods of death called?", answer: "Shinigami", source: "Death Note", type: "creature" },
      { id: 1112, question: "In Death Note, what alias does Light use as a mass murderer?", answer: "Kira", source: "Death Note", type: "concept" },

      // =========================================================
      // YU YU HAKUSHO
      // =========================================================
      { id: 1200, question: "In Yu Yu Hakusho, who is the main protagonist Spirit Detective?", answer: "Yusuke Urameshi", source: "Yu Yu Hakusho", type: "character" },
      { id: 1201, question: "In Yu Yu Hakusho, who is Yusuke's rival with a sword?", answer: "Kazuma Kuwabara", source: "Yu Yu Hakusho", type: "character" },
      { id: 1202, question: "In Yu Yu Hakusho, who is the fox demon thief?", answer: "Kurama", source: "Yu Yu Hakusho", type: "character" },
      { id: 1203, question: "In Yu Yu Hakusho, who is the fire demon with the Jagan eye?", answer: "Hiei", source: "Yu Yu Hakusho", type: "character" },
      { id: 1204, question: "In Yu Yu Hakusho, who is the toddler ruler of Spirit World?", answer: "Koenma", source: "Yu Yu Hakusho", type: "character" },
      { id: 1210, question: "In Yu Yu Hakusho, what is Yusuke's signature spirit attack?", answer: "Spirit Gun", source: "Yu Yu Hakusho", type: "attack" },
      { id: 1211, question: "In Yu Yu Hakusho, what tournament involves demon fighters?", answer: "Dark Tournament", source: "Yu Yu Hakusho", type: "event" },

      // =========================================================
      // OVERLORD
      // =========================================================
      { id: 1300, question: "In Overlord, who is the undead ruler of Nazarick?", answer: "Ainz Ooal Gown", source: "Overlord", type: "character" },
      { id: 1301, question: "In Overlord, who is the succubus overseer of the guardians?", answer: "Albedo", source: "Overlord", type: "character" },
      { id: 1302, question: "In Overlord, who is the vampire guardian of the first three floors?", answer: "Shalltear Bloodfallen", source: "Overlord", type: "character" },
      { id: 1303, question: "In Overlord, who is the insect warrior guardian?", answer: "Cocytus", source: "Overlord", type: "character" },
      { id: 1310, question: "In Overlord, what is the Great Tomb Ainz rules?", answer: "Nazarick", source: "Overlord", type: "location" },
      { id: 1311, question: "In Overlord, what was the guild that created Nazarick?", answer: "Ainz Ooal Gown", source: "Overlord", type: "organization" },
    ],
    modifiers: [
      "Double points on correct answer (+2 instead of +1).",
      "Wrong answer penalty (-1 point on wrong answer).",
      "Only players tied for 1st can score this round.",
      "Player(s) with the most points are skipped this round."
    ]
  },

  movies: { 
    title: "Movie Trivia (Template)", 
    questions: [
      { id: 1, question: "TEMPLATE: Add movie questions here", answer: "Example answer", source: "Movie Pack", type: "concept" }
    ], 
    modifiers: [
      "Double points on correct answer (+2 instead of +1).",
      "Wrong answer penalty (-1 point on wrong answer)."
    ] 
  },
  cartoons: { 
    title: "Cartoon Trivia (Template)", 
    questions: [
      { id: 1, question: "TEMPLATE: Add cartoon questions here", answer: "Example answer", source: "Cartoon Pack", type: "concept" }
    ], 
    modifiers: [] 
  },
  series: { 
    title: "TV / Series Trivia (Template)", 
    questions: [
      { id: 1, question: "TEMPLATE: Add TV series questions here", answer: "Example answer", source: "Series Pack", type: "concept" }
    ], 
    modifiers: [] 
  },
  anime_movies: { 
    title: "Anime Movies Trivia (Template)", 
    questions: [
      { id: 1, question: "TEMPLATE: Add anime movie questions here", answer: "Example answer", source: "Anime Movies Pack", type: "concept" }
    ], 
    modifiers: [] 
  }
};