document.addEventListener('DOMContentLoaded', function () {
    const chartCanvas = document.getElementById('foulsChart');
    let chartInitialized = false; // Flag to ensure the chart is only initialized once
  
    // Intersection Observer to detect when the canvas comes into view
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        // Check if the canvas is in view and the chart hasn't been initialized
        if (entry.isIntersecting && !chartInitialized) {
          chartInitialized = true; // Set the flag so it doesn't initialize again
          // Now fetch the data and initialize the chart
          fetchAndInitializeChart();
          observer.unobserve(chartCanvas); // Stop observing after initialization
        }
      });
    }, {
      threshold: 0.5 // Trigger when 50% of the canvas is visible
    });
  
    // Start observing the canvas element
    observer.observe(chartCanvas);
  });
  
  function fetchAndInitializeChart() {
    fetch('foul_data.json') // Make sure the path is correct
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        const seasons = data.map(item => item.Season);
        const totalFouls = data.map(item => item.Total_Fouls);
  
        const ctx = document.getElementById('foulsChart').getContext('2d');
        if (!ctx) {
          throw new Error('Failed to get canvas context');
        }
        const foulsChart = new Chart(ctx, {
          type: 'line',
          data: {
            labels: seasons,
            datasets: [{
              label: 'Total Fouls Per Season',
              data: totalFouls,
              borderColor: 'rgb(255, 99, 132)',
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
              fill: true,
              tension: 0.1
            }]
          },
          options: {
            scales: {
              y: {
                beginAtZero: true
              }
            },
            animation: {
              duration: 2000 // Animation duration
            },
            responsive: true,
            maintainAspectRatio: false
          }
        });
      })
      .catch(error => {
        console.error('Error loading the data:', error);
        alert('Failed to load data: ' + error.message);
      });
  }
  