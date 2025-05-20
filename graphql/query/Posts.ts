import client from "@/lib/apolloClient";
import { gql } from "@apollo/client";

export const BLOGS_QUERY = gql`
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
      query: BLOGS_QUERY,
    });

    return data?.posts;
  } catch (error) {
    console.log(error);
  }
}
