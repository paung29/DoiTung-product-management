import z, { number, string } from "zod";

export type ApiError = {
  errors : string | null,
  message : string,
  success : boolean
}

// Form Types for User Management
export type CreateUserFormData = {
  name: string;
  email: string;
  password: string;
  role: string;
  active_status: boolean;
  phone_no ?: string;
};

export type UpdateUserInfoFormData = {
  user_id : number,
  phone_no : string;
  name: string;
  role: string;
  active_status: boolean;
};

export type AccountItem = {
  user_id : number,
  email : string,
  name : string,
  role : string,
  phone_no : string,
  active_status : boolean
}

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


export const ClusterRecordingFormTypeSchema = z.object({
  year: z.number(),
  zoneNo: z.string({error : "Zone number is required"}).nonempty("Zone number is required"),
  poleNo: z.string().
          nonempty("Pole Number is required").
          transform((val) => Number(val)).
          refine((val) => !isNaN(val), "Must be a number").
          refine((val) => val > 0, "Must be 0 or positive"),
  clusterNo: z.string().
          nonempty("Cluster Number is required").
          transform((val) => Number(val)).
          refine((val) => !isNaN(val), "Must be a number").
          refine((val) => val > 0, "Must be 0 or positive"),
  condition: z.string().nonempty("Condition is required"),
})

export type ClusterRecordingFormInput = z.input<typeof ClusterRecordingFormTypeSchema>;
export type ClusterRecordingFormType = z.infer<typeof ClusterRecordingFormTypeSchema>;

export type ClusterEditingView = {
  location: string;
  pole_id: string;
  cluster_id: string;
};

export const ClusterEditSchema = z.object({
  clusterId: z.number(),
  condition: z.string().nonempty("Condition is required"),
})

export type ClusterEditType = z.input<typeof ClusterEditSchema>;

export type ClusterApiItem = {
  no: number;
  clusterId: number;
  location: string;
  poleNo: number;
  clusterNo: number;
  progressDone: number;
  recordedDate: string;
};

export type ClusterApiResponse = {
  clusters: ClusterApiItem[] | null;
};

export type GetClusterApiResponse = {
  clusterId : number,
  location : string,
  poleNo: number,
  clusterNo : number,
  condition : string,
  totalFlowers : number,
  flowerFormDone : boolean
}

export type ClusterHistoryApiItem = {
  no: number;
  clusterId: number;
  location: string;
  poleNo: number;
  clusterNo: number;
  progressDone: number;
  createdAt: string;
  updatedAt: string;
};

export type ClusterHistoryApiResponse = {
  clusterFormHistories: ClusterHistoryApiItem[] | null;
};


export const FlowerRecordingFormTypeSchema = z.object({
  clusterId: z.coerce.number(),
  condition: z.string().nonempty("Condition is required"),
  totalFlowers: z.string().
          nonempty("Total Flowers is required").
          transform((val) => Number(val)).
          refine((val) => !isNaN(val), "Must be a number").
          refine((val) => val >= 0, "Must be 0 or positive"),
})

export type FlowerRecordingFormInput = z.input<typeof FlowerRecordingFormTypeSchema>;
export type FlowerRecordingFormType = z.output<typeof FlowerRecordingFormTypeSchema>;

export type GetPollinationFormApiResponse = {
  clusterId : number,
  location : string,
  poleNo : number,
  clusterNo : number,
  totalFlowers : number,
  numberPods : number,
  unsuccessfulPollination : number,
  goodFlowers : number,
  badFlowers : number,
  condition : string,
  pollinationFormDone : boolean
}

export const PollinationRecordingFormSchema = z.object({
  clusterId: z.coerce.number(),
  numberPods: z.string({error : "Number of Pods is required"}).
          nonempty("Number of Pods is required").
          transform((val) => Number(val)).
          refine((val) => !isNaN(val), "Must be a number").
          refine((val) => val >= 0, "Must be 0 or positive"),
  unsuccessfulPollination : z.string({error : "Unsuccessful Pollination is required"}).
          nonempty("Unsuccessful Pollination is required").
          transform((val) => Number(val)).
          refine((val) => !isNaN(val), "Must be a number").
          refine((val) => val >= 0, "Must be 0 or positive"),
  condition: z.string().nonempty("Condition is required"),
})

export type PollinationRecordingFormInput = z.input<typeof PollinationRecordingFormSchema>;
export type PollinationRecordingFormType = z.output<typeof PollinationRecordingFormSchema>;

export type GetPodApiResponse = {
  clusterId: number;
  location: string;
  poleNo: number;
  clusterNo: number;
  numberPods: number;
  lostPods: number;
  remainingPods: number;
  condition: string;
  podFormDone: boolean;
}

export type PodCreateForm = {
  clusterId : number;
  lostPods : number;
  condition : string;
}

export const PodFormSchema = z.object({
  lostPods: z
    .string()
    .min(1, "Lost pods is required")
    .refine((value) => !isNaN(Number(value)), {
      message: "Lost pods must be a number",
    }),
  condition: z
    .string()
    .min(1, "Condition is required"),
});

export type PodFormValues = z.infer<typeof PodFormSchema>;

export type PodRecordingFormType = {
  location: string;
  pole_id: string;
  cluster_id: string;
  condition: string;
  lost_pods: string;
  redmaing_pods : string;
};

export const PreHarvestFormShcema = z.object({
  clusterId: z.number(),
  numberPodsSecondRound : z
    .string()
    .min(1, "Number of Pods (Round-2) is required")
    .refine((value) => !isNaN(Number(value)), {
      message: "Number of Pods (Round-2) must be a number",
    }),
  removedPods : z
  .string()
  .min(1, "Pods Removed is required")
  .refine((value) => !isNaN(Number(value)), {
    message: "Pods Removed must be a number",
  }),
  plantsRemoved : z
  .string()
  .min(1, "Plants With Pods Removed is required")
  .refine((value) => !isNaN(Number(value)), {
    message: "Plants With Pods Removed must be a number",
  }),
  condition: z
    .string()
    .min(1, "Condition is required"),
})

export type PreHarvestFormValue = z.infer<typeof PreHarvestFormShcema>

export type CreatePreHarvestForm = {
  clusterId : number,
  numberPodsSecondRound : number,
  removedPods : number,
  plantsRemoved : number,
  condition : string,
}

export type PreHarvestRecordingFormType = {
  location: string;
  pole_id: string;
  cluster_id: string;
  condition: string;
  number_of_pods_round_2: string;
  pods_removed: string;
  plants_with_pods_removed: string;
};

export type GetPreHarvestApiResponse = {
  clusterId: number;
  location: string;
  poleNo: number;
  clusterNo: number;
  remainingPods: number;
  numberPodsSecondRound : number;
  lostPodsBeforeHarvest : number;
  removedPods: number;
  plantsRemoved: number;
  condition: string;
  preHarvestFormDone: boolean;
}

export type HarvestAndGradingResponse = {
  poles: HarvestAndGradingItem[]
}

export type HarvestAndGradingItem = {
  poleId: number,
  zoneId: number,
  location: string,
  poleNo: number,
  harvestGradingFormDone: boolean,
  createdAt: string,
  updatedAt: string
}

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

export type HarvestGradingHistory = {
  poleId : number;
  location : string;
  poleNo : number;
  harvestGradingFormDone : boolean;
  createdAt : string;
  updatedAt : string;
}

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
  customer : string
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
  poleid: number;
  location: string;
  poleNumber: string;
  recordedDate: string;
  editedDate: string;
  status: "complete" | "incomplete" | "pending";
};

export type HarvestGradingRecordInput = {
  year: number;
  zoneNo: number;
  poleNo: number;
  gradeAPlusCount: number;
  gradeAPlusWeight: number;
  gradeACount: number;
  gradeAWeight: number;
  gradeBCount: number;
  gradeBWeight: number;
  gradeCCount: number;
  gradeCWeight: number;
  gradeDPlusCount: number;
  gradeDPlusWeight: number;
  undersizedCount: number;
  undersizedWeight: number;
}

export type HarvestGradingRecordResponse = {
  poleId: number;
  year: number;
  location: string;
  poleNo: number;
  gradeAPlusCount: number;
  gradeAPlusWeight: number;
  gradeACount: number;
  gradeAWeight: number;
  gradeBCount: number;
  gradeBWeight: number;
  gradeCCount: number;
  gradeCWeight: number;
  gradeDPlusCount: number;
  gradeDPlusWeight: number;
  undersizedCount: number;
  undersizedWeight: number;
  harvestGradingFormDone : boolean
}

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
  name: z.string().optional(),
});

export type WareHouseSearch = z.infer<typeof WareHouseSearchSchema>;

export const WareHouseFormSchema = z.object({
  warehouse_name: z.string().min(1, "Warehouse name is required"),
  active_status: z.enum(["true", "false"]),
});

export type WareHouseForm = z.infer<typeof WareHouseFormSchema>;

export type WareHouseFormCreate = {
  warehouse_name : string,
  active_status : boolean
}

export type YearApiResponse = {
  years: string[];
};

export type Zone = {
  zoneId: string;
  zoneName: string;
};

export type ZoneApiResponse = {
  zones: Zone[] | null;
};

export type CreateYearFormType = {
  year: number;
};

