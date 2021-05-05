
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

type LineChartProps = {
    title?: string;
    pointStart: string;
    series: number[]
}
export const LineChart = ({ title = 'Balanço geral', pointStart, series }: LineChartProps) => {

    const options = {
        chart: {
            zoomType: 'xy'
        },
        title: {
            text: title
        },
        subtitle: {
            text: 'Demonstraçoes de resultados anuais'
        },
        yAxis: {
            title: {
                text: ''
            },
            labels: {
                format: 'U$ {value}',
            },
        },

        xAxis: {
            accessibility: {
                rangeDescription: 'Range: Last 10 years'
            }
        },

        legend: {
            layout: 'horizontal',
            align: 'center',
            verticalAlign: 'bottom'
        },

        plotOptions: {
            series: {
                label: {
                    connectorAllowed: false
                },
                pointStart: Number(pointStart)
            }
        },
        series: series,
        responsive: {
            rules: [{
                condition: {
                    maxWidth: 500
                },
                chartOptions: {
                    legend: {
                        layout: 'horizontal',
                        align: 'center',
                        verticalAlign: 'bottom'
                    }
                }
            }]
        }

    };

    return <HighchartsReact highcharts={Highcharts} options={options} />
}
