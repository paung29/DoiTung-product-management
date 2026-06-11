"use client"

import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import FormsInput from "../../common/forms/form-input";
import CustomButton from "../../common/custom-button";
import { X, Check } from "lucide-react";
import type { HarvestGradingRecord, HarvestGradingRecordInput, HarvestGradingRecordResponse } from "@/lib/types/model/type";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import { createHarvestGrading } from "@/lib/server-actions/create-harvest-grading-client";
import { useState } from "react";
import { getErrorMessage } from "@/lib/types/model/function";
import ApiErrorUI from "../../common/error-handle";

interface HarvestGradingRecordingFormProps {
  data : HarvestGradingRecordResponse,
  zoneNo : number,
  record?: HarvestGradingRecord | null;
  onBack?: () => void;
}

const gradeEntrySchema = z.object({
  grade: z.string(),
  podsCount: z
    .any()
    .transform((val) =>
      typeof val === "string" ? parseInt(val, 10) : Number(val),
    )
    .refine((val): val is number => !isNaN(val), "Must be a valid number")
    .refine(
      (val): val is number => Number.isInteger(val),
      "Must be a whole number",
    )
    .refine((val): val is number => val >= 0, "Must be ≥ 0"),
  weight: z
    .any()
    .transform((val) =>
      typeof val === "string" ? parseFloat(val) : Number(val),
    )
    .refine((val): val is number => !isNaN(val), "Must be a valid number")
    .refine((val): val is number => val >= 0, "Must be ≥ 0"),
});

const harvestSchema = z.object({
  gradeA_plus: gradeEntrySchema,
  gradeA: gradeEntrySchema,
  gradeB: gradeEntrySchema,
  gradeC: gradeEntrySchema,
  gradeD_plus: gradeEntrySchema,
  rejected: gradeEntrySchema,
});

type HarvestGradingRecordingFormData = z.infer<typeof harvestSchema>;

export default function HarvestGradingRecordingForm({
  data,
  zoneNo,
  record,
  onBack = () => {},
}: HarvestGradingRecordingFormProps) {

  const params = useParams();
  const year = params.year
  const zoneId = zoneNo

  console.log("Fetch Data : ", data)

  const router = useRouter();

  const [error, setError] = useState<String | null>()

  const form = useForm<HarvestGradingRecordingFormData>({
    resolver: zodResolver(harvestSchema),
    defaultValues: {
      gradeA_plus: { grade: "A_PLUS", podsCount: data.gradeAPlusCount, weight: data.gradeAPlusWeight },
      gradeA: { grade: "A", podsCount: data.gradeACount, weight: data.gradeAWeight  },
      gradeB: { grade: "B", podsCount: data.gradeBCount, weight: data.gradeBWeight  },
      gradeC: { grade: "C", podsCount: data.gradeCCount, weight: data.gradeCWeight },
      gradeD_plus: { grade: "D_PLUS", podsCount: data.gradeDPlusCount, weight: data.gradeDPlusWeight },
      rejected: { grade: "REJECTED", podsCount: data.undersizedCount, weight: data.undersizedWeight },
    },
  });

  const onSubmit = async (data: HarvestGradingRecordingFormData) => {

    const reformData : HarvestGradingRecordInput = {
      poleId: Number(record?.poleNumber),
      gradeAPlusCount: data.gradeA_plus.podsCount,
      gradeAPlusWeight: data.gradeA_plus.weight,
      gradeACount: data.gradeA.podsCount,
      gradeAWeight: data.gradeA.weight,
      gradeBCount: data.gradeB.podsCount,
      gradeBWeight: data.gradeB.weight,
      gradeCCount: data.gradeC.podsCount,
      gradeCWeight: data.gradeC.weight,
      gradeDPlusCount: data.gradeD_plus.podsCount,
      gradeDPlusWeight: data.gradeD_plus.weight,
      undersizedCount: data.rejected.podsCount,
      undersizedWeight: data.rejected.weight,
    }
    console.log("Form Data:", data);
    console.log("Form Data:", reformData);

    try{
      const result = await createHarvestGrading(reformData)
        console.log(result);
  
        if (result.success === false) {
          setError(result.message);
          return;
        }
        router.replace(`/staff/${year}/harvest-grading?zoneNo=${zoneNo}`)
      }catch(error) {
        console.error("submit error:", error);
        setError(getErrorMessage(error));
    }
    
  };

  const handleCancel = () => {
    form.reset();
  };

  const grades = [
    {
      key: "gradeA_plus" as const,
      label: "A+ (18+)",
      podsPath: "gradeA_plus.podsCount" as const,
      weightPath: "gradeA_plus.weight" as const,
    },
    {
      key: "gradeA" as const,
      label: "A (15-18)",
      podsPath: "gradeA.podsCount" as const,
      weightPath: "gradeA.weight" as const,
    },
    {
      key: "gradeB" as const,
      label: "B (12-15)",
      podsPath: "gradeB.podsCount" as const,
      weightPath: "gradeB.weight" as const,
    },
    {
      key: "gradeC" as const,
      label: "C (10-12)",
      podsPath: "gradeC.podsCount" as const,
      weightPath: "gradeC.weight" as const,
    },
    {
      key: "gradeD_plus" as const,
      label: "D+ (<10)",
      podsPath: "gradeD_plus.podsCount" as const,
      weightPath: "gradeD_plus.weight" as const,
    },
    {
      key: "rejected" as const,
      label: "Rejected/Undersized (<10)",
      podsPath: "rejected.podsCount" as const,
      weightPath: "rejected.weight" as const,
    },
  ];

  return (
    <div className="mx-auto max-w-5xl space-y-4">
      {/* Location and Pole Number Display Box */}
      <div className="space-y-4 rounded-lg border-2 border-[#8a6752] bg-[#FAF3E0] p-4 sm:p-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-[#8a6752] sm:text-base">
              <span className="h-2 w-2 rounded-full bg-[#8a6752]" />
              Location
            </label>
            <div className="rounded bg-gray-300 p-3 text-sm text-gray-600 sm:p-4 sm:text-base">
              {record?.location || "N/A"}
            </div>
          </div>

          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-[#8a6752] sm:text-base">
              Pole Number <span className="text-red-600">*</span>
            </label>
            <div className="rounded bg-gray-300 p-3 text-sm text-gray-600 sm:p-4 sm:text-base">
              {record?.poleNumber || "N/A"}
            </div>
          </div>
        </div>
      </div>
      {/* Grade Entry Form Box */}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 rounded-lg rounded-b-2xl border-2 border-[#8a6752] bg-[#FAF3E0] sm:p-8"
        >
          <ApiErrorUI message={error ? error.toString() : null}/>
          {/* Grade Enry Section */}
          <div className="space-y-4">
            <h3 className="flex items-center gap-2 text-base font-semibold text-[#8a6752] sm:text-lg">
              <span className="h-2 w-2 rounded-full bg-[#8a6752]" />
              Grade Entry
            </h3>

            <div className="space-y-6">
              {grades.map((gradeItem) => (
                <div
                  key={gradeItem.key}
                  className="space-y-3 rounded-lg p-4 sm:p-5"
                >
                  {/* Grade */}
                  <p className="text-sm font-semibold text-[#8a6752] sm:text-base">
                    {gradeItem.label}
                  </p>

                  {/* Input  Grid */}
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-xs font-medium text-[#8a6752] sm:text-sm">
                        Number of Pods
                      </label>
                      <FormsInput
                        control={form.control}
                        path={gradeItem.podsPath}
                        placeholder="0"
                        type="number"
                        className="w-full bg-white"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-xs font-medium text-[#8a6752] sm:text-sm">
                        Weight (g)
                      </label>
                      <FormsInput
                        control={form.control}
                        path={gradeItem.weightPath}
                        placeholder="0.0"
                        type="number"
                        className="w-full bg-white"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3 border-t border-[#8a6752] pt-6 sm:flex-col sm:justify-center">
            <CustomButton
              label="Cancel"
              icon={X}
              onClick={handleCancel}
              className="w-full bg-red-600 px-6 py-2 text-white hover:bg-red-700 sm:w-auto sm:px-8"
            />
            <CustomButton
              type="submit"
              label="Submit"
              icon={Check}
              className="w-full bg-green-600 px-6 py-2 text-white hover:bg-green-700 sm:w-auto sm:px-8"
            />
          </div>
        </form>
      </Form>
    </div>
  );
}
