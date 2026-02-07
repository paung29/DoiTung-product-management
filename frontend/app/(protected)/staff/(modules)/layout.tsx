"use client"

import CustomButton from "@/components/custom/common/custom-button"
import { ArrowLeft } from "lucide-react"


export default function StaffLayout({
    children,
}: {
    children: React.ReactNode
}) {

    const handleBackClick = () => {
        window.history.back();
    };

    return (
        <div className="border rounded-md p-4 mt-10 ms-10 me-10" style={{ borderColor: "#6B4423" }}>
            <div className="border-b-2" style={{ borderColor: "#6B4423" }}>
                <div>
                    <h1>Cluster Recording</h1>
                    <h1>Record flower cluster data</h1>
                </div>

                <CustomButton label="Back" icon={ArrowLeft} onClick={handleBackClick} bgColor=""/>
            </div>
            
            
            <main>
                {children}
            </main>
        </div>
    )
}