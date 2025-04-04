import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useAuth0 } from '@auth0/auth0-react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { Order, OrderItem } from '../types/order';
import { Cable } from '../types/cable';
import { CableDetailsModal } from '../components/modals/CableDetailsModal';
import { ordersApi } from '../api/orders';
import { cablesApi } from '../api/cables';

interface ExpandedOrders {
  [key: number]: number;
}

export const Orders = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [orders, setOrders] = useState<Order[]>([]);
  const [expandedOrders, setExpandedOrders] = useState<ExpandedOrders>({});
  const [selectedCable, setSelectedCable] = useState<Cable | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();
  
  useEffect(() => {
    const success = searchParams.get('success');
    
    if (success === 'true') {
      toast.success('Order Placed Successfully');
      setSearchParams({});
    } else if (success === 'false') {
      toast.error('Order Placement Failed');
      setSearchParams({});
    }
  }, [searchParams, setSearchParams]);

  useEffect(() => {
    if (isAuthenticated) {
      const fetchOrders = async () => {
        try {
          const token = await getAccessTokenSilently();
          const fetchedOrders = await ordersApi.getOrders(token);
          setOrders(fetchedOrders);
          
          // Initialize expanded state for each order
          const initialExpanded: ExpandedOrders = {};
          fetchedOrders.forEach(order => {
            initialExpanded[order.id] = 3; // Show first 3 items
          });
          setExpandedOrders(initialExpanded);
          
          setIsLoading(false);
        } catch (error) {
          console.error('Error fetching orders:', error);
          toast.error('Failed to load orders');
          setIsLoading(false);
        }
      };

      fetchOrders();
    }
  }, [getAccessTokenSilently, isAuthenticated]);

  const handleViewMore = (orderId: number, totalItems: number) => {
    setExpandedOrders(prev => ({
      ...prev,
      [orderId]: Math.min(prev[orderId] + 3, totalItems)
    }));
  };

  const handleViewLess = (orderId: number) => {
    setExpandedOrders(prev => ({
      ...prev,
      [orderId]: 3
    }));
  };

  const handleCableClick = async (cableId: string) => {
    try {
      const token = await getAccessTokenSilently();
      const cable = await cablesApi.fetch(parseInt(cableId), token);
      setSelectedCable(cable);
    } catch (error) {
      console.error('Error fetching cable details:', error);
      toast.error('Failed to load cable details');
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Order History</h1>

      <div className="space-y-6">
        {orders.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <p className="text-gray-500">No orders found</p>
          </div>
        ) : (
          orders.map((order) => (
            <div key={order.id} className="bg-white rounded-lg shadow-sm">
              {/* Order Header */}
              <div className="bg-gray-100 px-6 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <div>
                    <div className="text-xs font-medium uppercase text-gray-600">ORDER PLACED</div>
                    <div className="text-sm text-gray-900">
                      {new Date(order.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </div>
                  </div>
                  <div className="relative">
                    <div className="flex items-center gap-1 text-xs font-medium uppercase text-gray-600">
                      LEAD TIME
                      <div className="relative inline-flex items-center group">
                        <HelpCircle className="h-4 w-4 text-gray-400" />
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-150 absolute left-1/2 bottom-[calc(100%+0.5rem)] -translate-x-1/2 px-3 py-2 bg-gray-900 text-white text-xs rounded whitespace-nowrap pointer-events-none">
                          Lead time from the order placed date
                          <div className="absolute left-1/2 top-full -translate-x-1/2 -translate-y-[1px] border-4 border-transparent border-t-gray-900" />
                        </div>
                      </div>
                    </div>
                    <div className="text-sm text-gray-900">{order.lead_time} weeks</div>
                  </div>
                  <div>
                    <div className="text-xs font-medium uppercase text-gray-600">TOTAL</div>
                    <div className="text-sm text-gray-900">${order.total_price.toFixed(2)}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-600">ORDER # {order.extended_id}</div>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Cable ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Cable Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Quantity
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {order.order_items
                      .slice(0, expandedOrders[order.id])
                      .map((item: OrderItem) => (
                        <tr
                          key={item.id}
                          onClick={() => handleCableClick(item.cable_id)}
                          className="hover:bg-gray-50 cursor-pointer"
                        >
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {item.cable_extended_id}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {item.cable_name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {item.cable_quantity}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>

              {/* View More/Less Button */}
              <div className="p-4 border-t border-gray-200">
                {expandedOrders[order.id] === order.order_items.length && expandedOrders[order.id] > 3 ? (
                  <button
                    onClick={() => handleViewLess(order.id)}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    <ChevronUp className="h-4 w-4" />
                    View Less
                  </button>
                ) : order.order_items.length > expandedOrders[order.id] && (
                  <button
                    onClick={() => handleViewMore(order.id, order.order_items.length)}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    <ChevronDown className="h-4 w-4" />
                    View More
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {selectedCable && (
        <CableDetailsModal
          isOpen={!!selectedCable}
          onClose={() => setSelectedCable(null)}
          cable={selectedCable}
        />
      )}
    </div>
  );
};

export default Orders;