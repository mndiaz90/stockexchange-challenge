import { ChangeEvent, useEffect, useState } from "react";
import Link from 'next/link';
import { LineMultiplesColumnsChart } from "../../components/Charts/LineMultiplesColumnsChart";
import { ArrowBack } from "@material-ui/icons";
import { getCompaniesSelectedData } from "../../utils/CompanyData";

import styles from './styles.module.scss';

type CompareProps = {
  companies: string[]
}

export default function Compare({ companies }: CompareProps) {
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState("10");
  const [dataSeries, setDataSeries] = useState<Object[]>([]);
  const [xAxis, setXAxis] = useState<string[]>([]);

  useEffect(() => {
    if (companies.length)
      getAllCompanyData(companies, period);

  }, [companies]);

  function getAllCompanyData(companiesToCompare: string[], period: string) {
    let series = [];

    companiesToCompare.forEach((symbol: string, index: number) => {
      getCompaniesSelectedData(symbol, period)
        .then((data) => {
          if (data) {
            series.push(data.column, data.spline);

            if (index + 1 === companiesToCompare.length) {
              setDataSeries(series);
              setXAxis(data.lastYears);
              setLoading(false)
            }
          }
        });
    });
  }

  function onChangePeriod(event: ChangeEvent<HTMLSelectElement>) {
    setPeriod(event.target.value);
    setLoading(true);

    if (companies.length)
      getAllCompanyData(companies, event.target.value);

  }

  return <div className={styles.container}>
    <div className={styles.header}>
      <Link href='/'>
        <button>
          <ArrowBack />
        </button>
      </Link>
      <select
        value={period}
        onChange={(event: ChangeEvent<HTMLSelectElement>) => onChangePeriod(event)}
      >
        <option value="1">Last year</option>
        <option value="5">Last 5 years</option>
        <option value="10">Last 10 years</option>
      </select>
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
