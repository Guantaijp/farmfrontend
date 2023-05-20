import React, { useState, useEffect } from 'react'
import Footer from '../Footer'
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css'
import Swal from 'sweetalert2';
import moment from "moment";
import { GiConsoleController } from 'react-icons/gi';

function AnimalTable({ admins, setAdmins }) {
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
  const adminSell = sell.filter((sell) => sell.admin_id === admin.id);
  const lastFiveCost = adminCost.slice(Math.max(adminCost.length - 3, 0));
  const lastFiveSell = adminSell.slice(Math.max(adminSell.length - 3, 0));


  const [adminSells, setAdminSells] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/admin_sell')
      .then((res) => res.json())
      .then((data) => {
        setAdminSells(data);
      })
      .catch((error) => {
        console.error('Error fetching monthly sell data:', error);
      });
  }, []);



  const [adminTotalSells, setAdminTotalSells] = useState({});

  useEffect(() => {
    fetch("http://localhost:3000/admin_sell")
      .then((res) => res.json())
      .then((data) => {
        setAdminTotalSells(data);
      });
  }, []);
  const adminId = user && user.id;
  const monthlyAdminTotalSell = Object.entries(adminTotalSells.monthly_admin_totals || {});
  const monthlyAdminTotalsForAdmin = monthlyAdminTotalSell.map(([month, adminTotals]) => {
    return [month, adminTotals[adminId]];
  });
  const monthAdminTotals = {
    January: [],
    February: [],
    March: [],
    April: [],
    May: [],
    June: [],
    July: [],
    August: [],
    September: [],
    October: [],
    November: [],
    December: [],
  };
  monthlyAdminTotalsForAdmin.forEach(([month, adminTotals]) => {
    if (monthAdminTotals.hasOwnProperty(month)) {
      monthAdminTotals[month] = adminTotals;
    }
  });
  const januaryAdminTotalsForAdmin = monthAdminTotals["January"];
  const februaryAdminTotalsForAdmin = monthAdminTotals["February"];
  const marchAdminTotalsForAdmin = monthAdminTotals["March"];
  const aprilAdminTotalsForAdmin = monthAdminTotals["April"];
  const mayAdminTotalsForAdmin = monthAdminTotals["May"];
  const juneAdminTotalsForAdmin = monthAdminTotals["June"];
  const julyAdminTotalsForAdmin = monthAdminTotals["July"];
  const augustAdminTotalsForAdmin = monthAdminTotals["August"];
  const septemberAdminTotalsForAdmin = monthAdminTotals["September"];
  const octoberAdminTotalsForAdmin = monthAdminTotals["October"];
  const novemberAdminTotalsForAdmin = monthAdminTotals["November"];
  const decemberAdminTotalsForAdmin = monthAdminTotals["December"]

  const [adminTotalCosts, setAdminTotalCosts] = useState({});

  useEffect(() => {
    fetch("http://localhost:3000/admin_cost")
      .then((res) => res.json())  
      .then((data) => {
        setAdminTotalCosts(data);
      });
  }, []);
  const monthlyAdminTotalCost = Object.entries(adminTotalCosts.monthly_admin_totals || {});
  const monthlyAdminTotalsForAdminCost = monthlyAdminTotalCost.map(([month, adminTotals]) => {
    return [month, adminTotals[adminId]];
  });
  const monthAdminTotalsCost = {
    January: [],
    February: [],
    March: [],
    April: [],
    May: [],
    June: [],
    July: [],
    August: [],
    September: [],
    October: [],
    November: [],
    December: [],
  };
  monthlyAdminTotalsForAdminCost.forEach(([month, adminTotals]) => {  
    if (monthAdminTotalsCost.hasOwnProperty(month)) {
      monthAdminTotalsCost[month] = adminTotals;
    }
  });
  const januaryAdminTotalsForAdminCost = monthAdminTotalsCost["January"];
  const februaryAdminTotalsForAdminCost = monthAdminTotalsCost["February"];
  const marchAdminTotalsForAdminCost = monthAdminTotalsCost["March"];
  const aprilAdminTotalsForAdminCost = monthAdminTotalsCost["April"];
  const mayAdminTotalsForAdminCost = monthAdminTotalsCost["May"];
  const juneAdminTotalsForAdminCost = monthAdminTotalsCost["June"];
  const julyAdminTotalsForAdminCost = monthAdminTotalsCost["July"];
  const augustAdminTotalsForAdminCost = monthAdminTotalsCost["August"];
  const septemberAdminTotalsForAdminCost = monthAdminTotalsCost["September"];
  const octoberAdminTotalsForAdminCost = monthAdminTotalsCost["October"];
  const novemberAdminTotalsForAdminCost = monthAdminTotalsCost["November"];
  const decemberAdminTotalsForAdminCost = monthAdminTotalsCost["December"];

  const [totalAdminsMilks, setTotalAdminsMilks ] = useState({});
  useEffect(() => {
    fetch("http://127.0.0.1:3000/admin_milk")
      .then((res) => res.json())
      .then((data) => {
        setTotalAdminsMilks(data)
      }
      );
    },[]);


    const monthlyAdminTotalMilk = Object.entries(totalAdminsMilks.monthly_admin_totals || {});
    const monthlyAdminTotalsForAdminMilk = monthlyAdminTotalMilk.map(([month, adminTotals]) => {
      return [month, adminTotals[adminId]];
    });
    const monthAdminTotalsMilk = {
      January: [],
      February: [],
      March: [],
      April: [],
      May: [],
      June: [],
      July: [],
      August: [],
      September: [],
      October: [],
      November: [],
      December: [],
    };
    monthlyAdminTotalsForAdminMilk.forEach(([month, adminTotals]) => {
      if (monthAdminTotalsMilk.hasOwnProperty(month)) {
        monthAdminTotalsMilk[month] = adminTotals;
      }
    });
    const januaryAdminTotalsForAdminMilk = monthAdminTotalsMilk["January"];
    const februaryAdminTotalsForAdminMilk = monthAdminTotalsMilk["February"];
    const marchAdminTotalsForAdminMilk = monthAdminTotalsMilk["March"];
    const aprilAdminTotalsForAdminMilk = monthAdminTotalsMilk["April"];
    const mayAdminTotalsForAdminMilk = monthAdminTotalsMilk["May"];
    const juneAdminTotalsForAdminMilk = monthAdminTotalsMilk["June"];
    const julyAdminTotalsForAdminMilk = monthAdminTotalsMilk["July"];
    const augustAdminTotalsForAdminMilk = monthAdminTotalsMilk["August"];
    const septemberAdminTotalsForAdminMilk = monthAdminTotalsMilk["September"];
    const octoberAdminTotalsForAdminMilk = monthAdminTotalsMilk["October"];
    const novemberAdminTotalsForAdminMilk = monthAdminTotalsMilk["November"];
    const decemberAdminTotalsForAdminMilk = monthAdminTotalsMilk["December"];


    // GET the total milk sold by the admin
    const [totalAdminsPrice, setTotalAdminsPrice] = useState([]);

    useEffect(() => {
      fetch("http://127.0.0.1:3000/last")
        .then((res) => res.json())
        .then((data) => {
          setTotalAdminsPrice(data);
        });
    }, []);
    // console.log(totalAdminsPrice);
    const monthlyAdminTotalPrice = Object.entries(totalAdminsPrice.monthly_admin_totals || {});
    const monthlyAdminTotalsForAdminPrice = monthlyAdminTotalPrice.map(([month, adminTotals]) => {
      return [month, adminTotals[adminId]]; 
    });
   
    const monthAdminTotalsPrice = {
      January: [],
      February: [],
      March: [],
      April: [],
      May: [],
      June: [],
      July: [],
      August: [],
      September: [],
      October: [],
      November: [],
      December: [],
    };
    monthlyAdminTotalsForAdminPrice.forEach(([month, adminTotals]) => {
      if (monthAdminTotalsPrice.hasOwnProperty(month)) {
        monthAdminTotalsPrice[month] = adminTotals;
      }
    });

    const januaryAdminTotalsForAdminPrice = monthAdminTotalsPrice["January"];
    const februaryAdminTotalsForAdminPrice = monthAdminTotalsPrice["February"];
    const marchAdminTotalsForAdminPrice = monthAdminTotalsPrice["March"];
    const aprilAdminTotalsForAdminPrice = monthAdminTotalsPrice["April"];
    const mayAdminTotalsForAdminPrice = monthAdminTotalsPrice["May"];
    const juneAdminTotalsForAdminPrice = monthAdminTotalsPrice["June"];
    const julyAdminTotalsForAdminPrice = monthAdminTotalsPrice["July"];
    const augustAdminTotalsForAdminPrice = monthAdminTotalsPrice["August"];
    const septemberAdminTotalsForAdminPrice = monthAdminTotalsPrice["September"];
    const octoberAdminTotalsForAdminPrice = monthAdminTotalsPrice["October"];
    const novemberAdminTotalsForAdminPrice = monthAdminTotalsPrice["November"];
    const decemberAdminTotalsForAdminPrice = monthAdminTotalsPrice["December"];

  return (
    <>
      <div style={{ backgroundColor: "#F5F5F5" }} className="flex flex-col ml-0 lg:ml-80 ">
        <div className="flex flex-row flex-wrap m-4 justify-center gap-5">
          <form className="flex flex-col bg-white p-10 rounded-lg shadow-lg">
            <p className="text-3xl font-bold text-center">Dairy Table</p>
            <table className="table-auto">
              <thead>
                <tr>
                  <th className="px-4 py-2">Month</th>
                  <th className="px-4 py-2">Total Milk(kgs)</th>
                  <th className="px-4 py-2">Milk Total Price(ksh)</th>
                  <th className="px-4 py-2">Total Sells</th>
                  <th className="px-4 py-2">cost used</th>
                  <th className="px-4 py-2">profit/loss</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { month: "January", adminTotals: januaryAdminTotalsForAdmin, adminTotalsCost: januaryAdminTotalsForAdminCost , adminTotalsMilk: januaryAdminTotalsForAdminMilk, adminTotalsPrice: januaryAdminTotalsForAdminPrice},
                  { month: "February", adminTotals: februaryAdminTotalsForAdmin, adminTotalsCost: februaryAdminTotalsForAdminCost, adminTotalsMilk: februaryAdminTotalsForAdminMilk, adminTotalsPrice: februaryAdminTotalsForAdminPrice},
                  { month: "March", adminTotals: marchAdminTotalsForAdmin , adminTotalsCost: marchAdminTotalsForAdminCost, adminTotalsMilk: marchAdminTotalsForAdminMilk, adminTotalsPrice: marchAdminTotalsForAdminPrice},
                  { month: "April", adminTotals: aprilAdminTotalsForAdmin , adminTotalsCost: aprilAdminTotalsForAdminCost, adminTotalsMilk: aprilAdminTotalsForAdminMilk, adminTotalsPrice: aprilAdminTotalsForAdminPrice},
                  { month: "May", adminTotals: mayAdminTotalsForAdmin , adminTotalsCost: mayAdminTotalsForAdminCost, adminTotalsMilk: mayAdminTotalsForAdminMilk, adminTotalsPrice: mayAdminTotalsForAdminPrice},
                  { month: "June", adminTotals: juneAdminTotalsForAdmin , adminTotalsCost: juneAdminTotalsForAdminCost, adminTotalsMilk: juneAdminTotalsForAdminMilk, adminTotalsPrice: juneAdminTotalsForAdminPrice},
                  { month: "July", adminTotals: julyAdminTotalsForAdmin , adminTotalsCost: julyAdminTotalsForAdminCost, adminTotalsMilk: julyAdminTotalsForAdminMilk, adminTotalsPrice: julyAdminTotalsForAdminPrice},
                  { month: "August", adminTotals: augustAdminTotalsForAdmin , adminTotalsCost: augustAdminTotalsForAdminCost, adminTotalsMilk: augustAdminTotalsForAdminMilk, adminTotalsPrice: augustAdminTotalsForAdminPrice},
                  { month: "September", adminTotals: septemberAdminTotalsForAdmin , adminTotalsCost: septemberAdminTotalsForAdminCost, adminTotalsMilk: septemberAdminTotalsForAdminMilk, adminTotalsPrice: septemberAdminTotalsForAdminPrice},
                  { month: "October", adminTotals: octoberAdminTotalsForAdmin , adminTotalsCost: octoberAdminTotalsForAdminCost, adminTotalsMilk: octoberAdminTotalsForAdminMilk, adminTotalsPrice: octoberAdminTotalsForAdminPrice},
                  { month: "November", adminTotals: novemberAdminTotalsForAdmin , adminTotalsCost: novemberAdminTotalsForAdminCost, adminTotalsMilk: novemberAdminTotalsForAdminMilk, adminTotalsPrice: novemberAdminTotalsForAdminPrice},
                  { month: "December", adminTotals: decemberAdminTotalsForAdmin , adminTotalsCost: decemberAdminTotalsForAdminCost, adminTotalsMilk: decemberAdminTotalsForAdminMilk, adminTotalsPrice: decemberAdminTotalsForAdminPrice},
                ].map(({ month, adminTotals,adminTotalsCost, adminTotalsMilk , adminTotalsPrice}) => (
                  <tr key={month}>
                    <td className="border px-4 py-2">{month}</td>
                    <td className="border px-4 py-2">{adminTotalsMilk}</td>
                    <td className="border px-4 py-2">{adminTotalsPrice}</td>
                    <td className="border px-4 py-2">{adminTotals}</td>
                    <td className="border px-4 py-2">{adminTotalsCost}</td>
                    <td className="border px-4 py-2">1000</td>
                  </tr>
                ))}
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


