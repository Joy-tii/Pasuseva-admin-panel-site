import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchYojnaRegistrations } from "../../store/yojnaRegistrationSlice";
import { fetchMembers } from "../../store/memberSlice";
import { RootState } from "../../features/store";
import { FaUserPlus, FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const CustomerList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data: customers = [], loading, error } = useSelector(
    (state: RootState) => state.yojnaRegistration
  );
  const { list: members = [] } = useSelector(
    (state: RootState) => state.members
  );
  const { user } = useSelector(
    (state: RootState) => state.auth
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedYojna, setSelectedYojna] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // Fetch members on mount
  useEffect(() => {
    dispatch(fetchMembers() as any);
  }, [dispatch]);

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Fetch data when filters change
  useEffect(() => {
    dispatch(
      fetchYojnaRegistrations({
        search: debouncedSearch,
        yojna: selectedYojna,
        user: selectedUser,
      }) as any
    );
  }, [dispatch, debouncedSearch, selectedYojna, selectedUser]);

  // Get unique yojna names for filter dropdown
  const uniqueYojnas = [...new Set(customers.map((c) => c.yojna))].filter(Boolean);

  // Reset filters
  const handleResetFilters = () => {
    setSearchTerm("");
    setSelectedYojna("");
    setSelectedUser("");
  };

  const handleRowClick = (customerId: string) => {
    navigate(`/customer/${customerId}`);
  };

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

      {/* Search and Filter Section */}
      <div className="max-w-5xl mx-auto mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search Input */}
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-[var(--pasuseva-green)] dark:bg-[#232d1b] dark:text-gray-200"
            />
          </div>

          {/* Yojna Filter */}
          <select
            value={selectedYojna}
            onChange={(e) => setSelectedYojna(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-[var(--pasuseva-green)] dark:bg-[#232d1b] dark:text-gray-200"
          >
            <option value="">All Yojnas</option>
            {uniqueYojnas.map((yojna, index) => (
              <option key={index} value={yojna}>
                {yojna}
              </option>
            ))}
          </select>

          {/* Added By Filter */}
          {user?.role === 'admin' && <select
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-[var(--pasuseva-green)] dark:bg-[#232d1b] dark:text-gray-200"
          >
            <option value="">All Users</option>
            {members.map((member) => (
              <option key={member._id} value={member._id}>
                {member.name}
              </option>
            ))}
          </select>}
        </div>

        {/* Reset Filters */}
        {(searchTerm || selectedYojna || selectedUser) && (
          <div className="mt-4 flex justify-end">
            <button
              onClick={handleResetFilters}
              className="text-sm text-[var(--pasuseva-orange)] hover:text-orange-600 transition-colors duration-200"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      <div className="overflow-x-auto max-w-5xl mx-auto">
        {loading ? (
          <div className="text-center py-8 text-[var(--pasuseva-green)]">
            Loading...
          </div>
        ) : error ? (
          <div className="text-center py-8 text-red-500">{error}</div>
        ) : (
          <table className="min-w-full bg-white dark:bg-[#232d1b] border border-[var(--pasuseva-green)] rounded-xl shadow">
            <thead>
              <tr className="bg-[var(--pasuseva-green)]/10 dark:bg-[var(--pasuseva-green)]/20">
                <th className="px-4 py-3 text-left text-sm font-bold text-[var(--pasuseva-green)] border-b">
                  #
                </th>
                <th className="px-4 py-3 text-left text-sm font-bold text-[var(--pasuseva-green)] border-b">
                  Name
                </th>
                <th className="px-4 py-3 text-left text-sm font-bold text-[var(--pasuseva-green)] border-b">
                  Email
                </th>
                <th className="px-4 py-3 text-left text-sm font-bold text-[var(--pasuseva-green)] border-b">
                  Phone
                </th>
                <th className="px-4 py-3 text-left text-sm font-bold text-[var(--pasuseva-green)] border-b">
                  Address
                </th>
                {/* <th className="px-4 py-3 text-left text-sm font-bold text-[var(--pasuseva-green)] border-b">Status</th> */}
                <th className="px-4 py-3 text-left text-sm font-bold text-[var(--pasuseva-green)] border-b">
                  Yojna
                </th>
                <th className="px-4 py-3 text-left text-sm font-bold text-[var(--pasuseva-green)] border-b">
                  Added By
                </th>
              </tr>
            </thead>
            <tbody>
              {customers.map((c, idx) => (
                <tr
                  key={c._id || idx}
                  className="hover:bg-[var(--pasuseva-green)]/10 dark:hover:bg-[var(--pasuseva-green)]/20 transition-colors"
                  onClick={() => handleRowClick(c._id)}
                >
                  <td className="px-4 py-3 border-b text-gray-700 dark:text-gray-200 font-semibold">
                    {idx + 1}
                  </td>
                  <td className="px-4 py-3 border-b text-[var(--pasuseva-orange)] font-semibold">
                    {c.fullName}
                  </td>
                  <td className="px-4 py-3 border-b text-gray-700 dark:text-gray-300">
                    {c.email}
                  </td>
                  <td className="px-4 py-3 border-b text-gray-700 dark:text-gray-300">
                    {c.phone}
                  </td>
                  <td className="px-4 py-3 border-b text-gray-700 dark:text-gray-300">
                    {c.address}
                  </td>
                  {/* <td className="px-4 py-3 border-b">
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${c.status === "Active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                      {c.status || "Active"}
                    </span>
                  </td> */}
                  <td className="px-4 py-3 border-b text-gray-700 dark:text-gray-300">
                    {c.yojna}
                  </td>
                  <td className="px-4 py-3 border-b text-gray-700 dark:text-gray-300">
                    {c.user?.name}
                  </td>
                </tr>
              ))}
              {customers.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-gray-400 dark:text-gray-500">
                    कोई ग्राहक रिकॉर्ड नहीं मिला。
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default CustomerList;