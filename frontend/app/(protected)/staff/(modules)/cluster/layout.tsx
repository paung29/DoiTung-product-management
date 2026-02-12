
export default function StaffContent({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full sm:mx-auto sm:max-w-4xl">
      {children}
    </div>
  );
}