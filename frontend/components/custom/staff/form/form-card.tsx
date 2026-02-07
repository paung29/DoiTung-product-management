"use client";

function FormCard({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="bg-secondary border-primary-button flex w-full items-center rounded-xl border px-10 py-8">
        <div className="w-full">{children}</div>
      </div>
    </>
  );
}

export default FormCard;
