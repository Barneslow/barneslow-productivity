import ReactApexChart from "react-apexcharts";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { secondsToMinutes } from "date-fns/esm";
import { dateFormatter } from "../../utils/dateFormater";

export const MonthlyChart = (props) => {
  const { sessions } = props;

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

    if (!sessions) return;

    for (const session of sessions) {
      const isoDate = new Date(session.createdAt);
      const sessionMonth = isoDate.getMonth();

      time[sessionMonth] += session.time;
    }

    setSeries([
      {
        name: "Study Time",
        data: time,
      },
    ]);
  }, [sessions.length]);

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
  const { sessions } = props;

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

    if (sessions.length === 0) return;

    for (const session of sessions) {
      const isoDate = new Date(session.createdAt);
      const sessionDay = isoDate.getDay();

      time[sessionDay] += session.time;
    }

    setSeries([
      {
        name: "Study Time",
        data: time,
      },
    ]);
  }, [sessions.length]);

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
  const weeklyGoal = useSelector((state) => state.user.user.weeklyGoal);
  const { sessions, totalTime } = props;

  const [series, setSeries] = useState([0]);

  useEffect(() => {
    const goalTime = weeklyGoal;

    const percentage = (totalTime / goalTime) * 100;

    setSeries([percentage.toFixed(2)]);
  }, [weeklyGoal, sessions.length]);

  const [options, setOptions] = useState({
    chart: {
      height: 350,
      type: "radialBar",
      offsetY: -10,
    },
    plotOptions: {
      track: {
        stroke: "black",
        strokeWidth: "3px",
      },
      radialBar: {
        startAngle: -135,
        endAngle: 135,
        track: {
          show: true,
          background: "#fff",
          strokeWidth: "100%",
          margin: 0, // margin is in pixels
          dropShadow: {
            enabled: true,
            top: 0,
            left: 0,
            blur: 4,
            opacity: 1,
          },
        },

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
      dashArray: 1,
      colors: ["#000"],
    },

    labels: ["Weekly Goal"],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            height: 250,
          },
          plotOptions: {
            radialBar: {
              dataLabels: {
                value: {
                  fontSize: "30px",
                  offsetY: -5,
                },
              },
            },
          },
        },
      },
    ],
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

export const SessionRadialChart = (props) => {
  const { time, breakTime } = props;
  const { user } = useSelector((state) => state.user);
  const goalTime = user?.sessionGoal;
  const timePercent = (time / goalTime) * 100;
  const breakPercent = (breakTime / goalTime) * 100;

  const [series, setSeries] = useState([timePercent, breakPercent]);
  const [options, setOptions] = useState({
    plotOptions: {
      radialBar: {
        hollow: {
          margin: 0,
        },
        track: {
          dropShadow: {
            enabled: true,
            top: 2,
            left: 0,
            blur: 4,
            opacity: 0.15,
          },
        },

        dataLabels: {
          name: {
            fontSize: "30px",
          },
          value: {
            fontSize: "30px",
            formatter: function (val) {
              const value = +val;
              return value.toFixed(2) + "%";
            },
          },
          total: {
            show: true,
            label: "Daily Goal",
            color: "#2a2a2a",
            formatter: function (w) {
              return secondsToMinutes(goalTime) + "mins";
            },
          },
        },
      },
    },
    stroke: {
      lineCap: "round",
    },

    labels: ["Study", "Break"],

    responsive: [
      {
        breakpoint: 900,
        options: {
          chart: {
            height: "350",
          },
        },
      },
      {
        breakpoint: 800,
        options: {
          chart: {
            height: "300",
          },
        },
      },
      {
        breakpoint: 700,
        options: {
          chart: {
            height: "250",
          },
        },
      },
      {
        breakpoint: 500,
        options: {
          chart: {
            height: "200",
          },
        },
      },
    ],
  });

  return (
    <div id="chart">
      <ReactApexChart
        options={options}
        series={series}
        type="radialBar"
        height="350"
      />
    </div>
  );
};

export const SessionBarChart = (props) => {
  const { time, breakTime, date } = props;
  const { user } = useSelector((state) => state.user);

  const timeInMinutes = (time / 60).toFixed(2);

  const breakInMinutes = (breakTime / 60).toFixed(2);

  const isoDate = dateFormatter(date);

  const [series, setSeries] = useState([
    {
      name: "Work Time",
      data: [timeInMinutes],
    },
    {
      name: "Break Time",
      data: [breakInMinutes],
    },
  ]);
  const [options, setOptions] = useState({
    chart: {
      type: "bar",
      height: 350,
      stacked: true,
    },

    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 10,
      },
      stroke: {
        width: 2,
      },
    },

    dataLabels: {
      enabled: true,
      formatter: function (val) {
        return val + "mins";
      },
      style: {
        fontSize: "12px",
        colors: ["#304758"],
      },
    },

    xaxis: {
      categories: [isoDate],
      labels: {
        show: false,
      },
    },

    fill: {
      opacity: 1,
    },

    legend: {
      position: "right",
      offsetY: 40,
    },

    stroke: {
      show: true,
      colors: ["black"],
      width: 2,
    },

    responsive: [
      {
        breakpoint: 900,
        options: {
          chart: {
            height: "350",
          },
        },
      },
      {
        breakpoint: 800,
        options: {
          chart: {
            height: "300",
          },
          legend: {
            position: "top",
            offsetY: 10,
          },
        },
      },
      {
        breakpoint: 700,
        options: {
          chart: {
            height: "250",
          },
        },
      },
      {
        breakpoint: 500,
        options: {
          chart: {
            height: "200",
          },
        },
      },
    ],
  });

  return (
    <div id="chart">
      <ReactApexChart
        options={options}
        series={series}
        type="bar"
        height="350"
      />
    </div>
  );
};

export const RatingsChart1 = (props) => {
  const { rating } = props;

  const [series, setSeries] = useState([
    rating["1"],
    rating["2"],
    rating["3"],
    rating["4"],
    rating["5"],
  ]);

  const [options, setOptions] = useState({
    chart: {
      width: "100%",
      type: "donut",
    },
    labels: ["1 Star", "2 Star", "3 Star", "4 Star", "5 Star"],
    plotOptions: {
      pie: {
        startAngle: -90,
        endAngle: 270,
      },
    },
    dataLabels: {
      enabled: false,
    },
    fill: {
      type: "gradient",
    },
    legend: {
      formatter: function (val, opts) {
        return val;
      },
      offsetX: 0,
      fontWeight: 400,
      fontSize: 20,
    },
    title: {
      text: "Session Ratings",
      align: "center",
      offsetX: -50,
      offsetY: 170,

      style: {
        fontSize: "20px",
        fontWeight: "bold",
        color: "#263238",
      },
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val;
        },
        title: {
          formatter: function (seriesName) {
            return seriesName;
          },
        },
      },
    },

    responsive: [
      {
        breakpoint: 1000,
        options: {
          chart: {
            width: "300",
            offsetX: 30,
          },
          legend: {
            position: "bottom",
            offsetX: 0,
            fontWeight: 400,
            fontSize: 16,
          },
        },
      },
    ],
  });

  return (
    <div id="chart">
      <ReactApexChart
        options={options}
        series={series}
        type="donut"
        height="350"
      />
    </div>
  );
};

export const RatingsChart = (props) => {
  const { rating } = props;

  const [series, setSeries] = useState([
    rating["1"],
    rating["2"],
    rating["3"],
    rating["4"],
    rating["5"],
  ]);

  const [options, setOptions] = useState({
    chart: {
      height: 350,
      type: "pie",
    },
    labels: ["1 Star", "2 Star", "3 Star", "4 Star", "5 Star"],

    legend: {
      formatter: function (val, opts) {
        return val;
      },
      offsetX: 0,
      fontWeight: 400,
      fontSize: 20,
    },

    tooltip: {
      y: {
        formatter: function (val) {
          return val;
        },
        title: {
          formatter: function (seriesName) {
            return seriesName;
          },
        },
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            height: 250,
          },
          legend: {
            position: "bottom",
            fontSize: 15,
          },
        },
      },
    ],
  });

  return (
    <div id="chart">
      <ReactApexChart
        options={options}
        series={series}
        type="pie"
        height="350"
      />
    </div>
  );
};
