import { gql, request } from "graphql-request";
import {
  About,
  CreateAboutInput,
  CreateAboutResponse,
  GetAboutResponse,
} from "../../shared/types/about";

// const endpoint = "https://zippy-vibrancy-production.up.railway.app/graphql";
const endpoint = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT as string;


// Get all About entries
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
  const data = await request<GetAboutResponse>(endpoint, query);
  return data.getAbout;
};

// Create new About entry
export const createAbout = async (
  data: CreateAboutInput
): Promise<CreateAboutResponse> => {
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
      }
    }
  `;
  return request<CreateAboutResponse>(endpoint, mutation, data);
};
