// import axios from "axios";

// const instance = axios.create({
//   baseURL: import.meta.env.VITE_API_URL,
// });

// export default instance;


import axios from "axios";

let baseURL;

// Production (Vercel) → use static products.json
if (import.meta.env.MODE === "production") {
  baseURL = ""; // products.json ko direct fetch karne ke liye
} else {
  // Development → use local backend
  baseURL = import.meta.env.VITE_API_URL
    ? import.meta.env.VITE_API_URL.replace(/\/$/, "")
    : "http://localhost:3000/api";
}

const instance = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" }
});

export default instance;

