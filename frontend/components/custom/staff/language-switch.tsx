"use client";

import { usePathname, useRouter } from "next/navigation";

export default function LanguageSwitch({ locale }: { locale: "en" | "lahu" }) {
  const router = useRouter();
  const pathname = usePathname();

  function changeLang(newLang: "en" | "lahu") {
    const parts = pathname.split("/");
    parts[1] = newLang;
    router.push(parts.join("/"));
  }

  return (
    <div className="flex items-center gap-0 rounded-lg border border-gray-300 bg-[#FAF3E0] p-0.5">
      {/* English Button */}
      <button
        onClick={() => changeLang("en")}
        className={`px-3 py-1.5 text-xs font-semibold transition-all duration-200 ${
          locale === "en"
            ? "text-gray-900 bg-white rounded"
            : "text-gray-600 hover:text-gray-900"
        }`}
      >
        EN
      </button>

      {/* Divider */}
      <div className="h-3 w-px bg-gray-300" />

      {/*Lahu Button */}
      <button
        onClick={() => changeLang("lahu")}
        className={`px-3 py-1.5 text-xs font-semibold transition-all duration-200 ${
          locale === "lahu"
            ? "text-gray-900 bg-white rounded"
            : "text-gray-600 hover:text-gray-900"
        }`}
      >
        LH
      </button>
    </div>
  );
}
