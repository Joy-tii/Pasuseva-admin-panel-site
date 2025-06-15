import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { EyeCloseIcon, EyeIcon } from '../../icons';
import { AppDispatch, RootState } from '../../features/store';
import { loginUser } from '../../features/auth/authApi';
import { Link } from "react-router-dom";

const validationSchema = Yup.object().shape({
  email: Yup.string().required('Username is required'),
  password: Yup.string().required('Password is required'),
});

const SignInForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const handleSubmit = (values: { email: string; password: string }) => {
    dispatch(loginUser(values));
  };

  return (
    <div className="flex flex-col flex-1 text-[var(--text-primary)]">
      <div className="w-full max-w-md pt-10 mx-auto">
        <Link
          to="/"
          className="inline-flex items-center text-sm text-[var(--pasuseva-green)] transition-colors hover:text-[var(--pasuseva-orange)]"
        >
          ← Back to Dashboard
        </Link>
      </div>

      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <h1 className="mb-2 text-2xl font-bold text-[var(--pasuseva-green)]">Sign In</h1>
          <p className="text-sm text-gray-500">
            Enter your username and password to sign in!
          </p>
          {error && <div className="mt-2 text-sm text-red-600">{error}</div>}
        </div>

        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form className="mt-6 space-y-5">
              {/* Username Field */}
              <div>
                <label className="block mb-2 font-medium">Username</label>
                <Field
                  name="email"
                  className="w-full p-2 border border-[var(--pasuseva-green)] rounded focus:outline-none focus:ring-2 focus:ring-[var(--pasuseva-yellow1)]"
                  placeholder="Enter your username"
                />
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              {/* Password Field */}
              <div>
                <label className="block mb-2 font-medium">Password</label>
                <div className="relative">
                  <Field
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    className="w-full p-2 border border-[var(--pasuseva-green)] rounded focus:outline-none focus:ring-2 focus:ring-[var(--pasuseva-yellow1)]"
                    placeholder="Enter your password"
                  />
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-2.5 cursor-pointer text-[var(--pasuseva-orange)]"
                  >
                    {showPassword ? <EyeIcon /> : <EyeCloseIcon />}
                  </span>
                </div>
                <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-2 font-semibold text-white rounded bg-[var(--pasuseva-green)] hover:bg-[var(--pasuseva-orange)] transition"
                disabled={loading}
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </Form>
          )}
        </Formik>

        <div className="mt-6 text-center">
          <p className="text-sm">
            Don't have an account?{' '}
            <Link to="/signup" className="text-[var(--pasuseva-orange)] hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignInForm;
