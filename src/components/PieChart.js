import React, { useState, useEffect } from "react";
import Chart from "react-google-charts";

export default function PieChart() {
  const [chart, setChart] = useState([]);

  const getChart = () => {
    fetch("https://customerrest.herokuapp.com/api/trainings")
      .then((response) => response.json())
      .then((data) => {
        const newArray = data.content.map(
          ({ date, content, links, value, ...item }) => item
        );
        setChart(newArray);
      });
  };

  useEffect(() => {
    getChart();
  }, []);

  // Didn't see the mention about Lodash library so I did the combination manually
  var result = [];
  chart.reduce(function (res, value) {
    if (!res[value.activity]) {
      res[value.activity] = { activity: value.activity, duration: 0 };
      result.push(res[value.activity]);
    }
    res[value.activity].duration += value.duration;
    return res;
  }, {});

  const mapped = result.map((d) => [d.activity, d.duration]);
  const data = [["name", "time (min)"], ...mapped];

  console.log(data);

  return (
    <div>
      <Chart
        width={"1000px"}
        height={"500px"}
        chartType="Bar"
        loader={<div>Loading Chart</div>}
        data={data}
        options={{
          title: "Data in Percentage",
        }}
      />
      <Chart
        width={"1000px"}
        height={"500px"}
        chartType="PieChart"
        loader={<div>Loading Chart</div>}
        data={data}
        options={{
          title: "Data in Percentage",
        }}
      />
    </div>
  );
}
