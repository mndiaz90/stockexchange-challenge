import { Header } from '../components/Header';
import Head from 'next/head';
import { SearchCompanies } from '../components/SearchCompanies';
import { CompaniesTable } from '../components/CompaniesTable';
import { useContext, useEffect, useState } from 'react';
import { CompaniesContext } from '../contexts/CompaniesContext';
import { api, apikey } from '../services/api';
import Link from 'next/link'

import styles from '../styles/Home.module.scss';

type Company = {
  symbol: string;
  name: string;
  price: number;
}

type HomeProps = {
  data: Company[]
}

export default function Home({ data }: HomeProps) {
  const [isLoading, setIsLoading] = useState(true);
  const { setAllCompanies, companiesSelected } = useContext(CompaniesContext);

  useEffect(() => {
    if (data.length) {
      setIsLoading(false);
      setAllCompanies(data);
    }
  }, [data]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Stock exchange</title>
      </Head>
      <Header />
      <main>
        <div className={styles.containerSearch}>
          <SearchCompanies />
          <Link href={`compare/${companiesSelected}`}>
            <button>Compare</button>
          </Link>
        </div>
        {
          isLoading ?
            <div className={styles.containerLoading}>
              <h2>Loading </h2>
              <img src="/loading.gif" alt="loading" />
            </div> :
            <CompaniesTable />
        }
      </main>
    </div>
  )
}

export async function getServerSideProps() {
  const { data } = await api.get(`stock/list?`, {
    params: {
      apikey: apikey
    }
  });

  return {
    props: {
      data
    }
  }
}
