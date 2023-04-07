import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import ProtectedPage from "./components/ProtectedPage";
import ProfileUpdate from "./pages/ProfileUpdate";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedPage>
            <Home />
          </ProtectedPage>
        ),
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/profile/:username",
        element: <Profile />,
      },
      {
        path: "/update-profile",
        element: (
          <ProtectedPage>
            <ProfileUpdate />
          </ProtectedPage>
        ),
      },
    ],
  },
]);

function App() {
  return (
    <div className="app">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
