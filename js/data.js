/* =========================================================================
   HELLEVATOR — prompt bank
   -------------------------------------------------------------------------
   SCOPE: anything in base-game Terraria on any platform, past or present
   (Desktop/Console/Mobile 1.4.5, plus old-gen console & 3DS exclusives).
   No mods.

   SOURCES (verified Nov 2026):
     - Official Terraria Wiki (terraria.wiki.gg) category pages for each list,
       plus its Legacy: pages for old-gen console / 3DS exclusives.
     - The wiki's game-text dump (Module:GameText/db-en, via terrariamuzz,
       MIT-0) for exact in-game spellings. Run tools/check-data.mjs to
       re-verify every item answer against it.

   FORMAT
     id       stable string. NEVER change or reuse once shipped.
     cat      label shown above the prompt
     text     the prompt
     kind     "item" -> every answer must be a real item name (checked by test)
              "npc"  -> bosses / NPCs / critters (not in the item list)
     suffix   optional word players may drop ("potion": "Ironskin" works)
     answers  { tier: ["Name|Alias|Alias", ...] }  first name = display name
     legacy   names that only exist on old-gen console / 3DS (skip item check)
     reject   [["Name|Name", "message"], ...]  real near-misses we
              deliberately DON'T accept, with the reason shown to the player
     rulings  notes for maintainers on judgment calls

   Matching ignores case, accents, punctuation, spaces, a leading
   "the/a/an" and a trailing "s".
   ========================================================================= */

window.TIERS = [
  { key: "white",   name: "White",   label: "Common",             pts: 10,  heart: "🤍", blurb: "The answer everyone blurts out." },
  { key: "gray",    name: "Gray",    label: "Too Clever",         pts: 15,  heart: "🩶", blurb: "Felt like a deep cut. Half the server said it." },
  { key: "green",   name: "Green",   label: "Uncommon",           pts: 30,  heart: "💚", blurb: "Solid pull. You've played this game." },
  { key: "pink",    name: "Pink",    label: "Rare",               pts: 60,  heart: "🩷", blurb: "Not many people went there." },
  { key: "red",     name: "Red",     label: "Deep Cut",           pts: 85,  heart: "❤️", blurb: "Wiki-diver behavior." },
  { key: "rainbow", name: "Rainbow", label: "One in a Terrarian", pts: 100, heart: "🌈", blurb: "The gem. Bottom of the shaft." }
];

window.PROMPTS = [

  /* ---------------------------------------------------------------- */
  {
    id: "bosses", cat: "Bosses", kind: "npc",
    text: "Name a boss",
    answers: {
      white: ["Eye of Cthulhu|EoC", "Moon Lord|ML", "Skeletron", "Wall of Flesh|WoF", "King Slime|KS|Slime King"],
      gray: ["Plantera", "Golem", "Duke Fishron|Duke|Fishron", "Eater of Worlds|EoW", "Brain of Cthulhu|BoC", "Queen Bee|QB|Bee Queen"],
      green: ["The Twins|Twins", "The Destroyer|Destroyer", "Skeletron Prime|Prime", "Lunatic Cultist|Cultist", "Empress of Light|EoL|Empress", "Queen Slime|QS|Slime Queen", "Deerclops"],
      pink: ["Retinazer", "Spazmatism", "Pumpking", "Ice Queen", "Martian Saucer|Saucer", "Betsy", "Flying Dutchman|Dutchman", "Mechdusa"],
      red: ["Mourning Wood", "Everscream", "Santa-NK1|Santa NK1|SantaNK1", "Dark Mage", "Ogre", "Solar Pillar", "Nebula Pillar", "Vortex Pillar", "Stardust Pillar", "Celestial Pillars|Celestial Pillar|Lunar Pillars|Lunar Pillar|Celestial Towers|Lunar Towers"],
      rainbow: ["Ocram", "Lepus", "Turkor the Ungrateful|Turkor"]
    },
    reject: [
      ["Mothron|Dreadnautilus|Sand Elemental|Ice Golem|Wyvern|Goblin Summoner|Goblin Warlock|Headless Horseman|Pirate Captain|Mimic|Hallowed Mimic|Corrupt Mimic|Crimson Mimic|Jungle Mimic|Biome Mimic|Tim|Nymph",
       "Tough fight, but the game counts it as a regular enemy."],
      ["Torch God", "The Torch God is an event, not a boss."]
    ],
    rulings: "Boss list = wiki 'Bosses' page (33: 8 pre-HM, 10 HM, 14 event bosses incl. the 4 Celestial Pillars, Mechdusa) + Legacy:Bosses (Ocram, Lepus, Turkor). Retinazer/Spazmatism accepted on their own since the game names and tracks them separately. Wiki explicitly says Mothron, Dreadnautilus, Sand Elemental, Ice Golem and biome mimics are NOT bosses or mini-bosses."
  },

  /* ---------------------------------------------------------------- */
  {
    id: "town-npcs", cat: "NPCs", kind: "npc",
    text: "Name a town NPC",
    answers: {
      white: ["Guide", "Merchant", "Nurse", "Demolitionist|Demo", "Arms Dealer"],
      gray: ["Dryad", "Goblin Tinkerer|Goblin|Tinkerer|Bound Goblin", "Wizard|Bound Wizard", "Mechanic|Bound Mechanic", "Clothier", "Angler|Sleeping Angler", "Painter"],
      green: ["Dye Trader", "Stylist|Webbed Stylist", "Tavernkeep|Tavern Keep|Unconscious Man", "Witch Doctor", "Party Girl", "Tax Collector|Tortured Soul", "Truffle", "Steampunker", "Cyborg", "Pirate", "Santa Claus|Santa", "Golfer", "Zoologist", "Princess"],
      pink: ["Traveling Merchant|Travelling Merchant", "Town Cat|Cat", "Town Dog|Dog", "Town Bunny|Bunny"],
      red: ["Nerdy Slime", "Cool Slime", "Elder Slime", "Clumsy Slime|Clumsy Balloon Slime", "Diva Slime", "Surly Slime", "Mystic Slime|Mystic Frog", "Town Slime|Town Slimes", "Old Man", "Skeleton Merchant"],
      rainbow: ["Squire Slime"]
    },
    reject: [],
    rulings: "26 town NPCs + town pets + 8 town slimes from the wiki NPCs page. Rescue forms (Bound Goblin, Sleeping Angler, Tortured Soul...) count as the NPC they become. Traveling Merchant, Old Man and Skeleton Merchant don't live in houses but are friendly NPCs listed with the town NPCs on the wiki, so they're accepted (see open question)."
  },

  /* ---------------------------------------------------------------- */
  {
    id: "yoyos", cat: "Weapons", kind: "item",
    text: "Name a yoyo",
    answers: {
      white: ["Terrarian", "Wooden Yoyo", "Kraken"],
      gray: ["Code 1|Code One", "Code 2|Code Two", "The Eye of Cthulhu|Eye of Cthulhu", "Cascade", "Amarok"],
      green: ["Valor", "Amazon", "Rally", "Malaise", "Artery", "Chik", "Yelets", "Hel-Fire|Helfire|Hellfire", "Format:C|Format C"],
      pink: ["Hive-Five|Hive Five", "Gradient"],
      red: ["Red's Throw", "Valkyrie Yoyo|Valkyrie"]
    },
    reject: [
      ["Yoyo Bag|Magic Yoyo Bag|Yoyo Glove|Red Counterweight|Black Counterweight|Blue Counterweight|Green Counterweight|Purple Counterweight|Yellow Counterweight|Strung Counterweight|Magic String|White String|Red String|Rainbow String",
       "That's yoyo gear, not a yoyo."]
    ],
    rulings: "All 21 from the wiki Yoyos page. No version-exclusive yoyos exist."
  },

  /* ---------------------------------------------------------------- */
  {
    id: "hooks", cat: "Mobility", kind: "item", suffix: "hook",
    text: "Name a grappling hook",
    answers: {
      white: ["Grappling Hook", "Ivy Whip", "Dual Hook", "Lunar Hook"],
      gray: ["Hook of Dissonance", "Anti-Gravity Hook|Antigravity Hook", "Amethyst Hook", "Diamond Hook", "Web Slinger", "Skeletron Hand", "Slime Hook"],
      green: ["Topaz Hook", "Sapphire Hook", "Emerald Hook", "Ruby Hook", "Amber Hook", "Fish Hook", "Bat Hook", "Candy Cane Hook", "Thorn Hook", "Illuminant Hook", "Worm Hook", "Tendon Hook", "Spooky Hook", "Christmas Hook", "Static Hook"],
      pink: ["Squirrel Hook"]
    },
    reject: [
      ["Hook", "That's the crafting material. Close, though."],
      ["Hotline Fishing Hook|Lavaproof Fishing Hook", "Wrong kind of hook. That one's for fishing."]
    ],
    rulings: "All 27 from the wiki Hooks page (16 pre-HM, 11 HM). No version-exclusive hooks."
  },

  /* ---------------------------------------------------------------- */
  {
    id: "wings", cat: "Accessories", kind: "item", suffix: "wings",
    text: "Name a pair of wings",
    answers: {
      white: ["Angel Wings", "Demon Wings", "Fairy Wings", "Fishron Wings", "Empress Wings", "Solar Wings", "Stardust Wings"],
      gray: ["Leaf Wings", "Frozen Wings", "Flame Wings", "Harpy Wings", "Bat Wings", "Bee Wings", "Butterfly Wings", "Jetpack", "Hoverboard", "Vortex Booster", "Nebula Mantle"],
      green: ["Beetle Wings", "Spectre Wings|Ghost Wings", "Steampunk Wings", "Spooky Wings", "Festive Wings", "Tattered Fairy Wings", "Mothron Wings", "Bone Wings", "Betsy's Wings", "Fledgling Wings", "Celestial Starboard", "Fin Wings"],
      pink: ["Red's Wings", "D-Town's Wings", "Will's Wings", "Crowno's Wings", "Cenx's Wings", "Jim's Wings", "Loki's Wings"],
      red: ["Arkhalis' Lightwings|Arkhalis's Lightwings", "Leinfors' Prehensile Cloak", "Ghostar's Infinity Eight", "Safeman's Blanket Cape", "Lazure's Barrier Platform", "Skiphs' Paws", "Yoraiz0r's Spell|Yoraizor's Spell", "FoodBarbarian's Tattered Dragon Wings", "Grox The Great's Wings", "Chippy's Cloak", "Heroicis' Wings", "Kazzymodus' Wings", "Chicken Bones' Wings", "Luna's Runic Pixie Wings"],
      rainbow: ["Sparkly Wings"]
    },
    legacy: ["Sparkly Wings"],
    reject: [
      ["Rocket Boots|Spectre Boots|Lightning Boots|Frostspark Boots|Terraspark Boots|Soaring Insignia|Cloud in a Bottle|Gravity Globe|Shiny Red Balloon",
       "Helps you get airborne, but it isn't wings."]
    ],
    rulings: "51 from wiki Wings/List (incl. all 19 developer wings through 1.4.5) + Sparkly Wings (old-gen/3DS). 'Ghost Wings' was the old-gen name for Spectre Wings."
  },

  /* ---------------------------------------------------------------- */
  {
    id: "torches", cat: "Lighting", kind: "item", suffix: "torch",
    text: "Name a type of torch",
    answers: {
      white: ["Torch", "Ice Torch", "Demon Torch", "Cursed Torch", "Ichor Torch"],
      gray: ["Rainbow Torch", "Bone Torch", "Ultrabright Torch", "White Torch"],
      green: ["Blue Torch", "Red Torch", "Green Torch", "Purple Torch", "Yellow Torch", "Orange Torch", "Pink Torch", "Jungle Torch", "Desert Torch", "Corrupt Torch", "Crimson Torch", "Hallowed Torch", "Mushroom Torch", "Coral Torch"],
      pink: ["Aether Torch|Shimmer Torch"],
      rainbow: ["Tiki Torch"]
    },
    reject: [
      ["Torch God's Favor|Torch God's Flavor|Torch God", "Very torch-adjacent. Still not a torch."],
      ["Glowstick|Spelunker Glowstick|Sticky Glowstick|Bouncy Glowstick|Flare|Candle|Lamp|Lantern", "It's a light source, not a torch."]
    ],
    rulings: "24 torch types from the wiki Torches page. Tiki Torch is furniture (a lamp-type light) but it's literally a torch, so it's the gem."
  },

  /* ---------------------------------------------------------------- */
  {
    id: "food", cat: "Food", kind: "item",
    text: "Name a food",
    answers: {
      white: ["Apple", "Banana", "Cooked Fish", "Burger", "Pizza", "Bacon", "Golden Delight", "Steak", "Hotdog|Hot Dog"],
      gray: ["Pumpkin Pie", "Sashimi", "Bowl of Soup|Soup", "Cooked Shrimp", "Seafood Dinner", "Monster Lasagna|Lasagna", "Grub Soup", "Coffee", "Ice Cream", "Spaghetti", "Milkshake", "BBQ Ribs|Ribs|Barbecue Ribs", "Marshmallow", "Cooked Marshmallow"],
      green: ["Apricot", "Cherry", "Coconut", "Grapefruit", "Lemon", "Mango", "Peach", "Pineapple", "Plum", "Pomegranate", "Dragon Fruit", "Star Fruit|Starfruit", "Blood Orange", "Elderberry", "Blackcurrant", "Rambutan", "Spicy Pepper", "Bunny Stew", "Grilled Squirrel", "Roasted Bird", "Roasted Duck", "Sauteed Frog Legs|Frog Legs", "Fruit Juice", "Fruit Salad", "Apple Juice", "Lemonade", "Grape Juice", "Grapes", "Fries|French Fries", "Nachos", "Chicken Nugget", "Fried Egg", "Apple Pie", "Sugar Cookie", "Gingerbread Cookie", "Christmas Pudding", "Chocolate Chip Cookie", "Banana Split", "Pad Thai", "Pho", "Lobster Tail", "Escargot", "Froggle Bunwich", "Potato Chips|Chips", "Cream Soda", "Carton of Milk|Milk"],
      pink: ["Peach Sangria", "Bloody Moscato", "Frozen Banana Daiquiri|Banana Daiquiri", "Piña Colada", "Smoothie of Darkness", "Tropical Smoothie", "Prismatic Punch", "Shrimp Po' Boy|Po' Boy", "Shucked Oyster"],
      red: ["Teacup", "Blackened Fish", "Rock Candy"],
      rainbow: ["Joja Cola"]
    },
    reject: [
      ["Ale|Sake|Eggnog|Wiesnbräu", "You can drink it, but the game files it as a potion, not food."],
      ["Mushroom|Bottled Honey|Bottled Water|Honeyfin|Jungle Juice", "That's a healing potion as far as the game's concerned."],
      ["Life Fruit|Aegis Fruit|Ambrosia|Gummy Worm|Galaxy Pearl|Artisan Loaf", "Edible-ish, but it's a permanent upgrade, not food."],
      ["Oyster", "Open it first. The shucked version counts."],
      ["Pumpkin", "An ingredient, not food on its own."]
    ],
    rulings: "Game definition: food = anything granting Well Fed / Plenty Satisfied / Exquisitely Stuffed. All 82 from the wiki Food page (incl. 1.4.5 Blackened Fish and Rock Candy). Wiki explicitly says Ale, Sake, Eggnog and Wiesnbräu are NOT food."
  },

  /* ---------------------------------------------------------------- */
  {
    id: "potions", cat: "Alchemy", kind: "item", suffix: "potion",
    text: "Name a potion",
    answers: {
      white: ["Healing Potion", "Mana Potion", "Ironskin Potion", "Regeneration Potion", "Swiftness Potion", "Lesser Healing Potion", "Greater Healing Potion"],
      gray: ["Recall Potion", "Gravitation Potion", "Spelunker Potion", "Super Healing Potion", "Wormhole Potion", "Teleportation Potion", "Obsidian Skin Potion", "Endurance Potion", "Lifeforce Potion", "Rage Potion", "Wrath Potion"],
      green: ["Gills Potion", "Night Owl Potion", "Featherfall Potion", "Shine Potion", "Hunter Potion", "Battle Potion", "Thorns Potion", "Water Walking Potion", "Archery Potion", "Mana Regeneration Potion", "Magic Power Potion", "Invisibility Potion", "Heartreach Potion", "Inferno Potion", "Titan Potion", "Warmth Potion", "Builder Potion", "Calming Potion", "Crate Potion", "Dangersense Potion", "Fishing Potion", "Mining Potion", "Sonar Potion", "Summoning Potion", "Flipper Potion", "Ammo Reservation Potion", "Restoration Potion", "Lesser Mana Potion", "Greater Mana Potion", "Super Mana Potion"],
      pink: ["Lesser Luck Potion", "Luck Potion", "Greater Luck Potion", "Biome Sight Potion", "Potion of Return|Return Potion", "Love Potion", "Stink Potion", "Gender Change Potion", "Bottled Honey", "Bottled Water", "Mushroom", "Strange Brew", "Ale", "Sake"],
      red: ["Flask of Venom", "Flask of Cursed Flames", "Flask of Fire", "Flask of Gold", "Flask of Ichor", "Flask of Nanites", "Flask of Party", "Flask of Poison", "Eggnog", "Honeyfin", "Jungle Juice", "Torch God's Flavor"],
      rainbow: ["Red Potion", "Lesser Restoration Potion", "Wiesnbräu"]
    },
    legacy: ["Wiesnbräu", "Lesser Restoration Potion"],
    reject: [
      ["Potion Statue|Decorative Healing Potion|Decorative Mana Potion", "That's decor. You can't drink it."],
      ["Bottle|Alchemy Table|Placed Bottle", "That's what you brew with, not what you brew."]
    ],
    rulings: "Everything on the wiki Potions page's recovery, mana, buff, flask and 'other' lists (Ale/Sake are Tipsy buff potions; Mushroom, Bottled Water/Honey, Honeyfin, Eggnog are recovery potions). Food is also technically a potion in the game's code but is NOT accepted here (see open question). Lesser Restoration Potion + Wiesnbräu are old-gen/3DS."
  },

  /* ---------------------------------------------------------------- */
  {
    id: "ores", cat: "Mining", kind: "item", suffix: "ore",
    text: "Name an ore",
    answers: {
      white: ["Copper Ore", "Iron Ore", "Gold Ore", "Silver Ore"],
      gray: ["Hellstone", "Demonite Ore", "Crimtane Ore", "Chlorophyte Ore", "Adamantite Ore", "Titanium Ore", "Cobalt Ore", "Mythril Ore|Mithril Ore"],
      green: ["Tin Ore", "Lead Ore", "Tungsten Ore", "Platinum Ore", "Palladium Ore", "Orichalcum Ore", "Luminite"],
      pink: ["Meteorite"],
      red: ["Obsidian"]
    },
    reject: [
      ["Copper Bar|Tin Bar|Iron Bar|Lead Bar|Silver Bar|Tungsten Bar|Gold Bar|Platinum Bar|Demonite Bar|Crimtane Bar|Meteorite Bar|Hellstone Bar|Cobalt Bar|Palladium Bar|Mythril Bar|Orichalcum Bar|Adamantite Bar|Titanium Bar|Chlorophyte Bar|Luminite Bar|Hallowed Bar|Shroomite Bar|Spectre Bar",
       "That's a bar. Back up one step."],
      ["Amethyst|Topaz|Sapphire|Emerald|Ruby|Diamond|Amber", "Gems aren't ores in Terraria."],
      ["Silt Block|Slush Block|Desert Fossil|Silt|Slush", "Extractinator fodder, not ore."]
    ],
    rulings: "All 21 from the wiki 'Ore items' category, which includes Obsidian, Meteorite, Hellstone and Luminite."
  },

  /* ---------------------------------------------------------------- */
  {
    id: "critters", cat: "Critters", kind: "npc",
    text: "Name a critter",
    answers: {
      white: ["Bunny", "Bird", "Squirrel", "Butterfly", "Worm", "Frog", "Duck|White Duck", "Goldfish"],
      gray: ["Gold Bunny", "Truffle Worm", "Firefly", "Snail", "Mouse", "Penguin"],
      green: ["Scorpion", "Grasshopper", "Glowing Snail", "Lightning Bug", "Owl", "Seagull", "Turtle", "Ladybug", "Cardinal", "Blue Jay", "Red Squirrel", "Gold Bird", "Gold Frog", "Gold Worm", "Gold Mouse", "Gold Squirrel", "Gold Grasshopper", "Gold Butterfly", "Seahorse", "Explosive Bunny", "Rat", "Black Scorpion", "Prismatic Lacewing", "Mallard Duck", "Pupfish", "Grebe", "Water Strider", "Jungle Turtle", "Monarch Butterfly", "Sea Turtle", "Dolphin", "Pufferfish"],
      pink: ["Grubby", "Sluggy", "Buggy", "Maggot", "Lavafly", "Magma Snail", "Hell Butterfly", "Toucan", "Scarlet Macaw", "Blue Macaw", "Yellow Cockatiel", "Gray Cockatiel|Grey Cockatiel", "Enchanted Nightcrawler", "Stinkbug", "Blue Fairy", "Green Fairy", "Pink Fairy",
             "Julia Butterfly", "Purple Emperor Butterfly", "Red Admiral Butterfly", "Sulphur Butterfly", "Tree Nymph Butterfly", "Ulysses Butterfly", "Zebra Swallowtail Butterfly",
             "Black Dragonfly", "Blue Dragonfly", "Green Dragonfly", "Orange Dragonfly", "Red Dragonfly", "Yellow Dragonfly",
             "Amethyst Bunny", "Topaz Bunny", "Sapphire Bunny", "Emerald Bunny", "Ruby Bunny", "Diamond Bunny", "Amber Bunny",
             "Amethyst Squirrel", "Topaz Squirrel", "Sapphire Squirrel", "Emerald Squirrel", "Ruby Squirrel", "Diamond Squirrel", "Amber Squirrel"],
      red: ["Gold Goldfish", "Gold Seahorse", "Gold Water Strider", "Gold Dragonfly", "Gold Ladybug", "Mystic Frog"],
      rainbow: ["Faeling"]
    },
    reject: [
      ["Corrupt Bunny|Vicious Bunny|Crimson Bunny|Corrupt Goldfish|Vicious Goldfish|Crimson Goldfish|Corrupt Penguin|Vicious Penguin|Crimson Penguin",
       "That's what a critter turns into during a Blood Moon. It's an enemy now."],
      ["Town Cat|Town Dog|Town Bunny", "That's a town pet, not a critter."],
      ["Dragonfly|Fairy|Macaw|Cockatiel|Gem Bunny|Gem Squirrel", "The game only names specific kinds of those. Be more specific."]
    ],
    rulings: "96 critters from the wiki Critters page (incl. every butterfly, dragonfly, fairy, gem and gold variant). Generic names only count when the game itself uses them as an NPC name: Butterfly (NPC 356), Duck, Goldfish do; Dragonfly, Fairy, Macaw, Cockatiel, Gem Bunny/Squirrel don't (wiki NPC IDs page), so those get a 'be more specific' nudge. Dolphin, Mystic Frog and Sea Turtle can't be netted but are still critters."
  },

  /* ---------------------------------------------------------------- */
  {
    id: "slime-items", cat: "Names", kind: "item",
    text: "Name an item with \"Slime\" in its name",
    answers: {
      white: ["Slime Crown", "Slime Staff", "Slime Hook", "Slime Gun", "Slime Block"],
      gray: ["King Slime Trophy", "King Slime Mask", "King Slime Relic", "Queen Slime Mask", "Queen Slime Trophy", "Queen Slime Relic", "Slime Statue"],
      green: ["Slime Chair", "Slime Table", "Slime Bed", "Slime Door", "Slime Work Bench|Slime Workbench", "Slime Chest", "Slime Platform", "Slime Bathtub", "Slime Bookcase", "Slime Candelabra", "Slime Candle", "Slime Chandelier", "Slime Clock", "Slime Dresser", "Slime Lamp", "Slime Lantern", "Slime Piano", "Slime Sofa", "Slime Sink", "Slime Toilet",
              "Pink Slime Block", "Frozen Slime Block", "Slime Block Wall", "Trapped Slime Chest", "Slimefish",
              "Treasure Bag (King Slime)|King Slime Treasure Bag|King Slime Bag", "Treasure Bag (Queen Slime)|Queen Slime Treasure Bag|Queen Slime Bag",
              "Music Box (King Slime)|King Slime Music Box", "Music Box (Queen Slime)|Queen Slime Music Box", "Music Box (Slime Rain)|Slime Rain Music Box"],
      pink: ["Slime Spear", "Slime Whip", "Blue Slime Banner", "Green Slime Banner", "Purple Slime Banner", "Red Slime Banner", "Yellow Slime Banner", "Black Slime Banner", "Ice Slime Banner", "Jungle Slime Banner", "Lava Slime Banner", "Mother Slime Banner", "Dungeon Slime Banner", "Corrupt Slime Banner", "Illuminant Slime Banner", "Rainbow Slime Banner", "Sand Slime Banner", "Spiked Ice Slime Banner", "Spiked Jungle Slime Banner"],
      red: ["The Sands of Slime|Sands of Slime", "Sparkle Slime Balloon", "Crimslime Banner", "Slimer Banner", "Shimmer Slime Banner", "Umbrella Slime Banner"],
      rainbow: ["Slime Banner"]
    },
    legacy: ["Slime Banner"],
    reject: [
      ["Slimy Saddle", "So close. It says Slimy, not Slime."],
      ["Gel|Pink Gel|Royal Gel|Volatile Gelatin|Gelatin Crystal", "Very slimy. No \"Slime\" in the name, though."]
    ],
    rulings: "Mechanical: every item in the game-text dump containing 'slime' (67) + the old-gen/3DS 'Slime Banner'. Treasure bags and music boxes accept both the in-game name and the natural word order."
  },

  /* ---------------------------------------------------------------- */
  {
    id: "quest-fish", cat: "Fishing", kind: "item",
    text: "Name a fish the Angler asks you to catch",
    answers: {
      white: ["Clownfish", "Angelfish", "Catfish", "Bunnyfish", "Fishron"],
      gray: ["Dirtfish", "Slimefish", "Zombie Fish", "Derpfish", "Batfish", "Bonefish"],
      green: ["Mudfish", "Pengfish", "Harpyfish", "Cloudfish", "Spiderfish", "Unicorn Fish", "Fallen Starfish", "Dynamite Fish", "Fishotron", "Hungerfish", "Mirage Fish", "Pixiefish", "Jewelfish", "Wyverntail|Whyverntail", "Bumblebee Tuna", "Tundra Trout", "Tropical Barracuda", "Cursedfish", "Ichorfish"],
      pink: ["Eater of Plankton", "Guide Voodoo Fish", "Demonic Hellfish", "Infected Scabbardfish", "Bloody Manowar|Bloody Man-O-War", "Scarab Fish", "Scorpio Fish", "Mutant Flinxfin", "Amanita Fungifin|Amanitia Fungifin", "The Fish of Cthulhu|Fish of Cthulu"],
      rainbow: ["Cap'n Tunabeard|Captain Tunabeard"]
    },
    reject: [
      ["Bass|Trout|Tuna|Salmon|Red Snapper|Flounder|Neon Tetra|Atlantic Cod|Golden Carp|Armored Cavefish|Chaos Fish|Crimson Tigerfish|Damselfish|Double Cod|Ebonkoi|Frost Minnow|Hemopiranha|Princess Fish|Prismite|Specular Fish|Stinkfish|Variegated Lardfish|Rockfish|Sawtooth Shark|Swordfish|Zephyr Fish|Goldfish",
       "Real fish, but not one the Angler ever asks for."]
    ],
    rulings: "All 41 from the wiki Angler/Quests list. Old names (Amanitia Fungifin, Whyverntail) still accepted."
  }
];
