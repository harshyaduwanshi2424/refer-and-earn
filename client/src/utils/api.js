import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    // Add authorization header if needed
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Handle specific error cases
      switch (error.response.status) {
        case 401:
          // Handle unauthorized
          localStorage.removeItem('token');
          window.location.href = '/login';
          break;
        case 403:
          // Handle forbidden
          console.error('Access forbidden');
          break;
        case 404:
          // Handle not found
          console.error('Resource not found');
          break;
        case 500:
          // Handle server error
          console.error('Server error');
          break;
        default:
          console.error('An error occurred');
      }
    }
    return Promise.reject(error);
  }
);

// API endpoints
export const endpoints = {
  // Referrals
  createReferral: (data) => api.post('/api/referrals', data),
  getReferralsByEmail: (email) => api.get(`/api/referrals/referrer/${email}`),
  getReferralStats: (email) => api.get(`/api/referrals/stats/${email}`),
  updateReferralStatus: (id, status) => api.patch(`/api/referrals/${id}/status`, { status }),

  // Courses
  getAllCourses: () => api.get('/api/courses'),
  getCourse: (id) => api.get(`/api/courses/${id}`),
  getCourseStats: () => api.get('/api/courses/stats/referrals'),

  // Rewards
  getAllRewards: () => api.get('/api/rewards'),
  calculateRewards: (email) => api.get(`/api/rewards/calculate/${email}`),
};

export default api;
