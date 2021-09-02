import { GetStaticProps, GetStaticPaths } from 'next';
import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import Container from '../../components/container';
import PostBody from '../../components/post-body';
import PostHeader from '../../components/post-header';
import SectionSeparator from '../../components/section-separator';
import PostTitle from '../../components/post-title';
import Head from 'next/head';
import Tags from '../../components/tags';
import { GET_POST, GET_ALL_POST_SLUGS } from '../../lib/apolloQueries';
import { addApolloState, initializeApollo } from '../../lib/apolloClient';

export default function Post({ post }) {
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
              <title>{post.title || 'HERD Post'}</title>
              <meta property="og:image" content={post.featuredImage} />
            </Head>
            <PostHeader
              title={post.title}
              coverImage={post.featuredImage}
              date={post.date}
              author={post.author}
              categories={post.categories}
            />
            {post.tags.length > 0 && <Tags tags={post.tags} />}
            <Container>
              <PostBody content={post.content} />
              <footer></footer>
            </Container>
          </article>

          <SectionSeparator />
        </>
      )}
    </>
  );
}

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

  const post = await response.data.post;

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
    paths: response.data.posts.map((post) => `/posts/${post.slug}`) || [],
    fallback: true,
  };
};
