import client from "@/lib/apolloClient";
import { gql } from "@apollo/client";

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
