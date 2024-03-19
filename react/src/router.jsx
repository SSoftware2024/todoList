import { createBrowserRouter} from "react-router-dom";

import CardLayout from '@/layout/CardLayout.jsx';
import Login from '@/pages/auth/Login.jsx';
import Register from '@/pages/auth/Register.jsx';
import RecoverPassword from "./pages/auth/RecoverPassword.jsx";
import Task from "./pages/Task.jsx";

import App from './App.jsx'



const router = createBrowserRouter([
    {
        path: "/",
        element: <App></App>,
    },
    {
        path: "/auth/",
        element: <CardLayout></CardLayout>,
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
            },
            {
                path: "toDo/",
                element: <Task></Task>,
            },
        ]
    },

]);

export default router;