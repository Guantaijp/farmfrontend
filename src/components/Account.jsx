import React, { useState, useEffect } from 'react'
import Profile from './images/images.jpeg';
import Footer from './Footer';
import Swal from 'sweetalert2';



function Account({ cow, setCow, tea }) {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [image, setImage] = useState('');
  const [selectedCowId, setSelectedCowId] = useState(cow.cow_id);
  const [selectedFarmId, setSelectedFarmId] = useState(tea.tea_id);

  function handleSelectedChange(e) {
    <select
      className="border-2 rounded-md border-gray-300 py-2 px-3 w-full focus:outline-none focus:border-bg-black"
      value={selectedCowId}
      onChange={handleSelectedChange}
    >
    <option value="">-- Select --</option>
    {ownedCows.map((dairy) => (
      <option key={dairy.cow_id} value={dairy.id}>{dairy.name}</option>
    ))}
  </select>
    setSelectedCowId(e.target.value);
  }

  function handleSelectedChangeFarm(e) {
    setSelectedFarmId(e.target.value);
  }

  const handleNameChange = (event) => setName(event.target.value);
  const handleEmailChange = (event) => setEmail(event.target.value);
  const handlePhoneChange = (event) => setPhone(event.target.value);
  const handleImageChange = (event) => setImage(event.target.files[0]);

  const updateImage = () => {
    const formData = new FormData();
    formData.append('image', image);

    const user = JSON.parse(sessionStorage.getItem('user'));
    const adminId = user.id;

    fetch(`https://glacial-shelf-52388.herokuapp.com/admins/${adminId}`, {
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

    fetch(`https://glacial-shelf-52388.herokuapp.com/admins/${adminId}`, {
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
    fetch('https://glacial-shelf-52388.herokuapp.com/admins')
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
          setEmail(admin.email);
          setPhone(admin.phone);
        }
      })
      .catch((error) => {
        console.error(error);
        // Handle the error state or display an error message
      });
  }, []);

  const user = JSON.parse(sessionStorage.getItem('user'));
  const admin = admins.find((admin) => admin.id === user.id) || {};


  const ownedCows = cow.filter((c) => c.admin_id === admin.id);
  const ownedFarms = tea.filter((t) => t.admin_id === admin.id);

  // =====DELETE A COW===== //
  const handleDelete = () => {
    // Delete cow and update state
    fetch(`https://glacial-shelf-52388.herokuapp.com/cows/${selectedCowId}`, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        Swal.fire({
          title: 'Success!',
          text: 'Cow deleted successfully!',
          icon: 'success',
          confirmButtonText: 'OK',
        });
        window.location.reload();

      }
      )
      .catch((error) => {
        console.error(error);
        Swal.fire({
          title: 'Error!',
          text: 'Something went wrong!',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
      );

  };

  // =====DELETE A FARM===== //
  const handleDeleteFarm = () => {
    // Delete farm and update state
    fetch(`https://glacial-shelf-52388.herokuapp.com/tea/${selectedFarmId}`, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        Swal.fire({
          title: 'Success!',
          text: 'Farm deleted successfully!',
          icon: 'success',
          confirmButtonText: 'OK',
        });
        window.location.reload();

      }
      )
      .catch((error) => {
        console.error(error);
        Swal.fire({
          title: 'Error!',
          text: 'Something went wrong!',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
      );

  };


  // ===== MILK PRICE ===== //
  const [milkPrice, setMilkPrice] = useState("");

  const inputPriceHandler = (e) => {
    setMilkPrice(e.target.value);
  };


  const submitMilkHandler = (e) => {
    e.preventDefault();

    const milkData = {
      price: milkPrice,
      admin_id: admin.id,
    };

    fetch(`https://glacial-shelf-52388.herokuapp.com/prices`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(milkData),
    })
      .then((res) => res.json())
      .then((data) => {
        setPrices((prevPrices) => [...prevPrices, data]);
        Swal.fire({
          title: 'Success!',
          text: 'Milk price added successfully!',
          icon: 'success',
          confirmButtonText: 'OK',
        });
        setMilkPrice("");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const [prices, setPrices] = useState([]);

  useEffect(() => {
    fetch('https://glacial-shelf-52388.herokuapp.com/prices')
      .then((res) => res.json())
      .then((data) => {
        setPrices(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const lastPriceCowAdmin = prices.filter((price) => price.admin_id === admin.id);
  const lastPriceCowAdminId = lastPriceCowAdmin.length > 0 ? lastPriceCowAdmin[lastPriceCowAdmin.length - 1] : null;




  // ===== FARM PRICE ===== //
  const [farmPrice, setFarmPrice] = useState("");

  const inputFarmPriceHandler = (e) => {
    setFarmPrice(e.target.value);
  };


  const submitFarmHandler = (e) => {
    e.preventDefault();

    const farmData = {
      price: farmPrice,
      admin_id: admin.id,
    };

    fetch(`https://glacial-shelf-52388.herokuapp.com/tea_prices`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(farmData),
    })
      .then((res) => res.json())
      .then((data) => {
        setFarmPrice(""); // Reset the farmPrice state to clear the input field
        setPricesFarm((prevPricesFarm) => [...prevPricesFarm, data]); // Update the pricesFarm state with the new data

        Swal.fire({
          title: 'Success!',
          text: 'Farm price added successfully!',
          icon: 'success',
          confirmButtonText: 'OK',
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };


  const [pricesFarm, setPricesFarm] = useState([]);

  useEffect(() => {
    fetch('https://glacial-shelf-52388.herokuapp.com/tea_prices')
      .then((res) => res.json())
      .then((data) => {
        setPricesFarm(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const lastPriceFarmAdmin = pricesFarm.filter((price) => price.admin_id === admin.id);
  const lastPriceFarmAdminId = lastPriceFarmAdmin.length > 0 ? lastPriceFarmAdmin[lastPriceFarmAdmin.length - 1] : null;



  return (

    <>
      <div style={{ backgroundColor: "#F5F5F5" }} className="flex flex-col ml-0 lg:ml-80 ">
        <p className="text-4xl font-bold text-center">My Account</p>
        <div className="flex flex-row flex-wrap m-4 justify-center gap-5">
          <div className="flex flex-col bg-white p-10 rounded-lg shadow-lg w-full sm:w-auto">
            <form onSubmit={handleSubmit} className="flex flex-col gap-5 items-center">
              <div className="flex flex-col gap-2">
                <div className="flex items-center flex-col">
                  <label htmlFor="image" className="text-lg font-bold cursor-pointer">
                    {!admin?.image_url ? (
                      <img className="rounded-full h-24 w-24 mr-3" src={Profile} alt="profile" />
                    ) : (
                      <img className="rounded-full h-24 w-24 mr-3" src={admin?.image_url} alt="profile" />
                    )}
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
                  className="px-4 py-2 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent sm:w-full"
                />
                <label htmlFor="email" className="text-lg font-bold">Email</label>
                <input
                  onChange={handleEmailChange}
                  value={email}
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  className="px-4 py-2 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent sm:w-full"
                />
                <label htmlFor="phone" className="text-lg font-bold">Phone Number</label>
                <input
                  onChange={handlePhoneChange}
                  value={phone}
                  type="tel"
                  name="phone"
                  id="phone"
                  placeholder="Phone Number"
                  className="px-4 py-2 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent sm:w-full"
                />
                <button
                  className="bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 mt-2 rounded focus:outline-none focus:shadow-outline w-full"
                  type="submit"
                >
                  Update
                </button>
              </div>
            </form>
          </div>

          {/* //==========//==========//==========//\\==========\\==========\\==========\\ */}
          <div className="flex flex-col bg-white p-10 rounded-lg shadow-lg">
            <div className="flex flex-col sm:flex-row gap-5">
              <div className="flex flex-col gap-5 items-center">
                <div className="flex flex-col gap-2">
                  <p className="text-lg font-bold">Delete Cow</p>
                  <div className="flex flex-col gap-2">
                    <select
                      className="border-2 rounded-md border-gray-300 py-2 px-3 w-full focus:outline-none focus:border-bg-black"
                      value={selectedCowId}
                      onChange={handleSelectedChange}
                    >
                      <option value="">-- Select --</option>
                      {ownedCows.map((dairy) => (
                        <option key={dairy.cow_id} value={dairy.id}>{dairy.name}</option>
                      ))}
                    </select>
                    <button
                      onClick={handleDelete}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
              <form className="flex flex-col gap-5 items-center">
                <div className="flex flex-col gap-2">
                  <p className="text-lg font-bold">Delete Farm</p>
                  <div className="flex flex-col gap-2">

                    <select
                      className="border-2 rounded-md border-gray-300 py-2 px-3 w-full focus:outline-none focus:border-bg-black"
                      value={selectedFarmId}
                      onChange={handleSelectedChangeFarm}
                    >
                      <option value="">-- Select --</option>
                      {ownedFarms.map((farm) => (
                        <option key={farm.cow_id} value={farm.id}>{farm.name}</option>
                      ))}
                    </select>
                  </div>
                  <button
                    onClick={handleDeleteFarm}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">Delete</button>
                </div>
              </form>
            </div>
            <div className="flex flex-col gap-5 mt-5">
              <form className="flex flex-col gap-5 items-center">
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-lg font-bold">Print Invoice</label>
                  <div className="flex flex-col gap-2">
                    <select className="px-4 py-2 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent">
                      <option value="1">Delete Account</option>
                      <option value="2">Delete Account</option>
                      <option value="3">Delete Account</option>
                      <option value="4">Delete Account</option>
                    </select>
                  </div>
                  <button className="bg-black hover:bg-slate-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">Print</button>
                </div>
              </form>
            </div>
          </div>

        </div>
        {/* price setting and  */}
        <div className="flex flex-col p-10 items-center">
          <p className="text-2xl font-bold">Price Setting</p>
          <div className="flex flex-col sm:flex-row gap-5">
            <form
              onSubmit={submitMilkHandler}
              className="flex flex-col gap-5 items-center">
              <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-2">
                  <div className="flex flex-row sm:flex-col gap-2">
                    <div className="flex flex-col gap-2">
                      {lastPriceCowAdminId ? (
                        <p className="text-lg font-bold">Current Milk Price: {lastPriceCowAdminId.price} Ksh </p>
                      ) : (
                        <p className="text-lg font-bold">Current Milk Price: 0 Ksh</p>
                      )}
                      <input
                        type="number"
                        name="milkPrice"
                        id="milkPrice"
                        required
                        onChange={inputPriceHandler}
                        value={milkPrice}
                        placeholder="Milk Price"
                        className="px-4 py-2 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent"
                      />
                      <button className="bg-black hover:bg-slate-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">Update</button>
                    </div>
                    <p className="text-lg font-bold"></p>
                  </div>
                </div>
              </div>
            </form>
            <form className="flex flex-col gap-5 items-center">
              <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-2">
                  <div className="flex flex-row sm:flex-col gap-2">
                    <div className="flex flex-col gap-2">
                      {lastPriceFarmAdminId ? (
                        <p className="text-lg font-bold">Current Tea Price: {lastPriceFarmAdminId.price} Ksh </p>
                      ) : (
                        <p className="text-lg font-bold">Current Tea Price: 0 Ksh</p>
                      )}
                      {/* <label htmlFor="teaPrice" className="text-lg font-bold">Current Tea Price:{lastPriceFarmAdminId.price} Ksh</label> */}
                      <input
                        type="number"
                        name="teaPrice"
                        id="teaPrice"
                        placeholder="Tea Price"
                        onChange={inputFarmPriceHandler}
                        value={farmPrice}
                        required
                        className="px-4 py-2 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent"
                      />
                      <button
                        onClick={submitFarmHandler}
                        className="bg-black hover:bg-slate-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">Update</button>
                    </div>
                    <p className="text-lg font-bold"></p>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
        <Footer />
      </div>
    </>
  )
}

export default Account
