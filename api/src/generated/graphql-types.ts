import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
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



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Category: ResolverTypeWrapper<Category>;
  Comment: ResolverTypeWrapper<Comment>;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>;
  File: ResolverTypeWrapper<File>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  LikeMutationResult: ResolverTypeWrapper<LikeMutationResult>;
  Mutation: ResolverTypeWrapper<{}>;
  Post: ResolverTypeWrapper<Post>;
  PostQueryResult: ResolverTypeWrapper<PostQueryResult>;
  PostRelationCounts: ResolverTypeWrapper<PostRelationCounts>;
  Query: ResolverTypeWrapper<{}>;
  Role: Role;
  SignedUploadResponse: ResolverTypeWrapper<SignedUploadResponse>;
  String: ResolverTypeWrapper<Scalars['String']>;
  User: ResolverTypeWrapper<User>;
  UserRelationCounts: ResolverTypeWrapper<UserRelationCounts>;
  UserSearchResult: ResolverTypeWrapper<UserSearchResult>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean'];
  Category: Category;
  Comment: Comment;
  DateTime: Scalars['DateTime'];
  File: File;
  Int: Scalars['Int'];
  LikeMutationResult: LikeMutationResult;
  Mutation: {};
  Post: Post;
  PostQueryResult: PostQueryResult;
  PostRelationCounts: PostRelationCounts;
  Query: {};
  SignedUploadResponse: SignedUploadResponse;
  String: Scalars['String'];
  User: User;
  UserRelationCounts: UserRelationCounts;
  UserSearchResult: UserSearchResult;
};

export type CategoryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Category'] = ResolversParentTypes['Category']> = {
  id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  posts?: Resolver<Maybe<Array<Maybe<ResolversTypes['Post']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CommentResolvers<ContextType = any, ParentType extends ResolversParentTypes['Comment'] = ResolversParentTypes['Comment']> = {
  author?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  authorId?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  childComments?: Resolver<Maybe<Array<Maybe<ResolversTypes['Comment']>>>, ParentType, ContextType>;
  content?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  likedBy?: Resolver<Maybe<Array<Maybe<ResolversTypes['User']>>>, ParentType, ContextType>;
  parentComment?: Resolver<Maybe<ResolversTypes['Comment']>, ParentType, ContextType>;
  parentCommentId?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  post?: Resolver<Maybe<ResolversTypes['Post']>, ParentType, ContextType>;
  postId?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type FileResolvers<ContextType = any, ParentType extends ResolversParentTypes['File'] = ResolversParentTypes['File']> = {
  encoding?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  filename?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  mimetype?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LikeMutationResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['LikeMutationResult'] = ResolversParentTypes['LikeMutationResult']> = {
  id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  likedBy?: Resolver<Maybe<Array<Maybe<ResolversTypes['User']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  changePublished?: Resolver<Maybe<ResolversTypes['Post']>, ParentType, ContextType, RequireFields<MutationChangePublishedArgs, 'id' | 'published'>>;
  changeSubmitted?: Resolver<Maybe<ResolversTypes['Post']>, ParentType, ContextType, RequireFields<MutationChangeSubmittedArgs, 'id' | 'submitted'>>;
  createComment?: Resolver<Maybe<ResolversTypes['Comment']>, ParentType, ContextType, RequireFields<MutationCreateCommentArgs, 'content' | 'postId'>>;
  createDraft?: Resolver<Maybe<ResolversTypes['Post']>, ParentType, ContextType, RequireFields<MutationCreateDraftArgs, 'categories' | 'content' | 'slug' | 'title'>>;
  createUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, Partial<MutationCreateUserArgs>>;
  deleteComment?: Resolver<Maybe<ResolversTypes['Comment']>, ParentType, ContextType, RequireFields<MutationDeleteCommentArgs, 'id'>>;
  followUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationFollowUserArgs, 'userId'>>;
  likeComment?: Resolver<Maybe<ResolversTypes['LikeMutationResult']>, ParentType, ContextType, RequireFields<MutationLikeCommentArgs, 'id'>>;
  likePost?: Resolver<Maybe<ResolversTypes['LikeMutationResult']>, ParentType, ContextType, RequireFields<MutationLikePostArgs, 'id'>>;
  signUpload?: Resolver<Maybe<ResolversTypes['SignedUploadResponse']>, ParentType, ContextType>;
  unfollowUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationUnfollowUserArgs, 'userId'>>;
  unlikeComment?: Resolver<Maybe<ResolversTypes['LikeMutationResult']>, ParentType, ContextType, RequireFields<MutationUnlikeCommentArgs, 'id'>>;
  unlikePost?: Resolver<Maybe<ResolversTypes['LikeMutationResult']>, ParentType, ContextType, RequireFields<MutationUnlikePostArgs, 'id'>>;
  updatePost?: Resolver<Maybe<ResolversTypes['Post']>, ParentType, ContextType, RequireFields<MutationUpdatePostArgs, 'id'>>;
  updateUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, Partial<MutationUpdateUserArgs>>;
};

export type PostResolvers<ContextType = any, ParentType extends ResolversParentTypes['Post'] = ResolversParentTypes['Post']> = {
  _count?: Resolver<Maybe<ResolversTypes['PostRelationCounts']>, ParentType, ContextType>;
  author?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  authorEmail?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  categories?: Resolver<Maybe<Array<Maybe<ResolversTypes['Category']>>>, ParentType, ContextType>;
  comments?: Resolver<Maybe<Array<Maybe<ResolversTypes['Comment']>>>, ParentType, ContextType>;
  content?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  excerpt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  featuredImage?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  likedBy?: Resolver<Maybe<Array<Maybe<ResolversTypes['User']>>>, ParentType, ContextType>;
  published?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  slug?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  submitted?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  tags?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  wordCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PostQueryResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['PostQueryResult'] = ResolversParentTypes['PostQueryResult']> = {
  _count?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  posts?: Resolver<Maybe<Array<Maybe<ResolversTypes['Post']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PostRelationCountsResolvers<ContextType = any, ParentType extends ResolversParentTypes['PostRelationCounts'] = ResolversParentTypes['PostRelationCounts']> = {
  comments?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  likedBy?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  categories?: Resolver<Maybe<Array<Maybe<ResolversTypes['Category']>>>, ParentType, ContextType>;
  commentLikedBy?: Resolver<Maybe<Array<Maybe<ResolversTypes['User']>>>, ParentType, ContextType, RequireFields<QueryCommentLikedByArgs, 'id'>>;
  commentReplies?: Resolver<Maybe<Array<Maybe<ResolversTypes['Comment']>>>, ParentType, ContextType, RequireFields<QueryCommentRepliesArgs, 'id'>>;
  comments?: Resolver<Maybe<Array<Maybe<ResolversTypes['Comment']>>>, ParentType, ContextType, Partial<QueryCommentsArgs>>;
  post?: Resolver<Maybe<ResolversTypes['Post']>, ParentType, ContextType, RequireFields<QueryPostArgs, 'slug'>>;
  postLikedBy?: Resolver<Maybe<Array<Maybe<ResolversTypes['User']>>>, ParentType, ContextType, Partial<QueryPostLikedByArgs>>;
  posts?: Resolver<Maybe<ResolversTypes['PostQueryResult']>, ParentType, ContextType, Partial<QueryPostsArgs>>;
  searchUsers?: Resolver<Maybe<ResolversTypes['UserSearchResult']>, ParentType, ContextType, RequireFields<QuerySearchUsersArgs, 'searchTerm'>>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, Partial<QueryUserArgs>>;
  userByEmail?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryUserByEmailArgs, 'email'>>;
};

export type SignedUploadResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['SignedUploadResponse'] = ResolversParentTypes['SignedUploadResponse']> = {
  signature?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  timestamp?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  _count?: Resolver<Maybe<ResolversTypes['UserRelationCounts']>, ParentType, ContextType>;
  comments?: Resolver<Maybe<Array<Maybe<ResolversTypes['Comment']>>>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  firstName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  followers?: Resolver<Maybe<Array<Maybe<ResolversTypes['User']>>>, ParentType, ContextType>;
  following?: Resolver<Maybe<Array<Maybe<ResolversTypes['User']>>>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  imageUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  lastName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  likedComments?: Resolver<Maybe<Array<Maybe<ResolversTypes['Comment']>>>, ParentType, ContextType>;
  likedPosts?: Resolver<Maybe<Array<Maybe<ResolversTypes['Post']>>>, ParentType, ContextType>;
  posts?: Resolver<Maybe<Array<Maybe<ResolversTypes['Post']>>>, ParentType, ContextType>;
  role?: Resolver<Maybe<ResolversTypes['Role']>, ParentType, ContextType>;
  username?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserRelationCountsResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserRelationCounts'] = ResolversParentTypes['UserRelationCounts']> = {
  comments?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  followers?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  following?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  likedPosts?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  posts?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserSearchResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserSearchResult'] = ResolversParentTypes['UserSearchResult']> = {
  _count?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  users?: Resolver<Maybe<Array<Maybe<ResolversTypes['User']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Category?: CategoryResolvers<ContextType>;
  Comment?: CommentResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  File?: FileResolvers<ContextType>;
  LikeMutationResult?: LikeMutationResultResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Post?: PostResolvers<ContextType>;
  PostQueryResult?: PostQueryResultResolvers<ContextType>;
  PostRelationCounts?: PostRelationCountsResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  SignedUploadResponse?: SignedUploadResponseResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  UserRelationCounts?: UserRelationCountsResolvers<ContextType>;
  UserSearchResult?: UserSearchResultResolvers<ContextType>;
};

