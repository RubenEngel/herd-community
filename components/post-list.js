import PostPreview from './post-preview'
import { useQuery } from '@apollo/client';
import Loading from './loading';
import { Waypoint } from 'react-waypoint';
import { GET_POSTS } from '../lib/apolloQueries';

export default function PostList({first, after}) {

  const { loading, error, data, fetchMore } = useQuery(
    GET_POSTS, 
    {
      variables: {
        first: first,
        after: after
      },
      notifyOnNetworkStatusChange: true,
    }
    );

  const stories = data ? data.posts.edges : [];

  return (
    
    !data ? 

    <div className='h-75-screen flex justify-center items-center'>
    <Loading/>
    </div>
    
    :

    <section>
      <div className="grid grid-cols-1 col-gap-8 md:grid-cols-2 lg:grid-cols-3 row-gap-8 mb-32">
        
        {error && <h1 className='text-4xl text-center'>Error Occurred</h1>}
        
        {stories.map(({node}) => (
            <PostPreview
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
          
          <Waypoint onEnter={() => {
            const endCursor = data.posts.pageInfo.endCursor
            fetchMore({
              variables: {after: endCursor}
            })
          }}
          />

      </div>

      <div className='mb-40'>{loading ? <Loading/> : null}</div>


    </section>
  )
}
