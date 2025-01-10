import { useAuth0 } from '@auth0/auth0-react';
import { ShoppingCart } from 'lucide-react';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CableFlowLogo } from '../CableFlowLogo';
import { LoginButton } from '../auth/LoginButton';
import { ContactModal } from '../modals/ContactModal';
import clsx from 'clsx';

export const Header = () => {
  const { user, isAuthenticated } = useAuth0();
  const navigate = useNavigate();
  const location = useLocation();
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

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
          className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
          onClick={() => {/* Cart functionality will be implemented later */}}
          aria-label="Shopping Cart"
        >
          <ShoppingCart className="h-5 w-5" />
        </button>

        {isAuthenticated ? (
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-medium">
              {user?.name?.[0]?.toUpperCase()}
            </div>
            <div className="text-right">
              <div className="text-sm font-medium text-gray-900">{user?.name}</div>
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
    </header>
  );
};