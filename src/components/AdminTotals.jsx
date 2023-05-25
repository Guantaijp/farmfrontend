import React, { useEffect, useState } from "react";

const Dashboard = ({ admins }) => {
    const [adminTotals, setAdminTotals] = useState({});

    useEffect(() => {
        fetch("https://glacial-shelf-52388.herokuapp.com/admin_sell")
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

    console.log("adminTotals", adminTotals);

    return (
        <div style={{ backgroundColor: "#F5F5F5" }} className="flex flex-col justify-center ml-0 lg:ml-80">
            <h2>Admin Totals</h2>
            <h3>Overall Admin Total: {totalSum}</h3>

            <h3>Monthly Admin Totals for Admin {admin && admin.name}:</h3>

            {Object.entries(adminTotals.monthly_admin_totals || {}).map(([month, adminTotals]) => (
                <div key={month}>
                    <h4>{month}</h4>
                    <ul>
                        {adminTotals[adminId] && (
                            <li>
                                Admin ID: {adminId}, Total: {adminTotals[adminId]}
                            </li>
                        )}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default Dashboard;
