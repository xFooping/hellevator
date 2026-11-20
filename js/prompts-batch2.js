/* =========================================================================
   HELLEVATOR — prompt batch 2 (25 prompts). Same format as js/data.js.
   Membership from terraria.wiki.gg list pages; names checked against the
   game-text dump by tools/check-data.mjs. kind "pair" = name OR summon item.
   ========================================================================= */
window.PROMPTS.push(
  {
    id: "golem-drops", cat: "Bosses", kind: "item",
    text: "Name something Golem drops",
    answers: {
      white: ["Picksaw", "Beetle Husk", "Golem Fist", "Stynger"],
      gray: ["Possessed Hatchet", "Sun Stone", "Eye of the Golem", "Heat Ray", "Staff of Earth", "Shiny Stone"],
      green: ["Stynger Bolt", "Golem Mask", "Golem Trophy", "Treasure Bag (Golem)|Golem Treasure Bag|Golem Bag", "Golem Relic", "Greater Healing Potion"],
      pink: ["Guardian Golem", "Mobius Strip"],
      red: ["Spear Trap", "Flame Trap", "Spiky Ball Trap"]
    },
    reject: [["Lihzahrd Power Cell", "That's what wakes him up. He doesn't give it back."], ["Gold Coin", "Everything drops coins. Name an item."]],
    rulings: "Wiki Golem drop tables (Classic/Expert/Master) incl. Mobius Strip (1.4.5) and the traps he drops in Skyblock worlds."
  },
  {
    id: "moonlord-drops", cat: "Bosses", kind: "item",
    text: "Name something Moon Lord drops",
    answers: {
      white: ["Meowmere", "Terrarian", "Star Wrath", "S.D.M.G.|SDMG", "Last Prism", "Luminite", "Portal Gun"],
      gray: ["Lunar Flare", "Rainbow Crystal Staff", "Lunar Portal Staff", "Celebration Mk2|Celebration Mk 2", "Gravity Globe", "Suspicious Looking Tentacle", "Celestial Starboard"],
      green: ["Moon Lord Mask", "Moon Lord Trophy", "Treasure Bag (Moon Lord)|Moon Lord Treasure Bag|Moon Lord Bag", "Moon Lord Relic", "Super Healing Potion", "Possession"],
      pink: ["Meowmere Minecart", "Piece of Moon Squid"]
    },
    reject: [["Zenith", "You craft that. He just drops the Luminite."], ["Luminite Bar", "He drops the ore. Smelting's on you."], ["Solar Fragment|Vortex Fragment|Nebula Fragment|Stardust Fragment", "Those come from the pillars."]],
    rulings: "Wiki Moon Lord drop tables incl. Possession (1.4.5 whip) and Master-only Piece of Moon Squid / Relic."
  },
  {
    id: "duke-drops", cat: "Bosses", kind: "item",
    text: "Name something Duke Fishron drops",
    answers: {
      white: ["Fishron Wings", "Tsunami", "Razorblade Typhoon", "Flairon", "Bubble Gun"],
      gray: ["Tempest Staff", "Shrimpy Truffle"],
      green: ["Duke Fishron Mask", "Duke Fishron Trophy", "Treasure Bag (Duke Fishron)|Duke Fishron Treasure Bag|Duke Fishron Bag", "Duke Fishron Relic", "Greater Healing Potion", "Electric Eel"],
      pink: ["Pork of the Sea", "Aqua Scepter", "Kraken"]
    },
    reject: [["Truffle Worm", "That's the bait. He eats it."], ["Flairoon", "That's the Flairon's other form. He drops the Flairon."]],
    rulings: "Wiki Duke Fishron drop tables. Aqua Scepter replaces the Bubble Gun in Don't Dig Up worlds; Kraken moved to his pool in 1.4.5.7; Electric Eel is a 1.4.5 whip."
  },
  {
    id: "queen-bee-drops", cat: "Bosses", kind: "item",
    text: "Name something Queen Bee drops",
    answers: {
      white: ["Bee Gun", "Bee Keeper|Beekeeper", "The Bee's Knees|Bee's Knees", "Beenade", "Bee Wax|Beeswax", "Hive Wand"],
      gray: ["Honey Comb", "Bee Hat", "Bee Shirt", "Bee Pants", "Hive Pack", "Bottled Honey"],
      green: ["Queen Bee Mask", "Queen Bee Trophy", "Treasure Bag (Queen Bee)|Queen Bee Treasure Bag|Queen Bee Bag", "Queen Bee Relic", "Honeyed Goggles", "Nectar"],
      pink: ["Sparkling Honey", "Queen of Bees"]
    },
    reject: [["Abeemination", "That's what summons her."], ["Stinger", "Hornets drop those. She's above that."]],
    rulings: "Wiki Queen Bee drop tables incl. Queen of Bees (1.4.5) and Master-only Sparkling Honey / Relic. Beeswax is the old-gen spelling."
  },
  {
    id: "arms-dealer", cat: "Shops", kind: "item",
    text: "Name something the Arms Dealer sells",
    answers: {
      white: ["Musket Ball", "Minishark", "Flintlock Pistol", "Shotgun", "Illegal Gun Parts"],
      gray: ["Silver Bullet", "Tungsten Bullet", "Unholy Arrow", "Empty Bullet", "Ammo Box"],
      green: ["Quad-Barrel Shotgun", "Stynger Bolt", "Stake", "Nail", "Candy Corn", "Explosive Jack 'O Lantern"],
      pink: ["Nurse Hat", "Nurse Shirt", "Nurse Pants", "Forest Pylon", "Snow Pylon", "Desert Pylon", "Jungle Pylon", "Cavern Pylon", "Ocean Pylon", "Hallow Pylon", "Mushroom Pylon", "Underworld Pylon"]
    },
    reject: [["Universal Pylon|Aether Pylon", "Town NPCs don't sell that pylon."], ["Megashark", "You'll have to craft that one."], ["Meteor Shot|Crystal Bullet|Cursed Bullet|Ichor Bullet", "You craft those from his Musket Balls."]],
    rulings: "Every item on the wiki Arms Dealer shop table (incl. Halloween Nurse set and graveyard Quad-Barrel). Any town NPC sells the pylon for the biome they live in."
  },
  {
    id: "witch-doctor", cat: "Shops", kind: "item",
    text: "Name something the Witch Doctor sells",
    answers: {
      white: ["Imbuing Station", "Blowgun", "Pygmy Necklace", "Leaf Wings"],
      gray: ["Tiki Totem", "Hercules Beetle", "Tiki Mask", "Tiki Shirt", "Tiki Pants", "Vial of Venom"],
      green: ["Pure Water Fountain", "Jungle Water Fountain", "Desert Water Fountain", "Icy Water Fountain", "Corrupt Water Fountain", "Crimson Water Fountain", "Hallowed Water Fountain", "Blood Water Fountain", "Cavern Water Fountain", "Oasis Water Fountain", "Giant Tiki", "Bewitching Table", "Stynger Bolt", "Stake"],
      pink: ["Cauldron", "Forest Pylon", "Snow Pylon", "Desert Pylon", "Jungle Pylon", "Cavern Pylon", "Ocean Pylon", "Hallow Pylon", "Mushroom Pylon", "Underworld Pylon"]
    },
    reject: [["Universal Pylon|Aether Pylon", "Town NPCs don't sell that pylon."], ["Flask of Venom|Flask of Fire|Flask of Ichor|Flask of Cursed Flames|Flask of Gold|Flask of Nanites|Flask of Party|Flask of Poison", "You brew those at his Imbuing Station."], ["Pygmy Staff", "Plantera drops that one."]],
    rulings: "Every item on the wiki Witch Doctor shop table (26) incl. the Halloween Cauldron and Wizard-gated Bewitching Table, plus biome pylons."
  },
  {
    id: "wizard-shop", cat: "Shops", kind: "item",
    text: "Name something the Wizard sells",
    answers: {
      white: ["Crystal Ball", "Ice Rod", "Spell Tome", "Greater Mana Potion"],
      gray: ["Music Box", "Empty Dropper", "Bell", "Harp", "Book"],
      green: ["Wizard's Hat", "Killing Deck"],
      pink: ["Forest Pylon", "Snow Pylon", "Desert Pylon", "Jungle Pylon", "Cavern Pylon", "Ocean Pylon", "Hallow Pylon", "Mushroom Pylon", "Underworld Pylon"]
    },
    reject: [["Universal Pylon|Aether Pylon", "Town NPCs don't sell that pylon."], ["Wizard Hat", "That's the armor piece from chests. He sells the Wizard's Hat at Halloween."], ["Bewitching Table", "The Witch Doctor sells that, once the Wizard moves in."]],
    rulings: "Every item on the wiki Wizard shop table incl. Killing Deck (1.4.5, Hardmode Blood Moon) and Halloween Wizard's Hat, plus biome pylons."
  },
  {
    id: "statues", cat: "Furniture", kind: "item", suffix: "statue",
    text: "Name a statue",
    answers: {
      white: ["Angel Statue", "Armor Statue", "Bomb Statue", "Bunny Statue", "Heart Statue", "King Statue", "Queen Statue", "Slime Statue", "Star Statue"],
      gray: ["Bat Statue", "Corrupt Statue", "Crab Statue", "Gargoyle Statue", "Goblin Statue", "Hornet Statue", "Imp Statue", "Jellyfish Statue", "Lihzahrd Statue", "Medusa Statue", "Mushroom Statue", "Piranha Statue", "Reaper Statue", "Shark Statue", "Shield Statue", "Skeleton Statue", "Sword Statue", "Woman Statue"],
      green: ["Anvil Statue", "Armed Zombie Statue", "Axe Statue", "Bast Statue", "Bird Statue", "Blood Zombie Statue", "Boomerang Statue", "Boot Statue", "Boulder Statue", "Bow Statue", "Buggy Statue", "Butterfly Statue", "Chest Statue", "Cockatiel Statue", "Cross Statue", "Dragonfly Statue", "Drippler Statue", "Duck Statue", "Eyeball Statue", "Firefly Statue", "Fish Statue", "Frog Statue", "Gloom Statue", "Granite Golem Statue", "Grasshopper Statue", "Hammer Statue", "Harpy Statue", "Hoplite Statue", "Macaw Statue", "Mouse Statue", "Owl Statue", "Penguin Statue", "Pickaxe Statue", "Pigron Statue", "Pot Statue", "Potion Statue", "Scorpion Statue", "Seagull Statue", "Snail Statue", "Spear Statue", "Squirrel Statue", "Sunflower Statue", "Toucan Statue", "Tree Statue", "Turtle Statue", "Undead Viking Statue", "Unicorn Statue", "Wall Creeper Statue", "Worm Statue", "Wraith Statue"],
      pink: ["'0' Statue", "'1' Statue", "'2' Statue", "'3' Statue", "'4' Statue", "'5' Statue", "'6' Statue", "'7' Statue", "'8' Statue", "'9' Statue", "'A' Statue", "'B' Statue", "'C' Statue", "'D' Statue", "'E' Statue", "'F' Statue", "'G' Statue", "'H' Statue", "'I' Statue", "'J' Statue", "'K' Statue", "'L' Statue", "'M' Statue", "'N' Statue", "'O' Statue", "'P' Statue", "'Q' Statue", "'R' Statue", "'S' Statue", "'T' Statue", "'U' Statue", "'V' Statue", "'W' Statue", "'X' Statue", "'Y' Statue", "'Z' Statue"],
      red: ["Bone Skeleton Statue", "Lihzahrd Guardian Statue", "Lihzahrd Watcher Statue", "Pillar Statue"]
    },
    reject: [["Statue", "Which one? Name the statue."], ["Armor Mannequin|Womannequin|Mannequin", "Close. That's a mannequin."]],
    rulings: "Mechanical: every obtainable item in the game data ending in 'Statue' (incl. the alphabet/number statues). 'Angel' works on its own."
  },
  {
    id: "underworld-enemies", cat: "Enemies", kind: "npc",
    text: "Name an Underworld enemy",
    answers: {
      white: ["Hellbat", "Lava Slime", "Fire Imp", "Demon", "Voodoo Demon", "Bone Serpent", "Wall of Flesh|WoF"],
      gray: ["Red Devil", "Lava Bat"],
      green: ["The Hungry|Hungry", "Leech", "Tortured Soul", "Mimic"],
      rainbow: ["Arch Demon"]
    },
    reject: [["Hell Butterfly|Lavafly|Magma Snail", "That's a critter. It won't hurt you."], ["Demon Eye", "Wrong kind of demon. That one's on the surface."], ["Imp", "Which one? The Fire Imp?"]],
    rulings: "Wiki Underworld enemy list + Wall of Flesh's Hungry and Leeches, + Arch Demon (old-gen/3DS variant)."
  },
  {
    id: "dungeon-enemies", cat: "Enemies", kind: "npc",
    text: "Name a Dungeon enemy",
    answers: {
      white: ["Angry Bones", "Dark Caster", "Cursed Skull", "Skeletron|Skeletron Head", "Dungeon Guardian"],
      gray: ["Dungeon Slime", "Paladin", "Necromancer", "Ragged Caster", "Diabolist", "Skeleton Sniper", "Skeleton Commando", "Tactical Skeleton", "Bone Lee", "Dungeon Spirit", "Giant Cursed Skull", "Lunatic Cultist"],
      green: ["Blue Armored Bones", "Rusty Armored Bones", "Hell Armored Bones", "Spike Ball", "Blazing Wheel", "Skeletron Hand", "Lunatic Devotee", "Cultist Archer|Blue Cultist Archer"],
      pink: ["Librarian Skeleton", "Water Bolt Mimic", "Phantasm Dragon", "Ancient Vision", "Ancient Cultist"],
      rainbow: ["Dragon Skull"]
    },
    reject: [["Old Man|Clothier", "He's friendly. Mostly."], ["Armored Bones", "Which color? Blue, Rusty or Hell."], ["Skeleton", "Which one? The Dungeon has a lot of skeletons."]],
    rulings: "Wiki Dungeon enemy list (pre- and post-Plantera, cultists at the entrance) + the Lunatic Cultist's summons + Dragon Skull (old-gen/3DS Cursed Skull variant)."
  },
  {
    id: "eclipse-enemies", cat: "Events", kind: "npc",
    text: "Name a Solar Eclipse enemy",
    answers: {
      white: ["Mothron", "Frankenstein", "Swamp Thing", "Vampire", "Reaper"],
      gray: ["Eyezor", "Butcher", "Psycho", "Deadly Sphere", "Fritz", "Creature from the Deep"],
      green: ["The Possessed|Possessed", "Nailhead", "Dr. Man Fly|Doctor Man Fly"],
      pink: ["Baby Mothron", "Mothron Egg"]
    },
    reject: [["Severed Hand", "Planned, never added. Good wiki diving though."], ["Werewolf|Wraith", "That one comes out at night, not during the eclipse."]],
    rulings: "All 15 from the wiki Solar Eclipse page + Mothron Egg (an NPC that hatches Baby Mothrons)."
  },
  {
    id: "moon-event-enemies", cat: "Events", kind: "npc",
    text: "Name a Pumpkin Moon or Frost Moon enemy",
    answers: {
      white: ["Pumpking", "Mourning Wood", "Ice Queen", "Santa-NK1|Santa NK1|SantaNK1", "Everscream"],
      gray: ["Headless Horseman", "Scarecrow", "Splinterling", "Hellhound", "Poltergeist", "Yeti", "Krampus", "Flocko", "Elf Copter"],
      green: ["Present Mimic", "Gingerbread Man", "Zombie Elf", "Elf Archer", "Nutcracker"]
    },
    reject: [["Frost Legion|Snowman Gangsta|Mister Stabby|Snow Balla", "That's the Frost Legion. Different event."]],
    rulings: "All 7 Pumpkin Moon and 12 Frost Moon enemies from their wiki pages."
  },
  {
    id: "invasion-enemies", cat: "Events", kind: "npc",
    text: "Name an invasion enemy",
    answers: {
      white: ["Goblin Peon", "Goblin Thief", "Goblin Warrior", "Goblin Sorcerer", "Goblin Archer", "Pirate Captain", "Flying Dutchman", "Martian Saucer", "Betsy"],
      gray: ["Goblin Summoner", "Shadowflame Apparition", "Pirate Deckhand", "Pirate Corsair", "Pirate Deadeye", "Pirate Crossbower", "Parrot", "Snowman Gangsta", "Mister Stabby", "Snow Balla", "Martian Walker", "Martian Officer", "Ogre", "Dark Mage"],
      green: ["Pirate's Curse", "Martian Engineer", "Martian Drone", "Gigazapper", "Ray Gunner", "Brain Scrambler", "Tesla Turret", "Scutlix", "Scutlix Gunner", "Martian Probe", "Etherian Goblin", "Etherian Goblin Bomber", "Etherian Javelin Thrower", "Etherian Wyvern", "Kobold", "Kobold Glider", "Drakin", "Etherian Lightning Bug", "Wither Beast"]
    },
    reject: [["Goblin Scout", "He scouts, he doesn't invade. Not part of the army."], ["Goblin Tinkerer", "He's on your side now."], ["Pumpking|Ice Queen|Mourning Wood|Santa-NK1|Everscream", "Moon events aren't invasions."]],
    rulings: "Every enemy of the Goblin Army, Pirate Invasion, Frost Legion, Martian Madness and Old One's Army (wiki event pages)."
  },
  {
    id: "armor-sets", cat: "Gear", kind: "npc", suffix: "armor",
    text: "Name an armor set",
    answers: {
      white: ["Wood Armor", "Copper Armor", "Iron Armor", "Gold Armor", "Shadow Armor", "Crimson Armor", "Molten Armor", "Jungle Armor", "Necro Armor", "Meteor Armor", "Hallowed Armor|Hallow Armor", "Chlorophyte Armor", "Beetle Armor", "Spectre Armor", "Shroomite Armor", "Turtle Armor", "Solar Flare Armor|Solar Armor", "Vortex Armor", "Nebula Armor", "Stardust Armor", "Adamantite Armor", "Titanium Armor"],
      gray: ["Tin Armor", "Lead Armor", "Silver Armor", "Tungsten Armor", "Platinum Armor", "Bee Armor", "Fossil Armor", "Ninja Armor", "Cactus Armor", "Obsidian Armor", "Gladiator Armor", "Mining Armor", "Cobalt Armor", "Palladium Armor", "Mythril Armor", "Orichalcum Armor", "Frost Armor", "Forbidden Armor", "Spider Armor", "Tiki Armor", "Spooky Armor", "Squire Armor", "Monk Armor", "Huntress Armor", "Apprentice Armor"],
      green: ["Rich Mahogany Armor", "Boreal Wood Armor", "Palm Wood Armor", "Ebonwood Armor", "Shadewood Armor", "Pearlwood Armor", "Pumpkin Armor", "Angler Armor", "Snow Armor", "Crystal Assassin Armor|Crystal Armor", "Ancient Shadow Armor", "Ancient Cobalt Armor", "Ancient Hallowed Armor", "Valhalla Knight Armor|Valhalla Armor", "Shinobi Infiltrator Armor|Shinobi Armor", "Red Riding Armor|Red Riding Hood Armor", "Dark Artist Armor", "Wizard Armor", "Prospector Armor", "Captain Armor"],
      pink: ["Ash Wood Armor", "Rain Armor", "Pink Snow Armor"],
      rainbow: ["Dragon Armor", "Titan Armor", "Spectral Armor"]
    },
    reject: [["Armor", "Which set?"], ["Plumber Armor|Plumber's Armor|Pharaoh Armor|Mummy Armor|Cat Armor|Ghost Armor", "That's vanity. It looks great and does nothing."]],
    rulings: "All 69 armor sets on the wiki Armor page + the Wizard set + Dragon, Titan and Spectral (old-gen/3DS). 'Shadow' works on its own."
  },
  {
    id: "info-accessories", cat: "Gear", kind: "item",
    text: "Name an informational accessory",
    answers: {
      white: ["Depth Meter", "Compass", "Gold Watch", "Cell Phone", "GPS", "PDA", "Radar", "Lifeform Analyzer", "Shellphone|Shellphone (Home)|Shellphone (Spawn)|Shellphone (Ocean)|Shellphone (Underworld)"],
      gray: ["Copper Watch", "Tin Watch", "Silver Watch", "Tungsten Watch", "Platinum Watch", "Metal Detector", "Tally Counter", "Fisherman's Pocket Guide", "Weather Radio", "Sextant", "Fish Finder", "Goblin Tech", "R.E.K. 3000|REK 3000|REK"],
      green: ["Stopwatch", "DPS Meter", "Mechanical Lens", "Mechanical Ruler"],
      pink: ["Ruler"]
    },
    reject: [["Lucky Coin|Discount Card|Gold Ring", "Useful, but it doesn't tell you anything."], ["The Grand Design|Wire Kite", "That's for wiring, not info."]],
    rulings: "Every item on the wiki Informational Accessories page and every PDA/Shellphone combination; all Shellphone modes count as one answer. Ruler is accepted (it's an info item on old versions)."
  },
  {
    id: "hammers", cat: "Tools", kind: "item", suffix: "hammer",
    text: "Name a hammer",
    answers: {
      white: ["Wooden Hammer", "Copper Hammer", "Iron Hammer", "Pwnhammer", "The Breaker|Breaker", "Flesh Grinder", "Molten Hamaxe", "Meteor Hamaxe"],
      gray: ["Tin Hammer", "Lead Hammer", "Silver Hammer", "Tungsten Hammer", "Gold Hammer", "Platinum Hammer", "Hammush", "Chlorophyte Warhammer", "Chlorophyte Jackhammer", "Spectre Hamaxe", "Paladin's Hammer"],
      green: ["Rich Mahogany Hammer", "Ebonwood Hammer", "Shadewood Hammer", "Pearlwood Hammer", "Rockfish", "Haemorrhaxe", "Solar Flare Hamaxe", "Vortex Hamaxe", "Nebula Hamaxe", "Stardust Hamaxe", "The Axe"],
      pink: ["Ash Wood Hammer", "Palm Wood Hammer", "Boreal Wood Hammer"]
    },
    reject: [["Breaker Blade", "Big, heavy, still a sword."], ["Hammer Statue", "Can't hit anything with a statue."], ["Solar Flare Hammer|Vortex Hammer|Nebula Hammer|Stardust Hammer", "That one's in the game files but you can't get it. The hamaxe is the real one."]],
    rulings: "All 32 hammers and hamaxes on the wiki Hammers page (Palm/Boreal hammers are legal again on desktop) + Paladin's Hammer. The unobtainable lunar 'Hammer' items don't count."
  },
  {
    id: "bullets", cat: "Ammo", kind: "item", suffix: "bullet",
    text: "Name a type of bullet",
    answers: {
      white: ["Musket Ball", "Silver Bullet", "Meteor Shot", "Crystal Bullet", "Chlorophyte Bullet", "Luminite Bullet"],
      gray: ["Cursed Bullet", "Ichor Bullet", "High Velocity Bullet", "Party Bullet", "Tungsten Bullet", "Endless Musket Pouch"],
      green: ["Nano Bullet", "Exploding Bullet", "Golden Bullet", "Venom Bullet"]
    },
    reject: [["Empty Bullet", "Not loaded yet. Craft it into something."], ["Candy Corn|Stake|Nail|Rocket", "That's ammo, but not a bullet."]],
    rulings: "All 15 bullets from the wiki Bullets page + the Endless Musket Pouch."
  },
  {
    id: "arrows", cat: "Ammo", kind: "item", suffix: "arrow",
    text: "Name a type of arrow",
    answers: {
      white: ["Wooden Arrow", "Flaming Arrow", "Unholy Arrow", "Jester's Arrow", "Holy Arrow", "Chlorophyte Arrow"],
      gray: ["Hellfire Arrow", "Frostburn Arrow", "Cursed Arrow", "Ichor Arrow", "Luminite Arrow|Moonlord Arrow", "Endless Quiver"],
      green: ["Bone Arrow", "Venom Arrow", "Shimmer Arrow"],
      rainbow: ["Spectral Arrow", "Heart Arrow"]
    },
    legacy: ["Spectral Arrow", "Heart Arrow"],
    reject: [["Stynger Bolt|Stake|Vulcan Bolt", "Bows can't fire those."], ["Magic Quiver|Molten Quiver|Stalker's Quiver", "That's a quiver accessory. It holds arrows, it isn't one."], ["Arrow Sign", "Points the way. Can't shoot it."]],
    rulings: "All arrows from the wiki Arrows page + Endless Quiver + old-gen/3DS Spectral Arrow and Heart Arrow."
  },
  {
    id: "bars", cat: "Crafting", kind: "item", suffix: "bar",
    text: "Name a type of bar",
    answers: {
      white: ["Chlorophyte Bar", "Copper Bar", "Crimtane Bar", "Demonite Bar", "Gold Bar", "Hallowed Bar", "Hellstone Bar", "Iron Bar", "Luminite Bar"],
      gray: ["Adamantite Bar", "Cobalt Bar", "Lead Bar", "Meteorite Bar", "Mythril Bar", "Platinum Bar", "Silver Bar", "Tin Bar", "Titanium Bar", "Tungsten Bar"],
      green: ["Orichalcum Bar", "Palladium Bar", "Shroomite Bar", "Spectre Bar"]
    },
    reject: [["Bar", "Which kind?"], ["Obsidian|Beetle Husk", "Smelt-adjacent, but not a bar."]],
    rulings: "Mechanical: every item in the game data ending in ' Bar' (23). 'Iron' works on its own."
  },
  {
    id: "fish", cat: "Fishing", kind: "item",
    text: "Name a fish you can catch",
    answers: {
      white: ["Bass", "Trout", "Salmon", "Tuna", "Golden Carp", "Neon Tetra", "Specular Fish", "Red Snapper", "Atlantic Cod", "Clownfish", "Angelfish", "Catfish", "Bunnyfish", "Fishron"],
      gray: ["Armored Cavefish", "Damselfish", "Flounder", "Frost Minnow", "Honeyfin", "Hemopiranha", "Ebonkoi", "Crimson Tigerfish", "Prismite", "Obsidifish", "Flarefin Koi", "Chaos Fish", "Double Cod", "Dirtfish", "Slimefish", "Zombie Fish", "Derpfish", "Batfish", "Bonefish"],
      green: ["Princess Fish", "Stinkfish", "Variegated Lardfish", "Mudfish", "Pengfish", "Harpyfish", "Cloudfish", "Spiderfish", "Unicorn Fish", "Fallen Starfish", "Dynamite Fish", "Fishotron", "Hungerfish", "Mirage Fish", "Pixiefish", "Jewelfish", "Wyverntail|Whyverntail", "Bumblebee Tuna", "Tundra Trout", "Tropical Barracuda", "Cursedfish", "Ichorfish"],
      pink: ["Eater of Plankton", "Guide Voodoo Fish", "Demonic Hellfish", "Infected Scabbardfish", "Bloody Manowar|Bloody Man-O-War", "Scarab Fish", "Scorpio Fish", "Mutant Flinxfin", "Amanita Fungifin|Amanitia Fungifin", "The Fish of Cthulhu|Fish of Cthulu", "Swordfish", "Purple Clubberfish", "Rockfish", "Toxikarp", "Bomb Fish", "Zephyr Fish"],
      red: ["Obsidian Swordfish", "Frost Daggerfish", "Balloon Pufferfish", "Goldfish", "Pupfish"],
      rainbow: ["Cap'n Tunabeard|Captain Tunabeard"]
    },
    nonItem: ["Goldfish", "Pupfish"],
    reject: [["Shrimp|Rock Lobster", "That's a crustacean. Close, though."], ["Silent Fish", "That's a painting."], ["Jellyfish|Shark|Arapaima|Angler Fish", "That's an enemy. You fight it, you don't reel it in."], ["Fish", "Which one?"], ["Cooked Fish|Sashimi|Seafood Dinner|Grilled Squirrel", "That's what happens after you catch it."]],
    rulings: "Every fish from the wiki Fished items category: regular fish, all 41 quest fish, and the fish-named weapons/tools you can reel in. Goldfish and Pupfish count too: they're fish and you catch them with a bug net."
  },
  {
    id: "moon-items", cat: "Names", kind: "item",
    text: "Name an item with \"Moon\" in its name",
    answers: {
      white: ["Blue Moon", "Moon Charm", "Moon Shell", "Moon Stone", "Moonglow", "Pumpkin Moon Medallion"],
      gray: ["Moon Lord Mask", "Moon Lord Trophy", "Moonglow Seeds"],
      green: ["Blood Moon Monolith", "Moon Lord Relic", "Moon Mask", "Piece of Moon Squid", "Treasure Bag (Moon Lord)"],
      pink: ["Enchanted Moondial", "Hanging Moonglow", "Moon Globe", "Moonglow Planter Box", "Moonplate Block", "Music Box (Frost Moon)", "Music Box (Pumpkin Moon)"],
      red: ["Blood Moon Countess", "Blood Moon Rising", "Full Moon Squeaky Toy", "Moon Lord Legs", "Moon Lord Torso", "Moonman & Company", "Shining Moon"]
    },
    reject: [["Celestial Sigil|Luminite|Meowmere", "Lunar energy, but no \"Moon\" in the name."]],
    rulings: "Mechanical: every obtainable item in the game data containing 'moon' (letter-for-letter)."
  },
  {
    id: "shadow-items", cat: "Names", kind: "item",
    text: "Name an item with \"Shadow\" in its name",
    answers: {
      white: ["Shadow Chest", "Shadow Greaves", "Shadow Helmet", "Shadow Key", "Shadow Orb", "Shadow Scale", "Shadow Scalemail", "Shadowbeam Staff"],
      gray: ["Shadow Candle", "Shadowflame Bow", "Shadowflame Hex Doll", "Shadowflame Knife"],
      green: ["Ancient Shadow Greaves", "Ancient Shadow Helmet", "Ancient Shadow Scalemail", "Ornate Shadow Key", "Shadow Dye", "Shadow Jousting Lance"],
      pink: ["Replica Shadow Orb", "Shadow Paint", "Shadowflame Hades Dye", "Trapped Shadow Chest"],
      rainbow: ["Shadow Hammer Banner", "Shadow Mummy Banner"]
    },
    legacy: ["Shadow Hammer Banner", "Shadow Mummy Banner"],
    reject: [["Demonite Bar|Rotten Chunk|Ebonstone Block", "Corruption-flavored, but no \"Shadow\" in the name."]],
    rulings: "Mechanical: every item in the game data containing 'shadow' + the two old-gen Shadow banners."
  },
  {
    id: "ice-items", cat: "Names", kind: "item",
    text: "Name an item with \"Ice\" in its name",
    answers: {
      white: ["Ice Blade", "Ice Block", "Ice Boomerang", "Ice Bow", "Ice Mirror", "Ice Rod", "Ice Skates", "Ice Torch"],
      gray: ["Ice Brick", "Ice Chest", "Ice Cream", "Ice Feather", "Ice Machine", "Ice Queen Relic", "Ice Queen Trophy", "Ice Sickle", "Thin Ice"],
      pink: ["Ice Brick Wall", "Ice Floe Wallpaper", "Ice Wall", "Martian Officer Banner", "Music Box (Ice)", "Office Bathtub", "Office Bed", "Office Block", "Office Bookcase", "Office Candelabra", "Office Candle", "Office Chair", "Office Chandelier", "Office Chest", "Office Clock", "Office Door", "Office Dresser", "Office Lamp", "Office Lantern", "Office Piano", "Office Platform", "Office Sink", "Office Sofa", "Office Table", "Office Toilet", "Office Wall", "Office Work Bench", "Otherworldly Music Box (Ice)", "Pink Ice Block", "Purple Ice Block", "Red Ice Block", "Trapped Ice Chest", "Trapped Office Chest"],
      red: ["Apple Juice", "Apprentice Bait", "Apprentice's Hat", "Apprentice's Robe", "Apprentice's Scarf", "Apprentice's Trousers", "Arkhalis' Bodice", "Bunny License", "Cat License", "Chalice", "Dog License", "Dune Splicer Banner", "Fruit Juice", "Gentleman's Magnificent Beard", "Grape Juice", "Ice Bat Banner", "Ice Elemental Banner", "Ice Golem Banner", "Ice Slime Banner", "Ice Tortoise Banner", "Jungle Juice", "Slice of Cake", "Slice of Hell Cake", "Spiked Ice Slime Banner"]
    },
    reject: [["Frozen Turtle Shell|Frostbrand|Frost Core|Snow Block", "Cold, but no \"Ice\" in the name."]],
    rulings: "Mechanical, letter-for-letter: every obtainable item containing 'ice', so Office furniture, Apprentice gear, juices and pie slices are sneaky valid answers."
  },
  {
    id: "expert-items", cat: "Bosses", kind: "item",
    text: "Name an Expert Mode exclusive item",
    answers: {
      white: ["Shield of Cthulhu", "Worm Scarf", "Brain of Confusion", "Royal Gel", "Demon Heart", "Hive Pack"],
      gray: ["Bone Glove", "Mechanical Wheel Piece", "Mechanical Wagon Piece", "Mechanical Battery Piece", "Spore Sac", "Shiny Stone", "Shrimpy Truffle", "Gravity Globe", "Volatile Gelatin", "Soaring Insignia", "Treasure Bag|Treasure Bag (Betsy)|Treasure Bag (Brain of Cthulhu)|Treasure Bag (Deerclops)|Treasure Bag (Duke Fishron)|Treasure Bag (Eater of Worlds)|Treasure Bag (Empress of Light)|Treasure Bag (Eye of Cthulhu)|Treasure Bag (Golem)|Treasure Bag (King Slime)|Treasure Bag (Moon Lord)|Treasure Bag (Plantera)|Treasure Bag (Queen Bee)|Treasure Bag (Queen Slime)|Treasure Bag (Skeletron Prime)|Treasure Bag (Skeletron)|Treasure Bag (The Destroyer)|Treasure Bag (The Twins)|Treasure Bag (Wall of Flesh)"],
      green: ["Bone Helm", "Celestial Starboard", "Suspicious Looking Tentacle"],
      pink: ["Witch's Broom", "Mechanical Cart"]
    },
    nonItem: ["Treasure Bag"],
    reject: [["Guardian Golem|Pork of the Sea|Sparkling Honey|Piece of Moon Squid|Golem Relic|Moon Lord Relic", "That's Master Mode only."]],
    rulings: "All 20 Expert-exclusive items from the wiki Expert Mode page + any boss Treasure Bag (Expert-only drops) + Mechanical Cart (only craftable from the three expert Mechanical pieces)."
  },
  {
    id: "swords", cat: "Weapons", kind: "item",
    text: "Name a sword",
    answers: {
      white: ["Copper Shortsword", "Wooden Sword", "Night's Edge", "Terra Blade", "Zenith", "Excalibur", "True Excalibur", "True Night's Edge", "Muramasa", "Meowmere", "Star Wrath", "Starfury", "Enchanted Sword", "Volcano|Fiery Greatsword", "Blade of Grass", "Light's Bane", "Blood Butcherer", "Influx Waver", "Copper Broadsword", "Tin Broadsword", "Iron Broadsword", "Lead Broadsword", "Silver Broadsword", "Tungsten Broadsword", "Gold Broadsword", "Platinum Broadsword", "Cobalt Sword", "Palladium Sword", "Mythril Sword", "Orichalcum Sword", "Adamantite Sword", "Titanium Sword"],
      gray: ["Chlorophyte Claymore", "Chlorophyte Saber", "Beam Sword", "Frostbrand", "Ice Blade", "Cutlass", "Death Sickle", "Bee Keeper|Beekeeper", "The Horseman's Blade|Horseman's Blade", "Seedler", "Breaker Blade", "Bone Sword", "Cactus Sword", "Katana", "Arkhalis", "Terragrim", "Starlight", "Gladius"],
      green: ["Tin Shortsword", "Iron Shortsword", "Lead Shortsword", "Silver Shortsword", "Tungsten Shortsword", "Gold Shortsword", "Platinum Shortsword", "Purple Phaseblade", "Red Phaseblade", "Blue Phaseblade", "Green Phaseblade", "White Phaseblade", "Yellow Phaseblade", "Orange Phaseblade", "Purple Phasesaber", "Red Phasesaber", "Blue Phasesaber", "Green Phasesaber", "White Phasesaber", "Yellow Phasesaber", "Orange Phasesaber", "Rich Mahogany Sword", "Ebonwood Sword", "Shadewood Sword", "Pearlwood Sword", "Boreal Wood Sword", "Palm Wood Sword", "Candy Cane Sword", "Christmas Tree Sword", "Ice Sickle", "Falcon Blade", "Keybrand", "Brand of the Inferno", "Bladetongue", "Psycho Knife", "Tentacle Spike", "Mandible Blade", "Exotic Scimitar", "Zombie Arm", "Purple Clubberfish", "Fetid Baghnakhs", "Bladed Glove", "Flying Dragon", "Rainbow Phaseblade", "Rainbow Phasesaber"],
      pink: ["Ash Wood Sword", "Bat Bat", "Ham Bat", "Slap Hand", "Classy Cane", "Stylish Scissors", "Flymeal", "Breathing Reed", "Waffle's Iron", "Ruler", "Paladin's Hammer", "True Copper Shortsword"],
      rainbow: ["Tizona"]
    },
    legacy: ["Tizona"],
    reject: [["Swordfish|Obsidian Swordfish", "Name says sword, but it's a spear."], ["Cat Sword", "That's a painting."], ["Broken Hero Sword", "Crafting material. Nobody's swinging that."], ["Sword Statue|Sword Rack", "Very sword-adjacent. Not a sword."]],
    rulings: "Every broadsword and shortsword on the wiki Swords page (incl. weird ones like Slap Hand and Paladin's Hammer, which the wiki files as broadswords) + Terragrim, Arkhalis, Zenith, True Copper Shortsword (1.4.5) + Tizona (old-gen/3DS)."
  }
);
