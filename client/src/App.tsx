import { Route, Routes } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import Register from "./components/Register";
import { Toaster } from "react-hot-toast";
import Dashboard from "./components/dashboard";

function App() {
  return (
        <div>
          <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      <Toaster position="top-center" reverseOrder={false} />
        </div>
  );
}

export default App;
