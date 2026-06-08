import eighth_sibu_logo from '../assets/8th_sibu_logo.jpg'
import './Logo.css'

function Logo() {
  return (
    <div className="logo">
      <img
        src={eighth_sibu_logo}
        alt="logo"
        width="170"
        height="179"
        className="logo-img"
      />
    </div>
  )
}

export default Logo