import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login.jsx";
import SignUp from "./pages/SignUp.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import MainMenu from "./pages/MainMenu.jsx";
import MainMenu_NCO from "./pages/MainMenu_NCO.jsx";
import MainMenu_Officer from "./pages/MainMenu_Officer.jsx";
import ShowInventory from "./pages/ShowInventory.jsx";
import Attendance from "./pages/Attendance.jsx";
import InventoryHistory from "./pages/InventoryHistory.jsx";

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

        <Route path="/inventory" element={<AppLayout><ShowInventory /></AppLayout>} />

        <Route path="/nco-menu" element={<AppLayout><MainMenu_NCO /></AppLayout>} />

        <Route path="/officer-menu" element={<AppLayout><MainMenu_Officer /></AppLayout>} />

        <Route path="/attendance" element={<AppLayout><Attendance /></AppLayout>} />

        <Route path="/inventory-history" element={<AppLayout><InventoryHistory /></AppLayout>} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;