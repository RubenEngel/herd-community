import React from 'react'
import Link from 'next/link'
import { AiFillCaretRight } from "react-icons/ai";
import PostPreview from '../components/post-preview';
import SmallPostPreview from '../components/small-post-preview';
import { categoryVar } from '../lib/reactiveVars';

function HomeCategory({posts, category}) {

    const latestStory = posts ? posts[0] : null
    const latestStories = posts?.slice(1,4)

    return (

        <div>
            <div className='text-center bg-black w-100 lg:mx-12 lg:rounded-xl p-2 font-bold uppercase text-white '>
                <Link href='/explore'>
                    <button className='flex items-center font-bold mx-auto'
                    onClick={() => categoryVar(category)}
                    >
                    <h1 className='text-lg uppercase mr-4'>
                        {category}
                    </h1>
                    <AiFillCaretRight/>
                    </button>
                </Link>
            </div>
            <div className='p-4 md:p-6 lg:p-10'>

            <PostPreview
                key={latestStory.node.slug}
                title={latestStory.node.title}
                coverImage={latestStory.node.featuredImage?.node}
                date={latestStory.node.date}
                author={latestStory.node.author?.node}
                slug={latestStory.node.slug}
                excerpt={latestStory.node.excerpt}
                categories={latestStory.node.categories}
                animateScale={0.5}
            />

            {latestStories.map(({node}) => (
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
      </div>
    )
}

export default HomeCategory
