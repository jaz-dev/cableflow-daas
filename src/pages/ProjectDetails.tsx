import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Search, Plus, ArrowLeft } from 'lucide-react';
import { Pagination } from '../components/Pagination';

interface Project {
  id: string;
  name: string;
  createdAt: string;
}

interface Job {
  id: string;
  partName: string;
  revision: string;
  status: 'Completed' | 'Pending' | 'In Progress';
  created: string;
}

const sampleProjects: Project[] = [
  { id: '1', name: 'Industrial Control Panel', createdAt: '2024-02-15' },
  { id: '2', name: 'Data Center Wiring', createdAt: '2024-02-10' },
  { id: '3', name: 'Factory Automation', createdAt: '2024-02-05' },
];

const sampleJobs: Job[] = Array.from({ length: 100 }, (_, i) => ({
  id: `JOB-${String(i + 1).padStart(4, '0')}`,
  partName: `CBL-${Math.floor(10000 + Math.random() * 90000)}`,
  revision: String.fromCharCode(65 + Math.floor(Math.random() * 26)),
  status: ['Completed', 'Pending', 'In Progress'][Math.floor(Math.random() * 3)] as Job['status'],
  created: new Date(2024, Math.floor(Math.random() * 12), Math.floor(1 + Math.random() * 28))
    .toLocaleDateString('en-US'),
}));

export const ProjectDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const currentProject = sampleProjects.find(p => p.id === id);

  const filteredJobs = sampleJobs.filter(job =>
    job.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.partName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedJobs = filteredJobs.slice(startIndex, startIndex + itemsPerPage);

  const handleNewJob = () => {
    window.location.href = 'https://form.typeform.com/to/xxxxx'; // Replace with actual TypeForm URL
  };

  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  if (!currentProject) {
    return <div>Project not found</div>;
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/projects')}
            className="p-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="text-2xl font-semibold text-gray-900">{currentProject.name}</h1>
        </div>
        <button
          onClick={handleNewJob}
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="h-5 w-5" />
          New Drawing Job
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Common Attributes</h2>
        <p className="text-gray-600">This section will contain common project attributes.</p>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search by job ID, part name, or status..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Job
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Part Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Revision
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Created
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {displayedJobs.map((job) => (
              <tr key={job.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {job.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {job.partName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {job.revision}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    job.status === 'Completed'
                      ? 'bg-green-100 text-green-800'
                      : job.status === 'Pending'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {job.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {job.created}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="px-6 py-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-700">
              Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredJobs.length)} of{' '}
              {filteredJobs.length} results
            </p>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};