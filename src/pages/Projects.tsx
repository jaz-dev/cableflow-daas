import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Plus, Trash2, AlertCircle, Loader2 } from 'lucide-react';
import { Dialog } from '@headlessui/react';
import { NewProjectModal } from '../components/NewProjectModal';
import { useProjectStore, Project } from '../stores/projectStore';
import { useAuth0 } from '@auth0/auth0-react';


export const Projects = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState('');
  const [isNewProjectModalOpen, setIsNewProjectModalOpen] = useState(false);
  const { getAccessTokenSilently } = useAuth0();

  const { 
    projects, 
    isLoading, 
    error, 
    fetchProjects, 
    addProject, 
    deleteProject 
  } = useProjectStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await getAccessTokenSilently();
        fetchProjects(token);
      } catch (err) {
        console.error("Error fetching token:", err);
      }
    };

    fetchData();
  }, [getAccessTokenSilently, fetchProjects]);

  const filteredProjects = projects.filter(project =>
    project.project_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteClick = (project: Project) => {
    setProjectToDelete(project);
    setIsDeleteModalOpen(true);
    setDeleteConfirmation('');
  };

  const handleDelete = async () => {
    if (projectToDelete && deleteConfirmation === 'delete') {
      const token = await getAccessTokenSilently();
      await deleteProject(projectToDelete.id, token);
      setIsDeleteModalOpen(false);
      setProjectToDelete(null);
      setDeleteConfirmation('');
    }
  };

  const handleNewProject = async (formData: any) => {
    const newProject = {
      project_name: formData.project_name,
      project_description: formData.project_description,
      project_attributes: {
        temp_range: formData.project_attributes.temp_range,
        ip_rating: formData.project_attributes.ip_rating,
        positive_locking: formData.project_attributes.positive_locking,
        shielding: formData.project_attributes.shielding,
      },
    };
    const token = await getAccessTokenSilently();
    await addProject(newProject, token);
    setIsNewProjectModalOpen(false);
  };

  if (isLoading) {
    return (
      <div className="max-w-5xl mx-auto">
        <div className="bg-gray-100 border border-gray-200 rounded-lg p-4 flex items-center gap-3">
          <Loader2 className="h-5 w-5 text-gray-600 animate-spin" />
          <div>
            <h3 className="text-sm font-medium text-gray-900">Loading projects...</h3>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-5xl mx-auto">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
          <div>
            <h3 className="text-sm font-medium text-red-800">Error loading projects</h3>
            <p className="text-sm text-red-700 mt-1">{error}</p>
            {/* <button
              onClick={() => fetchProjects()}
              className="mt-2 text-sm font-medium text-red-600 hover:text-red-500"
            >
              Try again
            </button> */}
          </div>
        </div>
      </div>
    );
  }

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
        {isLoading ? (
          <div className="flex items-center justify-center p-8">
            <Loader2 className="h-6 w-6 text-blue-600 animate-spin" />
          </div>
        ) : (
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
                    <div className="text-sm font-medium text-gray-900">
                      {project.project_name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {new Date(project.created_at).toLocaleDateString()}
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
        )}
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
                Are you sure you want to delete "{projectToDelete?.project_name}"? This action cannot be undone.
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