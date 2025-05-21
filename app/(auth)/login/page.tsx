"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import CommonLayout from "@/layouts/commonLayout";
import Cookies from "js-cookie";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    // API call for login
    try {
      const response = await fetch("api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          identifier: formData.email,
          password: formData.password,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }

      const data = await response.json();
      const { jwt, user } = data;

      // store the jwt in cookie & user in local storage
      Cookies.set("token", jwt, { expires: 1 });
      localStorage.setItem("user", JSON.stringify(user));

      router.push("/");
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Login failed. Please try again.",
      );
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <CommonLayout>
      <div className="min-h-screen flex items-center justify-center bg-background-lightMuted py-12">
        <div className="w-4/5 max-w-md space-y-8">
          <div>
            <h2 className="text-center text-3xl font-semibold text-primary">
              Sign in to your account
            </h2>
            <p className="mt-2 text-center text-gray-600">
              Or{" "}
              <Link
                href="/register"
                className="font-semibold text-sky-400 hover:text-sky-500 transition-colors duration-300"
              >
                create a new account
              </Link>
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div
                className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg"
                role="alert"
              >
                <span className="block sm:inline">{error}</span>
              </div>
            )}
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-gray-600 mb-1"
                >
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none relative block w-full px-4 py-2 border border-gray-200 rounded-lg placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition-all duration-300"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-semibold text-gray-600 mb-1"
                >
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none relative block w-full px-4 py-2 border border-gray-200 rounded-lg placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition-all duration-300"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="flex gap-2">
              <button
                type="submit"
                className="flex-1 bg-sky-400 py-2 px-4 rounded-lg font-semibold text-white hover:bg-sky-500 transition-all duration-300"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </CommonLayout>
  );
}
