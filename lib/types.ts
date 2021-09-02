export interface Post {
  title: string;
  slug: string;
  date: string;
  featuredImage: string;
  author: User;
  categories: string[];
  tags: string[];
  content: string;
  likes: number;
}

export interface User {
  firstName: string;
  lastName: string;
  username: string;
  photoURL: string;
}