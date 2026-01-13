const API_URL = "http://localhost:3000/api/cities";

const cities = [
  {
    name: "Manali",
    slug: "manali",
    state: "Himachal Pradesh",
    country: "India",
    description:
      "Manali is a popular hill station known for snow-capped mountains and adventure sports.",
    seo: {
      title: "Hotels in Manali",
      description:
        "Book hotels in Manali near Mall Road, Solang Valley and top tourist areas.",
    },
  },
  {
    name: "Goa",
    slug: "goa",
    state: "Goa",
    country: "India",
    description:
      "Goa is famous for its beaches, nightlife, and Portuguese heritage.",
    seo: {
      title: "Hotels in Goa",
      description:
        "Book beachside hotels in Goa with best prices and verified reviews.",
    },
  },
  {
    name: "Gurgaon",
    slug: "gurgaon",
    state: "Haryana",
    country: "India",
    description:
      "Gurgaon is a major corporate and business hub near Delhi NCR.",
    seo: {
      title: "Hotels in Gurgaon",
      description:
        "Book business hotels in Gurgaon near Cyber City and Golf Course Road.",
    },
  },
  {
    name: "Delhi",
    slug: "delhi",
    state: "Delhi",
    country: "India",
    description:
      "Delhi is the capital of India, known for historic monuments, culture, and food.",
    seo: {
      title: "Hotels in Delhi",
      description:
        "Find hotels in Delhi near Connaught Place, Airport, and major attractions.",
    },
  },
  {
    name: "Dwarka",
    slug: "dwarka",
    state: "Gujarat",
    country: "India",
    description:
      "Dwarka is a sacred city associated with Lord Krishna and ancient temples.",
    seo: {
      title: "Hotels in Dwarka",
      description:
        "Book hotels in Dwarka near Dwarkadhish Temple for a comfortable stay.",
    },
  },
  {
    name: "Jaipur",
    slug: "jaipur",
    state: "Rajasthan",
    country: "India",
    description: "Jaipur is the Pink City, famous for royal palaces and forts.",
    seo: {
      title: "Hotels in Jaipur",
      description:
        "Book heritage and budget hotels in Jaipur near Amer Fort and City Palace.",
    },
  },
  {
    name: "Udaipur",
    slug: "udaipur",
    state: "Rajasthan",
    country: "India",
    description:
      "Udaipur is known as the City of Lakes with royal palaces and scenic beauty.",
    seo: {
      title: "Hotels in Udaipur",
      description:
        "Book lake-view hotels in Udaipur for a romantic and luxury stay.",
    },
  },
  {
    name: "Jodhpur",
    slug: "jodhpur",
    state: "Rajasthan",
    country: "India",
    description:
      "Jodhpur is the Blue City, famous for Mehrangarh Fort and old town charm.",
    seo: {
      title: "Hotels in Jodhpur",
      description:
        "Book hotels in Jodhpur near Mehrangarh Fort and city center.",
    },
  },
  {
    name: "Ooty",
    slug: "ooty",
    state: "Tamil Nadu",
    country: "India",
    description:
      "Ooty is a scenic hill station known for tea gardens and pleasant weather.",
    seo: {
      title: "Hotels in Ooty",
      description: "Book hotels in Ooty near Botanical Gardens and Ooty Lake.",
    },
  },
  {
    name: "Darjeeling",
    slug: "darjeeling",
    state: "West Bengal",
    country: "India",
    description:
      "Darjeeling is famous for tea plantations and views of Kanchenjunga.",
    seo: {
      title: "Hotels in Darjeeling",
      description:
        "Book hotels in Darjeeling near Mall Road with mountain views.",
    },
  },
];

async function seedCities() {
  const { default: fetch } = await import("node-fetch");
  for (const city of cities) {
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(city),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error(`❌ Failed: ${city.name}`, data);
      } else {
        console.log(`✅ Created: ${city.name}`);
      }
    } catch (err) {
      console.error(`🔥 Error creating ${city.name}`, err.message);
    }
  }

  console.log("🎉 City seeding completed");
}

seedCities();
