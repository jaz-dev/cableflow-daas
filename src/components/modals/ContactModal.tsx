import { Dialog } from '@headlessui/react';
import { Mail } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal = ({ isOpen, onClose }: ContactModalProps) => {
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
          <div className="flex items-start gap-4 mb-6">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Mail className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <Dialog.Title className="text-lg font-medium text-gray-900">
                Contact Us
              </Dialog.Title>
              <p className="mt-2 text-gray-600">
                Please send us an email at{' '}
                <a 
                  href="mailto:support@cableflow.com"
                  className="text-blue-600 hover:text-blue-800"
                >
                  support@cableflow.com
                </a>
                . We will get back to you as soon as possible.
              </p>
            </div>
          </div>

          <div className="flex justify-end">
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