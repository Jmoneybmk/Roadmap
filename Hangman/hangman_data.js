// hangman_data.js
// Pack-based data structure for Hangman game

window.HANGMAN_DATA = {
  packs: {
    anime: {
      id: "anime",
      name: "Anime",
      categories: {
        characters: {
          id: "characters",
          name: "Characters",
          entries: [
            // Dragon Ball Series
            {
              answer: "GOKU",
              hints: [
                "Gave a villain energy to escape a dying planet",
                "Has a Saiyan name that means sky or emptiness",
                "Fell from a basket and bumped his head on rocks as a kid"
              ]
            },
            {
              answer: "VEGETA",
              hints: [
                "Prince of a warrior race",
                "Refused to fuse until his rival was turned into candy",
                "Let a pink blob absorb him to gain power"
              ]
            },
            {
              answer: "GOHAN",
              hints: [
                "Stopped training to become a scholar",
                "Named after his adoptive grandfather",
                "First to achieve a transformation beyond the original gold form"
              ]
            },
            {
              answer: "PICCOLO",
              hints: [
                "Was originally the evil half of Earth's guardian",
                "Trained the son of his former enemy",
                "Sacrificed himself to save a young Saiyan from a beam attack"
              ]
            },
            {
              answer: "FRIEZA",
              hints: [
                "Was resurrected with mechanical parts after being cut in half",
                "Rules over a galactic empire",
                "Destroyed a planet with a single finger"
              ]
            },
            {
              answer: "CELL",
              hints: [
                "Hosted a martial arts tournament to prove superiority",
                "Has a tail that absorbs people",
                "Created from the cells of multiple warriors"
              ]
            },
            {
              answer: "MAJIN BUU",
              hints: [
                "Was sealed away in a ball by a wizard",
                "Can regenerate from any injury",
                "Turned people into chocolate and ate them"
              ]
            },
            {
              answer: "BEERUS",
              hints: [
                "Sleeps for decades at a time",
                "Wears Egyptian-inspired clothing",
                "Destroyed half a planet because the food was too greasy"
              ]
            },
            {
              answer: "JIREN",
              hints: [
                "Only cares about becoming stronger after losing his teacher",
                "Has glowing red eyes when fighting seriously",
                "Meditated while teammates fought in a tournament"
              ]
            },
            {
              answer: "BROLY",
              hints: [
                "Power grows stronger the angrier he becomes",
                "Raised on a remote planet by his father",
                "Was stabbed as a baby and left for dead on a dying planet"
              ]
            },
            
            // Naruto Series
            {
              answer: "NARUTO UZUMAKI",
              hints: [
                "Has a demon sealed inside him since birth",
                "Wants to become the leader of his village",
                "Failed the graduation exam three times"
              ]
            },
            {
              answer: "SASUKE UCHIHA",
              hints: [
                "Left his village to gain power from a snake villain",
                "Last survivor of his clan alongside his brother",
                "Watched his entire clan get massacred by his brother"
              ]
            },
            {
              answer: "KAKASHI HATAKE",
              hints: [
                "Always late and reads adult novels in public",
                "Has a lightning technique named after birds",
                "Received his signature eye technique from a dying teammate"
              ]
            },
            {
              answer: "ITACHI UCHIHA",
              hints: [
                "Was actually a double agent protecting the village",
                "Died from a terminal illness while fighting his brother",
                "Killed his entire clan except his younger brother"
              ]
            },
            {
              answer: "MADARA UCHIHA",
              hints: [
                "Dropped two meteors on an entire army",
                "Co-founded a hidden village with his rival",
                "Faked his death and lived in hiding for decades"
              ]
            },
            {
              answer: "PAIN",
              hints: [
                "Controls six bodies simultaneously using piercings",
                "Student of one of the legendary three ninja",
                "Destroyed an entire village with one massive technique"
              ]
            },
            {
              answer: "JIRAIYA",
              hints: [
                "Writes adult novels based on his peeping research",
                "Trained three students who became legendary",
                "Died sending an encrypted message with a code"
              ]
            },
            {
              answer: "ROCK LEE",
              hints: [
                "Nearly ended his ninja career from injuries in the forest",
                "Wears green spandex and orange leg warmers",
                "Cannot use ninjutsu or genjutsu at all"
              ]
            },
            {
              answer: "MIGHT GUY",
              hints: [
                "Challenges his rival to compete in ridiculous contests",
                "Master of taijutsu and physical combat",
                "Nearly killed the strongest villain by opening all eight gates"
              ]
            },
            {
              answer: "MINATO NAMIKAZE",
              hints: [
                "Known as the Yellow Flash for his incredible speed",
                "Fourth leader of his village",
                "Sealed a demon inside his newborn son before dying"
              ]
            },
            
            // One Piece
            {
              answer: "MONKEY D LUFFY",
              hints: [
                "Punched a Celestial Dragon in the face",
                "Body is made of rubber",
                "Ate a cursed fruit that made him unable to swim"
              ]
            },
            {
              answer: "RORONOA ZORO",
              hints: [
                "Gets lost even when walking in a straight line",
                "Wants to become the world's greatest swordsman",
                "Fights with a sword in his mouth"
              ]
            },
            {
              answer: "SANJI",
              hints: [
                "Turns into stone when he sees attractive women",
                "Works as the crew's cook",
                "Refuses to use his hands in combat"
              ]
            },
            {
              answer: "NAMI",
              hints: [
                "Can predict weather changes by feeling the air",
                "Obsessed with collecting treasure",
                "Stole from pirates to buy back her village"
              ]
            },
            {
              answer: "NICO ROBIN",
              hints: [
                "Can sprout body parts anywhere she can see",
                "Only person who can read ancient language",
                "Had a bounty as a child for reading forbidden stones"
              ]
            },
            {
              answer: "PORTGAS D ACE",
              hints: [
                "His body is made of fire",
                "Was the second division commander",
                "Died protecting his younger brother from magma"
              ]
            },
            {
              answer: "WHITEBEARD",
              hints: [
                "Declared war to save one crew member",
                "Could create earthquakes and tsunamis",
                "Caused tsunamis by punching the air"
              ]
            },
            {
              answer: "SHANKS",
              hints: [
                "Stopped a war just by showing up",
                "One of the four emperors of the sea",
                "Lost his arm saving a child from a sea monster"
              ]
            },
            {
              answer: "TRAFALGAR LAW",
              hints: [
                "Named his sword after a type of demon",
                "Captain of the Heart Pirates",
                "Can swap people's personalities by cutting them"
              ]
            },
            {
              answer: "DOFLAMINGO",
              hints: [
                "Was a Celestial Dragon who got disowned",
                "Wears pink feathered coat and sunglasses",
                "Controls people like puppets with invisible strings"
              ]
            },
            
            // Attack on Titan
            {
              answer: "EREN YEAGER",
              hints: [
                "Committed genocide to protect his friends",
                "Can see memories of the past and future",
                "Watched his mother get eaten in front of him"
              ]
            },
            {
              answer: "MIKASA ACKERMAN",
              hints: [
                "Wears a red scarf given to her by her savior",
                "Considered humanity's strongest soldier alongside one other",
                "Witnessed her parents murdered as a child"
              ]
            },
            {
              answer: "LEVI ACKERMAN",
              hints: [
                "Obsessed with cleaning and cleanliness",
                "Spins while using vertical equipment",
                "Grew up in the underground city"
              ]
            },
            {
              answer: "ERWIN SMITH",
              hints: [
                "Sacrificed himself and his soldiers for a basement key",
                "Had a dream to see what was beyond the walls",
                "Lost his arm to a titan and kept commanding"
              ]
            },
            {
              answer: "REINER BRAUN",
              hints: [
                "Tried to die multiple times but kept surviving",
                "Suffers from split personality disorder",
                "Revealed his true identity while having a mental breakdown"
              ]
            },
            {
              answer: "ZEKE YEAGER",
              hints: [
                "Throws rocks like a baseball pitcher",
                "Has royal blood in his veins",
                "Turned his own parents in to the government"
              ]
            },
            
            // My Hero Academia
            {
              answer: "IZUKU MIDORIYA",
              hints: [
                "Ate a hair to gain his mentor's power",
                "Takes detailed notes on hero abilities",
                "Born without a superpower in a world where most have them"
              ]
            },
            {
              answer: "KATSUKI BAKUGO",
              hints: [
                "Creates explosions from his sweat",
                "Childhood friend turned bully of the main character",
                "Was kidnapped by villains who wanted him to join them"
              ]
            },
            {
              answer: "SHOTO TODOROKI",
              hints: [
                "Refused to use half his power to spite his father",
                "Can control both fire and ice",
                "Has a scar from being burned by his mother"
              ]
            },
            {
              answer: "ALL MIGHT",
              hints: [
                "Was severely injured and lost an organ fighting a villain",
                "Symbol of peace who always smiles",
                "Can only use his power for a few hours per day"
              ]
            },
            {
              answer: "TOMURA SHIGARAKI",
              hints: [
                "Disintegrates anything he touches with five fingers",
                "Wears hands all over his body",
                "Accidentally killed his entire family as a child"
              ]
            },
            
            // Jujutsu Kaisen
            {
              answer: "YUJI ITADORI",
              hints: [
                "Was sentenced to death immediately after gaining powers",
                "Has superhuman strength even without cursed energy",
                "Swallowed a cursed finger to save his friends"
              ]
            },
            {
              answer: "SATORU GOJO",
              hints: [
                "Was sealed in a prison cube",
                "Strongest sorcerer of the modern era",
                "Wears a blindfold because his eyes are too powerful"
              ]
            },
            {
              answer: "RYOMEN SUKUNA",
              hints: [
                "Known as the King of Curses",
                "Has four arms and two faces in true form",
                "His body was cut into twenty pieces and sealed"
              ]
            },
            {
              answer: "MEGUMI FUSHIGURO",
              hints: [
                "His father sold him to a clan",
                "Uses the Ten Shadows technique",
                "Summons shadowy creatures from his shadow"
              ]
            },
            {
              answer: "NOBARA KUGISAKI",
              hints: [
                "Moved from the countryside to the city",
                "Has a technique that uses voodoo doll principles",
                "Uses a hammer and nails as weapons"
              ]
            },
            
            // Demon Slayer
            {
              answer: "TANJIRO KAMADO",
              hints: [
                "Has an incredibly strong sense of smell",
                "Wears hanafuda earrings passed down his family",
                "Came home to find his family slaughtered"
              ]
            },
            {
              answer: "NEZUKO KAMADO",
              hints: [
                "Sleeps instead of eating to regain energy",
                "Carries a bamboo mouthpiece",
                "Turned into a demon but never ate a human"
              ]
            },
            {
              answer: "ZENITSU AGATSUMA",
              hints: [
                "Can only use one sword technique",
                "Screams and cries constantly when awake",
                "Only brave when unconscious"
              ]
            },
            {
              answer: "INOSUKE HASHIBIRA",
              hints: [
                "Wears a boar head as a mask",
                "Dual wields jagged swords",
                "Raised by wild boars in the mountains"
              ]
            },
            {
              answer: "KYOJURO RENGOKU",
              hints: [
                "Constantly yells with enthusiasm",
                "Has flame-patterned hair and coat",
                "Died protecting passengers on a train"
              ]
            },
            {
              answer: "MUZAN KIBUTSUJI",
              hints: [
                "Disguises himself as a human with a family",
                "Can change his appearance at will",
                "The first and strongest demon"
              ]
            },
            
            // Bleach
            {
              answer: "ICHIGO KUROSAKI",
              hints: [
                "His hair is naturally orange",
                "Name means one who protects",
                "Became a soul reaper by taking a sword through his chest"
              ]
            },
            {
              answer: "RUKIA KUCHIKI",
              hints: [
                "Gave her powers to a human illegally",
                "Was sentenced to execution for her crime",
                "Was adopted into a noble family from the slums"
              ]
            },
            {
              answer: "BYAKUYA KUCHIKI",
              hints: [
                "Controls a thousand tiny blades",
                "Captain of the sixth division",
                "Was disowned for marrying a commoner"
              ]
            },
            {
              answer: "SOSUKE AIZEN",
              hints: [
                "Hypnotizes anyone who sees his sword release",
                "Betrayed soul society after centuries of planning",
                "Faked his own death to frame someone else"
              ]
            },
            {
              answer: "KENPACHI ZARAKI",
              hints: [
                "Named himself after the district he's from",
                "Doesn't know his sword's name",
                "Wears an eyepatch to weaken himself"
              ]
            },
            
            // Hunter x Hunter
            {
              answer: "GON FREECSS",
              hints: [
                "Sacrificed his potential to gain temporary power",
                "Can enhance his fishing rod with special energy",
                "His father abandoned him to continue being a hunter"
              ]
            },
            {
              answer: "KILLUA ZOLDYCK",
              hints: [
                "Has a needle implanted in his brain by his brother",
                "Can turn his hands into claws",
                "Was trained to be an assassin from birth"
              ]
            },
            {
              answer: "HISOKA MOROW",
              hints: [
                "Uses playing card suits in his attacks",
                "Has a creepy obsession with strong fighters",
                "Gets excited fighting strong opponents"
              ]
            },
            {
              answer: "MERUEM",
              hints: [
                "Learned to play a board game and defeated champions",
                "King of the chimera ants",
                "Was born by eating his way out of his mother"
              ]
            },
            {
              answer: "KURAPIKA",
              hints: [
                "Last survivor of his clan's massacre",
                "Uses chains as weapons",
                "His eyes turn red when emotional"
              ]
            },
          ]
        },
        
        series: {
          id: "series",
          name: "Series",
          entries: [
            {
              answer: "DRAGON BALL Z",
              hints: [
                "Characters can destroy planets with energy beams",
                "Main power source is called ki",
                "Features transformations with spiky golden hair"
              ]
            },
            {
              answer: "NARUTO",
              hints: [
                "Main character has whisker marks on his face",
                "Set in hidden villages led by kages",
                "Set in a world of hidden ninja villages"
              ]
            },
            {
              answer: "NARUTO SHIPPUDEN",
              hints: [
                "Features an organization collecting tailed beasts",
                "Sequel series with older characters",
                "Takes place after a two year training time skip"
              ]
            },
            {
              answer: "ONE PIECE",
              hints: [
                "Characters search for a legendary treasure",
                "Set in a world of islands and pirates",
                "Main character wants to become King of the Pirates"
              ]
            },
            {
              answer: "ATTACK ON TITAN",
              hints: [
                "Giant humanoid creatures eat people",
                "Soldiers use gas-powered grappling gear",
                "Humanity lives behind three massive walls"
              ]
            },
            {
              answer: "MY HERO ACADEMIA",
              hints: [
                "Students train to become professional heroes",
                "Powers are called quirks",
                "Eighty percent of people have superpowers called quirks"
              ]
            },
            {
              answer: "JUJUTSU KAISEN",
              hints: [
                "Main character shares his body with an ancient curse",
                "Set in modern Japan with hidden sorcerers",
                "Sorcerers fight cursed spirits born from negative emotions"
              ]
            },
            {
              answer: "DEMON SLAYER",
              hints: [
                "Takes place in Taisho era Japan",
                "Main character's sister was turned into a demon",
                "Swordsmen breathe in special patterns to fight monsters"
              ]
            },
            {
              answer: "BLEACH",
              hints: [
                "Main character is a substitute working illegally",
                "Features a world of spirits and afterlife",
                "Soul reapers guide spirits to the afterlife"
              ]
            },
            {
              answer: "HUNTER X HUNTER",
              hints: [
                "Features a brutal exam with a low pass rate",
                "Special abilities are called nen",
                "Hunters are licensed professionals who hunt rare things"
              ]
            },
            {
              answer: "FULLMETAL ALCHEMIST BROTHERHOOD",
              hints: [
                "Alchemy follows the law of equivalent exchange",
                "Main characters are brothers searching for a stone",
                "Two brothers search for a stone to restore their bodies"
              ]
            },
            {
              answer: "DEATH NOTE",
              hints: [
                "Cat and mouse game between a killer and detective",
                "Features a shinigami who loves apples",
                "A notebook kills anyone whose name is written in it"
              ]
            },
            {
              answer: "TOKYO GHOUL",
              hints: [
                "Main character becomes half human half monster",
                "Set in modern Tokyo with hidden creatures",
                "Creatures that look human must eat people to survive"
              ]
            },
            {
              answer: "ONE PUNCH MAN",
              hints: [
                "Main character is bored because he's too strong",
                "Parody of superhero genre",
                "Hero who defeats any enemy with a single punch"
              ]
            },
            {
              answer: "SOLO LEVELING",
              hints: [
                "Main character can level up like in a video game",
                "Set in a world with dungeons and gates",
                "Weakest hunter becomes the strongest"
              ]
            },
          ]
        },
        
        arcs: {
          id: "arcs",
          name: "Arcs",
          entries: [
            {
              answer: "FRIEZA SAGA",
              hints: [
                "Villain destroyed the planet while fighting",
                "Features the first super saiyan transformation",
                "Took place on a planet with three suns"
              ]
            },
            {
              answer: "CELL SAGA",
              hints: [
                "Ended with a father-son energy beam clash",
                "Features a tournament hosted by a villain",
                "Android from the future warned about the threat"
              ]
            },
            {
              answer: "TOURNAMENT OF POWER",
              hints: [
                "Losing universes were erased from existence",
                "Featured fighters from eight different universes",
                "Eighty fighters competed in a battle royale"
              ]
            },
            {
              answer: "CHUNIN EXAMS",
              hints: [
                "Ended with invasion of the village",
                "Featured a written test designed to encourage cheating",
                "Three-part test to promote young ninjas"
              ]
            },
            {
              answer: "PAIN ASSAULT",
              hints: [
                "Entire village was destroyed and then restored",
                "Leader used multiple bodies in battle",
                "Six bodies attacked the hidden leaf village"
              ]
            },
            {
              answer: "FOURTH SHINOBI WAR",
              hints: [
                "The moon was used to cast a worldwide illusion",
                "Featured an army of reanimated dead warriors",
                "All five ninja villages united against a common enemy"
              ]
            },
            {
              answer: "MARINEFORD WAR",
              hints: [
                "Two legendary figures died during this war",
                "Featured the world's strongest man",
                "Massive battle to rescue a prisoner from execution"
              ]
            },
            {
              answer: "ENIES LOBBY",
              hints: [
                "Fought to rescue a crew member who turned herself in",
                "Featured a declaration of war on the government",
                "Crew declared war on the world government"
              ]
            },
            {
              answer: "WANO COUNTRY ARC",
              hints: [
                "Featured samurai and ninja fighting together",
                "Alliance fought to liberate an isolated nation",
                "Alliance invaded an island ruled by a tyrant emperor"
              ]
            },
            {
              answer: "RETURN TO SHIGANSHINA",
              hints: [
                "Commander sacrificed himself leading a suicide charge",
                "Revealed the truth about the world outside",
                "Mission to reach a basement with hidden truth"
              ]
            },
            {
              answer: "CHIMERA ANT ARC",
              hints: [
                "King was born and started playing board games",
                "Featured evolution through consumption",
                "Ants evolved by eating humans and gaining their traits"
              ]
            },
            {
              answer: "SOUL SOCIETY ARC",
              hints: [
                "Main character learned his sword's true name",
                "Featured a rescue mission to the afterlife",
                "Rescue mission to save someone from execution"
              ]
            },
            {
              answer: "MUGEN TRAIN",
              hints: [
                "A pillar died protecting everyone on board",
                "Featured a demon that controls dreams",
                "Demon trapped passengers in their dreams"
              ]
            },
            {
              answer: "SPORTS FESTIVAL",
              hints: [
                "Winner refused his prize because of family issues",
                "Featured a one-on-one tournament bracket",
                "Students compete in a tournament broadcasted nationwide"
              ]
            },
            {
              answer: "SHIBUYA INCIDENT",
              hints: [
                "Strongest sorcerer was sealed away",
                "Took place on Halloween night",
                "Curses trapped civilians in a city on Halloween"
              ]
            },
          ]
        },
        
        locations: {
          id: "locations",
          name: "Locations",
          entries: [
            {
              answer: "PLANET NAMEK",
              hints: [
                "Destroyed by a tyrant and later restored with wishes",
                "Home to a peaceful dragon-like species",
                "Planet with three suns and blue-green skies"
              ]
            },
            {
              answer: "HYPERBOLIC TIME CHAMBER",
              hints: [
                "Only accessible through a temple in the sky",
                "Extreme gravity and harsh conditions inside",
                "One day outside equals one year inside"
              ]
            },
            {
              answer: "KONOHAGAKURE",
              hints: [
                "Has faces of leaders carved into a mountain",
                "Known as the Village Hidden in the Leaves",
                "Hidden village located in the Land of Fire"
              ]
            },
            {
              answer: "VALLEY OF THE END",
              hints: [
                "Site of multiple legendary battles",
                "Features a waterfall between two cliffs",
                "Location with two massive statues facing each other"
              ]
            },
            {
              answer: "GRAND LINE",
              hints: [
                "Magnetic fields make normal navigation impossible",
                "Divided into two halves called paradise and new world",
                "Dangerous sea route that circles the world"
              ]
            },
            {
              answer: "IMPEL DOWN",
              hints: [
                "Guarded by poisonous creatures",
                "Has six levels each worse than the last",
                "Underwater prison with six levels of torture"
              ]
            },
            {
              answer: "WHOLE CAKE ISLAND",
              hints: [
                "Buildings and landscape are made of candy",
                "Ruled by one of the four emperors",
                "Island ruled by an emperor obsessed with sweets"
              ]
            },
            {
              answer: "WALL MARIA",
              hints: [
                "Breached by a colossal attacker",
                "Named after a queen",
                "Outermost barrier protecting humanity"
              ]
            },
            {
              answer: "SHIGANSHINA DISTRICT",
              hints: [
                "Has a basement with world-changing secrets",
                "Where the initial breach happened",
                "Main character's hometown on the edge of civilization"
              ]
            },
            {
              answer: "UA HIGH SCHOOL",
              hints: [
                "Has been attacked by villains multiple times",
                "Features various training facilities and zones",
                "Most prestigious hero training academy"
              ]
            },
            {
              answer: "TOKYO JUJUTSU HIGH",
              hints: [
                "Hidden from normal people by a barrier",
                "Located on a mountain in Tokyo",
                "School that trains sorcerers to fight curses"
              ]
            },
            {
              answer: "INFINITY CASTLE",
              hints: [
                "Controlled by a demon playing a musical instrument",
                "Rooms shift and rearrange constantly",
                "Endless maze of rooms that shift constantly"
              ]
            },
            {
              answer: "SOUL SOCIETY",
              hints: [
                "Divided into wealthy and poor districts",
                "Governed by a central council",
                "Afterlife where souls live after death"
              ]
            },
            {
              answer: "HEAVENS ARENA",
              hints: [
                "Top floors require special abilities to compete",
                "Fighters earn money by winning matches",
                "Tower where fighters climb floors by winning battles"
              ]
            },
            {
              answer: "CENTRAL CITY",
              hints: [
                "Hides a massive secret underground",
                "Seat of military power",
                "Capital ruled by a military government"
              ]
            },
          ]
        },
        
        specialMoves: {
          id: "specialMoves",
          name: "Special Moves",
          entries: [
            {
              answer: "KAMEHAMEHA",
              hints: [
                "Named after a Hawaiian king",
                "Taught by a turtle hermit",
                "Blue energy wave fired from both hands"
              ]
            },
            {
              answer: "SPIRIT BOMB",
              hints: [
                "Takes time to charge and requires hands raised",
                "Size depends on how much energy is gathered",
                "Gathers energy from all living things nearby"
              ]
            },
            {
              answer: "FINAL FLASH",
              hints: [
                "User spreads arms wide before firing",
                "Signature move of a Saiyan prince",
                "Yellow beam fired after gathering energy in both hands"
              ]
            },
            {
              answer: "INSTANT TRANSMISSION",
              hints: [
                "User touches two fingers to forehead",
                "Learned on an alien planet",
                "Teleports by locking onto someone's energy signature"
              ]
            },
            {
              answer: "RASENGAN",
              hints: [
                "Created by the Fourth Hokage",
                "Doesn't require hand signs to perform",
                "Spinning sphere of chakra held in palm"
              ]
            },
            {
              answer: "CHIDORI",
              hints: [
                "Requires a special eye to use safely",
                "Also called lightning blade",
                "Lightning concentrated in hand making bird sounds"
              ]
            },
            {
              answer: "SHADOW CLONE JUTSU",
              hints: [
                "Main character's signature technique",
                "Memories transfer back when clones dispel",
                "Creates physical copies that share memories when dispelled"
              ]
            },
            {
              answer: "AMATERASU",
              hints: [
                "Ignites whatever the user looks at",
                "Named after a sun goddess",
                "Black flames that burn for seven days"
              ]
            },
            {
              answer: "SUSANOO",
              hints: [
                "Can only be used with both special eyes",
                "Named after a storm god",
                "Giant warrior made of energy that surrounds the user"
              ]
            },
            {
              answer: "EIGHT GATES",
              hints: [
                "Final gate causes death after use",
                "Turns user's blood into red steam",
                "Removes body's limiters to gain overwhelming power"
              ]
            },
            {
              answer: "GUM GUM PISTOL",
              hints: [
                "Most basic attack of the main character",
                "Named after a stretchy material",
                "Stretching punch using rubber body"
              ]
            },
            {
              answer: "GEAR SECOND",
              hints: [
                "Steam rises from the user's body",
                "Turns skin pink from increased blood flow",
                "Pumps blood faster to increase speed"
              ]
            },
            {
              answer: "CONQUERORS HAKI",
              hints: [
                "Only one in a million people have this",
                "Cannot be trained only strengthened",
                "Knocks out weak-willed people with presence alone"
              ]
            },
            {
              answer: "ROOM",
              hints: [
                "Can swap people's hearts and minds",
                "User can teleport objects within the sphere",
                "Creates a sphere where user can manipulate everything"
              ]
            },
            {
              answer: "ONE FOR ALL",
              hints: [
                "Grants superhuman strength and speed",
                "Can be voluntarily passed to another person",
                "Power passed down through generations getting stronger"
              ]
            },
            {
              answer: "DETROIT SMASH",
              hints: [
                "Creates shockwaves from the impact",
                "Named after an American city by a previous user",
                "Powerful punch named after an American city"
              ]
            },
            {
              answer: "DOMAIN EXPANSION",
              hints: [
                "Highest level technique for sorcerers",
                "Requires immense cursed energy to maintain",
                "Creates a pocket dimension with guaranteed hit attacks"
              ]
            },
            {
              answer: "HOLLOW PURPLE",
              hints: [
                "Erases everything in its path",
                "Only one person can use this technique",
                "Combines two opposite techniques into one"
              ]
            },
            {
              answer: "WATER BREATHING",
              hints: [
                "Has eleven different forms",
                "Most common breathing style taught",
                "Sword style with flowing movements"
              ]
            },
            {
              answer: "THUNDER BREATHING",
              hints: [
                "User who mastered it only knows one form",
                "Fastest breathing style",
                "Lightning-fast sword style"
              ]
            },
            {
              answer: "GETSUGA TENSHO",
              hints: [
                "Main character's signature attack",
                "Name means moon fang heaven-piercer",
                "Crescent-shaped energy slash from a sword"
              ]
            },
            {
              answer: "BANKAI",
              hints: [
                "Takes ten years to master normally",
                "Makes the sword five to ten times stronger",
                "Final release of a soul reaper's sword"
              ]
            },
            {
              answer: "JAJANKEN",
              hints: [
                "Named after the Japanese word for that game",
                "Rock is an enhancement punch",
                "Rock paper scissors moves with different effects"
              ]
            },
            {
              answer: "BUNGEE GUM",
              hints: [
                "User constantly reminds people of this fact",
                "Pink and can stretch and stick",
                "Has the properties of both rubber and gum"
              ]
            },
          ]
        }
      }
    }
  }
};
