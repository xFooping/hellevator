/* =========================================================================
   HELLEVATOR — prompt batch 1 (25 prompts). Same format as js/data.js.
   Membership from terraria.wiki.gg list pages; names checked against the
   game-text dump by tools/check-data.mjs. kind "pair" = name OR summon item.
   ========================================================================= */
window.PROMPTS.push(
  {
    id: "whips", cat: "Weapons", kind: "item",
    text: "Name a whip",
    answers: {
      white: ["Leather Whip", "Firecracker", "Kaleidoscope"],
      gray: ["Snapthorn", "Spinal Tap"],
      green: ["Cool Whip", "Durendal", "Dark Harvest", "Morning Star"],
      pink: ["Cobwhip", "Soulscourge", "Vasculash", "Starcrash", "Slime Whip", "Electric Eel", "Possession", "Vulgar Display of Flower"],
      red: ["Constellation"]
    },
    reject: [["Blade Staff|Slime Staff|Imp Staff|Terraprisma", "Summoner gear, yes. Whip, no."]],
    rulings: "All 18 from the wiki Whips page (9 added in 1.4.5)."
  },
  {
    id: "boomerangs", cat: "Weapons", kind: "item",
    text: "Name a boomerang",
    answers: {
      white: ["Wooden Boomerang", "Enchanted Boomerang", "Flamarang"],
      gray: ["Light Disc", "Bananarang", "Thorn Chakram", "Ice Boomerang"],
      green: ["Shroomerang", "Trimarang", "Bloody Machete", "Possessed Hatchet", "Combat Wrench"],
      pink: ["Fruitcake Chakram", "Sergeant United Shield"],
      red: ["Axearang"]
    },
    reject: [["Paladin's Hammer", "It comes back, but it's a hammer."], ["Boomstick", "Different kind of boom. That's a shotgun."]],
    rulings: "All 15 from the wiki Boomerangs page (Axearang added in 1.4.5)."
  },
  {
    id: "spears", cat: "Weapons", kind: "item",
    text: "Name a spear",
    answers: {
      white: ["Spear", "Trident", "Dark Lance", "Gungnir"],
      gray: ["Swordfish", "North Pole", "The Rotted Fork|Rotted Fork"],
      green: ["Cobalt Naginata", "Palladium Pike", "Mythril Halberd", "Orichalcum Halberd", "Adamantite Glaive", "Titanium Trident", "Chlorophyte Partisan", "Mushroom Spear"],
      pink: ["Obsidian Swordfish", "Ghastly Glaive", "Storm Spear"],
      red: ["Slime Spear"],
      rainbow: ["Tonbogiri"]
    },
    legacy: ["Tonbogiri"],
    reject: [["Daybreak|Unholy Trident", "Pointy, but it isn't a spear."]],
    rulings: "All 19 from the wiki Spears page + Tonbogiri (old-gen/3DS). Daybreak is a thrown javelin and Unholy Trident is a magic weapon."
  },
  {
    id: "flails", cat: "Weapons", kind: "item",
    text: "Name a flail",
    answers: {
      white: ["Ball O' Hurt|Ball of Hurt", "Sunfury", "The Meatball|Meatball"],
      gray: ["Flower Pow", "Golem Fist", "Mace", "Flaming Mace"],
      green: ["Blue Moon", "Dao of Pow", "KO Cannon|K.O. Cannon", "Chain Guillotines", "Drippler Crippler", "Anchor", "Chain Knife", "Flairon"],
      red: ["Flairoon"]
    },
    reject: [["Morning Star", "Spiky ball on a chain, but the game calls it a whip."]],
    rulings: "All 16 from the wiki Flails page (thrown + launched). Flairoon is the 1.4.5 alternate mode of the Flairon."
  },
  {
    id: "bows", cat: "Weapons", kind: "item",
    text: "Name a bow",
    answers: {
      white: ["Wooden Bow", "Tsunami", "Phantasm", "Daedalus Stormbow", "Molten Fury", "Demon Bow", "Tendon Bow"],
      gray: ["Hellwing Bow", "Marrow", "Pulse Bow", "Eventide", "Shadowflame Bow", "Ice Bow"],
      green: ["Copper Bow", "Tin Bow", "Iron Bow", "Lead Bow", "Silver Bow", "Tungsten Bow", "Gold Bow", "Platinum Bow", "The Bee's Knees|Bee's Knees", "Blood Rain Bow", "Aerial Bane", "Phantom Phoenix", "Boreal Wood Bow", "Palm Wood Bow", "Rich Mahogany Bow", "Ebonwood Bow", "Shadewood Bow", "Pearlwood Bow"],
      pink: ["Ash Wood Bow"],
      rainbow: ["Sharanga"]
    },
    legacy: ["Sharanga"],
    reject: [["Cobalt Repeater|Palladium Repeater|Mythril Repeater|Orichalcum Repeater|Adamantite Repeater|Titanium Repeater|Hallowed Repeater|Chlorophyte Shotbow|Stake Launcher|Vulcan Repeater", "That's a repeater. Close cousin, wrong prompt."]],
    rulings: "All 32 from the wiki Bows page + Sharanga (old-gen/3DS). Repeaters are their own weapon class."
  },
  {
    id: "guns", cat: "Weapons", kind: "item",
    text: "Name a gun",
    answers: {
      white: ["Minishark", "Megashark", "Handgun", "Boomstick", "Musket", "S.D.M.G.|SDMG"],
      gray: ["Phoenix Blaster", "Shotgun", "Uzi", "Sniper Rifle", "Revolver", "Flintlock Pistol", "Clockwork Assault Rifle"],
      green: ["Quad-Barrel Shotgun", "Tactical Shotgun", "Chain Gun", "Gatligator", "Onyx Blaster", "Venus Magnum", "Vortex Beater", "Xenopopper", "The Undertaker|Undertaker", "Candy Corn Rifle"],
      pink: ["Red Ryder", "Pew-matic Horn|Pewmatic Horn"]
    },
    reject: [["Grenade Launcher|Rocket Launcher|Star Cannon|Flamethrower|Snowball Cannon|Celebration|Electrosphere Launcher|Proximity Mine Launcher", "Shoots things, but the game files it under launchers."]],
    rulings: "All 25 from the wiki Guns page. Launchers and Flamethrower are a separate class."
  },
  {
    id: "minions", cat: "Summoning", kind: "item",
    text: "Name an item that summons a minion",
    answers: {
      white: ["Slime Staff", "Imp Staff", "Hornet Staff", "Stardust Dragon Staff", "Terraprisma", "Optic Staff"],
      gray: ["Spider Staff", "Pygmy Staff", "Raven Staff", "Xeno Staff", "Deadly Sphere Staff", "Tempest Staff", "Blade Staff", "Abigail's Flower"],
      green: ["Finch Staff", "Flinx Staff", "Vampire Frog Staff", "Desert Tiger Staff", "Pirate Staff", "Sanguine Staff", "Stardust Cell Staff"],
      pink: ["Mushroom Staff", "Clay Bud Staff", "Ruinous Staff", "Cattiva", "Foxparks"],
      red: ["Trusty Cattiva", "Trusty Foxparks"]
    },
    reject: [["Queen Spider Staff|Staff of the Frost Hydra|Rainbow Crystal Staff|Lunar Portal Staff|Houndius Shootius|Flameburst Rod|Ballista Rod|Lightning Aura Rod|Explosive Trap Rod", "That's a sentry. It just stands there."], ["Leather Whip|Firecracker|Kaleidoscope|Snapthorn|Durendal|Morning Star", "That's a whip. Summoner, yes. Minion, no."]],
    rulings: "All 28 minion items from the wiki Minions page (7 added in 1.4.5 incl. the Palworld Cattiva/Foxparks). Sentries excluded."
  },
  {
    id: "fishing-poles", cat: "Fishing", kind: "item",
    text: "Name a fishing pole",
    answers: {
      white: ["Wood Fishing Pole|Wooden Fishing Pole", "Golden Fishing Rod", "Hotline Fishing Hook"],
      gray: ["Reinforced Fishing Pole", "Fisher of Souls", "Fleshcatcher", "Sitting Duck's Fishing Pole"],
      green: ["Fiberglass Fishing Pole", "Mechanic's Rod"],
      pink: ["Chum Caster", "Scarab Fishing Rod"]
    },
    rulings: "All 11 from the wiki Fishing poles page."
  },
  {
    id: "boss-summons", cat: "Bosses", kind: "item",
    text: "Name an item that summons a boss",
    answers: {
      white: ["Suspicious Looking Eye", "Slime Crown", "Guide Voodoo Doll", "Worm Food", "Mechanical Eye"],
      gray: ["Bloody Spine", "Abeemination", "Mechanical Worm", "Mechanical Skull", "Celestial Sigil"],
      green: ["Truffle Worm", "Lihzahrd Power Cell", "Gelatin Crystal", "Deer Thing"],
      pink: ["Prismatic Lacewing", "Clothier Voodoo Doll"],
      red: ["Ocram's Razor", "Pumpkin Moon Medallion", "Naughty Present", "Eternia Crystal", "Pirate Map"],
      rainbow: ["Suspicious Looking Skull", "Suspicious Looking Egg", "Cursed stuffing|Cursed Stuffing"]
    },
    legacy: ["Suspicious Looking Skull", "Suspicious Looking Egg", "Cursed stuffing"],
    reject: [["Goblin Battle Standard|Snow Globe|Solar Tablet|Bloody Tear", "That starts an event, but nothing in it counts as a boss."]],
    rulings: "Wiki 'Boss summon items' category + old-gen/3DS summons for Ocram, Lepus, Turkor. Event items count only when the event contains an event boss (Pumpking/Ice Queen/Betsy/Flying Dutchman), consistent with the bosses prompt."
  },
  {
    id: "merchant", cat: "Shops", kind: "item",
    text: "Name something the Merchant sells",
    answers: {
      white: ["Torch", "Lesser Healing Potion", "Rope", "Piggy Bank", "Mining Helmet", "Copper Pickaxe"],
      gray: ["Iron Anvil", "Bug Net", "Wooden Arrow", "Shuriken", "Copper Axe", "Glowstick", "Lesser Mana Potion", "Safe"],
      green: ["Sickle", "Healing Potion", "Mana Potion", "Marshmallow", "Throwing Knife", "Flare", "Blue Flare", "Sharpening Station", "Disco Ball", "Gold Dust", "Furnace"],
      pink: ["Pin Wheel|Pinwheel", "Rainbow Glowstick", "Drum Set", "Drumstick", "Nail", "Forest Pylon", "Jungle Pylon", "Hallow Pylon", "Cavern Pylon", "Ocean Pylon", "Desert Pylon", "Snow Pylon", "Mushroom Pylon"],
      red: ["Jungle Torch"]
    },
    reject: [["Pylon", "Which one? Name the pylon."]],
    rulings: "All 32 rows of the wiki Merchant shop incl. conditional stock (Jungle Torch only in Not the Bees worlds). 'Any Pylon' expanded to the 8 NPC-sold pylons."
  },
  {
    id: "plantera-drops", cat: "Loot", kind: "item",
    text: "Name something Plantera drops",
    answers: {
      white: ["Temple Key", "Grenade Launcher", "Seedler", "Leaf Blower", "Venus Magnum"],
      gray: ["Pygmy Staff", "Flower Pow", "Nettle Burst", "Wasp Gun", "The Axe", "Thorn Hook"],
      green: ["Seedling", "Spore Sac", "Plantera Mask", "Plantera Trophy", "Treasure Bag (Plantera)|Plantera Treasure Bag|Plantera Bag", "Greater Healing Potion"],
      pink: ["Plantera Relic", "Plantera Seedling", "Vulgar Display of Flower", "Rocket I|Rocket 1"],
      red: ["Picksaw", "Lihzahrd Brick", "Lihzahrd Altar", "Forbidden Lihzahrd Brick Wall"]
    },
    rulings: "Wiki Plantera drop tables incl. Expert/Master and the no-Jungle-Temple fallback (Picksaw, bricks, altar)."
  },
  {
    id: "wof-drops", cat: "Loot", kind: "item",
    text: "Name something the Wall of Flesh drops",
    answers: {
      white: ["Pwnhammer", "Warrior Emblem", "Ranger Emblem", "Sorcerer Emblem", "Summoner Emblem"],
      gray: ["Breaker Blade", "Laser Rifle", "Clockwork Assault Rifle", "Demon Heart"],
      green: ["Firecracker", "Healing Potion", "Wall of Flesh Mask", "Wall of Flesh Trophy", "Treasure Bag (Wall of Flesh)|Wall of Flesh Treasure Bag|Wall of Flesh Bag"],
      pink: ["Wall of Flesh Relic", "Goat Skull"],
      rainbow: ["Badger's Hat"]
    },
    reject: [["Emblem", "Which one? Name the emblem."]],
    rulings: "Wiki Wall of Flesh drop tables. Badger's Hat only drops if WoF dies the same day as the Eye of Cthulhu."
  },
  {
    id: "stations", cat: "Crafting", kind: "item",
    text: "Name a crafting station",
    answers: {
      white: ["Work Bench|Workbench", "Furnace", "Iron Anvil|Anvil", "Lead Anvil", "Hellforge"],
      gray: ["Mythril Anvil", "Orichalcum Anvil", "Adamantite Forge", "Titanium Forge", "Tinkerer's Workshop", "Ancient Manipulator", "Demon Altar", "Crimson Altar"],
      green: ["Alchemy Table", "Bottle|Placed Bottle", "Loom", "Sawmill", "Cooking Pot", "Cauldron", "Keg", "Dye Vat", "Heavy Assembler|Heavy Work Bench", "Imbuing Station", "Crystal Ball", "Autohammer", "Bookcase", "Campfire"],
      pink: ["Teapot", "Blend-O-Matic|Blendomatic", "Meat Grinder", "Bone Welder", "Glass Kiln", "Honey Dispenser", "Ice Machine", "Living Loom", "Sky Mill", "Solidifier", "Flesh Cloning Vat", "Decay Chamber", "Steampunk Boiler", "Lihzahrd Furnace", "Alchemy Flask"],
      red: ["Sink", "Water", "Lava", "Honey", "Extractinator", "Chlorophyte Extractinator"],
      rainbow: ["Shimmer", "Toilet"]
    },
    nonItem: ["Sink", "Water", "Lava", "Honey", "Shimmer", "Toilet"],
    rulings: "Wiki Crafting stations page, incl. its Liquids (water/lava/honey) and Other rows (Extractinators, Shimmer, Toilets). 'Heavy Work Bench' was renamed Heavy Assembler in 1.4.5. There is no 'Tea Kettle'; the station is the Teapot."
  },
  {
    id: "mounts", cat: "Mobility", kind: "pair",
    text: "Name a mount",
    answers: {
      white: ["Slime|Slimy Saddle|Slime Mount", "Bunny|Fuzzy Carrot|Bunny Mount", "Unicorn|Blessed Apple", "UFO|Cosmic Car Key", "Minecart"],
      gray: ["Bee|Honeyed Goggles|Bee Mount", "Cute Fishron|Shrimpy Truffle", "Pigron|Scaly Truffle", "Turtle|Hardy Saddle", "Drill|Drill Containment Unit|Drill Mount", "Basilisk|Ancient Horn", "Witch's Broom"],
      green: ["Wolf|Lilith's Necklace", "Bat|Amulet of the Night", "Pixie|Enchanted Pixie Dust", "Winged Slime|Gelatinous Pillion", "Rudolph|Reindeer Bells", "Scutlix|Brain Scrambler", "Golf Cart|Golf Cart Keys", "Painted Horse|Dusty Rawhide Saddle", "Majestic Horse|Royal Gilded Saddle", "Dark Horse|Black Studded Saddle", "Lava Shark|Superheated Blood", "Velociraptor|Slasher's Mysterious Skull", "Rat|Cursed Piper Flute", "Flamingo|Mollusk Whistle", "Pogo Stick"],
      pink: ["Book|Dark Mage's Tome", "Goat|Goat Skull", "Pirate Ship|The Black Spot", "Tree|Hexxed Branch", "Santank|Toy Tank", "Blue Roller Skates", "Green Roller Skates", "Classic Roller Skates", "Party Roller Skates", "Chillet", "Chillet Ignis", "Digtoise"],
      red: ["Trusty Chillet", "Trusty Chillet Ignis", "Trusty Digtoise", "Mechanical Cart", "Desert Minecart", "Minecarp", "Bee Minecart", "Ladybug Minecart", "Pigron Minecart", "Sunflower Minecart", "Demonic Hellcart", "Shroom Minecart", "Amethyst Minecart", "Topaz Minecart", "Sapphire Minecart", "Emerald Minecart", "Ruby Minecart", "Diamond Minecart", "Amber Minecart", "Beetle Minecart", "Meowmere Minecart", "Party Wagon", "The Dutchman|Dutchman", "Steampunk Minecart", "Coffin Minecart", "Digging Molecart", "Fart Kart"],
      rainbow: ["Terra Fart Kart"]
    },
    rulings: "Wiki Mounts page: 39 mounts + 27 minecarts, plus 1.4.5 Digtoise/Trusty Digtoise (in game data, missing from the wiki table). The mount's name OR its summoning item both count."
  },
  {
    id: "pets", cat: "Pets", kind: "pair",
    text: "Name a pet",
    answers: {
      white: ["Bunny|Carrot", "Black Cat|Unlucky Yarn", "Puppy|Dog Whistle", "Baby Dinosaur|Amber Mosquito", "Baby Penguin|Fish", "Parrot|Parrot Cracker", "Turtle|Seaweed", "Lizard|Lizard Egg", "Spider|Spider Egg", "Shadow Orb", "Fairy|Fairy Bell"],
      gray: ["Baby Eater|Eater's Bone", "Baby Face Monster|Bone Rattle", "Baby Skeletron Head|Bone Key", "Baby Hornet|Nectar", "Zephyr Fish", "Eyeball Spring|Eye Spring", "Baby Truffle|Strange Glowing Mushroom", "Sapling|Seedling", "Companion Cube", "Wisp|Wisp in a Bottle", "Crimson Heart", "Magic Lantern", "Suspicious Looking Tentacle"],
      green: ["Baby Grinch|Baby Grinch's Mischief Whistle", "Baby Imp|Slice of Hell Cake", "Baby Red Panda|Bamboo Leaf", "Baby Snowman|Toy Sled", "Baby Werewolf|Full Moon Squeaky Toy", "Cursed Sapling", "Dynamite Kitten|Ball O' Fuse Wire", "Estee|Celestial Wand", "Faun|Beguiling Lyre", "Fennec Fox|Exotic Chew Toy", "Glittery Butterfly|Bedazzled Nectar", "Hoardagron|Dragon Egg", "Lil' Harpy|Birdie Rattle", "Plantero|Mud Bud", "Propeller Gato|Gato Egg", "Shadow Mimic|Ornate Shadow Key", "Shark Pup|Shark Bait", "Squashling|Magical Pumpkin Seed", "Sugar Glider|Eucalyptus Sap", "Tiki Spirit|Tiki Totem", "Volt Bunny|Lightning Carrot", "Blue Chicken|Blue Chicken Egg", "Caveling Gardener|Glow Tulip", "Pig Man|Monster Meat", "Creeper Egg"],
      pink: ["Alien Skater|Cosmic Skateboard", "Baby Ogre|Ogre's Club", "Destroyer-Lite|Deactivated Probe", "Eater of Worms|Writhing Remains", "Everscream Sapling|Shrub Star", "Honey Bee|Sparkling Honey", "Ice Queen|Frozen Crown", "Itsy Betsy|Betsy's Egg", "Mini Prime|Robotic Skull", "Moonling|Piece of Moon Squid", "Phantasmal Dragon|Tablet Fragment", "Plantera Seedling", "Rez and Spaz|Pair of Eyeballs", "Skeletron Jr.|Possessed Skull", "Slime Prince|Royal Delight", "Slime Princess|Regal Delicacy", "Slime Royals|Resplendent Dessert", "Spider Brain|Brain in a Jar", "Suspicious Eye|Suspicious Grinning Eye", "Tiny Deerclops|Deerclops Eyeball", "Tiny Fishron|Pork of the Sea", "Fairy Princess|Jewel of Light", "Toy Golem|Guardian Golem", "Jack 'O Lantern|Jack O Lantern|Pumpkin Scented Candle"],
      red: ["Chester|Eye Bone", "Bernie|Bernie's Button", "Glommer|Glommer's Flower", "Junimo|Stardrop", "Spiffo|Spiffo Plush", "Pufferfish|Puffer Shrimp", "Swarm Biter|Swarm Grenade", "Friendly Boulder", "Friendly Rainbow Boulder", "Cenaxe|Faecorn"],
      rainbow: ["The Dirtiest Block|Dirtiest Block"]
    },
    reject: [["Town Cat|Town Dog|Town Bunny", "That's a town pet. It lives in a house, not on your head."]],
    rulings: "All 74 pets from the wiki Pets page (53 regular + 21 Master Mode) + all 10 light pets. Pet name OR summoning item counts."
  },
  {
    id: "crates", cat: "Fishing", kind: "item",
    text: "Name a fishing crate",
    answers: {
      white: ["Golden Crate", "Iron Crate", "Wooden Crate"],
      gray: ["Corrupt Crate", "Crimson Crate", "Dungeon Crate", "Frozen Crate", "Hallowed Crate", "Jungle Crate", "Ocean Crate", "Sky Crate"],
      green: ["Mythril Crate", "Oasis Crate", "Obsidian Crate", "Pearlwood Crate", "Titanium Crate"],
      pink: ["Azure Crate", "Boreal Crate", "Bramble Crate", "Defiled Crate", "Divine Crate", "Hellstone Crate", "Hematic Crate", "Mirage Crate", "Seaside Crate", "Stockade Crate"]
    },
    reject: [["Crate Potion", "Gets you crates. Isn't one."]],
    rulings: "Every item in the game data named '... Crate' (26: 13 pre-Hardmode + their Hardmode versions)."
  },
  {
    id: "dyes", cat: "Vanity", kind: "item",
    text: "Name a dye",
    answers: {
      white: ["Black Dye", "Blue Dye", "Rainbow Dye", "Red Dye", "Shadow Dye"],
      gray: ["Green Dye", "Living Rainbow Dye", "Nebula Dye", "Orange Dye", "Pink Dye", "Purple Dye", "Reflective Gold Dye", "Silver Dye", "Solar Dye", "Stardust Dye", "Vortex Dye", "Yellow Dye"],
      green: ["Acid Dye", "Bloodbath Dye", "Blue Acid Dye", "Brown Dye", "Burning Hades Dye", "Chlorophyte Dye", "Cyan Dye", "Flame Dye", "Fogbound Dye", "Gel Dye", "Glowing Mushroom Dye", "Grim Dye", "Hades Dye", "Infernal Wisp Dye", "Intense Rainbow Dye", "Lime Dye", "Living Flame Dye", "Living Ocean Dye", "Martian Dye", "Midnight Rainbow Dye", "Mirage Dye", "Negative Dye", "Phase Dye", "Pink Gel Dye", "Pixie Dye", "Prismatic Dye", "Purple Ooze Dye", "Red Acid Dye", "Reflective Copper Dye", "Reflective Dye", "Reflective Metal Dye", "Reflective Obsidian Dye", "Reflective Silver Dye", "Shadowflame Hades Dye", "Shifting Pearlsands Dye", "Shifting Sands Dye", "Sky Blue Dye", "Teal Dye", "Team Dye", "Twilight Dye", "Unicorn Wisp Dye", "Violet Dye", "Void Dye", "Wisp Dye"],
      pink: ["Black and White Dye", "Blue Flame Dye", "Blue Flame and Black Dye", "Blue Flame and Silver Dye", "Blue and Black Dye", "Blue and Silver Dye", "Bright Blue Dye", "Bright Brown Dye", "Bright Cyan Dye", "Bright Green Dye", "Bright Lime Dye", "Bright Orange Dye", "Bright Pink Dye", "Bright Purple Dye", "Bright Red Dye", "Bright Silver Dye", "Bright Sky Blue Dye", "Bright Teal Dye", "Bright Violet Dye", "Bright Yellow Dye", "Brown and Black Dye", "Brown and Silver Dye", "Cyan Gradient Dye", "Cyan and Black Dye", "Cyan and Silver Dye", "Flame and Black Dye", "Flame and Silver Dye", "Green Flame Dye", "Green Flame and Black Dye", "Green Flame and Silver Dye", "Green and Black Dye", "Green and Silver Dye", "Intense Blue Flame Dye", "Intense Flame Dye", "Intense Green Flame Dye", "Lime and Black Dye", "Lime and Silver Dye", "Orange and Black Dye", "Orange and Silver Dye", "Pink and Black Dye", "Pink and Silver Dye", "Purple and Black Dye", "Purple and Silver Dye", "Red and Black Dye", "Red and Silver Dye", "Silver and Black Dye", "Sky Blue and Black Dye", "Sky Blue and Silver Dye", "Teal and Black Dye", "Teal and Silver Dye", "Violet Gradient Dye", "Violet and Black Dye", "Violet and Silver Dye", "Yellow Gradient Dye", "Yellow and Black Dye", "Yellow and Silver Dye"],
      red: ["Biome Hair Dye", "Depth Hair Dye", "Life Hair Dye", "Loki's Dye", "Mana Hair Dye", "Martian Hair Dye", "Money Hair Dye", "Party Hair Dye", "Rainbow Hair Dye", "Speed Hair Dye", "Team Hair Dye", "Time Hair Dye", "Twilight Hair Dye"]
    },
    reject: [["Dye Vat", "That's where you make it."], ["Hair Dye Remover", "Removes dye. Not a dye."]],
    rulings: "Every item in the game data whose name ends in 'Dye' (130), incl. hair dyes. Hair Dye Remover excluded."
  },
  {
    id: "pickaxes", cat: "Tools", kind: "item",
    text: "Name a pickaxe",
    answers: {
      white: ["Copper Pickaxe", "Iron Pickaxe", "Gold Pickaxe", "Molten Pickaxe", "Picksaw"],
      gray: ["Deathbringer Pickaxe", "Nightmare Pickaxe", "Pickaxe Axe", "Reaver Shark", "Platinum Pickaxe", "Solar Flare Pickaxe"],
      green: ["Tin Pickaxe", "Lead Pickaxe", "Silver Pickaxe", "Tungsten Pickaxe", "Cobalt Pickaxe", "Palladium Pickaxe", "Mythril Pickaxe", "Orichalcum Pickaxe", "Adamantite Pickaxe", "Titanium Pickaxe", "Spectre Pickaxe", "Chlorophyte Pickaxe", "Vortex Pickaxe", "Nebula Pickaxe", "Stardust Pickaxe"],
      pink: ["Cactus Pickaxe", "Candy Cane Pickaxe", "Fossil Pickaxe", "Bone Pickaxe", "Cobalt Drill", "Palladium Drill", "Mythril Drill", "Orichalcum Drill", "Adamantite Drill", "Titanium Drill", "Chlorophyte Drill", "Drax", "Laser Drill", "Solar Flare Drill", "Vortex Drill", "Nebula Drill", "Stardust Drill"],
      rainbow: ["Shroomite Digging Claw"]
    },
    reject: [["Pwnhammer|Hamaxe|Copper Axe", "Wrong tool. Pickaxes only."], ["Drill Containment Unit", "That's a mount. A very good one, though."]],
    rulings: "Every mining tool in the game data: pickaxes, drills (pickaxe-tier tools), Picksaw, Pickaxe Axe, Reaver Shark, Shroomite Digging Claw."
  },
  {
    id: "bone-items", cat: "Names", kind: "item",
    text: "Name an item with \"Bone\" in its name",
    answers: {
      white: ["Bone", "Bone Key", "Bone Pickaxe", "Bone Sword", "Bone Wings"],
      gray: ["Bone Arrow", "Bone Glove", "Bone Javelin", "Bone Throwing Knife", "Bone Torch", "Bone Wand", "Bonefish"],
      green: ["Bone Feather", "Bone Helm", "Bone Rattle", "Bone Serpent Kite", "Bone Warp", "Bone Welder", "Eater's Bone", "Eye Bone"],
      pink: ["Bone Bathtub", "Bone Bed", "Bone Block", "Bone Block Wall", "Bone Bookcase", "Bone Campfire", "Bone Candelabra", "Bone Chair", "Bone Chandelier", "Bone Chest", "Bone Clock", "Bone Door", "Bone Dresser", "Bone Lamp", "Bone Lantern", "Bone Piano", "Bone Platform", "Bone Sink", "Bone Sofa", "Bone Table", "Bone Toilet", "Bone Work Bench", "Trapped Bone Chest"],
      red: ["Angry Bones Banner", "Blue Armored Bones Banner", "Bone Biter Banner", "Bone Lee Banner", "Bone Serpent Banner", "Chicken Bones' Pants", "Chicken Bones' Robe", "Chicken Bones' Vest", "Chicken Bones' Visor", "Chicken Bones' Wings", "Doctor Bones Banner", "Hell Armored Bones Banner", "Marching Bones Banner", "Rusty Armored Bones Banner"],
      rainbow: ["Bone Skeleton Statue"]
    },
    reject: [["Skull|Skeletron Hand|Necro Helmet|Femur", "Very bony. No \"Bone\" in the name, though."]],
    rulings: "Mechanical: every item in the game data containing 'bone' (58), incl. 'Bones' banners and Chicken Bones' dev set."
  },
  {
    id: "star-items", cat: "Names", kind: "item",
    text: "Name an item with \"Star\" in its name",
    answers: {
      white: ["Fallen Star", "Star Cannon", "Star Cloak", "Star Wrath", "Starfury"],
      gray: ["Band of Starpower", "Morning Star", "Star Veil", "Star in a Bottle", "Stardust Dragon Staff", "Stardust Fragment", "Starfish", "Super Star Shooter"],
      green: ["Celestial Starboard", "Fallen Starfish", "Shrub Star", "Star", "Star Anise", "Star Cloud", "Star Fruit", "Star Hairpin", "Star Princess Crown", "Star Princess Dress", "Star Topper 1", "Star Topper 2", "Star Topper 3", "Starcrash", "Stardrop", "Stardust Axe", "Stardust Cell Staff", "Stardust Chainsaw", "Stardust Drill", "Stardust Dye", "Stardust Hamaxe", "Stardust Hammer", "Stardust Helmet", "Stardust Leggings", "Stardust Pickaxe", "Stardust Plate", "Stardust Wings", "Starlight", "Starry Night"],
      pink: ["Blue Starry Block", "Blue Starry Wall", "Fallen Star Bathtub", "Fallen Star Bed", "Fallen Star Block", "Fallen Star Bookcase", "Fallen Star Candelabra", "Fallen Star Candle", "Fallen Star Chair", "Fallen Star Chandelier", "Fallen Star Chest", "Fallen Star Clock", "Fallen Star Door", "Fallen Star Dresser", "Fallen Star Lamp", "Fallen Star Lantern", "Fallen Star Piano", "Fallen Star Platform", "Fallen Star Sink", "Fallen Star Sofa", "Fallen Star Table", "Fallen Star Toilet", "Fallen Star Wall", "Fallen Star Work Bench", "Gold Starry Block", "Gold Starry Wall", "Star Royale Brick", "Star Royale Brick Wall", "Star Statue", "Stardust Bathtub", "Stardust Bed", "Stardust Bookcase", "Stardust Brick", "Stardust Brick Wall", "Stardust Candelabra", "Stardust Candle", "Stardust Chair", "Stardust Chandelier", "Stardust Chest", "Stardust Clock", "Stardust Door", "Stardust Dresser", "Stardust Fragment Block", "Stardust Lamp", "Stardust Lantern", "Stardust Monolith", "Stardust Piano", "Stardust Platform", "Stardust Sink", "Stardust Sofa", "Stardust Table", "Stardust Toilet", "Stardust Work Bench", "Starlit Heaven Wallpaper", "Stars Wallpaper", "Trapped Fallen Star Chest", "Trapped Stardust Chest"],
      red: ["Firestarter's Skirt", "Firestarter's Sweater", "Ghostar's Garb", "Ghostar's Infinity Eight", "Ghostar's Tights", "Mini Star Cell Banner", "Star Cell Banner", "Stargazer Banner", "The Firestarter"],
      rainbow: ["Ghostar's Soul Jar"]
    },
    reject: [["Meteorite|Celestial Sigil|Moon Charm", "Space-y, but no \"Star\" in the name."]],
    rulings: "Mechanical: every item in the game data containing 'star' (109). Letter-for-letter counts, so Ghostar's and Firestarter items are valid sneaky answers."
  },
  {
    id: "slimes", cat: "Enemies", kind: "npc",
    text: "Name a slime",
    answers: {
      white: ["Blue Slime", "Green Slime", "King Slime", "Pinky", "Mother Slime", "Lava Slime"],
      gray: ["Red Slime", "Purple Slime", "Yellow Slime", "Black Slime", "Ice Slime", "Jungle Slime", "Dungeon Slime", "Golden Slime", "Queen Slime", "Rainbow Slime", "Toxic Sludge"],
      green: ["Sand Slime", "Spiked Ice Slime", "Spiked Jungle Slime", "Baby Slime", "Umbrella Slime", "Corrupt Slime", "Slimeling", "Slimer", "Crimslime", "Illuminant Slime", "Spiked Slime", "Shimmer Slime"],
      pink: ["Crystal Slime", "Bouncy Slime", "Heavenly Slime", "Gastropod", "Bunny Slime", "White Present Slime", "Yellow Present Slime", "Green Present Slime", "Red Present Slime", "Nerdy Slime", "Cool Slime", "Elder Slime", "Clumsy Slime", "Diva Slime", "Surly Slime", "Mystic Slime", "Squire Slime", "Clumsy Balloon Slime"],
      rainbow: ["Shadow Slime"]
    },
    reject: [["Slime", "Which one? Name the kind of slime."], ["Slime Rain", "That's the event. Name a slime in it."]],
    rulings: "All 38 slimes from the wiki Slimes page + town slimes (they're slimes) + Shadow Slime (old-gen/3DS NPC 1004). Item-variant labels like 'Dirt Slime' are wiki descriptions, not in-game names, so they don't count."
  },
  {
    id: "biomes", cat: "World", kind: "npc",
    text: "Name a biome",
    answers: {
      white: ["Forest", "Desert", "Jungle", "Snow|Snow Biome|Tundra", "Corruption|The Corruption", "Crimson|The Crimson", "Hallow|The Hallow", "Ocean"],
      gray: ["Underworld|The Underworld|Hell", "Dungeon", "Glowing Mushroom|Glowing Mushroom Biome|Mushroom Biome|Mushroom", "Space", "Underground Jungle"],
      green: ["Underground Desert", "Ice|Ice Biome", "Underground Mushroom", "Underground Hallow", "Underground Corruption", "Underground Crimson", "Meteorite", "Graveyard", "Jungle Temple|Lihzahrd Temple|Temple", "Bee Hive|Hive", "Floating Island|Sky Island"],
      pink: ["Oasis", "Granite Cave|Granite", "Marble Cave|Marble", "Spider Nest|Spider Cave", "Glowing Moss|Glowing Moss Biome|Moss", "Aether|Shimmer", "Town", "Hallowed Desert", "Corrupted Desert|Corrupt Desert", "Crimson Desert", "Hallowed Ice", "Corrupted Ice|Corrupt Ice", "Crimson Ice", "Living Tree", "Pyramid"],
      red: ["Ash Forest", "Flower Patch", "Gemstone Cave|Gem Cave", "Spike Cave|Spike Caves", "Moss Chamber", "Thin Ice", "Underground Cabin", "Living Mahogany Tree", "Jungle Shrine", "Ruined House", "Enchanted Sword Shrine", "Mosaic", "Campsite", "Abandoned Minecart Track", "Large Ore Vein", "Stone Patch"],
      rainbow: ["Heart Shrine", "Jungle Sanctum"]
    },
    rulings: "Every biome, mini-biome, micro-biome and structure listed on the wiki Biomes page (53), incl. the removed mobile-only Heart Shrine and Jungle Sanctum."
  },
  {
    id: "events", cat: "Events", kind: "npc",
    text: "Name an event",
    answers: {
      white: ["Blood Moon", "Goblin Army|Goblin Invasion", "Solar Eclipse|Eclipse", "Pumpkin Moon", "Frost Moon"],
      gray: ["Pirate Invasion", "Martian Madness|Martian Invasion", "Frost Legion", "Old One's Army|OOA", "Lunar Events|Lunar Event|Celestial Pillars|Pillars", "Slime Rain"],
      green: ["Party", "Rain", "Sandstorm", "Windy Day", "Thunderstorm", "Lantern Night"],
      pink: ["The Torch God|Torch God", "Starfall"],
      red: ["Meteor Shower", "Coin Rain", "Boulder Rain", "Meteor Rain"]
    },
    rulings: "All 19 events on the wiki Events page + the 4 sky events added in 1.4.5 (Meteor Shower, Coin/Boulder/Meteor rain)."
  },
  {
    id: "seeds", cat: "World", kind: "npc",
    text: "Name a special world seed",
    answers: {
      white: ["For the Worthy|FTW", "Drunk World|Drunk|5162020|05162020", "Not the Bees|NTB", "Zenith|Get Fixed Boi|GFB|Everything"],
      gray: ["Don't Dig Up|Dont Dig Up|Remix", "The Constant|Constant|Eye for an Eye|Eye 4 an Eye", "Celebrationmk10|Celebration Mk 10|Celebration Mk10|10th Anniversary"],
      green: ["No Traps", "Skyblock"],
      red: ["Invisible Plane", "Monochrome", "Negative Infinity", "X-Ray Vision", "Jagged Rocks", "Mole People", "Planetoids", "Such Great Heights", "Waterpark", "Arachnophobia", "Does That Sparkle", "Fish Mox", "Purify This", "Sandy Britches", "Toadstool", "Winter Is Coming", "Abandoned Manors", "Beam Me Up", "More Traps Please", "Pumpkin Season", "Rainbow Road", "Save the Rainforest", "The Care Bears Movie", "Truck Stop", "We Don't Even Test for That", "Bring a Towel", "Hocus Pocus", "Jingle All the Way", "How Did I Get Here", "Royale with Cheese", "Double Daring Dangers", "I Am Error", "Night of the Living Dead", "Too Easy", "What a Horrible Night to Have a Curse"],
      rainbow: ["Calm Before the Storm", "Electric Boogaloo"]
    },
    rulings: "9 special seeds (wiki Special world seeds) with their codes as aliases, plus all 37 secret seeds added in 1.4.5 (wiki Secret world seeds). The two from 1.4.5.7 are the gems."
  },
  {
    id: "debuffs", cat: "Status", kind: "buff",
    text: "Name a debuff",
    answers: {
      white: ["On Fire!|On Fire", "Poisoned|Poison", "Cursed Inferno", "Ichor", "Confused", "Potion Sickness"],
      gray: ["Frostburn", "Acid Venom|Venom", "Bleeding", "Broken Armor", "Darkness", "Chilled", "Slow", "Weak", "Shadowflame", "Wet", "Tipsy", "Feral Bite"],
      green: ["Hellfire", "Frostbite", "Daybroken", "Betsy's Curse", "Midas", "Lovestruck", "Stinky", "Slime", "Blackout", "Silenced", "Cursed", "Burning", "Oozed", "Frozen", "Webbed", "Stoned", "Mighty Wind", "Distorted", "Electrified", "Suffocation", "Withered Armor", "Withered Weapon", "Chaos State", "Horrified", "The Tongue", "Moon Bite", "Mana Sickness", "Obstructed", "Water Candle", "Shadow Candle"],
      pink: ["Spored", "Shimmering", "Sparkle Slime", "Zapped", "Hemorrhage", "Potent Acid", "Oiled", "Penetrated", "Celled", "Peckish", "Hungry", "Starving", "Cerebral Mindtrick", "Dryad's Bane"],
      red: ["Accelerated Afflictions", "Blood Butchered", "Creative Shock", "Dazed"],
      rainbow: ["Stunned"]
    },
    legacy: ["Stunned"],
    reject: [["Well Fed|Ironskin|Regeneration|Swiftness|Wrath|Rage|Tipsy Buff", "That one helps you. Debuffs only."]],
    rulings: "Every debuff in the wiki Debuffs tables (66) + Stunned (3DS-only). 'Acid Venom' is the in-game name players call Venom."
  }
);
