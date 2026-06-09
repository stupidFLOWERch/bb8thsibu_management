import './Card.css'

function MenuCard({ icon: Icon, title, onClick }) {

    return (
      <div className="menu-card" onClick={onClick}>
        <Icon className="menu-icon" />
        <h3>{title}</h3>
      </div>
    )
  }
  
  export default MenuCard