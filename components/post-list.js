import { useEffect } from 'react';
import PostPreview from './post-preview';
import { useQuery, useLazyQuery } from '@apollo/client';
import Loading from './loading';
import { Waypoint } from 'react-waypoint';
import { GET_POSTS } from '../lib/apolloQueries';

export default function PostList({ first, after, category }) {
  if (category === 'All') {
    category = '';
  }

  const fetchPolicy = category === 'All' ? 'cache-first' : 'network-only';

  const [getPosts, { loading, error, data: postData, fetchMore }] =
    useLazyQuery(GET_POSTS, {
      variables: {
        first: first,
        after: after,
        category: category,
      },
      fetchPolicy: fetchPolicy,
      notifyOnNetworkStatusChange: true,
    });

  const posts = postData?.posts.edges;

  useEffect(() => {
    getPosts();
  }, [category]);

  return !postData ? (
    <div className="h-50-screen flex justify-center items-center">
      <Loading />
    </div>
  ) : (
    <section className="overflow-hidden mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-32">
        {error && <h1 className="text-4xl text-center">An Error Occurred</h1>}

        {posts.map(({ node }) => (
          <PostPreview
            key={node.slug}
            title={node.title}
            coverImage={node.featuredImage?.node}
            date={node.date}
            author={node.author?.node}
            slug={node.slug}
            excerpt={node.excerpt}
            categories={node.categories}
            animateY={'100%'}
          />
        ))}

        <Waypoint
          onEnter={() => {
            const endCursor = postData.posts.pageInfo.endCursor;
            fetchMore({
              variables: { after: endCursor },
            });
          }}
        />
      </div>

      {loading && (
        <div className="mb-40">
          <Loading />
        </div>
      )}
    </section>
  );
}
