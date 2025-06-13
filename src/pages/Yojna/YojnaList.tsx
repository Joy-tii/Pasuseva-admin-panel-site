import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const yojnaList = [
	{
		name: "Murgi Palan Yojna",
		desc: "मुर्गी पालन के लिए सरकारी सहायता योजना।",
		type: "पशुपालन",
		startDate: "2022-01-15",
		status: "Active",
		beneficiaries: 120,
	},
	{
		name: "Bakri Palan Yojna",
		desc: "बकरी पालन के लिए सब्सिडी योजना।",
		type: "पशुपालन",
		startDate: "2021-07-10",
		status: "Inactive",
		beneficiaries: 80,
	},
	{
		name: "Ghoda Palan Yojna",
		desc: "घोड़ा पालन हेतु सहायता योजना।",
		type: "पशुपालन",
		startDate: "2023-03-05",
		status: "Active",
		beneficiaries: 30,
	},
];

const YojnaList = () => {
	const navigate = useNavigate();

	return (
		<div className="p-6 min-h-screen bg-white dark:bg-[#1f1f1f]">
			<div className="flex items-center justify-between mb-8">
				<h1 className="text-2xl font-bold text-[var(--pasuseva-green)] tracking-wide">
					<span className="inline-block align-middle mr-2 w-2 h-6 bg-[var(--pasuseva-orange)] rounded-sm"></span>
					Yojna List
				</h1>
				<button
					onClick={() => navigate("/yojna/add")}
					className="bg-[var(--pasuseva-orange)] hover:bg-orange-600 transition-colors duration-200 text-white font-semibold px-6 py-2 rounded-lg shadow-md flex items-center gap-2"
				>
					<svg
						className="w-5 h-5"
						fill="none"
						stroke="currentColor"
						strokeWidth={2}
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M12 4v16m8-8H4"
						/>
					</svg>
					Add Yojna
				</button>
			</div>
			<div className="overflow-x-auto">
				<table className="min-w-full bg-white dark:bg-[#232d1b] border border-[var(--pasuseva-green)] rounded-xl shadow">
					<thead>
						<tr className="bg-[var(--pasuseva-green)]/10 dark:bg-[var(--pasuseva-green)]/20">
							<th className="px-4 py-3 text-left text-sm font-bold text-[var(--pasuseva-green)] border-b">
								#
							</th>
							<th className="px-4 py-3 text-left text-sm font-bold text-[var(--pasuseva-green)] border-b">
								Yojna Name
							</th>
							<th className="px-4 py-3 text-left text-sm font-bold text-[var(--pasuseva-green)] border-b">
								Description
							</th>
							<th className="px-4 py-3 text-left text-sm font-bold text-[var(--pasuseva-green)] border-b">
								Type
							</th>
							<th className="px-4 py-3 text-left text-sm font-bold text-[var(--pasuseva-green)] border-b">
								Start Date
							</th>
							<th className="px-4 py-3 text-left text-sm font-bold text-[var(--pasuseva-green)] border-b">
								Status
							</th>
							<th className="px-4 py-3 text-left text-sm font-bold text-[var(--pasuseva-green)] border-b">
								Beneficiaries
							</th>
							<th className="px-4 py-3 text-center text-sm font-bold text-[var(--pasuseva-green)] border-b">
								Action
							</th>
						</tr>
					</thead>
					<tbody>
						{yojnaList.map((yojna, idx) => (
							<tr
								key={yojna.name}
								className="hover:bg-[var(--pasuseva-green)]/10 dark:hover:bg-[var(--pasuseva-green)]/20 transition-colors"
							>
								<td className="px-4 py-3 border-b text-gray-700 dark:text-gray-200 font-semibold">
									{idx + 1}
								</td>
								<td className="px-4 py-3 border-b text-[var(--pasuseva-orange)] font-semibold">
									{yojna.name}
								</td>
								<td className="px-4 py-3 border-b text-gray-700 dark:text-gray-300">
									{yojna.desc}
								</td>
								<td className="px-4 py-3 border-b text-gray-700 dark:text-gray-300">
									{yojna.type}
								</td>
								<td className="px-4 py-3 border-b text-gray-700 dark:text-gray-300">
									{yojna.startDate}
								</td>
								<td className="px-4 py-3 border-b">
									<span
										className={`px-2 py-1 rounded text-xs font-semibold ${
											yojna.status === "Active"
												? "bg-green-100 text-green-700"
												: "bg-red-100 text-red-700"
										}`}
									>
										{yojna.status}
									</span>
								</td>
								<td className="px-4 py-3 border-b text-gray-700 dark:text-gray-300">
									{yojna.beneficiaries}
								</td>
								<td className="px-4 py-3 border-b">
									<div className="flex items-center justify-center gap-3">
										<button
											title="View"
											className="text-[var(--pasuseva-green)] hover:scale-110 transition-transform"
										>
											<FaEye size={18} />
										</button>
										<button
											title="Edit"
											className="text-[var(--pasuseva-orange)] hover:scale-110 transition-transform"
										>
											<FaEdit size={18} />
										</button>
										<button
											title="Delete"
											className="text-red-500 hover:scale-110 transition-transform"
										>
											<FaTrash size={18} />
										</button>
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default YojnaList;