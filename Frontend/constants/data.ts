// constants/data.ts

// 🧭 Categories (Home Screen)
export const categories = [
  {
    id: "history",
    title: "History",
    icon: "book",
  },
  {
    id: "culture",
    title: "Culture",
    icon: "color-palette",
  },
  {
    id: "religion",
    title: "Religion",
    icon: "library",
  },
  {
    id: "food",
    title: "Food",
    icon: "restaurant",
  },
  {
    id: "music",
    title: "Music",
    icon: "musical-notes",
  },
  {
    id: "clothing",
    title: "Clothing",
    icon: "shirt",
  },
];


// 🌍 Explore Topics
export const topics = [
  {
    id: "lalibela",
    title: "Lalibela Churches",
    category: "history",
    description: "Rock-hewn churches built in the 12th century.",
  },
  {
    id: "aksum",
    title: "Aksum Kingdom",
    category: "history",
    description: "Ancient Ethiopian civilization and trade power.",
  },
  {
    id: "timket",
    title: "Timket Festival",
    category: "religion",
    description: "Celebration of Epiphany in Ethiopia.",
  },
  {
    id: "meskel",
    title: "Meskel Festival",
    category: "religion",
    description: "Finding of the True Cross celebration.",
  },
  {
    id: "injera",
    title: "Injera",
    category: "food",
    description: "Traditional Ethiopian sourdough flatbread.",
  },
  {
    id: "coffee",
    title: "Coffee Ceremony",
    category: "culture",
    description: "Traditional Ethiopian coffee ritual.",
  },
  {
    id: "eskista",
    title: "Eskista Dance",
    category: "music",
    description: "Traditional shoulder dance.",
  },
];


// 📚 Detailed Content (used for detail page or offline AI)
export const details = {
  lalibela: {
    title: "Lalibela Churches",
    content:
      "The rock-hewn churches of Lalibela are a UNESCO World Heritage site, carved out of solid rock in the 12th century during the reign of King Lalibela.",
  },

  aksum: {
    title: "Aksum Kingdom",
    content:
      "The Kingdom of Aksum was one of the great civilizations of ancient Africa, known for its trade, architecture, and early adoption of Christianity.",
  },

  timket: {
    title: "Timket Festival",
    content:
      "Timket is celebrated on January 19th and commemorates the baptism of Jesus Christ in the Jordan River.",
  },

  meskel: {
    title: "Meskel Festival",
    content:
      "Meskel celebrates the discovery of the True Cross by Queen Helena in the 4th century.",
  },

  injera: {
    title: "Injera",
    content:
      "Injera is a staple Ethiopian food made from teff flour, known for its spongy texture and sour taste.",
  },

  coffee: {
    title: "Coffee Ceremony",
    content:
      "Ethiopia is the birthplace of coffee, and the traditional ceremony is an important cultural ritual.",
  },

  eskista: {
    title: "Eskista Dance",
    content:
      "Eskista is a traditional Ethiopian dance known for its intense shoulder movements.",
  },
};


// 💬 Suggested Chat Questions
export const suggestedQuestions = [
  "What is the history of Ethiopia?",
  "Tell me about Lalibela churches",
  "What is Timket festival?",
  "What food is Ethiopia famous for?",
  "Explain Ethiopian coffee ceremony",
];


// ⭐ Popular Places (for Explore UI)
export const places = [
  {
    id: "addis",
    name: "Addis Ababa",
    description: "Capital city of Ethiopia.",
  },
  {
    id: "gondar",
    name: "Gondar",
    description: "Known for castles and royal history.",
  },
  {
    id: "bahirdar",
    name: "Bahir Dar",
    description: "Near Lake Tana and Blue Nile Falls.",
  },
  {
    id: "lalibela_place",
    name: "Lalibela",
    description: "Famous for rock-hewn churches.",
  },
];