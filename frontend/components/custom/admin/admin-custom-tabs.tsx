import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AdminCustomTabs(
       {tabs,
        value,
        onValueChange,
        defaultValue, 
        children } : 
    { tabs: { id: string; value: string }[]
      value ?: string
      onValueChange ?: (value: string) => void
      defaultValue?: string;
      children ?: React.ReactNode}) {


    return(
        <Tabs value={value} onValueChange={onValueChange} defaultValue={defaultValue ?? tabs[0]?.id}>
            <TabsList className="secondary w-full flex h-16 rounded-xl">
                {tabs.map((tab) => (
                    <TabsTrigger className="flex-1 h-full rounded-lg text-center transition-colors data-[state=active]:bg-[#6b4423] data-[state=active]:text-white" key={tab.id} value={tab.id}>
                        {tab.value}
                    </TabsTrigger>
                ))}
            </TabsList >
            {tabs.map((tab) => (
                <TabsContent key={tab.id} value={tab.id}>
                    {tab.value}
                </TabsContent>
            ))}
            {children}
        </Tabs>
    )
}