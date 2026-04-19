import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Icon, LucideIcon } from "lucide-react";

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
      <TabsList className="bg-secondary border-primary w-full border-2 py-6">
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.id}
            value={tab.id}
            className="text-primary data-[state=active]:bg-primary data-[state=active]:text-secondary hover:text-primary py-5 text-base font-semibold hover:text-lg"
          >
            {tab.icon && <tab.icon className="size-[21px]" />}
            {tab.value}
          </TabsTrigger>
        ))}
      </TabsList>

      {children}
    </Tabs>
  );
}
