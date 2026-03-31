"use client";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart3,
  TrendingUp,
  Zap,
  CheckCircle,
  LucideIcon,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

export function DashboardTabSelection() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentTab = searchParams.get("tab") || "overview";

  const handleChange = (value: string) => {
    router.push(`?tab=${value}`);
  };

  return (
    <Tabs
      value={currentTab}
      onValueChange={handleChange}
      className="w-full"
      defaultValue="overview"
    >
      <TabsList className="bg-secondary border-primary-button w-full border-2 py-6">
        <CustomTabsTrigger icon={BarChart3} title="Overview" value="overview" />
        <CustomTabsTrigger
          icon={TrendingUp}
          title="Production & Harvest"
          value="production"
        />
        <CustomTabsTrigger
          icon={Zap}
          title="Yield & Efficiency"
          value="yield"
        />
        <CustomTabsTrigger
          icon={CheckCircle}
          title="Quality & Processing"
          value="quality"
        />
      </TabsList>
    </Tabs>
  );
}

function CustomTabsTrigger({
  icon: Icon,
  title,
  value,
}: {
  icon: LucideIcon;
  title: string;
  value: string;
}) {
  return (
    <TabsTrigger
      className="text-primary-button data-[state=active]:bg-primary-button data-[state=active]:text-secondary hover:text-primary-button py-5 text-base font-semibold hover:text-lg"
      value={value}
    >
      <Icon className="size-5" />
      {title}
    </TabsTrigger>
  );
}
