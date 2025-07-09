// import { gql, request } from "graphql-request";
// import {
//   About,
//   CreateAboutInput,
//   CreateAboutResponse,
//   GetAboutResponse,
// } from "../../shared/types/about";

// // const endpoint = "https://zippy-vibrancy-production.up.railway.app/graphql";
// const endpoint = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT as string;

// // Get all About entries
// export const getAbout = async (): Promise<About[]> => {
//   const query = gql`
//     query GetAbout {
//       getAbout {
//         id
//         heading
//         paragraph
//         imageUrl
//       }
//     }
//   `;
//   const data = await request<GetAboutResponse>(endpoint, query);
//   return data.getAbout;
// };

// // Create new About entry
// export const createAbout = async (
//   data: CreateAboutInput
// ): Promise<CreateAboutResponse> => {
//   const mutation = gql`
//     mutation CreateAbout(
//       $heading: String!
//       $paragraph: String!
//       $imageUrl: String!
//     ) {
//       createAbout(
//         heading: $heading
//         paragraph: $paragraph
//         imageUrl: $imageUrl
//       ) {
//         id
//       }
//     }
//   `;
//   return request<CreateAboutResponse>(endpoint, mutation, data);
// };

import { gql, request } from "graphql-request";
import {
  About,
  CreateAboutInput,
  GetAboutResponse,
} from "../../shared/types/about";

const endpoint = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT as string;

// ✅ Get all About entries
export const getAbout = async (): Promise<About[]> => {
  const query = gql`
    query GetAbout {
      getAbout {
        id
        heading
        paragraph
        imageUrl
      }
    }
  `;

  try {
    const data = await request<GetAboutResponse>(endpoint, query);
    return data.getAbout;
  } catch (error) {
    console.error("Error fetching about entries:", error);
    throw error;
  }
};

// ✅ Create new About entry
export const createAbout = async (data: CreateAboutInput): Promise<About> => {
  const mutation = gql`
    mutation CreateAbout(
      $heading: String!
      $paragraph: String!
      $imageUrl: String!
    ) {
      createAbout(
        heading: $heading
        paragraph: $paragraph
        imageUrl: $imageUrl
      ) {
        id
        heading
        paragraph
        imageUrl
      }
    }
  `;

  try {
    const res = await request<{ createAbout: About }>(endpoint, mutation, data);
    return res.createAbout;
  } catch (error) {
    console.error("Error creating about entry:", error);
    throw error;
  }
};

// ✅ Update About entry
export const updateAbout = async (
  id: string,
  data: { heading: string; paragraph: string; imageUrl: string }
): Promise<About> => {
  const mutation = gql`
    mutation UpdateAbout(
      $id: ID!
      $heading: String!
      $paragraph: String!
      $imageUrl: String!
    ) {
      updateAbout(
        id: $id
        heading: $heading
        paragraph: $paragraph
        imageUrl: $imageUrl
      ) {
        id
        heading
        paragraph
        imageUrl
      }
    }
  `;

  const variables = { id, ...data };

  try {
    const res = await request<{ updateAbout: About }>(
      endpoint,
      mutation,
      variables
    );
    return res.updateAbout;
  } catch (error) {
    console.error("Error updating about entry:", error);
    throw error;
  }
};

// ✅ Delete About entry
export const deleteAbout = async (id: string): Promise<void> => {
  const mutation = gql`
    mutation DeleteAbout($id: ID!) {
      deleteAbout(id: $id) {
        id
      }
    }
  `;

  try {
    await request<{ deleteAbout: { id: string } }>(endpoint, mutation, { id });
  } catch (error) {
    console.error("Error deleting about entry:", error);
    throw error;
  }
};
