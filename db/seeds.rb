Archetype.create!([
  {name: "Affinity", format_id: 1, removed: false},
  {name: "Aura Hexproof", format_id: 1, removed: false},
  {name: "Dark Jeskai", format_id: 2, removed: false},
  {name: "Abzan", format_id: 2, removed: false},
  {name: "Atarka Red", format_id: 2, removed: false},
  {name: "GW Megamorph", format_id: 2, removed: false},
  {name: "Splinter Twin", format_id: 1, removed: false},
  {name: "Bloom Titan", format_id: 1, removed: false},
  {name: "UB Colorless", format_id: 3, removed: false},
  {name: "Mardu Allies", format_id: 3, removed: false},
  {name: "RG Landfall", format_id: 3, removed: false},
  {name: "UW Awaken", format_id: 3, removed: false}
])
Format.create!([
  {name: "Modern"},
  {name: "Standard"},
  {name: "Sanctioned Draft"}
])
Result.create!([
  {wins: 2, losses: 0},
  {wins: 2, losses: 1},
  {wins: 1, losses: 0},
  {wins: 1, losses: 1},
  {wins: 0, losses: 1},
  {wins: 1, losses: 2},
  {wins: 0, losses: 2}
])
UserType.create!([
  {name: "admin"},
  {name: "player"}
])
