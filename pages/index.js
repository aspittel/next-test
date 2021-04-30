import Head from 'next/head'
import styles from '../styles/Home.module.css'

import { withSSRContext, API } from "aws-amplify"
import { listPosts } from '../src/graphql/queries'
import { createPost } from '../src/graphql/mutations'


export async function getServerSideProps({ req }) {
  const SSR = withSSRContext({ req })
  const posts = await SSR.API.graphql({ query: listPosts })

  console.log(posts)
  return {
    props: {
      posts: posts.data.listPosts.items
    },
  };
}

export default function Home({ posts = [] }) {
  console.log("HI");
  const handleClick = async () => {
    let title = window.prompt("what is the title")
    const post = await API.graphql({ query: createPost, variables: { input: { title } } })
    console.log(post)
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <button onClick={handleClick}>Create Post</button>
      <main className={styles.main}>
        {posts.map(post => <h2>{post.title}</h2>)}
      </main>
    </div>
  )
}
