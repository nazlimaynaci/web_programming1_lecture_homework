let chart;

window.onload = function () {
  const rows = document.querySelectorAll("#number-table tr");
  rows.forEach(row => {
    row.addEventListener("click", () => {
      const values = Array.from(row.children).map(cell => parseInt(cell.innerText));
      updateChart(values);
    });
  });
};

function updateChart(data) {
  const ctx = document.getElementById('lineChart').getContext('2d');
  const labels = data.map((_, i) => `Column ${i + 1}`);

  if (chart) {
    chart.destroy();
  }

  chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: 'Selected Row Data',
        data: data,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
        tension: 0.3
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}