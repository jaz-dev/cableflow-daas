import clsx from 'clsx';
import { Quote } from '../../types/cable';

interface QuoteTableProps {
  quotes: Quote[];
  selectedQuoteIndex: number | null;
  onQuoteSelect: (index: number | null) => void;
}

export const QuoteTable = ({ quotes, selectedQuoteIndex, onQuoteSelect }: QuoteTableProps) => {
  const handleColumnClick = (index: number) => {
    if (selectedQuoteIndex === index) {
      onQuoteSelect(null);
    } else {
      onQuoteSelect(index);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Quantity
            </th>
            {quotes.map((quote, index) => (
              <th 
                key={index}
                onClick={() => handleColumnClick(index)}
                className={clsx(
                  'px-6 py-3 text-center cursor-pointer transition-colors',
                  selectedQuoteIndex === index 
                    ? 'border-t-2 border-t-blue-600' 
                    : 'hover:bg-blue-50/50'
                )}
              >
                <div className="flex justify-center mb-2">
                  <div 
                    className={clsx(
                      'w-4 h-4 rounded-full border-2',
                      selectedQuoteIndex === index
                        ? 'border-blue-600 bg-blue-600'
                        : 'border-gray-400'
                    )}
                  />
                </div>
                <span className="text-sm font-medium text-gray-900">
                  {quote.quantity}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          <tr>
            <td className="px-6 py-4 text-sm font-medium text-gray-900">
              Parts
            </td>
            {quotes.map((quote, index) => (
              <td 
                key={index}
                className="px-6 py-4 text-center text-sm text-gray-900"
              >
                ${quote.parts_price.toFixed(2)}
              </td>
            ))}
          </tr>
          <tr>
            <td className="px-6 py-4 text-sm font-medium text-gray-900">
              Labor
            </td>
            {quotes.map((quote, index) => (
              <td 
                key={index}
                className="px-6 py-4 text-center text-sm text-gray-900"
              >
                ${quote.labor_price.toFixed(2)}
              </td>
            ))}
          </tr>
          <tr>
            <td className="px-6 py-4 text-sm font-medium text-gray-900">
              Unit Price
            </td>
            {quotes.map((quote, index) => (
              <td 
                key={index}
                className="px-6 py-4 text-center text-sm text-gray-900"
              >
                ${quote.unit_price.toFixed(2)}
              </td>
            ))}
          </tr>
          <tr>
            <td className="px-6 py-4 text-sm font-bold text-gray-900">
              Extended Price
            </td>
            {quotes.map((quote, index) => (
              <td 
                key={index}
                className="px-6 py-4 text-center text-sm font-bold text-gray-900"
              >
                ${quote.extended_price.toFixed(2)}
              </td>
            ))}
          </tr>
          <tr>
            <td className="px-6 py-4 text-sm font-medium text-gray-900">
              Lead Time
            </td>
            {quotes.map((quote, index) => (
              <td 
                key={index}
                className="px-6 py-4 text-center text-sm text-gray-900"
              >
                {quote.lead_time}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};