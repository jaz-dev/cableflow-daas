import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Cable, 
  ShoppingCart, 
  Truck,
  UserCircle,
} from 'lucide-react';
import { LogoutButton } from '../auth/LogoutButton';
import clsx from 'clsx';

const NavItem = ({ to, icon: Icon, children }: { to: string; icon: any; children: React.ReactNode }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      clsx(
        'flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md',
        isActive
          ? 'bg-blue-50 text-blue-600'
          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
      )
    }
  >
    <Icon className="h-5 w-5" />
    {children}
  </NavLink>
);

export const Sidebar = () => {
  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col h-full">
      <nav className="flex-1 px-2 py-4 space-y-1">
        <NavItem to="/" icon={Cable}>Cable Quotes</NavItem>
        <NavItem to="/orders" icon={ShoppingCart}>Orders</NavItem>
        <NavItem to="/shipping" icon={Truck}>Shipping</NavItem>
        <NavItem to="/account/personal" icon={UserCircle}>Personal Info</NavItem>
        
        <div className="px-4 py-2">
          <LogoutButton />
        </div>
      </nav>
    </div>
  );
};