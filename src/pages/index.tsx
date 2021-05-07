import { Header } from '../components/Header';
import Head from 'next/head';
import { SearchCompanies } from '../components/SearchCompanies';
import { CompaniesTable } from '../components/CompaniesTable';
import { MouseEvent, useContext, useEffect, useState } from 'react';
import { CompaniesContext } from '../contexts/CompaniesContext';
import { api, apikey } from '../services/api';
import Router from 'next/router';

import styles from '../styles/Home.module.scss';
import { GetServerSideProps } from 'next';
import { CircularProgress } from '@material-ui/core';

type Company = {
  symbol: string;
  name: string;
  price: number;
}

type HomeProps = {
  data?: Company[]
  error?: string
}

export default function Home({ data, error }: HomeProps) {
  const [isLoading, setIsLoading] = useState(true);
  const { setAllCompanies, companiesSelected } = useContext(CompaniesContext);

  useEffect(() => {
    if (error) {
      return alert(error);
    }
    if (data) {
      setIsLoading(false);
      setAllCompanies(data);
    }
  }, [data, error]);

  function onClickCompare(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();

    if (companiesSelected.length < 2) {
      alert('Select 2 or more companies to compare.');
    } else {
      Router.push(`compare/${companiesSelected}`)
    }
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Stock exchange</title>
      </Head>
      <Header />
      <main>
        <div className={styles.containerSearch}>
          <SearchCompanies />
          <button onClick={onClickCompare}>Compare</button>
        </div>
        {
          isLoading ?
            <div className={styles.containerLoading}>
              <h2>Loading </h2>
              <CircularProgress />
            </div> :
            <CompaniesTable />
        }
      </main>
    </div>
  )
}

export const getStaticProps: GetServerSideProps = async () => {
  try {
    const { data } = await api.get(`stock/list?`, {
      params: {
        apikey: apikey
      }
    });

    return {
      props: {
        data
      },
      revalidate: 60 * 60 * 8
    }
  } catch (error) {
    return {
      props: {
        error: error.message
      }
    }
  }
}
