import axios from 'axios';

const BACKEND_API_URL = 'https://fashion-retail-hackathon.onrender.com';

/**
 * Trigger a virtual try-on prediction via the local Express backend.
 *
 * @param {string} userImage – base64 data URI of the person photo
 * @param {string} clothImage – base64 data URI of the clothing item
 * @param {string} category – 'upper_body' | 'lower_body' | 'dresses'
 * @returns {Promise<string>} – URL of the result image
 */
export async function generateTryOn(userImage, clothImage, category = 'upper_body') {
  try {
    const response = await axios.post(BACKEND_API_URL, {
      userImage,
      clothImage,
      category,
    });

    if (response.data && response.data.resultUrl) {
      return response.data.resultUrl;
    }

    throw new Error('No result image returned from backend.');
  } catch (err) {
    if (err.response && err.response.data && err.response.data.error) {
      throw new Error(err.response.data.error);
    }
    throw new Error('Failed to connect to backend server. Make sure it is running on port 3000.');
  }
}
