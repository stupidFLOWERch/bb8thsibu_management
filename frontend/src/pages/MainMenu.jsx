import TopBar from '../components/TopBar'
import MenuCard from '../components/MenuCard'
import { useNavigate } from "react-router-dom";

import { FaBell, FaBoxOpen } from 'react-icons/fa'

function MainMenu() {
  const navigate = useNavigate();

  return (
    <div className="menu-page">
      <TopBar />

      <div className="menu-grid">
        <MenuCard icon={FaBell} title="Notification" onClick={() => navigate("/notification")}/>

        <MenuCard icon={FaBoxOpen} title="Order Inventory" onClick={() => navigate("/inventory")}/>
      </div>
    </div>
  )
}

export default MainMenu