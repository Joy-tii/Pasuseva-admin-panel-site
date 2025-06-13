import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

export default function LineChartOne() {
  const options: ApexOptions = {
    legend: {
      show: true,
      position: "top",
      horizontalAlign: "left",
      fontSize: "14px",
      fontWeight: 600,
      labels: {
        colors: ["var(--pasuseva-green)", "var(--pasuseva-orange)"],
        useSeriesColors: false,
      },
      markers: {
        // radius: 4, // ❌ Remove this line
        // Only allowed: fillColors, strokeColor, strokeWidth, offsetX, offsetY, shape, customHTML, onClick
      },
    },
    colors: ["var(--pasuseva-green)", "var(--pasuseva-orange)"], // Theme colors
    chart: {
      fontFamily: "Outfit, sans-serif",
      height: 310,
      type: "line",
      toolbar: {
        show: false,
      },
      background: "transparent",
    },
    stroke: {
      curve: "smooth",
      width: [3, 3],
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "light",
        type: "vertical",
        shadeIntensity: 0.2,
        gradientToColors: ["var(--pasuseva-green)", "var(--pasuseva-orange)"],
        opacityFrom: 0.25,
        opacityTo: 0,
        stops: [0, 100],
      },
    },
    markers: {
      size: 4,
      colors: ["#fff"],
      strokeColors: ["var(--pasuseva-green)", "var(--pasuseva-orange)"],
      strokeWidth: 2,
      hover: {
        size: 7,
      },
    },
    grid: {
      borderColor: "rgba(255, 193, 7, 0.15)", // light yellow grid
      xaxis: {
        lines: {
          show: false,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      enabled: true,
      style: {
        fontSize: "14px",
        fontFamily: "Outfit, sans-serif",
      },
      x: {
        show: true,
      },
    },
    xaxis: {
      type: "category",
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
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        style: {
          fontSize: "13px",
          colors: "var(--pasuseva-green)",
          fontWeight: 500,
        },
      },
      tooltip: {
        enabled: false,
      },
    },
    yaxis: {
      labels: {
        style: {
          fontSize: "13px",
          colors: "var(--pasuseva-orange)",
          fontWeight: 500,
        },
      },
      title: {
        text: "",
        style: {
          fontSize: "0px",
        },
      },
    },
  };

  const series = [
    {
      name: "Sales",
      data: [180, 190, 170, 160, 175, 165, 170, 205, 230, 210, 240, 235],
    },
    {
      name: "Revenue",
      data: [40, 30, 50, 40, 55, 40, 70, 100, 110, 120, 150, 140],
    },
  ];
  return (
    <div className="max-w-full overflow-x-auto custom-scrollbar">
      <div
        id="chartEight"
        className="min-w-[1000px] bg-white dark:bg-[#232d1b] rounded-xl shadow border border-[var(--pasuseva-orange)] p-4"
      >
        <Chart options={options} series={series} type="area" height={310} />
      </div>
    </div>
  );
}
