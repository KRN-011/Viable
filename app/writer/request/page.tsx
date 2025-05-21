"use client";

import { useState } from "react";
import CommonLayout from "@/layouts/commonLayout";

export default function WriterRequest() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = () => {
    setIsSubmitted(true);
  };

  return (
    <CommonLayout>
      <div className="min-h-screen flex items-center justify-center bg-background-lightMuted py-12">
        <div className="w-4/5 max-w-md space-y-8">
          <div>
            <h2 className="text-center text-3xl font-semibold text-primary">
              Become a Writer
            </h2>
            <p className="mt-2 text-center text-gray-600">
              Join our community of writers and share your thoughts with the
              world
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-sm space-y-6">
            {!isSubmitted ? (
              <>
                <div className="space-y-4">
                  <p className="text-gray-600">
                    As a writer, you&apos;ll be able to:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>Create and publish your own blog posts</li>
                    <li>Build your personal brand and following</li>
                    <li>Engage with readers through comments</li>
                    <li>Access exclusive writer tools and analytics</li>
                  </ul>
                </div>

                <button
                  onClick={handleSubmit}
                  className="w-full bg-sky-400 py-3 px-4 rounded-lg font-semibold text-white hover:bg-sky-500 transition-all duration-300"
                >
                  Submit Writer Request
                </button>
              </>
            ) : (
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
                <h3 className="text-xl font-semibold text-gray-800">
                  Request Submitted!
                </h3>
                <p className="text-gray-600">
                  Your request is under review. We&apos;ll notify you once
                  it&apos;s approved.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </CommonLayout>
  );
}
