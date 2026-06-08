import TopBar from '../components/TopBar'
import MenuCard from '../components/MenuCard'

import { FaBell, FaBoxOpen, FaGraduationCap } from 'react-icons/fa'

function MainMenu() {
  return (
    <div className="menu-page">
      <TopBar />

      <div className="menu-grid">
        <MenuCard icon={FaBell} title="Notification" />
        <MenuCard icon={FaBoxOpen} title="Order Inventory" />
        <MenuCard icon={FaGraduationCap} title="Select Award Class" />
      </div>
    </div>
  )
}

export default MainMenu