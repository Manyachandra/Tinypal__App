// API Configuration
export const API_BASE_URL = 'https://genai-images-4ea9c0ca90c8.herokuapp.com';

export const API_ENDPOINTS = {
  P13N_ANSWERS: '/p13n_answers',
  ACTIVATE_TINU: '/activate_tinu',
};

// Sample request data
export const DEFAULT_REQUEST_BODY = {
  module_id: '1',
  parent_id: 'EXAMPLEPARENT',
  child_id: 'EXAMPLECHILD',
  responses: [
    {
      question_id: 'q006_tantrums',
      selected_choice_ids: ['choice_b', 'choice_c'],
      open_response_text: '',
      timestamp: '2025-10-14T07:25:31.482Z',
    },
    {
      question_id: 'q009_language_dev',
      selected_choice_ids: ['choice_c', 'choice_a'],
      open_response_text: '',
      timestamp: '2025-10-14T07:25:31.482Z',
    },
  ],
};

// Theme colors - Based on Figma Design
export const COLORS = {
  primary: '#E8A5B8', // Pink for DYK cards
  secondary: '#FF9A7B', // Coral for buttons
  tertiary: '#5B8FA3', // Blue for flash cards
  background: '#1A1A2E', // Dark background
  lightBackground: '#F5E6E8', // Light pink background for Tinu
  white: '#FFFFFF',
  text: '#1A1A1A',
  textSecondary: '#6B7280',
  textLight: '#FFFFFF',
  border: '#E5E7EB',
  cardBackground: '#FFFFFF',
  dykCardBg: '#E8A5B8', // Pink for DYK
  flashCardBg: '#5B8FA3', // Blue for Flash cards
  chipBackground: '#FFD5C2',
  chipBlue: '#A8D5E2',
  chipPink: '#FFB4C2',
  chipPeach: '#FFCBA4',
  chipSelected: '#FF9A7B',
  shadow: '#000000',
  tinuBg: '#F5E6E8',
  tinuButton: '#FF9A7B',
  inputBg: '#FFE4D6',
};

