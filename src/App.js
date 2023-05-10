import React, { useState, useEffect } from 'react';
import SideBar from './components/SideBar';
import Dashboard from './components/Dashboard';
import Account from './components/Account';
import AnimalInput from './components/Dairy/AnimalInput';
import { Route,Routes, useNavigate} from 'react-router-dom';
import AuthProvider from './components/AuthContext';
import Login from './components/Login';
import Signup from './components/Signup';
import Dairy from './components/Dairy';

function App() {
  const isLoggedIn = sessionStorage.getItem('jwtToken') ? true : false;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const pathname = window.location.pathname;
  
    // check if the user is authenticated, except for the signup page
    if (isLoggedIn && pathname !== '/signup') {
      setLoading(false);
    } else if (!isLoggedIn && pathname !== '/login' && pathname !== '/signup') {
      navigate('/login');
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [isLoggedIn, navigate]);
  const [navVisible, showNavbar] = useState(false);

  return (
    <AuthProvider>
      <div className="App">
				
        <Routes className="flex flex-col w-full">
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={[	<SideBar visible={ navVisible } show={ showNavbar } />,<Dashboard />]} />
          <Route path="/account" element={[	<SideBar visible={ navVisible } show={ showNavbar } />,<Account />]} />
          <Route path="/input" element={[	<SideBar visible={ navVisible } show={ showNavbar } />,<AnimalInput />]} />
          <Route path="/dairy" element={[	<SideBar visible={ navVisible } show={ showNavbar } />,<Dairy />]} />
        </Routes>
      </div>
    </AuthProvider>
  );
}

function AuthenticatedRoutes() {
  return (
    <>

     
      <div className="flex flex-col w-full">
        <Routes className="flex flex-col w-full">
          <Route path="/" element={<Dashboard />} /> 
          <Route path="/account" element={<Account />} />
          <Route path="/input" element={<AnimalInput />} />
        </Routes>
      </div>
    </>
  );
}

export default App;