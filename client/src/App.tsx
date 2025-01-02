
import {Provider} from "@/components/ui/provider";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";

const routes = createBrowserRouter([
  {
    path:"/login",
    element:<LoginPage/>,
    errorElement:<div>error element</div>,

  },
  {
    path:"/register",
    element:<RegisterPage/>,
    errorElement:<div>error element</div>
  }
])

function App() {
  return (
    <Provider>
      <RouterProvider router={routes} />
    </Provider>
  )
}

export default App
