import { CableStatus } from "../types/cable";

interface CableFormData {
  cable_name: string;
  cable_description?: string;
  email?: string;
  delivery_date?: string;
  quantities: string;
  additional_info?: string;
  status?: CableStatus;
  files: {
    drawing?: File;
    bom?: File;
    from_to?: File;
  };
}

export type NewCable = CableFormData;

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

  create: async (cable: CableFormData, token?: string | null) => {    
    // Create FormData to handle file uploads
    const formData = new FormData();
    
    // Add JSON data
    formData.append('data', JSON.stringify({
      cable_name: cable.cable_name,
      status: cable.status,
      cable_description: cable.cable_description,
      email: cable.email,
      delivery_date: cable.delivery_date,
      quantities: cable.quantities,
      additional_info: cable.additional_info,
    }));
    
    // Add files if they exist
    if (cable.files.drawing) {
      formData.append('drawing', cable.files.drawing);
    }
    if (cable.files.bom) {
      formData.append('bom', cable.files.bom);
    }
    if (cable.files.from_to) {
      formData.append('from_to', cable.files.from_to);
    }
    
    const headers: HeadersInit = {};
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: headers,
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  },

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