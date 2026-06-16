import { useEffect, useState } from 'react'
import TopBar from '../components/TopBar'
import { showMemberBySquad, submitAttendance } from '../api/attendance'
import '../styles/Attendance.css'
import SubmitButton from "../components/SubmitButton";
import { useNavigate } from "react-router-dom";

function Attendance() {
  const [data, setData] = useState({})
  const [pageLoading, setPageLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [openSquad, setOpenSquad] = useState(null)
  const [attendance, setAttendance] = useState({})
  const navigate = useNavigate();
  

  useEffect(() => {
    const fetchData = async () => {
      const res = await showMemberBySquad();
      setData(res);
      setPageLoading(false);
    };
  
    fetchData();
  }, []);

  const handleToggle = (memberId) => {
    setAttendance((prev) => ({
      ...prev,
      [memberId]: !prev[memberId]
    }))
  }

  const handleSubmit = async () => {
    setSubmitting(true);
  
    try {
      const payload = Object.keys(data).flatMap((squadId) =>
        data[squadId].map((member) => ({
          memberId: member.id,
          status: attendance[member.id] ? "Present" : "Absent"
        }))
      );
  
      const res = await submitAttendance(payload);
  
      alert(res.message);
      navigate("/nco-menu");
  
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  if (pageLoading) return <div>Loading...</div>

  return (
    <div className="menu-page">
      <TopBar />

      <div className="attendance-container">
        {Object.keys(data).map((squadId) => (
          <div key={squadId} className="squad-card">
            
            {/* HEADER */}
            <div
              className="squad-header"
              onClick={() =>
                setOpenSquad(openSquad === squadId ? null : squadId)
              }
            >
              <span>Squad {squadId}</span>
              <span className={`arrow ${openSquad === squadId ? 'open' : ''}`}>
                ▶
              </span>
            </div>

            {/* CONTENT */}
            {openSquad === squadId && (
              <div className="member-list">
                {data[squadId].map((member) => (
                  <div key={member.id} className="member-item">
                  <label className="checkbox-label">
                    <span>
                      {member.firstName} {member.lastName}
                    </span>
                
                    <input
                      type="checkbox"
                      checked={attendance[member.id] || false}
                      onChange={() => handleToggle(member.id)}
                    />
                  </label>
                </div>
                ))}
              </div>
            )}

          </div>
        ))}
      </div>
      <div className="submit-container">
  
        <SubmitButton onClick={handleSubmit} loading={submitting}>
          Submit Attendance
        </SubmitButton>
      </div>
    </div>
  )
}

export default Attendance