import type {
  Post as PrismaPost,
  User as PrismaUser,
  Role as PrismaRole,
  Category as PrimsaCategory,
} from "../../api/node_modules/.prisma/client/index";

// ----------- Enums

export type Role = PrismaRole;

// ----------- Types
export interface User extends PrismaUser {}

export interface Post extends PrismaPost {
  author: User;
  categories: Category[];
}

export interface Category extends PrimsaCategory {}

// ----------- Inputs

// export interface PostInput {
//   slug: string;
//   title: string;
//   content: string;
//   categories: string[];
//   tags: string[];
//   authorId: string;
// }
