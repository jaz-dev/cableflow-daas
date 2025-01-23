import { Dialog } from '@headlessui/react';
import { Download, Eye, X } from 'lucide-react';
import { useState } from 'react';
import { Cable, CableStatus } from '../../types/cable';
import { toast } from 'react-toastify';
import { QuoteTable } from '../cables/QuoteTable';
import clsx from 'clsx';

interface CableDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  cable: Cable;
}

export const CableDetailsModal = ({ isOpen, onClose, cable }: CableDetailsModalProps) => {
  const [selectedQuoteIndex, setSelectedQuoteIndex] = useState<number | null>(null);

  const handleAddToCart = () => {
    toast.success('Cable Added to Cart');
    onClose();
  };

  const handleFileView = (fileType: string) => {
    // In a real app, this would open the file in a new tab or viewer
    console.log(`Viewing ${fileType}`);
  };

  const handleFileDownload = (fileType: string) => {
    // In a real app, this would trigger the file download
    console.log(`Downloading ${fileType}`);
  };

  const FileActions = ({ fileType, file, isModified }: { fileType: string; file: File; isModified: boolean }) => (
    <div className="space-y-2">
      <div className="flex items-center gap-3">
        <button
          onClick={() => handleFileView(fileType)}
          className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <Eye className="h-5 w-5" />
        </button>
        <button
          onClick={() => handleFileDownload(fileType)}
          className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <Download className="h-5 w-5" />
        </button>
        <span className="text-sm text-gray-900">{file.name}</span>
      </div>
      {isModified && (
        <p className="text-sm text-gray-500">File has been revised and reuploaded</p>
      )}
    </div>
  );

  if (!cable) {
    return null;
  }
  
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-4xl bg-white rounded-xl shadow-xl max-h-[90vh] flex flex-col">
          <div className="flex items-center justify-between p-6 border-b">
            <Dialog.Title className="text-xl font-semibold text-gray-900">
              Cable Details
            </Dialog.Title>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="p-6 space-y-8 overflow-y-auto">
            {/* Cable Information */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Cable ID
                </label>
                <p className="text-gray-900">{cable.cable_id}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Cable Name
                </label>
                <p className="text-gray-900">{cable.cable_name}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <p className="text-gray-900">{cable.cable_description || '-'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <span className={clsx(
                  'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                  {
                    'bg-yellow-100 text-yellow-800': cable.status === CableStatus.Started,
                    'bg-blue-100 text-blue-800': cable.status === CableStatus.QuoteRequested,
                    'bg-green-100 text-green-800': cable.status === CableStatus.QuoteReady,
                    'bg-red-100 text-red-800': cable.status === CableStatus.NeedsReview,
                  }
                )}>
                  {cable.status}
                </span>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Created At
                </label>
                <p className="text-gray-900">
                  {new Date(cable.created_at).toLocaleDateString()}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Created by
                </label>
                <p className="text-gray-900">{cable.created_by || '-'}</p>
              </div>
            </div>

            {/* Files */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Files</h3>
              <div className="space-y-4">
                {cable.drawing && (
                  <FileActions 
                    fileType="Drawing" 
                    file={cable.drawing} 
                    isModified={cable.drawing_modified} 
                  />
                )}
                {cable.bom && (
                  <FileActions 
                    fileType="BOM" 
                    file={cable.bom} 
                    isModified={cable.bom_modified} 
                  />
                )}
                {cable.from_to_table && (
                  <FileActions 
                    fileType="From-To Table" 
                    file={cable.from_to_table} 
                    isModified={cable.from_to_table_modified} 
                  />
                )}
              </div>
            </div>

            {/* Quote Section */}
            {cable.status === CableStatus.QuoteReady && cable.quote_table ? (
              <div className="space-y-4">
                {cable.quote_expiration && (
                  <p className="text-sm text-gray-600">
                    Quote valid until: {new Date(cable.quote_expiration).toLocaleDateString()}
                  </p>
                )}

                <div className="border rounded-lg overflow-hidden">
                  <QuoteTable
                    quotes={cable.quote_table}
                    selectedQuoteIndex={selectedQuoteIndex}
                    onQuoteSelect={setSelectedQuoteIndex}
                  />
                </div>

                {cable.notes && (
                  <p className="text-sm text-gray-600">{cable.notes}</p>
                )}

                <div className="flex justify-end items-center gap-4">
                  {selectedQuoteIndex !== null && (
                    <p className="text-lg font-bold text-gray-900">
                      Total: ${cable.quote_table[selectedQuoteIndex].extended_price.toFixed(2)}
                    </p>
                  )}
                  <button
                    onClick={handleAddToCart}
                    disabled={selectedQuoteIndex === null}
                    className={clsx(
                      'px-4 py-2 rounded-lg font-medium transition-colors',
                      selectedQuoteIndex !== null
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    )}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-center text-gray-600 py-8">
                Quote will appear here when ready
              </p>
            )}
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};