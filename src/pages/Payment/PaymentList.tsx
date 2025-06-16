import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchPayments } from "../../features/payment/paymentSlice";
import { RootState } from "../../features/store";

const statusColor = {
  paid: "bg-[var(--pasuseva-green)]/20 text-[var(--pasuseva-green)]",
  created: "bg-[var(--pasuseva-yellow1)]/30 text-[#bfa100]",
  failed: "bg-[var(--pasuseva-orange)]/20 text-[var(--pasuseva-orange)]",
};

const PaymentList: React.FC = () => {
  const dispatch = useDispatch();
  const { data: payments, loading, error } = useSelector((state: RootState) => state.payments);

  useEffect(() => {
    dispatch(fetchPayments() as any);
  }, [dispatch]);

  if (loading) {
    return (
      <div className="p-6 min-h-screen bg-white dark:bg-[#181c13] flex items-center justify-center">
        <span className="text-[var(--pasuseva-green)] text-lg">Loading...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 min-h-screen bg-white dark:bg-[#181c13] flex items-center justify-center">
        <span className="text-red-500 text-lg">{error}</span>
      </div>
    );
  }

  return (
    <div className="p-6 min-h-screen bg-white dark:bg-[#1f1f1f]">
      <h1 className="text-2xl font-bold mb-6 text-[var(--pasuseva-green)] dark:text-[var(--pasuseva-green)]">
        पशु सेवा - Payment List
      </h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-[#232323] rounded-lg shadow border border-gray-200 dark:border-[var(--pasuseva-green)]">
          <thead>
            <tr className="bg-[var(--pasuseva-green)] text-white">
              <th className="px-4 py-2 text-left text-sm">Payment ID</th>
              <th className="px-4 py-2 text-left text-sm">Yojna</th>
              <th className="px-4 py-2 text-left text-sm">Amount</th>
              <th className="px-4 py-2 text-left text-sm">Date</th>
              <th className="px-4 py-2 text-left text-sm">Status</th>
              <th className="px-4 py-2 text-left text-sm">Action</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((pmt: any, idx: number) => (
              <tr
                key={pmt._id}
                className={`border-b last:border-b-0 ${idx % 2 === 1
                  ? "bg-[var(--pasuseva-yellow1)]/10 dark:bg-[#232d1b]"
                  : "bg-white dark:bg-[#232323]"
                  } hover:bg-[var(--pasuseva-green)]/10 dark:hover:bg-[var(--pasuseva-green)]/20 transition`}
              >
                <td className="px-4 py-2 text-sm font-semibold text-black dark:text-gray-100">
                  {pmt.razorpay_order_id || pmt._id}
                </td>
                <td className="px-4 py-2 text-black dark:text-gray-100">
                  {pmt.yojnaRegistration?.yojna || "-"}
                </td>
                <td className="px-4 py-2 text-black dark:text-gray-100">
                  ₹{pmt.amount}
                </td>
                <td className="px-4 py-2 text-black dark:text-gray-100">
                  {new Date(pmt.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-2">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${statusColor[pmt.status as keyof typeof statusColor] ||
                      "bg-gray-200 text-gray-700"
                      }`}
                  >
                    {pmt.status}
                  </span>
                </td>
                <td className="px-4 py-2">
                  <Link
                    to={`/payments/${pmt._id}`}
                    className="px-3 py-1 rounded bg-[var(--pasuseva-orange)] text-white hover:bg-[var(--pasuseva-green)] transition font-semibold text-xs"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
            {payments.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center py-8 text-gray-400 dark:text-gray-500">
                  कोई पेमेंट रिकॉर्ड नहीं मिला।
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentList;

