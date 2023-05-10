// import logo from './logo.svg';
// import './App.css';
// import React, { useState, useEffect } from 'react';
// import SideBar from './components/SideBar';
// import Dashboard from './components/Dashboard';
// import Account from './components/Account';
// import AnimalInput from './components/Dairy/AnimalInput';
// import { Route,Routes, useNavigate} from 'react-router-dom';
// import AuthProvider from './components/AuthContext';
// import Login from './components/Login';
// import Signup from './components/Signup';


// function App() {
//   const isLoggedIn = sessionStorage.getItem('jwtToken') ? true : false;
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // check if the user is authenticated
//     if (!isLoggedIn) {
//       navigate('/login');
//     } else {
//       setLoading(false);
//     }
//   }, [isLoggedIn, navigate]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <AuthProvider>
//       <div className="flex flex-row">
//         <Routes className="flex flex-col w-full">
//           <Route path="/login" element={<Login />} />
//           <Route path="/signup" element={<Signup />} />
//           <Route path="/" element={<AuthenticatedRoutes />} />
//         </Routes>
//       </div>
//     </AuthProvider>
//   );
// }

// function AuthenticatedRoutes() {
//   return (
//     <>
//       <SideBar />
//       <div className="flex flex-col w-full">
//         <Routes className="flex flex-col w-full">
//           <Route path="/" element={<Dashboard />} />
//           <Route path="/account" element={<Account />} />
//           <Route path="/input" element={<AnimalInput />} />
//         </Routes>
//       </div>
//     </>
//   );
// }

// export default App;