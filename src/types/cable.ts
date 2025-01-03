export interface CableOverview {
    id: number;
    cable_id: string;
    cable_name: string;
    status: 'Started' | 'Quote Requested' | 'Quote Ready';
    created_at: string;
  }