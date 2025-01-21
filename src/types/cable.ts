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

export interface Cable extends CableOverview {
  cable_description: string;
  created_by: string;
  drawing: File;
  bom: File;
  from_to_table: File;
  drawing_modified: boolean;
  bom_modified: boolean;
  from_to_table_modified: boolean;
  quote_table: Quote[];
  quote_expiration: Date | string;
  notes: string;
}

interface Quote {
  quantity: number;
  parts_price: number;
  labor_price: number;
  unit_price: number;
  extended_price: number;
  lead_time: string;
}