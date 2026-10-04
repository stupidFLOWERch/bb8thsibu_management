import TopBar from '../components/TopBar'
import MenuCard from '../components/MenuCard'
import { useNavigate } from "react-router-dom";

import { FaBell, FaBoxOpen } from 'react-icons/fa'

function MainMenu() {
  const navigate = useNavigate();

  return (
    <div className="menu-page">
      <TopBar />

      <header className="app-page-heading">
        <h1 className="page-title">Dashboard</h1>
        <p className="page-description">Manage your company resources.</p>
      </header>

      <div className="menu-grid">
        <MenuCard icon={FaBell} title="Notification" onClick={() => navigate("/notification")}/>

        <MenuCard icon={FaBoxOpen} title="Order Inventory" onClick={() => navigate("/inventory")}/>
      </div>
    </div>
  )
}

export default MainMenu
