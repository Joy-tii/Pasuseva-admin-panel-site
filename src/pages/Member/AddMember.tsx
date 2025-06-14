import  { useRef, useState } from "react";

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
        <span className="text-sm text-gray-500 dark:text-gray-300 truncate max-w-[180px]">{fileName}</span>
        <input
          ref={fileRef}
          type="file"
          className="hidden"
          onChange={e => {
            setFileName(e.target.files?.[0]?.name || "No file chosen");
          }}
        />
      </div>
    </div>
  );
};

const AddMember = () => {
  return (
    <div className="p-6 min-h-screen bg-[var(--bg-white)] dark:bg-[#1f1f1f] text-[var(--text-primary)] dark:text-white flex flex-col items-center">
      <form className="w-full max-w-4xl bg-[var(--bg-white)] dark:bg-[#232d1b] rounded-xl shadow p-6 space-y-6">
        {/* Row 1 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block mb-1 font-medium dark:text-white">Member Name</label>
            <input type="text" className={`${inputBase} ${inputBorder}`} />
          </div>
          <div>
            <label className="block mb-1 font-medium dark:text-white">Gender</label>
            <select className={`${inputBase} ${inputBorder}`}>
              <option value="">Select</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>
          <div>
            <label className="block mb-1 font-medium dark:text-white">Date of Birth</label>
            <input type="date" className={`${inputBase} ${inputBorder}`} />
          </div>
        </div>
        {/* Row 2 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block mb-1 font-medium dark:text-white">Age</label>
            <input type="number" className={`${inputBase} ${inputBorder}`} />
          </div>
          <div>
            <label className="block mb-1 font-medium dark:text-white">Caste Category</label>
            <select className={`${inputBase} ${inputBorder}`}>
              <option value="">Select</option>
              <option>General</option>
              <option>OBC</option>
              <option>SC</option>
              <option>ST</option>
              <option>Other</option>
            </select>
          </div>
          <div>
            <label className="block mb-1 font-medium dark:text-white">ID Proof Type</label>
            <select className={`${inputBase} ${inputBorder}`}>
              <option value="">Select</option>
              <option>Aadhaar</option>
              <option>Voter ID</option>
              <option>PAN</option>
              <option>Driving License</option>
              <option>Other</option>
            </select>
          </div>
        </div>
        {/* Row 3 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block mb-1 font-medium dark:text-white">ID Proof Number</label>
            <input type="text" className={`${inputBase} ${inputBorder}`} />
          </div>
          <div>
            <label className="block mb-1 font-medium dark:text-white">Mobile Number</label>
            <input type="text" className={`${inputBase} ${inputBorder}`} />
          </div>
          <div>
            <label className="block mb-1 font-medium dark:text-white">Address</label>
            <input type="text" className={`${inputBase} ${inputBorder}`} />
          </div>
        </div>
        {/* Row 4 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <FileInput label="Photo Upload" />
          </div>
          <div>
            <FileInput label="ID Proof Photo" />
          </div>
          <div>
            <label className="block mb-1 font-medium dark:text-white">Education Qualification</label>
            <input type="text" className={`${inputBase} ${inputBorder}`} />
          </div>
        </div>
        {/* Row 5 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block mb-1 font-medium dark:text-white">Occupation</label>
            <input type="text" className={`${inputBase} ${inputBorder}`} />
          </div>
          <div>
            <label className="block mb-1 font-medium dark:text-white">Annual Income</label>
            <input type="number" className={`${inputBase} ${inputBorder}`} />
          </div>
          <div>
            <label className="block mb-1 font-medium dark:text-white">Bank Account Number</label>
            <input type="text" className={`${inputBase} ${inputBorder}`} />
          </div>
        </div>
        {/* Row 6 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block mb-1 font-medium dark:text-white">IFSC Code</label>
            <input type="text" className={`${inputBase} ${inputBorder}`} />
          </div>
          <div>
            <label className="block mb-1 font-medium dark:text-white">Livestock Ownership</label>
            <select className={`${inputBase} ${inputBorder}`}>
              <option value="">Select</option>
              <option>Cow</option>
              <option>Buffalo</option>
              <option>Goat</option>
              <option>Hen</option>
              <option>Other</option>
            </select>
          </div>
          <div>
            <label className="block mb-1 font-medium dark:text-white">Disability (if any)</label>
            <input type="text" className={`${inputBase} ${inputBorder}`} placeholder="If yes, specify" />
          </div>
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-[var(--pasuseva-green)] hover:bg-green-700 text-white font-semibold px-12 py-3 rounded-lg shadow transition-colors"
          >
            Add Member
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddMember;