import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Kezdolap from './components/Kezdolap';
import Login from './components/Login'
import Regisztracio from './components/Regisztracio';
import { AuthProvider } from './context/Contexts';
import Profile from './components/Profile';
import Cart from './components/Cart';
import { CartProvider } from './context/CartContext';

const router = createBrowserRouter([
  {
    path: "/",
    element: < Kezdolap/>,
  },
  {
    path: "/kezdolap",
    element: < Kezdolap/>,
  },
  {
    path: "/login",
    element: <Login/>
  },
  {
    path: "/registation",
    element: <Regisztracio/>
  },
  {path: "/profile",
    element: <Profile/>
  },
  {path:"/cart",
    element: <Cart/>
  }
  
]);


createRoot(document.getElementById('root')!).render(
  <AuthProvider>
  <StrictMode>
    
      <CartProvider>
    <RouterProvider router={router}></RouterProvider>
    </CartProvider>
    
  </StrictMode>
  </AuthProvider>,
)
