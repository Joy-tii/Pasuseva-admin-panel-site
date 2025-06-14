import React from "react";
import { FaUserPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const customers = [
  {
    name: "Ramesh Kumar",
    email: "ramesh@example.com",
    phone: "9876543210",
    address: "Delhi",
    status: "Active",
  },
  {
    name: "Sita Devi",
    email: "sita@example.com",
    phone: "9123456780",
    address: "Mumbai",
    status: "Inactive",
  },
  {
    name: "Amit Singh",
    email: "amit@example.com",
    phone: "9988776655",
    address: "Lucknow",
    status: "Active",
  },
];

const CustomerList = () => {
  const navigate = useNavigate();

  return (
    <div className="p-6 min-h-screen bg-white dark:bg-[#1f1f1f]">
      <div className="flex items-center justify-between mb-8 max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold text-[var(--pasuseva-green)] tracking-wide">
          <span className="inline-block align-middle mr-2 w-2 h-6 bg-[var(--pasuseva-orange)] rounded-sm"></span>
          Customer List
        </h1>
        <button
          onClick={() => navigate("/customer/add")}
          className="bg-[var(--pasuseva-orange)] hover:bg-orange-600 transition-colors duration-200 text-white font-semibold px-6 py-2 rounded-lg shadow-md flex items-center gap-2"
        >
          <FaUserPlus className="text-lg" />
          Add Customer
        </button>
      </div>
      <div className="overflow-x-auto max-w-5xl mx-auto">
        <table className="min-w-full bg-white dark:bg-[#232d1b] border border-[var(--pasuseva-green)] rounded-xl shadow">
          <thead>
            <tr className="bg-[var(--pasuseva-green)]/10 dark:bg-[var(--pasuseva-green)]/20">
              <th className="px-4 py-3 text-left text-sm font-bold text-[var(--pasuseva-green)] border-b">#</th>
              <th className="px-4 py-3 text-left text-sm font-bold text-[var(--pasuseva-green)] border-b">Name</th>
              <th className="px-4 py-3 text-left text-sm font-bold text-[var(--pasuseva-green)] border-b">Email</th>
              <th className="px-4 py-3 text-left text-sm font-bold text-[var(--pasuseva-green)] border-b">Phone</th>
              <th className="px-4 py-3 text-left text-sm font-bold text-[var(--pasuseva-green)] border-b">Address</th>
              <th className="px-4 py-3 text-left text-sm font-bold text-[var(--pasuseva-green)] border-b">Status</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((c, idx) => (
              <tr
                key={c.email}
                className="hover:bg-[var(--pasuseva-green)]/10 dark:hover:bg-[var(--pasuseva-green)]/20 transition-colors"
              >
                <td className="px-4 py-3 border-b text-gray-700 dark:text-gray-200 font-semibold">{idx + 1}</td>
                <td className="px-4 py-3 border-b text-[var(--pasuseva-orange)] font-semibold">{c.name}</td>
                <td className="px-4 py-3 border-b text-gray-700 dark:text-gray-300">{c.email}</td>
                <td className="px-4 py-3 border-b text-gray-700 dark:text-gray-300">{c.phone}</td>
                <td className="px-4 py-3 border-b text-gray-700 dark:text-gray-300">{c.address}</td>
                <td className="px-4 py-3 border-b">
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${c.status === "Active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                    {c.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomerList;