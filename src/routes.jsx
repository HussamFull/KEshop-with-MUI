import { createBrowserRouter } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import DashboardLayout from './layout/Dashboard/DashboardLayout';

import Home from './pages/Home/Home'; // Assuming you have a Home component
import Register from './pages/register/Register';
import Login from './pages/login/Login';
import Cart from './pages/cart/Cart';

import NotFound from './pages/NotFound';

import Dashboard from "./pages/admin/Dashboard";
import Categories from "./pages/admin/Categories";
import Brands from "./pages/admin/Brands";
import Products from "./pages/admin/Products";
import Users from "./pages/admin/Users";



const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {    
                index: true,
                element: <Home />,
            },
            {
                path: "/Register",
                element: <Register />,
            },
             {
                path: "/Login",
                element: <Login />,
            },
            {
                path: "/Cart",
                element: <Cart />,
            },
         ] 
        },
   
    // مسارات الأدمن
  {
    path: "/admin",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "categories",
        element: <Categories />,
      },
      {
        path: "brands",
        element: <Brands />,
      },
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "users",
        element: <Users />,
      },
    ],
  },

  // صفحة 404
  {
    path: "*",
    element: <NotFound />,
  },
]);


export default router;
