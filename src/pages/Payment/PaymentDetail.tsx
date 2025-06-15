import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaCheckCircle, FaTimesCircle, FaHourglassHalf } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { fetchPaymentDetail } from "../../features/payment/paymentDetailSlice";
import { RootState } from "../../store";

const statusInfo = {
  paid: {
    color: "bg-[var(--pasuseva-green)]/20 text-[var(--pasuseva-green)]",
    icon: <FaCheckCircle className="inline mr-1 text-[var(--pasuseva-green)]" />,
    label: "Paid",
  },
  created: {
    color: "bg-[var(--pasuseva-yellow1)]/30 text-[#bfa100]",
    icon: <FaHourglassHalf className="inline mr-1 text-[#bfa100]" />,
    label: "Created",
  },
  failed: {
    color: "bg-[var(--pasuseva-orange)]/20 text-[var(--pasuseva-orange)]",
    icon: <FaTimesCircle className="inline mr-1 text-[var(--pasuseva-orange)]" />,
    label: "Failed",
  },
};

const labelClass = "text-sm text-gray-500 dark:text-gray-300";
const valueClass = "font-medium text-gray-900 dark:text-gray-100";

const PaymentDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data: payment, loading, error } = useSelector((state: RootState) => state.paymentDetail);

  useEffect(() => {
    if (id) dispatch(fetchPaymentDetail(id) as any);
  }, [dispatch, id]);

  if (loading) {
    return (
      <div className="p-6 min-h-screen bg-white dark:bg-[#181c13] flex items-center justify-center">
        <span className="text-[var(--pasuseva-green)] text-lg">Loading...</span>
      </div>
    );
  }

  if (error || !payment) {
    return (
      <div className="p-6 min-h-screen bg-white dark:bg-[#181c13] flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4 text-[var(--pasuseva-green)]">
          Payment Detail
        </h1>
        <div className="text-red-500 text-lg mb-6">
          <FaTimesCircle className="inline mr-2" />
          No payment found for ID:{" "}
          <span className="font-semibold">{id}</span>
        </div>
        <button
          className="px-4 py-2 rounded bg-[var(--pasuseva-orange)] text-white hover:bg-[var(--pasuseva-green)] transition font-semibold text-sm"
          onClick={() => navigate(-1)}
        >
          Back to List
        </button>
      </div>
    );
  }

  const status =
    statusInfo[payment.status as keyof typeof statusInfo] || statusInfo["created"];

  return (
    <div className="p-6 min-h-screen bg-white dark:bg-[#1f1f1f]">
      <div className="flex items-center gap-2 mb-6">
        <span className="inline-block w-2 h-8 bg-[var(--pasuseva-orange)] rounded-sm"></span>
        <h1 className="text-2xl font-bold text-[var(--pasuseva-green)]">
          Payment Detail
        </h1>
      </div>
      <div className="max-w-xl mx-auto bg-white dark:bg-[#232d1b] rounded-xl shadow-lg p-6 border border-gray-200 dark:border-[var(--pasuseva-green)] transition-colors">
        <div className="mb-4 flex justify-between items-center">
          <span className={labelClass}>Payment ID</span>
          <span className="font-semibold text-sm text-black dark:text-white">
            {payment.razorpay_order_id || payment._id}
          </span>
        </div>
        <div className="mb-4 flex justify-between items-center">
          <span className={labelClass}>Farmer Name</span>
          <span className={valueClass}>
            {payment.userDetails?.fullName || "-"}
          </span>
        </div>
        <div className="mb-4 flex justify-between items-center">
          <span className={labelClass}>Amount</span>
          <span className="font-semibold text-[var(--pasuseva-green)]">
            ₹{payment.amount}
          </span>
        </div>
        <div className="mb-4 flex justify-between items-center">
          <span className={labelClass}>Date</span>
          <span className={valueClass}>
            {payment.createdAt
              ? new Date(payment.createdAt).toLocaleDateString()
              : "-"}
          </span>
        </div>
        <div className="mb-2 flex justify-between items-center">
          <span className={labelClass}>Status</span>
          <span
            className={`px-3 py-1 rounded-full text-xs font-bold flex items-center ${status.color}`}
          >
            {status.icon}
            {status.label}
          </span>
        </div>
      </div>
      <div className="flex justify-center">
        <button
          className="mt-8 px-4 py-2 rounded bg-[var(--pasuseva-orange)] text-white hover:bg-[var(--pasuseva-green)] transition font-semibold text-sm"
          onClick={() => navigate(-1)}
        >
          Back to List
        </button>
      </div>
    </div>
  );
};

export default PaymentDetail;