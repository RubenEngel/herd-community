import PostPreview from './post-preview'
// import { useStateValue } from './ProvideState'

export default function MoreStories({ posts }) {

  return (
    <section>
      <h2 className="mb-8 text-6xl md:text-7xl font-bold tracking-tighter leading-tight">
        Latest Stories
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 md:col-gap-16 lg:col-gap-32 row-gap-20 md:row-gap-32 mb-32">
        {posts.map(({ node }) => (
          <PostPreview
            key={node.slug}
            title={node.title}
            coverImage={node.featuredImage?.node}
            date={node.date}
            author={node.author?.node}
            slug={node.slug}
            excerpt={node.excerpt}
          />
        ))}
      </div>
      {/* <div className="mb-16 text-center ">
        <h2 
        className="text-4xl cursor-pointer hover:opacity-75"
        onClick={() => {
          dispatch({
            type: 'LOAD_MORE_POSTS'
          })
        }}
        >Load More Stories.</h2>
      </div> */}
    </section>
  )
}
