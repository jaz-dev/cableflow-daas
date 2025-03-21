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
    const response = await fetch(`${BASE_URL}`, { headers });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  },

  addCartItem: async (token: string, cableId: number, quantity: number, price: number) => {
    const headers = await cartApi.getAuthHeaders(token);
    const response = await fetch(`${BASE_URL}`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ cable_id: cableId, quantity, price }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  },

  deleteCartItem: async (token: string, cartItemId: number) => {
    const headers = await cartApi.getAuthHeaders(token);
    const response = await fetch(`${BASE_URL}/${cartItemId}`, {
      method: 'DELETE',
      headers,
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.status
  },

  getAllocatedHours: async (token: string) => {
    const headers = await cartApi.getAuthHeaders(token);
    const response = await fetch(`${BASE_URL}/allocated-hours`, { headers });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  }
}