export interface GalleryItem {
  id: number;
  title: string;
  category: "Birthday" | "Anniversary" | "Wedding" | "Customised";
  image: string;
}

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 15,
    title: "Dreamy 1st Birthday Train",
    category: "Customised",
    image: "/products/customised_1st_birthday_train.png",
  },
  {
    id: 16,
    title: "Social Media Addict Cake",
    category: "Customised",
    image: "/products/customised_social_media_cake.png",
  },
  {
    id: 13,
    title: "Classic Red Rose Wedding",
    category: "Wedding",
    image: "/products/wedding_red_roses.png",
  },
  {
    id: 14,
    title: "Artisanal Peach Floral Tier",
    category: "Wedding",
    image: "/products/wedding_peach_floral.png",
  },
  {
    id: 11,
    title: "Elegant Hearts Anniversary",
    category: "Anniversary",
    image: "/products/anniversary_red_hearts.png",
  },
  {
    id: 12,
    title: "Royal Couple Tiered Cake",
    category: "Anniversary",
    image: "/products/anniversary_couple_tiered.png",
  },
  {
    id: 9,
    title: "Signature Birthday Blue",
    category: "Birthday",
    image: "/products/birthday_dad_blue.png",
  },
  {
    id: 10,
    title: "Luxury Chocolate Birthday",
    category: "Birthday",
    image: "/products/birthday_chocolate_split.png",
  },
];
