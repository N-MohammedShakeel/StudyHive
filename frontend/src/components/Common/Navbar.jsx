import React, { useState } from "react";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="absolute top-0 left-0 right-0 z-10">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        {/* Logo */}
        <div className="flex items-center">
          <a href="/" className="p-1.5">
            <h2 className="text-2xl font-extrabold text-[var(--text)]">
              Study<span className="text-[var(--primary)]">Hive</span>
            </h2>
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex lg:hidden">
          <button
            type="button"
            className="p-2.5 text-[var(--text60)] hover:text-[var(--text)]"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              )}
            </svg>
          </button>
        </div>

        {/* CTA Buttons (Desktop) */}
        <div className="hidden lg:flex lg:items-center lg:gap-x-4">
          <a
            href="/login"
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium border-2 border-[var(--primary)] bg-[var(--accentcontrast)] rounded-md hover:bg-[var(--primary)] hover:text-[var(--primarycontrast)] transition-colors"
          >
            Login
          </a>
          <a
            href="/signup"
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-[var(--primarycontrast)] bg-[var(--primary)] rounded-md hover:bg-[var(--accentcontrast)] hover:text-[var(--text)] hover:border-2 hover:border-[var(--primary)] transition-colors"
          >
            Sign Up
          </a>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden" role="dialog" aria-modal="true">
          <div className="fixed inset-0 z-50 bg-[var(--text)]/50 backdrop-blur-sm" />
          <div className="fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-[var(--bg)] px-6 py-6 border-l border-[var(--text10)]">
            <div className="flex items-center justify-between">
              <a href="/" className="p-1.5">
                <h2 className="text-2xl font-bold text-[var(--text)]">
                  Study<span className="text-[var(--primary)]">Hive</span>
                </h2>
              </a>
              <button
                type="button"
                className="p-2.5 text-[var(--text60)] hover:text-[var(--text)]"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="mt-6 flex flex-col gap-4">
              <a
                href="/login"
                className="block px-3 py-2 text-base font-medium border-2 border-[var(--primary)] bg-[var(--accentcontrast)] rounded-lg hover:bg-[var(--primary)] hover:text-[var(--primarycontrast)] transition-colors"
              >
                Login
              </a>
              <a
                href="/signup"
                className="block px-3 py-2 text-base font-medium text-[var(--primarycontrast)] bg-[var(--primary)] rounded-lg hover:bg-[var(--accentcontrast)] hover:text-[var(--text)] hover:border-2 hover:border-[var(--primary)] transition-colors"
              >
                Sign Up
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
