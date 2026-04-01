
export default function StaffContent({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full sm:mx-auto sm:max-w-6xl lg:max-w-7xl px-2 sm:px-0">
      {children}
    </div>
  );
}