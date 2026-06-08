import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login.jsx";
import SignUp from "./pages/SignUp.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import MainMenu from "./pages/MainMenu.jsx";

import AuthLayout from "./layouts/AuthLayout"
import AppLayout from "./layouts/AppLayout"

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<AuthLayout><Login /></AuthLayout>} />

        <Route path="/signup" element={<AuthLayout><SignUp /></AuthLayout>} />

        <Route path="/forgot-password" element={<AuthLayout><ForgotPassword /></AuthLayout>} />

        <Route path="/reset-password/:token" element={<AuthLayout><ResetPassword /></AuthLayout>} />

        <Route path="/menu" element={<AppLayout><MainMenu /></AppLayout>} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;