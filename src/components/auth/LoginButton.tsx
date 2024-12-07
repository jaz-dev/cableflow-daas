import { useAuth0 } from '@auth0/auth0-react';
import { LogIn } from 'lucide-react';

export const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <button
      onClick={() => loginWithRedirect()}
      className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
    >
      <LogIn className="h-5 w-5" />
      Log In
    </button>
  );
};