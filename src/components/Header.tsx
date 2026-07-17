import Link from "next/link";
import { BookNowButton } from "@/components/BookNowButton";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-rose-100 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <Link href="/" className="text-lg font-semibold tracking-tight text-rose-700">
          Prerna Beauty Bliss
        </Link>

        <nav className="hidden gap-6 text-sm font-medium text-gray-700 sm:flex">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-rose-700">
              {link.label}
            </Link>
          ))}
        </nav>

        <BookNowButton
          label="Book Now"
          className="rounded-full bg-rose-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-rose-700"
        />
      </div>
    </header>
  );
}
