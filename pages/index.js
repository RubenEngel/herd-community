import Head from 'next/head'
import Container from '../components/container'
import StoryList from '../components/story-list.js'
import HeroPost from '../components/hero-post'
import Layout from '../components/layout'
import { getPostsForHome } from '../lib/api'

export default function Index() {

  // const heroPost = edges[0]?.node
  // const morePosts = edges.slice(0)

  return (
    <>
      <Layout>
        <Head>
          <title>HERD</title>
        </Head>
        <Container>
          <StoryList />
        </Container>
      </Layout>
    </>
  )
}

// export async function getStaticProps({ preview = false }) {
//   const allPosts = await getPostsForHome(preview)
//   return {
//     props: { allPosts, preview },
//   }
// }
