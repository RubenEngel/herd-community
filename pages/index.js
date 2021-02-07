import Head from 'next/head'
import Container from '../components/container'
import MoreStories from '../components/more-stories.js'
import HeroPost from '../components/hero-post'
import Layout from '../components/layout'
import { getPostsForHome } from '../lib/api'

export default function Index({ allPosts: { edges }, preview }) {

  // const heroPost = edges[0]?.node
  const morePosts = edges.slice(0)

  return (
    <>
      <Layout preview={preview}>
        <Head>
          <title>HERD</title>
        </Head>
        <Container>
          {/* {heroPost && (
            <HeroPost
              title={heroPost.title}
              coverImage={heroPost.featuredImage?.node}
              date={heroPost.date}
              author={heroPost.author?.node}
              slug={heroPost.slug}
              excerpt={heroPost.excerpt}
            />
          )} */}
          {morePosts.length > 0 && <MoreStories posts={morePosts} />}
        </Container>
      </Layout>
    </>
  )
}

export async function getStaticProps({ preview = false }) {
  const allPosts = await getPostsForHome(preview)
  return {
    props: { allPosts, preview },
  }
}
