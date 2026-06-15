import TopBar from '../components/TopBar'
import MenuCard from '../components/MenuCard'
import { useNavigate } from "react-router-dom";

import { FaBell, FaBoxOpen, FaClipboardCheck } from 'react-icons/fa'

function MainMenu_NCO() {
  const navigate = useNavigate();

  return (
    <div className="menu-page">
      <TopBar />

      <div className="menu-grid">
        <MenuCard icon={FaBell} title="Notification" />

        <MenuCard icon={FaBoxOpen} title="Order Inventory" onClick={() => navigate("/inventory")}/>

        <MenuCard icon={FaClipboardCheck} title="Attendance" onClick={() => navigate("/attendance")}/>
      </div>
    </div>
  )
}

export default MainMenu_NCO