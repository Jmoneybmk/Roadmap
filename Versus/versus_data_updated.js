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
  
    // Dragon Ball Series
    { name: "Goku & Gohan", anime: "Dragon Ball Series" },
    { name: "Vegeta & Trunks", anime: "Dragon Ball Series" },
    { name: "Gogeta & Vegito", anime: "Dragon Ball Series" },

    // Naruto Series
    { name: "Naruto & Jiraiya", anime: "Naruto Series" },
    { name: "Sasuke & Orochimaru", anime: "Naruto Series" },
    { name: "Sakura & Tsunade", anime: "Naruto Series" },

    // Bleach
    { name: "Ichigo & Rukia", anime: "Bleach" },
    { name: "Ichigo & Uryu", anime: "Bleach" },
    { name: "Aizen & Gin", anime: "Bleach" },

    // Fairy Tail
    { name: "Natsu & Lucy", anime: "Fairy Tail" },
    { name: "Erza & Jellal", anime: "Fairy Tail" },
    { name: "Gray & Juvia", anime: "Fairy Tail" },

    // Fullmetal Alchemist: Brotherhood
    { name: "Edward & Alphonse", anime: "Fullmetal Alchemist: Brotherhood" },
    { name: "Roy Mustang & Riza Hawkeye", anime: "Fullmetal Alchemist: Brotherhood" },
    { name: "Scar & May Chang", anime: "Fullmetal Alchemist: Brotherhood" },

    // Black Clover
    { name: "Asta & Yuno", anime: "Black Clover" },
    { name: "Noelle & Mimosa", anime: "Black Clover" },
    { name: "Yami & Nacht", anime: "Black Clover" },

    // Seven Deadly Sins
    { name: "Meliodas & Ban", anime: "Seven Deadly Sins" },
    { name: "Diane & King", anime: "Seven Deadly Sins" },
    { name: "Elizabeth & Hawk", anime: "Seven Deadly Sins" },

    // Tokyo Ghoul
    { name: "Kaneki & Touka", anime: "Tokyo Ghoul" },
    { name: "Amon & Akira", anime: "Tokyo Ghoul" },
    { name: "Arima & Eto", anime: "Tokyo Ghoul" },

    // Tokyo Revengers
    { name: "Mikey & Draken", anime: "Tokyo Revengers" },
    { name: "Takemichi & Chifuyu", anime: "Tokyo Revengers" },
    { name: "Baji & Kazutora", anime: "Tokyo Revengers" },

    // Wind Breaker
    { name: "Haruka Sakura & Hajime Umemiya", anime: "Wind Breaker" },
    { name: "Suo & Nirei", anime: "Wind Breaker" },
    { name: "Sugishita & Kiryu", anime: "Wind Breaker" },

    // Solo Leveling
    { name: "Sung Jinwoo & Yoo Jinho", anime: "Solo Leveling" },
    { name: "Cha Hae-In & Choi Jong-In", anime: "Solo Leveling" },
    { name: "Go Gunhee & Woo Jinchul", anime: "Solo Leveling" },

    // Overlord
    { name: "Ainz & Albedo", anime: "Overlord" },
    { name: "Ainz & Demiurge", anime: "Overlord" },
    { name: "Shalltear & Aura", anime: "Overlord" },

    // Mushoku Tensei
    { name: "Rudeus & Sylphie", anime: "Mushoku Tensei" },
    { name: "Rudeus & Eris", anime: "Mushoku Tensei" },
    { name: "Rudeus & Roxy", anime: "Mushoku Tensei" },

    // Re:Zero
    { name: "Subaru & Emilia", anime: "Re:Zero" },
    { name: "Subaru & Rem", anime: "Re:Zero" },
    { name: "Emilia & Puck", anime: "Re:Zero" },

    // Overly Cautious Hero
    { name: "Seiya & Ristarte", anime: "Overly Cautious Hero" },
    { name: "Seiya & Adenela", anime: "Overly Cautious Hero" },
    { name: "Ristarte & Mash", anime: "Overly Cautious Hero" },

    // Arifureta
    { name: "Hajime & Yue", anime: "Arifureta" },
    { name: "Hajime & Shea", anime: "Arifureta" },
    { name: "Hajime & Tio", anime: "Arifureta" },

    // Tsukimichi: Moonlit Fantasy
    { name: "Makoto & Tomoe", anime: "Tsukimichi: Moonlit Fantasy" },
    { name: "Makoto & Mio", anime: "Tsukimichi: Moonlit Fantasy" },
    { name: "Tomoe & Mio", anime: "Tsukimichi: Moonlit Fantasy" },

    // The Wrong Way to Use Healing Magic
    { name: "Usato & Rose", anime: "The Wrong Way to Use Healing Magic" },
    { name: "Usato & Suzune", anime: "The Wrong Way to Use Healing Magic" },
    { name: "Usato & Kazuki", anime: "The Wrong Way to Use Healing Magic" },

    // The Misfit of Demon King Academy
    { name: "Anos & Misha", anime: "The Misfit of Demon King Academy" },
    { name: "Anos & Sasha", anime: "The Misfit of Demon King Academy" },
    { name: "Misha & Sasha", anime: "The Misfit of Demon King Academy" },

    // Kaiju No. 8
    { name: "Kafka Hibino & Mina Ashiro", anime: "Kaiju No. 8" },
    { name: "Kafka Hibino & Reno Ichikawa", anime: "Kaiju No. 8" },
    { name: "Kikoru Shinomiya & Soshiro Hoshina", anime: "Kaiju No. 8" },

    // Tower of God
    { name: "Bam & Khun", anime: "Tower of God" },
    { name: "Bam & Rak", anime: "Tower of God" },
    { name: "Khun & Rak", anime: "Tower of God" },

    // Magi (Labyrinth + Sinbad)
    { name: "Aladdin & Alibaba", anime: "Magi (Labyrinth + Sinbad)" },
    { name: "Sinbad & Ja’far", anime: "Magi (Labyrinth + Sinbad)" },
    { name: "Morgiana & Hakuryuu", anime: "Magi (Labyrinth + Sinbad)" },

    // Parasyte: The Maxim
    { name: "Shinichi & Migi", anime: "Parasyte: The Maxim" },
    { name: "Kana & Shinichi", anime: "Parasyte: The Maxim" },
    { name: "Gotou & Reiko Tamura", anime: "Parasyte: The Maxim" },

    // Yu Yu Hakusho
    { name: "Yusuke & Kuwabara", anime: "Yu Yu Hakusho" },
    { name: "Hiei & Kurama", anime: "Yu Yu Hakusho" },
    { name: "Genkai & Yusuke", anime: "Yu Yu Hakusho" },

    // Code Geass
    { name: "Lelouch & C.C.", anime: "Code Geass" },
    { name: "Lelouch & Suzaku", anime: "Code Geass" },
    { name: "Kallen & Gino", anime: "Code Geass" },

    // Avatar (ATLA + Korra)
    { name: "Aang & Katara", anime: "Avatar (ATLA + Korra)" },
    { name: "Zuko & Iroh", anime: "Avatar (ATLA + Korra)" },
    { name: "Korra & Asami", anime: "Avatar (ATLA + Korra)" },

    // The World’s Finest Assassin Gets Reincarnated as an Aristocrat
    { name: "Lugh & Dia", anime: "The World’s Finest Assassin Gets Reincarnated as an Aristocrat" },
    { name: "Lugh & Tarte", anime: "The World’s Finest Assassin Gets Reincarnated as an Aristocrat" },
    { name: "Lugh & Maha", anime: "The World’s Finest Assassin Gets Reincarnated as an Aristocrat" },
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
  
    // Dragon Ball Series
    { name: "Z Fighters (Core)", anime: "Dragon Ball Series", members: "Goku, Vegeta, Gohan, Piccolo, Trunks, Krillin, Android 18" },
    { name: "Universe 7 Gods", anime: "Dragon Ball Series", members: "Beerus, Whis, Supreme Kai, Elder Kai" },

    // Naruto Series
    { name: "Team 7 (Prime)", anime: "Naruto Series", members: "Naruto, Sasuke, Sakura, Kakashi" },
    { name: "Akatsuki (Core)", anime: "Naruto Series", members: "Pain, Itachi, Kisame, Deidara, Sasori, Hidan, Kakuzu, Konan, Obito" },

    // Bleach
    { name: "Gotei 13 (Key Captains)", anime: "Bleach", members: "Yamamoto, Shunsui, Byakuya, Kenpachi, Toshiro, Mayuri, Soi Fon" },
    { name: "Espada (Top Threats)", anime: "Bleach", members: "Aizen, Ulquiorra, Grimmjow, Starrk, Barragan, Halibel" },

    // Fairy Tail
    { name: "Fairy Tail Guild (Core)", anime: "Fairy Tail", members: "Natsu, Lucy, Gray, Erza, Wendy, Happy, Gajeel" },
    { name: "Spriggan 12 (Highlights)", anime: "Fairy Tail", members: "Zeref, Irene, August, Dimaria, Brandish, Larcade" },

    // Fullmetal Alchemist: Brotherhood
    { name: "Central Allies", anime: "Fullmetal Alchemist: Brotherhood", members: "Edward, Alphonse, Winry, Roy Mustang, Riza Hawkeye, Scar, Ling" },
    { name: "Homunculi", anime: "Fullmetal Alchemist: Brotherhood", members: "Father, Pride, Wrath, Envy, Lust, Greed, Sloth, Gluttony" },

    // Black Clover
    { name: "Black Bulls", anime: "Black Clover", members: "Asta, Yami, Noelle, Magna, Luck, Vanessa, Finral, Charmy" },
    { name: "Golden Dawn", anime: "Black Clover", members: "Yuno, William Vangeance, Klaus, Mimosa, Langris" },

    // Seven Deadly Sins
    { name: "Seven Deadly Sins", anime: "Seven Deadly Sins", members: "Meliodas, Diane, Ban, King, Gowther, Merlin, Escanor" },
    { name: "Ten Commandments", anime: "Seven Deadly Sins", members: "Zeldris, Estarossa/Mael, Galand, Melascula, Drole, Gloxinia, Grayroad, Fraudrin, Monspeet, Derieri" },

    // Tokyo Ghoul
    { name: "Anteiku / Goat Allies", anime: "Tokyo Ghoul", members: "Kaneki, Touka, Yoshimura, Hinami, Yomo, Nishiki" },
    { name: "CCG Investigators (Core)", anime: "Tokyo Ghoul", members: "Arima, Amon, Akira, Juuzou, Shinohara, Mado" },

    // Tokyo Revengers
    { name: "Tokyo Manji Gang (Core)", anime: "Tokyo Revengers", members: "Mikey, Draken, Takemichi, Chifuyu, Mitsuya, Baji" },
    { name: "Tenjiku", anime: "Tokyo Revengers", members: "Izana, Kisaki, Kakucho, Ran Haitani, Rindo Haitani" },

    // Wind Breaker
    { name: "Furin High (Bofurin)", anime: "Wind Breaker", members: "Haruka Sakura, Umemiya, Suo, Nirei, Sugishita, Kiryu" },
    { name: "Shishitoren", anime: "Wind Breaker", members: "Choji Tomiyama, Togame, Hiiragi, Tsugeura" },

    // Solo Leveling
    { name: "Hunters Association (Top)", anime: "Solo Leveling", members: "Sung Jinwoo, Cha Hae-In, Choi Jong-In, Baek Yoonho, Go Gunhee, Woo Jinchul" },
    { name: "Shadow Army (Icons)", anime: "Solo Leveling", members: "Igris, Beru, Iron, Tusk, Tank" },

    // Overlord
    { name: "Nazarick Guardians", anime: "Overlord", members: "Ainz, Albedo, Demiurge, Shalltear, Cocytus, Aura, Mare, Sebas" },
    { name: "Blue Roses", anime: "Overlord", members: "Lakyus, Gagaran, Tina, Tia, Evileye" },

    // Mushoku Tensei
    { name: "Rudeus Party (Core)", anime: "Mushoku Tensei", members: "Rudeus, Eris, Ruijerd, Sylphie, Roxy" },
    { name: "Greyrat Family", anime: "Mushoku Tensei", members: "Rudeus, Paul, Zenith, Norn, Aisha" },

    // Re:Zero
    { name: "Emilia Camp", anime: "Re:Zero", members: "Emilia, Subaru, Puck, Rem, Ram, Beatrice, Roswaal" },
    { name: "Witch Cult", anime: "Re:Zero", members: "Petelgeuse, Regulus, Capella, Sirius" },

    // Overly Cautious Hero
    { name: "Divine Support Squad", anime: "Overly Cautious Hero", members: "Seiya, Ristarte, Adenela, Cerseus, Valkyrie" },
    { name: "Demon Army (Highlights)", anime: "Overly Cautious Hero", members: "Demon Lord, Deathmagla, Chaos Machina" },

    // Arifureta
    { name: "Hajime’s Party", anime: "Arifureta", members: "Hajime, Yue, Shea, Tio, Kaori" },
    { name: "Hero Party (Core)", anime: "Arifureta", members: "Kouki, Shizuku, Ryutarou, Kaori" },

    // Tsukimichi: Moonlit Fantasy
    { name: "Makoto’s Followers", anime: "Tsukimichi: Moonlit Fantasy", members: "Makoto, Tomoe, Mio, Shiki, Emma" },
    { name: "Goddess’ Champions (Highlights)", anime: "Tsukimichi: Moonlit Fantasy", members: "Hibiki, Tomoki, Lime Laté" },

    // The Wrong Way to Use Healing Magic
    { name: "Rescue Team", anime: "The Wrong Way to Use Healing Magic", members: "Usato, Rose, Suzune, Kazuki" },
    { name: "Royal Guard (Highlights)", anime: "The Wrong Way to Use Healing Magic", members: "King, Knight Captain, Rose’s unit" },

    // The Misfit of Demon King Academy
    { name: "Anos’ Inner Circle", anime: "The Misfit of Demon King Academy", members: "Anos, Misha, Sasha, Lay, Misa" },
    { name: "Hero Academy (Highlights)", anime: "The Misfit of Demon King Academy", members: "Lay, Shin, Eldemade" },

    // Kaiju No. 8
    { name: "Defense Force Squad", anime: "Kaiju No. 8", members: "Kafka, Mina, Reno, Kikoru, Hoshina" },
    { name: "Kaiju Threats", anime: "Kaiju No. 8", members: "Kaiju No. 8, Kaiju No. 9, Kaiju No. 10" },

    // Tower of God
    { name: "Regulars (Floor 2)", anime: "Tower of God", members: "Bam, Khun, Rak, Endorsi, Anak" },
    { name: "FUG (Highlights)", anime: "Tower of God", members: "Karaka, Jinsung Ha, White" },

    // Magi (Labyrinth + Sinbad)
    { name: "Main Trio", anime: "Magi (Labyrinth + Sinbad)", members: "Aladdin, Alibaba, Morgiana" },
    { name: "Seven Seas Alliance", anime: "Magi (Labyrinth + Sinbad)", members: "Sinbad, Ja’far, Masrur, Drakon, Hinahoho" },

    // Parasyte: The Maxim
    { name: "Parasyte Survivors", anime: "Parasyte: The Maxim", members: "Shinichi, Migi, Kana" },
    { name: "Parasytes (Threats)", anime: "Parasyte: The Maxim", members: "Gotou, Reiko Tamura, Uda’s parasyte" },

    // Yu Yu Hakusho
    { name: "Team Urameshi", anime: "Yu Yu Hakusho", members: "Yusuke, Kuwabara, Hiei, Kurama, Genkai" },
    { name: "Toguro’s Crew", anime: "Yu Yu Hakusho", members: "Younger Toguro, Elder Toguro, Karasu, Bui" },

    // Code Geass
    { name: "Black Knights", anime: "Code Geass", members: "Lelouch (Zero), Kallen, Ohgi, Tohdoh, Diethard" },
    { name: "Britannian Royals", anime: "Code Geass", members: "Suzaku, Cornelia, Schneizel, Euphemia" },

    // Avatar (ATLA + Korra)
    { name: "Team Avatar (ATLA)", anime: "Avatar (ATLA + Korra)", members: "Aang, Katara, Sokka, Toph, Zuko, Appa" },
    { name: "Team Korra", anime: "Avatar (ATLA + Korra)", members: "Korra, Asami, Mako, Bolin, Tenzin" },

    // The World’s Finest Assassin Gets Reincarnated as an Aristocrat
    { name: "Tuatha Dé Party", anime: "The World’s Finest Assassin Gets Reincarnated as an Aristocrat", members: "Lugh, Dia, Tarte, Maha" },
    { name: "Viekone Knights (Highlights)", anime: "The World’s Finest Assassin Gets Reincarnated as an Aristocrat", members: "Lugh, Cian, Esri" },
],
};
