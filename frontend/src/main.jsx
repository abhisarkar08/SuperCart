import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Store } from './Store/Store.jsx'
import { Provider } from 'react-redux'
import { ToastContainer } from "react-toastify";

const isHosted = window.location.hostname !== "localhost";

if (isHosted) {
  // Products
  if (!localStorage.getItem("products")) {
    const defaultProducts = [ 
      /* db.json ke products array ka content yahan paste karo */ 
    ];
    localStorage.setItem("products", JSON.stringify(defaultProducts));
  }

  // Users
  if (!localStorage.getItem("users")) {
    localStorage.setItem("users", JSON.stringify([]));
  }

  // Orders
  if (!localStorage.getItem("orders")) {
    localStorage.setItem("orders", JSON.stringify([]));
  }

  // Current logged in user
  if (!localStorage.getItem("user")) {
    localStorage.setItem("user", JSON.stringify(null));
  }
}

createRoot(document.getElementById('root')).render(
    <Provider store={Store}>
        <BrowserRouter>
            <App />
            <ToastContainer />
        </BrowserRouter>
    </Provider>
)
