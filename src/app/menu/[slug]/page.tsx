import { Metadata } from "next";
import { MENU_ITEMS, CATEGORIES } from "@/data/menu";
import { slugify } from "@/utils/slugify";
import MenuDetailClient from "@/components/menu/MenuDetailClient";
import { SITE_CONFIG } from "@/config/site";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;

  // Check if it's a category
  const categoryName = CATEGORIES.find((c) => slugify(c) === slug);
  if (categoryName) {
    return {
      title: `${categoryName} | Artisanal Bakery Ahmedabad`,
      description: `Explore our premium selection of ${categoryName.toLowerCase()} at ${SITE_CONFIG.name}. Handcrafted with love in Ahmedabad. Order now via WhatsApp.`,
      openGraph: {
        title: `${categoryName} - Gourmetttazone`,
        description: `Freshly baked ${categoryName.toLowerCase()} delivered across Ahmedabad.`,
      },
    };
  }

  // Check if it's a product
  const product = MENU_ITEMS.find((p) => p.id === slug);
  if (product) {
    return {
      title: `${product.name} | Best ${product.category} in Ahmedabad`,
      description: `${product.description} Order our signature ${product.name} online. Handcrafted by Kavita in Vastrapur, Ahmedabad.`,
      openGraph: {
        title: product.name,
        description: product.description,
        images: [{ url: product.image }],
      },
    };
  }

  return {
    title: "Sweet Item Not Found",
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  return <MenuDetailClient slug={slug} />;
}
