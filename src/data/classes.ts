export interface Course {
    id: string;
    title: string;
    duration: string;
    price: string;
    level?: "Beginner" | "Intermediate" | "Advanced";
    image?: string;
    description?: string;
    curriculum?: string[];
}

export interface CourseCategory {
    name: string;
    courses: Course[];
    image?: string; // Add image for category-level display
}

export const FEATURED_WORKSHOPS: Course[] = [
    {
        id: "fondant-masterclass",
        title: "Advanced Fondant Masterclass",
        duration: "5 Days",
        level: "Advanced",
        price: "₹15,000",
        image: "https://images.unsplash.com/photo-1535254973040-607b474cb50d?q=80&w=800",
        description: "Master the art of draping, sharp edges, and hand-sculpted sugar figurines.",
        curriculum: ["Ganache & Sharp Edges", "Fondant Draping", "Sugar Flowers", "Figurine Sculpting"],
    },
    {
        id: "cream-sharp-edge",
        title: "Designer Cream Cakes",
        duration: "3 Days",
        level: "Intermediate",
        price: "₹5,000",
        image: "https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?q=80&w=800",
        description: "Learn the secrets of perfectly sharp whipped cream cakes and modern piping techniques.",
        curriculum: ["Whipping Consistency", "Ombre Effects", "Palette Knife Art", "Stacking Tiers"],
    },
    {
        id: "macaron-mastery",
        title: "Eggless Macaron Mastery",
        duration: "1 Day",
        level: "Beginner",
        price: "₹2,000",
        image: "https://images.unsplash.com/photo-1569864358642-9d1684040f43?q=80&w=800",
        description: "Crack the code to the perfect eggless French macaron with feet.",
        curriculum: ["Aquafaba Merigue", "Macaronage Technique", "Ganache Fillings", "Baking Science"],
    },
];

export const BAKING_CATEGORIES: CourseCategory[] = [
    {
        name: "Bread",
        image: "/products/bread_category.png",
        courses: [
            { id: "bread-pav-loaf", title: "Bread, Pav, Burns and Loaf", duration: "2 Days", price: "₹2,000" },
            { id: "jain-bread", title: "Jain Bread", duration: "1 Day", price: "₹2,000" },
            { id: "international-bread", title: "International and Designer Bread", duration: "1 Day", price: "₹2,000" },
            { id: "toast-rusk", title: "Toast and Rusk", duration: "1 Day", price: "₹2,000" },
        ]
    },
    {
        name: "Laminated Pastries",
        image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=800",
        courses: [
            { id: "puff-khari", title: "Puff and Khari", duration: "1 Day", price: "₹2,000" },
            { id: "croissant-danish", title: "Croissant and Danish Roll", duration: "2 Days", price: "₹6,000" },
            { id: "baklava-kunafa", title: "Baklava and Kunafa", duration: "1 Day", price: "₹3,000" },
        ]
    },
    {
        name: "Cookies",
        image: "/products/zchocochipscookies.JPG",
        courses: [
            { id: "classic-cookies", title: "Classic Cookies", duration: "1 Day", price: "₹2,000" },
            { id: "healthy-cookies", title: "Healthy Cookies", duration: "1 Day", price: "₹2,000" },
            { id: "exotic-cookies", title: "Exotic Cookies", duration: "2 Days", price: "₹2,500" },
            { id: "french-macaroons", title: "French Macaroons", duration: "1 Day", price: "₹2,000" },
        ]
    },
    {
        name: "Chocolate",
        image: "/products/chocolate_spoon.png",
        courses: [
            { id: "basic-advanced-chocolate", title: "Basic to Advanced Chocolate", duration: "1 Day", price: "₹2,000" },
            { id: "exotic-chocolate", title: "Exotic Chocolate", duration: "1 Day", price: "₹2,500" },
            { id: "chocolate-bouquet", title: "Chocolate Bouquet", duration: "1 Day", price: "₹2,000" },
        ]
    },
    {
        name: "Travel Cake",
        image: "/products/almond_coffee_cake.png",
        courses: [
            { id: "cupcakes-muffins", title: "Cupcakes and Muffins", duration: "1 Day", price: "₹2,000" },
            { id: "healthy-tea-cake", title: "Healthy Tea Time Cake", duration: "1 Day", price: "₹2,000" },
            { id: "classic-tea-cake", title: "Classic Tea Time Cake", duration: "1 Day", price: "₹2,000" },
            { id: "basic-cake-sponge", title: "Basic Cake Sponge", duration: "1 Day", price: "₹1,500" },
        ]
    },
    {
        name: "Exotic Bakes",
        image: "/products/burnt_basque_cheesecake_new.png",
        courses: [
            { id: "cheese-cake", title: "Cheese Cake", duration: "1 Day", price: "₹2,000" },
            { id: "brownie-blondies", title: "Brownie and Blondies", duration: "1 Day", price: "₹2,000" },
            { id: "doughnuts-eclairs", title: "Doughnuts and Eclairs", duration: "1 Day", price: "₹2,000" },
            { id: "pie-tart-quiche", title: "Pie, Tart & Quiche", duration: "1 Day", price: "₹2,000" },
            { id: "exotic-granola-bar", title: "Exotic Granola Bar", duration: "1 Day", price: "₹2,200" },
        ]
    },
    {
        name: "Designer Cake (Cream Base)",
        image: "/products/rasmalai_cake.png",
        courses: [
            { id: "basic-cream-cake", title: "Basic Cream Cake", duration: "2 Days", price: "₹3,000" },
            { id: "adv-cream-cake", title: "Basic to Advanced Cream Cake", duration: "3 Days", price: "₹5,000" },
        ]
    },
    {
        name: "Fondant Cake",
        image: "/products/white_forest.png",
        courses: [
            { id: "basic-fondant-cake", title: "Basic Fondant Cake", duration: "3 Days", price: "₹4,500" },
            { id: "adv-fondant-cake", title: "Basic to Advanced Fondant Cake", duration: "4 Days", price: "₹8,000" },
            { id: "intense-fondant-cake", title: "Intense Fondant Cake", duration: "5 Days", price: "₹15,000" },
        ]
    },
    {
        name: "Cakes in Trend",
        image: "/products/paan_cake.png",
        courses: [
            { id: "chandelier-cake", title: "Chandelier Cake", duration: "1 Day", price: "₹3,500" },
            { id: "heart-cake", title: "Standing Heart Shaped Cake", duration: "1 Day", price: "₹2,500" },
            { id: "topsy-turvy", title: "Topsy Turvy Cake", duration: "1 Day", price: "₹5,000" },
            { id: "butter-cream", title: "Butter Cream Cake", duration: "1 Day", price: "₹2,000" },
            { id: "color-ganache", title: "Color Ganache Cake", duration: "1 Day", price: "₹4,000" },
            { id: "modeling-chocolate", title: "Modeling Chocolate", duration: "1 Day", price: "₹2,500" },
            { id: "french-entremets", title: "French Entremets’", duration: "2 Days", price: "₹5,000" },
            { id: "gum-paste-flower", title: "Gum paste Flower", duration: "3 Days", price: "₹5,000" },
        ]
    }
];

export const COOKING_CLASSES: Course[] = [
    { id: "royal-sweets", title: "Royal Sweets", duration: "1 Day", price: "₹2,500", image: "/products/royal_sweets_category.png" },
    { id: "traditional-sweets", title: "Traditional Sweets", duration: "1 Day", price: "₹2,500", image: "/products/traditional_sweets_category.png" },
    { id: "bengali-sweets", title: "Bengali Sweets", duration: "1 Day", price: "₹2,500", image: "/products/bengali_sweets_category.png" },
    { id: "sizzlers", title: "Sizzling Sizzlers", duration: "2 Days", price: "₹2,000", image: "/products/sizzlers_category.png" },
    { id: "punjabi-veggies", title: "Punjabi Veggies", duration: "2 Days", price: "₹2,000", image: "/products/punjabi_veggies_category.png" },
    { id: "chinese-cuisine", title: "Chinese Cuisine", duration: "1 Day", price: "₹2,000", image: "/products/chinese_cuisine_category.png" },
    { id: "italian-cuisine", title: "Italian Cuisine", duration: "1 Day", price: "₹2,000", image: "/products/italian_cuisine_category.png" },
    { id: "thai-cuisine", title: "Thai Cuisine", duration: "1 Day", price: "₹2,000", image: "/products/thai_cuisine_category.png" },
    { id: "mexican-cuisine", title: "Mexican Cuisine", duration: "1 Day", price: "₹2,000", image: "/products/mexican_cuisine_category.png" },
    { id: "hot-starters", title: "Hot Starters", duration: "1 Day", price: "₹2,000", image: "/products/hot_starters_category.png" },
    { id: "rajasthani-dishes", title: "Rajasthani Dishes", duration: "1 Day", price: "₹2,000", image: "/products/rajasthani_dishes_category.png" },
    { id: "barbeque-bites", title: "Barbeque-Bites", duration: "1 Day", price: "₹2,000", image: "/products/barbeque_bites_category.png" },
    { id: "mocktails", title: "Mocktails", duration: "1 Day", price: "₹2,000", image: "/products/mocktails_category.png" },
    { id: "thick-shakes", title: "Thick Shakes", duration: "1 Day", price: "₹2,000", image: "/products/thick_shake_category.png" },
    { id: "dip-sandwiches", title: "Dip and Sandwiches", duration: "1 Day", price: "₹2,000", image: "/products/sandwiches_category.png" },
    { id: "varieties-coffee", title: "Varieties of Coffee", duration: "1 Day", price: "₹2,000", image: "/products/coffee_category.png" },
    { id: "gujarati-snack", title: "Gujarati Snack", duration: "1 Day", price: "₹2,000", image: "/products/gujarati_snack_category.png" },
    { id: "south-indian", title: "South Indian Dishes", duration: "1 Day", price: "₹2,000", image: "/products/south_indian_category.png" },
    { id: "varieties-parathas", title: "Varieties of Parathas", duration: "1 Day", price: "₹2,000", image: "/products/parathas_category.png" },
    { id: "varieties-biryani", title: "Varieties of Biryani & Raita", duration: "1 Day", price: "₹2,000", image: "/products/biryani_category.png" },
    { id: "ice-cream-faluda", title: "Natural Ice-Cream & Faluda", duration: "1 Day", price: "₹2,000", image: "/products/faluda_category.png" },
    { id: "healthy-soup", title: "Healthy Soup", duration: "1 Day", price: "₹2,000", image: "/products/soup_category.png" },
    { id: "exotic-salads", title: "Exotic Salads", duration: "1 Day", price: "₹2,000", image: "/products/salads_category.png" },
    { id: "exotic-waffles", title: "Exotic Waffles", duration: "1 Day", price: "₹2,000", image: "/products/waffles_category.png" },
    { id: "microwaves-dishes", title: "Microwaves Dishes", duration: "1 Day", price: "₹1,800", image: "/products/microwave_category.png" },
];

// For backward compatibility or general use
export const WORKSHOPS = FEATURED_WORKSHOPS;
