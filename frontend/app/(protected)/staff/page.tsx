"use client";

import StaffYearDialog from "@/components/custom/staff/year-select";
import { useState } from "react";

export default function StaffEntryPage() {
  const [open, setOpen] = useState(true);

  return (
    <div className="min-h-screen bg-[#f2f1ed]">
      <StaffYearDialog
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={() => setOpen(false)}
      />
    </div>
  );
}