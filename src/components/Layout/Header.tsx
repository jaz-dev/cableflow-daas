import { useAuth0 } from '@auth0/auth0-react';
import { ShoppingCart } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CableFlowLogo } from '../CableFlowLogo';
import { LoginButton } from '../auth/LoginButton';
import { ContactModal } from '../modals/ContactModal';
import { CartModal } from '../modals/CartModal';
import { useCartStore } from '../../stores/cartStore';
import clsx from 'clsx';
import { useUserStore } from '../../stores/userStore';

export const Header = () => {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const { user, fetchUser } = useUserStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const { items, fetchItems, isCartModalOpen, setIsCartModalOpen } = useCartStore();

  useEffect(() => {
    if (isAuthenticated) {
      const fetchData = async () => {
        try {
          const token = await getAccessTokenSilently();
          await fetchItems(token);
        } catch (err) {
          console.error("Error fetching cart items:", err);
        }
      };
      fetchData();
    }
  }, [isAuthenticated, fetchItems, getAccessTokenSilently]);

  useEffect(() => {
    if (isAuthenticated) {
      const fetchUserData = async () => {
        try {
          const token = await getAccessTokenSilently();
          await fetchUser(token);
        } catch (err) {
          console.error("Error fetching user:", err);
        }
      };
      fetchUserData();
    }
  }, [isAuthenticated, fetchUser, getAccessTokenSilently]);

  return (
    <header className="bg-white border-b border-gray-200 h-16 flex items-center px-4 justify-between">
      <CableFlowLogo className="h-8 w-auto" />
      
      <div className="flex items-center gap-8">
        <nav className="flex items-center gap-6">
          <button 
            onClick={() => navigate('/quote')}
            className={clsx(
              "font-medium transition-colors",
              location.pathname === '/quote'
                ? "text-blue-600"
                : "text-gray-600 hover:text-gray-900"
            )}
          >
            Request for Quote
          </button>
          <button 
            onClick={() => setIsContactModalOpen(true)}
            className="text-gray-600 hover:text-gray-900 font-medium"
          >
            Contact Us
          </button>
        </nav>

        <button 
          className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors"
          onClick={() => setIsCartModalOpen(true)}
          aria-label="Shopping Cart"
        >
          <ShoppingCart className="h-5 w-5" />
          {items.length > 0 && (
            <span className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center bg-red-500 text-white text-xs font-medium rounded-full">
              {items.length}
            </span>
          )}
        </button>

        {isAuthenticated ? (
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-medium">
              {user?.first_name?.[0]?.toUpperCase()}
            </div>
            <div className="text-right">
              <div className="text-sm font-medium text-gray-900">{user?.first_name} {user?.last_name}</div>
              <div className="text-xs text-gray-500">{user?.email}</div>
            </div>
          </div>
        ) : (
          <LoginButton />
        )}
      </div>

      <ContactModal 
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />

      <CartModal
        isOpen={isCartModalOpen}
        onClose={() => setIsCartModalOpen(false)}
      />
    </header>
  );
};