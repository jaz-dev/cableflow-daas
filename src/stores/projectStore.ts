import { create } from 'zustand';
import { projectsApi, Project, NewProject } from '../api/projects';

interface ProjectStore {
  projects: Project[];
  isLoading: boolean;
  error: string | null;
  fetchProjects: (token: string) => Promise<void>;
  addProject: (project: NewProject, token: string) => Promise<void>;
  updateProject: (projectId: string, updates: Partial<Project>, token: string) => Promise<void>;
  deleteProject: (projectId: string, token: string) => Promise<void>;
}

export const useProjectStore = create<ProjectStore>((set) => ({
  projects: [],
  isLoading: false,
  error: null,

  fetchProjects: async (token) => {
    set({ isLoading: true, error: null });
    try {
      const projects = await projectsApi.fetchAll(token);
      set({ projects, isLoading: false });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
      console.error('Error fetching projects:', error);
    }
  },

  addProject: async (projectData, token) => {
    set({ isLoading: true, error: null });
    try {
      const newProject = await projectsApi.create(projectData, token);
      set((state) => ({
        projects: [...state.projects, newProject],
        isLoading: false,
      }));
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
      console.error('Error adding project:', error);
    }
  },

  updateProject: async (projectId, updates, token) => {
    set({ isLoading: true, error: null });
    try {
      console.log(updates)
      const updatedProject = await projectsApi.update(projectId, updates, token);
      set((state) => ({
        projects: state.projects.map((project) =>
          project.id == projectId ? updatedProject : project
        ),
        isLoading: false,
      }));
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
      console.error('Error updating project:', error);
    }
  },

  deleteProject: async (projectId, token) => {
    set({ isLoading: true, error: null });
    try {
      await projectsApi.delete(projectId, token);
      set((state) => ({
        projects: state.projects.filter((project) => project.id !== projectId),
        isLoading: false,
      }));
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
      console.error('Error deleting project:', error);
    }
  },
}));

export type { Project, NewProject };