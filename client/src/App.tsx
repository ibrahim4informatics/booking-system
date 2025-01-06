
import { Provider } from "@/components/ui/provider";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import HomePage from "./pages/HomePage";
import ErrorPage from "./pages/ErrorPage";
import ForgotPasswordPage from "./pages/auth/ForgotPage";

const routes = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
    errorElement: <ErrorPage />,

  },
  {
    path: "/register",
    element: <RegisterPage />,
    errorElement: <ErrorPage />
  },

  { path: "/", element: <HomePage />, errorElement: <ErrorPage /> },
  {
    path: "/forgot",
    element: <ForgotPasswordPage />,
    errorElement: <ErrorPage />
  },
])

function App() {
  return (
    <Provider>
      <RouterProvider router={routes} />
    </Provider>
  )
}

export default App
