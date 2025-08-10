// import './App.css'
import './styles/globals.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import Login from './pages/login/Login'
import SignUp from './pages/signup/SignUp'
import Dashboard from './pages/dashboard/Dashboard'
import { Navbar } from './components/NavBar'
import { SuperTokensWrapper } from 'supertokens-auth-react'
import initializeSuperTokens from './lib/superTokens';
import { ToastContainer } from 'react-toastify';
import { logout } from './lib/utils'
import { useState } from 'react'


function App() {
  initializeSuperTokens();
  const [searchQuery, setSearchQuery] = useState<string>("");
  async function reciveSearch(searchQuery: string) {
    setSearchQuery(searchQuery);
  }
  return (
    <SuperTokensWrapper>
      <BrowserRouter>
        <Navbar brandName='Notes' onLogout={logout} onSearch={reciveSearch} />
        <Routes>
          <Route index element={<Login />} />
          <Route path='/signUp' element={<SignUp />} />
          <Route path='/dashboard' element={<Dashboard search={searchQuery} />} />
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </SuperTokensWrapper>
  )
}

export default App
