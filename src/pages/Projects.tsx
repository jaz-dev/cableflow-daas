import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Plus, Trash2 } from 'lucide-react';
import { Dialog } from '@headlessui/react';
import { NewProjectModal } from '../components/NewProjectModal';

// TODO: move interface to a common file
interface Project {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  attributes?: {
    temperatureRange?: {
      min: string;
      max: string;
      unit: 'C' | 'F';
    };
    ipRating?: string;
    positiveLocking?: string;
    shielding?: string;
  };
}

const sampleProjects: Project[] = [
  { id: '1', name: 'Industrial Control Panel', createdAt: '2024-02-15' },
  { id: '2', name: 'Data Center Wiring', createdAt: '2024-02-10' },
  { id: '3', name: 'Factory Automation', createdAt: '2024-02-05' },
];

export const Projects = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [projects, setProjects] = useState(sampleProjects);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState('');
  const [isNewProjectModalOpen, setIsNewProjectModalOpen] = useState(false);

  const filteredProjects = projects.filter(project =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteClick = (project: Project) => {
    setProjectToDelete(project);
    setIsDeleteModalOpen(true);
    setDeleteConfirmation('');
  };

  const handleDelete = () => {
    if (projectToDelete && deleteConfirmation === 'delete') {
      setProjects(projects.filter(p => p.id !== projectToDelete.id));
      setIsDeleteModalOpen(false);
      setProjectToDelete(null);
      setDeleteConfirmation('');
    }
  };

  const handleNewProject = (formData: any) => {
    const newProject: Project = {
      id: String(projects.length + 1),
      name: formData.name,
      description: formData.description,
      createdAt: new Date().toISOString().split('T')[0],
      attributes: formData.attributes,
    };
    setProjects([...projects, newProject]);
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Projects</h1>
        <button
          onClick={() => setIsNewProjectModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="h-5 w-5" />
          New Project
        </button>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search projects..."
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
                Project Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Created Date
              </th>
              <th className="relative px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredProjects.map((project) => (
              <tr key={project.id} className="hover:bg-gray-50">
                <td 
                  className="px-6 py-4 whitespace-nowrap cursor-pointer"
                  onClick={() => navigate(`/projects/${project.id}`)}
                >
                  <div className="text-sm font-medium text-gray-900">{project.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">
                    {new Date(project.createdAt).toLocaleDateString()}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button 
                    onClick={() => handleDeleteClick(project)}
                    className="text-gray-400 hover:text-red-600 transition-colors"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Dialog 
        open={isDeleteModalOpen} 
        onClose={() => setIsDeleteModalOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="mx-auto max-w-md rounded-lg bg-white p-6 shadow-xl">
            <Dialog.Title className="text-lg font-medium text-gray-900 mb-4">
              Delete Project
            </Dialog.Title>
            
            <div className="mb-6">
              <p className="text-sm text-gray-600 mb-4">
                Are you sure you want to delete "{projectToDelete?.name}"? This action cannot be undone.
              </p>
              
              <div className="space-y-2">
                <label htmlFor="confirm" className="block text-sm font-medium text-gray-700">
                  Type "delete" to confirm
                </label>
                <input
                  type="text"
                  id="confirm"
                  value={deleteConfirmation}
                  onChange={(e) => setDeleteConfirmation(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="delete"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleteConfirmation !== 'delete'}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Delete Project
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>

      <NewProjectModal
        isOpen={isNewProjectModalOpen}
        onClose={() => setIsNewProjectModalOpen(false)}
        onSubmit={handleNewProject}
        existingProjects={projects}
      />
    </div>
  );
};