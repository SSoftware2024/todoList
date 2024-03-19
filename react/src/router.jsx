import { createBrowserRouter} from "react-router-dom";

import AuthLayout from '@/layout/AuthLayout.jsx';
import Login from '@/pages/auth/Login.jsx';
import Register from '@/pages/auth/Register.jsx';
import RecoverPassword from "./pages/auth/RecoverPassword.jsx";


import App from './App.jsx'
import TaskLayout from "./layout/TaskLayout.jsx";
import Task from "./pages/Task.jsx";


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
            },
            {
                path: "recover_password",
                element: <RecoverPassword></RecoverPassword>,
            }
        ]
    },
    {
        path: "/toDo/",
        element: <TaskLayout></TaskLayout>,
        children: [
            {
                path: "/toDo/",
                element: <Task></Task>,
            },
        ]
    }

]);

export default router;