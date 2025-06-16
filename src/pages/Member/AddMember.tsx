import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../features/store";
import { addMembers, Member } from "../../store/memberSlice";

const inputBase =
  "w-full rounded px-4 py-2 focus:outline-none transition-colors duration-150 bg-[var(--bg-white)] text-[var(--text-primary)] dark:bg-[#232d1b] dark:text-white";
const inputBorder =
  "border border-[var(--pasuseva-yellow1)] focus:border-[var(--pasuseva-yellow1)] focus:ring-0";

const AddMember = () => {
  const dispatch = useDispatch<AppDispatch>();
  // State for input values (optional, for controlled inputs)
  const [form, setForm] = useState<Partial<Member>>({
    name: "",
    mobile: "",
    email: "",

  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted:", form);
    dispatch(addMembers(form))
    // Reset form after submission
    setForm({
      name: "",
      mobile: "",
      email: "",

    });
  }

  return (
    <div className="p-6 min-h-screen bg-[var(--bg-white)] dark:bg-[#1f1f1f] text-[var(--text-primary)] dark:text-white flex flex-col items-center">
      <form className="w-full max-w-2xl bg-[var(--bg-white)] dark:bg-[#232d1b] rounded-xl shadow p-6 space-y-6">
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-1 font-medium dark:text-white">Name</label>
              <input
                type="text"
                className={`${inputBase} ${inputBorder}`}
                placeholder="Enter name"
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
              />
            </div>
            <div>
              <label className="block mb-1 font-medium dark:text-white">Mobile Number</label>
              <input
                type="tel"
                className={`${inputBase} ${inputBorder}`}
                placeholder="Enter mobile number"
                value={form.mobile}
                onChange={e => setForm({ ...form, mobile: e.target.value })}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-1 font-medium dark:text-white">Email</label>
              <input
                type="email"
                className={`${inputBase} ${inputBorder}`}
                placeholder="Enter email"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
              />
            </div>

          </div>

        </div>
        <div className="flex justify-end">
          <button
            onClick={handleSubmit}
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