export interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  category: "rooms" | "dining" | "pool" | "events" | "exterior";
  width: number;
  height: number;
}

export const galleryImages: GalleryImage[] = [
  {
    id: 1,
    src: "/images/environs/005.jpg",
    alt: "Hotel exterior view",
    category: "exterior",
    width: 800,
    height: 600,
  },
  {
    id: 2,
    src: "/images/rooms/room-2/036.jpg",
    alt: "Standard room interior",
    category: "rooms",
    width: 800,
    height: 533,
  },
  {
    id: 3,
    src: "/images/environs/010.jpg",
    alt: "Hotel surroundings",
    category: "exterior",
    width: 800,
    height: 534,
  },
  {
    id: 4,
    src: "/images/restaurant/027.jpg",
    alt: "Restaurant and dining area",
    category: "dining",
    width: 800,
    height: 533,
  },
  {
    id: 5,
    src: "/images/conference/001.jpg",
    alt: "Conference hall setup",
    category: "events",
    width: 800,
    height: 533,
  },
  {
    id: 6,
    src: "/images/rooms/room-4/045.jpg",
    alt: "Deluxe room interior",
    category: "rooms",
    width: 800,
    height: 534,
  },
  {
    id: 7,
    src: "/images/reception/023.jpg",
    alt: "Hotel reception",
    category: "exterior",
    width: 800,
    height: 533,
  },
  {
    id: 8,
    src: "/images/environs/012.jpg",
    alt: "Hotel entrance",
    category: "exterior",
    width: 800,
    height: 533,
  },
  {
    id: 9,
    src: "/images/rooms/room-7/055.jpg",
    alt: "Executive suite living room",
    category: "rooms",
    width: 800,
    height: 533,
  },
  {
    id: 10,
    src: "/images/restaurant/030.jpg",
    alt: "Bar and lounge area",
    category: "dining",
    width: 800,
    height: 533,
  },
  {
    id: 11,
    src: "/images/conference/003.jpg",
    alt: "Conference room",
    category: "events",
    width: 800,
    height: 533,
  },
  {
    id: 12,
    src: "/images/rooms/room-14/089.jpg",
    alt: "Honeymoon suite",
    category: "rooms",
    width: 800,
    height: 533,
  },
];

export function getGalleryByCategory(category: string): GalleryImage[] {
  if (category === "all") return galleryImages;
  return galleryImages.filter((img) => img.category === category);
}
