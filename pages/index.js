import Head from 'next/head'
import { initializeApollo, addApolloState } from '../lib/apolloClient'
import { GET_POSTS } from '../lib/apolloQueries';
import PostPreview from '../components/post-preview';
import SmallPostPreview from '../components/small-post-preview';
import HomeCategory from '../components/home-category';
import { AiFillCaretRight } from "react-icons/ai";
import Link from 'next/link'
import Header from '../components/header';
import { categoryVar } from '../lib/reactiveVars';


export default function Index({
  posts, 
  sportPosts,
  culturePosts,
  currentAffairsPosts,
  lifestylePosts
}) {

  const desktopLatestPosts = posts.slice(0,3)
  const latestStory = posts[0]
  const latestStories = posts.slice(1,4)


  return (
    <>
    <Header/>
        <Head>
          <title>HERD</title>
        </Head>
        {/* Desktop Latest Posts 4 Large */}
        <div className='text-center'>
          <div className='bg-black lg:inline-block items-center lg:mt-6 lg:px-56 lg:rounded-xl p-2 font-bold uppercase text-white'>
                <Link href='/explore'>
                    <button onClick={() => categoryVar('All')} className='flex items-center font-bold mx-auto'>
                    <h1 className='text-lg uppercase mr-4'>
                        Latest Stories
                    </h1>
                    <AiFillCaretRight/>
                    </button>
                </Link>
          </div>
        </div>
        
        <div className='hidden md:grid md:grid-cols-3 max-w-screen-lg mx-auto'>
        {desktopLatestPosts.map(({node}) => (
                <div className='p-6'>
                  <PostPreview
                key={node.slug}
                title={node.title}
                coverImage={node.featuredImage?.node}
                date={node.date}
                author={node.author?.node}
                slug={node.slug}
                excerpt={node.excerpt}
                categories={node.categories}
                animateScale={0.5}
            />
                </div>
                
            ))}
        </div>
          {/* Mobile Latest Posts */}
        <div className='p-4 md:hidden'>
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
        
        {/* Categories after latest posts */}
        <div className='grid md:grid-cols-2 max-w-screen-lg mx-auto'>
          
          <HomeCategory category="Sport" posts={sportPosts}/>

          <HomeCategory category="Culture" posts={culturePosts}/>
          
          <HomeCategory category="Lifestyle" posts={lifestylePosts}/>

          <HomeCategory category="Current Affairs" posts={currentAffairsPosts}/>

        </div>

          <div className='flex items-center w-screen font-bold justify-end py-6 pr-10 bg-black text-white absolute'>
            <Link href='/explore'>
            <button className='flex items-center font-bold justify-end'>
              <h1 className='text-2xl uppercase mr-4'>
                Explore
              </h1>
              <AiFillCaretRight className='text-md'/>
            </button>
            </Link>

          </div>
    </>
  )

}

export async function getStaticProps() {
  const apolloClient = initializeApollo()

    const postsRes = await apolloClient.query({
      query: GET_POSTS,
      variables: {first: 4, after: "", category: ""},
      // fetchPolicy: "no-cache"
    })
    
    const sportRes = await apolloClient.query({
      query: GET_POSTS,
      variables: {first: 4, after: "", category: "Sport"},
      fetchPolicy: "no-cache"
    })

    const cultureRes = await apolloClient.query({
      query: GET_POSTS,
      variables: {first: 4, after: "", category: "Culture"},
      fetchPolicy: "no-cache"
    })

    const currentAffairsRes = await apolloClient.query({
      query: GET_POSTS,
      variables: {first: 4, after: "", category: "Current Affairs"},
      fetchPolicy: "no-cache"
    })

    const lifestyleRes = await apolloClient.query({
      query: GET_POSTS,
      variables: {first: 4, after: "", category: "Lifestyle"},
      fetchPolicy: "no-cache"
    })

  const posts = await postsRes.data.posts.edges
  const culturePosts = await cultureRes.data.posts.edges
  const sportPosts = await sportRes.data.posts.edges
  const currentAffairsPosts = await currentAffairsRes.data.posts.edges
  const lifestylePosts = await lifestyleRes.data.posts.edges

    return addApolloState(apolloClient, {
      props: {
        posts,
        sportPosts,
        culturePosts,
        currentAffairsPosts,
        lifestylePosts
      },
      revalidate: 30
    })

  }