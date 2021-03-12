import PostPreview from './post-preview'
import { useQuery } from '@apollo/client';
import Loading from './loading';
import { Waypoint } from 'react-waypoint';
import { GET_POSTS } from '../lib/apolloQueries';
// import SmallPostPreview from './small-post-preview';

export default function PostList({first, after, category}) {

  const { loading, error, data, fetchMore } = useQuery(
    GET_POSTS, 
    {
      variables: {
        first: first,
        after: after,
        category: category
      },
      notifyOnNetworkStatusChange: true,
    }
    );

  const posts = data?.posts.edges

  return (

    !data ? 

    <div className='h-75-screen flex justify-center items-center'>
    <Loading/>
    </div>
    
    :

    <section className='overflow-hidden mx-auto'>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 col-gap-8 row-gap-2 mb-32">
        
        {error && <h1 className='text-4xl text-center'>An Error Occurred</h1>}
        

        {posts.map(({node}) => (
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

      {loading && <div className='mb-40'><Loading/></div>}


    </section>
  )
}
