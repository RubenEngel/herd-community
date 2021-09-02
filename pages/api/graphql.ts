import {
  ApolloServer,
  ApolloError,
  ValidationError,
  gql,
} from 'apollo-server-micro';
import * as admin from 'firebase-admin';
import serviceAccount from '../../service-account.json';
import { Post, User } from '../../lib/types';

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const typeDefs = gql`
  type Post {
    slug: String!
    title: String!
    date: String!
    featuredImage: String!
    author: User!
    categories: [String!]!
    tags: [String]!
    content: String!
    likes: Int!
  }

  type User {
    username: ID
    firstName: String
    lastName: String
    photoURL: String
  }

  type Query {
    user(username: String!): User
    post(slug: String!): Post!
    posts(category: String, limit: Int, startAfter: String): [Post]!
    test: String
  }
`;

// let lastSeenRef: FirebaseFirestore.QueryDocumentSnapshot<FirebaseFirestore.DocumentData> | null =
//   null;

const resolvers = {
  Query: {
    async posts(
      _: null,
      args: { category: string; limit: number; startAfter: string }
    ) {
      try {
        const postsRef = await admin.firestore().collection('posts');
        let postsQuery = postsRef.orderBy('date', 'desc');
        if (args.startAfter) postsQuery.startAfter(args.startAfter);
        if (args.category && args.category !== 'All') {
          postsQuery = postsQuery.where(
            'categories',
            'array-contains',
            args.category
          );
        }
        if (args.limit) postsQuery = postsQuery.limit(args.limit);
        const postsRes = await postsQuery.get();
        const postsArray = postsRes.docs.map((post) => post.data()) as Post[];
        return postsArray || new ValidationError('No posts found');
      } catch (error) {
        throw new ApolloError(error);
      }
    },
    async post(_: null, args: { slug: string }) {
      try {
        const postDoc = await admin
          .firestore()
          .collection('posts')
          .doc(args.slug)
          .get();
        const post = postDoc.data() as Post;
        return post || new ValidationError('Post not found');
      } catch (error) {
        throw new ApolloError(error);
      }
    },
    async user(_: null, args: { username: string }) {
      try {
        const usernameDoc = await admin
          .firestore()
          .doc(`usernames/${args.username}`)
          .get();
        const uid = usernameDoc.data().uid;
        const userDoc = await admin.firestore().doc(`users/${uid}`).get();
        const user = userDoc.data() as User;
        return user || new ValidationError('User ID not found');
      } catch (error) {
        throw new ApolloError(error);
      }
    },
    async test() {
      return 'hello';
    },
  },
};

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});

const handler = apolloServer.createHandler({ path: '/api/graphql' });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
