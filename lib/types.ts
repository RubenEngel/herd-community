// ----------- Enums

enum Role {
  USER,
  ADMIN,
}

// ----------- Types

export interface User {
  id: string;
  email: String;
  role: Role;
  name: String;
  posts: Post[];
  likedPosts: Post[];
  comments: Comment[];
  likedComments: Comment[];
  following: User[];
  followers: User[];
}

export interface Post {
  id: string;
  slug: string;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
  title: String;
  content: String;
  author: User;
  comments: Comment[];
  likedBy: User[];
  categories: Category[];
  tags: String[];
}

export interface Category {
  id: String;
  name: String;
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
