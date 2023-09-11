import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Cafe from "./pages/Cafe";
import RootLayout from "./pages/Root";
import Employees from "./pages/Employees";
import ErrorPage from "./pages/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <Cafe /> },
      {
        path: "/employees",
        element: <Employees />,
        children: [{ path: "/employees/:id", element: <Employees /> }],
      },
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
