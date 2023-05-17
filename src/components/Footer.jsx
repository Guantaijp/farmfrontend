import React, { useState, useEffect } from 'react'

function Footer() {

  const [admins, setAdmins] = useState([]);
  const [name, setName] = useState('');

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
        const user = JSON.parse(sessionStorage.getItem('user'));
        const admin = data.find((admin) => admin.id === user.id);
        if (admin) {
          setName(admin.name);
         
        }
      })
      .catch((error) => {
        console.error(error);
        // Handle the error state or display an error message
      });
  }, []);

  const user = JSON.parse(sessionStorage.getItem('user'));
  const admin = admins.find((admin) => admin.id === user.id) || {};

  return (

    <div
    style={{
        bottom: '0',
        left: '0',
        right: '0',
        padding: '0.75rem',
        display: 'flex',
        flexDirection: 'column',
        
        }}
     className="footer-container">
      <hr className="border-gray-400" />
      <div className="text-center text-black font-semibold text-sm">
        © {new Date().getFullYear()} {admin.name} Farm | All Rights Reserved.
      </div>
      <hr className="border-gray-400" />
    </div>
  );
}

export default Footer;

