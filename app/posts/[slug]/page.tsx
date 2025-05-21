"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { getPostBySlug } from "@/graphql/query/Posts";
import getImageUrl from "@/lib/getImageUrl";
import BlockRendererClient from "@/components/Common/StrapiBlockRenderer";
import { BlocksContent } from "@strapi/blocks-react-renderer";
import DetailPageLayout from "@/layouts/detailPageLayout";

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
  coverImage: {
    url: string;
    alternativeText: string;
  };
  authors: Author[];
}

export default function PostDetails({ params }: { params: { slug: string } }) {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const postData = await getPostBySlug(params.slug);
        setPost(postData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching post:", error);
        setLoading(false);
      }
    };

    fetchPost();
  }, [params.slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="w-4/5 mx-auto">
          <div className="animate-pulse space-y-8">
            <div className="relative h-96 bg-gray-200 rounded-lg"></div>
            <div className="space-y-4">
              <div className="h-8 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="w-4/5 mx-auto text-center">
          <h1 className="text-2xl font-semibold text-gray-700">
            Post not found
          </h1>
        </div>
      </div>
    );
  }

  return (
    <DetailPageLayout>
      <div className="min-h-screen py-12">
        <article className="mx-auto">
          {/* Cover Image */}
          <div className="relative h-96 rounded-lg overflow-hidden mb-8">
            {post.coverImage?.url && (
              <Image
                src={getImageUrl(post.coverImage.url) || ""}
                alt={post.coverImage.alternativeText}
                fill
                className="object-cover"
              />
            )}
          </div>

          {/* Title */}
          <h1 className="text-4xl font-bold text-gray-900 mb-8">
            {post.title}
          </h1>

          {/* Authors */}
          <div className="flex flex-wrap gap-6 mb-12">
            {post.authors?.map((author) => (
              <div
                key={author.authorName}
                className="flex items-center space-x-4"
              >
                <div className="relative w-12 h-12 rounded-full overflow-hidden">
                  <Image
                    src={getImageUrl(author.authorProfileImage.url) || ""}
                    alt={author.authorProfileImage.alternativeText}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">
                    {author.authorName}
                  </p>
                  <p className="text-sm text-gray-600">
                    {author.authorOccupation}
                  </p>
                  <p className="text-sm text-gray-500">
                    {author.authorState}, {author.authorCountry}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            <BlockRendererClient content={post.content} />
          </div>
        </article>
      </div>
    </DetailPageLayout>
  );
}
