import { api, apikey } from "../../services/api";
import { useEffect, useState } from "react";
import { LineColumnChart } from '../../components/Charts/LineColumnChart';
import { LineChart } from '../../components/Charts/LineChart';
import { ArrowBack } from "@material-ui/icons";
import Link from 'next/link';

import styles from './styles.module.scss';

type Company = {
	symbol: string;
	date: string;
	grossProfit: number;
	grossProfitRatio: number;
	ebitda: number;
	ebitdaratio: number;
	operatingExpenses: number;
}

type CompanyProps = {
	data: Company[];
	symbol: string;
}

type Axis = {
	xaxis: string[];
	y1axis: number[];
	y2axis: number[];
}

export default function Company({ data, symbol }: CompanyProps) {
	const [loading, setLoading] = useState(true);
	const [dataYears, setDataYears] = useState<string[]>([]);
	const [dataGrossProfit, setDataGrossProfit] = useState<Axis>({
		xaxis: [],
		y1axis: [],
		y2axis: []
	});
	const [dataEBITDA, setDataEBITDA] = useState<Axis>({
		xaxis: [],
		y1axis: [],
		y2axis: []
	});
	const [dataSeries, setDataSeries] = useState([]);
	const config1 = {
		title: "Gross Profit",
		y2axisTitle: "Gross Profit",
		y1axisTitle: "Gross Profit Ratio",
	};
	const config2 = {
		title: "EBITDA",
		y2axisTitle: 'EBITDA',
		y1axisTitle: "EBITDA Ratio",
		columnColor: '#ffa500',
		columnSpline: '#ff0000'
	};

	useEffect(() => {
		const dataCompany = data.reverse();
		const lastYears = dataCompany.map((company: Company) => String(new Date(company.date).getFullYear()));
		const grossProfit = dataCompany.map((company: Company) => company.grossProfit);
		const grossProfitRatio = dataCompany.map((company: Company) => company.grossProfitRatio);
		const ebitda = dataCompany.map((company: Company) => company.ebitda);
		const ebitdaRatio = dataCompany.map((company: Company) => company.ebitdaratio);
		const operatingExpenses = dataCompany.map((company: Company) => company.operatingExpenses);
		const series = [{
			name: 'Gross Profit',
			data: grossProfit
		}, {
			name: 'Operating Expenses',
			data: operatingExpenses
		}, {
			name: 'EBITDA',
			data: ebitda
		}];

		setDataGrossProfit({
			xaxis: lastYears,
			y1axis: grossProfitRatio,
			y2axis: grossProfit
		});
		setDataEBITDA({
			xaxis: lastYears,
			y1axis: ebitdaRatio,
			y2axis: ebitda
		});

		setDataSeries(series);
		setDataYears(lastYears);
		setLoading(false);
	}, [data]);

	return <div className={styles.container}>
		<div className={styles.header}>
			<Link href='/'>
				<button>
					<ArrowBack />
				</button>
			</Link>
			<h1>{symbol}</h1>
		</div>
		{
			loading ?
				<div className={styles.containerLoading}>
					<h2>Loading </h2>
					<img src="/loading.gif" alt="loading" />
				</div>
				:
				<div className={styles.highcharts}>
					<LineColumnChart
						dataAxis={dataGrossProfit}
						config={config1}
					/>
					<LineColumnChart
						dataAxis={dataEBITDA}
						config={config2}
					/>
					<LineChart
						series={dataSeries}
						pointStart={dataYears[0]}
					/>
				</div>
		}
	</div>
}

export const getServerSideProps = async ({ params }) => {
	const { data } = await api.get(`income-statement/${params.id}`, {
		params: {
			limit: 10,
			apikey: apikey
		}
	});

	return {
		props: {
			data,
			symbol: params.id
		}
	}
}
