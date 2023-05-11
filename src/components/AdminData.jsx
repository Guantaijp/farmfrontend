import React,{ useState, useEffect } from 'react'

export const useAdminData = () => {
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
  
    return {
          admin,user, 
          name, email, phone, image,setAdmins, 
          setImage, setName, setEmail, setPhone,
          handleNameChange, handleEmailChange, 
          handlePhoneChange, handleImageChange,
          handleSubmit, updateImage, updateFields}

}

