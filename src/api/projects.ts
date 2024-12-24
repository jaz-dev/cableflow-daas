export interface Project {
  id: string;
  project_name: string;
  project_description?: string;
  created_at: string;
  project_attributes?: {
    temp_range?: {
      min: string;
      max: string;
      unit: 'C' | 'F';
    };
    ip_rating?: string;
    positive_locking?: 'Yes' | 'No';
    shielding?: 'Yes' | 'No';
  };
}

export type NewProject = Omit<Project, 'id' | 'created_at'>;

const BASE_URL = `${import.meta.env.VITE_CABLEFLOW_API_URL}/api/projects`;

export const projectsApi = {
  getAuthHeaders: async (token: string) => {
    return {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
  },

  fetchAll: async (token: string) => {
    const headers = await projectsApi.getAuthHeaders(token);
    const response = await fetch(BASE_URL, { headers });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response.json();
  },

  create: async (project: NewProject, token: string) => {
    const headers = await projectsApi.getAuthHeaders(token);
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers,
      body: JSON.stringify(project),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  },

  update: async (projectId: string, updates: Partial<Project>, token: string) => {
    const headers = await projectsApi.getAuthHeaders(token);
    const response = await fetch(`${BASE_URL}/${projectId}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(updates),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  },

  delete: async (projectId: string, token: string) => {
    const headers = await projectsApi.getAuthHeaders(token);
    const response = await fetch(`${BASE_URL}/${projectId}`, {
      method: 'DELETE',
      headers,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  },
};