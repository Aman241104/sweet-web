export interface GalleryItem {
  id: number;
  title: string;
  category: "Birthday" | "Anniversary" | "Wedding" | "Customised";
  image: string;
}

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 1,
    title: "Elegant Birthday Cake",
    category: "Birthday",
    image: "/products/black_forest.png",
  },
  {
    id: 2,
    title: "Royal Wedding Tier",
    category: "Wedding",
    image: "/products/white_forest.png",
  },
  {
    id: 3,
    title: "Anniversary Special",
    category: "Anniversary",
    image: "/products/rasmalai_cake.png",
  },
  {
    id: 4,
    title: "Customised Theme Cake",
    category: "Customised",
    image: "/products/hazelnut_cake.png",
  },
  {
    id: 5,
    title: "Birthday Celebration",
    category: "Birthday",
    image: "/products/alphanzo_mango_cake.png",
  },
  {
    id: 6,
    title: "Classic Wedding Cake",
    category: "Wedding",
    image: "/products/rich_pineapple_cake.png",
  },
  {
    id: 7,
    title: "Luxury Anniversary",
    category: "Anniversary",
    image: "/products/dutch_truffle_cake.png",
  },
  {
    id: 8,
    title: "Unique Custom Design",
    category: "Customised",
    image: "/products/biscoff_cake.png",
  },
];
