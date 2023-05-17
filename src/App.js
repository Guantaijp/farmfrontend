import React, { useState, useEffect } from 'react';
import SideBar from './components/SideBar';
import Dashboard from './components/Dashboard';
import Account from './components/Account';
import AnimalTable from './components/Dairy/AnimalTable';
import { Route,Routes, useNavigate} from 'react-router-dom';
import AuthProvider from './components/AuthContext';
import Login from './components/logins/Login';
import Signup from './components/logins/Signup';
import Dairy from './components/Dairy/Dairy';


function App() {

  const [cow, setCow] = useState([]);
  const [milk, setMilk] = useState([]);
  const [cost, setCost] = useState([]);
  const [sell, setSell] = useState([]);
  const [price, setPrice] = useState([]);

  // fetching the cow/animal data
  useEffect(() => {
    fetch('http://localhost:3000/cows')
      .then((res) => res.json())
      .then((data) => {
        setCow(data);
      });
  }, []);

  // fetching the milk data
  useEffect(() => {
    fetch('http://localhost:3000/milks')
      .then((res) => res.json())
      .then((data) => {
        setMilk(data);
      });
  }, []);

  // fetching the cost data
  useEffect(() => {
    fetch('http://localhost:3000/costs')
      .then((res) => res.json())
      .then((data) => {
        setCost(data);
      });
  }, []);

  // fetching the sell data
  useEffect(() => {
    fetch('http://localhost:3000/sells')
      .then((res) => res.json())
      .then((data) => {
        setSell(data);
      });
  }, []);

  // fetching the price data
  useEffect(() => {
    fetch('http://localhost:3000/prices')
      .then((res) => res.json())
      .then((data) => {
        setPrice(data);
      });
  }, []);






  const isLoggedIn = sessionStorage.getItem('jwtToken') ? true : false;
  const navigate = useNavigate();
  // eslint-disable-next-line no-unused-vars
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
				
        <Routes className="">
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={[<SideBar visible={ navVisible } show={ showNavbar } />,<Dashboard /> ]} />
          <Route path="/account" element={[	<SideBar visible={ navVisible } show={ showNavbar } />,<Account cow={cow} setCow={setCow} price={price} setprice/>]} />
          <Route path="/input" element={[	<SideBar visible={ navVisible } show={ showNavbar } />,<AnimalTable />]} />
          <Route path="/dairy" element={[	<SideBar visible={ navVisible } show={ showNavbar } />,<Dairy cow={cow} setCow={setCow} />]} />

        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;