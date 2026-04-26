"use client";

interface GradeSummaryCardProps {
  grade: string;
  percent: number;
  pods: number;
  weight: number;
}

function GradeCard({ grade, percent, pods, weight }: GradeSummaryCardProps) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-linear-to-br from-amber-50 to-white p-6 shadow-sm">
      {/* Top Row: Badge and Percentage */}
      <div className="mb-4 flex items-start justify-between">
        <div className="rounded-full bg-[#8a6752] px-4 py-1">
          <span className="text-sm font-semibold text-white">
            Grade {grade}
          </span>
        </div>
        <span className="text-sm font-semibold text-[#8a6752]">{percent}%</span>
      </div>

      {/* Middle: Number of Pods */}
      <p className="mb-3 text-sm text-gray-600">{pods.toLocaleString()} pods</p>

      {/* Bottom: Weight */}
      <p className="text-2xl font-bold text-[#8a6752]">
        {weight.toLocaleString()} kg
      </p>
    </div>
  );
}

export default function GradeSummary() {
  const gradeData: GradeSummaryCardProps[] = [
    { grade: "A+", percent: 18.5, pods: 2850, weight: 630 },
    { grade: "A", percent: 28, pods: 4320, weight: 1060 },
    { grade: "B", percent: 23.9, pods: 3680, weight: 900 },
    { grade: "C", percent: 13.9, pods: 2140, weight: 590 },
    { grade: "D+", percent: 10.2, pods: 1580, weight: 440 },
    { grade: "D", percent: 5.5, pods: 850, weight: 370 },
  ];

  return (
    <div className="space-y-6">
      {/* Title */}
      <h2 className="text-lg font-normal text-gray-900">Grade Summary</h2>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {gradeData.map((item) => (
          <GradeCard key={item.grade} {...item} />
        ))}
      </div>
    </div>
  );
}
