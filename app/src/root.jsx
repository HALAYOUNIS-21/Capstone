import { createBrowserRouter } from "react-router-dom";
import Root, { ErrorBoundary as RootErrorBoundary } from "./root";
import Home from "./pages/Home";
import Quiz from "./pages/Quiz";
import Results from "./pages/Results";
import NotFound from "./pages/NotFound";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // Root layout
    errorElement: <AppErrorBoundary />, // Global error boundary
    children: [
      {
        path: "/", // Home route
        element: <Home />,
        loader: async () => {
          // Example loader for Home page
          return { title: "Welcome to the Quiz App" };
        },
      },
      {
        path: "/quiz", // Quiz route
        element: <Quiz />,
        loader: async () => {
          // Example loader for Quiz page
          return { questions: [] }; // Replace with actual quiz question data
        },
      },
      {
        path: "/results", // Results route
        element: <Results />,
        loader: async () => {
          // Example loader for Results page
          return { score: 85 }; // Replace with actual results data
        },
      },
      {
        path: "*", // Catch-all route for 404
        element: <NotFound />,
      },
    ],
  },
]);


const Routes = () => <RouterProvider router={router} />;
export default Routes;