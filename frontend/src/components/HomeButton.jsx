import { useNavigate } from "react-router-dom";
import { FaHome } from 'react-icons/fa'

function HomeButton() {
    const navigate = useNavigate();
    return (
      <button
        type="button"
        className="btn"
        onClick={() => navigate("/menu")}
        aria-label="Back"
      >
        <FaHome
          className="btn__icon"
          aria-hidden="true"
        />
      </button>
    )
  }
  
  export default HomeButton