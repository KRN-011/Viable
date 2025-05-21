"use client";

import CreatePostLayout from "@/layouts/createPost";
import CreatePostForm from "@/components/Posts/CreatePostForm";

export default function CreatePost() {
  return (
    <CreatePostLayout>
      <div className="w-full">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Create Post</h1>
        <CreatePostForm />
      </div>
    </CreatePostLayout>
  );
}
