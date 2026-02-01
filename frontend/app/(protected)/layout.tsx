import LanguageSwitch from "@/components/custom/staff/language-switch";
import StaffMenu from "@/components/custom/staff/menu";
import Image from "next/image";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#f2f1ed]">
      <header className="sticky top-0 z-50 h-20 w-full bg-yellow-900 text-white px-6">
        <div className="h-full flex items-center justify-between">
          {/* LEFT */}
          <div className="flex items-center gap-4">
            <StaffMenu />
            <Image src="/logo.png" alt="Logo" width={200} height={100} />
          </div>

          {/* CENTER */}
          <div className="text-center">
            <h1 className="text-xl font-semibold">
              Vanilla Product Management
            </h1>
            <p className="text-sm">Staff Portal</p>
          </div>

          {/* RIGHT */}
          <LanguageSwitch locale="en" />
        </div>
      </header>

      <main className="min-h-[calc(100vh-80px)] bg-[#f2f1ed]">{children}</main>
    </div>
  );
}
