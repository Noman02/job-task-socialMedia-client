import logo from "./logo.svg";
import "./App.css";
import { RouterProvider } from "react-router-dom";
import { routes } from "./Routes/Routes";
import { Toaster } from "react-hot-toast";
import AuthProvider from "./AuthContext";

function App() {
  return (
    <div className="max-w-7xl mx-auto">
      <AuthProvider>
        <RouterProvider router={routes}></RouterProvider>
        <Toaster />
      </AuthProvider>
    </div>
  );
}

export default App;
