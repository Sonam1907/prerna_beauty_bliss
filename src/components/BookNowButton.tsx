"use client";

import { useState } from "react";

interface BookNowButtonProps {
  packageName?: string;
  packagePrice?: number;
  label?: string;
  className?: string;
}

const INSTAGRAM_HANDLE = process.env.NEXT_PUBLIC_INSTAGRAM_HANDLE ?? "";
const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "";

function buildWhatsappMessage(packageName?: string, packagePrice?: number) {
  if (packageName) {
    const priceText = packagePrice
      ? ` (₹${packagePrice.toLocaleString("en-IN")})`
      : "";
    return `Hi! I'm interested in the ${packageName} package${priceText}. Please let me know availability.`;
  }
  return "Hi! I'd like to know more about your services.";
}

const DEFAULT_CLASSES =
  "inline-flex items-center justify-center rounded-full bg-rose-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-rose-700";

export function BookNowButton({
  packageName,
  packagePrice,
  label = "Book Now",
  className,
}: BookNowButtonProps) {
  const [open, setOpen] = useState(false);

  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    buildWhatsappMessage(packageName, packagePrice),
  )}`;
  const instagramHref = `https://ig.me/m/${INSTAGRAM_HANDLE}`;

  return (
    <div className="relative inline-block">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={className ?? DEFAULT_CLASSES}
      >
        {label}
      </button>

      {open && (
        <>
          {/* Click-outside catcher */}
          <button
            type="button"
            aria-hidden
            tabIndex={-1}
            className="fixed inset-0 z-40 cursor-default"
            onClick={() => setOpen(false)}
          />
          <div className="absolute right-0 z-50 mt-2 w-72 rounded-xl border border-rose-100 bg-white p-2 shadow-xl">
            <a
              href={instagramHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-800 hover:bg-rose-50"
            >
              <span aria-hidden>📷</span>
              Message on Instagram
            </a>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-800 hover:bg-rose-50"
            >
              <span aria-hidden>💬</span>
              Message on WhatsApp
            </a>
          </div>
        </>
      )}
    </div>
  );
}
