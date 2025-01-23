export enum CableStatus {
  Started = 'Started',
  QuoteRequested = 'Quote Requested',
  QuoteReady = 'Quote Ready',
  NeedsReview = 'Needs Review',
  QuoteExpired = 'Quote Expired',
}

export interface CableOverview {
  id: number;
  cable_id: string;
  cable_name: string;
  status: CableStatus;
  created_at: string;
}

export interface Cable extends CableOverview {
  cable_description?: string;
  quantities: number[];
  delivery_date?: string;
  additional_information?: string;
  drawing?: File;
  bom?: File;
  from_to_table?: File;
  drawing_modified?: boolean;
  bom_modified?: boolean;
  from_to_table_modified?: boolean;
  quote_table?: Quote[];
  quote_expiration?: Date | string;
  notes?: string;
}

interface Quote {
  quantity: number;
  parts_price: number;
  labor_price: number;
  unit_price: number;
  extended_price: number;
  lead_time: string;
}

export const sampleCable: Cable = {
  id: 1,
  cable_id: 'CBL-1001',
  cable_name: 'Power Cable Assembly',
  quantities: [21,3,901],
  delivery_date: '1/24/2025',
  additional_information: 'He heard the loud impact before he ever saw the result. It had been so loud that it had actually made \
  him jump back in his seat. As soon as he recovered from the surprise, he saw the crack in the windshield. It seemed to be \
  an analogy of the current condition of his life.',
  status: CableStatus.QuoteReady,
  created_at: new Date().toISOString(),
  cable_description: 'He heard the loud impact before he ever saw the result. It had been so loud that it had actually made \
  him jump back in his seat. As soon as he recovered from the surprise, he saw the crack in the windshield. It seemed to be \
  an analogy of the current condition of his life.',
  created_by: 'engineer@example.com',
  drawing: new File([''], 'drawing.pdf', { type: 'application/pdf' }),
  bom: new File([''], 'bom.xlsx', { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }),
  from_to_table: new File([''], 'from_to.xlsx', { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }),
  drawing_modified: false,
  bom_modified: true,
  from_to_table_modified: false,
  quote_table: [
    {
      quantity: 100,
      parts_price: 500,
      labor_price: 200,
      unit_price: 7,
      extended_price: 700,
      lead_time: '4 weeks'
    },
    {
      quantity: 500,
      parts_price: 2000,
      labor_price: 800,
      unit_price: 5.6,
      extended_price: 2800,
      lead_time: '6 weeks'
    },
    {
      quantity: 500,
      parts_price: 2000,
      labor_price: 800,
      unit_price: 5.6,
      extended_price: 2800,
      lead_time: '6 weeks'
    },
    {
      quantity: 500,
      parts_price: 2000,
      labor_price: 800,
      unit_price: 5.6,
      extended_price: 2800,
      lead_time: '6 weeks'
    },
    {
      quantity: 500,
      parts_price: 2000,
      labor_price: 800,
      unit_price: 5.6,
      extended_price: 2800,
      lead_time: '6 weeks'
    },
    {
      quantity: 500,
      parts_price: 2000,
      labor_price: 800,
      unit_price: 5.6,
      extended_price: 2800,
      lead_time: '6 weeks'
    },
    {
      quantity: 500,
      parts_price: 2000,
      labor_price: 800,
      unit_price: 5.6,
      extended_price: 2800,
      lead_time: '6 weeks'
    },
  ],
  quote_expiration: new Date().toISOString(),
  notes: 'Email us at support@cableflow.com for any questions about the quote.'
};