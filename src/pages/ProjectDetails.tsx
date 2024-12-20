import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Search, Plus, ArrowLeft, Pencil } from 'lucide-react';
import { Pagination } from '../components/Pagination';
import { NewProjectModal } from '../components/NewProjectModal';
import { useJobStore } from '../stores/jobStore';
import { Project, useProjectStore } from '../stores/projectStore';

export const ProjectDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const itemsPerPage = 10;

  const demoProject: Project =
  {
    id: 'demo',
    name: 'Liquid Handling Robot',
    description: 'Pipetting Gantry Robot for Automated Assay Sample Prep',
    createdAt: '2024-02-15',
    attributes: {
      temperatureRange: { min: '0', max: '35', unit: 'C' },
      ipRating: '21',
      positiveLocking: 'Yes',
      shielding: 'No',
    },
  }
  const projects = useProjectStore((state) => state.projects);
  const updateProject = useProjectStore((state) => state.updateProject);
  const jobs = useJobStore((state) => state.jobs);

  let currentProject: Project | undefined = undefined
  if (id === 'demo') {
    currentProject = demoProject
  } else {
    currentProject = projects.find(p => p.id === id);
  }
  //const currentProject = projects.find(p => p.id === id);

  const filteredJobs = jobs.filter(job =>
    job.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.partName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedJobs = filteredJobs.slice(startIndex, startIndex + itemsPerPage);

  const handleNewJob = () => {
    window.open('https://kkjhm7av2q9.typeform.com/to/IcHrmeZp?typeform-source=www.cableflow.io', '_blank');
  };

  const handleEditProject = (formData: any) => {
    updateProject(id!, {
      name: formData.name,
      description: formData.description,
      attributes: formData.attributes,
    });
    setIsEditModalOpen(false);
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

      {(currentProject.description || currentProject.attributes) && (
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex justify-between items-start mb-6">
            <div className="flex-1">
              {currentProject.description && (
                <div className="mb-6">
                  <h2 className="text-lg font-medium text-gray-900 mb-2">Description</h2>
                  <p className="text-gray-600">{currentProject.description}</p>
                </div>
              )}

              {currentProject.attributes && (
                <div>
                  <h2 className="text-lg font-medium text-gray-900 mb-4">Project Attributes</h2>
                  <div className="grid grid-cols-2 gap-4">
                    {currentProject.attributes.temperatureRange && (
                      <div>
                        <h3 className="text-sm font-medium text-gray-700">Operating Temperature Range</h3>
                        <p className="text-gray-600">
                          {currentProject.attributes.temperatureRange.min}° - {currentProject.attributes.temperatureRange.max}°
                          {currentProject.attributes.temperatureRange.unit}
                        </p>
                      </div>
                    )}

                    {currentProject.attributes.ipRating && (
                      <div>
                        <h3 className="text-sm font-medium text-gray-700">IP Rating</h3>
                        <p className="text-gray-600">IP{currentProject.attributes.ipRating}</p>
                      </div>
                    )}

                    {currentProject.attributes.positiveLocking && (
                      <div>
                        <h3 className="text-sm font-medium text-gray-700">Positive Locking</h3>
                        <p className="text-gray-600">{currentProject.attributes.positiveLocking}</p>
                      </div>
                    )}

                    {currentProject.attributes.shielding && (
                      <div>
                        <h3 className="text-sm font-medium text-gray-700">Shielding</h3>
                        <p className="text-gray-600">{currentProject.attributes.shielding}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
            <button
              onClick={() => setIsEditModalOpen(true)}
              className="p-2 text-gray-400 hover:text-gray-600"
            >
              <Pencil className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}

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
              <tr 
                key={job.id} 
                className="hover:bg-gray-50 cursor-pointer"
                onClick={() => navigate(`/projects/${id}/jobs/${job.id}`)}
              >
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

      <NewProjectModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSubmit={handleEditProject}
        existingProjects={projects.filter(p => p.id !== id)}
        initialData={currentProject}
        mode="edit"
      />
    </div>
  );
};