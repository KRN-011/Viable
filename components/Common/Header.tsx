"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import Cookies from "js-cookie";
import { usePathname } from "next/navigation";
import updateUserCookie from "@/lib/updateUserCookie";
import { User } from "@/types/userTypes";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import TextUnderline from "../ui/TextUnderline";

const MobileLink = ({
  href,
  onClick,
  children,
}: {
  href: string;
  onClick?: () => void;
  children: React.ReactNode;
}) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 1.1 }}
    transition={{ type: "spring", stiffness: 400, damping: 17 }}
    className="w-full text-center"
  >
    <Link
      href={href}
      onClick={onClick}
      className="text-text-dark font-medium text-lg hover:text-primary transition-colors duration-200"
    >
      {children}
    </Link>
  </motion.div>
);

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isAuthRoute, setIsAuthRoute] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userData, setUserData] = useState<User | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        buttonRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

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

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      setIsLoggedIn(true);
    }
    setIsLoading(false);
  }, []);

  // handle logout
  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("user");
    setIsLoggedIn(false);
    setUserData(null);
    toast.success("Logout successful");
    window.location.href = "/login";
  };

  if (isLoading) {
    return (
      <header className="w-full px-4 lg:px-0 lg:w-4/5 mx-auto py-5 sticky top-0 z-50">
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
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-background-light/80 backdrop-blur-sm py-5 sticky top-0 z-50"
    >
      <header className="w-full px-4 lg:px-0 lg:w-4/5 mx-auto">
        <nav className="flex justify-between items-center w-full mx-auto relative">
          <div>
            <Image
              src="/viable-logo.png"
              alt="logo"
              width={120}
              height={120}
              className=""
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex justify-center items-center gap-8">
            <TextUnderline>
              <Link href="/">Home</Link>
            </TextUnderline>
            <TextUnderline>
              <Link href="/posts">Posts</Link>
            </TextUnderline>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden lg:block">
            {isLoggedIn ? (
              <div className="flex items-center gap-8">
                {userData && !userData.WriterConfirmed && (
                  <TextUnderline>
                    <Link href="/writer/request">Become a Writer</Link>
                  </TextUnderline>
                )}
                <button
                  onClick={handleLogout}
                  className="bg-background-dark py-2 px-4 font-semibold text-white hover:bg-primary hover:text-text-dark transition-all duration-300 hover:border-text-dark hover:rounded-3xl border border-transparent hover:bg-transparent"
                >
                  Logout
                </button>
              </div>
            ) : (
              !isAuthRoute && (
                <div className="flex justify-center items-center gap-2">
                  <Link
                    href="/login"
                    className="bg-background-dark py-2 px-4 rounded-3xl font-semibold text-white hover:text-text-dark transition-all duration-300 hover:border-text-dark border border-transparent hover:bg-transparent"
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="bg-background-dark py-2 px-4 rounded-3xl font-semibold text-white hover:text-text-dark transition-all duration-300 hover:border-text-dark border border-transparent hover:bg-transparent"
                  >
                    Register
                  </Link>
                </div>
              )
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            ref={buttonRef}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2"
            aria-label="Toggle menu"
          >
            <div className="w-6 h-5 relative flex flex-col justify-between">
              <span
                className={`w-full h-0.5 bg-text-dark transition-all duration-300 origin-center transform ${isMobileMenuOpen ? "rotate-45 translate-y-2" : ""}`}
              />
              <span
                className={`w-full h-0.5 bg-text-dark transition-all duration-300 ${isMobileMenuOpen ? "opacity-0" : ""}`}
              />
              <span
                className={`w-full h-0.5 bg-text-dark transition-all duration-300 origin-center transform ${isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""}`}
              />
            </div>
          </button>

          {/* Mobile Menu Overlay */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <>
                {/* Backdrop */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="fixed inset-0 z-40 lg:hidden"
                  onClick={() => setIsMobileMenuOpen(false)}
                />

                {/* Menu */}
                <motion.div
                  ref={menuRef}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="absolute top-full right-0 mt-2 mx-4 p-4 bg-background-light rounded-xl border border-text-dark z-50 lg:hidden w-2/5"
                >
                  <div className="flex flex-col items-center gap-6">
                    <div className="flex w-full flex-col items-center gap-4">
                      <MobileLink
                        href="/"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Home
                      </MobileLink>
                      <div className="w-1/5 mx-auto h-[1px] bg-text-dark" />
                      <MobileLink
                        href="/posts"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Posts
                      </MobileLink>
                      <div className="w-1/5 mx-auto h-[1px] bg-text-dark" />
                    </div>

                    {isLoggedIn ? (
                      <div className="flex flex-col items-center gap-4 w-full">
                        {userData && !userData.WriterConfirmed && (
                          <>
                            <MobileLink
                              href="/writer/request"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              Become a Writer
                            </MobileLink>
                            <div className="w-1/5 mx-auto h-[1px] bg-text-dark" />
                          </>
                        )}
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 1.05 }}
                          transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 17,
                          }}
                          onClick={() => {
                            setIsMobileMenuOpen(false);
                            handleLogout();
                          }}
                          className="bg-background-dark py-2 px-5 rounded-3xl font-semibold text-white hover:text-text-dark transition-all duration-300 hover:border-text-dark border border-transparent hover:bg-transparent"
                        >
                          Logout
                        </motion.button>
                      </div>
                    ) : (
                      !isAuthRoute && (
                        <div className="flex flex-col w-full gap-3">
                          <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 1.05 }}
                            transition={{
                              type: "spring",
                              stiffness: 400,
                              damping: 17,
                            }}
                          >
                            <Link
                              href="/login"
                              onClick={() => setIsMobileMenuOpen(false)}
                              className="block text-center bg-background-dark py-2 px-5 rounded-3xl font-semibold text-white hover:text-text-dark transition-all duration-300 hover:border-text-dark border border-transparent hover:bg-transparent"
                            >
                              Login
                            </Link>
                          </motion.div>
                          <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 1.05 }}
                            transition={{
                              type: "spring",
                              stiffness: 400,
                              damping: 17,
                            }}
                          >
                            <Link
                              href="/register"
                              onClick={() => setIsMobileMenuOpen(false)}
                              className="block text-center bg-background-dark py-2 px-5 rounded-3xl font-semibold text-white hover:text-text-dark transition-all duration-300 hover:border-text-dark border border-transparent hover:bg-transparent"
                            >
                              Register
                            </Link>
                          </motion.div>
                        </div>
                      )
                    )}
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </nav>
      </header>
    </motion.div>
  );
}
