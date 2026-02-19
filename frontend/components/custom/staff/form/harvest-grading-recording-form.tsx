import React from "react";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import FormsInput from "../../common/forms/form-input";
import CustomButton from "../../common/custom-button";
import { X, Check } from "lucide-react";
import type { HarvestGradingRecord } from "../harvest-grading-recording-card";

interface GradeEntry {
  grade: string;
  minSize: string;
  maxSize: string;
  podsCount: string;
  weight: string;
}

interface HarvestGradingRecordingFormData {
  gradeA_plus: GradeEntry;
  gradeA: GradeEntry;
  gradeB: GradeEntry;
  gradeC: GradeEntry;
  gradeD_plus: GradeEntry;
}

interface HarvestGradingRecordingFormProps {
  record?: HarvestGradingRecord | null;
  onBack?: () => void;
}

export default function HarvestGradingRecordingForm({
  onBack = () => {},
}: HarvestGradingRecordingFormProps) {
  const form = useForm<HarvestGradingRecordingFormData>({
    defaultValues: {
      gradeA_plus: {
        grade: "A+ (18+)",
        minSize: "",
        maxSize: "",
        podsCount: "0",
        weight: "0.0",
      },
      gradeA: {
        grade: "A (15-18)",
        minSize: "",
        maxSize: "",
        podsCount: "0",
        weight: "0.0",
      },
      gradeB: {
        grade: "B (12-15)",
        minSize: "",
        maxSize: "",
        podsCount: "0",
        weight: "0.0",
      },
      gradeC: {
        grade: "C (10-12)",
        minSize: "",
        maxSize: "",
        podsCount: "0",
        weight: "0.0",
      },
      gradeD_plus: {
        grade: "D+ (<10)",
        minSize: "",
        maxSize: "",
        podsCount: "0",
        weight: "0.0",
      },
    },
  });

  const onSubmit = (data: HarvestGradingRecordingFormData) => {
    console.log("Form Data:", data);
  };

  const handleCancel = () => {
    form.reset();
    onBack();
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
  ];

  return (
    <div className="mx-auto max-w-5xl">
      {/* Form Container */}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 rounded-b-2xl border-2 border-[#8a6752] bg-[#faf3e0] p-4 sm:p-8"
        >
          {/* Grade Enry Section */}
          <div className="space-y-4">
            <h3 className="flex items-center gap-2 text-base font-semibold text-gray-800 sm:text-lg">
              <span className="h-2 w-2 rounded-full bg-[#8a6752]" />
              Grade Entry
            </h3>

            <div className="space-y-6">
              {grades.map((gradeItem) => (
                <div
                  key={gradeItem.key}
                  className="space-y-3 rounded-lg bg-white p-4 sm:p-5"
                >
                  {/* Grade */}
                  <p className="text-sm font-semibold text-gray-800 sm:text-base">
                    {gradeItem.label}
                  </p>

                  {/* Input  Grid */}
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-xs font-medium text-gray-700 sm:text-sm">
                        Number of Pods
                      </label>
                      <FormsInput
                        control={form.control}
                        path={gradeItem.podsPath}
                        placeholder="0"
                        type="number"
                        className="w-full"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-xs font-medium text-gray-700 sm:text-sm">
                        Weight (g)
                      </label>
                      <FormsInput
                        control={form.control}
                        path={gradeItem.weightPath}
                        placeholder="0.0"
                        type="number"
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3 border-t pt-6 sm:flex-row sm:justify-center">
            <CustomButton
              label="Cancel"
              icon={X}
              onClick={handleCancel}
              className="w-full bg-red-600 px-6 py-2 text-white hover:bg-red-700 sm:w-auto sm:px-8"
            />
            <CustomButton
              label="Submit"
              icon={Check}
              onClick={form.handleSubmit(onSubmit)}
              className="w-full bg-green-600 px-6 py-2 text-white hover:bg-green-700 sm:w-auto sm:px-8"
            />
          </div>
        </form>
      </Form>
    </div>
  );
}
