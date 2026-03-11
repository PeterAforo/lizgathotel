export interface Testimonial {
  id: number;
  name: string;
  location: string;
  rating: number;
  text: string;
  avatar: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Kwame Asante",
    location: "Accra, Ghana",
    rating: 5,
    text: "An absolutely exceptional experience from check-in to check-out. The staff went above and beyond to make our anniversary celebration truly special. The Presidential Suite was breathtaking!",
    avatar: "KA",
  },
  {
    id: 2,
    name: "Sarah Mitchell",
    location: "London, UK",
    rating: 5,
    text: "LIZGAT Hotel exceeded all expectations. The blend of Ghanaian hospitality with world-class service is remarkable. The spa treatments were divine, and the restaurant served the best jollof rice I've ever tasted.",
    avatar: "SM",
  },
  {
    id: 3,
    name: "David Osei",
    location: "Kumasi, Ghana",
    rating: 5,
    text: "Perfect for business travel. The conference facilities are top-notch, and the Executive Suite provided a wonderful space to relax after meetings. I'll definitely be returning on my next trip.",
    avatar: "DO",
  },
  {
    id: 4,
    name: "Aisha Johnson",
    location: "New York, USA",
    rating: 5,
    text: "What a gem in Accra! The pool area is stunning, the rooms are impeccably clean, and the concierge helped us plan the most amazing tour of the city. Highly recommended for any traveler!",
    avatar: "AJ",
  },
  {
    id: 5,
    name: "Emmanuel Mensah",
    location: "Cape Coast, Ghana",
    rating: 5,
    text: "We hosted our wedding reception at LIZGAT Hotel and it was absolutely magical. The event team handled everything flawlessly. Our guests are still talking about how wonderful it was!",
    avatar: "EM",
  },
  {
    id: 6,
    name: "Chen Wei",
    location: "Beijing, China",
    rating: 5,
    text: "Outstanding hospitality! From the moment we arrived, we felt welcomed and valued. The attention to detail in every aspect of the hotel is impressive. A true five-star experience in Ghana.",
    avatar: "CW",
  },
];
