export const invite = {
  couple: {
    bride: "Nainika",
    groom: "Manish",
    tagline: "With blessings & love, we invite you to celebrate our wedding.",
  },
  city: "Gorakhpur,U.P, India",
  dateISO: "2026-02-24T19:00:00+05:30",

  // 🎵 optional background music (keep file in /public/audio/)
  music: {
    src: "/audio/song.mp3",
    title: "Wedding Theme",
  },

  // ✅ HERO SLIDER (5 images + per slide headings)
  // Put images in: /public/images/
  slides: [
    {
      src: "/images/slide-1.jpg",
      alt: "Couple photo 1",
      eyebrow: "Featured Moments",
      title: "A Celebration of Love",
      subtitle:
        "A premium beginning to our forever — thank you for being part of it.",
      pos: "50% 30%",
    },
    {
      src: "/images/slide-2.jpg",
      alt: "Couple photo 2",
      eyebrow: "Wedding Journey",
      title: "Together, Always",
      subtitle: "Two hearts • One promise • A lifetime of memories.",
      pos: "50% 70%",
    },
    {
      src: "/images/slide-3.jpg",
      alt: "Couple photo 3",
      eyebrow: "Save The Date",
      title: "The Grand Day",
      subtitle: "A sacred union - blessings , rituals, and forever begins.",
      pos: "50% 50%",
    },
    {
      src: "/images/slide-4.jpg",
      alt: "Couple photo 4",
      eyebrow: "With Blessings",
      title: "Celebrate With us",
      subtitle:
        "Your presence will make our day even more special and memorable.",
      pos: "50% 30%",
    },
    {
      src: "/images/slide-5.jpg",
      alt: "Couple photo 5",
      eyebrow: "Our Wedding",
      title: "A Royal Celebration",
      subtitle: "An elegant evening of love , joy , and heartfelt moments.",
      pos: "50% 15%",
    },
  ] as const,

  // events must have kind (used for icons / tints)
  events: [
    {
      kind: "mehndi",
      title: "Mehndi",
      date: "22 Feb 2026",
      time: "4:00 PM",
      venue: "Our Residence Ward No. 11, Gandhi Nagar, Mundera Bazar",
      mapUrl: "https://maps.google.com",
    },
    {
      kind: "haldi",
      title: "Haldi",
      date: "22 Feb 2026",
      time: "10:00 AM",
      venue: "Our Residence Ward No. 11, Gandhi Nagar, Mundera Bazar",
      mapUrl: "https://maps.google.com",
    },
    {
      kind: "sangeet",
      title: "Sangeet",
      date: "22 Feb 2026",
      time: "7:30 PM",
      venue: "Our Residence Ward No. 11, Gandhi Nagar, Mundera Bazar",
      mapUrl: "https://maps.google.com",
    },
    {
      kind: "wedding",
      title: "Wedding",
      date: "24 Feb 2026",
      time: "7:00 PM",
      venue: "The Ganga Resort A venture of Royal Darbar, Deoria Bypass Rd, Khorabar, Siktaur, Uttar Pradesh",
      mapUrl: "https://maps.google.com",
    },
  ] as const,

  venue: {
    name: "The Ganga Resort (Royal Darbar)",
    address:
      "The Ganga Resort A venture of Royal Darbar, Deoria Bypass Rd, Khorabar, Siktaur, Uttar Pradesh 273010",
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3564.353287615199!2d83.42937967494024!3d26.701158369150995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39915df7cd6eec73%3A0xe809bb019257ca5c!2sThe%20Ganga%20Resort%20(Royal%20Darbar)%20%2F%20Best%20Ac%20Banquet%20%2F%20Resort%20%2F%20Marriage%20Lawn%20%2F%20Sangeet%2C%20Mehandi%2C%20Event%20Venue!5e0!3m2!1sen!2sin!4v1767896800049!5m2!1sen!2sin",
    directionsUrl:
      "https://www.google.com/maps/dir//The+Ganga+Resort+(Royal+Darbar)+%2F+Best+Ac+Banquet+%2F+Resort+%2F+Marriage+Lawn+%2F+Sangeet,+Mehandi,+Event+Venue,+The+Ganga+Resort+A+venture+of+Royal+Darbar,+Deoria+Bypass+Rd,+Khorabar,+Siktaur,+Uttar+Pradesh+273010/@26.7011586,83.4319646,11z/data=!3m1!4b1!4m9!4m8!1m0!1m5!1m1!1s0x39915df7cd6eec73:0xe809bb019257ca5c!2m2!1d83.4319546!2d26.7011536!3e0?entry=ttu&g_ep=EgoyMDI2MDEwNC4wIKXMDSoASAFQAw%3D%3D",
  },

  // theme: {
  //   title: "Dress Code / Theme",
  //   note: "This is just a suggestion — please feel free to wear what you’re comfortable in.",
  //   events: [
  //     {
  //       key: "mehndi",
  //       title: "Mehndi",
  //       accent: "emerald", // used for subtle UI tone
  //       men: [
  //         "Ivory/Beige Kurta",
  //         "Emerald / Bottle-green Nehru jacket (optional)",
  //         "Comfortable Mojari/Loafers",
  //       ],
  //       women: [
  //         "Pastel Green / Mint / Mehndi tones",
  //         "Light embroidery / floral prints",
  //         "Comfortable footwear (you’ll move a lot)",
  //       ],
  //     },
  //     {
  //       key: "haldi",
  //       title: "Haldi",
  //       accent: "yellow",
  //       men: [
  //         "White/Off-white Kurta",
  //         "Yellow stole / pocket square",
  //         "Simple sandals / juttis",
  //       ],
  //       women: [
  //         "Yellow / Mustard / Marigold shades",
  //         "Light saree / suit / lehenga",
  //         "Avoid heavy heels (haldi fun!)",
  //       ],
  //     },
  //     {
  //       key: "sangeet",
  //       title: "Sangeet",
  //       accent: "lavender",
  //       men: [
  //         "Midnight Navy / Black with shimmer",
  //         "Indo-western / blazer look",
  //         "Polished shoes",
  //       ],
  //       women: [
  //         "Lavender / Lilac / Champagne glam",
  //         "Sequins / shimmer works great",
  //         "Statement earrings recommended",
  //       ],
  //     },
  //     {
  //       key: "wedding",
  //       title: "Wedding",
  //       accent: "gold",
  //       men: [
  //         "Classic Sherwani / Bandhgala",
  //         "Maroon / Navy / Ivory with gold accents",
  //         "Traditional footwear",
  //       ],
  //       women: [
  //         "Red / Wine / Ivory / Gold tones",
  //         "Traditional saree / lehenga",
  //         "Elegant jewelry + dupatta drape",
  //       ],
  //     },
  //   ],
  // },

  theme: {
    title: "Dress Code / Theme",
    note: "This is just a suggestion — please feel free to wear what you’re comfortable in.",
    events: [
      {
        key: "mehndi",
        title: "Mehndi",
        accent: "emerald",
        photoTag: "Photo-friendly • Fresh tones",
        palette: ["#D1FAE5", "#10B981", "#065F46"], // mint, emerald, deep green
        men: [
          "Ivory/Beige Kurta",
          "Emerald / Bottle-green Nehru jacket (optional)",
          "Comfortable Mojari/Loafers",
        ],
        women: [
          "Pastel Green / Mint / Mehndi tones",
          "Light embroidery / floral prints",
          "Comfortable footwear (you’ll move a lot)",
        ],
      },
      {
        key: "haldi",
        title: "Haldi",
        accent: "yellow",
        photoTag: "Photo-friendly • Bright & joyful",
        palette: ["#FEF9C3", "#FACC15", "#A16207"], // soft yellow, marigold, warm gold
        men: [
          "White/Off-white Kurta",
          "Yellow stole / pocket square",
          "Simple sandals / juttis",
        ],
        women: [
          "Yellow / Mustard / Marigold shades",
          "Light saree / suit / lehenga",
          "Avoid heavy heels (haldi fun!)",
        ],
      },
      {
        key: "sangeet",
        title: "Sangeet",
        accent: "lavender",
        photoTag: "Photo-friendly • Glam night",
        palette: ["#F3E8FF", "#A855F7", "#6D28D9"], // lavender, purple, deep violet
        men: [
          "Midnight Navy / Black with shimmer",
          "Indo-western / blazer look",
          "Polished shoes",
        ],
        women: [
          "Lavender / Lilac / Champagne glam",
          "Sequins / shimmer works great",
          "Statement earrings recommended",
        ],
      },
      {
        key: "wedding",
        title: "Wedding",
        accent: "gold",
        photoTag: "Photo-friendly • Royal classic",
        palette: ["#FEF3C7", "#D6AF61", "#7C4A14"], // champagne, gold, deep bronze
        men: [
          "Classic Sherwani / Bandhgala",
          "Maroon / Navy / Ivory with gold accents",
          "Traditional footwear",
        ],
        women: [
          "Red / Wine / Ivory / Gold tones",
          "Traditional saree / lehenga",
          "Elegant jewelry + dupatta drape",
        ],
      },
    ],
  },

  contact: {
    primaryName: "Rajesh Kumar Jaiswal",
    primaryPhone: "+919450440078",
    secondaryName: "Mukul Jaiswal",
    secondaryPhone: "+919919371299",
  },
  calendar: {
    title: "Wedding Celebration",
    details:
      "You are warmly invited to our wedding celebration. Please arrive 15 minutes early.",
    // main wedding start (same as dateISO)
    startISO: "2026-02-24T19:00:00+05:30",
    durationMinutes: 240, // 4 hours (change as you want)
  },
};
