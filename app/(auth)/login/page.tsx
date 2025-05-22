"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import CommonLayout from "@/layouts/commonLayout";
import Cookies from "js-cookie";
import FadeIn from "@/components/ui/FadeIn";
import { toast } from "react-toastify";
import SharpEdgeButton from "@/components/ui/SharpEdgeButton";
import SharpEdgeInput from "@/components/ui/SharpEdgeInput";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isCreateAccountClicked, setIsCreateAccountClicked] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

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

      // store the jwt and user in cookies
      Cookies.set("token", jwt, { expires: 1 });
      Cookies.set("user", JSON.stringify(user), { expires: 1 });

      toast.success("Login successful");
      router.push("/");
    } catch (error) {
      console.log(error);
      toast.error("Login failed. Please try again.");
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
  };

  const handleCreateAccountRedirect = () => {
    setIsCreateAccountClicked(true);
  };

  return (
    <CommonLayout>
      <FadeIn>
        <div className="flex items-center justify-center pt-20 bg-background-lightMuted rounded-3xl max-w-2xl mx-auto">
          <div className="w-4/5 max-w-md space-y-8">
            <div className="mb-14">
              <h2 className="text-center text-3xl font-semibold text-primary">
                Sign in to your account
              </h2>
              <p className="mt-2 text-center text-gray-600 flex items-center justify-center gap-2">
                Or{" "}
                <Link
                  href="/register"
                  onClick={handleCreateAccountRedirect}
                  className="font-semibold underline underline-offset-4 hover:underline-offset-2 transition-all duration-100 ease-out "
                >
                  create a new account
                </Link>
                {isCreateAccountClicked && (
                  <LoadingSpinner size={4} absolute={false} className="ml-2" />
                )}
              </p>
            </div>
            <form className="mt-8 space-y-10" onSubmit={handleSubmit}>
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
                  <SharpEdgeInput
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
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
                  <SharpEdgeInput
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <SharpEdgeButton
                  type="submit"
                  disabled={isLoading}
                  className={`${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  {isLoading ? "Logging in..." : "Login"}
                </SharpEdgeButton>
              </div>
            </form>
          </div>
        </div>
      </FadeIn>
    </CommonLayout>
  );
}
