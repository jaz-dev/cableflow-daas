import { useAuth0 } from '@auth0/auth0-react';
import { LogOut } from 'lucide-react';

export const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <button
      onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
      className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900"
    >
      <LogOut className="h-5 w-5" />
      Logout
    </button>
  );
};