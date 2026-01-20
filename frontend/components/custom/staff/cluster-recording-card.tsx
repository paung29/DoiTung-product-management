"use client";

import { Card } from "@/components/ui/card";
import CustomButton from "../common/custom-button";
import { Edit } from "lucide-react";
import ProgressLight from "../common/progress-light";

export default function ClusterRecordingCard() {
    return(
        <Card className="card-vanilla mx-auto max-w-6xl sm:max-w-2xl md:max-w-4xl p-2 sm:p-4 mt-4">
            <div className="overflow-x-auto">
                <table className="w-full table-fixed text-sm">
                    <thead >
                        <tr>
                            <th className="text-left">No.</th>
                            <th className="text-left">Location</th>
                            <th className="text-left">Pole Number</th>
                            <th className="text-left">Cluster ID</th>
                            <th ><CustomButton label="Edit" icon={Edit} onClick={() => {}} /></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-b">
                            <td className="text-left">1</td>
                            <td>Phamee Zone 1, Phase 1</td>
                            <td>P-00001</td>
                            <td>C-00001</td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>

                <div className="flex justify-between mt-2 p-2">
                    <h1>Recorded:20/1/2026</h1>

                    <div className="flex gap-2">
                        <h1>Progress </h1>
                        <ProgressLight total={4} current={3} />
                    </div>
                </div>
            </div>
                   
        </Card>
    )
}

