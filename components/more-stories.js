import PostPreview from './post-preview'
import { useSWRInfinite } from "swr";

const fetcher = url => fetch(url).then(res => res.json());
const PAGE_SIZE = 5;

export default function MoreStories({ posts }) {

  const { data, error, size, setSize } = useSWRInfinite(
    index =>
      `https://api.github.com/repos/${repo}/issues?per_page=${PAGE_SIZE}&page=${index +
        1}`,
    fetcher
  );

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
      <div className="mb-16 text-center ">
        <h2 
        className="text-4xl cursor-pointer hover:opacity-75"
        onClick={() => {

        }}
        >Load More.</h2>
      </div>
    </section>
  )
}
