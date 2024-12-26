import {RouteObject} from "react-router-dom";
import Home from "../pages/home/Home";
import Dashboard from "../pages/dashboard/Dashboard";
import Chat from "../pages/chat/Chat";
import SignInPage from "../pages/auth/SignIn";
import SignUpPage from "../pages/auth/SignUp";
import RootLayout from "../layouts/RootLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import {ProtectedRoute, AnonymousRoute} from "../routes/ProtectedRoute";

const appRouter: RouteObject[] = [    
    {
      element: <RootLayout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          element: <AnonymousRoute/>,
          children:[
            {
              path: "/sign-in/*",
              element: <SignInPage />,
            },
            {
              path: "/sign-up/*",
              element: <SignUpPage />,
            },
          ]
        },
        {
          element: <ProtectedRoute/>,
          children: [
            {
              path: "/dashboard",
              element: <DashboardLayout />,
              children: [
                { path: "/dashboard", element: <Dashboard /> },
                {
                  path: "/dashboard/chats/:id",
                  element: <Chat />,
                },
              ],
            },
          ]
        }
      ],
    }
 ]

  export default appRouter