import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useAuth } from "../hook/useAuth";
import AuthLayout from "../components/AuthLayout";
import ContinueWithGoogle from "../components/ContinueWithGoogle";

const Login = () => {
  const { handleLogin } = useAuth();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const user = await handleLogin({
        email: formData.email,
        password: formData.password,
      });

      if (user.role === "buyer") {
        navigate("/");
      } else if (user.role === "seller") {
        navigate("/seller/dashboard");
      }
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Sign in to continue your collection."
    >
      <form onSubmit={handleSubmit} className="w-full space-y-7">

        {/* Email */}
        <div>
          <label
            className="block text-[10px] uppercase tracking-[0.2em] mb-3"
            style={{ color: "#7A6E63" }}
          >
            Email Address
          </label>

          <div className="relative">

            <Mail
              size={17}
              strokeWidth={1.5}
              className="absolute left-4 top-1/2 -translate-y-1/2"
              style={{ color: "#7A6E63" }}
            />

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
              className="w-full h-12 pl-11 pr-4 text-sm outline-none transition-all"
              style={{
                backgroundColor: "#fbf9f6",
                border: "1px solid #d0c5b5",
                color: "#1b1c1a",
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "#C9A96E";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "#d0c5b5";
              }}
            />

          </div>
        </div>


        {/* Password */}
        <div>
          <label
            className="block text-[10px] uppercase tracking-[0.2em] mb-3"
            style={{ color: "#7A6E63" }}
          >
            Password
          </label>

          <div className="relative">

            <Lock
              size={17}
              strokeWidth={1.5}
              className="absolute left-4 top-1/2 -translate-y-1/2"
              style={{ color: "#7A6E63" }}
            />

            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
              className="w-full h-12 pl-11 pr-12 text-sm outline-none transition-all"
              style={{
                backgroundColor: "#fbf9f6",
                border: "1px solid #d0c5b5",
                color: "#1b1c1a",
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "#C9A96E";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "#d0c5b5";
              }}
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2"
              style={{ color: "#7A6E63" }}
            >
              {showPassword ? (
                <EyeOff size={17} strokeWidth={1.5} />
              ) : (
                <Eye size={17} strokeWidth={1.5} />
              )}
            </button>

          </div>
        </div>


        {/* Sign In */}
        <button
          type="submit"
          className="w-full h-12 text-[10px] uppercase tracking-[0.25em] transition-all duration-300"
          style={{
            backgroundColor: "#745a27",
            color: "#ffffff",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#5f481f";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "#745a27";
          }}
        >
          Sign In
        </button>


        {/* Divider */}
        <div className="flex items-center gap-4">

          <div
            className="h-px flex-1"
            style={{ backgroundColor: "#d0c5b5" }}
          />

          <span
            className="text-[9px] uppercase tracking-[0.2em]"
            style={{ color: "#7A6E63" }}
          >
            Or
          </span>

          <div
            className="h-px flex-1"
            style={{ backgroundColor: "#d0c5b5" }}
          />

        </div>


        {/* Google Login */}
        <ContinueWithGoogle />


        {/* Register Link */}
        <div
          className="text-center pt-2 text-sm"
          style={{ color: "#7A6E63" }}
        >
          Don't have an account?{" "}

          <NavLink
            to="/register"
            className="transition-colors duration-300"
            style={{ color: "#745a27" }}
          >
            <span className="font-medium">
              Create one
            </span>
          </NavLink>
        </div>

      </form>
    </AuthLayout>
  );
};

export default Login;
