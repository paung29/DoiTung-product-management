"use client";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, FileText, LucideIcon, MapPin } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

export function TabSelection() {
  const router = useRouter();
  const param = useParams();

  const year = param.year as string;
  const currentTab = param.type as string;

  const handleChange = (value: string) => {
    router.push(`/admin/zone-form-management/${year}/${value}`);
  };
  return (
    <Tabs
      value={currentTab}
      onValueChange={handleChange}
      className="w-full"
      defaultValue="year"
    >
      <TabsList className="bg-secondary border-primary w-full border-2 py-6">
        <CustomTabsTrigger
          icon={Calendar}
          title="Year Management"
          value="year"
        />
        <CustomTabsTrigger icon={MapPin} title="Zone Management" value="zone" />
        <CustomTabsTrigger
          icon={FileText}
          title="Form Management"
          value="form"
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
      className="text-primary data-[state=active]:bg-primary data-[state=active]:text-secondary hover:text-primary py-5 text-base font-semibold hover:text-lg"
      value={value}
    >
      <Icon className="size-[21px]" />
      {title}
    </TabsTrigger>
  );
}
