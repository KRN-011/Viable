import client from "@/lib/apolloClient";
import { gql } from "@apollo/client";

export const GET_USER_QUERY = gql`
  query GetUser($email: String!) {
    usersPermissionsUsers(filters: { email: { eq: $email } }) {
      email
      username
    }
  }
`;

export async function getUser(email: string) {
  try {
    const { data } = await client.query({
      query: GET_USER_QUERY,
      variables: {
        email: email,
      },
    });

    return data?.usersPermissionsUsers[0];
  } catch (error) {
    console.log(error);
  }
}
