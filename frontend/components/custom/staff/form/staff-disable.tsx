function StaffDisable({
  title,
  placeholder,
  isRow,
}: {
  title: string;
  placeholder: string;
  isRow?: boolean;
}) {
  return (
    <div className={`flex w-full flex-col ${isRow && "md:flex-row"}`}>
      <p className="py-2">{title}</p>
      <div className="bg-staff-disable/35 w-full rounded-lg p-2">
        <p className="pl-2 font-light text-black">{placeholder}</p>
      </div>
    </div>
  );
}

export default StaffDisable;
