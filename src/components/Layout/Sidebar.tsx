import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, 
  PlayCircle, 
  FolderKanban, 
  UserCircle, 
  LogOut,
  ChevronDown
} from 'lucide-react';
import { Disclosure } from '@headlessui/react';
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
        <NavItem to="/" icon={Home}>Home</NavItem>
        <NavItem to="/projects/demo" icon={PlayCircle}>Demo</NavItem>
        <NavItem to="/projects" icon={FolderKanban}>Projects</NavItem>
        
        <Disclosure defaultOpen>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex items-center gap-2 w-full px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-md">
                <UserCircle className="h-5 w-5" />
                Account
                <ChevronDown className={clsx('ml-auto h-4 w-4 transition-transform', open && 'transform rotate-180')} />
              </Disclosure.Button>
              
              <Disclosure.Panel className="pl-11 space-y-1">
                <NavLink
                  to="/account/plan"
                  className={({ isActive }) =>
                    clsx(
                      'block py-2 px-4 text-sm rounded-md',
                      isActive
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    )
                  }
                >
                  Plan
                </NavLink>
                <NavLink
                  to="/account/personal"
                  className={({ isActive }) =>
                    clsx(
                      'block py-2 px-4 text-sm rounded-md',
                      isActive
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    )
                  }
                >
                  Personal Information
                </NavLink>
                <NavLink
                  to="/account/team"
                  className={({ isActive }) =>
                    clsx(
                      'block py-2 px-4 text-sm rounded-md',
                      isActive
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    )
                  }
                >
                  Team Members
                </NavLink>
                <NavLink
                  to="/account/nda"
                  className={({ isActive }) =>
                    clsx(
                      'block py-2 px-4 text-sm rounded-md',
                      isActive
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    )
                  }
                >
                  NDA
                </NavLink>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </nav>
      
      <div className="border-t border-gray-200 p-4">
        <button className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900">
          <LogOut className="h-5 w-5" />
          Logout
        </button>
      </div>
    </div>
  );
};