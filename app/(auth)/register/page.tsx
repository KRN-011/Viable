"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import CommonLayout from "@/layouts/commonLayout";
import Cookies from "js-cookie";
import CustomButton from "@/components/ui/CustomButton";
import { z } from "zod";
import { toast } from "react-toastify";

const registerSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username cannot exceed 20 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<RegisterFormData>({
    username: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof RegisterFormData, string>>
  >({});
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const validateField = (name: keyof RegisterFormData, value: string) => {
    try {
      registerSchema.shape[name].parse(value);
      setErrors((prev) => ({ ...prev, [name]: undefined }));
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors((prev) => ({ ...prev, [name]: error.errors[0].message }));
      }
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitError("");
    setIsLoading(true);

    // Validate all fields
    const isValid = Object.entries(formData).every(([key, value]) =>
      validateField(key as keyof RegisterFormData, value),
    );

    if (!isValid) return;

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }

      const data = await response.json();
      const { jwt, user } = data;

      if (jwt && user) {
        Cookies.set("token", jwt, { expires: 1 });
        router.push("/login");
      }

      toast.success("Registration successful");
    } catch (error) {
      toast.error("Registration failed. Please try again.");
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Registration failed. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    validateField(name as keyof RegisterFormData, value);
  };

  return (
    <CommonLayout>
      <div className="flex items-center justify-center bg-background-lightMuted mt-40 mb-40">
        <div className="w-4/5 max-w-md space-y-8">
          <div>
            <h2 className="text-center text-3xl font-semibold text-primary">
              Create your account
            </h2>
            <p className="mt-2 text-center text-gray-600">
              Or{" "}
              <Link
                href="/login"
                className="font-semibold text-sky-400 hover:text-sky-500 transition-colors duration-300"
              >
                sign in to your account
              </Link>
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            {submitError && (
              <div
                className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg"
                role="alert"
              >
                <span className="block sm:inline">{submitError}</span>
              </div>
            )}
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-semibold text-gray-600 mb-1"
                >
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  className={`appearance-none relative block w-full px-4 py-2 border ${
                    errors.username ? "border-red-300" : "border-gray-200"
                  } rounded-lg placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition-all duration-300`}
                  placeholder="Enter your username"
                  value={formData.username}
                  onChange={handleChange}
                />
                {errors.username && (
                  <p className="mt-1 text-sm text-red-500">{errors.username}</p>
                )}
              </div>
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
                  className={`appearance-none relative block w-full px-4 py-2 border ${
                    errors.email ? "border-red-300" : "border-gray-200"
                  } rounded-lg placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition-all duration-300`}
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                )}
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
                  autoComplete="new-password"
                  required
                  className={`appearance-none relative block w-full px-4 py-2 border ${
                    errors.password ? "border-red-300" : "border-gray-200"
                  } rounded-lg placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition-all duration-300`}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-red-500">{errors.password}</p>
                )}
              </div>
            </div>

            <div className="flex gap-2">
              <CustomButton
                type="submit"
                disabled={isLoading}
                className={`${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                {isLoading ? "Registering..." : "Register"}
              </CustomButton>
            </div>
          </form>
        </div>
      </div>
    </CommonLayout>
  );
}
