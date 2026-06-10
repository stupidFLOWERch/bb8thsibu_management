import { FaSignOutAlt } from 'react-icons/fa'
import { useNavigate } from "react-router-dom";

function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");

    if (!confirmLogout) return;

    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <button
      type="button"
      className="btn"
      onClick={handleLogout}
      aria-label="Logout"
    >
      <FaSignOutAlt
        className="btn__icon"
        aria-hidden="true"
      />
    </button>
  )
}

export default LogoutButton