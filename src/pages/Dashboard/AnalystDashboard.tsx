import React from "react";
import { FaKiwiBird } from "react-icons/fa";
import LineChartOne from "../../components/charts/line/LineChartOne";
import ChartTab from "../../components/common/ChartTab";

const yojnaCards = [
	{
		name: "Murgi Palan Yojna",
		icon: (
			<FaKiwiBird className="text-3xl text-[var(--pasuseva-orange)]" />
		),
		data: [
			{ label: "Total Loan", value: 200 },
			{ label: "This Month", value: 300 },
			{ label: "Last Month", value: 150 },
		],
		desc: "मुर्गी पालन के लिए सरकारी सहायता योजना।",
	},
	{
		name: "Bakri Palan Yojna",
		icon: (
			<FaKiwiBird className="text-3xl text-[var(--pasuseva-orange)]" />
		),
		data: [
			{ label: "Total Loan", value: 120 },
			{ label: "This Month", value: 80 },
			{ label: "Last Month", value: 60 },
		],
		desc: "बकरी पालन के लिए सब्सिडी योजना।",
	},
	{
		name: "Ghoda Palan Yojna",
		icon: (
			<FaKiwiBird className="text-3xl text-[var(--pasuseva-orange)]" />
		),
		data: [
			{ label: "Total Loan", value: 90 },
			{ label: "This Month", value: 40 },
			{ label: "Last Month", value: 30 },
		],
		desc: "घोड़ा पालन हेतु सहायता योजना।",
	},
];

const AnalystDashboard: React.FC = () => {
	return (
		<div className="p-6 min-h-screen bg-white dark:bg-[#1f1f1f]">
			<h1 className="text-2xl font-bold mb-6 text-[var(--pasuseva-green)]">
				Analyst Dashboard
			</h1>
			{/* Cards */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-4 justify-center mb-8">
				{yojnaCards.map((card) => (
					<div
						key={card.name}
						className="bg-white dark:bg-[#232d1b] rounded-xl shadow-lg px-4 py-4 flex flex-col items-center border border-gray-200 dark:border-[var(--pasuseva-green)] transition-colors max-w-xs w-full"
					>
						{card.icon}
						<h2 className="mt-2 text-base font-semibold text-gray-900 dark:text-gray-100">
							{card.name}
						</h2>
						<p className="text-xs text-gray-500 dark:text-gray-300 text-center mb-2">
							{card.desc}
						</p>
						<div className="flex flex-col gap-0 w-full mt-1">
							{card.data.map((item) => (
								<div
									key={item.label}
									className="flex justify-between w-full text-xs py-0.5"
								>
									<span className="text-gray-700 dark:text-gray-200">
										{item.label}
									</span>
									<span className="font-semibold text-[var(--pasuseva-orange)]">
										{item.value}
									</span>
								</div>
							))}
						</div>
					</div>
				))}
			</div>
			{/* Graph Section */}
			<div className="bg-white dark:bg-[#232d1b] rounded-xl shadow-lg p-6 border border-gray-200 dark:border-[var(--pasuseva-green)]">
				<div className="flex items-center justify-between mb-4">
					<h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
						Yojna Enrollment Graph
					</h2>
					<ChartTab /> {/* <-- ChartTab top right */}
				</div>
				<LineChartOne />
			</div>
		</div>
	);
};

export default AnalystDashboard;