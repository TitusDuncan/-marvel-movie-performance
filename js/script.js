const metricConfig = {
  imdb: {
    label: "IMDb Rating",
    column: "IMDb",
    suffix: "/10"
  },
  metascore: {
    label: "IMDb Metascore",
    column: "Metascore",
    suffix: "/100"
  },
  rtCritics: {
    label: "Rotten Tomatoes (Critics)",
    column: "RT Critics",
    suffix: "%"
  },
  rtAudience: {
    label: "Rotten Tomatoes (Audience)",
    column: "RT Audience",
    suffix: "%"
  },
  letterboxd: {
    label: "Letterboxd",
    column: "Letterboxd",
    suffix: "/5"
  },
  budget: {
    label: "Budget",
    column: "Budget",
    prefix: "$",
    suffix: "M"
  },
  domesticGross: {
    label: "Domestic Gross",
    column: "Domestic Gross",
    prefix: "$",
    suffix: "M"
  },
  worldwideGross: {
    label: "Worldwide Gross",
    column: "Worldwide Gross",
    prefix: "$",
    suffix: "M"
  },
  netRevenue: {
    label: "Net Revenue",
    column: "Net Revenue",
    prefix: "$",
    suffix: "M"
  }
};

const margin = { top: 40, right: 40, bottom: 170, left: 120 };
const width = 980 - margin.left - margin.right;
const height = 560 - margin.top - margin.bottom;

const svg = d3
  .select("#chart")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", `translate(${margin.left},${margin.top})`);

const x = d3.scaleBand()
  .range([0, width])
  .padding(0.22);

const y = d3.scaleLinear()
  .range([height, 0]);

const color = d3.scaleOrdinal();

function makeThemedColors(count) {
  const colors = [];
  const baseHues = [0, 220, 45, 140]; // red, blue, gold, green

  for (let i = 0; i < count; i++) {
    const group = i % baseHues.length;
    const baseHue = baseHues[group];
    const variation = Math.floor(i / baseHues.length);

    const hue = baseHue + variation * 10;
    const saturation = 65 + (variation % 3) * 5;
    const lightness = 42 + (variation % 3) * 8;

    colors.push(d3.hsl(hue % 360, saturation / 100, lightness / 100).formatHex());
  }

  return colors;
}

const xAxisGroup = svg
  .append("g")
  .attr("class", "axis x-axis")
  .attr("transform", `translate(0,${height})`);

const yAxisGroup = svg
  .append("g")
  .attr("class", "axis y-axis");

svg
  .append("text")
  .attr("class", "axis-label")
  .attr("x", -height / 2)
  .attr("y", -52)
  .attr("transform", "rotate(-90)")
  .attr("text-anchor", "middle")
  .text("Value");

const tooltip = d3.select("#tooltip");

function formatValue(value, config) {
  const prefix = config.prefix || "";
  const suffix = config.suffix || "";
  return `${prefix}${value}${suffix}`;
}

function formatNumber(value, config) {
  const prefix = config.prefix || "";
  const suffix = config.suffix || "";

  return `${prefix}${d3.format(",.1f")(value)}${suffix}`;
}

function cleanRow(d) {
  return {
    title: d.Title,
    imdb: +d["IMDb"],
    metascore: +d["Metascore"],
    rtCritics: +d["RT Critics"],
    rtAudience: +d["RT Audience"],
    letterboxd: +d["Letterboxd"],
    budget: +d["Budget"],
    domesticGross: +d["Domestic Gross"],
    worldwideGross: +d["Worldwide Gross"],
    netRevenue: +d["Net Revenue"]
  };
}

function getTop10(data, metric) {
  return data
    .filter(d => Number.isFinite(d[metric]))
    .sort((a, b) => d3.descending(a[metric], b[metric]))
    .slice(0, 10);
}

function updateChart(data, metric) {
  const config = metricConfig[metric];
  const top10 = getTop10(data, metric);

  d3.select("#chart-title").text(`Top 10 Marvel Movies by ${config.label}`);

  x.domain(top10.map(d => d.title));
  y.domain([0, d3.max(top10, d => d[metric]) * 1.1]).nice();

  const bars = svg
    .selectAll(".bar")
    .data(top10, d => d.title);

  bars
    .join(
      enter => enter
        .append("rect")
        .attr("class", "bar")
        .attr("x", d => x(d.title))
        .attr("y", height)
        .attr("width", x.bandwidth())
        .attr("height", 0)
        .attr("fill", d => color(d.title)),
      update => update,
      exit => exit
        .transition()
        .duration(400)
        .attr("y", height)
        .attr("height", 0)
        .remove()
    )
    .on("mousemove", (event, d) => {
      tooltip
        .style("opacity", 1)
        .style("left", `${event.pageX + 14}px`)
        .style("top", `${event.pageY - 28}px`)
        .html(`
          <strong>${d.title}</strong><br>
          ${config.label}: ${formatNumber(d[metric], config)}
        `);
    })
    .on("mouseleave", () => {
      tooltip.style("opacity", 0);
    })
    .transition()
    .duration(750)
    .attr("x", d => x(d.title))
    .attr("y", d => y(d[metric]))
    .attr("width", x.bandwidth())
    .attr("height", d => height - y(d[metric]))
    .attr("fill", d => color(d.title));

  xAxisGroup
  .transition()
  .duration(750)
  .call(d3.axisBottom(x))
  .selectAll("text")
  .attr("text-anchor", "end")
  .attr("transform", "rotate(-40)")
  .attr("dx", "-0.6em")
  .attr("dy", "0.3em");

  yAxisGroup
    .transition()
    .duration(750)
    .call(d3.axisLeft(y));

  d3.selectAll(".metric-button")
    .classed("active", function () {
      return d3.select(this).attr("data-metric") === metric;
    });
}

d3.csv("data/marvel_movies.csv", cleanRow).then(data => {
  const titles = data.map(d => d.title).sort(d3.ascending);
  const colors = makeThemedColors(titles.length);

  color.domain(titles).range(colors);
  
  updateChart(data, "imdb");

  d3.selectAll(".metric-button").on("click", function () {
    const selectedMetric = d3.select(this).attr("data-metric");
    updateChart(data, selectedMetric);
  });
}).catch(error => {
  console.error("Error loading the CSV file:", error);
});
