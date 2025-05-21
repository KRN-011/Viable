"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { usePathname } from "next/navigation";
import updateUserCookie from "@/lib/updateUserCookie";
import { User } from "@/types/userTypes";

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isAuthRoute, setIsAuthRoute] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userData, setUserData] = useState<User | null>(null);
  const pathname = usePathname();

  // Initialize user data and auth state
  useEffect(() => {
    const initializeUser = async () => {
      try {
        setIsLoading(true);
        const token = Cookies.get("token");
        if (token) {
          await updateUserCookie();
          const user = Cookies.get("user");
          if (user) {
            setUserData(JSON.parse(user));
            setIsLoggedIn(true);
          }
        }
      } catch (error) {
        console.error("Error initializing user:", error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeUser();
  }, []);

  // check if the user is on authentication routes
  useEffect(() => {
    const isAuthRoutes = ["/login", "/register"];
    setIsAuthRoute(isAuthRoutes.includes(pathname));
  }, [pathname]);

  // handle logout
  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("user");
    setIsLoggedIn(false);
    setUserData(null);
    window.location.href = "/login";
  };

  if (isLoading) {
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
        </div>
      </header>
    );
  }

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
          <div className="flex items-center gap-8">
            {userData && (
              <>
                {!userData.WriterConfirmed && (
                  <Link
                    href="/writer/request"
                    className="font-semibold text-primary relative before:content-[''] before:h-[2px] before:bg-text-primary before:absolute before:-bottom-1 before:left-0 before:transition-all before:duration-300 before:ease-in-out before:w-0 hover:before:w-full"
                  >
                    Become a Writer
                  </Link>
                )}
                {/* {userData.WriterConfirmed && (
                  <Link
                    href="/posts/create"
                    className="font-semibold text-primary relative before:content-[''] before:h-[2px] before:bg-text-primary before:absolute before:-bottom-1 before:left-0 before:transition-all before:duration-300 before:ease-in-out before:w-0 hover:before:w-full"
                  >
                    Create Post
                  </Link>
                )} */}
              </>
            )}
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
