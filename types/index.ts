export type TestimonialType = {
  id: number;
  name: string;
  role: string;
  quote: string;
  avatar: string;
};

export type ExpertType = {
  id: number;
  name: string;
  specialty: string;
  bio: string;
  image: string;
};

export type ServiceType = {
  id: number;
  title: string;
  description: string;
  icon: string;
};

export type BlogPostType = {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  image: string;
};