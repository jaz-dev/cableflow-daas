const BASE_URL = `${import.meta.env.VITE_CABLEFLOW_API_URL}/api/cables`;

export const cablesApi = {

  getAuthHeaders: async (token: string) => {
    return {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
  },

  fetchAll: async (token: string) => {
    const headers = await cablesApi.getAuthHeaders(token);
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


//   update: async (projectId: string, updates: Partial<Project>, token: string) => {
//     const headers = await projectsApi.getAuthHeaders(token);
//     const response = await fetch(`${BASE_URL}/${projectId}`, {
//       method: 'PUT',
//       headers,
//       body: JSON.stringify(updates),
//     });

//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }

//     return response.json();
//   },

  delete: async (id: string, token: string) => {
    const headers = await cablesApi.getAuthHeaders(token);
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE',
      headers,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  },
};