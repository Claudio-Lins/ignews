import { GetStaticProps } from 'next'
import { getSession, signIn, useSession } from 'next-auth/react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { RichText } from 'prismic-dom'
import React, { useEffect } from 'react'
import { api } from '../../../services/api'
import { getPrismicClient } from '../../../services/prismic'
import { getStripeJs } from '../../../services/stripe-js'
import styles from '../post.module.scss'

interface PostsPreviewProps {
  post: { slug: string; title: string; content: string; updateAt: string;}
}

export default function PostPreview({ post }: PostsPreviewProps) {
  const { data: session } = useSession()
  const router = useRouter()


  async function handleSubscribe() {
    if (!session) {
      signIn('github')
      return
    }

    if (session.activeSubscription) {
      router.push('/posts')
      return
    }

    try {
      const response = await api.post('/subscribe')

      const { sessionId } = response.data

      const stripe = await getStripeJs()

      await stripe.redirectToCheckout({sessionId})
    } catch (err) {
      alert(err.message)
    }
  }

  useEffect(() =>{
    if(session?.activeSubscription){
      router.push(`/posts/${post.slug}`)
    }
  },[session])

  return (
    <>
      <Head>
        <title>{post.title} | IgNews</title>
      </Head>
      <main className={styles.container}>
        <article className={styles.post}>
          <h1>{post.title}</h1>
          <time>{post.updateAt}</time>
          <div
            className={`${styles.postContent} ${styles.previewContent}`}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          <div className={styles.continueReading}>
            Wanna continue reading?
            {/* <Link href="/" passHref prefetch> */}
            <a onClick={handleSubscribe}>Subscribe now 🤗</a>
            {/* </Link> */}
          </div>
        </article>
      </main>
    </>
  )
}

export const getStaticPaths = () => {
  return {
    paths: [],
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params

  const prismic = getPrismicClient()

  const response = await prismic.getByUID<any>('post', String(slug), {})

  const post = {
    slug,
    title: RichText.asText(response.data.title),
    content: RichText.asHtml(response.data.content.splice(0, 2)),
    updateAt: new Date(response.last_publication_date).toLocaleDateString(
      'pt-PT',
      {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      }
    ),
  }
  return {
    props: {
      post,
    },
    revalidate: 60 * 30 // 30 minutes\
  }
}
