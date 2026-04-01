"use client";

import FormPageShell from "@/components/custom/staff/form/form-page-shell";
import { Plane } from "lucide-react";

export default function StaffLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const handleBackClick = () => {
    window.history.back();
  };

  return (
    // <div className="border rounded-md p-4 mt-10 ms-10 me-10" style={{ borderColor: "#6B4423" }}>
    //     <div className="border-b-2" style={{ borderColor: "#6B4423" }}>
    //         <div>
    //             <h1>Cluster Recording</h1>
    //             <h1>Record flower cluster data</h1>
    //         </div>

    //         <CustomButton label="Back" icon={ArrowLeft} onClick={handleBackClick} bgColor=""/>
    //     </div>

    //     <main>
    //         {children}
    //     </main>
    // </div>

    // eslint-disable-next-line react/no-children-prop
    <FormPageShell
      title={"Cluster Recording"}
      subtitle={"Record flower cluster data"}
      icon={Plane}
      backHref={""}
      // eslint-disable-next-line react/no-children-prop
      children={children}
    />
  );
}
