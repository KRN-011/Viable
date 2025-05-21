"use client";

import Link from "next/link";
import CommonLayout from "@/layouts/commonLayout";

export default function WriterConfirmed() {
  return (
    <CommonLayout>
      <div className="min-h-screen flex items-center justify-center bg-background-lightMuted py-12">
        <div className="w-4/5 max-w-md space-y-8">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center">
              <svg
                className="w-8 h-8 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
            </div>
            <h2 className="text-3xl font-semibold text-primary">
              Congratulations!
            </h2>
            <p className="text-gray-600">
              Your writer request has been approved. You can now start creating
              and publishing your own blog posts.
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-sm space-y-6">
            <div className="space-y-4">
              <p className="text-gray-600">
                As a confirmed writer, you can now:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>Create and publish blog posts</li>
                <li>Access the writer dashboard</li>
                <li>Engage with your readers</li>
                <li>Build your personal brand</li>
              </ul>
            </div>

            <Link
              href="/"
              className="block w-full bg-sky-400 py-3 px-4 rounded-lg font-semibold text-white hover:bg-sky-500 transition-all duration-300 text-center"
            >
              Go to Home
            </Link>
          </div>
        </div>
      </div>
    </CommonLayout>
  );
}
