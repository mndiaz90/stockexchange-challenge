import { api, apikey } from "../../services/api";
import { useEffect, useState } from "react";
import Link from 'next/link';
import { LineMultiplesColumnsChart } from "../../components/Charts/LineMultiplesColumnsChart";

import styles from './styles.module.scss';
import { ArrowBack } from "@material-ui/icons";

type Company = {
  symbol: string;
  date: string;
  revenue: number;
  costOfRevenue: number;
}

export default function Compare({ companies }) {
  const [loading, setLoading] = useState(true);
  const [dataSeries, setDataSeries] = useState<Object[]>([]);
  const [xAxis, setXAxis] = useState<string[]>([]);

  useEffect(() => {
    let balance = [];

    companies.forEach((symbol: string, index: number) => {
      api.get(`income-statement/${symbol}`, {
        params: {
          limit: 10,
          apikey: apikey
        }
      })
        .then(({ data }) => {
          const dataCompany = data.reverse();
          const lastYears = dataCompany.map((company: Company) => String(new Date(company.date).getFullYear()));
          const revenue = dataCompany.map((company: Company) => company.revenue);
          const costOfRevenue = dataCompany.map((company: Company) => company.costOfRevenue);

          const column = {
            type: 'column',
            name: `${symbol} - Reveneu`,
            data: revenue
          };
          const spline = {
            type: 'spline',
            name: `${symbol} - Cost of reveneu`,
            data: costOfRevenue
          };

          balance.push(column, spline);

          if (index + 1 === companies.length) {
            setDataSeries(balance);
            setXAxis(lastYears);
            setLoading(false)
          }
        })
        .catch((error) => alert(error));
    });
  }, [companies]);

  return <div className={styles.container}>
    <div className={styles.header}>
      <Link href='/'>
        <button>
          <ArrowBack />
        </button>
      </Link>
    </div>
    {
      loading ?
        <div className={styles.containerLoading}>
          <h2>Loading </h2>
          <img src="/loading.gif" alt="loading" />
        </div>
        :
        <div className={styles.highcharts}>
          <LineMultiplesColumnsChart xAxis={xAxis} series={dataSeries} />
        </div>
    }

  </div>
}

export const getServerSideProps = async ({ params }) => {
  const ids = params.ids
  const companiesToCompare = ids.split(',');

  return {
    props: {
      companies: companiesToCompare
    }
  }
}
