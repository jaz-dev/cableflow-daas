export interface User {
  id: number;
  email: string;
  first_name?: string;
  last_name?: string;
  created_at: string;
  role: string;
}

const BASE_URL = `${import.meta.env.VITE_CABLEFLOW_API_URL}/api/users`;

export const usersApi = {
  getAuthHeaders: async (token: string) => {
    return {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
  },

  fetchUser: async (token: string) => {
    const headers = await usersApi.getAuthHeaders(token);
    const url = `${BASE_URL}/me`;
    const response = await fetch(url, { headers });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  },


  fetchAllUsers: async (token: string) => {
    const headers = await usersApi.getAuthHeaders(token);
    const response = await fetch(BASE_URL, { headers });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response.json();
  },

  // create: async (project: NewProject, token: string) => {
  //   const headers = await projectsApi.getAuthHeaders(token);
  //   const response = await fetch(BASE_URL, {
  //     method: 'POST',
  //     headers,
  //     body: JSON.stringify(project),
  //   });

  //   if (!response.ok) {
  //     throw new Error(`HTTP error! status: ${response.status}`);
  //   }

  //   return response.json();
  // },

  // update: async (projectId: string, updates: Partial<Project>) => {
  //   const headers = await projectsApi.getAuthHeaders();
  //   const response = await fetch(`${BASE_URL}/${projectId}`, {
  //     method: 'PUT',
  //     headers,
  //     body: JSON.stringify(updates),
  //   });

  //   if (!response.ok) {
  //     throw new Error(`HTTP error! status: ${response.status}`);
  //   }

  //   return response.json();
  // },

  // delete: async (projectId: string) => {
  //   const headers = await projectsApi.getAuthHeaders();
  //   const response = await fetch(`${BASE_URL}/${projectId}`, {
  //     method: 'DELETE',
  //     headers,
  //   });

  //   if (!response.ok) {
  //     throw new Error(`HTTP error! status: ${response.status}`);
  //   }
  // },
};