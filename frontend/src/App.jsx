import { useState } from 'react'
import MainPage from './MainPage.jsx'
import SignUp from './SignUp.jsx'

function App() {
  const [page, setPage] = useState('login')

  if (page === 'signup') {
    return <SignUp onLogin={() => setPage('login')} />
  }

  return <MainPage onSignup={() => setPage('signup')} />
}

export default App
