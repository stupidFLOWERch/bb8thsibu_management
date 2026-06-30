import './AppLayout.css'
import FloatingChat from '../components/FloatingChat'
// import TopBar from '../components/TopBar'
function AppLayout({ children }) {
    return (
      <div className="app-layout">
        {children}
        <FloatingChat />
      </div>
    )
  }
  
  export default AppLayout