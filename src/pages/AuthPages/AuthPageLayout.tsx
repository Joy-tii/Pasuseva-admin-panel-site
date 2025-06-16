import React from "react";
import GridShape from "../../components/common/GridShape";
import { Link } from "react-router"; // Consider replacing with react-router-dom if needed
import ThemeTogglerTwo from "../../components/common/ThemeTogglerTwo";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative p-6 bg-[var(--bg-white)] z-1 dark:bg-[var(--bg-dark)] sm:p-0">
      <div className="relative flex flex-col justify-center w-full h-screen lg:flex-row dark:bg-[var(--bg-dark)] sm:p-0">
        {children}

        <div className="items-center hidden w-full h-full lg:w-1/2 bg-[var(--pasuseva-green)] dark:bg-white/5 lg:grid">
          <div className="relative flex items-center justify-center z-1">
            <GridShape />
            <div className="flex flex-col items-center max-w-xs text-center">
              {/* Optional Logo */}
              {/* <Link to="/" className="block mb-4">
                <img
                  width={231}
                  height={48}
                  src="/images/logo/auth-logo.svg"
                  alt="Logo"
                />
              </Link> */}
              <div className="text-4xl font-bold text-white">Pasu Seva</div>
              <p className="mt-2 text-white/80 dark:text-white/60 text-sm">
                Empowering Livestock and Veterinary Services with Technology
              </p>
            </div>
          </div>
        </div>

        <div className="fixed z-50 hidden bottom-6 right-6 sm:block">
          <ThemeTogglerTwo />
        </div>
      </div>
    </div>
  );
}
