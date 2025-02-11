export interface Order {
  id: number;
  extended_id: string;
  created_at: string;
  total_price: number;
  order_items: OrderItem[];
}

export interface OrderItem {
  id: number;
  cable_id: string;
  cable_extended_id: string;
  cable_name: string;
  cable_quantity: number;
}