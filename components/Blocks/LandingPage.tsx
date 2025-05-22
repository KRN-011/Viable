"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import SharpEdgeButton from "@/components/ui/SharpEdgeButton";
import getImageUrl from "@/lib/getImageUrl";
import { Suspense } from "react";
import CustomSkeleton from "../ui/CustomSkeleton";
import { LandingPageBlock } from "@/lib/types/blocks";
import Cookies from "js-cookie";

export default function LandingPage({ block }: { block: LandingPageBlock }) {
  // get token from cookie
  const token = Cookies.get("token");

  return (
    <div className="relative min-h-[80vh] sm:min-h-[85vh] md:min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Suspense fallback={<CustomSkeleton />}>
          {block?.backgroundMedia?.url && (
            <div className="relative h-full w-full">
              <Image
                src={
                  getImageUrl(block?.backgroundMedia?.url) ||
                  "/default-hero.jpg"
                }
                alt={
                  block?.backgroundMedia?.alternativeText || "Hero background"
                }
                fill
                className="object-cover brightness-[0.4] sm:brightness-50"
                priority
                sizes="100vw"
              />
              <div className="absolute inset-0 bottom-0 bg-gradient-to-b from-transparent via-background-light/10 to-background-light" />
            </div>
          )}
        </Suspense>
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 text-center max-w-[90%] sm:max-w-[85%] md:max-w-2xl lg:max-w-4xl mx-auto px-4 sm:px-6 md:px-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.h1
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {block?.title}
        </motion.h1>

        <motion.p
          className="text-base sm:text-lg md:text-xl lg:text-2xl mb-8 sm:mb-10 md:mb-12 text-gray-200"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {block?.subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="w-full max-w-[280px] sm:max-w-sm mx-auto"
        >
          <Link href={!token ? block?.ctaLink : "/posts"} className="block">
            <SharpEdgeButton className="w-full sm:w-auto">
              {block?.ctaText || "Get Started"}
            </SharpEdgeButton>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
