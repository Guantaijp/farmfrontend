import React from 'react';

function Footer() {
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
        © {new Date().getFullYear()} Guantai Farm | All Rights Reserved.
      </div>
      <hr className="border-gray-400" />
    </div>
  );
}

export default Footer;

