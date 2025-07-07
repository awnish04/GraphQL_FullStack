import { gql, request } from "graphql-request";
import { About, GetAboutResponse } from "../../shared/types/about";

// const endpoint = "https://zippy-vibrancy-production.up.railway.app/graphql";
const endpoint = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT as string;

// Only read operation needed on client
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
