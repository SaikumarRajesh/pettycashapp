
import './App.css'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import PrivateRoute from './privateroute'
import Password from './pages/Resetpassword'

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route>
        <Route index path="/" element={<PrivateRoute element={<Home />} />} />
        <Route path="/register" element={<Register />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/password" element={<Password />}/>
      </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
