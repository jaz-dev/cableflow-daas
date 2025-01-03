import { Dialog } from '@headlessui/react';
import { AlertCircle } from 'lucide-react';

interface DeleteCableModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  cableName: string;
}

export const DeleteCableModal = ({ isOpen, onClose, onConfirm, cableName }: DeleteCableModalProps) => {
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
          <div className="flex items-start gap-4">
            <div className="p-2 bg-red-100 rounded-full">
              <AlertCircle className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <Dialog.Title className="text-lg font-medium text-gray-900">
                Delete Cable
              </Dialog.Title>
              <p className="mt-2 text-sm text-gray-600">
                Are you sure you want to delete "{cableName}"? This action cannot be undone.
              </p>
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
            >
              Delete Cable
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};