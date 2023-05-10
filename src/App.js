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
    // check if the user is authenticated
    if (!isLoggedIn) {
      navigate('/login');
      
    } else {
      setLoading(false);
    }
  }, [isLoggedIn, navigate]);

  return (
    <AuthProvider>
      <div className="flex flex-row">
        <Routes className="flex flex-col w-full">
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={[<SideBar/>,<Dashboard />]} />
          <Route path="/account" element={[<SideBar/>,<Account />]} />
          <Route path="/input" element={[<SideBar/>,<AnimalInput />]} />
          <Route path="/dairy" element={[<SideBar/>,<Dairy />]} />
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