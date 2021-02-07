import PostPreview from './post-preview'
// import useSWR from "swr";
import { useQuery, gql } from '@apollo/client';

const GET_POSTS = gql`
query getPosts($after: String) {
  posts(first: 10, after: $after) {
    edges {
      cursor
      node {
        title
        excerpt
        author {
          node {
            firstName
            lastName
          }
        }
        slug
        date
        featuredImage {
          node {
            sourceUrl
          }
        }
        categories {
          edges {
            node {
              name
            }
          }
        }
        tags {
          edges {
            node {
              name
            }
          }
        }
      }
    }
    pageInfo {
      endCursor
      hasNextPage
    }
  }
}`

export default function StoryList({ posts }) {

  const { loading, error, data, fetchMore } = useQuery(
    GET_POSTS, 
    {variables: {after: ""},
    notifyOnNetworkStatusChange: true,
    }
    );

  const stories = data ? data.posts.edges : [];

  console.log( stories )

  return (
    <section>
      <div className="grid grid-cols-1 md:grid-cols-2 md:col-gap-16 lg:col-gap-32 row-gap-20 md:row-gap-32 mb-32">
        {/* {posts.map(({ node }) => (
          <PostPreview
            key={node.slug}
            title={node.title}
            coverImage={node.featuredImage?.node}
            date={node.date}
            author={node.author?.node}
            slug={node.slug}
            excerpt={node.excerpt}
          />
          
        ))} */}
        {loading && <h1 className='text-4xl text-center'>Loading..</h1>}
        
        {error && <h1 className='text-4xl text-center'>Error Occurred</h1>}
        
        {data && stories.map(({node}) => (
            <PostPreview
            key={node.slug}
            title={node.title}
            coverImage={node.featuredImage?.node}
            date={node.date}
            author={node.author?.node}
            slug={node.slug}
            excerpt={node.excerpt}
          />
          ))
          }
      </div>
      
      {data && 
      <div className="mb-16 text-center ">
        <h2 
        className="text-4xl cursor-pointer hover:opacity-75"
        onClick={() => {
          const endCursor = data.posts.pageInfo.endCursor
          fetchMore({
            variables: {after: endCursor}
          })
        }}
        >{loading ? 'Loading' : 'Load More'}</h2>
      </div>}

    </section>
  )
}
