import { Header } from '../components/Header';
import Head from 'next/head';
import { SearchCompanies } from '../components/SearchCompanies';
import styles from '../styles/Home.module.scss';

export default function Home() {

  return (
    <div className={styles.container}>
      <Head>
        <title>Stock exchange</title>
      </Head>
      <Header />
      <main>
        <div className={styles.containerSearch}>
          <SearchCompanies />
          <button>Compare</button>
        </div>
      </main>
    </div>
  )
}
