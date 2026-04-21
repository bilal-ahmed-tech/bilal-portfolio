export interface SanityImage {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
}

export interface Project {
  _id: string;
  _type: "project";
  title: string;
  slug: {
    current: string;
  };
  description: string;
  challenge?: string;
  techStack?: string[];
  gallery?: Array<{
    asset: {
      _id: string;
      url: string;
    };
  }>;
  coverImage?: SanityImage;
  tags?: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
  order?: number;
}

export interface Service {
  _id: string;
  _type: "service";
  title: string;
  description: string;
  icon: string;
  features: string[];
  order: number;
}