"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (!form.name || !form.email || !form.phone || !form.password) {
      toast.error("All fields are required");
      return false;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      toast.error("Invalid email format");
      return false;
    }

    // Phone validation (10-15 digits)
    const phoneRegex = /^\+?[0-9]{10,15}$/;
    if (!phoneRegex.test(form.phone)) {
      toast.error("Invalid phone number");
      return false;
    }

    // Password validation (min 6 characters)
    if (form.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.error) return toast.error(data.error);

      toast.success("Registered successfully!");
      router.push("/"); // redirect to login
    } catch (err) {
      console.error(err);
      toast.error("Server error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-gray-900 text-center">
          Register
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            name="phone"
            placeholder="Phone"
            value={form.phone}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="relative">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span
              className="absolute right-3 top-3 cursor-pointer text-gray-600"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </span>
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white p-3 rounded hover:bg-green-700 transition"
          >
            Register
          </button>
        </form>

        <p className="mt-4 text-center text-gray-900">
          {"Already have an account? "}
          <Link href="/" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
