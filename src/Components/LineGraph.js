import React, { useEffect } from 'react';
import { Line } from 'react-chartjs-2'
import { selectData, setData } from '../Redux/Reducer';
import { useSelector, useDispatch } from 'react-redux';
import numeral from 'numeral'
//https://disease.sh/v3/covid-19/historical/all?lastday=120

const options = {
    legend: {
      display: false,
    },
    elements: {
      point: {
        radius: 0,
      },
    },
    maintainAspectRatio: false,
    tooltips: {
      mode: "index",
      intersect: false,
      callbacks: {
        label: function (tooltipItem, data) {
          return numeral(tooltipItem.value).format("+0,0");
        },
      },
    },
    scales: {
      xAxes: [
        {
          type: "time",
          time: {
            format: "MM/DD/YY",
            tooltipFormat: "ll",
          },
        },
      ],
      yAxes: [
        {
          gridLines: {
            display: false,
          },
          ticks: {
            // Include a dollar sign in the ticks
            callback: function (value, index, values) {
              return numeral(value).format("0a");
            },
          },
        },
      ],
    },
};
const LineGraph = () => {
    const dispatch = useDispatch();

    const data = useSelector(selectData);

    const buildChart = (data, casesType = "cases") => {
     const chart = [];
     let lastDataPoint;
      for (let date in data.cases) {
         if(lastDataPoint) {
              const newDataPoint = {
                  x: date,
                 y: data[casesType][date] - lastDataPoint,
              };
             chart.push(newDataPoint);
         }
         lastDataPoint = data[casesType][date];
      }
      return chart;
    };

    useEffect(() => {
        const fetchData = async () => {
           await fetch("https://disease.sh/v3/covid-19/historical/all?lastday=120")
            .then(res => {
              return res.json();
            })
            .then(data => {
                console.log(data);
                const chartData = buildChart(data, "cases");
                dispatch(setData({
                    data: chartData
                }))
            })
        }
        fetchData();
    }, []);

    return (
        <div>
            {data?.length > 0 && (
              <Line
                data={{
                  labels: ["Today"],
                  datasets: [
                    {
                      label: 'Today',
                      backgroundColor: "rgba(204, 16, 52, 0.5)",
                      borderColor: "#CC1034",
                      data: data,
                    },
                  ],
                }}
                options={options}
              />
            )}
        </div>
    )
}

export default LineGraph
