import { GetStaticProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { SubscriberButton } from '../components/SubscriberButton'
import { stripe } from '../services/stripe'
import styles from './home.module.scss'

interface HomeProps {
  product: {
    priceId: string
    amount: number
  }
}

export default function Home({ product }: HomeProps) {
  return (
    <>
      <Head>
        <title>Home | IgNews</title>
      </Head>
      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👏 Hey, wlecome</span>
          <h1>
            News about the <span>React</span>World.
          </h1>
          <p>
            Get access to all the publications <br />
            <span>for {product.amount} month</span>
          </p>
          <SubscriberButton priceId={product.priceId} />
        </section>
        <Image
          src='/images/avatar.svg'
          alt='Girl coding'
          width={336}
          height={521}
        />
      </main>
    </>
  )
}

// getStaticProps
export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve(process.env.PRICE_ID)
  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat('pt-PT', {
      style: 'currency',
      currency: 'EUR',
    }).format(price.unit_amount / 100),
  }

  return {
    props: {
      product,
    },
    revalidate: 60 * 60 * 24, // 1 day
  }
}
