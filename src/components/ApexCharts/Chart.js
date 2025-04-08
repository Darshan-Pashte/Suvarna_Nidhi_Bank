import React from 'react';
import Chart from 'react-apexcharts';

const ChartComponent = ({
  series,
  type = 'bar',
  disableZoom,
  yProps = null,
  hideXAxis = false,
  hideYAxis = false,
  colors,
  showGridLines = false,
  disableFill,
}) => {
  let options = {
    chart: {
      zoom: {
        enabled: !disableZoom,
      },
      toolbar: {
        show: false,
      },
      foreColor: '#9aa8c0',
    },
    grid: {
      show: showGridLines,
    },
    xaxis: {
      labels: {
        style: {
          fontSize: '0.825vw',
          opacity: 0.8,
          color: '#535E71',
        },
        showDuplicates: false,
        show: !hideXAxis,
      },
      axisBorder: {
        show: !hideXAxis, // hide the X axis line
      },
      axisTicks: {
        show: !hideXAxis, // hide the X axis ticks
      },
    },
    yaxis: {
      labels: {
        style: {
          fontSize: '0.825vw',
        },
        show: !hideYAxis,
      },
      axisBorder: {
        show: !hideYAxis, // hide the X axis line
      },
      axisTicks: {
        show: !hideYAxis, // hide the X axis ticks
      },
      ...yProps,
    },
    colors,
    stroke: {
      width: 3,
      curve: 'smooth',
    },
    dataLabels: { enabled: false },
    tooltip: {
      style: {
        fontSize: '1vw',
      },
    },

    plotOptions: {
      area: {
        fillTo: 'end',
      },
    },
    fill: disableFill
      ? {
          gradient: {
            enabled: true,
            opacityFrom: 0,
            opacityTo: 0,
          },
        }
      : {},
  };

  if (type === 'radialBar') {
    options = {
      ...options,
      chart: {
        height: '100%',
      },
      plotOptions: {
        radialBar: {
          startAngle: -135,
          endAngle: 225,
          hollow: {
            margin: 0,
            size: '70%',
            background: '#fff',
            image: undefined,
            imageOffsetX: 0,
            imageOffsetY: 0,
            position: 'front',
            dropShadow: {
              enabled: true,
              top: 3,
              left: 0,
              blur: 4,
              opacity: 0.24,
            },
          },
          track: {
            background: '#fff',
            strokeWidth: '100%',
            margin: 0, // margin is in pixels
            dropShadow: {
              enabled: true,
              top: -3,
              left: 0,
              blur: 4,
              opacity: 0.35,
            },
          },

          dataLabels: {
            show: true,
            name: {
              offsetY: -10,
              show: true,
              color: '#888',
              fontSize: '2vw',
            },
            value: {
              formatter: function (val) {
                return parseInt(val);
              },
              color: '#111',
              fontSize: '2vw',
              show: true,
            },
          },
        },
      },
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'dark',
          type: 'horizontal',
          shadeIntensity: 0.5,
          gradientToColors: ['#ABE5A1'],
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100],
        },
      },
      stroke: {
        // lineCap: 'round',
      },
      labels: ['Percent'],
      subtitle: {
        text: 'Success Rate',
        align: 'center',
        margin: 20,
        offsetY: 25,
        style: {
          color: '#222',
          fontSize: '1.5vw',
          fontWeight: 'bold',
        },
      },
    };
  }

  return <Chart options={options} series={series} type={type} height={type === 'radialBar' ? '100%' : '95%'} width='100%' />;
};

export default ChartComponent;
