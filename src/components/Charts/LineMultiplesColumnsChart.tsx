
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

type LineChartProps = {
  title?: string;
  xAxis: string[];
  series: Object[]
}
export const LineMultiplesColumnsChart = ({ title = 'Balance', xAxis, series }: LineChartProps) => {

  const options = {
    title: {
      text: title || 'Combination chart'
    },
    xAxis: {
      categories: xAxis
    },
    legend: {
      layout: 'vertical',
      align: 'center',
      verticalAlign: 'bottom'
    },
    yAxis: [{
      labels: {
        format: '{value}'
      },
      title: {
        text: ''
      }
    }],
    labels: {
      items: [{
        html: '',
        style: {
          left: '50px',
          top: '18px',
          color: 'black'
        }
      }]
    },
    series: series
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />
}


