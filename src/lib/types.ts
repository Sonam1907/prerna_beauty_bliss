export interface Category {
  id: string;
  name: string;
  slug: string;
  display_order: number;
}

export interface Package {
  id: string;
  category_id: string;
  name: string;
  slug: string;
  description: string | null;
  base_price: number;
  duration_minutes: number | null;
  is_active: boolean;
}

export interface PackageProduct {
  id: string;
  product_name: string;
  brand: string | null;
  notes: string | null;
  display_order: number;
}

export interface PackageImage {
  id: string;
  image_url: string;
  display_order: number;
  alt_text: string | null;
}

export interface PackageAddon {
  id: string;
  name: string;
  price: number;
}

export interface Stylist {
  id: string;
  name: string;
  photo_url: string | null;
  specialty: string | null;
  bio: string | null;
  instagram_url: string | null;
  facebook_url: string | null;
  display_order: number;
}

export interface PortfolioImage {
  id: string;
  category_id: string | null;
  before_image_url: string;
  after_image_url: string;
  caption: string | null;
  display_order: number;
}

export interface CategoryWithPackages extends Category {
  packages: Package[];
}

export interface PackageWithDetails extends Package {
  category: Pick<Category, "id" | "name" | "slug">;
  products: PackageProduct[];
  images: PackageImage[];
  addons: PackageAddon[];
}
