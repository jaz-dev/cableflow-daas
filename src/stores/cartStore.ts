import { create } from 'zustand';
import { CartItem } from '../types/cart';
import { cartApi } from '../api/cartItems';

interface CartStore {
  items: CartItem[];
  isCartModalOpen: boolean;
  setIsCartModalOpen: (isOpen: boolean) => void;
  fetchItems: (token: string) => Promise<void>;
  addItem: (token: string, cableId: number, selectedQuoteIndex: number) => Promise<void>;
  removeItem: (token: string, id: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartStore>((set) => ({
  items: [],
  isCartModalOpen: false,
  setIsCartModalOpen: (isOpen: boolean) => set({ isCartModalOpen: isOpen }),
  fetchItems: async (token) => {
    const items = await cartApi.getCartItems(token);
    set({ items: items });
  },
  addItem: async (token: string, cableId: number, selectedQuoteIndex: number) => { 
    const newCartItem: CartItem  = await cartApi.addCartItem(token, cableId, selectedQuoteIndex);
    set((state) =>({
      items: [newCartItem, ...state.items]
    }))
  },
  removeItem: async (token: string, id: number) => {
    await cartApi.deleteCartItem(token, id);
    set((state) => ({
      items: state.items.filter(item => item.id !== id)
    }));
  },
  clearCart: () => set({ items: [] }),
}));