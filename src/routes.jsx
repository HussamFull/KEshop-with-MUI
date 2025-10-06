import { createBrowserRouter } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import DashboardLayout from './layout/Dashboard/DashboardLayout';

import Home from './pages/Home/Home'; // Assuming you have a Home component
import Register from './pages/register/Register';
import Login from './pages/login/Login';
import Cart from './pages/cart/Cart';
import Category from './pages/category/Category';
import Product from './pages/product/Product';
import ProductDetails from './pages/Product/ProductDetails';
import Brand from './pages/brand/Brand';
import ForgotPassword from './pages/auth/ForgotPassword';

import NotFound from './pages/NotFound';

import Dashboard from "./pages/admin/Dashboard";
import Categories from "./pages/admin/Categories";
import Brands from "./pages/admin/Brands";
import Products from "./pages/admin/Products";
import Users from "./pages/admin/Users";
import ResetPassword from './pages/auth/ResetPassword';
import Checkout from './pages/checkout/Checkout';
import Profile from './pages/profile/Profile';
import Info from './pages/profile/Info.jsx';
import Orders from './pages/profile/Orders';
//import PaymentSuccess from './pages/checkout/PaymentSuccess';






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
                path: "/ForgotPassword",
                element: <ForgotPassword />,
            },

             {
                path: "/ResetPassword",
                element: <ResetPassword />,
            },

 {
                path: "/Checkout",
                element: <Checkout />,
            },
            
            /*  {
                path: path="/CheckOut/success/:orderId",
                element: <PaymentSuccess />,
            },  */

            
            {
                path: "/Cart",
                element: <Cart />,
            },
             {
                path: "/category",
                element: <Category />,
            },
            {
                path: "/Brand",
                element: <Brand />,
            },
            {
                path: "/product",
                element: <Product />,
            },
             {
                path: "/product/:id",
                element: <ProductDetails />,
            },
              {
                path: "/profile",
                element: <Profile />,
                children: [
                  {
                    index: true,
                    element: <Info />,
                  },
                  {
                    path: "orders",
                    element: <Orders />,
                  }
                ]

            }
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
