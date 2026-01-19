// API base URL - uses environment variable in production, proxy in development
const API_BASE_URL = process.env.REACT_APP_API_URL || '';

export default API_BASE_URL;
