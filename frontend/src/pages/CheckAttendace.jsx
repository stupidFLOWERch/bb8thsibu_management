import { useState } from 'react'
import TopBar from '../components/TopBar'
import { checkAttendance } from '../api/attendance'
import '../styles/Attendance.css'

function CheckAttendance() {
  const [date, setDate] = useState('')
  const [data, setData] = useState({})
  const [loading, setLoading] = useState(false)

  const handleSearch = async () => {
    if (!date) {
      alert("Please select a date")
      return
    }

    setLoading(true)

    try {
      const res = await checkAttendance( date )
      setData(res)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="menu-page">
      <TopBar />

      <div className="attendance-container">

        {/* DATE SELECTOR */}
        <div className="date-box">
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          <button onClick={handleSearch}>
            Search
          </button>
        </div>

        {/* LOADING */}
        {loading && <p>Loading...</p>}

        {/* RESULTS */}
        {!loading && Object.keys(data).map((squadId) => (
          <div key={squadId} className="squad-card">

            <div className="squad-header">
              <span>
                {squadId === "no_squad" ? "No Squad" : `Squad ${squadId}`}
              </span>
            </div>

            <div className="member-list">
              {data[squadId].map((member) => (
                <div key={member.id} className="member-item">
                  <span>
                    {member.firstName} {member.lastName}
                  </span>

                  <span>
                    {member.status}
                  </span>
                </div>
              ))}
            </div>

          </div>
        ))}

      </div>
    </div>
  )
}

export default CheckAttendance