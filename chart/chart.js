let chart;
function drawChart(row) {
  let values = Array.from(row.children).map((td) => parseInt(td.innerText));
  let labels = values.map((_, i) => `Adat ${i + 1}`);

  if (chart) chart.destroy();

  let ctx = document.getElementById("lineChart").getContext("2d");
  chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Kiválasztott sor értékei",
          data: values,
          borderColor: "blue",
          borderWidth: 2,
          fill: false,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}
