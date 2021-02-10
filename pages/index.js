import Head from 'next/head'
import Container from '../components/container'
import PostList from '../components/post-list.js'
import Layout from '../components/layout'
import { initializeApollo, addApolloState } from '../lib/apolloClient'
import { GET_POSTS } from '../lib/apolloQueries';

export default function Index( {posts} ) {

console.log(posts)

  return (
    <>
      <Layout>
        <Head>
          <title>HERD</title>
        </Head>
        <Container>
          <PostList first={6} after=""/>
        </Container>
      </Layout>
    </>
  )

}

export async function getServerSideProps() {
  const apolloClient = initializeApollo()

    const response = await apolloClient.query({
      query: GET_POSTS,
      variables: {first: 10, after: ""}
    })
  
    return addApolloState(apolloClient, {
      props: {
        posts: response.data.posts.edges
      },
    })

  }