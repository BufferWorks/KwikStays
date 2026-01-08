import { MapPin, Star, Image as ImageIcon, ChevronLeft, ChevronRight, X } from "lucide-react";
import { useState } from "react";

export default function Hero({ hotel, gallery = [] }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Combine hero image and gallery
  const allImages = [hotel.heroImage, ...gallery.filter(img => img !== hotel.heroImage)];

  // Ensure we have at least 1 image
  const images = allImages.length > 0 ? allImages : ["/placeholder.jpg"];

  const nextSlide = () => {
    // For desktop (showing 2 images), we stop when we can't show a full pair or just loop?
    // User asked for "one by one". Let's loop for infinite feel or just stop at end. 
    // Looping is smoother.
    setCurrentSlide((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <section className="bg-white md:bg-gray-100">
      {/* IMAGE SLIDER CONTAINER */}
      <div className="relative w-full h-[280px] md:h-[450px] lg:h-[520px] bg-gray-200 overflow-hidden group">

        {/* IMAGES */}
        <div className="w-full h-full flex">
          {/* Mobile: Scrollable Slider */}
          <div className="md:hidden w-full h-full flex overflow-x-auto snap-x snap-mandatory scrollbar-hide">
            {images.map((img, index) => (
              <div key={index} className="w-full h-full flex-shrink-0 snap-center relative">
                <img
                  src={img}
                  alt={`${hotel.name} - ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>

          {/* Desktop: Show 2 images (current and next) side by side */}
          <div className="hidden md:flex w-full h-full gap-1">
            <div className="w-1/2 h-full relative overflow-hidden">
              <img
                src={images[currentSlide]}
                alt={hotel.name}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105 cursor-pointer"
                onClick={() => setIsModalOpen(true)}
              />
            </div>
            <div className="w-1/2 h-full relative overflow-hidden">
              <img
                src={images[(currentSlide + 1) % images.length]}
                alt={hotel.name}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105 cursor-pointer"
                onClick={() => setIsModalOpen(true)}
              />
            </div>
          </div>
        </div>

        {/* NAVIGATION ARROWS (Desktop Only usually, or both?) */}
        {/* OYO usually has arrows. */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100 z-10"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100 z-10"
        >
          <ChevronRight size={24} />
        </button>

        {/* VIEW ALL BUTTON */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="absolute bottom-4 right-4 bg-white/90 hover:bg-white text-gray-900 px-3 py-1.5 md:px-4 md:py-2 rounded md:rounded-lg font-medium text-xs md:text-sm shadow-md transition flex items-center gap-2 backdrop-blur-sm z-20"
        >
          <ImageIcon size={16} />
          <span className="hidden md:inline">View all photos</span>
          <span className="md:hidden">Photos</span>
        </button>

        {/* MOBILE OVERLAY CONTENT (Hidden on Desktop) */}


      </div>

      {/* GALLERY MODAL */}
      <GalleryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        images={images}
      />
    </section>
  );
}

function GalleryModal({ isOpen, onClose, images }) {
  const [index, setIndex] = useState(0);

  if (!isOpen) return null;

  const next = () => setIndex((prev) => (prev + 1) % images.length);
  const prev = () => setIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="fixed inset-0 z-[60] bg-black/95 flex flex-col animate-fadeIn">
      {/* HEADER */}
      <div className="flex items-center justify-between px-6 py-4 text-white border-b border-white/10">
        <h3 className="font-semibold text-lg">Hotel Photos ({images.length})</h3>
        <button
          onClick={onClose}
          className="p-2 hover:bg-white/10 rounded-full transition-colors"
        >
          <X size={24} />
        </button>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 relative flex items-center justify-center p-4">
        {/* Navigation Buttons */}
        <button
          onClick={prev}
          className="absolute left-4 p-3 rounded-full bg-black/50 text-white hover:bg-black/80 transition-all hover:scale-110 z-10"
        >
          <ChevronLeft size={32} />
        </button>

        <button
          onClick={next}
          className="absolute right-4 p-3 rounded-full bg-black/50 text-white hover:bg-black/80 transition-all hover:scale-110 z-10"
        >
          <ChevronRight size={32} />
        </button>

        {/* Main Image */}
        <div className="w-full h-full max-w-5xl flex items-center justify-center">
          <img
            src={images[index]}
            alt={`Gallery ${index + 1}`}
            className="max-w-full max-h-full object-contain shadow-2xl rounded-sm"
          />
        </div>
      </div>

      {/* THUMBNAILS STRIP */}
      <div className="h-24 md:h-32 bg-black/80 border-t border-white/10 p-4">
        <div className="h-full flex gap-3 overflow-x-auto snap-x justify-center scrollbar-hide">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`
                    relative h-full aspect-[4/3] rounded-lg overflow-hidden shrink-0 transition-all
                    ${i === index ? 'ring-2 ring-[#f8a11e] scale-105 opacity-100' : 'opacity-50 hover:opacity-100'}
                  `}
            >
              <img src={img} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
