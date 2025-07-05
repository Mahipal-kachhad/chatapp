import { Route, Routes } from "react-router-dom";
import "./App.css";
import LoginPage from "./components/LoginPage";
import Register from "./components/Register";
import { Toaster } from "react-hot-toast";
import Dashboard from "./components/dashboard";

function App() {
  return (
    <div className="h-screen w-full bg-gray-200 overflow-hidden">
      <div className="max-w-7xl mx-auto h-screen">
        <Routes>
          <Route path="/" element={<LoginPage/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
        </Routes>
      </div>
      <Toaster position="top-center" reverseOrder={false}/>  
    </div>

  );
}

export default App;
