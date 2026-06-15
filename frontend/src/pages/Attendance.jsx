import { useEffect, useState } from 'react'
import TopBar from '../components/TopBar'
import { showMemberBySquad } from '../api/attendance'
import '../styles/Attendance.css'

function Attendance() {
  const [data, setData] = useState({})
  const [loading, setLoading] = useState(true)
  const [openSquad, setOpenSquad] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      const res = await showMemberBySquad()
      setData(res)
      setLoading(false)
    }

    fetchData()
  }, [])

  if (loading) return <div>Loading...</div>

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
                    {member.firstName} {member.lastName}
                  </div>
                ))}
              </div>
            )}

          </div>
        ))}
      </div>
    </div>
  )
}

export default Attendance