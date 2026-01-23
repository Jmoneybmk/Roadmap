// versus_data.js
// Data for Versus Mode: Singles, Duos, and Teams

window.VERSUS_DATA = {
  targetScore: 10,

  // =========================================================
  // ACTIVITIES (5 per category = 20 total)
  // =========================================================
  activities: {
    combat: [
      "Most Powerful",
      "Best Fighter (Skill, not raw power)",
      "Would Survive Longest in a Battle Royale",
      "Most Dangerous When Angry",
      "Best in a 1v1 Death Match"
    ],
    meta: [
      "Best Written Character",
      "Most Iconic",
      "Best Character Development",
      "Most Memorable Moment",
      "Best Backstory"
    ],
    skills: [
      "Best Strategist",
      "Best Leader",
      "Most Intelligent",
      "Most Versatile (can adapt to any situation)",
      "Best Mentor/Teacher"
    ],
    fun: [
      "Best Cook",
      "Most Likely to Win a Debate",
      "Best Fashion Sense",
      "Most Fun at a Party",
      "Most Likely to Go Viral on Social Media"
    ]
  },

  // =========================================================
  // SINGLES - Individual Characters
  // =========================================================
  singles: [
    // Dragon Ball
    { name: "Goku", anime: "Dragon Ball Z" },
    { name: "Vegeta", anime: "Dragon Ball Z" },
    { name: "Gohan", anime: "Dragon Ball Z" },
    { name: "Piccolo", anime: "Dragon Ball Z" },
    { name: "Frieza", anime: "Dragon Ball Z" },
    { name: "Cell", anime: "Dragon Ball Z" },
    { name: "Majin Buu", anime: "Dragon Ball Z" },
    { name: "Broly", anime: "Dragon Ball Super" },
    { name: "Beerus", anime: "Dragon Ball Super" },
    { name: "Jiren", anime: "Dragon Ball Super" },

    // Naruto
    { name: "Naruto Uzumaki", anime: "Naruto" },
    { name: "Sasuke Uchiha", anime: "Naruto" },
    { name: "Kakashi Hatake", anime: "Naruto" },
    { name: "Itachi Uchiha", anime: "Naruto" },
    { name: "Madara Uchiha", anime: "Naruto" },
    { name: "Pain", anime: "Naruto" },
    { name: "Minato Namikaze", anime: "Naruto" },
    { name: "Jiraiya", anime: "Naruto" },
    { name: "Orochimaru", anime: "Naruto" },
    { name: "Obito Uchiha", anime: "Naruto" },

    // One Piece
    { name: "Monkey D. Luffy", anime: "One Piece" },
    { name: "Roronoa Zoro", anime: "One Piece" },
    { name: "Sanji", anime: "One Piece" },
    { name: "Shanks", anime: "One Piece" },
    { name: "Whitebeard", anime: "One Piece" },
    { name: "Kaido", anime: "One Piece" },
    { name: "Big Mom", anime: "One Piece" },
    { name: "Blackbeard", anime: "One Piece" },
    { name: "Akainu", anime: "One Piece" },
    { name: "Doflamingo", anime: "One Piece" },

    // Bleach
    { name: "Ichigo Kurosaki", anime: "Bleach" },
    { name: "Byakuya Kuchiki", anime: "Bleach" },
    { name: "Kenpachi Zaraki", anime: "Bleach" },
    { name: "Aizen", anime: "Bleach" },
    { name: "Ulquiorra", anime: "Bleach" },
    { name: "Yamamoto", anime: "Bleach" },

    // Hunter x Hunter
    { name: "Gon Freecss", anime: "Hunter x Hunter" },
    { name: "Killua Zoldyck", anime: "Hunter x Hunter" },
    { name: "Kurapika", anime: "Hunter x Hunter" },
    { name: "Hisoka", anime: "Hunter x Hunter" },
    { name: "Chrollo Lucilfer", anime: "Hunter x Hunter" },
    { name: "Meruem", anime: "Hunter x Hunter" },
    { name: "Netero", anime: "Hunter x Hunter" },

    // My Hero Academia
    { name: "All Might", anime: "My Hero Academia" },
    { name: "Deku", anime: "My Hero Academia" },
    { name: "Bakugo", anime: "My Hero Academia" },
    { name: "Todoroki", anime: "My Hero Academia" },
    { name: "Endeavor", anime: "My Hero Academia" },
    { name: "All For One", anime: "My Hero Academia" },

    // Demon Slayer
    { name: "Tanjiro Kamado", anime: "Demon Slayer" },
    { name: "Zenitsu Agatsuma", anime: "Demon Slayer" },
    { name: "Inosuke Hashibira", anime: "Demon Slayer" },
    { name: "Muzan Kibutsuji", anime: "Demon Slayer" },
    { name: "Akaza", anime: "Demon Slayer" },
    { name: "Kokushibo", anime: "Demon Slayer" },
    { name: "Gyomei Himejima", anime: "Demon Slayer" },

    // Jujutsu Kaisen
    { name: "Gojo Satoru", anime: "Jujutsu Kaisen" },
    { name: "Itadori Yuji", anime: "Jujutsu Kaisen" },
    { name: "Sukuna", anime: "Jujutsu Kaisen" },
    { name: "Megumi Fushiguro", anime: "Jujutsu Kaisen" },
    { name: "Toji Fushiguro", anime: "Jujutsu Kaisen" },

    // Attack on Titan
    { name: "Eren Yeager", anime: "Attack on Titan" },
    { name: "Levi Ackerman", anime: "Attack on Titan" },
    { name: "Mikasa Ackerman", anime: "Attack on Titan" },
    { name: "Erwin Smith", anime: "Attack on Titan" },
    { name: "Reiner Braun", anime: "Attack on Titan" },

    // Death Note
    { name: "Light Yagami", anime: "Death Note" },
    { name: "L", anime: "Death Note" },

    // Fullmetal Alchemist
    { name: "Edward Elric", anime: "Fullmetal Alchemist" },
    { name: "Roy Mustang", anime: "Fullmetal Alchemist" },
    { name: "King Bradley", anime: "Fullmetal Alchemist" },

    // Code Geass
    { name: "Lelouch vi Britannia", anime: "Code Geass" },
    { name: "Suzaku Kururugi", anime: "Code Geass" },

    // One Punch Man
    { name: "Saitama", anime: "One Punch Man" },
    { name: "Garou", anime: "One Punch Man" },
    { name: "Boros", anime: "One Punch Man" },

    // Mob Psycho 100
    { name: "Mob", anime: "Mob Psycho 100" },

    // Chainsaw Man
    { name: "Denji", anime: "Chainsaw Man" },
    { name: "Makima", anime: "Chainsaw Man" },

    // Solo Leveling
    { name: "Sung Jin-Woo", anime: "Solo Leveling" },

    // Fairy Tail
    { name: "Natsu Dragneel", anime: "Fairy Tail" },
    { name: "Erza Scarlet", anime: "Fairy Tail" },

    // Black Clover
    { name: "Asta", anime: "Black Clover" },
    { name: "Yami Sukehiro", anime: "Black Clover" },

    // Seven Deadly Sins
    { name: "Meliodas", anime: "Seven Deadly Sins" },
    { name: "Escanor", anime: "Seven Deadly Sins" },

    // Overlord
    { name: "Ainz Ooal Gown", anime: "Overlord" },

    // Re:Zero
    { name: "Subaru Natsuki", anime: "Re:Zero" },
    { name: "Reinhard van Astrea", anime: "Re:Zero" },

    // Sword Art Online
    { name: "Kirito", anime: "Sword Art Online" },

    // Fate Series
    { name: "Gilgamesh", anime: "Fate Series" },
    { name: "Saber", anime: "Fate Series" },
  ],

  // =========================================================
  // DUOS - 30 Pre-built Pairs
  // =========================================================
  duos: [
    // Dragon Ball
    { name: "Goku & Vegeta", anime: "Dragon Ball Z" },
    { name: "Gohan & Piccolo", anime: "Dragon Ball Z" },
    { name: "Goten & Trunks", anime: "Dragon Ball Z" },
    { name: "Beerus & Whis", anime: "Dragon Ball Super" },
    { name: "Frieza & Cell", anime: "Dragon Ball Z" },

    // Naruto
    { name: "Naruto & Sasuke", anime: "Naruto" },
    { name: "Itachi & Kisame", anime: "Naruto" },
    { name: "Kakashi & Guy", anime: "Naruto" },
    { name: "Minato & Kushina", anime: "Naruto" },
    { name: "Hashirama & Madara", anime: "Naruto" },
    { name: "Pain & Konan", anime: "Naruto" },

    // One Piece
    { name: "Luffy & Zoro", anime: "One Piece" },
    { name: "Sanji & Zoro", anime: "One Piece" },
    { name: "Ace & Sabo", anime: "One Piece" },
    { name: "Roger & Rayleigh", anime: "One Piece" },
    { name: "Law & Kid", anime: "One Piece" },

    // Hunter x Hunter
    { name: "Gon & Killua", anime: "Hunter x Hunter" },
    { name: "Kurapika & Leorio", anime: "Hunter x Hunter" },
    { name: "Hisoka & Illumi", anime: "Hunter x Hunter" },
    { name: "Meruem & Komugi", anime: "Hunter x Hunter" },

    // Demon Slayer
    { name: "Tanjiro & Nezuko", anime: "Demon Slayer" },
    { name: "Zenitsu & Inosuke", anime: "Demon Slayer" },
    { name: "Rengoku & Tengen", anime: "Demon Slayer" },

    // My Hero Academia
    { name: "Deku & Bakugo", anime: "My Hero Academia" },
    { name: "All Might & Endeavor", anime: "My Hero Academia" },
    { name: "Todoroki & Deku", anime: "My Hero Academia" },

    // Attack on Titan
    { name: "Eren & Mikasa", anime: "Attack on Titan" },
    { name: "Levi & Erwin", anime: "Attack on Titan" },

    // Jujutsu Kaisen
    { name: "Gojo & Geto", anime: "Jujutsu Kaisen" },
    { name: "Itadori & Todo", anime: "Jujutsu Kaisen" },
  ],

  // =========================================================
  // TEAMS - 30 Pre-built Teams
  // =========================================================
  teams: [
    // Naruto
    { name: "Akatsuki", anime: "Naruto", members: "Pain, Itachi, Kisame, Deidara, Sasori, Hidan, Kakuzu, Konan, Obito, Zetsu" },
    { name: "Team 7", anime: "Naruto", members: "Naruto, Sasuke, Sakura, Kakashi" },
    { name: "Legendary Sannin", anime: "Naruto", members: "Jiraiya, Tsunade, Orochimaru" },
    { name: "Konoha 11", anime: "Naruto", members: "Naruto, Sasuke, Sakura, Shikamaru, Ino, Choji, Hinata, Kiba, Shino, Rock Lee, Neji, Tenten" },
    { name: "The Five Kage", anime: "Naruto", members: "Tsunade, Gaara, Onoki, A, Mei" },

    // Dragon Ball
    { name: "Z Fighters", anime: "Dragon Ball Z", members: "Goku, Vegeta, Gohan, Piccolo, Krillin, Tien, Yamcha" },
    { name: "Frieza Force", anime: "Dragon Ball Z", members: "Frieza, Zarbon, Dodoria, Ginyu Force" },
    { name: "Ginyu Force", anime: "Dragon Ball Z", members: "Captain Ginyu, Jeice, Burter, Recoome, Guldo" },
    { name: "Universe 7 Tournament Team", anime: "Dragon Ball Super", members: "Goku, Vegeta, Gohan, Frieza, Android 17, Android 18, Piccolo, Krillin, Tien, Roshi" },
    { name: "Gods of Destruction", anime: "Dragon Ball Super", members: "Beerus, Champa, and the other GoDs" },

    // One Piece
    { name: "Straw Hat Pirates", anime: "One Piece", members: "Luffy, Zoro, Nami, Usopp, Sanji, Chopper, Robin, Franky, Brook, Jinbe" },
    { name: "Worst Generation", anime: "One Piece", members: "Luffy, Zoro, Law, Kid, Hawkins, Apoo, Drake, Urouge, Bonney, Bege, Killer, Blackbeard" },
    { name: "Whitebeard Pirates", anime: "One Piece", members: "Whitebeard, Marco, Ace, Jozu, Vista" },
    { name: "The Three Admirals", anime: "One Piece", members: "Akainu, Aokiji, Kizaru" },
    { name: "Yonko", anime: "One Piece", members: "Shanks, Kaido, Big Mom, Blackbeard" },
    { name: "Revolutionary Army", anime: "One Piece", members: "Dragon, Sabo, Ivankov, Kuma" },

    // Hunter x Hunter
    { name: "Phantom Troupe", anime: "Hunter x Hunter", members: "Chrollo, Hisoka, Feitan, Phinks, Machi, Nobunaga, Shalnark, Shizuku, Franklin, Bonolenov, Kortopi, Pakunoda" },
    { name: "Zoldyck Family", anime: "Hunter x Hunter", members: "Silva, Zeno, Kikyo, Illumi, Milluki, Killua, Alluka, Kalluto" },
    { name: "Royal Guards", anime: "Hunter x Hunter", members: "Neferpitou, Shaiapouf, Menthuthuyoupi" },

    // My Hero Academia
    { name: "Class 1-A", anime: "My Hero Academia", members: "Deku, Bakugo, Todoroki, Iida, Uraraka, and 15 others" },
    { name: "League of Villains", anime: "My Hero Academia", members: "Shigaraki, Dabi, Toga, Twice, Mr. Compress, Spinner" },
    { name: "Pro Heroes", anime: "My Hero Academia", members: "All Might, Endeavor, Hawks, Best Jeanist, Mirko, Edgeshot" },

    // Demon Slayer
    { name: "Hashira", anime: "Demon Slayer", members: "Gyomei, Sanemi, Muichiro, Mitsuri, Obanai, Giyu, Shinobu, Rengoku, Tengen" },
    { name: "Upper Moons", anime: "Demon Slayer", members: "Kokushibo, Doma, Akaza, Hantengu, Gyokko, Kaigaku" },
    { name: "Demon Slayer Corps", anime: "Demon Slayer", members: "Tanjiro, Zenitsu, Inosuke, Kanao, Genya + Hashira" },

    // Attack on Titan
    { name: "Survey Corps", anime: "Attack on Titan", members: "Levi, Erwin, Hange, Mikasa, Eren, Armin, Jean, Connie, Sasha" },
    { name: "Warrior Unit", anime: "Attack on Titan", members: "Reiner, Bertholdt, Annie, Zeke, Pieck, Porco" },
    { name: "Titan Shifters", anime: "Attack on Titan", members: "Eren, Reiner, Annie, Bertholdt, Zeke, Pieck, Porco, Falco" },

    // Jujutsu Kaisen
    { name: "Tokyo Jujutsu High", anime: "Jujutsu Kaisen", members: "Gojo, Itadori, Megumi, Nobara, Maki, Panda, Inumaki, Yuta" },
    { name: "Cursed Spirits", anime: "Jujutsu Kaisen", members: "Mahito, Jogo, Hanami, Dagon" },
  ],
};
