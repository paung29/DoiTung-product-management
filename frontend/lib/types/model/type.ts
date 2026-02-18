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
