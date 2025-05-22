import client from "@/lib/apolloClient";
import { gql } from "@apollo/client";

// Get all posts
export const GET_HOME_PAGE = gql`
  query Home {
    home {
      blocks {
        __typename
        ... on ComponentBlocksLandingPage {
          title
          subtitle
          ctaText
          ctaLink
          backgroundMedia {
            url
            alternativeText
          }
        }
        ... on ComponentBlocksAlterBlock {
          heading
          subheading
          data_component {
            title
            subtitle
            image {
              url
              alternativeText
            }
          }
        }
      }
    }
  }
`;

export async function getHomePage() {
  try {
    const { data } = await client.query({
      query: GET_HOME_PAGE,
    });

    return data?.home;
  } catch (error) {
    console.log(error);
  }
}
