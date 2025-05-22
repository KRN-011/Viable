"use client";

import { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { getPosts } from "@/graphql/query/Posts";
import { FaSearch } from "react-icons/fa";
import getImageUrl from "@/lib/getImageUrl";
import { BlocksContent } from "@strapi/blocks-react-renderer";
import CommonLayout from "@/layouts/commonLayout";
import CustomSkeleton from "@/components/ui/CustomSkeleton";

interface Author {
  authorName: string;
  authorOccupation: string;
  authorCountry: string;
  authorState: string;
  authorProfileImage: {
    url: string;
    alternativeText: string;
  };
}

interface Post {
  title: string;
  slug: string;
  content: BlocksContent;
  excerpt: string;
  coverImage: {
    url: string;
    alternativeText: string;
  };
  authors: Author[];
}

function getBlocksText(blocks: BlocksContent, limit?: number): string {
  const fullText = blocks
    ?.map((block) => {
      if (block?.type === "paragraph") {
        return (
          block?.children
            ?.map((child) => ("text" in child ? child.text : ""))
            .join("") || ""
        );
      }
      return "";
    })
    .join(" ");

  if (limit && fullText?.length > limit) {
    return `${fullText?.substring(0, limit)}...`;
  }

  return fullText;
}

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsData = await getPosts();
        setPosts(postsData);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  const filteredPosts = posts?.filter(
    (post) =>
      post?.title?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
      getBlocksText(post?.content, 100)
        ?.toLowerCase()
        ?.includes(searchTerm?.toLowerCase()),
  );

  return (
    <CommonLayout>
      <div className="min-h-screen py-6">
        <div className="w-4/5 mx-auto">
          <div className="mb-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-8">
              Blog Posts
            </h1>
            <div className="relative">
              <input
                type="text"
                placeholder="Search posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full md:w-96 px-4 py-2 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-background-dark focus:border-transparent"
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts?.map((post) => (
              <Link
                href={`/posts/${post?.slug}`}
                key={post?.slug}
                className="bg-white rounded-lg shadow-md overflow-hidden transform transition-transform duration-300 hover:scale-105"
              >
                <div className="relative h-48">
                  <Suspense
                    fallback={<CustomSkeleton className="h-full w-full" />}
                  >
                    {post?.coverImage?.url && (
                      <Image
                        src={getImageUrl(post?.coverImage?.url) || ""}
                        alt={post?.coverImage?.alternativeText}
                        fill
                        className="object-cover"
                      />
                    )}
                  </Suspense>
                </div>
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">
                    {post?.title}
                  </h2>
                  <div className="line-clamp-3 text-gray-600 mb-4">
                    {post?.excerpt}
                  </div>
                  <div className="flex items-center space-x-4">
                    {post?.authors?.map((author) => (
                      <div
                        key={author?.authorName}
                        className="flex items-center"
                      >
                        <div className="relative w-8 h-8 rounded-full overflow-hidden">
                          <Image
                            src={
                              getImageUrl(author?.authorProfileImage?.url) || ""
                            }
                            alt={author?.authorProfileImage?.alternativeText}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="ml-2">
                          <p className="text-sm font-medium text-gray-900">
                            {author?.authorName}
                          </p>
                          <p className="text-xs text-gray-500">
                            {author?.authorOccupation}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {filteredPosts?.length === 0 && (
            <div className="text-center py-12">
              <h2 className="text-2xl font-semibold text-gray-700">
                No posts found
              </h2>
              <p className="text-gray-500 mt-2">
                Try adjusting your search criteria
              </p>
            </div>
          )}
        </div>
      </div>
    </CommonLayout>
  );
}
