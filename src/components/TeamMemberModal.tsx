import { Dialog } from '@headlessui/react';
import { Mail } from 'lucide-react';

interface TeamMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TeamMemberModal = ({ isOpen, onClose }: TeamMemberModalProps) => {
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
          <Dialog.Title className="text-xl font-semibold text-gray-900 mb-6">
            Manage Team Members
          </Dialog.Title>

          <div className="space-y-6">
            <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
              <Mail className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <p className="text-sm text-blue-700">
                  To manage team members, please email:
                </p>
                <a 
                  href="mailto:jaswantk@cableflow.io" 
                  className="text-sm font-medium text-blue-700 hover:text-blue-800"
                >
                  jaswantk@cableflow.io
                </a>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-sm font-medium text-gray-900">To add a user, include:</h3>
              <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                <li>Email address</li>
                <li>First name</li>
                <li>Last name</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="text-sm font-medium text-gray-900">To delete a user, include:</h3>
              <ul className="list-disc list-inside text-sm text-gray-600">
                <li>Email address of the user to delete</li>
              </ul>
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Close
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};