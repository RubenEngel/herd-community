import Head from 'next/head'
import Container from '../../components/container'
import PostList from '../../components/more-stories'
import HeroPost from '../../components/hero-post'
import Layout from '../../components/layout'
import { getPostsForCategory } from '../../lib/api'
import Header from '../../components/header'

const category = 'current affairs'

export default function Category({ allPosts: { edges }, preview }) {
  const heroPost = edges[0]?.node
  const morePosts = edges.slice(1)

  return (
    <>
      <Layout preview={preview}>
        <Head>
          <title>HERD</title>
        </Head>
        <Container>
          <Header/>
          {heroPost && (
            <HeroPost
              title={heroPost.title}
              coverImage={heroPost.featuredImage?.node}
              date={heroPost.date}
              author={heroPost.author?.node}
              slug={heroPost.slug}
              excerpt={heroPost.excerpt}
            />
          )}
          {morePosts.length > 0 && <PostList posts={morePosts} />}
        </Container>
      </Layout>
    </>
  )
}

export async function getStaticProps({ preview = false }) {
  const allPosts = await getPostsForCategory(category, preview)
  return {
    props: { allPosts, preview },
  }
}