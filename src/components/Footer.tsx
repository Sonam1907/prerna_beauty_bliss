const INSTAGRAM_HANDLE = process.env.NEXT_PUBLIC_INSTAGRAM_HANDLE ?? "";
const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-rose-100 bg-rose-50/50">
      <div className="mx-auto max-w-6xl px-4 py-10 text-sm text-gray-600 sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-semibold text-rose-700">Prerna Beauty Bliss</p>
          <div className="flex gap-4">
            <a
              href={`https://ig.me/m/${INSTAGRAM_HANDLE}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-rose-700"
            >
              Instagram
            </a>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-rose-700"
            >
              WhatsApp
            </a>
          </div>
        </div>
        <p className="mt-4 text-xs text-gray-400">
          © {new Date().getFullYear()} Prerna Beauty Bliss. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
