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

      <div className="menu-grid">
        <MenuCard
          icon={FaBell}
          title="Notification"
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
          onClick={() => navigate("/check-attendance")}
        />
      </div>
    </div>
  )
}

export default MainMenu_Officer