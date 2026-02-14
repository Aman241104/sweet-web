export interface Product {
  id: string; // Used as the URL slug
  name: string;
  category: string;
  price: string;
  image: string;
  description: string;
  longDescription: string;
  ingredients: string[];
  weightOptions: string[];
  badge?: string;
}

export const CATEGORIES = [
  "All",
  "Cakes",
  "Cupcakes",
  "Pastries",
  "Savoury",
] as const;

export type Category = (typeof CATEGORIES)[number];

export const products: Product[] = [
  /* ── Cakes ────────────────────────────────────────────────────── */
  {
    id: "velvet-rose-cake",
    name: "Velvet Rose Cake",
    category: "Cakes",
    price: "From ₹1,299",
    image:
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=600",
    description: "Three-layer red velvet with cream cheese frosting.",
    longDescription: "Our signature Velvet Rose Cake is a masterpiece of texture and flavour. Three layers of moist, cocoa-infused red velvet sponge are meticulously balanced with silky Madagascar vanilla cream cheese frosting. Each slice offers a delicate balance of sweetness and tang, perfect for celebrations that deserve a touch of class.",
    ingredients: ["Red Velvet Sponge", "Cream Cheese Frosting", "Natural Cocoa", "Organic Beetroot Extract"],
    weightOptions: ["500g", "1kg", "2kg"],
    badge: "Best Seller",
  },
  {
    id: "chocolate-truffle-tower",
    name: "Chocolate Truffle Tower",
    category: "Cakes",
    price: "From ₹1,499",
    image:
      "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=600",
    description: "Rich Belgian chocolate ganache with hazelnut layers.",
    longDescription: "For the ultimate chocolate connoisseur. This tower features dark Belgian chocolate sponge soaked in house-made espresso syrup, layered with smooth 54% cocoa ganache and toasted Piedmontese hazelnuts. It's intense, sophisticated, and unapologetically rich.",
    ingredients: ["Belgian Dark Chocolate", "Hazelnut Praline", "Espresso Syrup", "Sea Salt"],
    weightOptions: ["500g", "1kg", "1.5kg"],
  },
  {
    id: "wedding-elegance",
    name: "Wedding Elegance",
    category: "Cakes",
    price: "From ₹3,499",
    image:
      "https://images.unsplash.com/photo-1535254973040-607b474cb50d?q=80&w=600",
    description: "Four-tier fondant masterpiece with sugar flowers.",
    longDescription: "A bespoke creation designed to be the centrepiece of your special day. Our Wedding Elegance cake combines traditional craftsmanship with modern aesthetics. Choose from our curated flavour profiles for each tier, all wrapped in flawless marshmallow fondant and decorated with hand-sculpted sugar florals.",
    ingredients: ["Choice of Sponge", "Italian Meringue Buttercream", "Artisanal Fondant", "Edible Gold Leaf"],
    weightOptions: ["3kg", "5kg", "8kg+"],
    badge: "Premium",
  },

  /* ── Cupcakes ─────────────────────────────────────────────────── */
  {
    id: "strawberry-bliss",
    name: "Strawberry Bliss",
    category: "Cupcakes",
    price: "₹149 each",
    image:
      "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?q=80&w=600",
    description: "Fluffy vanilla sponge topped with strawberry buttercream.",
    longDescription: "A burst of summer in every bite. Our Strawberry Bliss cupcakes feature a light, airy vanilla bean sponge with a hidden core of fresh strawberry compote, finished with a generous swirl of real strawberry-infused buttercream.",
    ingredients: ["Fresh Strawberries", "Vanilla Bean", "Golden Cane Sugar", "Grass-fed Butter"],
    weightOptions: ["Pack of 6", "Pack of 12"],
    badge: "Popular",
  },
  {
    id: "salted-caramel-swirl",
    name: "Salted Caramel Swirl",
    category: "Cupcakes",
    price: "₹169 each",
    image:
      "https://images.unsplash.com/photo-1587668178277-295251f900ce?q=80&w=600",
    description: "Caramel-infused batter with sea salt cream cheese top.",
    longDescription: "The perfect marriage of sweet and salty. These cupcakes are made with our secret burnt-caramel batter and topped with a swirl of salted caramel cream cheese frosting, drizzled with more caramel and a pinch of Maldon sea salt.",
    ingredients: ["Maldon Sea Salt", "Burnt Caramel", "Brown Butter", "Cream Cheese"],
    weightOptions: ["Pack of 6", "Pack of 12"],
  },
  {
    id: "rainbow-sprinkle",
    name: "Rainbow Sprinkle",
    category: "Cupcakes",
    price: "₹129 each",
    image:
      "https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?q=80&w=600",
    description: "Classic funfetti cupcake with rainbow sprinkle frosting.",
    longDescription: "A celebration of joy. Our rainbow sprinkle cupcakes are a hit for birthdays and parties. We use a buttery funfetti sponge and top it with a nostalgic, silky smooth vanilla frosting and high-quality imported sprinkles.",
    ingredients: ["Artisan Sprinkles", "Pure Vanilla Extract", "Unbleached Flour", "European Butter"],
    weightOptions: ["Pack of 6", "Pack of 12", "Pack of 24"],
    badge: "Kids' Fav",
  },

  /* ── Pastries ─────────────────────────────────────────────────── */
  {
    id: "classic-french-croissant",
    name: "Classic French Croissant",
    category: "Pastries",
    price: "₹199 each",
    image:
      "https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=600",
    description: "72-hour laminated butter croissant, golden & flaky.",
    longDescription: "The gold standard of viennoiserie. Our croissants undergo a 72-hour long fermentation and lamination process using premium dry butter, resulting in a perfectly honeycomb interior and a shatteringly crisp, golden exterior.",
    ingredients: ["AOP French Butter", "T55 Pastry Flour", "Wild Yeast", "Organic Milk"],
    weightOptions: ["Single", "Box of 4"],
  },
  {
    id: "artisan-fruit-tart",
    name: "Artisan Fruit Tart",
    category: "Pastries",
    price: "₹599",
    image:
      "https://images.unsplash.com/photo-1562440499-64c9a111f713?q=80&w=600",
    description: "Shortcrust shell, crème pâtissière, fresh seasonal fruits.",
    longDescription: "Vibrant and refreshing. A crisp, buttery shortcrust shell filled with velvety smooth vanilla bean crème pâtissière, topped with a geometric arrangement of the season's finest fresh fruits and a light apricot glaze.",
    ingredients: ["Seasonal Fruits", "Vanilla Bean Pods", "Almond Flour", "Pastry Cream"],
    weightOptions: ["Individual", "Large (Serves 6)"],
  },
  {
    id: "pain-au-chocolat",
    name: "Pain au Chocolat",
    category: "Pastries",
    price: "₹249 each",
    image:
      "https://images.unsplash.com/photo-1530610476181-d83430b64dcd?q=80&w=600",
    description: "Buttery puff pastry wrapped around dark chocolate batons.",
    longDescription: "The ultimate breakfast indulgence. The same 72-hour laminated dough as our croissants, but filled with two bars of premium 70% dark chocolate. Perfectly balanced, not too sweet, and intensely buttery.",
    ingredients: ["Valrhona Chocolate", "Laminated Dough", "Egg Wash", "Dry Butter"],
    weightOptions: ["Single", "Box of 4"],
    badge: "New",
  },

  /* ── Savoury ──────────────────────────────────────────────────── */
  {
    id: "spinach-feta-quiche",
    name: "Spinach & Feta Quiche",
    category: "Savoury",
    price: "₹349",
    image:
      "https://images.unsplash.com/photo-1506459225754-0c81e6a29395?q=80&w=600",
    description: "Buttery crust with a creamy spinach-feta egg filling.",
    longDescription: "A savoury delight. Our quiche features a crumbly, herb-infused pastry crust filled with a rich custard of fresh organic eggs, baby spinach, and tangy Greek feta cheese. Served warm for the best experience.",
    ingredients: ["Fresh Spinach", "Greek Feta", "Organic Eggs", "Herb Crust"],
    weightOptions: ["Single Slice", "Full Quiche"],
  },
  {
    id: "mushroom-vol-au-vent",
    name: "Mushroom Vol-au-Vent",
    category: "Savoury",
    price: "₹279 / 2pcs",
    image:
      "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?q=80&w=600",
    description: "Crispy puff pastry cups with truffled mushroom ragout.",
    longDescription: "Elegant and earthy. Light-as-air puff pastry shells filled with a luxurious ragout of forest mushrooms, finished with white truffle oil and a hint of fresh thyme. A perfect appetiser.",
    ingredients: ["Forest Mushrooms", "White Truffle Oil", "Puff Pastry", "Heavy Cream"],
    weightOptions: ["Plate of 2", "Box of 10"],
  },
  {
    id: "herb-cheese-scone",
    name: "Herb & Cheese Scone",
    category: "Savoury",
    price: "₹179 each",
    image:
      "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?q=80&w=600",
    description: "Rustic cheddar scone with rosemary and thyme.",
    longDescription: "Hearty and aromatic. These rustic scones are packed with sharp aged cheddar cheese and a blend of fresh garden herbs including rosemary, thyme, and chives. Topped with a sprinkle of extra cheese for a crispy finish.",
    ingredients: ["Aged Cheddar", "Fresh Rosemary", "Garden Thyme", "Stone-ground Flour"],
    weightOptions: ["Single", "Box of 6"],
    badge: "Chef's Pick",
  },
];
