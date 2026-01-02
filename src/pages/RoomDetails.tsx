import React from "react";
import { useParams } from "react-router-dom";

const roomData = [
  {
    id: "beach-tent",
    title: "Beach Tents",
    images: [
      "/images/beach1.jpg",
      "/images/beach2.jpg",
      "/images/beach3.jpg",
    ],
    details: "265 sq ft open-air tent with beach view and seating area.",
    amenities: [
      "Air conditioner",
      "Blanket",
      "Ceiling fan",
      "Daily housekeeping",
      "Linen",
      "Pillow",
      "Seating area",
      "Washroom",
      "Wi-Fi",
    ],
  },
  {
    id: "dormitory",
    title: "8 Bed Mixed Dormitory with Balcony",
    images: [
      "/images/dorm1.jpg",
      "/images/dorm2.jpg",
      "/images/dorm3.jpg",
      "/images/dorm4.jpg",
    ],
    details: "265 sq ft room with seating area and balcony access.",
    amenities: [
      "Air conditioner",
      "Bedside lamp",
      "Bunk bed",
      "Charging point",
      "Geyser",
      "Locker",
      "Privacy curtain",
      "Shower gel",
      "Wi-Fi",
    ],
  },
];

const RoomDetails: React.FC = () => {
  const { id } = useParams();
  const room = roomData.find((r) => r.id === id);

  if (!room) return <div className="text-center py-20">Room not found!</div>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-10 px-6 md:px-20">
      <div className="max-w-5xl mx-auto">
        {/* Room Images */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
          {room.images.map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`${room.title} ${i + 1}`}
              className="rounded-2xl object-cover w-full h-64 shadow-md hover:scale-[1.02] transition-transform"
            />
          ))}
        </div>

        {/* Room Info */}
        <h1 className="text-3xl font-bold text-[#0a2342] mb-3">
          {room.title}
        </h1>
        <p className="text-gray-600 mb-6">{room.details}</p>

        {/* Amenities */}
        <h2 className="text-xl font-semibold mb-4">Amenities</h2>
        <ul className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-gray-700">
          {room.amenities.map((a, i) => (
            <li key={i} className="flex items-center gap-2">
              <span className="text-yellow-500">✓</span> {a}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RoomDetails;


# AI edit: change ui and add new feature 
