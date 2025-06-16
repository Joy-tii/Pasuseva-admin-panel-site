// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";

// const statusColor = {
//   paid: "bg-[var(--pasuseva-green)]/20 text-[var(--pasuseva-green)]",
//   created: "bg-[var(--pasuseva-yellow1)]/30 text-[#bfa100]",
//   failed: "bg-[var(--pasuseva-orange)]/20 text-[var(--pasuseva-orange)]",
// };

// const PaymentList: React.FC = () => {
//   const [payments, setPayments] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchPayments = async () => {
//       setLoading(true);
//       try {
//         const response = await axios.get(
//           "http://localhost:4013/api/payment"
//         );
//         setPayments(response.data.data || []);
//       } catch (err) {
//         setError("Failed to load payments");
//       }
//       setLoading(false);
//     };
//     fetchPayments();
//   }, []);

//   if (loading) {
//     return (
//       <div className="p-6 min-h-screen bg-white dark:bg-[#181c13] flex items-center justify-center">
//         <span className="text-[var(--pasuseva-green)] text-lg">Loading...</span>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="p-6 min-h-screen bg-white dark:bg-[#181c13] flex items-center justify-center">
//         <span className="text-red-500 text-lg">{error}</span>
//       </div>
//     );
//   }

//   return (
//     <div className="p-6 min-h-screen bg-white dark:bg-[#1f1f1f]">
//       <h1 className="text-2xl font-bold mb-6 text-[var(--pasuseva-green)] dark:text-[var(--pasuseva-green)]">
//         पशु सेवा - Payment List
//       </h1>
//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-white dark:bg-[#232323] rounded-lg shadow border border-gray-200 dark:border-[var(--pasuseva-green)]">
//           <thead>
//             <tr className="bg-[var(--pasuseva-green)] text-white">
//               <th className="px-4 py-2 text-left text-sm">Payment ID</th>
//               <th className="px-4 py-2 text-left text-sm">Farmer Name</th>
//               <th className="px-4 py-2 text-left text-sm">Amount</th>
//               <th className="px-4 py-2 text-left text-sm">Date</th>
//               <th className="px-4 py-2 text-left text-sm">Status</th>
//               <th className="px-4 py-2 text-left text-sm">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {payments.map((pmt, idx) => (
//               <tr
//                 key={pmt._id}
//                 className={`border-b last:border-b-0 ${
//                   idx % 2 === 1
//                     ? "bg-[var(--pasuseva-yellow1)]/10 dark:bg-[#232d1b]"
//                     : "bg-white dark:bg-[#232323]"
//                 } hover:bg-[var(--pasuseva-green)]/10 dark:hover:bg-[var(--pasuseva-green)]/20 transition`}
//               >
//                 <td className="px-4 py-2 text-sm font-semibold text-black dark:text-gray-100">
//                   {pmt.razorpay_order_id || pmt._id}
//                 </td>
//                 <td className="px-4 py-2 text-black dark:text-gray-100">
//                   {pmt.userDetails?.fullName || "-"}
//                 </td>
//                 <td className="px-4 py-2 text-black dark:text-gray-100">
//                   ₹{pmt.amount}
//                 </td>
//                 <td className="px-4 py-2 text-black dark:text-gray-100">
//                   {new Date(pmt.createdAt).toLocaleDateString()}
//                 </td>
//                 <td className="px-4 py-2">
//                   <span
//                     className={`px-3 py-1 rounded-full text-xs font-bold ${
//                       statusColor[pmt.status as keyof typeof statusColor] ||
//                       "bg-gray-200 text-gray-700"
//                     }`}
//                   >
//                     {pmt.status}
//                   </span>
//                 </td>
//                 <td className="px-4 py-2">
//                   <Link
//                     to={`/payments/${pmt._id}`}
//                     className="px-3 py-1 rounded bg-[var(--pasuseva-orange)] text-white hover:bg-[var(--pasuseva-green)] transition font-semibold text-xs"
//                   >
//                     View
//                   </Link>
//                 </td>
//               </tr>
//             ))}
//             {payments.length === 0 && (
//               <tr>
//                 <td colSpan={6} className="text-center py-8 text-gray-400 dark:text-gray-500">
//                   कोई पेमेंट रिकॉर्ड नहीं मिला。
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default PaymentList;