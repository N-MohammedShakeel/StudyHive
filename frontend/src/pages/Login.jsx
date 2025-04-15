import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, LogIn } from "lucide-react";
import { login } from "../api/authApi";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) navigate("/dashboard");
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(formData);
      localStorage.setItem("token", response.token);
      localStorage.setItem("user", JSON.stringify(response.user));
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Login failed");
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:5000/api/auth/google";
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md bg-[var(--bg)] rounded-xl shadow-lg p-8 space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-[var(--text)]">
            Welcome Back to{" "}
            <span className="text-[var(--primary)]">StudyHive</span>
          </h2>
          <p className="mt-2 text-sm text-[var(--text60)]">
            Sign in to continue your learning journey
          </p>
        </div>

        {error && (
          <div className="p-3 bg-[var(--accent30)] text-[var(--text70)] rounded-md text-sm">
            {error}
          </div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-[var(--text70)]"
            >
              Email address
            </label>
            <div className="mt-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-[var(--accent)]" />
              </div>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="m-2 p-2 pl-10 block w-full rounded-md border-[var(--primary5)] bg-[var(--text5)] text-[var(--text)] shadow-sm focus:ring-[var(--accent)] focus:border-[var(--accent)] transition-colors"
                required
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-[var(--text70)]"
            >
              Password
            </label>
            <div className="mt-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-[var(--accent)]" />
              </div>
              <input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="m-2 p-2 pl-10 block w-full rounded-md border-[var(--primary5)] bg-[var(--text5)] text-[var(--text)] shadow-sm focus:ring-[var(--accent)] focus:border-[var(--accent)] transition-colors"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex justify-center items-center gap-2 py-2 px-4 border-2 border-transparent rounded-md shadow-sm text-sm font-medium text-[var(--primarycontrast)] bg-[var(--primary)] hover:bg-[var(--accentcontrast)] hover:text-[var(--text)] hover:border-[var(--primary)] transition-colors"
          >
            <LogIn className="h-5 w-5" />
            Sign In
          </button>
        </form>

        <div className="flex items-center justify-center">
          <button
            onClick={handleGoogleLogin}
            className="w-full flex justify-center items-center gap-2 py-2 px-4 border-2 border-[var(--primary5)] rounded-md shadow-sm text-sm font-medium text-[var(--text70)] bg-[var(--text5)] hover:bg-[var(--accent20)] hover:border-[var(--accent)] transition-colors"
          >
            <img
              src="https://www.google.com/favicon.ico"
              alt="Google"
              className="h-5 w-5"
            />
            Sign in with Google
          </button>
        </div>

        <p className="text-center text-sm text-[var(--text60)]">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="font-medium text-[var(--accent)] hover:text-[var(--accent85)] transition-colors"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
