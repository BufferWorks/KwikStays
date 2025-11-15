"use client";
import React, { useState } from "react";
import {
  Star,
  Wifi,
  Utensils,
  Tv2,
  ParkingCircle,
  Coffee,
  Airplay,
  Snowflake,
  X,
  CheckCircle,
  MapPin,
  ShieldCheck,
  Clock,
} from "lucide-react";
import Image from "next/image";

// --- Mock data for a hotel ---
const sampleHotel = {
  id: 78986,
  name: "Happy Stays Bangalore",
  location: {
    city: "Bangalore",
    area: "Koramangala",
    full: "Koramangala, Bangalore",
  },
  heroImage:
    "https://images.oyoroomscdn.com/uploads/hotel_image/270343/large/dyvburfrtlmi.jpg",
  gallery: [
    "https://images.oyoroomscdn.com/uploads/hotel_image/270343/large/cxafasrmkmbe.jpg",
    "https://images.oyoroomscdn.com/uploads/hotel_image/270343/large/mrdtxstiqaor.jpg",
    "https://images.oyoroomscdn.com/uploads/hotel_image/270343/large/ekekesxcollk.jpg",
  ],
  rating: 4.8,
  reviews: 1342,
  minPrice: 2680,
  currency: "INR",
  quickAmenities: [
    { icon: Wifi, text: "Free WiFi" },
    { icon: ParkingCircle, text: "Parking" },
    { icon: Utensils, text: "Breakfast" },
    { icon: Coffee, text: "Cafe" },
    { icon: Airplay, text: "AC" },
  ],
  description:
    "Welcome to Happy Stays! Enjoy luxury and comfort in the heart of Koramangala, Bangalore—featuring modern rooms, all essential amenities, and warm friendly service. Shops, parks, and major business centers are just steps away.",
  fullAmenities: [
    { icon: Wifi, text: "Free WiFi" },
    { icon: ParkingCircle, text: "Free Parking" },
    { icon: Airplay, text: "Air Conditioning" },
    { icon: Utensils, text: "Restaurant" },
    { icon: Coffee, text: "Cafe Bar" },
    { icon: Tv2, text: "Smart TV" },
    { icon: Snowflake, text: "Refrigerator" },
    { icon: ShieldCheck, text: "CCTV Security" },
    { icon: CheckCircle, text: "24x7 Reception" },
  ],
  roomTypes: [
    {
      name: "Standard Room",
      image: "https://images.oyoroomscdn.com/uploads/hotel_image/270343/large/cxafasrmkmbe.jpg",
      price: 2680,
      occupancy: 2,
      beds: "1 Queen Bed",
      amenities: ["AC", "WiFi", "TV"],
      refundable: true,
    },
    {
      name: "Deluxe Room",
      image: "https://images.oyoroomscdn.com/uploads/hotel_image/270343/large/ekekesxcollk.jpg",
      price: 3499,
      occupancy: 3,
      beds: "2 Double Beds",
      amenities: ["AC", "WiFi", "TV", "Breakfast"],
      refundable: false,
    },
  ],
  policies: [
    { icon: Clock, title: "Check-in", value: "After 12:00 PM" },
    { icon: Clock, title: "Check-out", value: "Before 11:00 AM" },
    { icon: X, title: "Pets", value: "Not allowed" },
    { icon: CheckCircle, title: "ID Proof", value: "Required" },
    { icon: ShieldCheck, title: "Safety", value: "24x7 Security" },
  ],
  map: {
    lat: 12.93441,
    lng: 77.61443,
    staticImg: "https://developers.google.com/static/maps/images/landing/hero_maps_static_api.png",
    nearby: ["Forum Mall (0.6km)", "Christ University (1.2km)", "HSR Layout (2.0km)", "BTM Layout (2.4km)"],
  },
  reviews: [
    {
      name: "Disha P.",
      rating: 5,
      date: "March 2024",
      text: "Amazing stay! Clean rooms and very helpful staff. Location is unbeatable.",
      avatar: "https://placehold.co/48x48/ffe7b1/242a3a.png?text=D",
    },
    {
      name: "Arun T.",
      rating: 4,
      date: "February 2024",
      text: "Good value and breakfast, but AC could be improved.",
      avatar: "https://placehold.co/48x48/dbeafe/242a3a.png?text=A",
    },
  ],
  faqs: [
    { q: "Is breakfast included?", a: "Yes, for select room types." },
    { q: "Is parking available?", a: "Free on-site parking is available." },
    { q: "Are unmarried couples allowed?", a: "Yes, with valid ID proof." },
    { q: "What payment methods?", a: "Cash, UPI, major debit/credit cards." },
  ],
  similarHotels: [
    {
      name: "Coral Inn",
      area: "HSR Layout",
      image: "https://images.oyoroomscdn.com/uploads/hotel_image/300333/large/bpsjnaqoyqvs.jpg",
      price: 2420,
      rating: 4.5,
    },
    {
      name: "Palm Residency",
      area: "BTM Layout",
      image: "https://images.oyoroomscdn.com/uploads/hotel_image/294838/large/neccmgjfokbx.jpg",
      price: 2099,
      rating: 4.2,
    },
  ],
};

// --- COMPONENTS ---
function Breadcrumb({ city, area, hotel }) {
  return (
    <nav className="text-xs text-gray-500 py-3 flex flex-wrap gap-1" aria-label="Breadcrumb">
      <a href="/" className="hover:text-[#f8a11e]">Home</a>/
      <a href="/hotels" className="hover:text-[#f8a11e]">Hotels</a>/
      <a href={`/hotels/${city.toLowerCase()}`} className="hover:text-[#f8a11e] capitalize">{city}</a>/
      <a href={`/hotels/${city.toLowerCase()}/${area.toLowerCase()}`} className="hover:text-[#f8a11e] capitalize">{area}</a>/
      <span className="font-semibold text-gray-800 truncate max-w-[60vw] md:max-w-xs">{hotel}</span>
    </nav>
  );
}

function Hero({ hotel }) {
  return (
    <section className="relative rounded-b-3xl shadow-2xl overflow-hidden min-h-[280px] md:min-h-[500px] lg:min-h-[600px]">
      <img
        src={hotel.heroImage}
        alt={hotel.name}
        className="w-full h-[280px] md:h-[500px] lg:h-[600px] object-cover object-center"
      />
      <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/30 to-black/80"></div>
      <div className="absolute left-0 right-0 bottom-0 top-0 flex flex-col justify-end p-6 md:p-12 lg:p-16">
        <div className="max-w-4xl">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white drop-shadow-2xl mb-3">{hotel.name}</h1>
          <div className="flex flex-wrap gap-x-4 gap-y-2 items-center text-base md:text-lg text-gray-100">
            <div className="flex items-center gap-2">
              <MapPin size={20} className="text-[#f8a11e]" />
              <span className="font-medium">{hotel.location.full}</span>
            </div>
            <span className="hidden md:inline">·</span>
            <div className="flex items-center gap-2">
              <Star size={18} className="text-[#f8a11e] fill-[#f8a11e]" />
              <span className="font-semibold">{hotel.rating}</span>
              <span className="text-sm text-gray-300">({hotel.reviews.toLocaleString()} reviews)</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Gallery({ gallery }) {
  const [selectedImage, setSelectedImage] = useState(0);
  return (
    <section className="my-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
        {gallery.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedImage(idx)}
            className={`relative overflow-hidden rounded-xl ${
              idx === 0 ? "col-span-2 md:col-span-2 row-span-2" : ""
            } ${selectedImage === idx ? "ring-2 ring-[#f8a11e]" : ""}`}
          >
            <img
              src={img}
              alt={`Gallery ${idx + 1}`}
              className={`w-full h-full object-cover transition-transform ${
                idx === 0 ? "h-48 md:h-80" : "h-24 md:h-36"
              } hover:scale-105`}
            />
          </button>
        ))}
      </div>
    </section>
  );
}

function QuickAmenities({ hotel }) {
  return (
    <section className="flex gap-3 flex-wrap my-6">
      {hotel.quickAmenities.map((am, idx) => (
        <span key={am.text} className="flex gap-2 items-center bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 rounded-full px-4 py-2 text-sm font-medium text-gray-800 shadow-sm">
          <am.icon size={18} className="text-[#f8a11e]" /> {am.text}
        </span>
      ))}
    </section>
  );
}

function RoomTypes({ roomTypes }) {
  return (
    <section className="my-8">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900">Available Rooms</h2>
      <div className="flex gap-4 pb-4 overflow-x-auto snap-x md:grid md:grid-cols-2 lg:grid-cols-2 md:gap-6 md:overflow-visible" aria-label="Available rooms">
        {roomTypes.map(room => (
          <div key={room.name} className="min-w-[280px] md:min-w-0 bg-white border-2 border-gray-200 rounded-2xl shadow-lg hover:shadow-xl snap-start flex flex-col transition-all duration-300 overflow-hidden">
            <img src={room.image} alt={room.name} className="h-40 md:h-48 w-full object-cover" />
            <div className="p-5 flex-1 flex flex-col gap-3">
              <div>
                <h3 className="font-bold text-lg text-gray-900 mb-1">{room.name}</h3>
                <div className="text-sm text-gray-600 mb-2">{room.beds} ・ Up to {room.occupancy} guests</div>
                <div className="flex gap-2 text-xs text-gray-600 flex-wrap">
                  {room.amenities.map(a => <span key={a} className="bg-gray-100 rounded-full px-3 py-1 font-medium">{a}</span>)}
                </div>
              </div>
              <div className="mt-auto pt-3 border-t border-gray-200">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <span className="text-2xl font-bold text-[#f8a11e]">₹{room.price.toLocaleString()}</span>
                    <span className="text-sm text-gray-500 ml-1">/night</span>
                  </div>
                  {room.refundable ? (
                    <span className="text-green-600 text-xs font-semibold bg-green-50 px-2 py-1 rounded-full">Free cancellation</span>
                  ) : (
                    <span className="text-red-600 text-xs font-semibold bg-red-50 px-2 py-1 rounded-full">Non-refundable</span>
                  )}
                </div>
                <a href="#" className="w-full py-3 rounded-xl font-semibold bg-[#f8a11e] text-white text-center text-base hover:bg-[#ffb649] active:scale-95 transition shadow-md hover:shadow-lg">Reserve Now</a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function BookingCard({ hotel }) {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(2);
  
  return (
    <div className="hidden lg:block lg:sticky lg:top-24 lg:self-start">
      <div className="bg-white border-2 border-gray-200 rounded-2xl shadow-xl p-6 w-80">
        <div className="mb-6">
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-3xl font-bold text-[#f8a11e]">₹{hotel.minPrice.toLocaleString()}</span>
            <span className="text-gray-600">/night</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Star size={16} className="text-[#f8a11e] fill-[#f8a11e]" />
            <span className="font-semibold">{hotel.rating}</span>
            <span>・</span>
            <span>{hotel.reviews.toLocaleString()} reviews</span>
          </div>
        </div>
        
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Check-in</label>
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="w-full border-2 border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-[#f8a11e] focus:border-[#f8a11e] outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Check-out</label>
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="w-full border-2 border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-[#f8a11e] focus:border-[#f8a11e] outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Guests</label>
            <input
              type="number"
              min="1"
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
              className="w-full border-2 border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-[#f8a11e] focus:border-[#f8a11e] outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full py-4 rounded-xl font-bold text-lg bg-[#f8a11e] text-white hover:bg-[#ffb649] transition shadow-lg hover:shadow-xl"
          >
            Check Availability
          </button>
        </form>
        
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex justify-between">
              <span>₹{hotel.minPrice.toLocaleString()} x 1 night</span>
              <span>₹{hotel.minPrice.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Service fee</span>
              <span>₹{(hotel.minPrice * 0.1).toFixed(0)}</span>
            </div>
            <div className="flex justify-between font-bold text-lg text-gray-900 pt-2 border-t border-gray-200">
              <span>Total</span>
              <span>₹{(hotel.minPrice * 1.1).toFixed(0)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AboutSection({ description }) {
  return (
    <section className="my-8">
      <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">About this property</h2>
      <p className="text-gray-700 text-base md:text-lg leading-relaxed max-w-3xl">{description}</p>
    </section>
  );
}

function AmenitiesGrid({ amenities }) {
  return (
    <section className="my-8">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900">Amenities</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 gap-4">
        {amenities.map(am => (
          <div key={am.text} className="flex items-center gap-3 text-gray-700 bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-200 rounded-xl px-4 py-3 shadow-sm hover:shadow-md transition">
            <am.icon size={20} className="text-[#f8a11e]" />
            <span className="text-sm font-medium">{am.text}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function PoliciesSection({ policies }) {
  return (
    <section className="my-8">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900">Policies</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {policies.map(p => (
          <div key={p.title} className="flex items-center gap-3 py-4 px-5 bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-200 rounded-xl text-gray-700 shadow-sm hover:shadow-md transition">
            <p.icon size={20} className="text-[#f8a11e]" />
            <div>
              <span className="font-bold text-gray-900">{p.title}:</span>
              <span className="ml-2">{p.value}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function MapSection({ map }) {
  return (
    <section className="my-8">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900">Location & Nearby</h2>
      <div className="flex gap-6 flex-col lg:flex-row">
        <img
          src={map.staticImg}
          alt="map location preview"
          className="rounded-2xl w-full lg:w-96 lg:h-64 object-cover border-2 border-gray-200 shadow-lg"
        />
        <ul className="flex-1 text-gray-700 text-base flex flex-col gap-3">
          {map.nearby.map(l => (
            <li key={l} className="flex items-center gap-3 py-2 px-4 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition">
              <MapPin size={18} className="text-[#f8a11e]" />
              <span className="font-medium">{l}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Reviews({ reviews }) {
  return (
    <section className="my-8">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900">Guest Reviews</h2>
      <div className="flex flex-col gap-4">
        {reviews.map((r, idx) => (
          <div key={idx} className="bg-gradient-to-br from-white to-gray-50 border-2 border-gray-200 rounded-2xl shadow-md p-6 flex gap-5 items-start hover:shadow-lg transition">
            <img
              src={r.avatar}
              alt={r.name}
              className="w-14 h-14 rounded-full border-2 border-[#f8a11e] shadow-md"
            />
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className="font-bold text-lg text-gray-900">{r.name}</span>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className={i < r.rating ? "text-[#f8a11e] fill-[#f8a11e]" : "text-gray-300"} />
                  ))}
                </div>
                <span className="text-sm text-gray-500">{r.date}</span>
              </div>
              <div className="text-gray-700 text-base leading-relaxed">{r.text}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function FaqAccordion({ faqs }) {
  const [openIdx, setOpenIdx] = useState(null);
  return (
    <section className="my-8">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900">Frequently Asked Questions</h2>
      <div className="divide-y divide-gray-200 bg-white rounded-2xl border-2 border-gray-200 shadow-lg overflow-hidden">
        {faqs.map((f, idx) => (
          <div key={idx}>
            <button
              className="w-full flex items-center justify-between py-5 px-6 text-left text-gray-900 font-bold text-lg hover:bg-gray-50 transition focus:outline-none"
              onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
            >
              <span>{f.q}</span>
              <span className={`text-2xl text-[#f8a11e] transform transition-transform ${openIdx === idx ? 'rotate-45' : ''}`}>+</span>
            </button>
            {openIdx === idx && <div className="px-6 pb-5 text-gray-700 text-base leading-relaxed bg-gray-50">{f.a}</div>}
          </div>
        ))}
      </div>
    </section>
  );
}

function SimilarHotels({ hotels }) {
  return (
    <section className="my-12">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900">Similar Hotels Nearby</h2>
      <div className="flex gap-4 overflow-x-auto pb-3 snap-x md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-6 md:overflow-visible">
        {hotels.map((h, idx) => (
          <div key={idx} className="min-w-[260px] md:min-w-0 bg-white border-2 border-gray-200 rounded-2xl shadow-lg hover:shadow-xl snap-start transition overflow-hidden">
            <img src={h.image} alt={h.name} className="h-40 w-full object-cover" />
            <div className="p-5 flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <Star size={16} className="text-[#f8a11e] fill-[#f8a11e]" />
                <span className="text-sm font-bold text-gray-900">{h.rating}</span>
              </div>
              <h3 className="font-bold text-lg text-gray-900 line-clamp-1">{h.name}</h3>
              <div className="text-sm text-gray-600 mb-2">{h.area}</div>
              <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                <div>
                  <span className="font-bold text-xl text-[#f8a11e]">₹{h.price.toLocaleString()}</span>
                  <span className="text-sm text-gray-500 ml-1">/night</span>
                </div>
                <a href="#" className="px-4 py-2 rounded-lg font-semibold bg-[#f8a11e] text-white text-sm hover:bg-[#ffb649] transition shadow-md">View</a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function HotelDetailsPage() {
  const hotel = sampleHotel;
  return (
    <div className="font-sans bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section - Full Width */}
        <div className="bg-white rounded-2xl shadow-2xl mt-4 md:mt-8 overflow-hidden mb-6">
          <Hero hotel={hotel} />
        </div>
        
        {/* Two Column Layout for Desktop */}
        <div className="flex flex-col lg:flex-row gap-8 px-4 md:px-6">
          {/* Main Content - Left Side */}
          <div className="flex-1 bg-white rounded-2xl shadow-lg p-6 md:p-8 lg:p-10">
            <Breadcrumb city={hotel.location.city} area={hotel.location.area} hotel={hotel.name} />
            <QuickAmenities hotel={hotel} />
            <Gallery gallery={hotel.gallery} />
            <RoomTypes roomTypes={hotel.roomTypes} />
            <AboutSection description={hotel.description} />
            <AmenitiesGrid amenities={hotel.fullAmenities} />
            <PoliciesSection policies={hotel.policies} />
            <MapSection map={hotel.map} />
            <Reviews reviews={hotel.reviews} />
            <FaqAccordion faqs={hotel.faqs} />
            <SimilarHotels hotels={hotel.similarHotels} />
          </div>
          
          {/* Booking Card - Right Side (Desktop Only) */}
          <BookingCard hotel={hotel} />
        </div>
      </div>
    </div>
  );
}
