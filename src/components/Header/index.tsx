import Image from 'next/image';
import React from 'react';
import { SignInButton } from '../SignInButton';
import styles from './styles.module.scss';

export function Header() {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <Image
          src="/images/logo.svg"
          alt="imagem logo ig.nesw"
          width={110}
          height={31}
        />
        <nav>
          <a className={styles.active}>Home</a>
          <a>Post</a>
        </nav>
        <SignInButton />
      </div>
    </header>
  );
}
