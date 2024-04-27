document.addEventListener('DOMContentLoaded', function () {
    const observerOptions = {
        threshold: 0.5 // Trigger when 50% of the canvas is visible
    };

    // Function to fetch data and initialize charts
    function fetchDataAndInitializeCharts() {
        fetch('foul_data.json')
            .then(response => response.json())
            .then(data => {
                initializeChart(data, 'foulsChart', {
                    label: 'Total Fouls Per Season',
                    value: item => item.Total_Fouls,
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(255, 99, 132, 0.5)'
                });

                initializeChart(data, 'cardsChart', {
                    label: 'Total Yellow Cards Per Season',
                    value: item => item.Total_Yellows,
                    borderColor: 'rgba(255, 215, 0, 1)',
                    backgroundColor: 'rgba(255, 215, 0, 0.5)'
                });

                // Add additional initializeChart calls for more graphs as needed
            })
            .catch(error => {
                console.error('Error loading the data:', error);
                alert('Failed to load data: ' + error.message);
            });
    }

    function initializeChart(data, canvasId, datasetOptions) {
        const seasons = data.map(item => item.Season);
        const chartValues = data.map(datasetOptions.value);

        const ctx = document.getElementById(canvasId).getContext('2d');
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: seasons,
                datasets: [{
                    label: datasetOptions.label,
                    data: chartValues,
                    borderColor: datasetOptions.borderColor,
                    backgroundColor: datasetOptions.backgroundColor,
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
                    duration: 2000
                },
                responsive: true,
                maintainAspectRatio: false
            }
        });
    }

    // Intersection Observer to detect when the canvas comes into view
    let observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                fetchDataAndInitializeCharts();
                observer.disconnect(); // Stop observing after initializing the charts
            }
        });
    }, observerOptions);

    observer.observe(document.getElementById('foulsChart')); // Observe the fouls chart
    // If the charts are far apart, you might want to create separate observers for each chart
});
