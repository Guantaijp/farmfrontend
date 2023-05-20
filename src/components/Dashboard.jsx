import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const data = {
    "admin_id": 3,
    "monthly_totals": {
      "January 2023": {
        "price": 10,
        "total_amount": null,
        "total": 0
      },
      // ... rest of the data
    }
  };

  return (
    <div>
      {Object.entries(data.monthly_totals).map(([month, values]) => (
        <div key={month}>
          <h3>{month}</h3>
          <p>Price: {values.price}</p>
          <p>Total Amount: {values.total_amount}</p>
          <p>Total: {values.total}</p>
        </div>
      ))}
    </div>
  );
};


      export default Dashboard;
