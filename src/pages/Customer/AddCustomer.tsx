import React, { useRef, useState } from "react";

const inputBase =
  "w-full rounded px-4 py-2 focus:outline-none focus:ring-2 transition-colors duration-150 bg-[var(--bg-white)] text-[var(--text-primary)] dark:bg-[#232d1b] dark:text-white";
const inputBorder =
  "border-2 border-[var(--pasuseva-yellow1)] focus:ring-[var(--pasuseva-yellow1)]";

const FileInput = ({ label }: { label: string }) => {
  const fileRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState("No file chosen");

  return (
    <div>
      <label className="block mb-1 font-medium dark:text-white">{label}</label>
      <div
        className={`${inputBase} ${inputBorder} flex items-center gap-3 !px-2 !py-1`}
      >
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          className="px-4 py-2 bg-[var(--pasuseva-orange)] text-white rounded shadow hover:bg-orange-600 transition-colors"
        >
          Choose File
        </button>
        <span className="text-sm text-gray-500 dark:text-gray-300 truncate max-w-[180px]">
          {fileName}
        </span>
        <input
          ref={fileRef}
          type="file"
          className="hidden"
          onChange={(e) => {
            setFileName(e.target.files?.[0]?.name || "No file chosen");
          }}
        />
      </div>
    </div>
  );
};

const AddCustomer = () => {
  return (
    <div className="p-6 min-h-screen bg-[var(--bg-white)] dark:bg-[#1f1f1f] text-[var(--text-primary)] dark:text-white flex flex-col items-center">
      <form className="w-full max-w-5xl bg-[var(--bg-white)] dark:bg-[#232d1b] rounded-xl shadow p-6 space-y-6">
        {/* Row 1 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block mb-1 font-medium dark:text-white">
              Full Name
            </label>
            <input type="text" className={`${inputBase} ${inputBorder}`} />
          </div>
          <div>
            <label className="block mb-1 font-medium dark:text-white">
              Father's Name
            </label>
            <input type="text" className={`${inputBase} ${inputBorder}`} />
          </div>
          <div>
            <label className="block mb-1 font-medium dark:text-white">
              Date of Birth (DD/MM/YYYY)
            </label>
            <input type="date" className={`${inputBase} ${inputBorder}`} />
          </div>
        </div>
        {/* Row 2 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block mb-1 font-medium dark:text-white">
              Mobile Number
            </label>
            <input type="text" className={`${inputBase} ${inputBorder}`} />
          </div>
          <div>
            <label className="block mb-1 font-medium dark:text-white">Email ID</label>
            <input type="email" className={`${inputBase} ${inputBorder}`} />
          </div>
          <div>
            <FileInput label="Passport Size Photo" />
          </div>
        </div>
        {/* Address */}
        <div>
          <label className="block mb-1 font-medium dark:text-white">Full Address</label>
          <textarea rows={3} className={`${inputBase} ${inputBorder}`} />
        </div>
        {/* Row 3 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block mb-1 font-medium dark:text-white">State</label>
            <input type="text" className={`${inputBase} ${inputBorder}`} />
          </div>
          <div>
            <label className="block mb-1 font-medium dark:text-white">District</label>
            <input type="text" className={`${inputBase} ${inputBorder}`} />
          </div>
          <div>
            <label className="block mb-1 font-medium dark:text-white">Block</label>
            <input type="text" className={`${inputBase} ${inputBorder}`} />
          </div>
        </div>
        {/* Row 4 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block mb-1 font-medium dark:text-white">
              Highest Qualification
            </label>
            <input type="text" className={`${inputBase} ${inputBorder}`} />
          </div>
          <div>
            <label className="block mb-1 font-medium dark:text-white">
              Percentage (%)
            </label>
            <input type="text" className={`${inputBase} ${inputBorder}`} />
          </div>
          <div>
            <label className="block mb-1 font-medium dark:text-white">
              Passing Year
            </label>
            <input type="text" className={`${inputBase} ${inputBorder}`} />
          </div>
        </div>
        {/* Row 5 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block mb-1 font-medium dark:text-white">Aadhaar Number</label>
            <input type="text" className={`${inputBase} ${inputBorder}`} />
          </div>
          <div>
            <FileInput label="Aadhaar Card Front Photo" />
          </div>
          <div>
            <FileInput label="Aadhaar Card Back Photo" />
          </div>
        </div>
        {/* Land Document (Jamabandi/Receipt) - Only once! */}
        <div>
          <FileInput label="Land Document (Jamabandi/Receipt)" />
        </div>
        {/* Submit */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-[var(--pasuseva-green)] hover:bg-green-700 text-white font-semibold px-12 py-3 rounded-lg shadow transition-colors"
          >
            Submit Application (Form Fee: ₹500)
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCustomer;