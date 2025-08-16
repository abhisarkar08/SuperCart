import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom'
import {Store} from './Store/Store.jsx'
import {Provider} from 'react-redux'
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById('root')).render(
    <Provider store={Store}>
        <BrowserRouter>
            <App/>
            <ToastContainer/>
        </BrowserRouter>
    </Provider>
)
