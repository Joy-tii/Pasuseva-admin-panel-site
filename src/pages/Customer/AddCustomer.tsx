import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addYojnaRegistration, fetchYojnaRegistrations } from "../../store/yojnaRegistrationSlice";
import { useNavigate } from "react-router-dom";
import biharData from '../../data/bihar_data.json';
import DatePicker from "react-datepicker";
import dayjs from 'dayjs'
import "react-datepicker/dist/react-datepicker.css";
import { RootState } from "../../features/store";
import LoadingOverlay from "../../components/loader/LoadingOverlay";
import ConfirmationPopup from "../../components/ui/pop-up/ConfirmationPopUp";

const inputBase =
  "w-full rounded px-4 py-2 focus:outline-none focus:ring-2 transition-colors duration-150 bg-[var(--bg-white)] text-[var(--text-primary)] dark:bg-[#232d1b] dark:text-white";
const inputBorder =
  "border border-[var(--pasuseva-yellow1)] focus:border-[var(--pasuseva-yellow1)] focus:ring-0 focus:outline-none";

const AddCustomer = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false)
  const { loading } = useSelector((state: RootState) => state.yojnaRegistration)
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    fatherName: "",
    dob: new Date(),
    phone: "",
    email: "",
    address: "",
    state: "Bihar",
    district: "",
    block: "",
    aadhaar: "",
    yojna: "",
  });

  const [errors, setErrors] = useState({
    fullName: "",
    phone: "",
    email: "",
    aadhaar: "",
    yojna: "",
  });

  const [districts, setDistricts] = useState<string[]>([]);
  const [blocks, setBlocks] = useState<string[]>([]);

  const photoRef = useRef<HTMLInputElement>(null);
  const aadhaarFrontRef = useRef<HTMLInputElement>(null);
  const aadhaarBackRef = useRef<HTMLInputElement>(null);
  const landDocsRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (formData.state === "Bihar") {
      setDistricts(Object.keys(biharData.Bihar));
    }
  }, [formData.state]);

  useEffect(() => {
    if (formData.district && formData.district in biharData.Bihar) {
      setBlocks(biharData.Bihar[formData.district as keyof typeof biharData.Bihar]);
    } else {
      setBlocks([]);
    }
  }, [formData.district]);

  const validateField = (name: string, value: string) => {
    switch (name) {
      case 'phone':
        return value && !/^[0-9]{10}$/.test(value)
          ? 'Phone number must be 10 digits'
          : '';
      case 'email':
        return value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
          ? 'Invalid email format'
          : '';
      case 'aadhaar':
        return value && !/^[0-9]{12}$/.test(value)
          ? 'Aadhaar number must be 12 digits'
          : '';
      case 'fullName':
        return value.trim().length < 3
          ? 'Name must be at least 3 characters'
          : '';
      case 'yojna':
        return value.trim() === ""
          ? 'Yojna Must be selected'
          : '';
      default:
        return '';
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name in errors) {
      setErrors({ ...errors, [name]: validateField(name, value) });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields
    const newErrors = {
      fullName: validateField('fullName', formData.fullName),
      phone: validateField('phone', formData.phone),
      email: validateField('email', formData.email),
      aadhaar: validateField('aadhaar', formData.aadhaar),
      yojna: validateField('yojna', formData.yojna),
    };

    setErrors(newErrors);

    // Check if there are any errors
    if (Object.values(newErrors).some(error => error !== '')) {
      alert('Please fix the form errors before submitting.');
      return;
    }

    const form = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      form.append(key, value instanceof Date ? value.toISOString() : value);
    });
    if (photoRef.current?.files?.[0]) form.append("photo", photoRef.current.files[0]);
    if (aadhaarFrontRef.current?.files?.[0]) form.append("aadhaarFront", aadhaarFrontRef.current.files[0]);
    if (aadhaarBackRef.current?.files?.[0]) form.append("aadhaarBack", aadhaarBackRef.current.files[0]);
    if (landDocsRef.current?.files?.[0]) form.append("landDocs", landDocsRef.current.files[0]);
    try {
      await dispatch(addYojnaRegistration(form) as any);

      setIsOpen(true)
    } catch (error) {
      alert("Submission failed.");
    }
  };

  if (loading) return <LoadingOverlay />

  return (
    <div className="p-6 min-h-screen bg-[var(--bg-white)] dark:bg-[#1f1f1f] text-[var(--text-primary)] dark:text-white flex flex-col items-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-5xl bg-[var(--bg-white)] dark:bg-[#232d1b] rounded-xl shadow p-6 space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block mb-1 font-medium dark:text-white">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              className={`${inputBase} ${inputBorder} ${errors.fullName ? 'border-red-500' : ''}`}
            />
            {errors.fullName && <span className="text-red-500 text-sm mt-1">{errors.fullName}</span>}
          </div>
          <div>
            <label className="block mb-1 font-medium dark:text-white">Father's Name</label>
            <input
              type="text"
              name="fatherName"
              value={formData.fatherName}
              onChange={handleInputChange}
              className={`${inputBase} ${inputBorder}`}
            />
          </div>
          <div>
            <label className="block mb-1 font-medium dark:text-white">
              Date of Birth (DD/MM/YYYY)
            </label>
            <DatePicker
              dateFormat="dd/MM/yyyy"
              className={`${inputBase} ${inputBorder}`}
              selected={formData.dob ? new Date(formData.dob) : null}
              onChange={(date) => setFormData((prev) => ({ ...prev, dob: date || new Date() }))}
              placeholderText="DD/MM/YYYY"
            />
          </div>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block mb-1 font-medium dark:text-white">Mobile Number</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className={`${inputBase} ${inputBorder} ${errors.phone ? 'border-red-500' : ''}`}
            />
            {errors.phone && <span className="text-red-500 text-sm mt-1">{errors.phone}</span>}
          </div>
          <div>
            <label className="block mb-1 font-medium dark:text-white">Email ID</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`${inputBase} ${inputBorder} ${errors.email ? 'border-red-500' : ''}`}
            />
            {errors.email && <span className="text-red-500 text-sm mt-1">{errors.email}</span>}
          </div>
          <div>
            <label className="block mb-1 font-medium dark:text-white">Passport Size Photo</label>
            <div className="relative">
              <input
                type="file"
                ref={photoRef}
                accept="image/*"
                className="hidden"
                id="photo-upload"
              />
              <label
                htmlFor="photo-upload"
                className={`${inputBase} ${inputBorder} cursor-pointer flex items-center justify-center bg-[var(--bg-white)] dark:bg-[#232d1b] hover:bg-gray-50 dark:hover:bg-[#2a3520]`}
              >
                {photoRef.current?.files?.[0]?.name || 'Choose Photo'}
              </label>
            </div>
          </div>
        </div>

        <div>
          <label className="block mb-1 font-medium dark:text-white">Full Address</label>
          <textarea
            rows={3}
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            className={`${inputBase} ${inputBorder}`}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block mb-1 font-medium dark:text-white">State</label>
            <select
              name="state"
              value={formData.state}
              onChange={handleInputChange}
              className={`${inputBase} ${inputBorder}`}
            >
              <option value="Bihar">Bihar</option>
            </select>
          </div>
          <div>
            <label className="block mb-1 font-medium dark:text-white">District</label>
            <select
              name="district"
              value={formData.district}
              onChange={handleInputChange}
              className={`${inputBase} ${inputBorder}`}
            >
              <option value="">Select District</option>
              {districts.map((district) => (
                <option key={district} value={district}>
                  {district}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block mb-1 font-medium dark:text-white">Block</label>
            <select
              name="block"
              value={formData.block}
              onChange={handleInputChange}
              className={`${inputBase} ${inputBorder}`}
            >
              <option value="">Select Block</option>
              {blocks.map((block) => (
                <option key={block} value={block}>
                  {block}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block mb-1 font-medium dark:text-white">Aadhaar Number</label>
            <input
              type="text"
              name="aadhaar"
              value={formData.aadhaar}
              onChange={handleInputChange}
              className={`${inputBase} ${inputBorder} ${errors.aadhaar ? 'border-red-500' : ''}`}
            />
            {errors.aadhaar && <span className="text-red-500 text-sm mt-1">{errors.aadhaar}</span>}
          </div>
          <div>
            <label className="block mb-1 font-medium dark:text-white">Aadhaar Card Front Photo</label>
            <div className="relative">
              <input
                type="file"
                ref={aadhaarFrontRef}
                accept="image/*"
                className="hidden"
                id="aadhaar-front-upload"
              />
              <label
                htmlFor="aadhaar-front-upload"
                className={`${inputBase} ${inputBorder} cursor-pointer flex items-center justify-center bg-[var(--bg-white)] dark:bg-[#232d1b] hover:bg-gray-50 dark:hover:bg-[#2a3520]`}
              >
                {aadhaarFrontRef.current?.files?.[0]?.name || 'Choose Front Photo'}
              </label>
            </div>
          </div>
          <div>
            <label className="block mb-1 font-medium dark:text-white">Aadhaar Card Back Photo</label>
            <div className="relative">
              <input
                type="file"
                ref={aadhaarBackRef}
                accept="image/*"
                className="hidden"
                id="aadhaar-back-upload"
              />
              <label
                htmlFor="aadhaar-back-upload"
                className={`${inputBase} ${inputBorder} cursor-pointer flex items-center justify-center bg-[var(--bg-white)] dark:bg-[#232d1b] hover:bg-gray-50 dark:hover:bg-[#2a3520]`}
              >
                {aadhaarBackRef.current?.files?.[0]?.name || 'Choose Back Photo'}
              </label>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-1 font-medium dark:text-white">Land Document (Jamabandi/Receipt)</label>
            <div className="relative">
              <input
                type="file"
                ref={landDocsRef}
                accept="image/*,.pdf"
                className="hidden"
                id="land-docs-upload"
              />
              <label
                htmlFor="land-docs-upload"
                className={`${inputBase} ${inputBorder} cursor-pointer flex items-center justify-center bg-[var(--bg-white)] dark:bg-[#232d1b] hover:bg-gray-50 dark:hover:bg-[#2a3520]`}
              >
                {landDocsRef.current?.files?.[0]?.name || 'Choose Document'}
              </label>
            </div>
          </div>
          <div>
            <label className="block mb-1 font-medium dark:text-white">Choose Yojna</label>
            <select
              name="yojna"
              value={formData.yojna}
              onChange={handleInputChange}
              className={`${inputBase} ${inputBorder} h-[44px]`}
            >
              <option value="">Select</option>
              <option value="Gaushala Dhan Yojna">Gaushala Dhan Yojna</option>
              <option value="Bakri Palan Yojna">Bakri Palan Yojna</option>
              <option value="Murgi Palan Yojna">Murgi Palan Yojna</option>
              <option value="Matsya Palan Yojna">Matsya Palan Yojna</option>

            </select>
            {errors.fullName && <span className="text-red-500 text-sm mt-1">{errors.yojna}</span>}

          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-[var(--pasuseva-green)] hover:bg-green-700 text-white font-semibold px-12 py-3 rounded-lg shadow transition-colors"
          >
            Submit Application
          </button>
        </div>
      </form>
      <ConfirmationPopup
        isOpen={isOpen}
        message="Do you want to navigate to list"
        onCancel={() => setIsOpen(false)}
        onConfirm={() => navigate("/customer/list")}
        title="Created Successfully"
      />
    </div>
  );
};

export default AddCustomer;
