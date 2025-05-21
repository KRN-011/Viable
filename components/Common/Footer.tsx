import Link from "next/link";
import { FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-50 ">
      <div className="w-4/5 mx-auto py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* About Section */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg text-primary">About Us</h3>
            <p className="text-muted">
              Share your thoughts and ideas with <br />
              the world through our blogging platform.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg text-primary">Quick Links</h3>
            <div className="flex flex-col space-y-2">
              <Link
                href="/"
                className="text-muted hover:text-primary transition-colors"
              >
                Home
              </Link>
              <Link
                href="/posts"
                className="text-muted hover:text-primary transition-colors"
              >
                Posts
              </Link>
              <Link
                href="/about"
                className="text-muted hover:text-primary transition-colors"
              >
                About
              </Link>
              <Link
                href="/contact"
                className="text-muted hover:text-primary transition-colors"
              >
                Contact
              </Link>
            </div>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg text-primary">
              Connect With Us
            </h3>
            <div className="flex space-x-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted hover:text-primary transition-colors"
              >
                <FaGithub size={24} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted hover:text-primary transition-colors"
              >
                <FaTwitter size={24} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted hover:text-primary transition-colors"
              >
                <FaLinkedin size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-200 mt-8 pt-8 text-center">
          <p className="text-muted">
            © {new Date().getFullYear()} Your Blog Name. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
