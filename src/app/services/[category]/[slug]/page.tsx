import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { BookNowButton } from "@/components/BookNowButton";
import { getPackageBySlug } from "@/lib/data";
import { formatPrice } from "@/lib/format";

interface PageProps {
  params: Promise<{ category: string; slug: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const pkg = await getPackageBySlug(slug);
  if (!pkg) return {};
  return {
    title: `${pkg.name} — Prerna Beauty Bliss`,
    description: pkg.description ?? undefined,
  };
}

export default async function PackageDetailPage({ params }: PageProps) {
  const { category, slug } = await params;
  const pkg = await getPackageBySlug(slug);

  if (!pkg || pkg.category.slug !== category) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <nav className="text-sm text-gray-500">
        <Link href="/services" className="hover:text-rose-700">
          Services
        </Link>{" "}
        /{" "}
        <Link
          href={`/services#${pkg.category.slug}`}
          className="hover:text-rose-700"
        >
          {pkg.category.name}
        </Link>{" "}
        / <span className="text-gray-700">{pkg.name}</span>
      </nav>

      {pkg.images.length > 0 && (
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {pkg.images.map((image) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={image.id}
              src={image.image_url}
              alt={image.alt_text ?? pkg.name}
              className="aspect-[4/3] w-full rounded-2xl object-cover"
            />
          ))}
        </div>
      )}

      <div className="mt-8 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{pkg.name}</h1>
          {pkg.description && (
            <p className="mt-2 text-gray-600">{pkg.description}</p>
          )}
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-rose-600">
            {formatPrice(pkg.base_price)}
          </p>
          {pkg.duration_minutes && (
            <p className="text-sm text-gray-500">
              ~{pkg.duration_minutes} min
            </p>
          )}
        </div>
      </div>

      <div className="mt-6">
        <BookNowButton packageName={pkg.name} packagePrice={pkg.base_price} />
      </div>

      {pkg.products.length > 0 && (
        <section className="mt-12">
          <h2 className="text-lg font-semibold text-gray-900">
            Products Used
          </h2>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {pkg.products.map((product) => (
              <li
                key={product.id}
                className="flex items-start gap-2 text-gray-700"
              >
                <span className="mt-0.5 text-rose-600">✔️</span>
                <span>
                  {product.product_name}
                  {product.brand && (
                    <span className="text-gray-500"> — {product.brand}</span>
                  )}
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {pkg.addons.length > 0 && (
        <section className="mt-12">
          <h2 className="text-lg font-semibold text-gray-900">Add-ons</h2>
          <ul className="mt-4 divide-y divide-rose-100 rounded-xl border border-rose-100">
            {pkg.addons.map((addon) => (
              <li
                key={addon.id}
                className="flex items-center justify-between px-4 py-3"
              >
                <span className="text-gray-700">{addon.name}</span>
                <span className="font-semibold text-rose-600">
                  +{formatPrice(addon.price)}
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
