import { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Pencil } from 'lucide-react';
import { PasswordResetModal } from '../../components/modals/PasswordResetModal';
import { EditPersonalInfoModal } from '../../components/modals/EditPersonalInfoModal';
import { toast } from 'react-toastify';
import { useUserStore } from '../../stores/userStore';

export const PersonalInfo = () => {
  const { getAccessTokenSilently } = useAuth0();
  const { user, updateUser } = useUserStore(); 
  const [isPasswordResetModalOpen, setIsPasswordResetModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handlePasswordReset = async () => {
    try {
      const accessToken = await getAccessTokenSilently();
      const response = await fetch(`${import.meta.env.VITE_CABLEFLOW_API_URL}/api/users/me/password`, {
        method: 'PUT',
        headers: {
          "Authorization": `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: user?.email,
        }),
      });
  
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
      }
  
      setIsPasswordResetModalOpen(false);
    } catch (error) {
      console.error('Error requesting password reset:', error);

      alert(
        `Error requesting password reset. Please try again later.`
      );
    }
  };

  const handleSavePersonalInfo = async (newFirstName: string, newLastName: string) => {
    try {
      setIsLoading(true);
      const accessToken = await getAccessTokenSilently();
      await updateUser(accessToken, {
        first_name: newFirstName,
        last_name: newLastName
      });
      setIsEditModalOpen(false);
    } catch (error) {
      console.error('Error updating personal information:', error);
      toast.error('Failed to update personal information');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Personal Information</h1>
        <button 
          onClick={() => setIsEditModalOpen(true)}
          className="p-2 text-gray-400 hover:text-gray-600"
        >
          <Pencil className="h-5 w-5" />
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              First name
            </label>
            <div className="text-gray-900">{user?.first_name}</div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Last name
            </label>
            <div className="text-gray-900">{user?.last_name}</div>
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

      <EditPersonalInfoModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSavePersonalInfo}
        firstName={user?.first_name || ''}
        lastName={user?.last_name || ''}
        isLoading={isLoading}
      />
    </div>
  );
};