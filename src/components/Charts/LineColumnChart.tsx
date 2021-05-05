
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

type config = {
    title: string;
    y2axisTitle: string;
    y1axisTitle: string;
    columnColor?: string;
    columnSpline?: string;
}

type axis = {
    xaxis: string[],
    y1axis: number[],
    y2axis: number[]
}

type LineColumnChartProps = {
    dataAxis: axis;
    config: config
}

export const LineColumnChart = ({ dataAxis, config }: LineColumnChartProps) => {

    const options: Highcharts.Options = {
        chart: {
            zoomType: 'xy'
        },
        title: {
            text: config.title || 'Title here'
        },
        subtitle: {
            text: 'Demostraçoes de resultados anuais'
        },
        xAxis: [{
            categories: dataAxis.xaxis,
            crosshair: true
        }],
        colors: [
            config.columnColor || '#699fe8',
            config.columnSpline || '#35373a'
        ],
        yAxis: [{ // Primary yAxis
            labels: {
                format: '{value} %'
            },
            title: {
                text: ''
            }
        }, { // Secondary yAxis
            title: {
                text: '',
            },
            labels: {
                format: 'U$ {value}'
            },
            opposite: true
        }],
        tooltip: {
            shared: true
        },
        legend: {
            layout: 'horizontal',
            align: 'center',
            x: 0,
            verticalAlign: 'bottom',
            y: 0,
            floating: false,
            backgroundColor: 'rgba(255,255,255,0.25)'
        },
        series: [{
            name: config.y2axisTitle,
            type: 'column',
            yAxis: 1,
            data: dataAxis.y2axis,
            tooltip: {
                valueSuffix: ' U$'
            }
        }, {
            name: config.y1axisTitle,
            type: 'spline',
            data: dataAxis.y1axis,
            tooltip: {
                valueSuffix: '%'
            }
        }]
    };

    return <HighchartsReact highcharts={Highcharts} options={options} constructorType="chart" />
}
