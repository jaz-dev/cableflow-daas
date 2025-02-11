import { Dialog } from '@headlessui/react';
import { X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useCartStore } from '../../stores/cartStore';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CartModal = ({ isOpen, onClose }: CartModalProps) => {
  const [ subtotal, setSubtotal ] = useState(0);
  const { getAccessTokenSilently } = useAuth0();
  const { items, removeItem } = useCartStore();

  useEffect(() => {
    const subTotal = items.reduce((sum, item) => sum + item.price, 0);
    setSubtotal(subTotal);
  }, [items]);

  const handleRemoveItem = async (id: number) => {
    const token = await getAccessTokenSilently();
    await removeItem(token, id);
  };

  const handleCheckout = async () => {
    try {
      const token = await getAccessTokenSilently();
      const returnUrl = window.location.href;
      const response = await fetch(`${import.meta.env.VITE_CABLEFLOW_API_URL}/api/stripe/create-checkout-session`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          return_url: returnUrl,
        })
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const { session_url }= await response.json();
      window.location.href = session_url;
    } catch (error) {
      console.error('Error creating checkout session:', error);
    }
  };
  
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-2xl bg-white rounded-xl shadow-xl">
          <div className="flex items-center justify-between p-6 border-b">
            <Dialog.Title className="text-xl font-semibold text-gray-900">
              Shopping Cart ({items.length})
            </Dialog.Title>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="max-h-[60vh] overflow-y-auto p-6">
            {items.length === 0 ? (
              <p className="text-center text-gray-500 py-8">
                Your cart is empty
              </p>
            ) : (
              <div className="space-y-6">
                {items.map((item) => (
                  <div key={item.id} className="relative bg-gray-50 rounded-lg p-4">
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className="absolute top-2 right-2 p-1 text-gray-400 hover:text-red-600 transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                    <div className="pr-8">
                      <div className="text-sm text-gray-500 mb-1">
                        {item.cable_extended_id}
                      </div>
                      <div className="font-medium text-gray-900">
                        {item.cable_name}
                      </div>
                      <div className="text-sm text-gray-500 mt-1">
                        {item.cable_description}
                      </div>
                      <div className="flex justify-between items-center mt-3">
                        <div className="text-sm text-gray-600">
                          Quantity: {item.quantity}
                        </div>
                        <div className="font-medium text-gray-900">
                          ${(item.price).toFixed(2)}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="border-t p-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="space-y-4">
                <div className="flex justify-between text-gray-900">
                  <span className="font-medium">Subtotal</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax and Shipping</span>
                  <span className="text-sm">Calculated at Checkout</span>
                </div>
                <div className="pt-4 border-t">
                  <div className="flex justify-between font-medium text-gray-900">
                    <span>Order Total</span>
                    <span>${subtotal.toFixed(2)} + Tax and Shipping</span>
                  </div>
                </div>
              </div>
            </div>
            <button
              onClick={handleCheckout}
              disabled={items.length === 0}
              className="w-full mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continue to Payment
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};