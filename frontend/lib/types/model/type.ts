export type ClusterSearchForm = {
  location: string;
  pole_id: string;
  cluster_id: string;
  progress_status: string;
};

export type ClusterRecordingFormType = {
  location: string;
  pole_id: string;
  cluster_id: string;
  condition: string;
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
}

export type ActiveYearFrom = {
  year: string;
}

export type InventoryCategory = "carry-over" | "incoming" | "issued";

export type InventoryForm = {
  date : string;
  category : InventoryCategory;
  grade : string
  plantationYear : string;
  plantationArea : string;
  numberOfPods : string;
  pricePerGram ?: string;
  amount : string;
  Remarks : string;
}

export type DistributionHistorySearchForm = {
  startDate: string;
  endDate: string;
  category: InventoryCategory
  grade: string;
  productionYear: string;
  plantationArea: string;
}