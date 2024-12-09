import { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Pencil } from 'lucide-react';
import { PasswordResetModal } from '../../components/auth/PasswordResetModal';

export const PersonalInfo = () => {
  const { user } = useAuth0();
  const [isPasswordResetModalOpen, setIsPasswordResetModalOpen] = useState(false);

  const handlePasswordReset = async () => {
    try {
      const response = await fetch(`https://${import.meta.env.VITE_AUTH0_DOMAIN}/dbconnections/change_password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          client_id: import.meta.env.VITE_AUTH0_CLIENT_ID,
          email: user?.email,
          connection: 'Username-Password-Authentication',
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Password reset request failed');
      }
  
      setIsPasswordResetModalOpen(false);
    } catch (error) {
      console.error('Error requesting password reset:', error);
  
      alert(
        `Failed to send password reset request: ${
          error.message || 'Unexpected error occurred'
        }. Please try again later.`
      );
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Personal Information</h1>
        <button className="p-2 text-gray-400 hover:text-gray-600">
          <Pencil className="h-5 w-5" />
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              First name
            </label>
            <div className="text-gray-900">{user?.given_name}</div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Last name
            </label>
            <div className="text-gray-900">{user?.family_name}</div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Job title
            </label>
            <div className="text-gray-900">Software Engineer</div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <div className="text-gray-900">{user?.email}</div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Change your password</h2>
          <p className="text-gray-600 mb-4">
            We'll email you a link to change your password
          </p>
          <button 
            onClick={() => setIsPasswordResetModalOpen(true)}
            className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
          >
            Set a new password
          </button>
        </div>
      </div>

      <PasswordResetModal
        isOpen={isPasswordResetModalOpen}
        onClose={() => setIsPasswordResetModalOpen(false)}
        onSubmit={handlePasswordReset}
        email={user?.email}
      />
    </div>
  );
};