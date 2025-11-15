"use client";
import React, { useState, useEffect, useRef } from "react";
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
  ArrowLeft,
  Share2,
  Heart,
  Building,
  BadgePercent,
  Check
} from "lucide-react";

// --- Mock data for a hotel ---
const hotelLocation = {
  street: "M.G. Road",
  area: "Koramangala",
  city: "Bangalore",
  state: "Karnataka",
  pincode: "560034",
};

const fullAddress = `${hotelLocation.street}, ${hotelLocation.area}, ${hotelLocation.city}, ${hotelLocation.state} - ${hotelLocation.pincode}`;

const sampleHotel = {
  id: 78986,
  name: "Happy Stays Bangalore",
  location: {
    ...hotelLocation,
    full: fullAddress,
  },
  heroImage:
    "https://images.oyoroomscdn.com/uploads/hotel_image/270343/large/dyvburfrtlmi.jpg",
  gallery: [
    "https://images.oyoroomscdn.com/uploads/hotel_image/270343/large/cxafasrmkmbe.jpg",
    "https://images.oyoroomscdn.com/uploads/hotel_image/270343/large/mrdtxstiqaor.jpg",
    "https://images.oyoroomscdn.com/uploads/hotel_image/270343/large/ekekesxcollk.jpg",
  ],
  rating: 4.8,
  reviewCount: 1342,
  minPrice: 2078, 
  originalPrice: 3319,
  taxes: 234,
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
      originalPrice: 3400,
      occupancy: 2,
      beds: "1 Queen Bed",
      amenities: ["AC", "WiFi", "TV"],
      refundable: true,
    },
    {
      name: "Deluxe Room",
      image: "https://images.oyoroomscdn.com/uploads/hotel_image/270343/large/ekekesxcollk.jpg",
      price: 3499,
      originalPrice: 4200,
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

function StickyHotelHeader({ title }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 240);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out px-4 py-3 flex items-center justify-between ${
        isScrolled
          ? "bg-white text-gray-900 shadow-md"
          : "bg-gradient-to-b from-black/60 to-transparent text-white"
      }`}
    >
      <button 
        onClick={() => window.history.back()} 
        className={`p-2 rounded-full transition-colors ${isScrolled ? 'hover:bg-gray-100' : 'hover:bg-white/20'}`}
      >
        <ArrowLeft size={24} />
      </button>

      <div
        className={`absolute left-1/2 transform -translate-x-1/2 font-bold text-lg truncate max-w-[50%] transition-opacity duration-300 ${
          isScrolled ? "opacity-100" : "opacity-0"
        }`}
      >
        {title}
      </div>

      <div className="flex gap-3">
        <button 
           onClick={() => setIsLiked(!isLiked)}
           className={`p-2 rounded-full transition-colors ${isScrolled ? 'hover:bg-gray-100' : 'hover:bg-white/20'}`}
        >
          <Heart size={24} className={isLiked ? "fill-red-500 text-red-500" : ""} />
        </button>
        <button 
           className={`p-2 rounded-full transition-colors ${isScrolled ? 'hover:bg-gray-100' : 'hover:bg-white/20'}`}
        >
          <Share2 size={24} />
        </button>
      </div>
    </header>
  );
}

function Breadcrumb({ city, area }) {
  return (
    <nav className="text-xs text-gray-500 py-3 flex flex-wrap gap-1" aria-label="Breadcrumb">
      <a href="/" className="hover:text-[#f8a11e]">Home</a>/
      <a href="/hotels" className="hover:text-[#f8a11e]">Hotels</a>/
      <a href={`/hotels/${city.toLowerCase()}`} className="hover:text-[#f8a11e] capitalize">{city}</a>/
      <span className="font-semibold text-gray-800 truncate max-w-[60vw] md:max-w-xs">{area}</span>
    </nav>
  );
}

function Hero({ hotel }) {
  return (
    <section className="rounded-b-3xl md:shadow-2xl overflow-hidden md:relative min-h-[280px] md:min-h-[500px] lg:min-h-[600px]">
      <div className="w-full h-[280px] md:h-[500px] lg:h-[600px]">
        <img
          src={hotel.heroImage}
          alt={hotel.name}
          className="w-full h-full object-cover object-center"
        />
      </div>

      <div className="hidden md:block absolute inset-0 bg-linear-to-b from-black/20 via-transparent to-black/80"></div>
      
      <div 
        className="hidden p-6 
                   md:absolute md:inset-0 md:bg-transparent md:flex md:flex-col md:justify-end md:p-12 lg:p-16"
      >
        <div className="max-w-4xl">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 md:text-white md:drop-shadow-2xl mb-3">{hotel.name}</h1>
          
          <div className="flex flex-col md:flex-row flex-wrap gap-x-4 gap-y-2 items-start md:items-center text-base md:text-lg text-gray-700 md:text-gray-100">
            <div className="flex items-center gap-2">
              <MapPin size={20} className="text-[#f8a11e]" />
              <span className="font-medium">{hotel.location.full}</span>
            </div>
            <span className="hidden md:inline">·</span>
            
            <div className="flex items-center gap-2">
              <Star size={18} className="text-[#f8a11e] fill-[#f8a11e]" />
              <span className="font-semibold">{hotel.rating}</span>
              <span className="text-sm text-gray-500 md:text-gray-300">({hotel.reviewCount.toLocaleString()} reviews)</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MobileHotelInfo({ hotel }) {
  return (
    <div className="md:hidden px-1 pt-2 pb-6">
      <span className="inline-flex items-center gap-2 bg-gray-100 text-gray-800 text-xs font-semibold px-3 py-1.5 rounded-lg mb-3">
        <Building size={16} />
        Company-Serviced
      </span>

      <h1 className="text-2xl font-bold text-gray-900 mb-2 leading-tight">
        {hotel.name}
      </h1>

      <div className="flex items-center gap-2 mb-2">
        <Star size={16} className="text-red-500 fill-red-500" />
        <span className="font-bold text-gray-800">{hotel.rating}</span>
        <span className="text-sm text-gray-500">({hotel.reviewCount.toLocaleString()} ratings)</span>
      </div>

      <div className="flex items-center gap-2 text-sm text-gray-700 mb-4">
        <Star size={14} className="text-gray-400" />
        <span><span className="font-bold">5.0</span> · Check-in rating <span className="font-bold">Delightful experience</span></span>
      </div>
      
      <div className="text-xs text-gray-700 leading-relaxed mb-3">
        {hotel.location.full}
      </div>

      <a href="#" className="text-sm font-bold text-blue-600 hover:underline">
        View on map
      </a>
    </div>
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
    <section className="hidden md:flex my-6 md:gap-3 md:flex-wrap">
      {hotel.quickAmenities.map((am, idx) => (
        <span 
          key={am.text} 
          className="flex gap-3 items-center text-gray-800 text-base
                     md:bg-gradient-to-r md:from-gray-50 md:to-gray-100 md:border md:border-gray-200 
                     md:rounded-full md:px-4 md:py-2 md:text-sm md:font-medium md:shadow-sm"
        >
          <am.icon size={20} className="text-[#f8a11e] flex-shrink-0" /> {am.text}
        </span>
      ))}
    </section>
  );
}

function RoomTypes({ roomTypes, selectedRoom, setSelectedRoom }) {
  return (
    <section className="my-8">
      <h2 className="text-xl md:text-3xl font-bold mb-6 text-gray-900">Available Rooms</h2>
      <div className="flex gap-4 pb-4 overflow-x-auto snap-x md:grid md:grid-cols-2 lg:grid-cols-2 md:gap-6 md:overflow-visible" aria-label="Available rooms">
        {roomTypes.map(room => {
          const isSelected = selectedRoom.name === room.name;
          return (
            <div 
              key={room.name} 
              className="relative min-w-[280px] md:min-w-0 bg-white rounded-2xl shadow-lg hover:shadow-xl snap-start flex flex-col transition-all duration-300 overflow-hidden"
            >
              {isSelected && (
                <div className="absolute top-2 left-2 z-10 bg-red-500 rounded-full p-1 text-white shadow-lg">
                  <Check size={14} strokeWidth={3} />
                </div>
              )}

              <img src={room.image} alt={room.name} className="h-40 md:h-48 w-full object-cover" />
              <div className="p-5 flex-1 flex flex-col gap-3">
                <div>
                  <h3 className="font-bold text-base md:text-lg text-gray-900 mb-1">{room.name}</h3>
                  <div className="text-xs md:text-sm text-gray-600 mb-2">{room.beds} ・ Up to {room.occupancy} guests</div>
                  <div className="flex gap-2 text-xs text-gray-600 flex-wrap">
                    {room.amenities.map(a => <span key={a} className="bg-gray-100 rounded-full px-3 py-1 font-medium">{a}</span>)}
                  </div>
                </div>
                <div className="mt-auto pt-3 border-t border-gray-200">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <span className="text-xl md:text-2xl font-bold text-[#f8a11e]">₹{room.price.toLocaleString()}</span>
                      <span className="text-xs md:text-sm text-gray-500 ml-1">/night</span>
                    </div>
                    {room.refundable ? (
                      <span className="text-green-600 text-xs font-semibold bg-green-50 px-2 py-1 rounded-full">Free cancellation</span>
                    ) : (
                      <span className="text-red-600 text-xs font-semibold bg-red-50 px-2 py-1 rounded-full">Non-refundable</span>
                    )}
                  </div>
                  <button 
                    onClick={() => setSelectedRoom(room)}
                    disabled={isSelected}
                    className={`w-full py-3 rounded-xl font-semibold text-center text-sm md:text-base transition active:scale-95 shadow-md hover:shadow-lg
                               ${isSelected 
                                 ? "bg-[#d88c1a] text-white cursor-not-allowed" 
                                 : "bg-[#f8a11e] text-white hover:bg-[#ffb649]"
                               }`}
                  >
                    {isSelected ? "Selected" : "Select"}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

// MODIFIED: Accepts selectedRoom
function BookingCard({ hotel, selectedRoom }) {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(2);
   
  // Dynamically set prices based on selected room
  const price = selectedRoom ? selectedRoom.price : hotel.minPrice;
  const serviceFee = price * 0.1; // 10% fee
  const totalPrice = price + serviceFee;
   
  return (
    <div className="hidden lg:block lg:sticky lg:top-24 lg:self-start">
      <div className="bg-white border-2 border-gray-200 rounded-2xl shadow-xl p-6 w-80">
        <div className="mb-6">
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-3xl font-bold text-red-600">₹{price.toLocaleString()}</span>
            <span className="text-gray-600">/night</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Star size={16} className="text-[#f8a11e] fill-[#f8a11e]" />
            <span className="font-semibold">{hotel.rating}</span>
            <span>・</span>
            <span>{hotel.reviewCount.toLocaleString()} reviews</span>
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
              <span>₹{price.toLocaleString()} x 1 night</span>
              <span>₹{price.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Service fee</span>
              <span>₹{serviceFee.toFixed(0)}</span>
            </div>
            <div className="flex justify-between font-bold text-lg text-gray-900 pt-2 border-t border-gray-200">
              <span>Total</span>
              <span>₹{totalPrice.toFixed(0)}</span>
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
      <h2 className="text-xl md:text-3xl font-bold mb-4 text-gray-900">About this property</h2>
      <p className="text-gray-700 text-sm md:text-lg leading-relaxed max-w-3xl">{description}</p>
    </section>
  );
}

function AmenitiesGrid({ amenities }) {
  return (
    <section className="my-8">
      <h2 className="text-xl md:text-3xl font-bold mb-6 text-gray-900">Amenities</h2>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3">
        {amenities.map(am => (
          <div 
            key={am.text}
            className="flex items-center gap-3 text-gray-700
                       md:bg-gradient-to-br md:from-gray-50 md:to-gray-100 md:border-2 md:border-gray-200 
                       md:rounded-xl md:px-4 md:py-3 md:shadow-sm md:hover:shadow-md md:transition"
          >
            <am.icon size={20} className="text-[#f8a11e] flex-shrink-0" />
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
      <h2 className="text-xl md:text-3xl font-bold mb-6 text-gray-900">Policies</h2>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {policies.map(p => (
          <div 
            key={p.title}
            className="flex items-center gap-3 text-gray-700
                       md:py-4 md:px-5 md:bg-gradient-to-br md:from-gray-50 md:to-gray-100 
                       md:border-2 md:border-gray-200 md:rounded-xl md:shadow-sm md:hover:shadow-md md:transition"
          >
            <p.icon size={20} className="text-[#f8a11e] flex-shrink-0" />
            
            <div className="md:hidden">
              <span className="text-sm">{p.title}: {p.value}</span>
            </div>
            
            <div className="hidden md:block">
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
      <h2 className="text-xl md:text-3xl font-bold mb-6 text-gray-900">Location & Nearby</h2>
      <div className="flex gap-6 flex-col lg:flex-row">
        <img
          src={map.staticImg}
          alt="map location preview"
          className="rounded-2xl w-full lg:w-96 lg:h-64 object-cover border-2 border-gray-200 shadow-lg"
        />
        <ul 
          className="flex-1 text-gray-700 text-sm grid grid-cols-2 gap-x-4 gap-y-3
                     md:flex md:flex-col md:gap-3"
        >
          {map.nearby.map(l => (
            <li 
              key={l}
              className="flex items-center gap-3
                         md:py-2 md:px-4 md:bg-gray-50 md:border md:border-gray-200 
                         md:rounded-lg md:hover:bg-gray-100 md:transition"
            >
              <MapPin size={18} className="text-[#f8a11e] flex-shrink-0" />
              <span className="font-medium text-sm">{l}</span>
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
      <h2 className="text-xl md:text-3xl font-bold mb-6 text-gray-900">Guest Reviews</h2>
      <div className="flex flex-col gap-6">
        {reviews.map((r, idx) => (
          <div 
            key={idx} 
            className="flex gap-3 items-start border-b border-gray-200 pb-6
                       md:bg-gradient-to-br md:from-white md:to-gray-50 md:border-2 md:rounded-2xl 
                       md:shadow-md md:p-6 md:gap-5 md:hover:shadow-lg md:transition md:pb-6"
          >
            <img
              src={r.avatar}
              alt={r.name}
              className="w-10 h-10 rounded-full border-2 border-[#f8a11e] shadow-sm
                         md:w-14 md:h-14 md:shadow-md"
            />
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-2">
                <span className="font-bold text-sm md:text-base text-gray-900">{r.name}</span>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className={i < r.rating ? "text-[#f8a11e] fill-[#f8a11e]" : "text-gray-300"} />
                  ))}
                </div>
                <span className="text-xs md:text-sm text-gray-500">{r.date}</span>
              </div>
              <div className="text-gray-700 text-sm leading-relaxed">{r.text}</div>
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
      <h2 className="text-xl md:text-3xl font-bold mb-6 text-gray-900">Frequently Asked Questions</h2>
      <div className="divide-y divide-gray-200 bg-white rounded-2xl border-2 border-gray-200 shadow-lg overflow-hidden">
        {faqs.map((f, idx) => (
          <div key={idx}>
            <button
              className="w-full flex items-center justify-between py-4 px-5 md:py-5 md:px-6 text-left text-gray-900 font-bold text-sm md:text-base hover:bg-gray-50 transition focus:outline-none"
              onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
            >
              <span>{f.q}</span>
              <span className={`text-xl md:text-2xl text-[#f8a11e] transform transition-transform ${openIdx === idx ? 'rotate-45' : ''}`}>+</span>
            </button>
            {openIdx === idx && <div className="px-5 pb-4 md:px-6 md:pb-5 text-gray-700 text-sm leading-relaxed bg-gray-50">{f.a}</div>}
          </div>
        ))}
      </div>
    </section>
  );
}

function MobilePricingDetails({ hotel, pricingRef, selectedRoom }) {
  const price = selectedRoom ? selectedRoom.price : hotel.minPrice;
  const originalPrice = selectedRoom ? selectedRoom.originalPrice : hotel.originalPrice;
  
  return (
    <section ref={pricingRef} className="my-8 md:hidden">
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-4 text-gray-900">Pricing details</h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-700">Price to pay</span>
            <div className="flex items-baseline gap-2">
              <span className="text-sm text-gray-500 line-through">₹{originalPrice.toLocaleString()}</span>
              <span className="text-lg font-bold text-gray-900">₹{price.toLocaleString()}</span>
            </div>
          </div>
          <button className="flex items-center gap-2 text-sm font-bold text-blue-600">
            <BadgePercent size={18} />
            Apply coupon
          </button>
          <a href="#" className="text-sm font-semibold text-blue-600">More offers</a>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4 text-gray-900">Your booking details</h2>
        <form className="space-y-4">
          <div>
            <label htmlFor="full-name" className="block text-sm font-medium text-gray-700 mb-1">Full name</label>
            <input 
              type="text" 
              id="full-name" 
              placeholder="First name and last name" 
              className="w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500" 
            />
          </div>
          <div>
            <label htmlFor="mobile-number" className="block text-sm font-medium text-gray-700 mb-1">Mobile number</label>
            <div className="flex">
              <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-gray-300 bg-gray-50 text-gray-600 text-sm">
                +91
              </span>
              <input 
                type="tel" 
                id="mobile-number" 
                placeholder="Enter mobile number" 
                className="w-full border-gray-300 rounded-r-lg shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500" 
              />
            </div>
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
            <input 
              type="email" 
              id="email" 
              placeholder="abc@xyz.com" 
              className="w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500" 
            />
          </div>
          <button
            type="submit"
            className="w-full py-3.5 rounded-lg font-semibold text-lg bg-red-500 text-white hover:bg-red-600 transition shadow-lg hover:shadow-xl active:scale-95"
          >
            Book now & pay at hotel
          </button>
        </form>
      </div>
    </section>
  );
}

function MobileStickyBookingBar({ hotel, isVisible, selectedRoom }) {
  const price = selectedRoom ? selectedRoom.price : hotel.minPrice;
  const originalPrice = selectedRoom ? selectedRoom.originalPrice : hotel.originalPrice;
  
  return (
    <div 
      className={`md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white shadow-[0_-2px_8px_rgba(0,0,0,0.1)] p-4 transition-transform duration-300 ease-in-out
                  ${isVisible ? 'translate-y-0' : 'translate-y-full'}`}
    >
      <div className="flex justify-between items-center">
        <div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-gray-900">₹{price.toLocaleString()}</span>
            <span className="text-base text-gray-500 line-through">₹{originalPrice.toLocaleString()}</span>
          </div>
          <span className="text-sm font-semibold text-blue-600">+ ₹{hotel.taxes} taxes & fees</span>
        </div>
        <button
          type="button"
          className="w-1/2 py-3.5 rounded-lg font-semibold text-lg bg-red-500 text-white hover:bg-red-600 transition shadow-lg active:scale-95"
        >
          Book now
        </button>
      </div>
    </div>
  );
}

function SimilarHotels({ hotels }) {
  return (
    <section className="my-12">
      <h2 className="text-xl md:text-3xl font-bold mb-6 text-gray-900">Similar Hotels Nearby</h2>
      <div className="flex gap-4 overflow-x-auto pb-3 snap-x md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-6 md:overflow-visible">
        {hotels.map((h, idx) => (
          <div key={idx} className="min-w-[240px] md:min-w-0 bg-white border-2 border-gray-200 rounded-2xl shadow-lg hover:shadow-xl snap-start transition overflow-hidden">
            <img src={h.image} alt={h.name} className="h-40 w-full object-cover" />
            <div className="p-4 flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <Star size={16} className="text-[#f8a11e] fill-[#f8a11e]" />
                <span className="text-sm font-bold text-gray-900">{h.rating}</span>
              </div>
              <h3 className="font-bold text-base text-gray-900 line-clamp-1">{h.name}</h3>
              <div className="text-xs text-gray-600 mb-2">{h.area}</div>
              <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                <div>
                  <span className="font-bold text-lg text-[#f8a11e]">₹{h.price.toLocaleString()}</span>
                  <span className="text-xs text-gray-500 ml-1">/night</span>
                </div>
                <a href="#" className="px-3 py-1.5 rounded-lg font-semibold bg-[#f8a11e] text-white text-xs hover:bg-[#ffb649] transition shadow-md">View</a>
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
  const pricingSectionRef = useRef(null); 
  const [isBottomBarVisible, setIsBottomBarVisible] = useState(true);
  
  const [selectedRoom, setSelectedRoom] = useState(hotel.roomTypes[0]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsBottomBarVisible(!entry.isIntersecting);
      },
      {
        root: null, 
        threshold: 0.1, 
      }
    );

    if (pricingSectionRef.current) {
      observer.observe(pricingSectionRef.current);
    }

    return () => {
      if (pricingSectionRef.current) {
        observer.unobserve(pricingSectionRef.current);
      }
    };
  }, []);

  return (
    <div className="font-sans bg-gray-50 min-h-screen pb-20 md:pb-0">
      <StickyHotelHeader title={hotel.name} />

      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-b-2xl md:rounded-2xl md:shadow-2xl mt-0 md:mt-8 overflow-hidden mb-0 md:mb-6">
          <Hero hotel={hotel} />
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8 px-4 md:px-6">
          <div className="flex-1 bg-white rounded-2xl shadow-lg p-6 md:p-8 lg:p-10 -mt-8 md:mt-0 relative z-10">
            <div className="md:hidden">
              <Breadcrumb city={hotel.location.city} area={hotel.location.area} />
            </div>

            <MobileHotelInfo hotel={hotel} />
            
            <div className="hidden md:block">
              <Breadcrumb city={hotel.location.city} area={hotel.location.area} />
            </div>

            <QuickAmenities hotel={hotel} />
            <Gallery gallery={hotel.gallery} />
            
            <RoomTypes 
              roomTypes={hotel.roomTypes} 
              selectedRoom={selectedRoom} 
              setSelectedRoom={setSelectedRoom} 
            />
            
            <AboutSection description={hotel.description} />
            <AmenitiesGrid amenities={hotel.fullAmenities} />
            <PoliciesSection policies={hotel.policies} />
            <MapSection map={hotel.map} />
            <Reviews reviews={hotel.reviews} />
            <FaqAccordion faqs={hotel.faqs} />

            <MobilePricingDetails 
              hotel={hotel} 
              pricingRef={pricingSectionRef} 
              selectedRoom={selectedRoom} 
            />

            <SimilarHotels hotels={hotel.similarHotels} />
          </div>
          
          <BookingCard hotel={hotel} selectedRoom={selectedRoom} />
        </div>
      </div>

      <MobileStickyBookingBar 
        hotel={hotel} 
        isVisible={isBottomBarVisible} 
        selectedRoom={selectedRoom} 
      />
    </div>
  );
}