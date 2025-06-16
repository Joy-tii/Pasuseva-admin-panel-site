import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { getCustomerById } from "../../store/customerSlice";
import { RootState } from "../../features/store";
import { FaArrowLeft, FaUser, FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { getYojnaRegistrationById } from "../../store/yojnaRegistrationSlice";

const CustomerDetail = () => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { selectedYojnaRegistration, loading, error } = useSelector(
        (state: RootState) => state.yojnaRegistration
    );

    useEffect(() => {
        if (id) {
            dispatch(getYojnaRegistrationById(id) as any);
        }
    }, [dispatch, id]);

    if (loading) {
        return (
            <div className="p-6 min-h-screen bg-white dark:bg-[#1f1f1f] flex items-center justify-center">
                <div className="text-[var(--pasuseva-green)]">Loading...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-6 min-h-screen bg-white dark:bg-[#1f1f1f] flex items-center justify-center">
                <div className="text-red-500">{error}</div>
            </div>
        );
    }

    if (!selectedYojnaRegistration) {
        return (
            <div className="p-6 min-h-screen bg-white dark:bg-[#1f1f1f] flex items-center justify-center">
                <div className="text-gray-500 dark:text-gray-400">Customer not found</div>
            </div>
        );
    }

    return (
        <div className="p-6 min-h-screen bg-white dark:bg-[#1f1f1f]">
            <div className="max-w-3xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <button
                        onClick={() => navigate(-1)}
                        className="text-[var(--pasuseva-green)] hover:text-[var(--pasuseva-orange)] transition-colors duration-200 flex items-center gap-2"
                    >
                        <FaArrowLeft />
                        <span>Back to List</span>
                    </button>
                    <h1 className="text-2xl font-bold text-[var(--pasuseva-green)] tracking-wide">
                        <span className="inline-block align-middle mr-2 w-2 h-6 bg-[var(--pasuseva-orange)] rounded-sm"></span>
                        Customer Details
                    </h1>
                </div>

                {/* Customer Information Card */}
                <div className="bg-white dark:bg-[#232d1b] rounded-lg shadow-lg p-6 border border-[var(--pasuseva-green)]/20">
                    <div className="space-y-6">
                        {/* Name */}
                        <div className="flex items-start gap-4">
                            <div className="text-[var(--pasuseva-green)] mt-1">
                                <FaUser className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="text-sm text-gray-500 dark:text-gray-400">Full Name</h3>
                                <p className="text-lg font-semibold text-[var(--pasuseva-orange)]">{selectedYojnaRegistration.fullName}</p>
                            </div>
                        </div>

                        {/* Phone */}
                        <div className="flex items-start gap-4">
                            <div className="text-[var(--pasuseva-green)] mt-1">
                                <FaPhone className="w-5 h-5 rotate-90" />
                            </div>
                            <div>
                                <h3 className="text-sm text-gray-500 dark:text-gray-400">Phone Number</h3>
                                <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">{selectedYojnaRegistration.phone}</p>
                            </div>
                        </div>

                        {/* Email */}
                        <div className="flex items-start gap-4">
                            <div className="text-[var(--pasuseva-green)] mt-1">
                                <FaEnvelope className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="text-sm text-gray-500 dark:text-gray-400">Email Address</h3>
                                <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">{selectedYojnaRegistration.email}</p>
                            </div>
                        </div>

                        {/* Address */}
                        {selectedYojnaRegistration.address && (
                            <div className="flex items-start gap-4">
                                <div className="text-[var(--pasuseva-green)] mt-1">
                                    <FaMapMarkerAlt className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="text-sm text-gray-500 dark:text-gray-400">Address</h3>
                                    <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">{selectedYojnaRegistration.address}</p>
                                </div>
                            </div>
                        )}

                        {/* Status */}
                        {selectedYojnaRegistration.status && (
                            <div className="flex items-start gap-4">
                                <div className="text-[var(--pasuseva-green)] mt-1">
                                    <div className="w-5 h-5 flex items-center justify-center">•</div>
                                </div>
                                <div>
                                    <h3 className="text-sm text-gray-500 dark:text-gray-400">Status</h3>
                                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${selectedYojnaRegistration.status === "Active"
                                        ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                                        : "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
                                        }`}>
                                        {selectedYojnaRegistration.status}
                                    </span>
                                </div>
                            </div>
                        )}
                        {selectedYojnaRegistration.yojna && (
                            <div className="flex items-start gap-4">
                                <div className="text-[var(--pasuseva-green)] mt-1">
                                    <div className="w-5 h-5 flex items-center justify-center">•</div>
                                </div>
                                <div>
                                    <h3 className="text-sm text-gray-500 dark:text-gray-400">Yojna</h3>
                                    {selectedYojnaRegistration.yojna}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomerDetail;
