import client from "@/lib/apolloClient";
import { gql } from "@apollo/client";
import { Author } from "@/types/userTypes";

// Get all posts
export const GET_ALL_POSTS = gql`
  query Posts {
    posts {
      title
      slug
      content
      coverImage {
        url
        alternativeText
      }
      authors {
        authorName
        authorOccupation
        authorCountry
        authorState
        authorProfileImage {
          url
          alternativeText
        }
      }
    }
  }
`;

export async function getPosts() {
  try {
    const { data } = await client.query({
      query: GET_ALL_POSTS,
    });

    return data?.posts;
  } catch (error) {
    console.log(error);
  }
}

// Get post by slug
export const GET_POST_BY_SLUG = gql`
  query PostBySlug($slug: String!) {
    posts(filters: { slug: { eq: $slug } }) {
      title
      slug
      content
      coverImage {
        url
        alternativeText
      }
      authors {
        authorName
        authorOccupation
        authorCountry
        authorState
        authorProfileImage {
          url
          alternativeText
        }
      }
    }
  }
`;

export async function getPostBySlug(slug: string) {
  try {
    const { data } = await client.query({
      query: GET_POST_BY_SLUG,
      variables: { slug },
    });

    const post = data?.posts?.[0];
    if (!post) return null;

    return {
      title: post.title,
      slug: post.slug,
      content: post.content,
      coverImage: {
        url: post.coverImage?.url,
        alternativeText: post.coverImage?.alternativeText,
      },
      authors: post.authors?.map((author: Author) => ({
        authorName: author.authorName,
        authorOccupation: author.authorOccupation,
        authorCountry: author.authorCountry,
        authorState: author.authorState,
        authorProfileImage: {
          url: author.authorProfileImage?.url,
          alternativeText: author.authorProfileImage?.alternativeText,
        },
      })),
    };
  } catch (error) {
    console.error("Error fetching post:", error);
    return null;
  }
}
