import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../features/store";
import { FaUserPlus, FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { fetchJobs } from "../../features/job-application/jobApplicationSlice";

const JobList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data: jobs = [], loading, error } = useSelector(
    (state: RootState) => state.job
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPosition, setSelectedPosition] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Fetch jobs when filters change
  useEffect(() => {
    dispatch(
      fetchJobs({
        search: debouncedSearch,
        position: selectedPosition,
      }) as any
    );
  }, [dispatch, debouncedSearch, selectedPosition]);

  const uniquePositions = [...new Set(jobs.map((j) => j.position))].filter(Boolean);

  const handleResetFilters = () => {
    setSearchTerm("");
    setSelectedPosition("");
  };

  const handleRowClick = (jobId: string) => {
    navigate(`/job-application/${jobId}/detail`);
  };

  return (
    <div className="p-6 min-h-screen bg-white dark:bg-[#1f1f1f]">
      <div className="flex items-center justify-between mb-8 max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold text-[var(--pasuseva-green)] tracking-wide">
          <span className="inline-block align-middle mr-2 w-2 h-6 bg-[var(--pasuseva-orange)] rounded-sm"></span>
          Job Applications
        </h1>

      </div>

      {/* Search and Filter Section */}
      <div className="max-w-5xl mx-auto mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Search */}
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

          {/* Position filter */}
          <select
            value={selectedPosition}
            onChange={(e) => setSelectedPosition(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-[var(--pasuseva-green)] dark:bg-[#232d1b] dark:text-gray-200"
          >
            <option value="">All Positions</option>
            {uniquePositions.map((position, index) => (
              <option key={index} value={position}>
                {position}
              </option>
            ))}
          </select>
        </div>

        {/* Reset Filters */}
        {(searchTerm || selectedPosition) && (
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

      {/* Table */}
      <div className="overflow-x-auto max-w-5xl mx-auto">
        {loading ? (
          <div className="text-center py-8 text-[var(--pasuseva-green)]">Loading...</div>
        ) : error ? (
          <div className="text-center py-8 text-red-500">{error}</div>
        ) : (
          <table className="min-w-full bg-white dark:bg-[#232d1b] border border-[var(--pasuseva-green)] rounded-xl shadow">
            <thead>
              <tr className="bg-[var(--pasuseva-green)]/10 dark:bg-[var(--pasuseva-green)]/20">
                <th className="px-4 py-3 text-left text-sm font-bold text-[var(--pasuseva-green)] border-b">#</th>
                <th className="px-4 py-3 text-left text-sm font-bold text-[var(--pasuseva-green)] border-b">Name</th>
                <th className="px-4 py-3 text-left text-sm font-bold text-[var(--pasuseva-green)] border-b">Phone</th>
                <th className="px-4 py-3 text-left text-sm font-bold text-[var(--pasuseva-green)] border-b">Email</th>
                <th className="px-4 py-3 text-left text-sm font-bold text-[var(--pasuseva-green)] border-b">Position</th>
                <th className="px-4 py-3 text-left text-sm font-bold text-[var(--pasuseva-green)] border-b">Status</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job, idx) => (
                <tr
                  key={job._id || idx}
                  className="hover:bg-[var(--pasuseva-green)]/10 dark:hover:bg-[var(--pasuseva-green)]/20 transition-colors cursor-pointer"
                  onClick={() => handleRowClick(job._id)}
                >
                  <td className="px-4 py-3 border-b text-gray-700 dark:text-gray-200 font-semibold">{idx + 1}</td>
                  <td className="px-4 py-3 border-b text-[var(--pasuseva-orange)] font-semibold">{job.fullName}</td>
                  <td className="px-4 py-3 border-b text-gray-700 dark:text-gray-300">{job.phone}</td>
                  <td className="px-4 py-3 border-b text-gray-700 dark:text-gray-300">{job.email}</td>
                  <td className="px-4 py-3 border-b text-gray-700 dark:text-gray-300">{job.position}</td>
                  <td className="px-4 py-3 border-b">
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${job.status === "completed"
                      ? "bg-green-100 text-green-700"
                      : job.status === "process"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-gray-200 text-gray-800"
                      }`}>
                      {job.status}
                    </span>
                  </td>
                </tr>
              ))}
              {jobs.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-gray-400 dark:text-gray-500">
                    कोई जॉब आवेदन नहीं मिला।
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

export default JobList;
