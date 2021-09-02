import { useEffect, useState } from 'react';
import PostPreview from './post-preview';
import { useQuery, useLazyQuery } from '@apollo/client';
import Loading from './loading';
import { Waypoint } from 'react-waypoint';
import { GET_POSTS, GET_USER } from '../lib/apolloQueries';
import { Post } from '../lib/types';

export default function PostList({
  category,
  limit,
}: {
  category: string;
  limit: number;
}) {
  const [getPosts, { loading, error, data, fetchMore }] = useLazyQuery(
    GET_POSTS,
    {
      variables: {
        limit: limit,
        category: category,
        // startAfter: 10,
      },
      fetchPolicy: 'network-only',
      notifyOnNetworkStatusChange: true,
    }
  );

  const [page, setPage] = useState(0);

  let posts: Post[];

  if (data) posts = data.posts;

  useEffect(() => {
    getPosts();
    setPage(0);
  }, [category]);

  return !data ? (
    <div className="h-50-screen flex justify-center items-center">
      <Loading />
    </div>
  ) : (
    <section className="overflow-hidden mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-32">
        {error && <h1 className="text-4xl text-center">An Error Occurred</h1>}

        {posts.map((post) => (
          <PostPreview
            key={post.slug}
            title={post.title}
            coverImage={post.featuredImage}
            date={post.date}
            author={post.author}
            slug={post.slug}
            categories={post.categories}
            animateY={'100%'}
          />
        ))}

        <Waypoint
          onEnter={() => {
            fetchMore({
              variables: {
                limit: 5,
                category: category,
                // startAfter: posts[posts.length - 1].date,
              },
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
