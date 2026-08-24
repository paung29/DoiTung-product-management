"use client";

export default function HomeHistoryTabs({
  active,
}: {
  active: "home" | "history";
}) {
  const label = active === "home" ? "Home" : "History";

  return (
    <div className="bg-primary w-fit rounded-xl px-6 py-2 text-center font-semibold text-white shadow-sm">
      {label}
    </div>
  );
}
