import React from 'react';
import Chart from 'react-apexcharts';
import ChartComponent from '../../../../components/ApexCharts/Chart';
import styles from './RevenueCard.module.css';

const data = {
  categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  series: [
    {
      name: 'Sales',
      data: [10, 20, 30, 40, 20, 30, 25, 0, 30, 40, 10, 45],
      type: 'area',
      smooth: true,
    },
  ],
};

const RevenueCard = ({ title, subtitle, revenue, graphData, color }) => {
  return (
    <div className={styles.card} style={{ flex: 1 }}>
      <h2 className={styles.heading}>{title}</h2>
      <div className={styles.description}>{subtitle}</div>
      <div className={styles.revenue}>
        <div className={styles.amount} style={{ color: color }}>
          {revenue}
        </div>
        <div className={styles.chart} style={{ marginLeft: '-2vw' }}>
          <ChartComponent type='area' colors={[color]} hideXAxis hideYAxis series={data.series} />
        </div>
      </div>
    </div>
  );
};

export default RevenueCard;
