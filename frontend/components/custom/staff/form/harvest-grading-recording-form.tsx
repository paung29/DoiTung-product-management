"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import FormsInput from "../../common/forms/form-input";
import CustomButton from "../../common/custom-button";
import { X, Check } from "lucide-react";
import type {
  HarvestGradingRecord,
  HarvestGradingRecordInput,
  HarvestGradingRecordResponse,
} from "@/lib/types/model/type";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import { createHarvestGrading } from "@/lib/server-actions/create-harvest-grading-client";
import { getErrorMessage } from "@/lib/types/model/function";
import ApiErrorUI from "../../common/error-handle";

interface HarvestGradingRecordingFormProps {
  data: HarvestGradingRecordResponse;
  zoneNo: number;
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
  rotten: gradeEntrySchema,
});

type HarvestGradingRecordingFormData = z.infer<typeof harvestSchema>;

const getFormValues = (
  data: HarvestGradingRecordResponse,
): HarvestGradingRecordingFormData => ({
  gradeA_plus: {
    grade: "A_PLUS",
    podsCount: data.gradeAPlusCount,
    weight: data.gradeAPlusWeight,
  },
  gradeA: {
    grade: "A",
    podsCount: data.gradeACount,
    weight: data.gradeAWeight,
  },
  gradeB: {
    grade: "B",
    podsCount: data.gradeBCount,
    weight: data.gradeBWeight,
  },
  gradeC: {
    grade: "C",
    podsCount: data.gradeCCount,
    weight: data.gradeCWeight,
  },
  gradeD_plus: {
    grade: "D_PLUS",
    podsCount: data.gradeDPlusCount,
    weight: data.gradeDPlusWeight,
  },
  rejected: {
    grade: "REJECTED",
    podsCount: data.undersizedCount,
    weight: data.undersizedWeight,
  },
  rotten: {
    grade: "ROTTEN",
    podsCount: data.rottenCount,
    weight: data.rottenWeight,
  },
});

export default function HarvestGradingRecordingForm({
  data,
  zoneNo,
  record,
  onBack = () => {},
}: HarvestGradingRecordingFormProps) {
  const params = useParams();
  const year = params.year;

  const router = useRouter();

  const [error, setError] = useState<string | null>(null);

  const form = useForm<HarvestGradingRecordingFormData>({
    resolver: zodResolver(harvestSchema),
    defaultValues: getFormValues(data),
  });

  useEffect(() => {
    form.reset(getFormValues(data));
  }, [data, form]);

  const onSubmit = async (
    formData: HarvestGradingRecordingFormData,
  ) => {
    setError(null);

    const reformData: HarvestGradingRecordInput = {
      poleId: Number(record?.poleid),

      gradeAPlusCount: formData.gradeA_plus.podsCount,
      gradeAPlusWeight: formData.gradeA_plus.weight,

      gradeACount: formData.gradeA.podsCount,
      gradeAWeight: formData.gradeA.weight,

      gradeBCount: formData.gradeB.podsCount,
      gradeBWeight: formData.gradeB.weight,

      gradeCCount: formData.gradeC.podsCount,
      gradeCWeight: formData.gradeC.weight,

      gradeDPlusCount: formData.gradeD_plus.podsCount,
      gradeDPlusWeight: formData.gradeD_plus.weight,

      undersizedCount: formData.rejected.podsCount,
      undersizedWeight: formData.rejected.weight,

      rottenCount: formData.rotten.podsCount,
      rottenWeight: formData.rotten.weight,
    };

    try {
      const result = await createHarvestGrading(reformData);

    if (result.status !== 201) {
      setError(result.message);
      return;
    }

      router.replace(
        `/staff/${year}/harvest-grading?zoneNo=${zoneNo}`,
      );
    } catch (error) {
      console.error("Submit error:", error);
      setError(getErrorMessage(error));
    }
  };

  const handleCancel = () => {
    form.reset(getFormValues(data));
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
    {
      key: "rotten" as const,
      label: "Rotten",
      podsPath: "rotten.podsCount" as const,
      weightPath: "rotten.weight" as const,
    },
  ];

  return (
    <div className="mx-auto max-w-5xl space-y-4">
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

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 rounded-lg rounded-b-2xl border-2 border-[#8a6752] bg-[#FAF3E0] sm:p-8"
        >
          <ApiErrorUI message={error} />

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
                  <p className="text-sm font-semibold text-[#8a6752] sm:text-base">
                    {gradeItem.label}
                  </p>

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

          <div className="flex flex-col gap-3 border-t border-[#8a6752] pt-6 sm:justify-center">
            <CustomButton
              type="button"
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