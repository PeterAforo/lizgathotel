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
    src: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
    alt: "Hotel exterior at sunset",
    category: "exterior",
    width: 800,
    height: 600,
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&q=80",
    alt: "Luxury hotel room",
    category: "rooms",
    width: 800,
    height: 533,
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&q=80",
    alt: "Infinity pool overlooking the city",
    category: "pool",
    width: 800,
    height: 534,
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80",
    alt: "Fine dining restaurant",
    category: "dining",
    width: 800,
    height: 533,
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&q=80",
    alt: "Wedding reception setup",
    category: "events",
    width: 800,
    height: 533,
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80",
    alt: "Deluxe room interior",
    category: "rooms",
    width: 800,
    height: 534,
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80",
    alt: "Spa treatment room",
    category: "pool",
    width: 800,
    height: 533,
  },
  {
    id: 8,
    src: "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?w=800&q=80",
    alt: "Hotel lobby",
    category: "exterior",
    width: 800,
    height: 533,
  },
  {
    id: 9,
    src: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=80",
    alt: "Executive suite living room",
    category: "rooms",
    width: 800,
    height: 533,
  },
  {
    id: 10,
    src: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80",
    alt: "Bar and lounge area",
    category: "dining",
    width: 800,
    height: 533,
  },
  {
    id: 11,
    src: "https://images.unsplash.com/photo-1431540015161-0bf868a2d407?w=800&q=80",
    alt: "Conference room setup",
    category: "events",
    width: 800,
    height: 533,
  },
  {
    id: 12,
    src: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&q=80",
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
