import axios from 'axios';

const api = {
  system: axios.create({
    baseURL: process.env.REACT_APP_API_SYSTEM_URL
  }),
  blog: axios.create({
    baseURL: process.env.REACT_APP_API_BLOG_URL
  })
};

export default api;
