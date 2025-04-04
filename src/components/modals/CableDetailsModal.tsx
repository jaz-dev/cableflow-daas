import { Dialog } from '@headlessui/react';
import { Download, Eye, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Cable, CableFileInfo, CableStatus, Quote } from '../../types/cable';
import { QuoteTable } from '../cables/QuoteTable';
import clsx from 'clsx';
import { useAuth0 } from '@auth0/auth0-react';
import { useCartStore } from '../../stores/cartStore';

interface CableDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  cable: Cable;
  onAddToCart?: () => void;
}

export const CableDetailsModal = ({ isOpen, onClose, cable, onAddToCart }: CableDetailsModalProps) => {
  const [selectedQuoteIndex, setSelectedQuoteIndex] = useState<number | null>(null);
  const [customQuantity, setCustomQuantity] = useState<string>('');
  const [drawingBlobUrl, setDrawingBlobUrl] = useState<string | undefined>(undefined);
  const [bomBlobUrl, setBomBlobUrl] = useState<string | undefined>(undefined);
  const [fromToBlobUrl, setFromToBlobUrl] = useState<string | undefined>(undefined);
  const { getAccessTokenSilently } = useAuth0();
  const { addItem } = useCartStore();

  useEffect(() => {
    if (cable?.files?.drawing) {
      setDrawingBlobUrl(base64ToBlobUrl(cable.files.drawing));
    }
    if (cable?.files?.bom) {
      setBomBlobUrl(base64ToBlobUrl(cable.files.bom));
    }
    if (cable?.files?.from_to) {
      setFromToBlobUrl(base64ToBlobUrl(cable.files.from_to));
    }
  }, [cable]);

  const handleAddToCart = async() => {
    if (!cable.quote_table) return;
    
    if (selectedQuoteIndex !== null) {
      const token = await getAccessTokenSilently();
      const quantity = cable.quote_table[selectedQuoteIndex].quantity;
      const price = cable.quote_table[selectedQuoteIndex].extended_price;
      await addItem(token, cable.id, quantity, price);
      onClose();
      if (onAddToCart) {
        onAddToCart();
      }
    } else if (customQuantity) {
      const customQuantityNum = parseInt(customQuantity, 10);
      const price = getPriceForCustomQuantity(customQuantityNum, cable.quote_table);
      if (price !== null) {
        const token = await getAccessTokenSilently();
        await addItem(token, cable.id, customQuantityNum, price);
        onClose();
        if (onAddToCart) {
          onAddToCart();
        }
      }
    }
  };

  const handleFileView = (fileType: string) => {
    if(fileType === 'Drawing') {
      window.open(drawingBlobUrl, '_blank');
    } else if(fileType === 'BOM') {
      window.open(bomBlobUrl, '_blank');
    } else if(fileType === 'From-To Table') {
      window.open(fromToBlobUrl, '_blank');
    }
  };

  const handleFileDownload = (fileType: string, fileInfo: CableFileInfo) => {
    const link = document.createElement("a");
    if(fileType === 'Drawing') {
      link.href = drawingBlobUrl || '';
    } else if(fileType === 'BOM') {
      link.href = bomBlobUrl || '';
    } else if(fileType === 'From-To Table') {
      link.href = fromToBlobUrl || '';
    }
    link.download = fileInfo.file_name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const base64ToBlobUrl = (fileInfo: CableFileInfo ) => {
    const mimeType = fileInfo.file_content_type ? fileInfo.file_content_type : "application/octet-stream";
    const byteCharacters = atob(fileInfo.file_content);
    const byteNumbers = new Uint8Array(byteCharacters.length);
  
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
  
    const blob = new Blob([byteNumbers], { type: mimeType });
    const url = URL.createObjectURL(blob);
    return url;
  };

  const getPriceForCustomQuantity = (custom_quantity: number, quotes: Quote[]) => {
    if (custom_quantity < 1) {
      return null;
    };
    let unit_price_to_use = null;
    for (let i = 0; i < quotes.length; i++) {
      const quote = quotes[i];
      if (custom_quantity < quote.quantity) {
        if (i === 0) {
          return null;
        } else {
          unit_price_to_use = quotes[i - 1].unit_price;
        }
      }
    }
    if (unit_price_to_use === null) {
      unit_price_to_use = quotes[quotes.length - 1].unit_price;
    }
    return unit_price_to_use * custom_quantity;
  };

  const handleQuoteSelect = (index: number | null) => {
    setSelectedQuoteIndex(index);
    setCustomQuantity('');
  };

  const handleCustomQuantityChange = (value: string) => {
    // Only allow numbers
    if (value === '' || /^\d+$/.test(value)) {
      setCustomQuantity(value);
      setSelectedQuoteIndex(null);
    }
  };

  const FileActions = ({ fileType, file, isModified }: { fileType: string; file: CableFileInfo; isModified: boolean }) => (
    <div className="space-y-2">
      <div className="flex items-center gap-3">
        {fileType === 'Drawing' && (
          <button
            onClick={() => handleFileView(fileType)}
            className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <Eye className="h-5 w-5" />
          </button>
        )}
        <button
          onClick={() => handleFileDownload(fileType, file)}
          className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <Download className="h-5 w-5" />
        </button>
        <div>
          <div className="text-sm font-medium text-gray-900">{fileType}</div>
          <div className="text-sm text-gray-500">{file.file_name}</div>
        </div>
      </div>
      {isModified && (
        <p className="text-sm text-gray-500">File has been revised and reuploaded</p>
      )}
    </div>
  );

  if (!cable) {
    return null;
  }

  const customPrice = customQuantity 
    ? getPriceForCustomQuantity(parseInt(customQuantity, 10), cable.quote_table || [])
    : null;
  
  const smallestQuoteQuantity = cable.quote_table?.[0]?.quantity;
  
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-4xl bg-white rounded-xl shadow-xl max-h-[90vh] flex flex-col">
          <div className="flex items-center justify-between p-6 border-b">
            <Dialog.Title className="text-xl font-semibold text-gray-900">
              {cable.cable_name} Details
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
                    'bg-yellow-100 text-yellow-800': cable.status === CableStatus.Started || cable.status === CableStatus.NeedsReview,
                    'bg-blue-100 text-blue-800': cable.status === CableStatus.QuoteRequested,
                    'bg-green-100 text-green-800': cable.status === CableStatus.QuoteReady,
                    'bg-gray-100 text-gray-800': cable.status === CableStatus.QuoteExpired,
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
                  Quantities Requested
                </label>
                <p className="text-gray-900">
                  {cable.quantities?.join(', ') || '-'}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Desired Delivery Date
                </label>
                <p className="text-gray-900">
                  {cable.delivery_date ? new Date(cable.delivery_date).toLocaleDateString() : '-'}
                </p>
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Additional Information
                </label>
                <p className="text-gray-900">{cable.additional_information || '-'}</p>
              </div>
            </div>

            {/* Files */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Files</h3>
              <div className="space-y-6 divide-y divide-gray-200">
                {cable?.files?.drawing && (
                  <div className="pt-4">
                    <FileActions 
                      fileType="Drawing" 
                      file={cable.files.drawing} 
                      isModified={cable.drawing_modified} 
                    />
                  </div>
                )}
                {cable?.files?.bom && (
                  <div className="pt-4">
                    <FileActions 
                      fileType="BOM" 
                      file={cable.files.bom} 
                      isModified={cable.bom_modified} 
                    />
                  </div>
                )}
                {cable?.files?.from_to && (
                  <div className="pt-4">
                    <FileActions 
                      fileType="From-To Table" 
                      file={cable.files.from_to} 
                      isModified={cable.from_to_table_modified} 
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Quote Section */}
            {cable.status === CableStatus.QuoteExpired ? (
              <div className="text-center py-8">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Quote Has Expired</h3>
                <p className="text-gray-600">
                  This quote is no longer valid. Please request a new quote.
                </p>
              </div>
            ) : cable.status === CableStatus.QuoteReady && cable.quote_table ? (
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
                    onQuoteSelect={handleQuoteSelect}
                  />
                </div>

                {/* Custom Quantity Input */}
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Custom Quantity
                  </label>
                  <div className="max-w-xs">
                    <input
                      type="text"
                      value={customQuantity}
                      onChange={(e) => handleCustomQuantityChange(e.target.value)}
                      placeholder="Enter custom quantity"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {customQuantity && !customPrice && smallestQuoteQuantity && (
                      <p className="mt-1 text-sm text-red-600">
                        Custom quantity must be above the smallest quoted quantity: {smallestQuoteQuantity}
                      </p>
                    )}
                  </div>
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
                  {customQuantity && customPrice && (
                    <p className="text-lg font-bold text-gray-900">
                      Total: ${customPrice.toFixed(2)}
                    </p>
                  )}
                  <button
                    onClick={handleAddToCart}
                    disabled={selectedQuoteIndex === null && !customPrice}
                    className={clsx(
                      'px-4 py-2 rounded-lg font-medium transition-colors',
                      (selectedQuoteIndex !== null || customPrice !== null)
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