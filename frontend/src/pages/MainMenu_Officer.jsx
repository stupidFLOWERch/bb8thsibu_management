import TopBar from '../components/TopBar'
import MenuCard from '../components/MenuCard'
import { useNavigate } from "react-router-dom";

import {
  FaBell,
  FaClipboardList,
  FaUserEdit,
  FaBoxes
} from 'react-icons/fa'

function MainMenu_Officer() {
  const navigate = useNavigate();

  return (
    <div className="menu-page">
      <TopBar />

      <header className="app-page-heading">
        <h1 className="page-title">Dashboard</h1>
        <p className="page-description">Manage members, orders, and attendance.</p>
      </header>

      <div className="menu-grid">
        <MenuCard
          icon={FaBell}
          title="Notification"
          onClick={() => navigate("/notification")}
        />

        <MenuCard
          icon={FaBoxes}
          title="Pending Order"
          onClick={() => navigate("/inventory-history")}
        />

        <MenuCard
          icon={FaClipboardList}
          title="Check Attendance"
          onClick={() => navigate("/check-attendance")}
        />

        <MenuCard
          icon={FaUserEdit}
          title="Update Member"
          onClick={() => navigate("/update-member")}
        />

        <MenuCard
          icon={FaUserEdit}
          title="Update Officer"
          onClick={() => navigate("/update-officer")}
        />
      </div>
    </div>
  )
}

export default MainMenu_Officer
