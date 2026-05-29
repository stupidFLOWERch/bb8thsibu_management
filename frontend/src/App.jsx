import { useState } from 'react'
import MainPage from './pages/MainPage.jsx'
import SignUp from './pages/SignUp.jsx'

function App() {
  const [page, setPage] = useState('login')

  if (page === 'signup') {
    return <SignUp onLogin={() => setPage('login')} />
  }

  // if (page === 'forgot'){
  //   return <ForgotPasswordPage onLogin={() => setPage('login')} />
  // }

  return (
    <MainPage
    onSignup={() => setPage('signup')}
    // onForgot={() => setPage('forgot')}
  />
  )
    
}

export default App
