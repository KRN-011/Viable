"use client";

import { useState } from "react";
import QuillEditor from "../Editor/QuillEditor";
import Image from "next/image";

interface Author {
  name: string;
  occupation: string;
  state: string;
  country: string;
  image: File | null;
  imagePreview: string;
}

interface PostFormData {
  title: string;
  slug: string;
  content: string;
  coverImage: File | null;
  coverImagePreview: string;
  authors: Author[];
}

export default function CreatePostForm() {
  const [formData, setFormData] = useState<PostFormData>({
    title: "",
    slug: "",
    content: "",
    coverImage: null,
    coverImagePreview: "",
    authors: [
      {
        name: "",
        occupation: "",
        state: "",
        country: "",
        image: null,
        imagePreview: "",
      },
    ],
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleContentChange = (content: string) => {
    setFormData((prev) => ({
      ...prev,
      content,
    }));
  };

  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          coverImage: file,
          coverImagePreview: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAuthorChange = (
    index: number,
    field: keyof Author,
    value: string | File | null,
  ) => {
    setFormData((prev) => {
      const newAuthors = [...prev.authors];
      if (field === "image" && value instanceof File) {
        const reader = new FileReader();
        reader.onloadend = () => {
          newAuthors[index] = {
            ...newAuthors[index],
            image: value,
            imagePreview: reader.result as string,
          };
          setFormData((prev) => ({
            ...prev,
            authors: newAuthors,
          }));
        };
        reader.readAsDataURL(value);
        return prev;
      }
      newAuthors[index] = {
        ...newAuthors[index],
        [field]: value,
      };
      return {
        ...prev,
        authors: newAuthors,
      };
    });
  };

  const addAuthor = () => {
    setFormData((prev) => ({
      ...prev,
      authors: [
        ...prev.authors,
        {
          name: "",
          occupation: "",
          state: "",
          country: "",
          image: null,
          imagePreview: "",
        },
      ],
    }));
  };

  const removeAuthor = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      authors: prev.authors.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Handle form submission
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Title */}
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700"
        >
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500"
          required
        />
      </div>

      {/* Slug */}
      <div>
        <label
          htmlFor="slug"
          className="block text-sm font-medium text-gray-700"
        >
          Slug
        </label>
        <input
          type="text"
          id="slug"
          name="slug"
          value={formData.slug}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500"
          required
        />
      </div>

      {/* Cover Image */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Cover Image
        </label>
        <div className="mt-1 flex items-center gap-4">
          <input
            type="file"
            accept="image/*"
            onChange={handleCoverImageChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-sky-50 file:text-sky-700 hover:file:bg-sky-100"
          />
          {formData.coverImagePreview && (
            <div className="relative h-20 w-20">
              <Image
                src={formData.coverImagePreview}
                alt="Cover preview"
                fill
                className="object-cover rounded"
              />
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Content
        </label>
        <QuillEditor
          content={formData.content}
          onChange={handleContentChange}
        />
      </div>

      {/* Authors */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-900">Authors</h3>
          <button
            type="button"
            onClick={addAuthor}
            className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-sky-600 hover:bg-sky-700"
          >
            Add Author
          </button>
        </div>

        {formData.authors.map((author, index) => (
          <div key={index} className="border rounded-lg p-4 space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="text-md font-medium text-gray-900">
                Author {index + 1}
              </h4>
              {index > 0 && (
                <button
                  type="button"
                  onClick={() => removeAuthor(index)}
                  className="text-red-600 hover:text-red-800"
                >
                  Remove
                </button>
              )}
            </div>

            {/* Author Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  value={author.name}
                  onChange={(e) =>
                    handleAuthorChange(index, "name", e.target.value)
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Occupation
                </label>
                <input
                  type="text"
                  value={author.occupation}
                  onChange={(e) =>
                    handleAuthorChange(index, "occupation", e.target.value)
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  State
                </label>
                <input
                  type="text"
                  value={author.state}
                  onChange={(e) =>
                    handleAuthorChange(index, "state", e.target.value)
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Country
                </label>
                <input
                  type="text"
                  value={author.country}
                  onChange={(e) =>
                    handleAuthorChange(index, "country", e.target.value)
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500"
                  required
                />
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700">
                  Profile Image
                </label>
                <div className="mt-1 flex items-center gap-4">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        handleAuthorChange(index, "image", file);
                      }
                    }}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-sky-50 file:text-sky-700 hover:file:bg-sky-100"
                  />
                  {author.imagePreview && (
                    <div className="relative h-20 w-20">
                      <Image
                        src={author.imagePreview}
                        alt="Author preview"
                        fill
                        className="object-cover rounded"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Submit Button */}
      <div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
        >
          Create Post
        </button>
      </div>
    </form>
  );
}
