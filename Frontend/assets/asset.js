// ─────────────────────────────────────────────
// Local image assets – organized by category
// ─────────────────────────────────────────────

const IMAGES = {
    origins:  require('./images/history.avif'),
    aksum:    require('./images/fasil.avif'),
    lalibela: require('./images/lalibela.webp'),
    adwa:     require('./images/flag.avif'),
    orthodox: require('./images/church.avif'),
    islam:    require('./images/addis_ababa.avif'),
    timket: require('./images/culture.avif'),
    meskel: require('./images/cultural.avif'),
    habesha: require('./images/dressing.avif'),
    eskista: require('./images/music.avif'),
    injera: require('./images/food.webp'),
    coffee: require('./images/coffee.avif'),
    simien: require('./images/wereb.avif'),
    menelik: require('./images/mimlik.avif'),
    plane:    require('./images/plane.avif'),
    clothing: require('./images/clothing.webp'),
}
  

export const PROFILE_MENU = [
  {
    id: "history",
    title: "History",
    data: [
      {
        id: "origins",
        name: "Origins of Humanity",
        icon: IMAGES.origins,
        categoryLabel: "HISTORY",
        readTime: "5 min read",
        likes: "940",
        description: "Ethiopia is one of the earliest homes of human ancestors.",
        facts:
          "• Discovery of Lucy in Afar region\n• 3.2 million years old\n• Cradle of humanity\n• Human evolution origin",
        highlights: [
          "Discovery of Lucy in Afar",
          "3.2 million years old",
          "Cradle of humanity and evolution"
        ]
      },
      {
        id: "aksum",
        name: "Kingdom of Aksum",
        icon: IMAGES.aksum,
        categoryLabel: "HISTORY",
        readTime: "7 min read",
        likes: "850",
        description: "Ancient empire and early Christian civilization.",
        facts:
          "• Major ancient trade empire\n• Early Christianity (4th century)\n• Famous stone obelisks\n• Global trade connections",
        highlights: [
          "Major ancient trade empire",
          "Early Christianity (4th century)",
          "Famous towering stone obelisks"
        ]
      },
      {
        id: "zagwe",
        name: "Lalibela Churches",
        icon: IMAGES.lalibela,
        categoryLabel: "HISTORY",
        readTime: "11 min read",
        likes: "2.1k",
        description: "Rock-hewn churches carved into stone.",
        facts:
          "• UNESCO heritage site\n• 11 monolithic churches\n• Built in 12th century\n• Pilgrimage destination",
        highlights: [
          "UNESCO World Heritage Site",
          "11 monolithic rock-hewn churches",
          "Carved by hand in 12th century"
        ]
      },
      {
        id: "adwa",
        name: "Battle of Adwa",
        icon: IMAGES.adwa,
        categoryLabel: "HISTORY",
        readTime: "9 min read",
        likes: "3.4k",
        description: "Historic victory against Italian invasion.",
        facts:
          "• 1896 battle\n• Led by Menelik II\n• Preserved independence\n• African pride symbol",
        highlights: [
          "Fought in 1896",
          "Led by Emperor Menelik II",
          "Preserved Ethiopia's independence"
        ]
      },
      {
        id: "calendar",
        name: "Ethiopian Calendar",
        icon: IMAGES.aksum,
        categoryLabel: "HISTORY",
        readTime: "6 min read",
        likes: "1.1k",
        description: "The unique 13-month calendar system of Ethiopia.",
        facts: "The Ethiopian calendar is the principal calendar used in Ethiopia. It has 13 months: 12 months of 30 days each, and a 13th month (Pagume) of 5 or 6 days depending on whether it's a leap year. It is about 7 to 8 years behind the Gregorian calendar because of different calculations in determining the date of the Annunciation of Jesus.",
        highlights: [
          "Has 13 months",
          "7-8 years behind Gregorian calendar",
          "New Year starts on September 11 or 12"
        ]
      }
    ]
  },

  {
    id: "religion",
    title: "Religion",
    data: [
      {
        id: "orthodox",
        name: "Orthodox Christianity",
        icon: IMAGES.orthodox,
        categoryLabel: "BELIEFS",
        readTime: "8 min read",
        likes: "1.5k",
        description: "Ancient Ethiopian Christian tradition.",
        facts:
          "• 4th century origin\n• Ge'ez liturgy\n• Fasting traditions\n• Lalibela churches",
        highlights: [
          "4th century ancient origin",
          "Liturgy conducted in Ge'ez",
          "Deep fasting & prayer traditions"
        ]
      },
      {
        id: "islam",
        name: "Islam in Ethiopia",
        icon: IMAGES.islam,
        categoryLabel: "BELIEFS",
        readTime: "6 min read",
        likes: "1.1k",
        description: "One of the oldest Muslim communities in Africa.",
        facts:
          "• First Hijra refuge\n• Historic Harar city\n• Peaceful coexistence\n• Cultural heritage",
        highlights: [
          "First Hijra refuge for disciples",
          "Historic walled city of Harar",
          "Centuries of peaceful coexistence"
        ]
      },
      {
        id: "geez",
        name: "Ge'ez Language",
        icon: IMAGES.simien,
        categoryLabel: "BELIEFS",
        readTime: "7 min read",
        likes: "1.3k",
        description: "Ancient South Semitic language and liturgical script.",
        facts: "Ge'ez is an ancient South Semitic language that originated in the northern region of Ethiopia and Eritrea in the Horn of Africa. It later became the official language of the Kingdom of Aksum and the Ethiopian imperial court. Today, it remains the main liturgical language of the Ethiopian Orthodox Tewahedo Church and is the source of the Ge'ez script used to write Amharic, Tigrinya, and other languages.",
        highlights: [
          "Ancient Semitic language",
          "Liturgical language of the Orthodox Church",
          "Origin of the Ge'ez script/alphabet"
        ]
      }
    ]
  },

  {
    id: "festivals",
    title: "Festivals",
    data: [
      {
        id: "timket",
        name: "Timkat",
        icon: IMAGES.timket,
        categoryLabel: "CULTURE",
        readTime: "8 min read",
        likes: "1.8k",
        description: "Ethiopian Epiphany celebration.",
        facts:
          "• Baptism celebration\n• January festival\n• Water rituals\n• Colorful processions",
        highlights: [
          "Celebration of Jesus' baptism",
          "Observed annually in January",
          "Massive, vibrant public processions"
        ]
      },
      {
        id: "meskel",
        name: "Meskel",
        icon: IMAGES.meskel,
        categoryLabel: "CULTURE",
        readTime: "7 min read",
        likes: "1.4k",
        description: "Finding of the True Cross festival.",
        facts:
          "• Bonfire ceremony\n• September celebration\n• Religious gathering\n• Cultural unity",
        highlights: [
          "Demera bonfire ceremony",
          "September spring celebration",
          "Commemorates finding the True Cross"
        ]
      },
      {
        id: "festivals_intro",
        name: "Festivals of Ethiopia",
        icon: IMAGES.timket,
        categoryLabel: "CULTURE",
        readTime: "8 min read",
        likes: "1.8k",
        description: "Vibrant religious and cultural celebrations.",
        facts: "Ethiopian festivals are colorful, spiritual, and deeply rooted in community. Major celebrations like Timkat (Epiphany), Meskel (Finding of the True Cross), and Genna (Ethiopian Christmas) bring millions together in public processions, featuring white-clothed crowds, chanting priests in ceremonial robes, and traditional dancing.",
        highlights: [
          "Deeply spiritual celebrations",
          "Vibrant public street processions",
          "Attracts visitors from around the world"
        ]
      }
    ]
  },

  {
    id: "clothing",
    title: "Traditional Clothing",
    data: [
      {
        id: "habesha",
        name: "Habesha Kemis",
        icon: IMAGES.habesha,
        categoryLabel: "TRADITIONS",
        readTime: "6 min read",
        likes: "980",
        description: "Traditional Ethiopian dress worn by women.",
        facts:
          "• White cotton fabric\n• Colorful embroidery\n• Holiday wear\n• Cultural identity",
        highlights: [
          "Woven from fine white cotton",
          "Intricate hand-stitched embroidery",
          "Worn proudly on holidays and weddings"
        ]
      }
    ]
  },

  {
    id: "music",
    title: "Music & Dance",
    data: [
      {
        id: "eskista",
        name: "Eskista Dance",
        icon: IMAGES.eskista,
        categoryLabel: "CULTURE",
        readTime: "5 min read",
        likes: "1.6k",
        description: "Famous Ethiopian shoulder dance.",
        facts:
          "• Shoulder movements\n• Cultural expression\n• Festival dance\n• Energetic rhythm",
        highlights: [
          "Intense rhythmic shoulder movement",
          "Vibrant form of storytelling",
          "Accompanied by traditional masinko"
        ]
      }
    ]
  },

  {
    id: "food",
    title: "Food & Rituals",
    data: [
      {
        id: "injera",
        name: "Injera",
        icon: IMAGES.injera,
        categoryLabel: "CULTURE",
        readTime: "6 min read",
        likes: "2.4k",
        description: "Staple Ethiopian sour flatbread.",
        facts:
          "• Made from teff\n• Sour taste\n• Shared meals\n• Base of Ethiopian cuisine",
        highlights: [
          "Made from nutrient-rich teff grain",
          "Unique spongy texture and sour taste",
          "Eaten collectively from a shared platter"
        ]
      },
      {
        id: "coffee",
        name: "Ethiopian Coffee Ceremony",
        icon: IMAGES.coffee,
        categoryLabel: "CULTURE",
        readTime: "8 min read",
        likes: "1.2k",
        description: "The traditional Ethiopian coffee ceremony is an important cultural ritual.",
        facts:
          "The Ethiopian coffee ceremony is more than a ritual - it is a way of life. It represents respect, friendship, and community. Green coffee beans are roasted, ground, and brewed in a jebena, filling the air with rich aroma and stories shared among guests.",
        highlights: [
          "Symbol of hospitality",
          "Performed in three rounds",
          "Dates back centuries"
        ]
      },
      {
        id: "food_intro",
        name: "Ethiopian Food & Cuisine",
        icon: IMAGES.injera,
        categoryLabel: "CULTURE",
        readTime: "6 min read",
        likes: "2.4k",
        description: "Spicy stews, injera, and communal eating traditions.",
        facts: "Ethiopian cuisine consists of spicy vegetable and meat dishes, usually in the form of wat (stew), served atop injera, a large sourdough flatbread made of fermented teff flour. Dining is communal, where family and friends share food from a single large platter using their right hands, representing unity and friendship.",
        highlights: [
          "Centered around Injera flatbread",
          "Features spicy Berbere spice blends",
          "Communal dining experience (Gursha)"
        ]
      }
    ]
  },

  {
    id: "landscape",
    title: "Landscapes",
    data: [
      {
        id: "simien",
        name: "Simien Mountains",
        icon: IMAGES.simien,
        categoryLabel: "EXPLORE",
        readTime: "10 min read",
        likes: "1.3k",
        description: "Dramatic mountain ranges of Ethiopia.",
        facts:
          "• UNESCO site\n• Rare wildlife\n• Hiking destination\n• High peaks",
        highlights: [
          "Breathtaking UNESCO mountain range",
          "Habitat of the rare Gelada baboon",
          "Incredible trekking trails"
        ]
      }
    ]
  },

  {
    id: "famous",
    title: "Famous People",
    data: [
      {
        id: "menelik",
        name: "Menelik II",
        icon: IMAGES.menelik,
        categoryLabel: "HISTORY",
        readTime: "9 min read",
        likes: "1.9k",
        description: "Emperor who defeated Italy at Adwa.",
        facts:
          "• Modernized Ethiopia\n• Battle of Adwa leader\n• Expanded empire\n• National hero",
        highlights: [
          "Modernized Ethiopia's infrastructure",
          "Victor of the Battle of Adwa",
          "Revered nationwide as a hero"
        ]
      }
    ]
  }
];

// ─────────────────────────────────────────────
// Derived exports
// ─────────────────────────────────────────────

export const WishlistProducts = PROFILE_MENU
  .flatMap(section => section.data)
  .filter(item =>
    ["origins", "timket", "eskista"].includes(item.id)
  );

// Re-export the image map for convenience
export { IMAGES };