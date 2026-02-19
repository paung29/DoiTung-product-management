"use client";

export function StaffFormTitle({
  isRequired,
  title,
}: {
  isRequired: boolean;
  title: string;
}) {
  return (
    <>
      <div className="flex flex-row items-center justify-start">
        <div className="bg-primary-button mr-2 size-3 rounded-full"></div>
        <p className="text-sm font-medium md:text-lg">{title} </p>
        {isRequired ? <span className="text-3xl text-red-700"> *</span> : null}
      </div>
    </>
  );
}

export function SmallStaffFormTitle({
  isRequired,
  title,
}: {
  isRequired: boolean;
  title: string;
}) {
  return (
    <>
      <div className="flex flex-row items-center justify-start">
        <p className="text-sm font-medium md:text-lg">{title} </p>
        {isRequired ? <span className="text-3xl text-red-700"> *</span> : null}
      </div>
    </>
  );
}
