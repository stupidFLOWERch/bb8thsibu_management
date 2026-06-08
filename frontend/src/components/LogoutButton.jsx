import { FaSignOutAlt } from 'react-icons/fa'
import { useNavigate } from "react-router-dom";

function LogoutButton() {
  const navigate = useNavigate();
  return (
    <button
      type="button"
      className="btn"
      onClick={() => navigate("/")}
      aria-label="Back"
    >
      <FaSignOutAlt
        className="btn__icon"
        aria-hidden="true"
      />
    </button>
  )
}

export default LogoutButton