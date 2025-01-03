import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home"; // Ensure this path points to your Home component

const router = createBrowserRouter([
  {
    path: "/", // Root path
    element: <App />, // Main layout
    children: [
      {
        path: "/", // Home route
        element: <Home />, // Home component
      },
    ],
  },
]);

export default function Root() {
  return <RouterProvider router={router} />;
}