"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import FormsInput from "../../common/forms/form-input";
import CustomButton from "../../common/custom-button";
import { CircleCheck, CircleX } from "lucide-react";
import FormCard from "./form-card";
import { StaffFormTitle, SmallStaffFormTitle } from "./staff-form-title";
import StaffDisable from "./staff-disable";
import StaffSmallTitle from "./staff-small-title";
import type {
  HarvestGradingRecord,
  HarvestGradingRecordInput,
  HarvestGradingRecordResponse,
} from "@/lib/types/model/type";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter, useSearchParams } from "next/navigation";
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
  const searchParams = useSearchParams();
  const from = searchParams.get("from");

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
        from === "history"
          ? `/staff/${year}/history/harvest-grading`
          : `/staff/${year}/harvest-grading?zoneNo=${zoneNo}`,
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
    <Form {...form}>
      <form className="flex flex-col">
        <ApiErrorUI message={error} />

        <div className="pb-8">
          <FormCard>
            <StaffFormTitle isRequired={false} title={"Pole Information"} />
            <div className="flex flex-col justify-between gap-10 py-4 md:flex-row">
              <StaffDisable
                title={"Location"}
                placeholder={record?.location || "N/A"}
              />
              <StaffDisable
                title={"Pole Number"}
                placeholder={record?.poleNumber || "N/A"}
              />
            </div>
          </FormCard>
        </div>

        <div className="pb-8">
          <FormCard>
            <StaffFormTitle isRequired={true} title={"Grade Entry"} />

            <div className="space-y-6 py-4">
              {grades.map((gradeItem) => (
                <div key={gradeItem.key}>
                  <SmallStaffFormTitle
                    isRequired={false}
                    title={gradeItem.label}
                  />

                  <div className="flex flex-col py-2 md:flex-row md:gap-10">
                    <div className="w-full">
                      <StaffSmallTitle title="Number of Pods" />
                      <FormsInput
                        control={form.control}
                        path={gradeItem.podsPath}
                        placeholder="0"
                        type="number"
                        className="bg-staff-form-field rounded-lg"
                      />
                    </div>

                    <div className="w-full">
                      <StaffSmallTitle title="Weight (g)" />
                      <FormsInput
                        control={form.control}
                        path={gradeItem.weightPath}
                        placeholder="0.0"
                        type="number"
                        className="bg-staff-form-field rounded-lg"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </FormCard>
        </div>
      </form>

      <div className="flex flex-row items-center justify-around gap-4">
        <CustomButton
          label="Cancel"
          onClick={handleCancel}
          className="w-[180px] bg-red-600 hover:bg-red-700"
          icon={CircleX}
        />

        <CustomButton
          label="Submit"
          onClick={form.handleSubmit(onSubmit)}
          className="bg-staff-success w-[180px] hover:bg-green-800"
          icon={CircleCheck}
        />
      </div>
    </Form>
  );
}