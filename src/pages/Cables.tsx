import { useState, useMemo } from 'react';
import { Search, Plus } from 'lucide-react';
import { Pagination } from '../components/Pagination';
import { CablesTable } from '../components/cables/CablesTable';
import { CableOverview } from '../types/cable';

// Generate sample data
const sampleData: CableOverview[] = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  cable_id: `CBL-${String(i + 1).padStart(4, '0')}`,
  cable_name: `Cable Assembly ${String(i + 1).padStart(4, '0')}`,
  status: ['Started', 'Quote Requested', 'Quote Ready'][Math.floor(Math.random() * 3)] as CableOverview['status'],
  created_at: new Date(2024, Math.floor(Math.random() * 2), Math.floor(1 + Math.random() * 28))
    .toISOString()
    .split('T')[0],
}));

export const Cables = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [cables, setCables] = useState<CableOverview[]>(sampleData);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleDelete = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setCables(cables.filter(cable => cable.id !== id));
  };

  const handleRowClick = (id: number) => {
    console.log(`Clicked cable ${id}`);
    // Implementation for row click will come later
  };

  const handleNewCable = () => {
    console.log('New cable button clicked');
    // Implementation will come later
  };

  const filteredCables = useMemo(() => {
    return cables.filter(cable => {
      const matchesSearch = Object.values(cable)
        .join(' ')
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || cable.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });
  }, [cables, searchTerm, statusFilter]);

  // Calculate pagination
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCables = filteredCables.slice(startIndex, startIndex + itemsPerPage);

  // Reset to first page when filters change
  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleStatusFilter = (value: string) => {
    setStatusFilter(value);
    setCurrentPage(1);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Cables</h1>
        <button
          onClick={handleNewCable}
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="h-5 w-5" />
          New Cable
        </button>
      </div>

      <div className="flex gap-4 mb-6">
        <select
          value={statusFilter}
          onChange={(e) => handleStatusFilter(e.target.value)}
          className="px-3 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="all">All Statuses</option>
          <option value="Started">Started</option>
          <option value="Quote Requested">Quote Requested</option>
          <option value="Quote Ready">Quote Ready</option>
        </select>

        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search cables..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        <CablesTable
          cables={paginatedCables}
          onDelete={handleDelete}
          onRowClick={handleRowClick}
        />

        {filteredCables.length > 0 && (
          <div className="px-6 py-4 border-t border-gray-200">
            <Pagination
              currentPage={currentPage}
              totalItems={filteredCables.length}
              itemsPerPage={itemsPerPage}
              onPageChange={setCurrentPage}
            />
          </div>
        )}
      </div>
    </div>
  );
};