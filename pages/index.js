import Head from 'next/head'
import Container from '../components/container'
import PostList from '../components/post-list.js'
import Layout from '../components/layout'
import { initializeApollo, addApolloState } from '../lib/apolloClient'
import { GET_POSTS } from '../lib/apolloQueries';
import PostPreview from '../components/post-preview';
import SmallPostPreview from '../components/small-post-preview';
import SectionHeader from '../components/section-header';
import HomeCategory from '../archive/components/home-category';
import { useQuery } from '@apollo/client';
import { AiFillCaretRight } from "react-icons/ai";
import Link from 'next/link'

export default function Index({posts}) {


  const latestStory = posts[0]
  const latestStories = posts.slice(1)


  return (
    <>
      <Layout>
        <Head>
          <title>HERD</title>
        </Head>
        <div>

          <PostPreview
            key={latestStory.node.slug}
            title={latestStory.node.title}
            coverImage={latestStory.node.featuredImage?.node}
            date={latestStory.node.date}
            author={latestStory.node.author?.node}
            slug={latestStory.node.slug}
            excerpt={latestStory.node.excerpt}
            categories={latestStory.node.categories}
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

          <div className='flex items-center font-bold justify-end my-8'>
            <Link href='/explore'>
            <button className='flex items-center font-bold justify-end'>
              <h1 className='text-2xl uppercase mr-4'>
                Explore
              </h1>
              <AiFillCaretRight/>
            </button>
            </Link>

          </div>
          

        </div>

      </Layout>
    </>
  )

}

export async function getStaticProps() {
  const apolloClient = initializeApollo()

    const response = await apolloClient.query({
      query: GET_POSTS,
      variables: {first: 4, after: "", category: ""}
    })
    const posts = await response.data.posts.edges
    // const endCursor = await response.data.posts.pageInfo.endCursor
    
    return addApolloState(apolloClient, {
      props: {
        posts,
        // endCursor
      },
      revalidate: 1
    })

  }