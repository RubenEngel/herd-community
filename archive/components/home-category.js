import React from 'react';
import SectionHeader from '../../components/section-header';
import { useQuery } from '@apollo/client';
import { GET_POSTS } from '../../lib/apolloQueries';
import SmallPostPreview from '../../components/small-post-preview';
import Loading from '../../components/loading';

function HomeCategory({
  // after,
  category,
}) {
  const { loading, error, data } = useQuery(GET_POSTS, {
    variables: {
      first: 2,
      after: '',
      category: category,
    },
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'network-only',
  });

  const stories = data?.posts.edges;

  console.log(data, error);
  console.log(after, category);

  return (
    <div>
      <SectionHeader>{category}</SectionHeader>

      {/* {loading && <Loading/>}   */}

      {stories?.map(({ node }) => (
        <SmallPostPreview
          key={node.slug}
          title={node.title}
          coverImage={node.featuredImage?.node}
          date={node.date}
          author={node.author?.node}
          slug={node.slug}
          excerpt={node.excerpt}
          categories={node.categories}
        />
      ))}
    </div>
  );
}

export default HomeCategory;
