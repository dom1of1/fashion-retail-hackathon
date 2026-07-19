import axios from 'axios';

const API_BASE_URL = 'https://api-hackathon.codedematrixtech.com';
const MERCHANT_SLUG = 'mensah';

/**
 * Resolve a relative image path from the API to a full URL.
 */
export function resolveImageUrl(path) {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  return `${API_BASE_URL}${path}`;
}

/**
 * Format price_minor (in pesewas) to human-readable GHS string.
 */
export function formatPrice(priceMinor, currency = 'GHS') {
  const amount = (priceMinor / 100).toFixed(2);
  return `${currency} ${amount}`;
}

export const hackathonApi = {
  getMerchant: async () => {
    const res = await axios.get(`${API_BASE_URL}/merchants/${MERCHANT_SLUG}`);
    return res.data;
  },
  
  getInventory: async () => {
    const res = await axios.get(`${API_BASE_URL}/merchants/${MERCHANT_SLUG}/items`);
    return res.data;
  },
  
  getCampaigns: async () => {
    const res = await axios.get(`${API_BASE_URL}/merchants/${MERCHANT_SLUG}/campaigns`);
    return res.data;
  },

  getItem: async (itemId) => {
    const res = await axios.get(`${API_BASE_URL}/items/${itemId}`);
    return res.data;
  },
  
  createBasket: async (merchantId, items, customerInfo) => {
    // items should be [{ item_id: string, qty: number }]
    const res = await axios.post(`${API_BASE_URL}/baskets`, {
      merchant_id: merchantId,
      items,
      customer_name: customerInfo.name,
      customer_phone: customerInfo.phone,
    });
    return res.data; // returns { id: string }
  },

  getBasket: async (basketId) => {
    const res = await axios.get(`${API_BASE_URL}/baskets/${basketId}`);
    return res.data;
  }
};
