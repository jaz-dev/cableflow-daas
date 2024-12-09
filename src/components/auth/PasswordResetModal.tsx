import { Dialog } from '@headlessui/react';
import { AlertCircle, Loader2 } from 'lucide-react';

interface PasswordResetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (email: string) => void;
  email?: string;
  isLoading?: boolean;
}

export const PasswordResetModal = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  email = '',
  isLoading = false,
}: PasswordResetModalProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(email);
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
          <Dialog.Title className="text-lg font-medium text-gray-900 mb-4">
            Reset Password
          </Dialog.Title>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
              <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
              <p className="text-sm text-blue-700">
                We'll send a password reset link to your email address. Click the link in the email to set a new password.
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email address
              </label>
              <input
                type="email"
                value={email}
                disabled
                className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-gray-500"
              />
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                disabled={isLoading}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50"
              >
                {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
                Send reset link
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};