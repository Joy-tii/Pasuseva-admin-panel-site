import React, { useRef, useState } from "react";
import { FaUpload } from "react-icons/fa";

const AddYojna = () => {
  const [slides, setSlides] = useState<File[]>([]);
  const [thumbnail, setThumbnail] = useState<File | null>(null);

  const slideInputRef = useRef<HTMLInputElement>(null);
  const thumbnailInputRef = useRef<HTMLInputElement>(null);

  // Dummy images for initial slides
  const initialSlides = [
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=facearea&w=256&q=80",
    "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=facearea&w=256&q=80",
  ];

  const handleSlideUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSlides([...slides, ...Array.from(e.target.files)]);
    }
  };

  const handleThumbnailUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setThumbnail(e.target.files[0]);
    }
  };

  return (
    <div className="p-6 min-h-screen bg-white dark:bg-[#1f1f1f] flex flex-col items-center">
      {/* Title */}
      <div className="mb-4 w-full max-w-4xl">
        <input
          type="text"
          placeholder="Title"
          className="w-full border border-[var(--pasuseva-orange)] rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--pasuseva-orange)]"
        />
      </div>

      {/* Description */}
      <div className="mb-6 w-full max-w-4xl">
        <textarea
          placeholder="Description"
          rows={5}
          className="w-full border border-[var(--pasuseva-orange)] rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--pasuseva-orange)] resize-none"
        />
      </div>

      {/* Slides */}
      <div className="mb-6 w-full max-w-4xl">
        <label className="block mb-2 font-semibold text-[var(--pasuseva-green)]">Slides</label>
        <div className="flex gap-4 flex-wrap">
          {/* Show 2 dummy images first */}
          {initialSlides.map((src, idx) => (
            <div key={idx} className="w-32 h-32 border rounded flex items-center justify-center bg-gray-50 dark:bg-[#232d1b] relative">
              <img
                src={src}
                alt={`Slide ${idx + 1}`}
                className="object-cover w-full h-full rounded"
              />
            </div>
          ))}
          {/* Show uploaded slides */}
          {slides.map((file, idx) => (
            <div key={idx + initialSlides.length} className="w-32 h-32 border rounded flex items-center justify-center bg-gray-50 dark:bg-[#232d1b] relative">
              <img
                src={URL.createObjectURL(file)}
                alt={`Slide ${idx + 1 + initialSlides.length}`}
                className="object-cover w-full h-full rounded"
              />
            </div>
          ))}
          {/* Upload More */}
          <button
            type="button"
            onClick={() => slideInputRef.current?.click()}
            className="w-32 h-32 border-2 border-dashed border-[var(--pasuseva-orange)] rounded flex flex-col items-center justify-center text-[var(--pasuseva-orange)] hover:bg-[var(--pasuseva-orange)]/10 transition-colors"
          >
            <FaUpload className="text-2xl mb-2" />
            Upload More
            <input
              type="file"
              accept="image/*"
              multiple
              ref={slideInputRef}
              className="hidden"
              onChange={handleSlideUpload}
            />
          </button>
        </div>
      </div>

      {/* Thumbnail */}
      <div className="mb-8 w-full max-w-4xl">
        <label className="block mb-2 font-semibold text-[var(--pasuseva-green)]">Thumbnail</label>
        <div
          className="w-full h-40 border-2 border-dashed border-[var(--pasuseva-orange)] rounded flex flex-col items-center justify-center text-[var(--pasuseva-orange)] cursor-pointer hover:bg-[var(--pasuseva-orange)]/10 transition-colors"
          onClick={() => thumbnailInputRef.current?.click()}
        >
          {thumbnail ? (
            <img
              src={URL.createObjectURL(thumbnail)}
              alt="Thumbnail"
              className="object-cover h-full rounded"
            />
          ) : (
            <>
              <FaUpload className="text-2xl mb-2" />
              Thumbnail
            </>
          )}
          <input
            type="file"
            accept="image/*"
            ref={thumbnailInputRef}
            className="hidden"
            onChange={handleThumbnailUpload}
          />
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end w-full max-w-4xl">
        <button className="bg-[var(--pasuseva-green)] hover:bg-green-700 text-white font-semibold px-8 py-2 rounded-lg shadow transition-colors">
          Submit
        </button>
      </div>
    </div>
  );
};

export default AddYojna;