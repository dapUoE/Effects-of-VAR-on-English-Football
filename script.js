document.addEventListener('DOMContentLoaded', function () {
    const charts = {}; // Store chart instances for easy access

    // Function to fetch data and initialize charts
    function fetchDataAndInitializeCharts() {
        fetch('foul_data.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                initializeChart(data, 'foulsChart', {
                    label: 'Total Fouls Per Season',
                    value: item => item.Total_Fouls,
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
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

                initializeChart(data, 'yellowCardsChart', {
                    label: 'Total Yellow Cards Per Season',
                    value: item => item.Total_Yellows,
                    borderColor: 'rgba(255, 215, 0, 1)',
                    backgroundColor: 'rgba(255, 215, 0, 0.5)',
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

                initializeChart(data, 'redCardsChart', {
                    label: 'Total Red Cards Per Season',
                    value: item => item.Total_Reds,
                    borderColor: 'rgba(255, 0, 0, 1)',
                    backgroundColor: 'rgba(255, 0, 0, 0.5)',
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
            })
            .catch(error => {
                console.error('Error loading the data:', error);
                alert('Failed to load data: ' + error.message);
            });
    }

    // Function to initialize a single chart
    function initializeChart(data, canvasId, datasetOptions) {
        const seasons = data.map(item => item.Season);
        const chartValues = data.map(datasetOptions.value);
        const ctx = document.getElementById(canvasId).getContext('2d');
        if (charts[canvasId]) {
            charts[canvasId].destroy(); // Destroy any previous instance
        }
        charts[canvasId] = new Chart(ctx, {
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
            options: datasetOptions.options
        });
    }

    // Immediately fetch data and initialize charts on DOM content loaded
    fetchDataAndInitializeCharts();
});
