import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="w-4/5 mx-auto py-5">
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
            className="font-semibold text-sky-700 relative before:content-[''] before:h-[2px] before:bg-sky-700 before:absolute before:-bottom-1 before:left-0 before:transition-all before:duration-300 before:ease-in-out before:w-0 hover:before:w-full"
          >
            Home
          </Link>
          <Link
            href="/posts"
            className="font-semibold text-sky-700 relative before:content-[''] before:h-[2px] before:bg-sky-700 before:absolute before:-bottom-1 before:left-0 before:transition-all before:duration-300 before:ease-in-out before:w-0 hover:before:w-full"
          >
            Posts
          </Link>
        </div>
        <div className="flex justify-center items-center gap-2">
          <Link
            href="/login"
            className="bg-sky-400 py-2 px-4 rounded-3xl font-semibold text-white hover:bg-sky-500 transition-all duration-300"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="py-2 px-4 rounded-3xl font-semibold text-sky-400 border border-sky-400 hover:bg-sky-400 hover:text-white transition-all duration-300"
          >
            Register
          </Link>
        </div>
      </div>
    </header>
  );
}
