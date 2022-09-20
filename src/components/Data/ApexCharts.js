import ReactApexChart from "react-apexcharts";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { secondsToMinutes } from "date-fns/esm";
import { dateFormatter } from "../../utils/dateFormater";

export const MonthlyLineChart = (props) => {
  const { sessions } = props;

  const studyData = sessions.map((session) => session.time);
  const breakData = sessions.map((session) => session.breakTime);
  const max = Math.max(...studyData);

  const [series, setSeries] = useState([
    {
      name: "Study",
      data: studyData,
    },
    {
      name: "Break",
      data: breakData,
    },
    {
      name: "Goal",
      data: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100],
    },
  ]);
  const [options, setOptions] = useState({
    chart: {
      height: 350,
      type: "line",
      dropShadow: {
        enabled: true,
        color: "#000",
        top: 18,
        left: 7,
        blur: 10,
        opacity: 0.2,
      },
      toolbar: {
        show: false,
      },
    },
    colors: ["#77B6EA", "#288C28", "#FF0000"],
    dataLabels: {
      enabled: true,
    },
    stroke: {
      curve: "smooth",
    },
    title: {
      text: "Monthly Session Statistics",
      align: "left",
    },
    grid: {
      borderColor: "#e7e7e7",
      row: {
        colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
        opacity: 0.5,
      },
    },
    markers: {
      size: 1,
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
      title: {
        text: "Month",
      },
    },
    yaxis: {
      title: {
        text: "Time",
      },
      min: 0,
      max: max * 1.2,
    },
    legend: {
      position: "top",
      horizontalAlign: "right",
      floating: true,
      offsetY: -25,
      offsetX: -5,
    },
  });

  // useEffect(() => {
  //   const time = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  //   if (!sessions) return;

  //   for (const session of sessions) {
  //     const isoDate = new Date(session.createdAt);
  //     const sessionMonth = isoDate.getMonth();

  //     time[sessionMonth] += session.time;
  //   }

  //   setSeries([
  //     {
  //       name: "Study Time",
  //       data: time,
  //     },
  //   ]);
  // }, [sessions.length]);

  return (
    <div id="chart">
      <ReactApexChart
        options={options}
        series={series}
        type="line"
        height={350}
      />
    </div>
  );
};

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
      text: "Monthly Chart",
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
      text: "Weekly Chart",
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

    if (!sessions || sessions?.length === 0) return;

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
  }, [sessions?.length]);

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

export const SessionRadialChart = ({ time, fill }) => {
  const { user } = useSelector((state) => state.user);
  const goalTime = user?.sessionGoal;
  const timePercent = (time / goalTime) * 100;

  useEffect(() => {
    const goalTime = user?.sessionGoal;
    const timePercent = (time / goalTime) * 100;

    setOptions({ labels: [`${secondsToMinutes(time)} mins`] });

    setSeries([timePercent]);
  }, [time]);

  const [series, setSeries] = useState([timePercent]);
  const [options, setOptions] = useState({
    chart: {
      type: "radialBar",
      sparkline: {
        enabled: true,
      },
      background: "grey",
    },
    plotOptions: {
      radialBar: {
        startAngle: -135,
        endAngle: 225,
        hollow: {
          margin: 0,
          size: "70%",
          background: "#fff",
          image: undefined,
          imageOffsetX: 0,
          imageOffsetY: 0,
          position: "front",
          dropShadow: {
            enabled: true,
            top: 3,
            left: 0,
            blur: 4,
            opacity: 0.24,
          },
        },
        track: {
          background: "#fff",
          strokeWidth: "67%",
          margin: 0,
          dropShadow: {
            enabled: true,
            top: -3,
            left: 0,
            blur: 4,
            opacity: 0.35,
          },
        },
        dataLabels: {
          name: {
            fontSize: "30px",
          },
          value: {
            show: true,
            fontSize: "20px",
            fontWeight: "bold",
            formatter: function (val, opt) {
              const value = +val;
              return value.toFixed(2) + "%";
            },
          },
        },
      },
    },

    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        type: "horizontal",
        shadeIntensity: 0.5,
        gradientToColors: ["#ABE5A1"],
        inverseColors: true,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100],
      },
    },

    states: {
      hover: {
        filter: {
          type: "none",
        },
      },

      active: {
        filter: {
          type: "none",
        },
      },
    },

    stroke: {
      lineCap: "round",
    },
    labels: [`${secondsToMinutes(time)} mins`],

    // responsive: [
    //   {
    //     breakpoint: 701,
    //     options: {
    //       plotOptions: {
    //         radialBar: {
    //           dataLabels: {
    //             name: {
    //               fontSize: "20px",
    //             },
    //             value: {
    //               fontSize: "20px",
    //             },
    //           },
    //         },
    //       },
    //     },
    //   },

    //   {
    //     breakpoint: 601,
    //     options: {
    //       plotOptions: {
    //         radialBar: {
    //           dataLabels: {
    //             name: {
    //               fontSize: "15px",
    //             },
    //             value: {
    //               offsetY: 5,
    //               fontSize: "15px",
    //             },
    //           },
    //         },
    //       },
    //     },
    //   },
    //   {
    //     breakpoint: 401,
    //     options: {
    //       // chart: {
    //       //   height: 120,
    //       // },
    //       plotOptions: {
    //         radialBar: {
    //           dataLabels: {
    //             name: {
    //               fontSize: "12px",
    //             },
    //             value: {
    //               fontSize: "12px",
    //             },
    //           },
    //         },
    //       },
    //     },
    //   },
    // ],
  });

  return (
    <div id="chart">
      <ReactApexChart options={options} series={series} type="radialBar" />
    </div>
  );
};

export const SessionBarChart = ({ time, breakTime, date }) => {
  const timeInMinutes = (time / 60).toFixed(2);

  const breakInMinutes = (breakTime / 60).toFixed(2);

  const isoDate = dateFormatter(date);

  useEffect(() => {
    const timeInMinutes = (time / 60).toFixed(2);

    const breakInMinutes = (breakTime / 60).toFixed(2);

    setSeries([
      {
        name: "Work",
        data: [timeInMinutes],
      },
      {
        name: "Break",
        data: [breakInMinutes],
      },
    ]);
  }, [time]);

  const [series, setSeries] = useState([
    {
      name: "Work",
      data: [timeInMinutes],
    },
    {
      name: "Break",
      data: [breakInMinutes],
    },
  ]);
  const [options, setOptions] = useState({
    chart: {
      type: "bar",
      stacked: true,
      toolbar: {
        show: false,
      },
      background: "grey",
    },

    grid: {
      show: false,
    },

    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 10,
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

    yaxis: {
      floating: true,
      axisTicks: {
        show: false,
      },

      axisBorder: {
        show: false,
      },

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
      width: 0.5,
    },

    responsive: [
      {
        breakpoint: 801,
        options: {
          legend: {
            position: "bottom",
            offsetY: 10,
          },
        },
      },
      {
        breakpoint: 481,
        options: {
          legend: {
            position: "top",
            offsetY: 10,
            fontSize: 10,
          },

          dataLabels: {
            style: {
              fontSize: "10px",
              colors: ["#304758"],
            },
          },
        },
      },
      {
        breakpoint: 401,
        options: {
          dataLabels: {
            formatter: function (val) {
              return val;
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
        type="bar"
        width="100%"
        height="100%"
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

export const MarkerChart = ({ sessions, sessionGoal }) => {
  const data = sessions.map((session) => {
    const isoDate = new Date(session.createdAt);

    const month = isoDate?.toLocaleString("en-US", { month: "long" });
    const day = isoDate?.toLocaleString("en-US", { day: "2-digit" });

    return {
      x: `${day} ${month}`,
      y: session.time,
      goals: [
        {
          name: "Goal",
          value: sessionGoal,
          strokeWidth: 3,
          strokeColor: "#775DD0",
        },
      ],
    };
  });

  const [series, setSeries] = useState([
    {
      name: "Session",
      data,
    },
  ]);

  const [options, setOptions] = useState({
    chart: {
      height: 350,
      type: "bar",
    },
    plotOptions: {
      bar: {
        horizontal: true,
      },
    },
    colors: ["#00E396"],
    dataLabels: {
      formatter: function (val) {
        return val;
      },
    },
    legend: {
      show: true,
      showForSingleSeries: true,
      customLegendItems: ["Actual", "Goal"],
      markers: {
        fillColors: ["#00E396", "#775DD0"],
      },
    },
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
