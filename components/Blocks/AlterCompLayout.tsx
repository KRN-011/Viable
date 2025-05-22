"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import getImageUrl from "@/lib/getImageUrl";
import { AlterBlock } from "@/lib/types/blocks";

interface DataComponentItem {
  title: string;
  subtitle: string;
  image: {
    url: string;
    alternativeText?: string;
  };
}

export default function AlterCompLayout({ block }: { block: AlterBlock }) {
  return (
    <section className="py-12 md:py-16 lg:py-24 bg-background-light">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Main Heading */}
        <motion.div
          className="text-center mb-8 md:mb-12 lg:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-dark mb-2 md:mb-4">
            {block?.heading}
          </h2>
          <p className="text-lg md:text-xl text-text-dark">
            {block?.subheading}
          </p>
        </motion.div>

        {/* Alternating Content */}
        <div className="space-y-12 md:space-y-16 lg:space-y-24">
          {block?.data_component?.map(
            (item: DataComponentItem, index: number) => (
              <motion.div
                key={index}
                className="flex flex-col gap-8 md:gap-12"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                {/* Image for mobile (top) */}
                <motion.div
                  className={`lg:hidden relative w-full h-[300px] sm:h-[350px] rounded-xl md:rounded-2xl overflow-hidden shadow-lg md:shadow-2xl`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  {item?.image?.url && getImageUrl(item.image.url) && (
                    <Image
                      src={getImageUrl(item.image.url) || ""}
                      alt={item.image.alternativeText || item.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      priority={index === 0}
                    />
                  )}
                </motion.div>

                {/* Content and Desktop Image Container */}
                <div
                  className={`flex flex-col lg:flex-row gap-8 lg:gap-12 ${
                    index % 2 === 1 ? "lg:flex-row-reverse" : ""
                  } lg:items-center`}
                >
                  {/* Content */}
                  <div className="flex-1 space-y-4 md:space-y-6">
                    <motion.h3
                      className="text-2xl md:text-3xl font-bold text-text-dark"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                    >
                      {item?.title}
                    </motion.h3>
                    <motion.p
                      className="text-base md:text-lg text-text-dark leading-relaxed"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                    >
                      {item?.subtitle}
                    </motion.p>
                  </div>

                  {/* Image for desktop (side) */}
                  <motion.div
                    className="hidden lg:block flex-1 relative h-[400px] rounded-2xl overflow-hidden shadow-2xl"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    {item?.image?.url && getImageUrl(item.image.url) && (
                      <Image
                        src={getImageUrl(item.image.url) || ""}
                        alt={item.image.alternativeText || item.title}
                        fill
                        className="object-cover"
                        sizes="(min-width: 1024px) 45vw"
                        priority={index === 0}
                      />
                    )}
                  </motion.div>
                </div>
              </motion.div>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
