// import type {
//   Post as PrismaPost,
//   User as PrismaUser,
//   Role as PrismaRole,
//   Category as PrimsaCategory,
// } from "../../api/node_modules/.prisma/client/index";

// ----------- Enums

// export type Role = PrismaRole;
export enum Role {
  USER = "USER",
  ADMIN = "ADMIN",
}

// ----------- Types
// export interface User extends PrismaUser {}

export interface User {
  id: number;
  email: string;
  role: Role;
  username: string | null;
  firstName: string | null;
  lastName: string | null;
  imageUrl: string | null;
}

// export interface Post extends PrismaPost {
//   author: User;
//   categories: Category[];
//   likedBy: User[];
//   _count: {
//     likedBy: number;
//   };
// }

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
  authorEmail: string | null;
  tags: string[];
  author: User;
  categories: Category[];
  likedBy: User[];
  _count: {
    likedBy: number;
  };
}

// export interface Category extends PrimsaCategory {}

export interface Category {
  id: number;
  name: string;
}
// ----------- Inputs

// export interface PostInput {
//   slug: string;
//   title: string;
//   content: string;
//   categories: string[];
//   tags: string[];
//   authorId: string;
// }
