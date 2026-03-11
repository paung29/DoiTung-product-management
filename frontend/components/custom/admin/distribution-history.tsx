import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { DistributionHistorySearchForm } from "@/lib/types/model/type"
import { useForm } from "react-hook-form"
import CustomDatePicker from "../common/custom-date-picker"
import { Form } from "@/components/ui/form"
import { Option } from "@/lib/types/model/option"
import CustomSelect from "../common/forms/form-select"
import CustomButton from "../common/custom-button"


const categoryOptions: Option[] = [
        { id: "carry-over", value: "Carry Over" },
        { id: "incoming", value: "Incoming" },
        { id: "issued", value: "Issued" }
        
];

const gradeOptions: Option[] = [
        { id: "A+", value: "A+" },
        { id: "A", value: "A" },
        { id: "B", value: "B" },
        { id: "C", value: "C" },
        { id: "D+", value: "D+" },
        { id: "D", value: "D" }
];

const plantationYearOptions: Option[] = [
        { id: "2024", value: "2024" },
        { id: "2023", value: "2023" },
        { id: "2022", value: "2022" }
];

const plantationAreaOptions: Option[] = [
        { id: "PM", value: "PM Phamee" },
        { id: "RD", value: "RD Research" },
        { id: "SE", value: "SE Building 1" },
        
];

export default function DistributionHistory() {

    const form = useForm<DistributionHistorySearchForm>()

    const onClick = () => {
        console.log(form.getValues());
    }


    return(
        <Card className="p-6">
            <CardTitle className="mb-6 text-lg font-semibold">Filter Distribution History</CardTitle>

            <CardContent>
                <Form {...form}>
                    <form className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <CustomDatePicker 
                            control={form.control}
                            path="startDate"
                            
                            />

                            <CustomDatePicker 
                                control={form.control}
                                path="endDate"
                            />

                            <CustomSelect 
                                control={form.control}
                                path="category"
                                options={categoryOptions}
                                placeholder="Select Category"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <CustomSelect 
                            control={form.control}
                            path="grade"
                            options={gradeOptions}
                            placeholder="Select Grade"
                            />

                            <CustomSelect 
                                control={form.control}
                                path="productionYear"
                                options={plantationYearOptions}
                                placeholder="Select Production Year"
                            />

                            <CustomSelect 
                                control={form.control}
                                path="plantationArea"
                                options={plantationAreaOptions}
                                placeholder="Select Plantation Area"
                            />
                        </div>

                        <div className="gap-4">
                            <CustomButton 
                                label="Search"
                                onClick={form.handleSubmit(onClick)}
                                className="btn-primary"
                            />

                            <CustomButton 
                                label="Reset"
                                onClick={() => form.reset()}
                                className="bg-amber-200"
                            />
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}