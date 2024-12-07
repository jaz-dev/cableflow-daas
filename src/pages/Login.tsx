import { useAuth0 } from '@auth0/auth0-react';
import { Navigate } from 'react-router-dom';
import { LoginButton } from '../components/auth/LoginButton';
import { CableFlowLogo } from '../components/CableFlowLogo';

export const Login = () => {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="w-full max-w-md">
        <div className="bg-white px-8 py-12 shadow-sm rounded-xl">
          <div className="flex justify-center mb-8">
            <CableFlowLogo className="h-8" />
          </div>
          
          <h1 className="text-2xl font-semibold text-center text-gray-900 mb-8">
            Sign in to your account
          </h1>
          
          <div className="flex justify-center">
            <LoginButton />
          </div>
          
          <p className="mt-8 text-center text-sm text-gray-600">
            By signing in, you agree to our{' '}
            <a href="#" className="text-blue-600 hover:text-blue-800">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="#" className="text-blue-600 hover:text-blue-800">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};