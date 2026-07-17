import { createClient } from "@/lib/supabase/server";
import type {
  CategoryWithPackages,
  PackageWithDetails,
  PortfolioImage,
  Stylist,
} from "@/lib/types";

// Manually typed against supabase/schema.sql rather than generated types —
// there's no Supabase CLI linked to this project yet. If the schema drifts,
// update supabase/schema.sql and these types together.

export async function getCategoriesWithPackages(): Promise<
  CategoryWithPackages[]
> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("categories")
    .select(
      "id, name, slug, display_order, packages(id, category_id, name, slug, description, base_price, duration_minutes, is_active)",
    )
    .order("display_order", { ascending: true });

  if (error) throw error;

  return (data ?? []).map((category) => ({
    ...category,
    packages: (category.packages ?? [])
      .filter((pkg) => pkg.is_active)
      .sort((a, b) => a.base_price - b.base_price),
  })) as CategoryWithPackages[];
}

export async function getPackageBySlug(
  slug: string,
): Promise<PackageWithDetails | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("packages")
    .select(
      `id, category_id, name, slug, description, base_price, duration_minutes, is_active,
       category:categories(id, name, slug),
       products:package_products(id, product_name, brand, notes, display_order),
       images:package_images(id, image_url, display_order, alt_text),
       addons:package_addons(id, name, price)`,
    )
    .eq("slug", slug)
    .eq("is_active", true)
    .single();

  if (error || !data) return null;

  const result = data as unknown as PackageWithDetails;
  result.products = [...result.products].sort(
    (a, b) => a.display_order - b.display_order,
  );
  result.images = [...result.images].sort(
    (a, b) => a.display_order - b.display_order,
  );
  return result;
}

// Returns [] rather than throwing — these tables are still empty (no
// stylists/portfolio content received yet), so callers should treat an
// empty array as "section not ready to show" rather than an error.

export async function getStylists(): Promise<Stylist[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("stylists")
    .select(
      "id, name, photo_url, specialty, bio, instagram_url, facebook_url, display_order",
    )
    .order("display_order", { ascending: true });

  if (error) return [];
  return data ?? [];
}

export async function getPortfolioImages(): Promise<PortfolioImage[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("portfolio_images")
    .select(
      "id, category_id, before_image_url, after_image_url, caption, display_order",
    )
    .order("display_order", { ascending: true });

  if (error) return [];
  return data ?? [];
}
