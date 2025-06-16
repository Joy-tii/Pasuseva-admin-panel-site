import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { RootState } from "../../features/store";
import { FaArrowLeft, FaUser, FaPhone, FaEnvelope, FaMapMarkerAlt, FaBriefcase } from "react-icons/fa";
import { getJobById } from "../../features/job-application/jobApplicationSlice";


const JobApplicationDetail = () => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { selectedJob, loading, error } = useSelector(
        (state: RootState) => state.job
    );

    useEffect(() => {
        if (id) {
            dispatch(getJobById(id) as any);
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

    if (!selectedJob) {
        return (
            <div className="p-6 min-h-screen bg-white dark:bg-[#1f1f1f] flex items-center justify-center">
                <div className="text-gray-500 dark:text-gray-400 text-lg font-medium">Application not found</div>
            </div>
        );
    }

    const imageFields = ["photo", "aadhaarFront", "aadhaarBack"] as const;

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
                        Job Application Details
                    </h1>
                </div>

                {/* Application Info Card */}
                <div className="bg-white dark:bg-[#232d1b] rounded-xl shadow-md p-6 border border-[var(--pasuseva-green)]/20 grid grid-cols-2 space-y-6">
                    {([
                        [FaUser, "Full Name", selectedJob.fullName],
                        [FaPhone, "Phone Number", selectedJob.phone],
                        [FaEnvelope, "Email Address", selectedJob.email],
                        [FaMapMarkerAlt, "Address", selectedJob.address],
                        [null, "Date of Birth", new Date(selectedJob.dob).toLocaleDateString()],
                        [FaUser, "Father's Name", selectedJob.fatherName],
                        [FaBriefcase, "Education", selectedJob.education],
                        // [FaBriefcase, "Experience", selectedJob.experience],
                        [FaMapMarkerAlt, "Location", `${selectedJob.block}, ${selectedJob.district}, ${selectedJob.state}`],
                        [null, "Aadhaar Number", selectedJob.aadhaar],
                    ] as [typeof FaUser | null, string, string | undefined][])
                        .map(([Icon, label, value], index) => (
                            value && (
                                <div key={index} className="flex items-start gap-4">
                                    <div className="text-[var(--pasuseva-green)] mt-1">
                                        {Icon ? <Icon className={`${label === "Phone Number" && 'rotate-90'} w-5 h-5`} /> : <span className="text-xl">•</span>}
                                    </div>
                                    <div>
                                        <h3 className="text-sm text-gray-500 dark:text-gray-400">{label}</h3>
                                        <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">{value}</p>
                                    </div>
                                </div>
                            )
                        ))}

                    {/* Status */}
                    {selectedJob.status && (
                        <div className="flex items-start gap-4">
                            <div className="text-[var(--pasuseva-green)] mt-1">•</div>
                            <div>
                                <h3 className="text-sm text-gray-500 dark:text-gray-400">Status</h3>
                                <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${selectedJob.status === "pending"
                                    ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                                    : "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"}`}
                                >
                                    {selectedJob.status}
                                </span>
                            </div>
                        </div>
                    )}

                    {/* Uploaded Documents */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {imageFields.map((field) => (
                            selectedJob[field] && (
                                <div key={field}>
                                    <h3 className="text-sm text-gray-500 dark:text-gray-400 mb-1 capitalize">
                                        {field === "aadhaarFront" ? "Aadhaar Front" :
                                            field === "aadhaarBack" ? "Aadhaar Back" :
                                                "Uploaded Photo"}
                                    </h3>
                                    <img
                                        src={selectedJob[field] as string}
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

export default JobApplicationDetail;
