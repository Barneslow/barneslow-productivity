import ReactApexChart from "react-apexcharts";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectTimerLog } from "../../store/timerSlice";

export const MonthlyChart = (props) => {
  const sessionLog = useSelector(selectTimerLog);

  const [series, setSeries] = useState([
    {
      name: "Study Time",
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
  ]);
  const [options, setOptions] = useState({
    chart: {
      type: "bar",
    },
    fill: {
      colors: [
        function ({ value, seriesIndex, w }) {
          if (value > 60) {
            return "#20ba45";
          } else {
            return "#db2828";
          }
        },
      ],
    },

    plotOptions: {
      bar: {
        borderRadius: 10,
        dataLabels: {
          position: "top", // top, center, bottom
        },
      },
    },
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        if (val === 0) return val;
        let minutes = Math.floor(val / 60);

        return minutes + "mins";
      },
      offsetY: -20,
      style: {
        fontSize: "12px",
        colors: ["#304758"],
      },
    },

    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      position: "top",
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      crosshairs: {
        fill: {
          type: "gradient",
          gradient: {
            colorFrom: "#D8E3F0",
            colorTo: "#BED1E6",
            stops: [0, 100],
            opacityFrom: 0.4,
            opacityTo: 0.5,
          },
        },
      },
      tooltip: {
        enabled: true,
      },
    },
    yaxis: {
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        show: false,
        formatter: function (val) {
          if (val === 0) return val;

          let minutes = Math.floor(val / 60);

          return minutes + "mins";
        },
      },
    },
    title: {
      text: "Monthly Study Chart",
      floating: true,
      offsetY: 330,
      align: "center",
      style: {
        color: "#444",
      },
    },
  });

  useEffect(() => {
    const time = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    for (const session of sessionLog) {
      const isoDate = new Date(session.date);
      const sessionMonth = isoDate.getMonth();

      time[sessionMonth] += session.time;
    }

    setSeries([
      {
        name: "Study Time",
        data: time,
      },
    ]);
  }, [sessionLog]);

  return (
    <div id="chart">
      <ReactApexChart
        options={options}
        series={series}
        type="bar"
        height={350}
      />
    </div>
  );
};

export const WeeklyChart = (props) => {
  const sessionLog = useSelector(selectTimerLog);

  const [series, setSeries] = useState([
    {
      name: "Study Time",
      data: [0, 0, 0, 0, 0, 0, 0],
    },
  ]);
  const [options, setOptions] = useState({
    chart: {
      type: "bar",
    },
    fill: {
      colors: [
        function ({ value, seriesIndex, w }) {
          if (value > 60) {
            return "#20ba45";
          } else {
            return "#db2828";
          }
        },
      ],
    },

    plotOptions: {
      bar: {
        borderRadius: 10,
        dataLabels: {
          position: "top", // top, center, bottom
        },
      },
    },
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        if (val === 0) return val;
        let minutes = Math.floor(val / 60);

        return minutes + "mins";
      },
      offsetY: -20,
      style: {
        fontSize: "12px",
        colors: ["#304758"],
      },
    },

    xaxis: {
      categories: ["Sun", "Mon", "Tues", "Weds", "Thurs", "Fri", "Sat"],
      position: "top",
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      crosshairs: {
        fill: {
          type: "gradient",
          gradient: {
            colorFrom: "#D8E3F0",
            colorTo: "#BED1E6",
            stops: [0, 100],
            opacityFrom: 0.4,
            opacityTo: 0.5,
          },
        },
      },
      tooltip: {
        enabled: true,
      },
    },
    yaxis: {
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        show: false,
        formatter: function (val) {
          if (val === 0) return val;

          let minutes = Math.floor(val / 60);

          return minutes + "mins";
        },
      },
    },
    title: {
      text: "Weekly Study Chart",
      floating: true,
      offsetY: 330,
      align: "center",
      style: {
        color: "#444",
      },
    },
  });

  useEffect(() => {
    const time = [0, 0, 0, 0, 0, 0, 0];

    for (const session of sessionLog) {
      const isoDate = new Date(session.date);
      const sessionDay = isoDate.getDay();

      time[sessionDay] += session.time;
    }

    setSeries([
      {
        name: "Study Time",
        data: time,
      },
    ]);
  }, [sessionLog]);

  return (
    <div id="chart">
      <ReactApexChart
        options={options}
        series={series}
        type="bar"
        height={350}
      />
    </div>
  );
};

export const GoalChart = (props) => {
  const [series, setSeries] = useState([67]);
  const [options, setOptions] = useState({
    chart: {
      height: 350,
      type: "radialBar",
      offsetY: -10,
    },
    plotOptions: {
      radialBar: {
        startAngle: -135,
        endAngle: 135,
        dataLabels: {
          name: {
            fontSize: "20px",
            color: "#304758",
            offsetY: 120,
          },
          value: {
            offsetY: 0,
            fontSize: "50px",
            fontWeight: 900,
            color: "green",
            formatter: function (val) {
              return val + "%";
            },
          },
        },
      },
    },
    fill: {
      type: "gradient",
      colors: "#2086d0",
      gradient: {
        shade: "dark",
        shadeIntensity: 0.15,
        inverseColors: false,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 50, 65, 91],
      },
    },
    stroke: {
      dashArray: 3,
    },
    labels: ["Goal Completion"],
  });

  return (
    <div id="chart">
      <ReactApexChart
        options={options}
        series={series}
        type="radialBar"
        height={421}
      />
    </div>
  );
};
