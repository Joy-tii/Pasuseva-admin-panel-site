import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { addYojnaRegistration, fetchYojnaRegistrations } from "../../store/yojnaRegistrationSlice";
import { useNavigate } from "react-router-dom";

const inputBase =
  "w-full rounded px-4 py-2 focus:outline-none focus:ring-2 transition-colors duration-150 bg-[var(--bg-white)] text-[var(--text-primary)] dark:bg-[#232d1b] dark:text-white";
const inputBorder =
  "border border-[var(--pasuseva-yellow1)] focus:border-[var(--pasuseva-yellow1)] focus:ring-0 focus:outline-none";

const AddCustomer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    fatherName: "",
    dob: "",
    phone: "",
    email: "",
    address: "",
    state: "",
    district: "",
    block: "",
    aadhaar: "",
    yojna: "",
  });

  const photoRef = useRef<HTMLInputElement>(null);
  const aadhaarFrontRef = useRef<HTMLInputElement>(null);
  const aadhaarBackRef = useRef<HTMLInputElement>(null);
  const landDocsRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const form = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      form.append(key, value);
    });

    if (photoRef.current?.files?.[0]) {
      form.append("photo", photoRef.current.files[0]);
    }
    if (aadhaarFrontRef.current?.files?.[0]) {
      form.append("aadhaarFront", aadhaarFrontRef.current.files[0]);
    }
    if (aadhaarBackRef.current?.files?.[0]) {
      form.append("aadhaarBack", aadhaarBackRef.current.files[0]);
    }
    if (landDocsRef.current?.files?.[0]) {
      form.append("landDocs", landDocsRef.current.files[0]);
    }

    try {
      await dispatch(addYojnaRegistration(form) as any);
      await dispatch(fetchYojnaRegistrations() as any); // 🔁 Refresh list
      alert("Registration submitted successfully!");
      navigate("/yojna-list"); // ✅ Navigate to list
    } catch (error) {
      alert("Submission failed.");
    }
  };

  return (
    <div className="p-6 min-h-screen bg-[var(--bg-white)] dark:bg-[#1f1f1f] text-[var(--text-primary)] dark:text-white flex flex-col items-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-5xl bg-[var(--bg-white)] dark:bg-[#232d1b] rounded-xl shadow p-6 space-y-6"
      >
        {/* Row 1 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <input type="text" placeholder="Full Name" value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            className={`${inputBase} ${inputBorder}`} />

          <input type="text" placeholder="Father's Name" value={formData.fatherName}
            onChange={(e) => setFormData({ ...formData, fatherName: e.target.value })}
            className={`${inputBase} ${inputBorder}`} />

          <input type="date" value={formData.dob}
            onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
            className={`${inputBase} ${inputBorder}`} />
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <input type="text" placeholder="Mobile Number" value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className={`${inputBase} ${inputBorder}`} />

          <input type="email" placeholder="Email ID" value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className={`${inputBase} ${inputBorder}`} />

          <input type="file" ref={photoRef} className="text-white" />
        </div>

        {/* Address */}
        <textarea rows={3} placeholder="Full Address" value={formData.address}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          className={`${inputBase} ${inputBorder}`} />

        {/* Row 3 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <input type="text" placeholder="State" value={formData.state}
            onChange={(e) => setFormData({ ...formData, state: e.target.value })}
            className={`${inputBase} ${inputBorder}`} />

          <input type="text" placeholder="District" value={formData.district}
            onChange={(e) => setFormData({ ...formData, district: e.target.value })}
            className={`${inputBase} ${inputBorder}`} />

          <input type="text" placeholder="Block" value={formData.block}
            onChange={(e) => setFormData({ ...formData, block: e.target.value })}
            className={`${inputBase} ${inputBorder}`} />
        </div>

        {/* Row 4 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <input type="text" placeholder="Aadhaar Number" value={formData.aadhaar}
            onChange={(e) => setFormData({ ...formData, aadhaar: e.target.value })}
            className={`${inputBase} ${inputBorder}`} />

          <input type="file" ref={aadhaarFrontRef} className="text-white" />
          <input type="file" ref={aadhaarBackRef} className="text-white" />
        </div>

        {/* Row 5 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input type="file" ref={landDocsRef} className="text-white" />

          <select value={formData.yojna}
            onChange={(e) => setFormData({ ...formData, yojna: e.target.value })}
            className={`${inputBase} ${inputBorder} h-[44px]`}
          >
            <option value="">Select Yojna</option>
            <option value="Pashu Dhan Yojna">Pashu Dhan Yojna</option>
            <option value="Gaushala Sahayata Yojna">Gaushala Sahayata Yojna</option>
            <option value="Bakri Palan Yojna">Bakri Palan Yojna</option>
            <option value="Dairy Yojna">Dairy Yojna</option>
            <option value="Other Yojna">Other Yojna</option>
          </select>
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <button type="submit" className="bg-[var(--pasuseva-green)] hover:bg-green-700 text-white font-semibold px-12 py-3 rounded-lg shadow transition-colors">
            Submit Application (Form Fee: ₹500)
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCustomer;
