import React, { useEffect, useState } from "react";

const Dashboard = ({ admins }) => {
  const [adminTotals, setAdminTotals] = useState({});

  useEffect(() => {
    fetch("http://localhost:3000/admin_sell")
      .then((res) => res.json())
      .then((data) => {
        setAdminTotals(data);
      });
  }, []);

  const user = JSON.parse(sessionStorage.getItem("user"));
  const adminId = user && user.id;
  const admin = admins && admins.find((admin) => admin.id === adminId);

  let totalSum = 0;
  if (adminTotals.overall_admin_totals && adminTotals.overall_admin_totals[adminId]) {
    totalSum = adminTotals.overall_admin_totals[adminId];
  }


  const monthlyAdminTotals = Object.entries(adminTotals.monthly_admin_totals || {});

  const monthlyAdminTotalsForAdmin = monthlyAdminTotals.map(([month, adminTotals]) => {
    return [month, adminTotals[adminId]];

  });
  console.log("monthlyAdminTotalsForAdmin", monthlyAdminTotalsForAdmin);


  return (
    <div style={{ backgroundColor: "#F5F5F5" }} className="flex flex-col items-center ml-0 lg:ml-80">
      <h2>Admin Totals</h2>
      <h3>Overall Admin Total: {totalSum}</h3>

      <h3>Monthly Admin Totals for Admin {admin && admin.name}:</h3>
{/* table */}
      <table className="table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">January</th>
            <th className="px-4 py-2">February</th>
            <th className="px-4 py-2">March</th>
            <th className="px-4 py-2">April</th>
            <th className="px-4 py-2">May</th>
            <th className="px-4 py-2">June</th>
            <th className="px-4 py-2">July</th>
            <th className="px-4 py-2">August</th>
            <th className="px-4 py-2">September</th>
            <th className="px-4 py-2">October</th>
            <th className="px-4 py-2">November</th>
            <th className="px-4 py-2">December</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            {monthlyAdminTotalsForAdmin.map(([month, adminTotals]) => (
              <td className="border px-4 py-2">{adminTotals}</td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
    
  );
};

      export default Dashboard;
