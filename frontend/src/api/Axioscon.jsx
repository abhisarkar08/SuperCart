// import axios from "axios";

// const instance = axios.create({
//   baseURL: import.meta.env.VITE_API_URL,
// });

// export default instance;


import axios from "axios";

// Remove trailing slash from env var if present; fallback to relative /api
const baseURL = import.meta.env.VITE_API_URL
  ? import.meta.env.VITE_API_URL.replace(/\/$/, "")
  : "/api";

const instance = axios.create({
  baseURL,  
  headers: { "Content-Type": "application/json" }
});

export default instance;
