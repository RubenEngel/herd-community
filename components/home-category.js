import React from 'react';
import Link from 'next/link';
import { AiFillCaretRight } from 'react-icons/ai';
import PostPreview from '../components/post-preview';
import SmallPostPreview from '../components/small-post-preview';
import { ExploreContext } from '../lib/context';

function HomeCategory({ posts, categoryName }) {
  const latestPost = posts ? posts[0] : null;
  const latestStories = posts?.slice(1, 4);

  const { category, setCategory } = React.useContext(ExploreContext);

  return (
    <div>
      <div className="text-center bg-primary w-100 lg:mx-12 rounded-xl p-1 m-4 lg:p-2 font-bold uppercase text-secondary">
        <Link href="/explore">
          <button
            className="flex items-center font-bold mx-auto"
            onClick={(e) => setCategory(e.currentTarget.textContent)}
          >
            <h1 className="text-lg uppercase mr-4">{categoryName}</h1>
            <AiFillCaretRight />
          </button>
        </Link>
      </div>
      <div className="p-4 md:p-6 lg:p-10">
        <PostPreview
          key={latestPost.slug}
          title={latestPost.title}
          coverImage={latestPost.featuredImage}
          date={latestPost.date}
          author={latestPost.author}
          slug={latestPost.slug}
          excerpt={latestPost.excerpt}
          categories={latestPost.categories}
          // animateScale={0.5}
        />

        {latestStories.map((post) => (
          <SmallPostPreview
            key={post.slug}
            title={post.title}
            coverImage={post.featuredImage}
            date={post.date}
            author={post.author}
            slug={post.slug}
            categories={post.categories}
          />
        ))}
      </div>
    </div>
  );
}

export default HomeCategory;
