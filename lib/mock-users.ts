export interface UserProfile {
  id: string;
  name: string;
  email: string;
  password: string;
  gender: "male" | "female";
  avatar?: string;
  preferences: {
    skinType?: "dry" | "oily" | "combination" | "sensitive" | "normal";
    favoriteScents?: string[];
    wellnessGoals?: string[];
    preferredRituals?: string[];
  };
  membershipTier: "explorer" | "lover" | "soulpartner";
  journalEntries: JournalEntry[];
}

export interface JournalEntry {
  id: string;
  date: string;
  mood: "great" | "good" | "okay" | "low";
  notes?: string;
  ritualCompleted?: string;
}

export const mockUsers: UserProfile[] = [
  {
    id: "1",
    name: "Berny",
    email: "berny@example.com",
    password: "password123",
    gender: "male",
    preferences: {
      skinType: "combination",
      favoriteScents: ["sandalwood", "cedar", "bergamot"],
      wellnessGoals: ["stress relief", "better sleep"],
      preferredRituals: ["Ritual of Samurai", "Ritual of Mehr"],
    },
    membershipTier: "soulpartner",
    journalEntries: [
      {
        id: "j1",
        date: "2025-01-20",
        mood: "great",
        notes: "Morning meditation was incredibly calming today.",
        ritualCompleted: "Ritual of Samurai",
      },
      {
        id: "j2",
        date: "2025-01-19",
        mood: "good",
        notes: "Evening skincare routine helped me unwind.",
        ritualCompleted: "Ritual of Mehr",
      },
    ],
  },
  {
    id: "2",
    name: "Thania",
    email: "thania@example.com",
    password: "password123",
    gender: "female",
    preferences: {
      skinType: "dry",
      favoriteScents: ["cherry blossom", "rice milk", "rose"],
      wellnessGoals: ["self-care", "mindfulness"],
      preferredRituals: ["Ritual of Sakura", "Ritual of Ayurveda"],
    },
    membershipTier: "lover",
    journalEntries: [
      {
        id: "j3",
        date: "2025-01-20",
        mood: "good",
        notes: "Loved the new body cream from Sakura collection.",
        ritualCompleted: "Ritual of Sakura",
      },
    ],
  },
  {
    id: "3",
    name: "Anna",
    email: "anna@example.com",
    password: "password123",
    gender: "female",
    preferences: {
      skinType: "sensitive",
      favoriteScents: ["lavender", "chamomile", "vanilla"],
      wellnessGoals: ["relaxation", "skin health"],
      preferredRituals: ["Ritual of Jing", "Ritual of Karma"],
    },
    membershipTier: "soulpartner",
    journalEntries: [
      {
        id: "j4",
        date: "2025-01-20",
        mood: "okay",
        notes: "Feeling a bit tired, but the evening bath helped.",
        ritualCompleted: "Ritual of Jing",
      },
      {
        id: "j5",
        date: "2025-01-18",
        mood: "great",
        notes: "The Karma fragrance is my new favorite!",
        ritualCompleted: "Ritual of Karma",
      },
    ],
  },
  {
    id: "4",
    name: "Rio",
    email: "rio@example.com",
    password: "password123",
    gender: "female",
    preferences: {
      skinType: "oily",
      favoriteScents: ["citrus", "eucalyptus", "mint"],
      wellnessGoals: ["energy boost", "morning routine"],
      preferredRituals: ["Ritual of Hammam", "Ritual of Dao"],
    },
    membershipTier: "explorer",
    journalEntries: [
      {
        id: "j6",
        date: "2025-01-19",
        mood: "great",
        notes: "The Hammam scrub gave me such refreshed skin!",
        ritualCompleted: "Ritual of Hammam",
      },
    ],
  },
  {
    id: "5",
    name: "Claudia",
    email: "claudia@example.com",
    password: "password123",
    gender: "female",
    preferences: {
      skinType: "normal",
      favoriteScents: ["amber", "musk", "oud"],
      wellnessGoals: ["luxury experience", "evening wind-down"],
      preferredRituals: ["Ritual of Oudh", "Ritual of Mehr"],
    },
    membershipTier: "soulpartner",
    journalEntries: [
      {
        id: "j7",
        date: "2025-01-20",
        mood: "great",
        notes: "The Oudh collection is pure luxury.",
        ritualCompleted: "Ritual of Oudh",
      },
      {
        id: "j8",
        date: "2025-01-17",
        mood: "good",
        notes: "Tried the new candle, perfect ambiance.",
        ritualCompleted: "Ritual of Mehr",
      },
    ],
  },
  {
    id: "6",
    name: "Aurora",
    email: "aurora@example.com",
    password: "password123",
    gender: "female",
    preferences: {
      skinType: "combination",
      favoriteScents: ["green tea", "jasmine", "white lotus"],
      wellnessGoals: ["balance", "meditation"],
      preferredRituals: ["Ritual of Karma", "Ritual of Ayurveda"],
    },
    membershipTier: "lover",
    journalEntries: [
      {
        id: "j9",
        date: "2025-01-20",
        mood: "good",
        notes: "Morning yoga followed by Ayurveda products.",
        ritualCompleted: "Ritual of Ayurveda",
      },
      {
        id: "j10",
        date: "2025-01-16",
        mood: "great",
        notes: "Found my inner peace today.",
        ritualCompleted: "Ritual of Karma",
      },
    ],
  },
];

export function authenticateUser(
  name: string,
  password: string
): UserProfile | null {
  const user = mockUsers.find(
    (u) =>
      u.name.toLowerCase() === name.toLowerCase() && u.password === password
  );
  return user || null;
}

export function getUserById(id: string): UserProfile | null {
  return mockUsers.find((u) => u.id === id) || null;
}
