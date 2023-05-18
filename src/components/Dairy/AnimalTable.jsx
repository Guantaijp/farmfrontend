import React, { useState, useEffect } from 'react'
import Footer from '../Footer'
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css'
import Swal from 'sweetalert2';
import moment from "moment";

function AnimalTable({ admins, setAdmins }) {


  // const [admins, setAdmins] = useState([]);
  // // Get admins
  // useEffect(() => {
  //   fetch('http://localhost:3000/admins')
  //     .then((res) => {
  //       if (!res.ok) {
  //         throw new Error('Failed to fetch admins');
  //       }
  //       return res.json();
  //     })
  //     .then((data) => {
  //       setAdmins(data);

  //     })
  //     .catch((error) => {
  //       console.error(error);
  //       // Handle the error state or display an error message
  //     });
  // }, []);




  // filter a date that is greater than the current date
  const filterPassedTime = (time) => {
    const currentDate = new Date();
    const selectedDate = new Date(time);

    // Compare year, month, and day components
    const isSameDay = currentDate.getDate() === selectedDate.getDate();
    const isSameMonth = currentDate.getMonth() === selectedDate.getMonth();
    const isSameYear = currentDate.getFullYear() === selectedDate.getFullYear();

    // Exclude if the selected date is the current day
    if (isSameDay && isSameMonth && isSameYear) {
      return true;
    }

    return currentDate.getTime() <= selectedDate.getTime();
  };




  // ===COST===\\
  const [cost, setCost] = useState([]);


    // fetching the cost data
    useEffect(() => {
      fetch('http://localhost:3000/costs')
        .then((res) => res.json())
        .then((data) => {
          setCost(data);
        });
    }, []);




  const [costDate, setCostDate] = useState(new Date());
  const [costName, setCostName] = useState("");
  const [costAmount, setCostAmount] = useState("");

  const inputCostNameHandler = (e) => {
    setCostName(e.target.value);
  };

  const inputCostAmountHandler = (e) => {
    setCostAmount(e.target.value);
  };

  const submitCostHandler = (e) => {
    e.preventDefault();

    const dateWithoutTime = moment(costDate).startOf('day')
    const formattedDate = dateWithoutTime.format('YYYY-MM-DD')

    const costData = {
      date: formattedDate,
      item: costName,
      price: costAmount,
      admin_id: admin.id,
    };

    fetch("http://localhost:3000/cost", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(costData),
    })
      .then((res) => res.json())
      .then((data) => {
        setCost([...cost, data]);
        Swal.fire({
          icon: "success",
          title: "Cost added successfully",
        });
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      });
    setCostDate(new Date());
    setCostName("");
    setCostAmount("");
  };

  // ===SELL===\\
  const [sell, setSell] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/sells')
      .then((res) => res.json())
      .then((data) => {
        setSell(data);
      });
  }, []);


  const [sellDate, setSellDate] = useState(new Date());
  const [sellName, setSellName] = useState("");
  const [sellAmount, setSellAmount] = useState("");

  const inputSellNameHandler = (e) => {
    setSellName(e.target.value);
  };
  const inputSellAmountHandler = (e) => {
    setSellAmount(e.target.value);
  };

  const submitSellHandler = (e) => {
    e.preventDefault();
    const dateWithoutTime = moment(sellDate).startOf('day')
    const formattedDate = dateWithoutTime.format('YYYY-MM-DD')

    const sellData = {
      date: formattedDate,
      item: sellName,
      price: sellAmount,
      admin_id: admin.id,
    };

    fetch("http://localhost:3000/sell", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(sellData),
    })
      .then((res) => res.json())
      .then((data) => {
        setSell([...sell, data]);
        Swal.fire({
          icon: "success",
          title: "Sell added successfully",
        });
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      });
    setSellDate(new Date());
    setSellName("");
    setSellAmount("");
  };


  const user = JSON.parse(sessionStorage.getItem('user'));
  const admin = admins.find((admin) => admin.id === user.id) || {};

  //give me the array of cost that has the admin id of the current admin
  const adminCost = cost.filter((cost) => cost.admin_id === admin.id);
  //give me the array of sell that has the admin id of the current admin
  const adminSell = sell.filter((sell) => sell.admin_id === admin.id);
  //just show the last 5 cost
  const lastFiveCost = adminCost.slice(Math.max(adminCost.length - 5, 0));
  //just show the last 5 sell
  const lastFiveSell = adminSell.slice(Math.max(adminSell.length - 5, 0));

  



  return (
    <>
      <div style={{ backgroundColor: "#F5F5F5" }} className="flex flex-col ml-0 lg:ml-80 ">
        <div className="flex flex-row flex-wrap m-4 justify-center gap-5">
          <form className="flex flex-col bg-white p-10 rounded-lg shadow-lg">
            <p className="text-3xl font-bold text-center">Dairy Table</p>
            <table className="table-auto">
              <thead>
                <tr>
                  <th className="px-4 py-2">Total milk sold(kgs)</th>
                  <th className="px-4 py-2">Milk Total price(ksh)</th>
                  <th className="px-4 py-2">other incomes</th>
                  <th className="px-4 py-2">cost used</th>
                  <th className="px-4 py-2">profit/loss</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border px-4 py-2">1</td>
                  <td className="border px-4 py-2">2</td>
                  <td className="border px-4 py-2">3</td>
                  <td className="border px-4 py-2">4</td>
                  <td className="border px-4 py-2">5</td>
                </tr>
                <tr className="bg-gray-100">
                  <td className="border px-4 py-2">6</td>
                  <td className="border px-4 py-2">7</td>
                  <td className="border px-4 py-2">8</td>
                  <td className="border px-4 py-2">9</td>
                  <td className="border px-4 py-2">10</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">11</td>
                  <td className="border px-4 py-2">12</td>
                  <td className="border px-4 py-2">13</td>
                  <td className="border px-4 py-2">14</td>
                  <td className="border px-4 py-2">15</td>
                </tr>
              </tbody>
            </table>

          </form>
        </div>
        <div className="flex flex-row flex-wrap m-4 justify-center gap-5">
          <form className="flex flex-col bg-white p-5 rounded-lg shadow-lg">
            <p className="text-3xl font-bold text-center">Cost Table</p>
            <table className="table-auto">
              <thead>
                <tr>
                  <th className="px-4 py-2">Item</th>
                  <th className="px-4 py-2">Cost</th>
                  <th className="px-4 py-2">Date</th>
                </tr>
              </thead>
              <tbody>
                {lastFiveCost.map((cost) => (
                  <tr key={cost.id}>
                    <td className="border px-4 py-2">{cost.item}</td>
                    <td className="border px-4 py-2">{cost.price}</td>
                    <td className="border px-4 py-2">{cost.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </form>

          <form className="flex flex-col bg-white p-5 rounded-lg shadow-lg">
            <p className="text-3xl font-bold text-center">Sells Table</p>
            <table className="table-auto">
              <thead>
                <tr>
                  <th className="px-4 py-2">Item</th>
                  <th className="px-4 py-2">Sell</th>
                  <th className="px-4 py-2">Date</th>
                </tr>
              </thead>
              <tbody>
                {/* <tr>
                  <td className="border px-4 py-2">1</td>
                  <td className="border px-4 py-2">2</td>
                  <td className="border px-4 py-2">3</td>
                </tr> */}
                {lastFiveSell.map((sell) => (
                  <tr key={sell.id}>
                    <td className="border px-4 py-2">{sell.item}</td>
                    <td className="border px-4 py-2">{sell.price}</td>
                    <td className="border px-4 py-2">{sell.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </form>
        </div>

        {/* input Sell and Cost  */}

        <div className="flex flex-row flex-wrap m-4 justify-center gap-5">
          <div className="flex flex-col bg-white p-5 rounded-lg items-center">
            <form
              onSubmit={submitCostHandler}
              className="flex flex-col bg-white rounded-lg">
              <p className="text-3xl font-bold text-center">Input Cost</p>
              <div className="flex flex-col sm:flex-row gap-5">
                <div className="mb-5 sm:w-1/2">
                  <label htmlFor="" className="block font-medium text-gray-600">Item</label>
                  <input
                    className="border-2 rounded-md border-gray-300 py-2 px-3 w-full focus:outline-none focus:border-bg-black"
                    type="text"
                    id="Item"
                    value={costName}
                    onChange={inputCostNameHandler}
                    name="Item"
                    placeholder="Item"
                    required
                  />
                </div>
                <div className="mb-5 sm:w-1/2">
                  <label htmlFor="" className="block font-medium text-gray-600">Cost Price</label>
                  <input
                    className="border-2 rounded-md border-gray-300 py-2 px-3 w-full focus:outline-none focus:border-bg-black"
                    type="number"
                    id="cost"
                    name="cost"
                    value={costAmount}
                    onChange={inputCostAmountHandler}
                    placeholder="cost"
                    required
                  />
                </div>
                <div className="mb-5 sm:w-1/2">
                  <label htmlFor="" className="block font-medium text-gray-600">Date</label>
                  <DatePicker
                    className='border-2 rounded-md border-gray-300 py-2 px-3 w-full focus:outline-none focus:border-bg-black'
                    showTimeSelect
                    filterDate={filterPassedTime}
                    selected={costDate}
                    onChange={date => setCostDate(date)}
                  />
                </div>
              </div>
              <div className="flex justify-center"> {/* Container for button alignment */}
                <button className="bg-black hover:bg-grey-700 text-white font-bold py-2 px-4 rounded">
                  Submit
                </button>
              </div>
            </form>
          </div>
          <div className="flex flex-col bg-white p-5 rounded-lg items-center">
            <form
              onSubmit={submitSellHandler}
              className="flex flex-col bg-white rounded-lg">
              <p className="text-3xl font-bold text-center">Input Sell</p>
              <div className="flex flex-col sm:flex-row gap-5">
                <div className="mb-5 sm:w-1/2">
                  <label htmlFor="" className="block font-medium text-gray-600">Item</label>
                  <input
                    className="border-2 rounded-md border-gray-300 py-2 px-3 w-full focus:outline-none focus:border-bg-black"
                    type="text"
                    id="Item"
                    name="Item"
                    placeholder="Item"
                    value={sellName}
                    onChange={inputSellNameHandler}
                    required
                  />
                </div>
                <div className="mb-5 sm:w-1/2">
                  <label htmlFor="" className="block font-medium text-gray-600">Sell Price</label>
                  <input
                    className="border-2 rounded-md border-gray-300 py-2 px-3 w-full focus:outline-none focus:border-bg-black"
                    type="text"
                    id="Sell"
                    name="Sell"
                    placeholder="Sell"
                    value={sellAmount}
                    onChange={inputSellAmountHandler}
                    required
                  />
                </div>
                <div className="mb-5 sm:w-1/2">
                  <label htmlFor="" className="block font-medium text-gray-600">Date</label>

                  <DatePicker
                    className='border-2 rounded-md border-gray-300 py-2 px-3 w-full focus:outline-none focus:border-bg-black'
                    showTimeSelect
                    filterDate={filterPassedTime}
                    selected={sellDate}
                    onChange={date => setSellDate(date)}
                  />
                </div>
              </div>
              <div className="flex justify-center"> {/* Container for button alignment */}
                <button className="bg-black hover:bg-grey-700 text-white font-bold py-2 px-4 rounded">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );

}

export default AnimalTable


