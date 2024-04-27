document.addEventListener('DOMContentLoaded', function () {
    const observerOptions = {
        threshold: 0.5 // Trigger when 50% of the canvas is visible
    };

    const charts = {}; // Store chart instances for easy access

    // Function to fetch data and initialize charts
    function fetchDataAndInitializeCharts() {
        fetch('foul_data.json')
            .then(response => response.json())
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

                // Add additional initializeChart calls for more graphs as needed
            })
            .catch(error => {
                console.error('Error loading the data:', error);
                alert('Failed to load data: ' + error.message);
            });
    }

    // Function to initialize a single chart
    function initializeChart(data, canvasId, datasetOptions) {
        const seasons = data.map(item => item.Season);
        const chartValues = data.map(datasetOptions
