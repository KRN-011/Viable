import client from "@/lib/apolloClient";
import { gql } from "@apollo/client";
import Cookies from "js-cookie";

// ------------------------------
// USER MUTATIONS
// ------------------------------

// ------------------------------
// WRITER MUTATIONS
// ------------------------------

// Confirm writer request

export const REQUEST_TO_BECOME_WRITER = gql`
  mutation ($id: ID!, $data: UsersPermissionsUserInput!) {
    updateUsersPermissionsUser(id: $id, data: $data) {
      data {
        RequestToBecomeWriter
      }
    }
  }
`;

export async function requestToBecomeWriter() {
  try {
    // get user id and token from cookies using js-cookie
    const userCookie = Cookies.get("user");
    const user = userCookie ? JSON.parse(userCookie) : null;
    const token = Cookies.get("token");
    if (!user) {
      return null;
    }

    await client.mutate({
      mutation: REQUEST_TO_BECOME_WRITER,
      variables: { id: user.id, data: { RequestToBecomeWriter: true } },
      context: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    });

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}
