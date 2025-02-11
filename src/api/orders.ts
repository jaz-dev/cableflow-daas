const BASE_URL = `${import.meta.env.VITE_CABLEFLOW_API_URL}/api/orders`;

export const ordersApi = {
  getAuthHeaders: async (token: string) => {
    return {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
  },

  getOrders: async (token: string) => {
    const headers = await ordersApi.getAuthHeaders(token);
    const response = await fetch(`${BASE_URL}`, { headers });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  },
}