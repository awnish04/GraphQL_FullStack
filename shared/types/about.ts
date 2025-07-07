export interface About {
  id: string;
  heading: string;
  paragraph: string;
  imageUrl: string;
}

export interface CreateAboutInput {
  heading: string;
  paragraph: string;
  imageUrl: string;
}

export interface CreateAboutResponse {
  createAbout: {
    id: string;
  };
}

export interface GetAboutResponse {
  getAbout: About[];
}
