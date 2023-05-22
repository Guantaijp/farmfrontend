import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CgProfile } from 'react-icons/cg';
import { AiOutlineLogout } from 'react-icons/ai';
import { BiHomeAlt2 } from 'react-icons/bi';
import { GiCow } from 'react-icons/gi';
import { SiGitea } from 'react-icons/si';
import { useNavigate } from "react-router-dom";
import Profile from './images/images.jpeg';
import { FaBars } from 'react-icons/fa';
import "../App.css"
import { useAdminData } from './AdminData'
import "../App.css"





function SideBar({ visible, show }) {

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };


  const { admin } = useAdminData();

  const navigate = useNavigate();
  const triggerLogout = () => {
    sessionStorage.removeItem("jwtToken");
    sessionStorage.removeItem("user");
    sessionStorage.clear();
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("user");
    localStorage.clear();
    navigate("/login");
  };

  return (
    <>
      <div className="lg:fixed">
        <div className="mobile-nav">
          <button
            className="mobile-nav-btn"
            onClick={() => !show(!visible)}
          >
            <FaBars size={24} />
          </button>
        </div>
        <nav className={visible ? 'navbar' : ''}>
          <div className="flex flex-col m-6 justify-start">
            <div className="flex flex-row">
              {!admin?.image_url ? (
                <img
                  className="rounded-full h-24 w-24 mr-3"
                  src={Profile}
                  alt="profile"
                />
              ) : (
                <img
                  src={admin?.image_url}
                  alt="profile"
                  className="rounded-full h-24 w-24 mr-3"
                />
              )}
              <div className="flex flex-col justify-center">
                <h1 className="text-2xl font-bold">{admin?.name}</h1>
                <p className="text-start">Welcome Back!</p>
              </div>
            </div>
            <hr className="border-gray-400 mt-5 mb-5" />
            <div className="flex flex-col m-2">
              <Link to="/" className="flex flex-row mb-8">
                <BiHomeAlt2 className="text-3xl text-white hover:text-gray-400 mr-2" />
                <h1 className="text-start text-2xl font-bold text-white hover:text-gray-400">
                  Dashboard
                </h1>
              </Link>
              <div className="relative">
                <div className="flex flex-row mb-8" onClick={toggleDropdown}>
                  <GiCow className="text-3xl text-white hover:text-gray-400 mr-2 cursor-pointer" />
                  <h1 className="text-start text-2xl font-bold text-white hover:text-gray-400 cursor-pointer">
                    Dairy Farming
                  </h1>
                  <span className="ml-2">&#9660;</span>
                </div>
                {isOpen && (
                  <div className="absolute left-0 mt-2 bg-white text-gray-800 rounded shadow-md">
                    <ul className="py-2 px-3">
                      <li>
                        <Link to="/dairytable" className="cursor-pointer font-bold hover:bg-gray-200 py-1">
                          DAIRY INPUT
                        </Link>
                      </li>
                      <li>
                        <Link to="/input" className="cursor-pointer font-bold hover:bg-gray-200 py-1">
                          DAIRY TABLE 
                        </Link>
                      </li>
                      <li>
                        <Link to="/dairy" className="cursor-pointer font-bold hover:bg-gray-200 py-1">
                          COW INPUT
                        </Link>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
              {/* <Link to="/dairytable" className="flex flex-row mb-8">
                <GiCow className="text-3xl text-white hover:text-gray-400 mr-2" />
                <h1 className="text-start text-2xl font-bold text-white hover:text-gray-400">
                  Dairy Farming
                </h1>
              </Link> */}
              <Link to="" className="flex flex-row mb-8">
                <SiGitea className="text-3xl text-white hover:text-gray-400 mr-2" />
                <h1 className="text-start text-2xl font-bold text-white hover:text-gray-400">
                  Tea Farming
                </h1>
              </Link>

              {/* <div className=" fixed bottom-0 left-0 right-0 p-5"> */}
              <Link to="/account" className="flex flex-row mb-5">
                <CgProfile className="text-3xl text-white hover:text-gray-400 mr-2" />
                <h1 className="text-start text-2xl font-bold text-white hover:text-gray-400">
                  My Account
                </h1>
              </Link>
              <button
                onClick={triggerLogout}
                className="text-start text-2xl flex flex-row mb-5 font-bold text-white hover:text-gray-400"
              >
                <AiOutlineLogout className="text-3xl text-white hover:text-gray-400 mr-2" />
                Logout
              </button>
              {/* </div> */}
            </div>
          </div>
        </nav>
      </div>
    </>

  );
}

export default SideBar;





























// <nav className="bg-gray-800">
// <div style={{ background: '#000', color: '#fff', padding: '5px', flexDirection: 'column', width: '380px', height: '100vh', }} >
// <div className="-mr-2 flex md:hidden">
//             <button
//               onClick={toggleSidebar}
//               type="button"
//               className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
//               aria-controls="mobile-menu"
//               aria-expanded="false"
//             >
//               <span className="sr-only">Open main menu</span>
//               <GiHamburgerMenu className="block h-6 w-6" />
//             </button>
//           </div>
//       <div className="flex flex-col m-6 justify-start">
//         <div className="flex flex-row ">
//           {!admin?.image_url ? (
//             <img
//             className='rounded-full h-24 w-24 mr-3'
//             src={Profile}
//             alt="profile"
//           />
//           ) : (
//             <img
//               src={admin?.image_url}
//               alt="profile"
//               className="rounded-full h-24 w-24 mr-3"
//             />
//           )}
//           <div className="flex flex-col justify-center">
//             <h1 className="text-2xl font-bold">
//               {user?.name}
//             </h1>
//             <p className="text-start">Welcome Back !</p>
//           </div>
//         </div>
//         <hr className='border-gray-400 mt-5 mb-5' />
//         {/* Links  */}
//         <div className="flex flex-col m-2">
//           <Link to="/" className="flex flex-row mb-8">
//             < BiHomeAlt2 className='text-3xl text-white hover:text-gray-400 mr-2' />
//             < h1 className='text-start text-2xl font-bold text-white hover:text-gray-400'>Dashboard</h1>
//           </Link>
//           <Link to="/dairy" className="flex flex-row mb-8">
//             <GiCow className='text-3xl text-white hover:text-gray-400 mr-2' />
//             < h1 className='text-start text-2xl font-bold text-white hover:text-gray-400'>Dairy Farming</h1>
//           </Link>
//           <Link to="/input" className="flex flex-row mb-8">
//             < SiGitea className='text-3xl text-white hover:text-gray-400 mr-2' />
//             < h1 className='text-start text-2xl font-bold text-white hover:text-gray-400'>Tea Farming</h1>
//           </Link>

//           <div className="flex flex-col justify-end fixed bottom-0 left-0 right-0 p-5">
//             <Link to="/account" className="flex flex-row mb-5">
//               <CgProfile className='text-3xl text-white hover:text-gray-400 mr-2' />
//               <h1 className='text-start text-2xl font-bold text-white hover:text-gray-400'>My Account</h1>
//             </Link>

//             {/* logout */}

//             <button onClick={triggerLogout} className='text-start text-2xl flex flex-row mb-5 font-bold text-white hover:text-gray-400'>
//               <AiOutlineLogout className='text-3xl text-white hover:text-gray-400 mr-2' />
//               Logout
//             </button>
//           </div>
//         </div>
//       </div>

//     </div>


//   {/* Mobile menu */}
//   <div className={`${isOpen ? "" : "hidden"} md:hidden`} id="mobile-menu">
//     <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
//       <Link
//         to="/"
//         className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
//       >
//         Home
//       </Link>
//       <Link
//         to="/about"
//         className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
//       >
//         About
//       </Link>
//       <Link
//         to="/contact"
//         className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
//       >
//         Contact
//       </Link>
//     </div>
//   </div>

//   {/* Backdrop */}
//   <div
//     className={`${isOpen ? "fixed" : "hidden"} inset-0 z-10`}
//     onClick={toggleSidebar}
//   >
//     <div className="absolute inset-0 bg-gray-600 opacity-75"></div>
//   </div>
// </nav>

//   );
// }

// export default SideBar;

