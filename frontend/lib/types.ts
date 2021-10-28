// ----------- Enums

enum Role {
  USER,
  ADMIN,
}

// ----------- Types

export interface User {
  id: string;
  email: string;
  role: Role;
  firstName: string;
  lastName: string;
  posts: Post[];
  imageUrl: string
  likedPosts: Post[];
  comments: Comment[];
  likedComments: Comment[];
  following: User[];
  followers: User[];
}

export interface Post {
  id: string;
  slug: string;
  featuredImage: string;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  content: string;
  author: User;
  comments: Comment[];
  likedBy: User[];
  categories: Category[];
  tags: string[];
}

export interface Category {
  id: string;
  name: string;
  posts: Post[];
}

// ----------- Inputs

export interface PostInput {
  slug: string;
  title: string;
  content: string;
  categories: string[];
  tags: string[];
  authorId: string;
}
