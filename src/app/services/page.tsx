import Link from "next/link";
import type { Metadata } from "next";
import { getCategoriesWithPackages } from "@/lib/data";
import { formatPrice } from "@/lib/format";

export const metadata: Metadata = {
  title: "Services & Pricing — Prerna Beauty Bliss",
  description:
    "Browse all makeup, mehendi, hairstyle, and draping packages with full pricing.",
};

export default async function ServicesPage() {
  const categories = await getCategoriesWithPackages();

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="text-center">
        <p className="text-sm font-semibold tracking-wide text-rose-600 uppercase">
          Our Services
        </p>
        <h1 className="mt-2 text-4xl font-bold text-gray-900">
          Services & Pricing
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-gray-600">
          Every package below is ready to book — tap any one for full details,
          then message us on Instagram or WhatsApp to confirm.
        </p>
      </div>

      {categories.length === 0 && (
        <p className="mt-16 text-center text-gray-500">
          Services are being added — check back soon.
        </p>
      )}

      <div className="mt-16 space-y-20">
        {categories.map((category) => (
          <section
            key={category.id}
            id={category.slug}
            className="scroll-mt-24"
          >
            <h2 className="text-2xl font-bold text-gray-900">
              {category.name}
            </h2>

            {category.packages.length === 0 ? (
              <p className="mt-4 text-gray-500">
                Packages for this category are coming soon.
              </p>
            ) : (
              <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {category.packages.map((pkg) => (
                  <Link
                    key={pkg.id}
                    href={`/services/${category.slug}/${pkg.slug}`}
                    className="flex flex-col rounded-2xl border border-rose-100 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <h3 className="text-lg font-semibold text-gray-900">
                      {pkg.name}
                    </h3>
                    {pkg.description && (
                      <p className="mt-2 text-sm text-gray-500">
                        {pkg.description}
                      </p>
                    )}
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-lg font-semibold text-rose-600">
                        {formatPrice(pkg.base_price)}
                      </span>
                      <span className="text-sm font-medium text-rose-700">
                        View Details →
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </section>
        ))}
      </div>
    </div>
  );
}
