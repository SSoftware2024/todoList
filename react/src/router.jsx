import { createBrowserRouter } from "react-router-dom";

import AuthLayout from '@/layout/AuthLayout.jsx';
import Login from '@/pages/auth/Login.jsx';
import Register from '@/pages/auth/Register.jsx';

import App from './App.jsx'
const router = createBrowserRouter([
    {
        path: "/",
        element: <App></App>,
    },
    {
        path: "/auth/",
        element: <AuthLayout></AuthLayout>,
        children: [
            {
                path: "login",
                element: <Login></Login>,
            },
            {
                path: "register",
                element: <Register></Register>,
            }
        ]
    }

]);

export default router;