import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LucideIcon } from "lucide-react";

type customTabs = {
  id: string;
  value: string;
  icon?: LucideIcon;
};

export default function AdminCustomTabs({
  tabs,
  value,
  onValueChange,
  defaultValue,
  children,
}: {
  tabs: customTabs[];
  value?: string;
  onValueChange?: (value: string) => void;
  defaultValue?: string;
  children?: React.ReactNode;
}) {
  return (
    <Tabs
      value={value}
      onValueChange={onValueChange}
      defaultValue={defaultValue ?? tabs[0]?.id}
      className="w-full"
    >
      <TabsList className="flex! w-full! rounded-[28px]! border-2! border-[#8B5E34]! bg-[#FFF8E9]! p-2! shadow-[0_8px_24px_rgba(139,94,52,0.08)]!">
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.id}
            value={tab.id}
            className="min-w-0 flex-1 rounded-4xl px-4 py-4 text-base font-semibold text-[#8B5E34] transition-all duration-200 hover:bg-white/70 hover:text-[#8B5E34] data-[state=active]:bg-[#8B5E34]! data-[state=active]:text-white! data-[state=active]:shadow-sm"
          >
            {tab.icon && <tab.icon className="size-5.25" />}
            {tab.value}
          </TabsTrigger>
        ))}
      </TabsList>

      {children}
    </Tabs>
  );
}
