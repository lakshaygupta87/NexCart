import React, { useState } from "react";
import { useAuth } from "../hook/useAuth";
import { useNavigate, NavLink } from "react-router-dom";
import {
  User,
  Phone,
  Mail,
  Lock,
  Eye,
  EyeOff,
} from "lucide-react";
import ContinueWithGoogle from "../components/ContinueWithGoogle";
import AuthLayout from "../components/AuthLayout";

const Register = () => {
  const { handleRegister } = useAuth();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    contactNumber: "",
    email: "",
    password: "",
    isSeller: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await handleRegister({
        email: formData.email,
        contact: formData.contactNumber,
        password: formData.password,
        isSeller: formData.isSeller,
        fullname: formData.fullName,
      });

      navigate("/");
    } catch (error) {
      console.error("Registration failed", error);
    }
  };

  return (
    <AuthLayout
      title="Create Account"
      subtitle="Join NexCart and start shopping today."
    >
      <form
        onSubmit={handleSubmit}
        className="w-full space-y-5"
      >

        {/* Full Name */}
        <div>
          <label
            className="block mb-2 text-[10px] uppercase tracking-[0.2em]"
            style={{ color: "#7A6E63" }}
          >
            Full Name
          </label>

          <div className="relative">
            <User
              size={17}
              strokeWidth={1.5}
              className="absolute left-4 top-1/2 -translate-y-1/2"
              style={{ color: "#7A6E63" }}
            />

            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              placeholder="John Doe"
              className="w-full h-12 pl-11 pr-4 text-sm outline-none transition-all"
              style={{
                backgroundColor: "#fbf9f6",
                border: "1px solid #d0c5b5",
                color: "#1b1c1a",
              }}
            />
          </div>
        </div>


        {/* Phone */}
        <div>
          <label
            className="block mb-2 text-[10px] uppercase tracking-[0.2em]"
            style={{ color: "#7A6E63" }}
          >
            Phone Number
          </label>

          <div className="relative">
            <Phone
              size={17}
              strokeWidth={1.5}
              className="absolute left-4 top-1/2 -translate-y-1/2"
              style={{ color: "#7A6E63" }}
            />

            <input
              type="tel"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              required
              placeholder="9876543210"
              className="w-full h-12 pl-11 pr-4 text-sm outline-none transition-all"
              style={{
                backgroundColor: "#fbf9f6",
                border: "1px solid #d0c5b5",
                color: "#1b1c1a",
              }}
            />
          </div>
        </div>


        {/* Email */}
        <div>
          <label
            className="block mb-2 text-[10px] uppercase tracking-[0.2em]"
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
              required
              placeholder="hello@example.com"
              className="w-full h-12 pl-11 pr-4 text-sm outline-none transition-all"
              style={{
                backgroundColor: "#fbf9f6",
                border: "1px solid #d0c5b5",
                color: "#1b1c1a",
              }}
            />
          </div>
        </div>


        {/* Password */}
        <div>
          <label
            className="block mb-2 text-[10px] uppercase tracking-[0.2em]"
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
              required
              placeholder="••••••••"
              autoComplete="new-password"
              className="w-full h-12 pl-11 pr-12 text-sm outline-none transition-all
                         [&::-ms-reveal]:hidden
                         [&::-ms-clear]:hidden"
              style={{
                backgroundColor: "#fbf9f6",
                border: "1px solid #d0c5b5",
                color: "#1b1c1a",
              }}
            />

            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
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


        {/* Seller Checkbox */}
        <label className="flex items-center gap-3 cursor-pointer pt-1">
          <input
            type="checkbox"
            name="isSeller"
            checked={formData.isSeller}
            onChange={handleChange}
            className="h-4 w-4 accent-[#745a27]"
          />

          <span
            className="text-sm"
            style={{ color: "#7A6E63" }}
          >
            Register as Seller
          </span>
        </label>


        {/* Sign Up */}
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
          Create Account
        </button>


        {/* Divider */}
        <div className="flex items-center gap-4 pt-1">
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


        {/* Google */}
        <ContinueWithGoogle />


        {/* Login Link */}
        <p
          className="text-center text-sm pt-1"
          style={{ color: "#7A6E63" }}
        >
          Already have an account?{" "}

          <NavLink
            to="/login"
            className="font-medium transition-colors duration-300"
            style={{ color: "#745a27" }}
          >
            Sign In
          </NavLink>
        </p>

      </form>
    </AuthLayout>
  );
};

export default Register;

