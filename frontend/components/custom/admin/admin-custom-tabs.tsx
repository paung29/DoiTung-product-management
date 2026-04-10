import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AdminCustomTabs({
  tabs,
  value,
  onValueChange,
  defaultValue,
  children,
}: {
  tabs: { id: string; value: string }[];
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
      className="w-full space-y-6"
    >
      <TabsList
        className="
          grid w-full grid-cols-4
          h-[70px]
          items-stretch
          border-2 border-[#8B5A2B]
          bg-[#F6F0E1]
          p-0
        "
      >
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.id}
            value={tab.id}
            className="
              flex h-full w-full
              items-center justify-center
              self-stretch
              rounded-none
              border-0
              px-4
              py-0
              m-0
              text-[18px]
              font-extrabold
              text-[#8B5A2B]
              shadow-none
              transition-all duration-200

              data-[state=active]:bg-[#8B5A2B]
              data-[state=active]:text-white
              data-[state=active]:shadow-none
            "
          >
            {tab.value}
          </TabsTrigger>
        ))}
      </TabsList>

      {children}
    </Tabs>
  );
}