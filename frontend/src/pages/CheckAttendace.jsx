import { useState } from 'react'
import TopBar from '../components/TopBar'
import { checkAttendance } from '../api/attendance'
import '../styles/Attendance.css'

function CheckAttendance() {
  const [date, setDate] = useState('')
  const [data, setData] = useState({})
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)
  const today = new Date()
  const yyyy = today.getFullYear()
  const mm = String(today.getMonth() + 1).padStart(2, '0')
  const dd = String(today.getDate()).padStart(2, '0')

const maxDate = `${yyyy}-${mm}-${dd}`
  const handleSearch = async () => {
    if (!date) {
      alert("Please select a date")
      return
    }

    setLoading(true)
    setSearched(false)

    try {
      const res = await checkAttendance( date )
      setData(res)
      setSearched(true)
    } catch (err) {
      console.error(err)
      setData({})
      setSearched(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="menu-page">
      <TopBar />

      <header className="app-page-heading">
        <h1 className="page-title">Check Attendance</h1>
        <p className="page-description">Choose a date to view attendance records.</p>
      </header>

      <div className="attendance-container">

        {/* DATE SELECTOR */}
        <div className="date-box">
          <input
            type="date"
            value={date}
            max={maxDate}
            onChange={(e) => setDate(e.target.value)}
          />

          <button onClick={handleSearch}>
            Search
          </button>
        </div>

        {/* LOADING */}
        {loading && <p>Loading...</p>}

        {/* RESULTS */}
        {!loading && searched && Object.keys(data).length === 0 && (
  <p className="no-record">
    No attendance record found
  </p>
)}

{!loading && Object.keys(data).length > 0 && (
  Object.keys(data).map((squadId) => (
    <div key={squadId} className="squad-card">

      <div className="squad-header">
        <span>
          {squadId === "no_squad"
            ? "No Squad"
            : `Squad ${squadId}`}
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
  ))
)}

      </div>
    </div>
  )
}

export default CheckAttendance
