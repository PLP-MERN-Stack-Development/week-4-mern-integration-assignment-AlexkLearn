import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      window.location = '/login';
    }
    return Promise.reject(error);
  }
);

export const postService = {
  getAll: () => API.get('/posts'),
  getBySlug: (slug) => API.get(`/posts/${slug}`),
  create: (postData) => API.post('/posts', postData),
  update: (slug, postData) => API.patch(`/posts/${slug}`, postData),
  delete: (slug) => API.delete(`/posts/${slug}`),
  getMyPosts: () => API.get('/posts/user/me'),
};

export const authService = {
  register: (userData) => API.post('/auth/register', userData),
  login: (credentials) => API.post('/auth/login', credentials),
  getMe: () => API.get('/auth/me'),
  logout: () => API.post('/auth/logout'),
  updateProfile: (userData) => API.put('/auth/update', userData),
  updatePassword: (passwordData) => API.put('/auth/update-password', passwordData),
};

export default API;