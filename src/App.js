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
import DairyTable from './components/Dairy/DairyTable';


function App() {

  const [cow, setCow] = useState([]);
  const [milk, setMilk] = useState([]);
  const [cost, setCost] = useState([]);
  const [sell, setSell] = useState([]);
  const [price, setPrice] = useState([]);
  const [admins, setAdmins] = useState([]);
  // const [monthlySell, setMonthlySell] = useState([]);

  // Get admins
  useEffect(() => {
    fetch('http://localhost:3000/admins')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch admins');
        }
        return res.json();
      })
      .then((data) => {
        setAdmins(data);

      })
      .catch((error) => {
        console.error(error);
        // Handle the error state or display an error message
      });
  }, []);

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

//   // fetching the monthly sell data
//   useEffect(() => {
//     fetch('http://localhost:3000/monthly_sell')
//       .then((res) => res.json())
//       .then((data) => {
//         setMonthlySell(data);
//       });
//   }, []);

//   console.log(monthlySell);
// // 



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
          <Route path="/" element={[<SideBar visible={ navVisible } show={ showNavbar } />,<Dashboard  admins = {admins}/> ]} />
          <Route path="/account" element={[	<SideBar visible={ navVisible } show={ showNavbar } />,<Account cow={cow} setCow={setCow} price={price} admins={admins} setAdmins={setAdmins} />]} />
          <Route path="/input" element={[	<SideBar visible={ navVisible } show={ showNavbar } />,<AnimalTable admins={admins} setAdmins={setAdmins} cost={cost} setCost={setCost} sell={sell} setSell={setSell} />]} />
          <Route path="/dairy" element={[	<SideBar visible={ navVisible } show={ showNavbar } />,<Dairy cow={cow} setCow={setCow} admins={admins} setAdmins={setAdmins} />]} />
          <Route path= "/dairytable" element={[ <SideBar visible={ navVisible } show={ showNavbar } />,<DairyTable cow={cow} setCow={setCow} milk={milk} setMilk={setMilk} cost={cost} setCost={setCost} sell={sell} setSell={setSell} price={price} setPrice={setPrice}admins={admins} setAdmins={setAdmins}  />]} />

        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;