import React from 'react';
import { Link } from 'react-router-dom';
// CgProfile
import { CgProfile } from 'react-icons/cg';
// AiOutlineLogout
import { AiOutlineLogout } from 'react-icons/ai';
// GrHome
import { BiHomeAlt2 } from 'react-icons/bi';
// GiCow
import { GiCow } from 'react-icons/gi';
// SiGitea
import { SiGitea } from 'react-icons/si';

function SideBar() {
  return (
    <div
      style={{
        background: '#000',
        color: '#fff',
        padding: '5px',
        flexDirection: 'column',
        width: '400px',
        height: '100vh',
      }}
    >
      {/* should be responsive to small screens */}
      <div className="flex flex-col m-6 justify-start">
        {/* PROFILE IMAGE  */}
        <div className="flex flex-row ">

          <img className='rounded-full h-20 w-20 m-4' src='https://images.unsplash.com/photo-1612837017391-0e3b5a2b0b0f?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YmVhdXR5JTIwY2FyfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80' />
          <div className="flex flex-col justify-center">
            <h1 className="text-2xl font-bold">Guantai</h1>
            <p className="text-start">Welcome Back </p>
          </div>
        </div>
        {/* hr */}
        <hr className='border-gray-400 mt-5 mb-5' />
        {/* Links  */}
        <div className="flex flex-col m-2">
          {/* icon */}

          {/* Dashboard */}
          {/* <Link to="/" className='text-start text-2xl font-bold text-white hover:text-gray-400'>Dashboard</Link> */}
          <Link to="/" className="flex flex-row mb-8">
            < BiHomeAlt2 className='text-3xl text-white hover:text-gray-400 mr-2' />
            < h1 className='text-start text-2xl font-bold text-white hover:text-gray-400'>Dashboard</h1>
          </Link>

          {/* Dairy */}
          <Link to="/dairy" className="flex flex-row mb-8">
            <GiCow className='text-3xl text-white hover:text-gray-400 mr-2' />
            < h1 className='text-start text-2xl font-bold text-white hover:text-gray-400'>Dairy Farming</h1>
          </Link>

          {/* Tea */}
          <Link to="/tea" className="flex flex-row mb-8">
            < SiGitea className='text-3xl text-white hover:text-gray-400 mr-2' />
            < h1 className='text-start text-2xl font-bold text-white hover:text-gray-400'>Tea Farming</h1>
          </Link>
        
          {/* appear in the bottom  */}
          <div className="flex flex-col justify-end fixed bottom-0 left-0 right-0 p-5">
            <Link to="/account" className="flex flex-row mb-5">
              <CgProfile className='text-3xl text-white hover:text-gray-400 mr-2' />
              <h1 className='text-start text-2xl font-bold text-white hover:text-gray-400'>My Account</h1>
            </Link>

            {/* logout */}
            <Link to="/logout" className="flex flex-row mb-5 ">
              <AiOutlineLogout className='text-3xl text-white hover:text-gray-400 mr-2' />
              <h1 className='text-start text-2xl font-bold text-white hover:text-gray-400'>Logout</h1>
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
}

export default SideBar;