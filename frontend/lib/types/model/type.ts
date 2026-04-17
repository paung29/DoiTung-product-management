import z from "zod";

// Form Types for User Management
export type CreateUserFormData = {
  name: string;
  email: string;
  password: string;
  role: string;
  status: string;
  phone: string;
  department: string;
};

export const ConditionOptions = [
  { id: "GOOD", value: "Good" },
  { id: "INSECT", value: "Insect (Damaged Cluster)" },
  { id: "ROTTEN", value: "Rotten (Damaged Cluster)" },
];

export type ClusterSearchForm = {
  location: string;
  pole_id: string;
  cluster_id: string;
  progress_status: string;
};

export type ClusterRecordingFormType = {
  year: number,
  zoneNo: string
  poleNo: string;
  clusterNo: string;
  condition: string;
};

export type ClusterEditingView = {
  location: string;
  pole_id: string;
  cluster_id: string;
};

export type FlowerRecordingFormType = {
  location: string;
  pole_id: string;
  cluster_id: string;
  condition: string;
  total_flowers: string;
};

export type PollinationRecordingFormType = {
  location: string;
  pole_id: string;
  cluster_id: string;
  condition: string;
  total_flowers: string;
  number_of_pods: string;
  unsuccessful_pollination: string;
};

export type PodRecordingFormType = {
  location: string;
  pole_id: string;
  cluster_id: string;
  condition: string;
  lost_pods: string;
};

export type PreHarvestRecordingFormType = {
  location: string;
  pole_id: string;
  cluster_id: string;
  condition: string;
  number_of_pods_round_2: string;
  pods_removed: string;
  plants_with_pods_removed: string;
};

export type HarvestAndGradingSearchForm = {
  location: string;
  pole_id: string;
};

export type GradeEntry = {
  grade: string;
  minSize: string;
  maxSize: string;
  podsCount: string;
  weight: string;
};

export type HarvestGradingRecordingFormData = {
  gradeA_plus: GradeEntry;
  gradeA: GradeEntry;
  gradeB: GradeEntry;
  gradeC: GradeEntry;
  gradeD_plus: GradeEntry;
};

export type ActiveYearFrom = {
  year: string;
};

export type InventoryCategory = "carry-over" | "incoming" | "issued";

export type InventoryForm = {
  date: string;
  category: InventoryCategory;
  grade: string;
  plantationYear: string;
  plantationArea: string;
  numberOfPods: string;
  pricePerGram?: string;
  amount: string;
  Remarks: string;
};

export type DistributionHistorySearchForm = {
  startDate: string;
  endDate: string;
  category: InventoryCategory;
  grade: string;
  productionYear: string;
  plantationArea: string;
};

export type CreateOrEditZoneFormType = {
  zone_name: string;
  total_plants: string;
};

export type FormsEditType = {
  form_id: number;
  form_name: string;
  active_status: string;
};

// Record Models
export type HarvestGradingRecord = {
  id: string;
  no: number;
  location: string;
  poleNumber: string;
  recordedDate: string;
  editedDate: string;
  status: "complete" | "incomplete" | "pending";
};

// Chart Types
export interface ChartDataPoint {
  year: string;
  totalPods?: number;
  abnormalPods?: number;
  goodFlowers?: number;
  deadFlowers?: number;
  damagedClusters?: number;
  rottenClusters?: number;
  totalFlowerCluster?: number;
  rottenFlowerCluster?: number;
  damagedFlowerCluster?: number;
  remainingFlowerCluster?: number;
  totalFlowers?: number;
  damageFlowers?: number;
  goodPods?: number;
  unsuccessfulPollination?: number;
  defectivePods?: number;
  totalPollinated?: number;
  harvestedPods?: number;
  gradeD?: number;
  gradeD_plus?: number;
  gradeA?: number;
  gradeA_plus?: number;
  gradeB?: number;
  gradeBPlus?: number;
  gradeC?: number;
  nonproductivePoles?: number;
  productivePoles?: number;
  freshYield?: number;
  driedYield?: number;
  targetYield?: number;
  estimatedYield?: number;
  actualYield?: number;
  efficiency?: number;
  estimatedWeightPerPod?: number;
  actualWeightPerPod?: number;
  driedPodAfterProcessing?: number;
  freshPodBeforeProcessing?: number;
}

export interface TooltipPayloadItem {
  name: string;
  value: number;
  color: string;
  payload?: ChartDataPoint;
}

export interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayloadItem[];
}

export const WareHouseSearchSchema = z.object({
  name: z.string().optional()
});

export type WareHouseSearch = z.infer<typeof WareHouseSearchSchema>


export const WareHouseFormSchema = z.object({
  name: z.string().min(1, "Warehouse name is required"),
  active: z.enum(["true", "false"])
});

export type WareHouseForm = z.infer<typeof WareHouseFormSchema>

export type YearApiResponse = {
    years: string[];
}

export type Zone = {
    zoneId: string;
    zoneName: string;
};

export type ZoneApiResponse = {
  zones :  Zone[] | null;
}

export type CreateYearFormType = {
  year: number;
};
