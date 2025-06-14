import React from "react";
import { useNavigate } from "react-router-dom";
import { FaUserPlus } from "react-icons/fa";

const members = [
  {
    name: "Amit Kumar",
    age: 28,
    relation: "Brother",
    mobile: "9876543210",
    address: "Delhi",
    status: "Active",
  },
  {
    name: "Suman Sharma",
    age: 32,
    relation: "Sister",
    mobile: "9123456780",
    address: "Lucknow",
    status: "Inactive",
  },
];

const MemberList = () => {
  const navigate = useNavigate();

  return (
    <div className="p-6 min-h-screen bg-[var(--bg-white)] dark:bg-[#1f1f1f]">
      <div className="flex items-center justify-between mb-8 max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold text-[var(--pasuseva-green)] tracking-wide">
          <span className="inline-block align-middle mr-2 w-2 h-6 bg-[var(--pasuseva-orange)] rounded-sm"></span>
          Member List
        </h1>
        <button
          onClick={() => navigate("/member/add")}
          className="bg-[var(--pasuseva-orange)] hover:bg-orange-600 transition-colors duration-200 text-white font-semibold px-6 py-2 rounded-lg shadow-md flex items-center gap-2"
        >
          <FaUserPlus className="text-lg" />
          Add Member
        </button>
      </div>
      <div className="overflow-x-auto max-w-5xl mx-auto">
        <table className="min-w-full bg-[var(--bg-white)] dark:bg-[#232d1b] border border-[var(--pasuseva-green)] rounded-xl shadow">
          <thead>
            <tr className="bg-[var(--pasuseva-green)]/10 dark:bg-[var(--pasuseva-green)]/20">
              <th className="px-4 py-3 text-left text-sm font-bold text-[var(--pasuseva-green)] border-b">#</th>
              <th className="px-4 py-3 text-left text-sm font-bold text-[var(--pasuseva-green)] border-b">Name</th>
              <th className="px-4 py-3 text-left text-sm font-bold text-[var(--pasuseva-green)] border-b">Age</th>
              <th className="px-4 py-3 text-left text-sm font-bold text-[var(--pasuseva-green)] border-b">Relation</th>
              <th className="px-4 py-3 text-left text-sm font-bold text-[var(--pasuseva-green)] border-b">Mobile</th>
              <th className="px-4 py-3 text-left text-sm font-bold text-[var(--pasuseva-green)] border-b">Address</th>
              <th className="px-4 py-3 text-left text-sm font-bold text-[var(--pasuseva-green)] border-b">Status</th>
            </tr>
          </thead>
          <tbody>
            {members.map((m, idx) => (
              <tr
                key={m.name + m.mobile}
                className="hover:bg-[var(--pasuseva-green)]/10 dark:hover:bg-[var(--pasuseva-green)]/20 transition-colors"
              >
                <td className="px-4 py-3 border-b text-gray-700 dark:text-gray-200 font-semibold">{idx + 1}</td>
                <td className="px-4 py-3 border-b text-[var(--pasuseva-orange)] font-semibold">{m.name}</td>
                <td className="px-4 py-3 border-b text-gray-700 dark:text-gray-300">{m.age}</td>
                <td className="px-4 py-3 border-b text-gray-700 dark:text-gray-300">{m.relation}</td>
                <td className="px-4 py-3 border-b text-gray-700 dark:text-gray-300">{m.mobile}</td>
                <td className="px-4 py-3 border-b text-gray-700 dark:text-gray-300">{m.address}</td>
                <td className="px-4 py-3 border-b">
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${m.status === "Active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                    {m.status}
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

export default MemberList;