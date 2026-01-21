import LanguageSwitch from "@/components/custom/staff/language-switch";
import StaffMenu from "@/components/custom/staff/menu";
import Image from "next/image";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <header className="w-full bg-yellow-900 text-white px-6 py-4">
        <div className="flex items-center justify-between">
          {/* LEFT: menu + logo */}
          <div className="flex items-center gap-4">
            <StaffMenu />
            <Image src="/logo.png" alt="Logo" width={200} height={100} />
          </div>

          {/* CENTER: title */}
          <div className="text-center">
            <h1 className="text-xl font-semibold">
              Vanilla Product Management
            </h1>
            <p className="text-sm">Staff Portal</p>
          </div>

          {/* RIGHT: language switch */}
          <LanguageSwitch locale="en" />
        </div>
      </header>

      <main>{children}</main>
    </div>
  );
}
