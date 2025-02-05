const BASE_URL = `${import.meta.env.VITE_CABLEFLOW_API_URL}/api/cart`;

export const cartApi = {
  getAuthHeaders: async (token: string) => {
    return {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
  },

  getCartItems: async (token: string) => {
    const headers = await cartApi.getAuthHeaders(token);
    const response = await fetch(`${BASE_URL}/cart`, { headers });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  }
}