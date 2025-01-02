import { useAuth0 } from '@auth0/auth0-react';
import { LogIn } from 'lucide-react';

export const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <button
      onClick={() => loginWithRedirect()}
      className="inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-sm hover:shadow font-medium text-sm"
    >
      <LogIn className="h-4 w-4" />
      <span>Login / Register</span>
    </button>
  );
};