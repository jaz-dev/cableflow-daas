import { create } from 'zustand';

export interface Project {
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
    positiveLocking?: 'Yes' | 'No';
    shielding?: 'Yes' | 'No';
  };
}

interface ProjectStore {
  projects: Project[];
  setProjects: (projects: Project[]) => void;
  addProject: (project: Project) => void;
  updateProject: (projectId: string, updates: Partial<Project>) => void;
  deleteProject: (projectId: string) => void;
}

const sampleProjects: Project[] = [
  {
    id: '1',
    name: 'Liquid Handling Robot',
    description: 'Pipetting Gantry Robot for Automated Assay Sample Prep',
    createdAt: '2024-11-03',
    attributes: {
      temperatureRange: { min: '0', max: '35', unit: 'C' },
      ipRating: '21',
      positiveLocking: 'Yes',
      shielding: 'No',
    },
  },
  {
    id: '2',
    name: '3D Printer',
    description: 'FDM 3D Printer',
    createdAt: '2024-09-18',
    attributes: {
      temperatureRange: { min: '0', max: '35', unit: 'C' },
      ipRating: '21',
      positiveLocking: 'Yes',
      shielding: 'No',
    },
  },
  {
    id: '3',
    name: 'Autonomous Vegetable Harvesting Robot',
    description: 'Multi-Axis Robot Arm with Drive Stage for Harvesting Veggies in Greenhouses',
    createdAt: '2024-06-15',
    attributes: {
      temperatureRange: { min: '-5', max: '55', unit: 'C' },
      ipRating: '45',
      positiveLocking: 'Yes',
      shielding: 'No',
    },
  },
];

export const useProjectStore = create<ProjectStore>((set) => ({
  projects: sampleProjects,
  setProjects: (projects) => set({ projects }),
  addProject: (project) => set((state) => ({ 
    projects: [...state.projects, project] 
  })),
  updateProject: (projectId, updates) => set((state) => ({
    projects: state.projects.map((project) =>
      project.id === projectId ? { ...project, ...updates } : project
    ),
  })),
  deleteProject: (projectId) => set((state) => ({
    projects: state.projects.filter((project) => project.id !== projectId),
  })),
}));