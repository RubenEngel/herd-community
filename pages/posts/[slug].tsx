import { GetStaticProps, GetStaticPaths } from "next";
import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Container from "../../components/container";
import PostBody from "../../components/post-content/post-body";
import PostHeader from "../../components/post-content/post-header";
// import SectionSeparator from "../../components/section-separator";
import PostTitle from "../../components/post-content/post-title";
import Head from "next/head";
import Tags from "../../components/post-content/tags";
import { GET_POST, GET_ALL_POST_SLUGS } from "../../lib/apolloQueries";
import { addApolloState, initializeApollo } from "../../lib/apolloClient";
import { Post } from "../../lib/types";

interface PostProps {
  post: Post;
}

export default ({ post }: PostProps) => {
  const router = useRouter();

  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <>
      {router.isFallback ? (
        <PostTitle>Loading…</PostTitle>
      ) : (
        <>
          <article>
            <Head>
              <title>{post.title || "HERD Post"}</title>
              <meta property="og:image" content={post.featuredImage} />
            </Head>
            <PostHeader
              title={post.title}
              coverImage={post.featuredImage}
              date={post.createdAt}
              author={post.author}
              categories={post.categories}
            />
            {post.tags.length > 0 && <Tags tags={post.tags} />}
            <Container>
              <PostBody content={post.content} />
            </Container>
          </article>

          {/* <SectionSeparator /> */}
        </>
      )}
    </>
  );
};

// export async function getServerSideProps({ params }) {
//   const apolloClient = initializeApollo();

//   const response = await apolloClient.query({
//     query: GET_POST,
//     variables: { slug: params.slug },
//   });

//   return addApolloState(apolloClient, {
//     props: {
//       post: response.data.post,
//     },
//   });
// }

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const apolloClient = initializeApollo();

  const response = await apolloClient.query({
    query: GET_POST,
    variables: { slug: params.slug },
  });

  const post = await response.data.getPost;

  return addApolloState(apolloClient, {
    props: {
      post: post,
    },
  });
};

export const getStaticPaths: GetStaticPaths = async () => {
  const apolloClient = initializeApollo();

  const response = await apolloClient.query({
    query: GET_ALL_POST_SLUGS,
  });

  return {
    paths: response.data.getPosts.map((post) => `/posts/${post.slug}`) || [],
    fallback: true,
  };
};
