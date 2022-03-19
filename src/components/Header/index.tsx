import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import ActiveLink from '../ActiveLink'
import { SignInButton } from '../SignInButton'
import styles from './styles.module.scss'

export function Header() {

  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <Image
          src='/images/logo.svg'
          alt='imagem logo ig.nesw'
          width={110}
          height={31}
        />
        <nav>
          <ActiveLink activeCassName={styles.active} href={'/'} prefetch>
            <a>Home</a>
          </ActiveLink>
          <ActiveLink activeCassName={styles.active} href={'/posts'}>
            <a>Post</a>
          </ActiveLink>
        </nav>
        <SignInButton />
      </div>
    </header>
  )
}
