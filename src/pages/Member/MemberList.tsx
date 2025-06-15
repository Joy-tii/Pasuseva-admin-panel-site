import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMembers } from "../../store/memberSlice";

import { useNavigate } from "react-router-dom";
import { FaUserPlus } from "react-icons/fa";
import { RootState } from "../../features/store";

const MemberList = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { list: members = [], loading, error } =
		useSelector((state: RootState) => state.members) || {
			list: [],
			loading: false,
			error: null,
		};

	useEffect(() => {
		dispatch(fetchMembers() as any);
	}, [dispatch]);

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
								Created At
							</th>
						</tr>
					</thead>
					<tbody>
						{loading ? (
							<tr>
								<td colSpan={4} className="text-center py-8 text-[var(--pasuseva-green)]">
									Loading...
								</td>
							</tr>
						) : error ? (
							<tr>
								<td colSpan={4} className="text-center py-8 text-red-500">
									{error}
								</td>
							</tr>
						) : members.length === 0 ? (
							<tr>
								<td colSpan={4} className="text-center py-8 text-gray-400 dark:text-gray-500">
									कोई सदस्य रिकॉर्ड नहीं मिला।
								</td>
							</tr>
						) : (
							members.map((m, idx) => (
								<tr
									key={m._id}
									className="hover:bg-[var(--pasuseva-green)]/10 dark:hover:bg-[var(--pasuseva-green)]/20 transition-colors"
								>
									<td className="px-4 py-3 border-b text-gray-700 dark:text-gray-200 font-semibold">
										{idx + 1}
									</td>
									<td className="px-4 py-3 border-b text-[var(--pasuseva-orange)] font-semibold">
										{m.name}
									</td>
									<td className="px-4 py-3 border-b text-gray-700 dark:text-gray-300">
										{m.email}
									</td>
									<td className="px-4 py-3 border-b text-gray-700 dark:text-gray-300">
										{new Date(m.createdAt).toLocaleDateString()}
									</td>
								</tr>
							))
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default MemberList;