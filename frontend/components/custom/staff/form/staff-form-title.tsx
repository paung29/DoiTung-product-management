"use client";

function StaffFormTitle({
  isRequired,
  title,
}: {
  isRequired: boolean;
  title: string;
}) {
  return (
    <>
      <div className="flex flex-row items-center justify-start">
        <div className="bg-primary-button mr-4 size-4 rounded-full"></div>
        <p className="text-lg font-medium">{title} </p>
        {isRequired ? <span className="text-3xl text-red-700"> *</span> : null}
      </div>
    </>
  );
}

export default StaffFormTitle;
