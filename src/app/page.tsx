import Image from "next/image";
import Link from "next/link";
import { BookNowButton } from "@/components/BookNowButton";
import {
  getCategoriesWithPackages,
  getPortfolioImages,
  getStylists,
} from "@/lib/data";
import { formatPrice } from "@/lib/format";

const HYGIENE_PROMISE = [
  "Sanitized Brushes After Every Client",
  "Disposable Mascara Wands & Lip Applicators",
  "Premium Quality Products",
  "Long-lasting Waterproof Makeup",
  "Customized Makeup According to Skin Type",
];

export default async function HomePage() {
  const [categories, stylists, portfolioImages] = await Promise.all([
    getCategoriesWithPackages(),
    getStylists(),
    getPortfolioImages(),
  ]);

  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden">
        <Image
          src="/images/hero-background.jpg"
          alt="Bridal makeup by Prerna Beauty Bliss"
          fill
          priority
          className="object-cover object-[70%_20%]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />

        <div className="relative mx-auto max-w-6xl px-4 py-24 text-center sm:px-6 sm:py-32">
          <p className="text-sm font-semibold tracking-wide text-rose-300 uppercase">
            Look Beautiful. Feel Confident.
          </p>
          <h1 className="mt-4 text-4xl font-bold text-white sm:text-5xl">
            Where Beauty <span className="text-rose-400">Meets</span>{" "}
            Perfection
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-gray-200">
            Professional makeup, mehendi, hairstyle, and draping services —
            tailored just for you.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <BookNowButton label="Book Now" />
            <Link
              href="/services"
              className="rounded-full border border-white/70 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Explore Services
            </Link>
          </div>
        </div>
      </section>

      {/* Services preview */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="text-center">
          <p className="text-sm font-semibold tracking-wide text-rose-600 uppercase">
            Our Services
          </p>
          <h2 className="mt-2 text-3xl font-bold text-gray-900">
            Beauty Services Just For You
          </h2>
        </div>

        {categories.length === 0 ? (
          <p className="mt-10 text-center text-gray-500">
            Services are being added — check back soon.
          </p>
        ) : (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => {
              const startingPrice =
                category.packages.length > 0
                  ? Math.min(...category.packages.map((p) => p.base_price))
                  : null;

              return (
                <Link
                  key={category.id}
                  href={`/services#${category.slug}`}
                  className="rounded-2xl border border-rose-100 bg-white p-6 text-center shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  <h3 className="text-lg font-semibold text-gray-900">
                    {category.name}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {category.packages.length}{" "}
                    {category.packages.length === 1 ? "package" : "packages"}
                  </p>
                  {startingPrice !== null && (
                    <p className="mt-3 text-rose-600 font-semibold">
                      From {formatPrice(startingPrice)}
                    </p>
                  )}
                </Link>
              );
            })}
          </div>
        )}
      </section>

      {/* Before & After — only shown once portfolio photos exist */}
      {portfolioImages.length > 0 && (
        <section className="bg-rose-50/60 py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="text-center">
              <p className="text-sm font-semibold tracking-wide text-rose-600 uppercase">
                Before & After
              </p>
              <h2 className="mt-2 text-3xl font-bold text-gray-900">
                Real Transformations, Real Confidence
              </h2>
            </div>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {portfolioImages.map((image) => (
                <div
                  key={image.id}
                  className="overflow-hidden rounded-2xl border border-rose-100 bg-white shadow-sm"
                >
                  <div className="grid grid-cols-2">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={image.before_image_url}
                      alt="Before"
                      className="h-48 w-full object-cover"
                    />
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={image.after_image_url}
                      alt="After"
                      className="h-48 w-full object-cover"
                    />
                  </div>
                  {image.caption && (
                    <p className="p-3 text-sm text-gray-600">
                      {image.caption}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Meet the Team — only shown once stylists exist */}
      {stylists.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <div className="text-center">
            <p className="text-sm font-semibold tracking-wide text-rose-600 uppercase">
              Our Experts
            </p>
            <h2 className="mt-2 text-3xl font-bold text-gray-900">
              Meet Our Team
            </h2>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-3 lg:grid-cols-5">
            {stylists.map((stylist) => (
              <div key={stylist.id} className="text-center">
                <div className="mx-auto h-28 w-28 overflow-hidden rounded-full bg-rose-100">
                  {stylist.photo_url && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={stylist.photo_url}
                      alt={stylist.name}
                      className="h-full w-full object-cover"
                    />
                  )}
                </div>
                <p className="mt-3 font-semibold text-gray-900">
                  {stylist.name}
                </p>
                {stylist.specialty && (
                  <p className="text-sm text-gray-500">{stylist.specialty}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Hygiene & Quality Promise */}
      <section className="bg-rose-50/60 py-16">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <p className="text-sm font-semibold tracking-wide text-rose-600 uppercase">
            Hygiene & Quality Promise
          </p>
          <h2 className="mt-2 text-3xl font-bold text-gray-900">
            Your Safety, Our Priority
          </h2>
          <ul className="mx-auto mt-8 grid max-w-2xl gap-4 text-left sm:grid-cols-2">
            {HYGIENE_PROMISE.map((item) => (
              <li key={item} className="flex items-start gap-2 text-gray-700">
                <span className="mt-0.5 text-rose-600">✔️</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Book Now CTA banner */}
      <section className="mx-auto max-w-6xl px-4 py-16 text-center sm:px-6">
        <h2 className="text-2xl font-bold text-gray-900">
          Ready to book your appointment?
        </h2>
        <p className="mt-2 text-gray-600">
          Message us directly — we&apos;ll confirm availability and all the
          details.
        </p>
        <div className="mt-6">
          <BookNowButton label="Book Now" />
        </div>
      </section>
    </>
  );
}
