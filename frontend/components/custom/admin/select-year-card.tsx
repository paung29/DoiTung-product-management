"use client"

import { Card, CardTitle } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { ActiveYearFrom } from "@/lib/types/model/type";
import { Option } from "@/lib/types/model/option";
import { Form } from "@/components/ui/form";
import CustomSelect from "../common/forms/form-select";
import { useEffect } from "react";

const years: Option[] = [
        { id: "2026", value: "2026" },
        { id: "2027", value: "2027" },
        { id: "2028", value: "2028" },
        { id: "2029", value: "2029" }
];

export default function SelectYearCard(
    {logo, title, subtitle, year, onYearChange} : 
    {logo ?: React.ReactNode, title: string, subtitle ?: string, year : string, onYearChange : (year: string) => void}) {

    const form = useForm<ActiveYearFrom>({
        defaultValues: {
            year: "2026"
        }
    });

    useEffect(() => {
        form.reset({ year });
    }, [year, form]);

    return(
        <Card className="secondary m-4">
            <div className="flex justify-between">
                <div className="ms-5">

                    <CardTitle className="text-[#7b4d26]">{title}</CardTitle>
                    {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
                </div>
                

                <Form {...form}>
                    <div>
                        <CustomSelect 
                        control={form.control} 
                        path="year" 
                        options={years} 
                        placeholder="Active Year" 
                        className="p-2 me-5"
                        onValueChange={onYearChange}
                        />
                    </div>
                </Form>
            </div>
            
        </Card>
    )
}