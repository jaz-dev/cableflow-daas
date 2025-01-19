export enum CableStatus {
  Started = 'Started',
  QuoteRequested = 'Quote Requested',
  QuoteReady = 'Quote Ready',
  NeedsReview = 'Needs Review',
}

export interface CableOverview {
  id: number;
  cable_id: string;
  cable_name: string;
  status: CableStatus;
  created_at: string;
}