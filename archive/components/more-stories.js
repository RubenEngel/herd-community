import PostPreview from './post-preview'
import useSWR, {useSWRInfinite} from "swr";
import { request } from 'graphql-request'

export default function MoreStories({ posts }) {

  const query = (first, after) => (`{
    posts(first:${first}, after:"${after}") {
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
  }`)


  const getKey = (pageIndex, previousPageData) => {
    // reached the end
    console.log("index:", pageIndex)
    if (previousPageData) console.log(previousPageData.posts.pageInfo.endCursor)
    if (previousPageData && !previousPageData.data) return null
    // first page, we don't have `previousPageData`
    // if (pageIndex === 0) return query(3, "")
    // add the cursor to the API endpoint
    return query(5, previousPageData?.posts.pageInfo.endCursor)
  }

  const fetcher = query => request("https://www.herdcommunity.co.uk/graphql", query)

  const { data, size, setSize } = useSWRInfinite( getKey, fetcher, {persistSize: false} );

  const stories = data ? data.map((data) => data.posts.edges) : [];

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
        
        {/* {stories.map(({node}) => (
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
      </div>
      <div className="mb-16 text-center ">
        <h2 
        className="text-4xl cursor-pointer hover:opacity-75"
        onClick={() => setSize(size + 1)}
        >Load More.</h2>
      </div>
    </section>
  )
}
