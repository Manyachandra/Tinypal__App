import axios from 'axios';
import { API_BASE_URL, API_ENDPOINTS, DEFAULT_REQUEST_BODY } from '../constants/config';

/**
 * Fetch personalized answers including DYK and Flash cards
 */
export const fetchP13nAnswers = async () => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}${API_ENDPOINTS.P13N_ANSWERS}`,
      DEFAULT_REQUEST_BODY,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching P13N answers:', error);
    throw error;
  }
};

/**
 * Activate Tinu bottom sheet with context
 * @param {string} context - Context type (e.g., 'flash_card', 'dyk')
 * @param {string} topic - Topic identifier
 */
export const activateTinu = async (context, topic) => {
  try {
    const requestBody = {
      child_id: 'EXAMPLECHILD',
      context: context,
      module_id: '1',
      topic: topic,
    };
    
    const response = await axios.post(
      `${API_BASE_URL}${API_ENDPOINTS.ACTIVATE_TINU}`,
      requestBody,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error activating Tinu:', error);
    throw error;
  }
};

