"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { usePathname } from "next/navigation";

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAuthRoute, setIsAuthRoute] = useState(false);

  // check if the user is on authentication routes, if true -> Hide login and register buttons
  const isAuthRoutes = ["/login", "/register"];
  const pathname = usePathname();
  useEffect(() => {
    setIsAuthRoute(isAuthRoutes.includes(pathname));
  }, [pathname]);

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  // handle logout
  const handleLogout = () => {
    Cookies.remove("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    window.location.href = "/login";
  };

  return (
    <header className="w-4/5 mx-auto py-5 sticky top-0 z-50">
      <div className="flex justify-between items-center w-full mx-auto">
        <div>
          <Image
            src="/viable-logo.png"
            alt="logo"
            width={120}
            height={120}
            className=""
          />
        </div>
        <div className="flex justify-center items-center gap-8">
          <Link
            href="/"
            className="font-semibold text-primary relative before:content-[''] before:h-[2px] before:bg-text-primary before:absolute before:-bottom-1 before:left-0 before:transition-all before:duration-300 before:ease-in-out before:w-0 hover:before:w-full"
          >
            Home
          </Link>
          <Link
            href="/posts"
            className="font-semibold text-primary relative before:content-[''] before:h-[2px] before:bg-text-primary before:absolute before:-bottom-1 before:left-0 before:transition-all before:duration-300 before:ease-in-out before:w-0 hover:before:w-full"
          >
            Posts
          </Link>
        </div>
        {isLoggedIn ? (
          <div className="flex justify-center items-center gap-2">
            <button
              onClick={handleLogout}
              className="bg-background-primary py-2 px-4 rounded-3xl font-semibold text-white hover:bg-primary hover:text-text-primary transition-all duration-300 hover:border-text-primary border border-transparent hover:bg-transparent"
            >
              Logout
            </button>
          </div>
        ) : (
          !isAuthRoute && (
            <div className="flex justify-center items-center gap-2">
              <Link
                href="/login"
                className="bg-background-primary py-2 px-4 rounded-3xl font-semibold text-white hover:bg-primary hover:text-text-primary transition-all duration-300 hover:border-text-primary border border-transparent hover:bg-transparent"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="py-2 px-4 rounded-3xl font-semibold text-text-primary border border-text-primary hover:bg-background-primary hover:text-white transition-all duration-300"
              >
                Register
              </Link>
            </div>
          )
        )}
      </div>
    </header>
  );
}
