import './TopBar.css'
import HomeButton from '../components/HomeButton'
import LogoutButton from '../components/LogoutButton'

function TopBar() {

  return (
    <div className="top-bar">
      <div className="top-left">
        8th Sibu Management System
      </div>

      <div className="top-right">
        <HomeButton/>
        <LogoutButton/>
      </div>
    </div>
  )
}

export default TopBar