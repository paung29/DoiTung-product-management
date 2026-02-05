"use client";

function FormCard({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="bg-secondary border-primary-button flex h-[120] w-full items-center rounded-xl border px-10">
        <div className="w-full">{children}</div>
      </div>
    </>
  );
}

export default FormCard;
