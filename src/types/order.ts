export interface Order {
  id: number;
  extended_id: string;
  created_at: string;
  total_price: number;
  lead_time: string;
  order_items: OrderItem[];
}

export interface OrderItem {
  id: number;
  cable_id: number;
  cable_extended_id: string;
  cable_name: string;
  cable_quantity: number;
}