// draft_data.js
// Team Draft Royale - Pack-based data structure

window.DRAFT_PACKS = {
  anime: {
    title: "Anime Pack",
    defaultRounds: 5,

    roles: [
      { id: 'captain', name: 'Leader', blurb: 'Makes the final call and fights last.' },
      { id: 'vice', name: 'Strategist', blurb: 'Plans the approach and adapts mid-fight.' },
      { id: 'tank', name: 'Vanguard', blurb: 'Takes the first hit and controls the frontline.' },
      { id: 'assassin', name: 'Striker', blurb: 'High damage, targets key enemies.' },
      { id: 'support', name: 'Anchor', blurb: 'Buffs, heals, or enables the team.' },
    ],

    modifiers: [
      'No flying (any flight/levitation is disabled).',
      'Powers/Magic sealed for the first 30 seconds.',
      'The battle becomes a chess match between Captains (no direct combat).',
      'Urban battlefield with civilians: collateral damage loses you the vote.',
      'No killing allowed: incapacitation only.',
      'Everyone fights 1v1 (Assassins shine; teams must regroup).',
      'Captain and Support swap characters.',
      'Captain and Support team up, Vice Captain and Tank team up, Assassin remain alone.',
      'Support is targeted first (protect them or lose).',
      'Everyone has to agree on removing/nullifying 1 role this round.',
    ],

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
      { name: "Avatar Roku", anime: "Avatar (ATLA + Korra)" },
      { name: "Korra", anime: "Avatar (ATLA + Korra)" },
      { name: "Asami Sato", anime: "Avatar (ATLA + Korra)" },
      { name: "Mako", anime: "Avatar (ATLA + Korra)" },
      { name: "Bolin", anime: "Avatar (ATLA + Korra)" },
      { name: "Tenzin", anime: "Avatar (ATLA + Korra)" },

    ]
  },

  // Template for additional packs
  gaming: {
    title: "Gaming Pack",
    defaultRounds: 5,
    roles: [
      { id: 'captain', name: 'Leader', blurb: 'Makes the final call and fights last.' },
      { id: 'vice', name: 'Strategist', blurb: 'Plans the approach and adapts mid-fight.' },
      { id: 'tank', name: 'Vanguard', blurb: 'Takes the first hit and controls the frontline.' },
      { id: 'assassin', name: 'Striker', blurb: 'High damage, targets key enemies.' },
      { id: 'support', name: 'Anchor', blurb: 'Buffs, heals, or enables the team.' },
    ],
    modifiers: [
      'No special abilities for first 30 seconds.',
      'All characters fight 1v1.',
    ],
    characters: [
      { name: "Template Character", anime: "Gaming Pack" },
    ]
  }
};

// Default export for backwards compatibility
window.DRAFT_TEAM_DATA = window.DRAFT_PACKS.anime;