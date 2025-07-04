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
                <div className="text-[var(--pasuseva-green)] text-lg font-medium">Loading...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-6 min-h-screen bg-white dark:bg-[#1f1f1f] flex items-center justify-center">
                <div className="text-red-500 text-lg font-medium">{error}</div>
            </div>
        );
    }

    if (!selectedYojnaRegistration) {
        return (
            <div className="p-6 min-h-screen bg-white dark:bg-[#1f1f1f] flex items-center justify-center">
                <div className="text-gray-500 dark:text-gray-400 text-lg font-medium">Customer not found</div>
            </div>
        );
    }

    const imageFields = ["photo", "aadhaarFront"] as const;

    return (
        <div className="p-6 min-h-screen bg-white dark:bg-[#1f1f1f]">
            <div className="max-w-3xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <button
                        onClick={() => navigate(-1)}
                        className="text-[var(--pasuseva-green)] hover:text-[var(--pasuseva-orange)] transition-colors duration-200 flex items-center gap-2 text-sm font-semibold"
                    >
                        <FaArrowLeft />
                        <span>Back to List</span>
                    </button>
                    <h1 className="text-2xl font-bold text-[var(--pasuseva-green)] tracking-wide flex items-center">
                        <span className="inline-block align-middle mr-2 w-2 h-6 bg-[var(--pasuseva-orange)] rounded-sm"></span>
                        Customer Details
                    </h1>
                </div>

                {/* Customer Info Card */}
                <div className="bg-white dark:bg-[#232d1b] rounded-xl shadow-md p-6 border border-[var(--pasuseva-green)]/20 grid grid-cols-2 space-y-6">
                    {([
                        [FaUser, "Full Name", selectedYojnaRegistration.fullName, "text-[var(--pasuseva-orange)]"],
                        [FaPhone, "Phone Number", selectedYojnaRegistration.phone],
                        [FaEnvelope, "Email Address", selectedYojnaRegistration.email],
                        [FaMapMarkerAlt, "Address", selectedYojnaRegistration.address],
                        [FaUser, "Father's Name", selectedYojnaRegistration.fatherName],
                        [null, "Date of Birth", new Date(selectedYojnaRegistration.dob).toLocaleDateString()],
                        [FaMapMarkerAlt, "Location", `${selectedYojnaRegistration.block}, ${selectedYojnaRegistration.district}, ${selectedYojnaRegistration.state}`],
                        [null, "Aadhaar Number", selectedYojnaRegistration.aadhaar],
                    ] as [typeof FaUser | null, string, string | undefined, string?][]).map(([Icon, label, value, textColor], index) => (
                        value && (
                            <div key={index} className="flex items-start gap-4">
                                <div className="text-[var(--pasuseva-green)] mt-1">
                                    {Icon ? <Icon className={`${label === "Phone Number" && 'rotate-90'} w-5 h-5`} /> : <span className="text-xl">•</span>}
                                </div>
                                <div>
                                    <h3 className="text-sm text-gray-500 dark:text-gray-400">{label}</h3>
                                    <p className={`text-lg font-semibold text-gray-700 dark:text-gray-200 ${textColor || ""}`}>{value}</p>
                                </div>
                            </div>
                        )
                    ))}

                    {/* Status */}
                    {selectedYojnaRegistration.status && (
                        <div className="flex items-start gap-4">
                            <div className="text-[var(--pasuseva-green)] mt-1">•</div>
                            <div>
                                <h3 className="text-sm text-gray-500 dark:text-gray-400">Status</h3>
                                <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${selectedYojnaRegistration.status === "Active"
                                    ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                                    : "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"}`}
                                >
                                    {selectedYojnaRegistration.status}
                                </span>
                            </div>
                        </div>
                    )}

                    {/* Yojna */}
                    {selectedYojnaRegistration.yojna && (
                        <div className="flex items-start gap-4">
                            <div className="text-[var(--pasuseva-green)] mt-1">📌</div>
                            <div>
                                <h3 className="text-sm text-gray-500 dark:text-gray-400">Yojna</h3>
                                <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">{selectedYojnaRegistration.yojna}</p>
                            </div>
                        </div>
                    )}

                    {/* Uploaded Documents - Two Columns */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {imageFields.map((field) => (
                            selectedYojnaRegistration[field] && (
                                <div key={field}>
                                    <h3 className="text-sm text-gray-500 dark:text-gray-400 mb-1 capitalize">
                                        {field === "aadhaarFront" ? "Aadhaar Front" : "Uploaded Photo"}
                                    </h3>
                                    <img
                                        src={selectedYojnaRegistration[field] as string}
                                        alt={field}
                                        className="w-full max-w-[200px] rounded shadow border border-gray-200 dark:border-gray-700"
                                    />
                                </div>
                            )
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomerDetail;
