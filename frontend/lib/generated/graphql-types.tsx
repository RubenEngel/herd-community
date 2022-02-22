import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type Category = {
  __typename?: 'Category';
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  posts?: Maybe<Array<Maybe<Post>>>;
};

export type Comment = {
  __typename?: 'Comment';
  author?: Maybe<User>;
  authorId?: Maybe<Scalars['Int']>;
  childComments?: Maybe<Array<Maybe<Comment>>>;
  content?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['Int']>;
  likedBy?: Maybe<Array<Maybe<User>>>;
  parentComment?: Maybe<Comment>;
  parentCommentId?: Maybe<Scalars['Int']>;
  post?: Maybe<Post>;
  postId?: Maybe<Scalars['Int']>;
};

export type File = {
  __typename?: 'File';
  encoding: Scalars['String'];
  filename: Scalars['String'];
  mimetype: Scalars['String'];
};

export type LikeMutationResult = {
  __typename?: 'LikeMutationResult';
  id?: Maybe<Scalars['Int']>;
  likedBy?: Maybe<Array<Maybe<User>>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  changePublished?: Maybe<Post>;
  changeSubmitted?: Maybe<Post>;
  createComment?: Maybe<Comment>;
  createDraft?: Maybe<Post>;
  createUser?: Maybe<User>;
  deleteComment?: Maybe<Comment>;
  followUser?: Maybe<User>;
  likeComment?: Maybe<LikeMutationResult>;
  likePost?: Maybe<LikeMutationResult>;
  signUpload?: Maybe<SignedUploadResponse>;
  unfollowUser?: Maybe<User>;
  unlikeComment?: Maybe<LikeMutationResult>;
  unlikePost?: Maybe<LikeMutationResult>;
  updatePost?: Maybe<Post>;
  updateUser?: Maybe<User>;
};


export type MutationChangePublishedArgs = {
  id: Scalars['Int'];
  published: Scalars['Boolean'];
};


export type MutationChangeSubmittedArgs = {
  id: Scalars['Int'];
  submitted: Scalars['Boolean'];
};


export type MutationCreateCommentArgs = {
  content: Scalars['String'];
  parentCommentId?: InputMaybe<Scalars['Int']>;
  postId: Scalars['Int'];
};


export type MutationCreateDraftArgs = {
  categories: Array<InputMaybe<Scalars['String']>>;
  content: Scalars['String'];
  featuredImage?: InputMaybe<Scalars['String']>;
  slug: Scalars['String'];
  submitted?: InputMaybe<Scalars['Boolean']>;
  tags?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  title: Scalars['String'];
};


export type MutationCreateUserArgs = {
  email?: InputMaybe<Scalars['String']>;
};


export type MutationDeleteCommentArgs = {
  id: Scalars['Int'];
};


export type MutationFollowUserArgs = {
  userId: Scalars['Int'];
};


export type MutationLikeCommentArgs = {
  id: Scalars['Int'];
};


export type MutationLikePostArgs = {
  id: Scalars['Int'];
};


export type MutationUnfollowUserArgs = {
  userId: Scalars['Int'];
};


export type MutationUnlikeCommentArgs = {
  id: Scalars['Int'];
};


export type MutationUnlikePostArgs = {
  id: Scalars['Int'];
};


export type MutationUpdatePostArgs = {
  categories?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  content?: InputMaybe<Scalars['String']>;
  featuredImage?: InputMaybe<Scalars['String']>;
  id: Scalars['Int'];
  slug?: InputMaybe<Scalars['String']>;
  tags?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  title?: InputMaybe<Scalars['String']>;
};


export type MutationUpdateUserArgs = {
  firstName?: InputMaybe<Scalars['String']>;
  imageUrl?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  username?: InputMaybe<Scalars['String']>;
};

export type Post = {
  __typename?: 'Post';
  _count?: Maybe<PostRelationCounts>;
  author?: Maybe<User>;
  authorEmail?: Maybe<Scalars['String']>;
  categories?: Maybe<Array<Maybe<Category>>>;
  comments?: Maybe<Array<Maybe<Comment>>>;
  content?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  excerpt?: Maybe<Scalars['String']>;
  featuredImage?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  likedBy?: Maybe<Array<Maybe<User>>>;
  published?: Maybe<Scalars['Boolean']>;
  slug?: Maybe<Scalars['String']>;
  submitted?: Maybe<Scalars['Boolean']>;
  tags?: Maybe<Array<Maybe<Scalars['String']>>>;
  title?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  wordCount?: Maybe<Scalars['Int']>;
};

export type PostQueryResult = {
  __typename?: 'PostQueryResult';
  _count?: Maybe<Scalars['Int']>;
  posts?: Maybe<Array<Maybe<Post>>>;
};

export type PostRelationCounts = {
  __typename?: 'PostRelationCounts';
  comments?: Maybe<Scalars['Int']>;
  likedBy?: Maybe<Scalars['Int']>;
};

export type Query = {
  __typename?: 'Query';
  categories?: Maybe<Array<Maybe<Category>>>;
  commentLikedBy?: Maybe<Array<Maybe<User>>>;
  commentReplies?: Maybe<Array<Maybe<Comment>>>;
  comments?: Maybe<Array<Maybe<Comment>>>;
  post?: Maybe<Post>;
  postLikedBy?: Maybe<Array<Maybe<User>>>;
  posts?: Maybe<PostQueryResult>;
  searchUsers?: Maybe<UserSearchResult>;
  user?: Maybe<User>;
  userByEmail?: Maybe<User>;
};


export type QueryCommentLikedByArgs = {
  id: Scalars['Int'];
};


export type QueryCommentRepliesArgs = {
  id: Scalars['Int'];
};


export type QueryCommentsArgs = {
  authorId?: InputMaybe<Scalars['Int']>;
  postId?: InputMaybe<Scalars['Int']>;
};


export type QueryPostArgs = {
  slug: Scalars['String'];
};


export type QueryPostLikedByArgs = {
  id?: InputMaybe<Scalars['Int']>;
};


export type QueryPostsArgs = {
  authorId?: InputMaybe<Scalars['Int']>;
  category?: InputMaybe<Scalars['String']>;
  likedByUserId?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
  published?: InputMaybe<Scalars['Boolean']>;
  searchTerm?: InputMaybe<Scalars['String']>;
  startAfter?: InputMaybe<Scalars['Int']>;
  submitted?: InputMaybe<Scalars['Boolean']>;
};


export type QuerySearchUsersArgs = {
  searchTerm: Scalars['String'];
};


export type QueryUserArgs = {
  id?: InputMaybe<Scalars['Int']>;
  username?: InputMaybe<Scalars['String']>;
};


export type QueryUserByEmailArgs = {
  email: Scalars['String'];
};

export enum Role {
  Admin = 'ADMIN',
  Editor = 'EDITOR',
  User = 'USER'
}

export type SignedUploadResponse = {
  __typename?: 'SignedUploadResponse';
  signature?: Maybe<Scalars['String']>;
  timestamp?: Maybe<Scalars['Int']>;
};

export type User = {
  __typename?: 'User';
  _count?: Maybe<UserRelationCounts>;
  comments?: Maybe<Array<Maybe<Comment>>>;
  email?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  followers?: Maybe<Array<Maybe<User>>>;
  following?: Maybe<Array<Maybe<User>>>;
  id?: Maybe<Scalars['Int']>;
  imageUrl?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  likedComments?: Maybe<Array<Maybe<Comment>>>;
  likedPosts?: Maybe<Array<Maybe<Post>>>;
  posts?: Maybe<Array<Maybe<Post>>>;
  role?: Maybe<Role>;
  username?: Maybe<Scalars['String']>;
};

export type UserRelationCounts = {
  __typename?: 'UserRelationCounts';
  comments?: Maybe<Scalars['Int']>;
  followers?: Maybe<Scalars['Int']>;
  following?: Maybe<Scalars['Int']>;
  likedPosts?: Maybe<Scalars['Int']>;
  posts?: Maybe<Scalars['Int']>;
};

export type UserSearchResult = {
  __typename?: 'UserSearchResult';
  _count?: Maybe<Scalars['Int']>;
  users?: Maybe<Array<Maybe<User>>>;
};

export type CoreUserFieldsFragment = { __typename?: 'User', id?: number | null, role?: Role | null, firstName?: string | null, lastName?: string | null, username?: string | null, imageUrl?: string | null, followers?: Array<{ __typename?: 'User', id?: number | null } | null> | null, following?: Array<{ __typename?: 'User', id?: number | null } | null> | null };

export type GetUserByEmailQueryVariables = Exact<{
  email: Scalars['String'];
}>;


export type GetUserByEmailQuery = { __typename?: 'Query', userByEmail?: { __typename?: 'User', email?: string | null, id?: number | null, role?: Role | null, firstName?: string | null, lastName?: string | null, username?: string | null, imageUrl?: string | null, followers?: Array<{ __typename?: 'User', id?: number | null } | null> | null, following?: Array<{ __typename?: 'User', id?: number | null } | null> | null } | null };

export type GetUserByUsernameQueryVariables = Exact<{
  username: Scalars['String'];
}>;


export type GetUserByUsernameQuery = { __typename?: 'Query', user?: { __typename?: 'User', id?: number | null, role?: Role | null, firstName?: string | null, lastName?: string | null, username?: string | null, imageUrl?: string | null, posts?: Array<{ __typename?: 'Post', id?: number | null } | null> | null, _count?: { __typename?: 'UserRelationCounts', posts?: number | null, followers?: number | null, following?: number | null, likedPosts?: number | null, comments?: number | null } | null, followers?: Array<{ __typename?: 'User', id?: number | null } | null> | null, following?: Array<{ __typename?: 'User', id?: number | null } | null> | null } | null };

export type SearchUsersQueryVariables = Exact<{
  searchTerm: Scalars['String'];
}>;


export type SearchUsersQuery = { __typename?: 'Query', searchUsers?: { __typename?: 'UserSearchResult', _count?: number | null, users?: Array<{ __typename?: 'User', id?: number | null, firstName?: string | null, lastName?: string | null, username?: string | null, imageUrl?: string | null } | null> | null } | null };

export type GetFollowingQueryVariables = Exact<{
  username?: InputMaybe<Scalars['String']>;
}>;


export type GetFollowingQuery = { __typename?: 'Query', user?: { __typename?: 'User', following?: Array<{ __typename?: 'User', id?: number | null, firstName?: string | null, lastName?: string | null, username?: string | null, imageUrl?: string | null } | null> | null } | null };

export type GetFollowersQueryVariables = Exact<{
  username?: InputMaybe<Scalars['String']>;
}>;


export type GetFollowersQuery = { __typename?: 'Query', user?: { __typename?: 'User', followers?: Array<{ __typename?: 'User', id?: number | null, firstName?: string | null, lastName?: string | null, username?: string | null, imageUrl?: string | null } | null> | null } | null };

export type GetAllPostSlugsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllPostSlugsQuery = { __typename?: 'Query', posts?: { __typename?: 'PostQueryResult', posts?: Array<{ __typename?: 'Post', slug?: string | null } | null> | null } | null };

export type CorePostFieldsFragment = { __typename?: 'Post', id?: number | null, slug?: string | null, published?: boolean | null, submitted?: boolean | null, title?: string | null, createdAt?: any | null, featuredImage?: string | null, tags?: Array<string | null> | null, wordCount?: number | null, author?: { __typename?: 'User', id?: number | null, firstName?: string | null, lastName?: string | null, imageUrl?: string | null, username?: string | null } | null, categories?: Array<{ __typename?: 'Category', name?: string | null } | null> | null, _count?: { __typename?: 'PostRelationCounts', likedBy?: number | null, comments?: number | null } | null };

export type GetPostQueryVariables = Exact<{
  slug: Scalars['String'];
}>;


export type GetPostQuery = { __typename?: 'Query', post?: { __typename?: 'Post', content?: string | null, id?: number | null, slug?: string | null, published?: boolean | null, submitted?: boolean | null, title?: string | null, createdAt?: any | null, featuredImage?: string | null, tags?: Array<string | null> | null, wordCount?: number | null, author?: { __typename?: 'User', id?: number | null, firstName?: string | null, lastName?: string | null, imageUrl?: string | null, username?: string | null } | null, categories?: Array<{ __typename?: 'Category', name?: string | null } | null> | null, _count?: { __typename?: 'PostRelationCounts', likedBy?: number | null, comments?: number | null } | null } | null };

export type GetPostsQueryVariables = Exact<{
  published?: InputMaybe<Scalars['Boolean']>;
  submitted?: InputMaybe<Scalars['Boolean']>;
  category?: InputMaybe<Scalars['String']>;
  limit?: InputMaybe<Scalars['Int']>;
  startAfter?: InputMaybe<Scalars['Int']>;
  authorId?: InputMaybe<Scalars['Int']>;
  searchTerm?: InputMaybe<Scalars['String']>;
}>;


export type GetPostsQuery = { __typename?: 'Query', posts?: { __typename?: 'PostQueryResult', _count?: number | null, posts?: Array<{ __typename?: 'Post', id?: number | null, slug?: string | null, published?: boolean | null, submitted?: boolean | null, title?: string | null, createdAt?: any | null, featuredImage?: string | null, tags?: Array<string | null> | null, wordCount?: number | null, author?: { __typename?: 'User', id?: number | null, firstName?: string | null, lastName?: string | null, imageUrl?: string | null, username?: string | null } | null, categories?: Array<{ __typename?: 'Category', name?: string | null } | null> | null, _count?: { __typename?: 'PostRelationCounts', likedBy?: number | null, comments?: number | null } | null } | null> | null } | null };

export type GetPostsWithExcerptQueryVariables = Exact<{
  published?: InputMaybe<Scalars['Boolean']>;
  category?: InputMaybe<Scalars['String']>;
  limit?: InputMaybe<Scalars['Int']>;
  startAfter?: InputMaybe<Scalars['Int']>;
  authorId?: InputMaybe<Scalars['Int']>;
}>;


export type GetPostsWithExcerptQuery = { __typename?: 'Query', posts?: { __typename?: 'PostQueryResult', _count?: number | null, posts?: Array<{ __typename?: 'Post', excerpt?: string | null, id?: number | null, slug?: string | null, published?: boolean | null, submitted?: boolean | null, title?: string | null, createdAt?: any | null, featuredImage?: string | null, tags?: Array<string | null> | null, wordCount?: number | null, author?: { __typename?: 'User', id?: number | null, firstName?: string | null, lastName?: string | null, imageUrl?: string | null, username?: string | null } | null, categories?: Array<{ __typename?: 'Category', name?: string | null } | null> | null, _count?: { __typename?: 'PostRelationCounts', likedBy?: number | null, comments?: number | null } | null } | null> | null } | null };

export type CoreCommentFieldsFragment = { __typename?: 'Comment', id?: number | null, postId?: number | null, content?: string | null, createdAt?: any | null, parentCommentId?: number | null, author?: { __typename?: 'User', id?: number | null, firstName?: string | null, lastName?: string | null, username?: string | null, imageUrl?: string | null } | null };

export type GetCommentsForPostQueryVariables = Exact<{
  postId?: InputMaybe<Scalars['Int']>;
}>;


export type GetCommentsForPostQuery = { __typename?: 'Query', comments?: Array<{ __typename?: 'Comment', id?: number | null, postId?: number | null, content?: string | null, createdAt?: any | null, parentCommentId?: number | null, childComments?: Array<{ __typename?: 'Comment', id?: number | null, postId?: number | null, content?: string | null, createdAt?: any | null, parentCommentId?: number | null, childComments?: Array<{ __typename?: 'Comment', id?: number | null, postId?: number | null, content?: string | null, createdAt?: any | null, parentCommentId?: number | null, author?: { __typename?: 'User', id?: number | null, firstName?: string | null, lastName?: string | null, username?: string | null, imageUrl?: string | null } | null } | null> | null, author?: { __typename?: 'User', id?: number | null, firstName?: string | null, lastName?: string | null, username?: string | null, imageUrl?: string | null } | null } | null> | null, author?: { __typename?: 'User', id?: number | null, firstName?: string | null, lastName?: string | null, username?: string | null, imageUrl?: string | null } | null } | null> | null };

export type GetUserLikedPostsQueryVariables = Exact<{
  likedByUserId?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
  published?: InputMaybe<Scalars['Boolean']>;
  startAfter?: InputMaybe<Scalars['Int']>;
}>;


export type GetUserLikedPostsQuery = { __typename?: 'Query', posts?: { __typename?: 'PostQueryResult', _count?: number | null, posts?: Array<{ __typename?: 'Post', id?: number | null, slug?: string | null, published?: boolean | null, submitted?: boolean | null, title?: string | null, createdAt?: any | null, featuredImage?: string | null, tags?: Array<string | null> | null, wordCount?: number | null, author?: { __typename?: 'User', id?: number | null, firstName?: string | null, lastName?: string | null, imageUrl?: string | null, username?: string | null } | null, categories?: Array<{ __typename?: 'Category', name?: string | null } | null> | null, _count?: { __typename?: 'PostRelationCounts', likedBy?: number | null, comments?: number | null } | null } | null> | null } | null };

export type GetCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCategoriesQuery = { __typename?: 'Query', categories?: Array<{ __typename?: 'Category', name?: string | null } | null> | null };

export type PostLikedByQueryVariables = Exact<{
  id?: InputMaybe<Scalars['Int']>;
}>;


export type PostLikedByQuery = { __typename?: 'Query', postLikedBy?: Array<{ __typename?: 'User', id?: number | null, firstName?: string | null, lastName?: string | null, username?: string | null } | null> | null };

export type CommentLikedByQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type CommentLikedByQuery = { __typename?: 'Query', commentLikedBy?: Array<{ __typename?: 'User', id?: number | null, username?: string | null, imageUrl?: string | null, firstName?: string | null, lastName?: string | null } | null> | null };

export type CreateDraftMutationVariables = Exact<{
  slug: Scalars['String'];
  title: Scalars['String'];
  content: Scalars['String'];
  tags?: InputMaybe<Array<InputMaybe<Scalars['String']>> | InputMaybe<Scalars['String']>>;
  categories: Array<InputMaybe<Scalars['String']>> | InputMaybe<Scalars['String']>;
  featuredImage?: InputMaybe<Scalars['String']>;
  submitted?: InputMaybe<Scalars['Boolean']>;
}>;


export type CreateDraftMutation = { __typename?: 'Mutation', createDraft?: { __typename?: 'Post', id?: number | null, slug?: string | null } | null };

export type CreateCommentMutationVariables = Exact<{
  content: Scalars['String'];
  postId: Scalars['Int'];
  parentCommentId?: InputMaybe<Scalars['Int']>;
}>;


export type CreateCommentMutation = { __typename?: 'Mutation', createComment?: { __typename?: 'Comment', id?: number | null, postId?: number | null, content?: string | null, createdAt?: any | null, parentCommentId?: number | null, parentComment?: { __typename?: 'Comment', id?: number | null, parentComment?: { __typename?: 'Comment', id?: number | null } | null } | null, author?: { __typename?: 'User', id?: number | null, firstName?: string | null, lastName?: string | null, username?: string | null, imageUrl?: string | null } | null } | null };

export type UpdatePostMutationVariables = Exact<{
  id: Scalars['Int'];
  slug?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
  featuredImage?: InputMaybe<Scalars['String']>;
  content?: InputMaybe<Scalars['String']>;
  categories?: InputMaybe<Array<InputMaybe<Scalars['String']>> | InputMaybe<Scalars['String']>>;
  tags?: InputMaybe<Array<InputMaybe<Scalars['String']>> | InputMaybe<Scalars['String']>>;
}>;


export type UpdatePostMutation = { __typename?: 'Mutation', updatePost?: { __typename?: 'Post', id?: number | null, slug?: string | null, title?: string | null, featuredImage?: string | null, tags?: Array<string | null> | null, categories?: Array<{ __typename?: 'Category', name?: string | null } | null> | null } | null };

export type UpdateUserImageMutationVariables = Exact<{
  imageUrl?: InputMaybe<Scalars['String']>;
}>;


export type UpdateUserImageMutation = { __typename?: 'Mutation', updateUser?: { __typename?: 'User', imageUrl?: string | null } | null };

export type UpdateUserDetailsMutationVariables = Exact<{
  firstName?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  username?: InputMaybe<Scalars['String']>;
}>;


export type UpdateUserDetailsMutation = { __typename?: 'Mutation', updateUser?: { __typename?: 'User', firstName?: string | null, lastName?: string | null, username?: string | null } | null };

export type SignCloudinaryUploadMutationVariables = Exact<{ [key: string]: never; }>;


export type SignCloudinaryUploadMutation = { __typename?: 'Mutation', signUpload?: { __typename?: 'SignedUploadResponse', timestamp?: number | null, signature?: string | null } | null };

export type CreateUserMutationVariables = Exact<{
  email?: InputMaybe<Scalars['String']>;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser?: { __typename?: 'User', id?: number | null, email?: string | null, role?: Role | null, firstName?: string | null, lastName?: string | null, imageUrl?: string | null } | null };

export type FollowUserMutationVariables = Exact<{
  userId: Scalars['Int'];
}>;


export type FollowUserMutation = { __typename?: 'Mutation', followUser?: { __typename?: 'User', followers?: Array<{ __typename?: 'User', id?: number | null } | null> | null } | null };

export type UnfollowUserMutationVariables = Exact<{
  userId: Scalars['Int'];
}>;


export type UnfollowUserMutation = { __typename?: 'Mutation', unfollowUser?: { __typename?: 'User', followers?: Array<{ __typename?: 'User', id?: number | null } | null> | null } | null };

export type ChangePublishedMutationVariables = Exact<{
  id: Scalars['Int'];
  published: Scalars['Boolean'];
}>;


export type ChangePublishedMutation = { __typename?: 'Mutation', changePublished?: { __typename?: 'Post', id?: number | null, slug?: string | null, published?: boolean | null } | null };

export type ChangeSubmittedMutationVariables = Exact<{
  id: Scalars['Int'];
  submitted: Scalars['Boolean'];
}>;


export type ChangeSubmittedMutation = { __typename?: 'Mutation', changeSubmitted?: { __typename?: 'Post', id?: number | null, slug?: string | null, submitted?: boolean | null } | null };

export type LikePostMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type LikePostMutation = { __typename?: 'Mutation', likePost?: { __typename?: 'LikeMutationResult', id?: number | null, likedBy?: Array<{ __typename?: 'User', id?: number | null } | null> | null } | null };

export type UnlikePostMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type UnlikePostMutation = { __typename?: 'Mutation', unlikePost?: { __typename?: 'LikeMutationResult', id?: number | null, likedBy?: Array<{ __typename?: 'User', id?: number | null } | null> | null } | null };

export type LikeCommentMutationVariables = Exact<{
  likeCommentId: Scalars['Int'];
}>;


export type LikeCommentMutation = { __typename?: 'Mutation', likeComment?: { __typename?: 'LikeMutationResult', id?: number | null, likedBy?: Array<{ __typename?: 'User', id?: number | null, username?: string | null, firstName?: string | null, lastName?: string | null, imageUrl?: string | null } | null> | null } | null };

export type UnlikeCommentMutationVariables = Exact<{
  unlikeCommentId: Scalars['Int'];
}>;


export type UnlikeCommentMutation = { __typename?: 'Mutation', unlikeComment?: { __typename?: 'LikeMutationResult', id?: number | null, likedBy?: Array<{ __typename?: 'User', id?: number | null, username?: string | null, firstName?: string | null, lastName?: string | null, imageUrl?: string | null } | null> | null } | null };

export type DeleteCommentMutationVariables = Exact<{
  deleteCommentId: Scalars['Int'];
}>;


export type DeleteCommentMutation = { __typename?: 'Mutation', deleteComment?: { __typename?: 'Comment', id?: number | null } | null };

export const CoreUserFieldsFragmentDoc = gql`
    fragment CoreUserFields on User {
  id
  role
  firstName
  lastName
  username
  imageUrl
  followers {
    id
  }
  following {
    id
  }
}
    `;
export const CorePostFieldsFragmentDoc = gql`
    fragment CorePostFields on Post {
  id
  slug
  published
  submitted
  title
  createdAt
  featuredImage
  author {
    id
    firstName
    lastName
    imageUrl
    username
  }
  categories {
    name
  }
  tags
  wordCount
  _count {
    likedBy
    comments
  }
}
    `;
export const CoreCommentFieldsFragmentDoc = gql`
    fragment CoreCommentFields on Comment {
  id
  postId
  author {
    id
    firstName
    lastName
    username
    imageUrl
  }
  content
  createdAt
  parentCommentId
}
    `;
export const GetUserByEmailDocument = gql`
    query GetUserByEmail($email: String!) {
  userByEmail(email: $email) {
    ...CoreUserFields
    email
  }
}
    ${CoreUserFieldsFragmentDoc}`;

/**
 * __useGetUserByEmailQuery__
 *
 * To run a query within a React component, call `useGetUserByEmailQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserByEmailQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserByEmailQuery({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useGetUserByEmailQuery(baseOptions: Apollo.QueryHookOptions<GetUserByEmailQuery, GetUserByEmailQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserByEmailQuery, GetUserByEmailQueryVariables>(GetUserByEmailDocument, options);
      }
export function useGetUserByEmailLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserByEmailQuery, GetUserByEmailQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserByEmailQuery, GetUserByEmailQueryVariables>(GetUserByEmailDocument, options);
        }
export type GetUserByEmailQueryHookResult = ReturnType<typeof useGetUserByEmailQuery>;
export type GetUserByEmailLazyQueryHookResult = ReturnType<typeof useGetUserByEmailLazyQuery>;
export type GetUserByEmailQueryResult = Apollo.QueryResult<GetUserByEmailQuery, GetUserByEmailQueryVariables>;
export const GetUserByUsernameDocument = gql`
    query GetUserByUsername($username: String!) {
  user(username: $username) {
    ...CoreUserFields
    posts {
      id
    }
    _count {
      posts
      followers
      following
      likedPosts
      comments
    }
  }
}
    ${CoreUserFieldsFragmentDoc}`;

/**
 * __useGetUserByUsernameQuery__
 *
 * To run a query within a React component, call `useGetUserByUsernameQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserByUsernameQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserByUsernameQuery({
 *   variables: {
 *      username: // value for 'username'
 *   },
 * });
 */
export function useGetUserByUsernameQuery(baseOptions: Apollo.QueryHookOptions<GetUserByUsernameQuery, GetUserByUsernameQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserByUsernameQuery, GetUserByUsernameQueryVariables>(GetUserByUsernameDocument, options);
      }
export function useGetUserByUsernameLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserByUsernameQuery, GetUserByUsernameQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserByUsernameQuery, GetUserByUsernameQueryVariables>(GetUserByUsernameDocument, options);
        }
export type GetUserByUsernameQueryHookResult = ReturnType<typeof useGetUserByUsernameQuery>;
export type GetUserByUsernameLazyQueryHookResult = ReturnType<typeof useGetUserByUsernameLazyQuery>;
export type GetUserByUsernameQueryResult = Apollo.QueryResult<GetUserByUsernameQuery, GetUserByUsernameQueryVariables>;
export const SearchUsersDocument = gql`
    query SearchUsers($searchTerm: String!) {
  searchUsers(searchTerm: $searchTerm) {
    users {
      id
      firstName
      lastName
      username
      imageUrl
    }
    _count
  }
}
    `;

/**
 * __useSearchUsersQuery__
 *
 * To run a query within a React component, call `useSearchUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchUsersQuery({
 *   variables: {
 *      searchTerm: // value for 'searchTerm'
 *   },
 * });
 */
export function useSearchUsersQuery(baseOptions: Apollo.QueryHookOptions<SearchUsersQuery, SearchUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchUsersQuery, SearchUsersQueryVariables>(SearchUsersDocument, options);
      }
export function useSearchUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchUsersQuery, SearchUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchUsersQuery, SearchUsersQueryVariables>(SearchUsersDocument, options);
        }
export type SearchUsersQueryHookResult = ReturnType<typeof useSearchUsersQuery>;
export type SearchUsersLazyQueryHookResult = ReturnType<typeof useSearchUsersLazyQuery>;
export type SearchUsersQueryResult = Apollo.QueryResult<SearchUsersQuery, SearchUsersQueryVariables>;
export const GetFollowingDocument = gql`
    query GetFollowing($username: String) {
  user(username: $username) {
    following {
      id
      firstName
      lastName
      username
      imageUrl
    }
  }
}
    `;

/**
 * __useGetFollowingQuery__
 *
 * To run a query within a React component, call `useGetFollowingQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFollowingQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFollowingQuery({
 *   variables: {
 *      username: // value for 'username'
 *   },
 * });
 */
export function useGetFollowingQuery(baseOptions?: Apollo.QueryHookOptions<GetFollowingQuery, GetFollowingQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetFollowingQuery, GetFollowingQueryVariables>(GetFollowingDocument, options);
      }
export function useGetFollowingLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetFollowingQuery, GetFollowingQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetFollowingQuery, GetFollowingQueryVariables>(GetFollowingDocument, options);
        }
export type GetFollowingQueryHookResult = ReturnType<typeof useGetFollowingQuery>;
export type GetFollowingLazyQueryHookResult = ReturnType<typeof useGetFollowingLazyQuery>;
export type GetFollowingQueryResult = Apollo.QueryResult<GetFollowingQuery, GetFollowingQueryVariables>;
export const GetFollowersDocument = gql`
    query GetFollowers($username: String) {
  user(username: $username) {
    followers {
      id
      firstName
      lastName
      username
      imageUrl
    }
  }
}
    `;

/**
 * __useGetFollowersQuery__
 *
 * To run a query within a React component, call `useGetFollowersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFollowersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFollowersQuery({
 *   variables: {
 *      username: // value for 'username'
 *   },
 * });
 */
export function useGetFollowersQuery(baseOptions?: Apollo.QueryHookOptions<GetFollowersQuery, GetFollowersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetFollowersQuery, GetFollowersQueryVariables>(GetFollowersDocument, options);
      }
export function useGetFollowersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetFollowersQuery, GetFollowersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetFollowersQuery, GetFollowersQueryVariables>(GetFollowersDocument, options);
        }
export type GetFollowersQueryHookResult = ReturnType<typeof useGetFollowersQuery>;
export type GetFollowersLazyQueryHookResult = ReturnType<typeof useGetFollowersLazyQuery>;
export type GetFollowersQueryResult = Apollo.QueryResult<GetFollowersQuery, GetFollowersQueryVariables>;
export const GetAllPostSlugsDocument = gql`
    query GetAllPostSlugs {
  posts {
    posts {
      slug
    }
  }
}
    `;

/**
 * __useGetAllPostSlugsQuery__
 *
 * To run a query within a React component, call `useGetAllPostSlugsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllPostSlugsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllPostSlugsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllPostSlugsQuery(baseOptions?: Apollo.QueryHookOptions<GetAllPostSlugsQuery, GetAllPostSlugsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllPostSlugsQuery, GetAllPostSlugsQueryVariables>(GetAllPostSlugsDocument, options);
      }
export function useGetAllPostSlugsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllPostSlugsQuery, GetAllPostSlugsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllPostSlugsQuery, GetAllPostSlugsQueryVariables>(GetAllPostSlugsDocument, options);
        }
export type GetAllPostSlugsQueryHookResult = ReturnType<typeof useGetAllPostSlugsQuery>;
export type GetAllPostSlugsLazyQueryHookResult = ReturnType<typeof useGetAllPostSlugsLazyQuery>;
export type GetAllPostSlugsQueryResult = Apollo.QueryResult<GetAllPostSlugsQuery, GetAllPostSlugsQueryVariables>;
export const GetPostDocument = gql`
    query GetPost($slug: String!) {
  post(slug: $slug) {
    ...CorePostFields
    content
  }
}
    ${CorePostFieldsFragmentDoc}`;

/**
 * __useGetPostQuery__
 *
 * To run a query within a React component, call `useGetPostQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPostQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPostQuery({
 *   variables: {
 *      slug: // value for 'slug'
 *   },
 * });
 */
export function useGetPostQuery(baseOptions: Apollo.QueryHookOptions<GetPostQuery, GetPostQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPostQuery, GetPostQueryVariables>(GetPostDocument, options);
      }
export function useGetPostLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPostQuery, GetPostQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPostQuery, GetPostQueryVariables>(GetPostDocument, options);
        }
export type GetPostQueryHookResult = ReturnType<typeof useGetPostQuery>;
export type GetPostLazyQueryHookResult = ReturnType<typeof useGetPostLazyQuery>;
export type GetPostQueryResult = Apollo.QueryResult<GetPostQuery, GetPostQueryVariables>;
export const GetPostsDocument = gql`
    query GetPosts($published: Boolean, $submitted: Boolean, $category: String, $limit: Int, $startAfter: Int, $authorId: Int, $searchTerm: String) {
  posts(
    published: $published
    submitted: $submitted
    category: $category
    limit: $limit
    startAfter: $startAfter
    authorId: $authorId
    searchTerm: $searchTerm
  ) {
    posts {
      ...CorePostFields
    }
    _count
  }
}
    ${CorePostFieldsFragmentDoc}`;

/**
 * __useGetPostsQuery__
 *
 * To run a query within a React component, call `useGetPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPostsQuery({
 *   variables: {
 *      published: // value for 'published'
 *      submitted: // value for 'submitted'
 *      category: // value for 'category'
 *      limit: // value for 'limit'
 *      startAfter: // value for 'startAfter'
 *      authorId: // value for 'authorId'
 *      searchTerm: // value for 'searchTerm'
 *   },
 * });
 */
export function useGetPostsQuery(baseOptions?: Apollo.QueryHookOptions<GetPostsQuery, GetPostsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPostsQuery, GetPostsQueryVariables>(GetPostsDocument, options);
      }
export function useGetPostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPostsQuery, GetPostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPostsQuery, GetPostsQueryVariables>(GetPostsDocument, options);
        }
export type GetPostsQueryHookResult = ReturnType<typeof useGetPostsQuery>;
export type GetPostsLazyQueryHookResult = ReturnType<typeof useGetPostsLazyQuery>;
export type GetPostsQueryResult = Apollo.QueryResult<GetPostsQuery, GetPostsQueryVariables>;
export const GetPostsWithExcerptDocument = gql`
    query GetPostsWithExcerpt($published: Boolean, $category: String, $limit: Int, $startAfter: Int, $authorId: Int) {
  posts(
    published: $published
    category: $category
    limit: $limit
    startAfter: $startAfter
    authorId: $authorId
  ) {
    posts {
      ...CorePostFields
      excerpt
    }
    _count
  }
}
    ${CorePostFieldsFragmentDoc}`;

/**
 * __useGetPostsWithExcerptQuery__
 *
 * To run a query within a React component, call `useGetPostsWithExcerptQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPostsWithExcerptQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPostsWithExcerptQuery({
 *   variables: {
 *      published: // value for 'published'
 *      category: // value for 'category'
 *      limit: // value for 'limit'
 *      startAfter: // value for 'startAfter'
 *      authorId: // value for 'authorId'
 *   },
 * });
 */
export function useGetPostsWithExcerptQuery(baseOptions?: Apollo.QueryHookOptions<GetPostsWithExcerptQuery, GetPostsWithExcerptQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPostsWithExcerptQuery, GetPostsWithExcerptQueryVariables>(GetPostsWithExcerptDocument, options);
      }
export function useGetPostsWithExcerptLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPostsWithExcerptQuery, GetPostsWithExcerptQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPostsWithExcerptQuery, GetPostsWithExcerptQueryVariables>(GetPostsWithExcerptDocument, options);
        }
export type GetPostsWithExcerptQueryHookResult = ReturnType<typeof useGetPostsWithExcerptQuery>;
export type GetPostsWithExcerptLazyQueryHookResult = ReturnType<typeof useGetPostsWithExcerptLazyQuery>;
export type GetPostsWithExcerptQueryResult = Apollo.QueryResult<GetPostsWithExcerptQuery, GetPostsWithExcerptQueryVariables>;
export const GetCommentsForPostDocument = gql`
    query GetCommentsForPost($postId: Int) {
  comments(postId: $postId) {
    ...CoreCommentFields
    childComments {
      ...CoreCommentFields
      childComments {
        ...CoreCommentFields
      }
    }
  }
}
    ${CoreCommentFieldsFragmentDoc}`;

/**
 * __useGetCommentsForPostQuery__
 *
 * To run a query within a React component, call `useGetCommentsForPostQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCommentsForPostQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCommentsForPostQuery({
 *   variables: {
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useGetCommentsForPostQuery(baseOptions?: Apollo.QueryHookOptions<GetCommentsForPostQuery, GetCommentsForPostQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCommentsForPostQuery, GetCommentsForPostQueryVariables>(GetCommentsForPostDocument, options);
      }
export function useGetCommentsForPostLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCommentsForPostQuery, GetCommentsForPostQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCommentsForPostQuery, GetCommentsForPostQueryVariables>(GetCommentsForPostDocument, options);
        }
export type GetCommentsForPostQueryHookResult = ReturnType<typeof useGetCommentsForPostQuery>;
export type GetCommentsForPostLazyQueryHookResult = ReturnType<typeof useGetCommentsForPostLazyQuery>;
export type GetCommentsForPostQueryResult = Apollo.QueryResult<GetCommentsForPostQuery, GetCommentsForPostQueryVariables>;
export const GetUserLikedPostsDocument = gql`
    query GetUserLikedPosts($likedByUserId: Int, $limit: Int, $published: Boolean, $startAfter: Int) {
  posts(
    likedByUserId: $likedByUserId
    limit: $limit
    startAfter: $startAfter
    published: $published
  ) {
    posts {
      ...CorePostFields
    }
    _count
  }
}
    ${CorePostFieldsFragmentDoc}`;

/**
 * __useGetUserLikedPostsQuery__
 *
 * To run a query within a React component, call `useGetUserLikedPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserLikedPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserLikedPostsQuery({
 *   variables: {
 *      likedByUserId: // value for 'likedByUserId'
 *      limit: // value for 'limit'
 *      published: // value for 'published'
 *      startAfter: // value for 'startAfter'
 *   },
 * });
 */
export function useGetUserLikedPostsQuery(baseOptions?: Apollo.QueryHookOptions<GetUserLikedPostsQuery, GetUserLikedPostsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserLikedPostsQuery, GetUserLikedPostsQueryVariables>(GetUserLikedPostsDocument, options);
      }
export function useGetUserLikedPostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserLikedPostsQuery, GetUserLikedPostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserLikedPostsQuery, GetUserLikedPostsQueryVariables>(GetUserLikedPostsDocument, options);
        }
export type GetUserLikedPostsQueryHookResult = ReturnType<typeof useGetUserLikedPostsQuery>;
export type GetUserLikedPostsLazyQueryHookResult = ReturnType<typeof useGetUserLikedPostsLazyQuery>;
export type GetUserLikedPostsQueryResult = Apollo.QueryResult<GetUserLikedPostsQuery, GetUserLikedPostsQueryVariables>;
export const GetCategoriesDocument = gql`
    query GetCategories {
  categories {
    name
  }
}
    `;

/**
 * __useGetCategoriesQuery__
 *
 * To run a query within a React component, call `useGetCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCategoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCategoriesQuery(baseOptions?: Apollo.QueryHookOptions<GetCategoriesQuery, GetCategoriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCategoriesQuery, GetCategoriesQueryVariables>(GetCategoriesDocument, options);
      }
export function useGetCategoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCategoriesQuery, GetCategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCategoriesQuery, GetCategoriesQueryVariables>(GetCategoriesDocument, options);
        }
export type GetCategoriesQueryHookResult = ReturnType<typeof useGetCategoriesQuery>;
export type GetCategoriesLazyQueryHookResult = ReturnType<typeof useGetCategoriesLazyQuery>;
export type GetCategoriesQueryResult = Apollo.QueryResult<GetCategoriesQuery, GetCategoriesQueryVariables>;
export const PostLikedByDocument = gql`
    query PostLikedBy($id: Int) {
  postLikedBy(id: $id) {
    id
    firstName
    lastName
    username
  }
}
    `;

/**
 * __usePostLikedByQuery__
 *
 * To run a query within a React component, call `usePostLikedByQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostLikedByQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostLikedByQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function usePostLikedByQuery(baseOptions?: Apollo.QueryHookOptions<PostLikedByQuery, PostLikedByQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PostLikedByQuery, PostLikedByQueryVariables>(PostLikedByDocument, options);
      }
export function usePostLikedByLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PostLikedByQuery, PostLikedByQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PostLikedByQuery, PostLikedByQueryVariables>(PostLikedByDocument, options);
        }
export type PostLikedByQueryHookResult = ReturnType<typeof usePostLikedByQuery>;
export type PostLikedByLazyQueryHookResult = ReturnType<typeof usePostLikedByLazyQuery>;
export type PostLikedByQueryResult = Apollo.QueryResult<PostLikedByQuery, PostLikedByQueryVariables>;
export const CommentLikedByDocument = gql`
    query CommentLikedBy($id: Int!) {
  commentLikedBy(id: $id) {
    id
    username
    imageUrl
    firstName
    lastName
  }
}
    `;

/**
 * __useCommentLikedByQuery__
 *
 * To run a query within a React component, call `useCommentLikedByQuery` and pass it any options that fit your needs.
 * When your component renders, `useCommentLikedByQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCommentLikedByQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useCommentLikedByQuery(baseOptions: Apollo.QueryHookOptions<CommentLikedByQuery, CommentLikedByQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CommentLikedByQuery, CommentLikedByQueryVariables>(CommentLikedByDocument, options);
      }
export function useCommentLikedByLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CommentLikedByQuery, CommentLikedByQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CommentLikedByQuery, CommentLikedByQueryVariables>(CommentLikedByDocument, options);
        }
export type CommentLikedByQueryHookResult = ReturnType<typeof useCommentLikedByQuery>;
export type CommentLikedByLazyQueryHookResult = ReturnType<typeof useCommentLikedByLazyQuery>;
export type CommentLikedByQueryResult = Apollo.QueryResult<CommentLikedByQuery, CommentLikedByQueryVariables>;
export const CreateDraftDocument = gql`
    mutation CreateDraft($slug: String!, $title: String!, $content: String!, $tags: [String], $categories: [String]!, $featuredImage: String, $submitted: Boolean) {
  createDraft(
    slug: $slug
    title: $title
    content: $content
    tags: $tags
    categories: $categories
    featuredImage: $featuredImage
    submitted: $submitted
  ) {
    id
    slug
  }
}
    `;
export type CreateDraftMutationFn = Apollo.MutationFunction<CreateDraftMutation, CreateDraftMutationVariables>;

/**
 * __useCreateDraftMutation__
 *
 * To run a mutation, you first call `useCreateDraftMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateDraftMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createDraftMutation, { data, loading, error }] = useCreateDraftMutation({
 *   variables: {
 *      slug: // value for 'slug'
 *      title: // value for 'title'
 *      content: // value for 'content'
 *      tags: // value for 'tags'
 *      categories: // value for 'categories'
 *      featuredImage: // value for 'featuredImage'
 *      submitted: // value for 'submitted'
 *   },
 * });
 */
export function useCreateDraftMutation(baseOptions?: Apollo.MutationHookOptions<CreateDraftMutation, CreateDraftMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateDraftMutation, CreateDraftMutationVariables>(CreateDraftDocument, options);
      }
export type CreateDraftMutationHookResult = ReturnType<typeof useCreateDraftMutation>;
export type CreateDraftMutationResult = Apollo.MutationResult<CreateDraftMutation>;
export type CreateDraftMutationOptions = Apollo.BaseMutationOptions<CreateDraftMutation, CreateDraftMutationVariables>;
export const CreateCommentDocument = gql`
    mutation CreateComment($content: String!, $postId: Int!, $parentCommentId: Int) {
  createComment(
    content: $content
    postId: $postId
    parentCommentId: $parentCommentId
  ) {
    ...CoreCommentFields
    parentComment {
      id
      parentComment {
        id
      }
    }
  }
}
    ${CoreCommentFieldsFragmentDoc}`;
export type CreateCommentMutationFn = Apollo.MutationFunction<CreateCommentMutation, CreateCommentMutationVariables>;

/**
 * __useCreateCommentMutation__
 *
 * To run a mutation, you first call `useCreateCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCommentMutation, { data, loading, error }] = useCreateCommentMutation({
 *   variables: {
 *      content: // value for 'content'
 *      postId: // value for 'postId'
 *      parentCommentId: // value for 'parentCommentId'
 *   },
 * });
 */
export function useCreateCommentMutation(baseOptions?: Apollo.MutationHookOptions<CreateCommentMutation, CreateCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCommentMutation, CreateCommentMutationVariables>(CreateCommentDocument, options);
      }
export type CreateCommentMutationHookResult = ReturnType<typeof useCreateCommentMutation>;
export type CreateCommentMutationResult = Apollo.MutationResult<CreateCommentMutation>;
export type CreateCommentMutationOptions = Apollo.BaseMutationOptions<CreateCommentMutation, CreateCommentMutationVariables>;
export const UpdatePostDocument = gql`
    mutation UpdatePost($id: Int!, $slug: String, $title: String, $featuredImage: String, $content: String, $categories: [String], $tags: [String]) {
  updatePost(
    id: $id
    slug: $slug
    title: $title
    featuredImage: $featuredImage
    content: $content
    categories: $categories
    tags: $tags
  ) {
    id
    slug
    title
    featuredImage
    categories {
      name
    }
    tags
  }
}
    `;
export type UpdatePostMutationFn = Apollo.MutationFunction<UpdatePostMutation, UpdatePostMutationVariables>;

/**
 * __useUpdatePostMutation__
 *
 * To run a mutation, you first call `useUpdatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePostMutation, { data, loading, error }] = useUpdatePostMutation({
 *   variables: {
 *      id: // value for 'id'
 *      slug: // value for 'slug'
 *      title: // value for 'title'
 *      featuredImage: // value for 'featuredImage'
 *      content: // value for 'content'
 *      categories: // value for 'categories'
 *      tags: // value for 'tags'
 *   },
 * });
 */
export function useUpdatePostMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePostMutation, UpdatePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePostMutation, UpdatePostMutationVariables>(UpdatePostDocument, options);
      }
export type UpdatePostMutationHookResult = ReturnType<typeof useUpdatePostMutation>;
export type UpdatePostMutationResult = Apollo.MutationResult<UpdatePostMutation>;
export type UpdatePostMutationOptions = Apollo.BaseMutationOptions<UpdatePostMutation, UpdatePostMutationVariables>;
export const UpdateUserImageDocument = gql`
    mutation UpdateUserImage($imageUrl: String) {
  updateUser(imageUrl: $imageUrl) {
    imageUrl
  }
}
    `;
export type UpdateUserImageMutationFn = Apollo.MutationFunction<UpdateUserImageMutation, UpdateUserImageMutationVariables>;

/**
 * __useUpdateUserImageMutation__
 *
 * To run a mutation, you first call `useUpdateUserImageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserImageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserImageMutation, { data, loading, error }] = useUpdateUserImageMutation({
 *   variables: {
 *      imageUrl: // value for 'imageUrl'
 *   },
 * });
 */
export function useUpdateUserImageMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserImageMutation, UpdateUserImageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserImageMutation, UpdateUserImageMutationVariables>(UpdateUserImageDocument, options);
      }
export type UpdateUserImageMutationHookResult = ReturnType<typeof useUpdateUserImageMutation>;
export type UpdateUserImageMutationResult = Apollo.MutationResult<UpdateUserImageMutation>;
export type UpdateUserImageMutationOptions = Apollo.BaseMutationOptions<UpdateUserImageMutation, UpdateUserImageMutationVariables>;
export const UpdateUserDetailsDocument = gql`
    mutation UpdateUserDetails($firstName: String, $lastName: String, $username: String) {
  updateUser(firstName: $firstName, lastName: $lastName, username: $username) {
    firstName
    lastName
    username
  }
}
    `;
export type UpdateUserDetailsMutationFn = Apollo.MutationFunction<UpdateUserDetailsMutation, UpdateUserDetailsMutationVariables>;

/**
 * __useUpdateUserDetailsMutation__
 *
 * To run a mutation, you first call `useUpdateUserDetailsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserDetailsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserDetailsMutation, { data, loading, error }] = useUpdateUserDetailsMutation({
 *   variables: {
 *      firstName: // value for 'firstName'
 *      lastName: // value for 'lastName'
 *      username: // value for 'username'
 *   },
 * });
 */
export function useUpdateUserDetailsMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserDetailsMutation, UpdateUserDetailsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserDetailsMutation, UpdateUserDetailsMutationVariables>(UpdateUserDetailsDocument, options);
      }
export type UpdateUserDetailsMutationHookResult = ReturnType<typeof useUpdateUserDetailsMutation>;
export type UpdateUserDetailsMutationResult = Apollo.MutationResult<UpdateUserDetailsMutation>;
export type UpdateUserDetailsMutationOptions = Apollo.BaseMutationOptions<UpdateUserDetailsMutation, UpdateUserDetailsMutationVariables>;
export const SignCloudinaryUploadDocument = gql`
    mutation SignCloudinaryUpload {
  signUpload {
    timestamp
    signature
  }
}
    `;
export type SignCloudinaryUploadMutationFn = Apollo.MutationFunction<SignCloudinaryUploadMutation, SignCloudinaryUploadMutationVariables>;

/**
 * __useSignCloudinaryUploadMutation__
 *
 * To run a mutation, you first call `useSignCloudinaryUploadMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignCloudinaryUploadMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signCloudinaryUploadMutation, { data, loading, error }] = useSignCloudinaryUploadMutation({
 *   variables: {
 *   },
 * });
 */
export function useSignCloudinaryUploadMutation(baseOptions?: Apollo.MutationHookOptions<SignCloudinaryUploadMutation, SignCloudinaryUploadMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignCloudinaryUploadMutation, SignCloudinaryUploadMutationVariables>(SignCloudinaryUploadDocument, options);
      }
export type SignCloudinaryUploadMutationHookResult = ReturnType<typeof useSignCloudinaryUploadMutation>;
export type SignCloudinaryUploadMutationResult = Apollo.MutationResult<SignCloudinaryUploadMutation>;
export type SignCloudinaryUploadMutationOptions = Apollo.BaseMutationOptions<SignCloudinaryUploadMutation, SignCloudinaryUploadMutationVariables>;
export const CreateUserDocument = gql`
    mutation CreateUser($email: String) {
  createUser(email: $email) {
    id
    email
    role
    firstName
    lastName
    imageUrl
  }
}
    `;
export type CreateUserMutationFn = Apollo.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useCreateUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, options);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;
export const FollowUserDocument = gql`
    mutation FollowUser($userId: Int!) {
  followUser(userId: $userId) {
    followers {
      id
    }
  }
}
    `;
export type FollowUserMutationFn = Apollo.MutationFunction<FollowUserMutation, FollowUserMutationVariables>;

/**
 * __useFollowUserMutation__
 *
 * To run a mutation, you first call `useFollowUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useFollowUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [followUserMutation, { data, loading, error }] = useFollowUserMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useFollowUserMutation(baseOptions?: Apollo.MutationHookOptions<FollowUserMutation, FollowUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<FollowUserMutation, FollowUserMutationVariables>(FollowUserDocument, options);
      }
export type FollowUserMutationHookResult = ReturnType<typeof useFollowUserMutation>;
export type FollowUserMutationResult = Apollo.MutationResult<FollowUserMutation>;
export type FollowUserMutationOptions = Apollo.BaseMutationOptions<FollowUserMutation, FollowUserMutationVariables>;
export const UnfollowUserDocument = gql`
    mutation UnfollowUser($userId: Int!) {
  unfollowUser(userId: $userId) {
    followers {
      id
    }
  }
}
    `;
export type UnfollowUserMutationFn = Apollo.MutationFunction<UnfollowUserMutation, UnfollowUserMutationVariables>;

/**
 * __useUnfollowUserMutation__
 *
 * To run a mutation, you first call `useUnfollowUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnfollowUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unfollowUserMutation, { data, loading, error }] = useUnfollowUserMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useUnfollowUserMutation(baseOptions?: Apollo.MutationHookOptions<UnfollowUserMutation, UnfollowUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UnfollowUserMutation, UnfollowUserMutationVariables>(UnfollowUserDocument, options);
      }
export type UnfollowUserMutationHookResult = ReturnType<typeof useUnfollowUserMutation>;
export type UnfollowUserMutationResult = Apollo.MutationResult<UnfollowUserMutation>;
export type UnfollowUserMutationOptions = Apollo.BaseMutationOptions<UnfollowUserMutation, UnfollowUserMutationVariables>;
export const ChangePublishedDocument = gql`
    mutation ChangePublished($id: Int!, $published: Boolean!) {
  changePublished(id: $id, published: $published) {
    id
    slug
    published
  }
}
    `;
export type ChangePublishedMutationFn = Apollo.MutationFunction<ChangePublishedMutation, ChangePublishedMutationVariables>;

/**
 * __useChangePublishedMutation__
 *
 * To run a mutation, you first call `useChangePublishedMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangePublishedMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changePublishedMutation, { data, loading, error }] = useChangePublishedMutation({
 *   variables: {
 *      id: // value for 'id'
 *      published: // value for 'published'
 *   },
 * });
 */
export function useChangePublishedMutation(baseOptions?: Apollo.MutationHookOptions<ChangePublishedMutation, ChangePublishedMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangePublishedMutation, ChangePublishedMutationVariables>(ChangePublishedDocument, options);
      }
export type ChangePublishedMutationHookResult = ReturnType<typeof useChangePublishedMutation>;
export type ChangePublishedMutationResult = Apollo.MutationResult<ChangePublishedMutation>;
export type ChangePublishedMutationOptions = Apollo.BaseMutationOptions<ChangePublishedMutation, ChangePublishedMutationVariables>;
export const ChangeSubmittedDocument = gql`
    mutation ChangeSubmitted($id: Int!, $submitted: Boolean!) {
  changeSubmitted(id: $id, submitted: $submitted) {
    id
    slug
    submitted
  }
}
    `;
export type ChangeSubmittedMutationFn = Apollo.MutationFunction<ChangeSubmittedMutation, ChangeSubmittedMutationVariables>;

/**
 * __useChangeSubmittedMutation__
 *
 * To run a mutation, you first call `useChangeSubmittedMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeSubmittedMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeSubmittedMutation, { data, loading, error }] = useChangeSubmittedMutation({
 *   variables: {
 *      id: // value for 'id'
 *      submitted: // value for 'submitted'
 *   },
 * });
 */
export function useChangeSubmittedMutation(baseOptions?: Apollo.MutationHookOptions<ChangeSubmittedMutation, ChangeSubmittedMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangeSubmittedMutation, ChangeSubmittedMutationVariables>(ChangeSubmittedDocument, options);
      }
export type ChangeSubmittedMutationHookResult = ReturnType<typeof useChangeSubmittedMutation>;
export type ChangeSubmittedMutationResult = Apollo.MutationResult<ChangeSubmittedMutation>;
export type ChangeSubmittedMutationOptions = Apollo.BaseMutationOptions<ChangeSubmittedMutation, ChangeSubmittedMutationVariables>;
export const LikePostDocument = gql`
    mutation LikePost($id: Int!) {
  likePost(id: $id) {
    id
    likedBy {
      id
    }
  }
}
    `;
export type LikePostMutationFn = Apollo.MutationFunction<LikePostMutation, LikePostMutationVariables>;

/**
 * __useLikePostMutation__
 *
 * To run a mutation, you first call `useLikePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLikePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [likePostMutation, { data, loading, error }] = useLikePostMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useLikePostMutation(baseOptions?: Apollo.MutationHookOptions<LikePostMutation, LikePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LikePostMutation, LikePostMutationVariables>(LikePostDocument, options);
      }
export type LikePostMutationHookResult = ReturnType<typeof useLikePostMutation>;
export type LikePostMutationResult = Apollo.MutationResult<LikePostMutation>;
export type LikePostMutationOptions = Apollo.BaseMutationOptions<LikePostMutation, LikePostMutationVariables>;
export const UnlikePostDocument = gql`
    mutation UnlikePost($id: Int!) {
  unlikePost(id: $id) {
    id
    likedBy {
      id
    }
  }
}
    `;
export type UnlikePostMutationFn = Apollo.MutationFunction<UnlikePostMutation, UnlikePostMutationVariables>;

/**
 * __useUnlikePostMutation__
 *
 * To run a mutation, you first call `useUnlikePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnlikePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unlikePostMutation, { data, loading, error }] = useUnlikePostMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUnlikePostMutation(baseOptions?: Apollo.MutationHookOptions<UnlikePostMutation, UnlikePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UnlikePostMutation, UnlikePostMutationVariables>(UnlikePostDocument, options);
      }
export type UnlikePostMutationHookResult = ReturnType<typeof useUnlikePostMutation>;
export type UnlikePostMutationResult = Apollo.MutationResult<UnlikePostMutation>;
export type UnlikePostMutationOptions = Apollo.BaseMutationOptions<UnlikePostMutation, UnlikePostMutationVariables>;
export const LikeCommentDocument = gql`
    mutation LikeComment($likeCommentId: Int!) {
  likeComment(id: $likeCommentId) {
    id
    likedBy {
      id
      username
      firstName
      lastName
      imageUrl
    }
  }
}
    `;
export type LikeCommentMutationFn = Apollo.MutationFunction<LikeCommentMutation, LikeCommentMutationVariables>;

/**
 * __useLikeCommentMutation__
 *
 * To run a mutation, you first call `useLikeCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLikeCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [likeCommentMutation, { data, loading, error }] = useLikeCommentMutation({
 *   variables: {
 *      likeCommentId: // value for 'likeCommentId'
 *   },
 * });
 */
export function useLikeCommentMutation(baseOptions?: Apollo.MutationHookOptions<LikeCommentMutation, LikeCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LikeCommentMutation, LikeCommentMutationVariables>(LikeCommentDocument, options);
      }
export type LikeCommentMutationHookResult = ReturnType<typeof useLikeCommentMutation>;
export type LikeCommentMutationResult = Apollo.MutationResult<LikeCommentMutation>;
export type LikeCommentMutationOptions = Apollo.BaseMutationOptions<LikeCommentMutation, LikeCommentMutationVariables>;
export const UnlikeCommentDocument = gql`
    mutation UnlikeComment($unlikeCommentId: Int!) {
  unlikeComment(id: $unlikeCommentId) {
    id
    likedBy {
      id
      username
      firstName
      lastName
      imageUrl
    }
  }
}
    `;
export type UnlikeCommentMutationFn = Apollo.MutationFunction<UnlikeCommentMutation, UnlikeCommentMutationVariables>;

/**
 * __useUnlikeCommentMutation__
 *
 * To run a mutation, you first call `useUnlikeCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnlikeCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unlikeCommentMutation, { data, loading, error }] = useUnlikeCommentMutation({
 *   variables: {
 *      unlikeCommentId: // value for 'unlikeCommentId'
 *   },
 * });
 */
export function useUnlikeCommentMutation(baseOptions?: Apollo.MutationHookOptions<UnlikeCommentMutation, UnlikeCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UnlikeCommentMutation, UnlikeCommentMutationVariables>(UnlikeCommentDocument, options);
      }
export type UnlikeCommentMutationHookResult = ReturnType<typeof useUnlikeCommentMutation>;
export type UnlikeCommentMutationResult = Apollo.MutationResult<UnlikeCommentMutation>;
export type UnlikeCommentMutationOptions = Apollo.BaseMutationOptions<UnlikeCommentMutation, UnlikeCommentMutationVariables>;
export const DeleteCommentDocument = gql`
    mutation DeleteComment($deleteCommentId: Int!) {
  deleteComment(id: $deleteCommentId) {
    id
  }
}
    `;
export type DeleteCommentMutationFn = Apollo.MutationFunction<DeleteCommentMutation, DeleteCommentMutationVariables>;

/**
 * __useDeleteCommentMutation__
 *
 * To run a mutation, you first call `useDeleteCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCommentMutation, { data, loading, error }] = useDeleteCommentMutation({
 *   variables: {
 *      deleteCommentId: // value for 'deleteCommentId'
 *   },
 * });
 */
export function useDeleteCommentMutation(baseOptions?: Apollo.MutationHookOptions<DeleteCommentMutation, DeleteCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteCommentMutation, DeleteCommentMutationVariables>(DeleteCommentDocument, options);
      }
export type DeleteCommentMutationHookResult = ReturnType<typeof useDeleteCommentMutation>;
export type DeleteCommentMutationResult = Apollo.MutationResult<DeleteCommentMutation>;
export type DeleteCommentMutationOptions = Apollo.BaseMutationOptions<DeleteCommentMutation, DeleteCommentMutationVariables>;