import { Trash2 } from 'lucide-react';
import clsx from 'clsx';
import { CableOverview } from '../../types/cable';

interface CablesTableProps {
  cables: CableOverview[];
  onDelete: (id: number, e: React.MouseEvent) => void;
  onRowClick: (id: number) => void;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Started':
      return 'bg-yellow-100 text-yellow-800';
    case 'Quote Requested':
      return 'bg-blue-100 text-blue-800';
    case 'Quote Ready':
      return 'bg-green-100 text-green-800';
    case 'Needs Review':
      return 'bg-yellow-100 text-yellow-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export const CablesTable = ({ cables, onDelete, onRowClick }: CablesTableProps) => {
  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead>
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Cable ID
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Cable Name
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Status
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Created
          </th>
          <th className="relative px-6 py-3">
            <span className="sr-only">Actions</span>
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {cables.length === 0 ? (
          <tr>
            <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
              No cables created yet. Press "New Cable" to specify a cable and order it.
            </td>
          </tr>
        ) : (
          cables.map((cable) => (
            <tr
              key={cable.id}
              onClick={() => onRowClick(cable.id)}
              className="hover:bg-gray-50 cursor-pointer"
            >
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {cable.cable_id}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {cable.cable_name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={clsx(
                  'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                  getStatusColor(cable.status)
                )}>
                  {cable.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {new Date(cable.created_at).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                  onClick={(e) => onDelete(cable.id, e)}
                  className="text-gray-400 hover:text-red-600 transition-colors"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};