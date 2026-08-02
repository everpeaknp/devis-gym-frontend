
export type Verifiable<T> = {
  value: T | null;
  status: "verified" | "needs_verification";
};

function verified<T>(value: T): Verifiable<T> {
  return { value, status: "verified" };
}

function unverified<T = string>(): Verifiable<T> {
  return { value: null, status: "needs_verification" };
}

export const businessData = {
  name: "Devi's Gym",

  location: {
    city: "Pokhara",
    country: "Nepal",
    region: "Gandaki Province",
    area: "Davidfall-17",
    street: "Near Davidfall, Street No: 18",
    latitude: 28.1894062,
    longitude: 83.9592543,
    mapsUrl: "https://maps.app.goo.gl/X1WJEYrXmdEHGc4K7",
    mapsUrlFull: "https://maps.app.goo.gl/X1WJEYrXmdEHGc4K7",
    address: verified("Near Davidfall, Street No: 18, Pokhara Davidfall-17"),
  },

  contact: {
    phone: verified("9806641537"),
    email: verified("devisgym@gmail.com"),
    whatsapp: unverified<string>(),
  },

  hours: verified({
    monday: "6:00 AM - 9:00 PM",
    tuesday: "6:00 AM - 9:00 PM", 
    wednesday: "6:00 AM - 9:00 PM",
    thursday: "6:00 AM - 9:00 PM",
    friday: "6:00 AM - 9:00 PM",
    saturday: "7:00 AM - 8:00 PM",
    sunday: "7:00 AM - 8:00 PM",
    display: "Mon-Fri: 6:00 AM - 9:00 PM | Sat-Sun: 7:00 AM - 8:00 PM"
  }),

  parking: verified({
    available: true,
    type: "Street parking available",
    description: "Convenient street parking available near the facility"
  }),

  description: unverified<string>(),

  tagline: "TRAIN. FUEL. REPEAT.",

  establishedYear: unverified<number>(),
} as const;

export { verified, unverified };
