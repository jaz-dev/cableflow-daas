import React, { useState, useEffect } from 'react';
import { Dialog } from '@headlessui/react';
import { HelpCircle } from 'lucide-react';

// TODO: move interface to a common file
interface ProjectFormData {
  name: string;
  description?: string;
  attributes: {
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

interface NewProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ProjectFormData) => void;
  existingProjects: { name: string }[];
}

const initialFormData: ProjectFormData = {
  name: '',
  description: '',
  attributes: {
    temperatureRange: { min: '', max: '', unit: 'C' },
    ipRating: '',
    positiveLocking: '',
    shielding: '',
  },
};

export const NewProjectModal = ({ isOpen, onClose, onSubmit, existingProjects }: NewProjectModalProps) => {
  const [formData, setFormData] = useState<ProjectFormData>(initialFormData);
  const [nameError, setNameError] = useState('');

  useEffect(() => {
    if (!isOpen) {
      setFormData(initialFormData);
      setNameError('');
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      setNameError('Project name is required');
      return;
    }

    if (existingProjects.some(p => p.name.toLowerCase() === formData.name.toLowerCase())) {
      setNameError('Project name must be unique');
      return;
    }

    onSubmit(formData);
    onClose();
  };

  const handleClose = () => {
    setFormData(initialFormData);
    setNameError('');
    onClose();
  };

  const handleChange = (field: string, value: string) => {
    if (field === 'name') {
      setNameError('');
    }
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAttributeChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      attributes: { ...prev.attributes, [field]: value },
    }));
  };

  return (
    <Dialog open={isOpen} onClose={() => {}} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-2xl w-full rounded-xl bg-white p-6 shadow-xl">
          <Dialog.Title className="text-xl font-semibold text-gray-900 mb-6">
            New Project
          </Dialog.Title>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Project Details */}
            <div className="space-y-4">
              <h2 className="text-lg font-medium text-gray-900">Project Details</h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Project Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-md ${
                    nameError ? 'border-red-500' : 'border-gray-300'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                {nameError && (
                  <p className="mt-1 text-sm text-red-500">{nameError}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description (optional)
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleChange('description', e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Project Attributes */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-medium text-gray-900">Project Attributes</h2>
                <span className="text-sm text-gray-500">(optional)</span>
                <div className="group relative">
                  <HelpCircle className="h-5 w-5 text-gray-400" />
                  <div className="hidden group-hover:block absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 w-64 p-2 bg-gray-900 text-white text-sm rounded-lg">
                    Common attributes for all cables in the project. If a cable will have different reqs., it can still be modified when creating a drawing job.
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Operating Temperature Range
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      placeholder="Min"
                      value={formData.attributes.temperatureRange?.min}
                      onChange={(e) => handleAttributeChange('temperatureRange', {
                        ...formData.attributes.temperatureRange,
                        min: e.target.value,
                      })}
                      className="w-24 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <span>-</span>
                    <input
                      type="number"
                      placeholder="Max"
                      value={formData.attributes.temperatureRange?.max}
                      onChange={(e) => handleAttributeChange('temperatureRange', {
                        ...formData.attributes.temperatureRange,
                        max: e.target.value,
                      })}
                      className="w-24 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <select
                      value={formData.attributes.temperatureRange?.unit}
                      onChange={(e) => handleAttributeChange('temperatureRange', {
                        ...formData.attributes.temperatureRange,
                        unit: e.target.value as 'C' | 'F',
                      })}
                      className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="C">Celsius</option>
                      <option value="F">Fahrenheit</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    IP Rating
                  </label>
                  <div className="flex items-center gap-1">
                    <span className="text-gray-700">IP</span>
                    <input
                      type="text"
                      value={formData.attributes.ipRating}
                      onChange={(e) => handleAttributeChange('ipRating', e.target.value)}
                      className="w-20 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Positive Locking
                  </label>
                  <input
                    type="text"
                    value={formData.attributes.positiveLocking}
                    onChange={(e) => handleAttributeChange('positiveLocking', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Shielding
                  </label>
                  <input
                    type="text"
                    value={formData.attributes.shielding}
                    onChange={(e) => handleAttributeChange('shielding', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t">
              <button
                type="button"
                onClick={handleClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
              >
                Create Project
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};