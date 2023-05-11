import React, { useState, useEffect } from 'react'
import Profile from './images/images.jpeg';
import { useParams } from 'react-router-dom';



function Account() {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [image, setImage] = useState('');
  
  const handleNameChange = (event) => setName(event.target.value);
  const handleEmailChange = (event) => setEmail(event.target.value);
  const handlePhoneChange = (event) => setPhone(event.target.value);
  const handleImageChange = (event) => setImage(event.target.files[0]);
  
  const updateImage = () => {
    const formData = new FormData();
    formData.append('image', image);
  
    const user = JSON.parse(sessionStorage.getItem('user'));
    const adminId = user.id;
  
    fetch(`http://localhost:3000/admins/${adminId}`, {
      method: 'PATCH',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // Update the displayed image URL
        setImage(data.image_url || '');
        // Update the admins state to trigger re-render
        setAdmins((prevAdmins) => {
          const updatedAdmins = prevAdmins.map((admin) =>
            admin.id === adminId ? { ...admin, image_url: data.image_url } : admin
          );
          return updatedAdmins;
        });
      })
      .catch((error) => console.error(error));
  };
  
  const updateFields = () => {
    const data = JSON.stringify({ name, email, phone });
  
    const user = JSON.parse(sessionStorage.getItem('user'));
    const adminId = user.id;
  
    fetch(`http://localhost:3000/admins/${adminId}`, {
      method: 'PATCH',
      body: data,
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // Update the displayed name, email, and phone
        setName(data.name || '');
        setEmail(data.email || '');
        setPhone(data.phone || '');
  
        // Update the admins state to trigger re-render
        setAdmins((prevAdmins) => {
          const updatedAdmins = prevAdmins.map((admin) =>
            admin.id === adminId ? { ...admin, name: data.name, email: data.email, phone: data.phone } : admin
          );
          return updatedAdmins;
        });
      })
      .catch((error) => console.error(error));
  };
  
  
  const handleSubmit = (event) => {
    event.preventDefault();
  
    // Update the image
    updateImage();
  
    // Update the other fields
    updateFields();
    // reload the page
    window.location.reload();
  };

  const [admins, setAdmins] = useState([]);

  // Get admins
  useEffect(() => {
    fetch('http://localhost:3000/admins')
      .then((res) => res.json())
      .then((data) => {
        setAdmins(data);
        const user = JSON.parse(sessionStorage.getItem('user'));
        const admin = data.find((admin) => admin.id === user.id);
        if (admin) {
          setImage(admin.image_url || '');
          setName(admin.name || '');
          setEmail(admin.email || '');
          setPhone(admin.phone || '');
        }
      });
  }, []);

  const user = JSON.parse(sessionStorage.getItem('user'));
  const admin = admins.find((admin) => admin.id === user.id) || {};

  return (
    <>
      <div className="p-5 flex flex-col">
        <div className="flex flex-row m-4 justify-center">
          <div className="flex flex-col bg-white p-10 rounded-lg shadow-lg">
            <form onSubmit={handleSubmit} className="flex flex-col gap-5 items-center">
              <div className="flex flex-col gap-2">
                <div className="flex items-center flex-col">
                  <label htmlFor="image" className="text-lg font-bold cursor-pointer">
                    {!admin?.image_url ? (
                      <img className='rounded-full h-24 w-24 mr-3' src={Profile} alt="profile" />
                    ) : (
                      <img className="rounded-full h-24 w-24 mr-3" src={admin?.image_url} alt="profile" />
                    )}
                    <div className="mt-2 text-sm text-gray-600"></div>
                  </label>
                  <input
                    onChange={handleImageChange}
                    type="file"
                    name="image"
                    id="image"
                    className="hidden"
                  />
                </div>
                <label htmlFor="name" className="text-lg font-bold">Name</label>
                <input
                  onChange={handleNameChange}
                  value={name}
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Name"
                  className="px-4 py-2 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent"
                />
                <label htmlFor="email" className="text-lg font-bold">Email</label>
                <input
                  onChange={handleEmailChange}
                  value={email}
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  className="px-4 py-2 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent"
                />
                <label htmlFor="phone" className="text-lg font-bold">Phone Number</label>
                <input
                  onChange={handlePhoneChange}
                  value={phone}
                  type="tel"
                  name="phone"
                  id="phone"
                  placeholder="Phone Number"
                  className="px-4 py-2 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent"
                />

                <button className="bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">Update</button>
              </div>
            </form>

          </div>
          <div className="flex flex-col bg-white p-10 rounded-lg shadow-lg">

          </div>
        </div>
      </div>
    </>
  )
}

export default Account
