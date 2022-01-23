// import type {
//   Post as PrismaPost,
//   User as PrismaUser,
//   Role as PrismaRole,
//   Category as PrimsaCategory,
//   Comment as PrismaComment,
// } from "../../api/node_modules/.prisma/client/index";

// ----------- Enums

export enum Role {
  USER = "USER",
  ADMIN = "ADMIN",
}

// ----------- Types

export interface User {
  id: number;
  email: string;
  role: Role;
  username: string | null;
  firstName: string | null;
  lastName: string | null;
  imageUrl: string | null;
  followers: User[];
  following: User[];
  _count: {
    posts: number | null;
    followers: number | null;
    following: number | null;
    likedPosts: number | null;
    comments: number | null;
  };
}

export interface Post {
  id: number;
  slug: string;
  published: boolean;
  viewCount: number;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  featuredImage: string | null;
  content: string;
  excerpt: string;
  wordCount: number;
  authorEmail: string | null;
  tags: string[];
  author: User;
  categories: Category[];
  likedBy: User[];
  _count: {
    likedBy: number;
    comments: number;
  };
}

export interface Comment {
  id: number;
  content: string;
  authorId: number;
  createdAt: Date;
  postId: number;
  parentCommentId: number;
  author: User;
  // childComments: Comment[];
  // likedBy: User[];
}

export interface Category {
  id: number;
  name: string;
}
