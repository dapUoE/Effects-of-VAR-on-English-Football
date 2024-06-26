
// This script uses Chart.js to create interactive charts for the blog post site.
// document.addEventListener('DOMContentLoaded', () => {, this function is called when the DOM is fully loaded.
// The IntersectionObserver is used to detect when the graph containers come into view.
// The observer is set to trigger when the graph container is 50% in view.
// The observer calls the appropriate initialization function based on the graph container ID.
// The adjustGraphDimensions function is called to set the height of each graph container to match its width.
// The window resize event listener is added to call adjustGraphDimensions when the window is resized.
document.addEventListener('DOMContentLoaded', () => {
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            const canvasId = entry.target.querySelector('canvas').id;
            if (entry.isIntersecting) {
                // Initialize or re-initialize the chart when the element comes into view
                switch(entry.target.id) {
                    case 'graph1':
                        initializeFoulsChart(canvasId);
                        break;
                    case 'graph2':
                        initializeYellowCardsChart(canvasId);
                        break;
                    case 'graph3':
                        initializeRedCardsChart(canvasId);
                        break;
                    case 'graph4':
                        initializeGoalsChart(canvasId);
                        break;
                    case 'graph5':
                        initializeHomeAndAwayGoalsChart(canvasId);
                        break;
                    case 'graph6':
                        initializeHomeAndAwayGoalsRatioChart(canvasId);
                        break;
                    case 'graph7':
                        initializeTeamPerformanceChart(canvasId);
                        break;
                    case 'graph8':
                        initializeCardsChart(canvasId);
                        break;
                    // Add cases for additional graphs as needed
                }
                entry.target.style.opacity = 1;
            } else {
                // Optional: clear the chart when it goes out of view
                let chartInstance = Chart.getChart(canvasId); // Get the Chart instance
                if (chartInstance) {
                    chartInstance.destroy(); // Destroy the chart instance
                }
                entry.target.style.opacity = 0; // Hide the element visually
            }
        });
    }, {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    });

    // Observe all graph containers
    document.querySelectorAll('.graph-container').forEach(graph => {
        observer.observe(graph);
    });

    // Call the function to adjust graph dimensions
    adjustGraphDimensions();

    // Ensure dimensions are recalibrated on window resize
    window.addEventListener('resize', adjustGraphDimensions);
});

// Function to adjust the height of each graph container to match its width
function adjustGraphDimensions() {
    // Adjust the height of each graph to match its width
    const graphs = document.querySelectorAll('.graph-container canvas');
    graphs.forEach(function(canvas) {
        const width = canvas.offsetWidth; // Get the actual width of the canvas
        canvas.style.height = width + 'px'; // Set the height equal to the width
    });
}

// Function to initialize the fouls chart
function initializeFoulsChart(canvasId) {
    // Fetch data and initialize the fouls chart
    fetchChartData('foul_data.json', canvasId, {
        label: 'Total Fouls Per Season',
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)'
    }, 'Total_Fouls');  // Pass the specific field name here
}

// Function to initialize the yellow cards chart
function initializeYellowCardsChart(canvasId) {
    // Fetch data and initialize the cards chart
    fetchChartData('foul_data.json', canvasId, {
        label: 'Yellow Cards Per Season',
        // Yellow card color
        borderColor: 'rgb(255, 205, 86)',
        backgroundColor: 'rgba(255, 205, 86, 0.5)'
    }, 'Total_Yellows');  // Pass the specific field name here
}

// Function to initialize the red cards chart
function initializeRedCardsChart(canvasId) {
    // Fetch data and initialize the red cards chart
    fetchChartData('foul_data.json', canvasId, {
        label: 'Red Cards Per Season',
        // Red card color
        borderColor: 'rgb(255, 99, 71)',
        backgroundColor: 'rgba(255, 99, 71, 0.5)'
    }, 'Total_Reds');  // Pass the specific field name here
}

// Function to initialize the red and yellow cards chart
function initializeCardsChart(canvasId) {
    fetch('foul_data.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const seasons = data.map(item => item.Season);
            const yellowCards = data.map(item => item.Total_Yellows);
            const redCards = data.map(item => item.Total_Reds);
            const ctx = document.getElementById(canvasId).getContext('2d');
            const cardsChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: seasons,
                    datasets: [{
                        label: 'Yellow Cards Per Season',
                        data: yellowCards,
                        borderColor: 'rgb(255, 205, 86)',
                        backgroundColor: 'rgba(255, 205, 86, 0.5)',
                        yAxisID: 'y-axis-yellow',
                        fill: true,
                        tension: 0.1
                    }, {
                        label: 'Red Cards Per Season',
                        data: redCards,
                        borderColor: 'rgb(255, 99, 71)',
                        backgroundColor: 'rgba(255, 99, 71, 0.5)',
                        yAxisID: 'y-axis-red',
                        fill: true,
                        tension: 0.1
                    }]
                },
                options: {
                    scales: {
                        'y-axis-yellow': {
                            type: 'linear',
                            position: 'left',
                            suggestedMin: 0,
                            ticks: {
                                color: 'rgb(255, 205, 86)'  // Sets color for tick labels on the yellow card axis
                            },
                            title: {  // Uses 'title' instead of 'scaleLabel' for Chart.js 3.x onwards
                                display: true,
                                text: 'Yellow Cards',
                                color: 'rgb(255, 205, 86)'  // Sets color for the axis title
                            }
                        },
                        'y-axis-red': {
                            type: 'linear',
                            position: 'right',
                            suggestedMin: 0,
                            suggestedMax: 200,
                            ticks: {
                                color: 'rgb(255, 99, 71)'  // Sets color for tick labels on the red card axis
                            },
                            title: {  // Uses 'title' instead of 'scaleLabel'
                                display: true,
                                text: 'Red Cards',
                                color: 'rgb(255, 99, 71)'  // Sets color for the axis title
                            },
                            grid: {
                                drawOnChartArea: false  // Ensures grid lines do not overlap with the yellow axis
                            }
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

// Function to initialize the goals chart
function initializeGoalsChart(canvasId) {
    // Fetch data and initialize the goals chart
    fetchChartData('goal_data.json', canvasId, {
        label: 'Goals Per Season',
        borderColor: 'rgb(54, 162, 235)',
        backgroundColor: 'rgba(54, 162, 235, 0.5)'
    }, 'Total_Goals');  // Pass the specific field name here
}

// Function to initialize the home and away goals chart
function initializeHomeAndAwayGoalsChart(canvasId) {
    fetch('goal_data.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        const seasons = data.map(item => item.Season);
        const homeGoals = data.map(item => item.Total_Home_Goals);
        const awayGoals = data.map(item => item.Total_Away_Goals);
        const ctx = document.getElementById(canvasId).getContext('2d');
        const homeAwayGoalsChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: seasons,
                datasets: [{
                    label: 'Home Goals',
                    data: homeGoals,
                    borderColor: 'blue',
                    backgroundColor: 'rgba(54, 162, 235, 0.5)',
                    fill: false,
                    lineTension: 0.1
                }, {
                    label: 'Away Goals',
                    data: awayGoals,
                    borderColor: 'red',
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                    fill: false,
                    lineTension: 0.1
                }]
            },
            options: {
                scales: {
                    y: {
                        type: 'linear',
                        grace: '5%',
                        position: 'left'
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

// Function to initialize the home and away goal difference chart
function initializeHomeAndAwayGoalsRatioChart(canvasId) {
    // Fetch data and initialize the home and away goals ratio chart
    fetchChartData('goal_data.json',canvasId, {
        label: 'Home-Away Goal Difference',
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)'
    }, 'Goal_Diff');  // Pass the specific field name here
}

// Function to initialize the team performance chart
function initializeTeamPerformanceChart(canvasId) {
    fetch('team_data.json')
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.json();
        })
        .then(data => {
            if (!data || !Array.isArray(data) || !data.length) {
                throw new Error('Data is empty or not properly formatted');
            }

            const teamLabels = data.map(item => item.Team);
            const pointsPreVAR = data.map(item => item.Points_Per_Game_Pre_VAR);
            const pointsPostVAR = data.map(item => item.Points_Per_Game_Post_VAR);
            const varImpactRatio = data.map(item => item.VAR_Impact_Ratio);

            const ctx = document.getElementById(canvasId).getContext('2d');
            if (!ctx) {
                throw new Error('Canvas context could not be obtained');
            }

            const teamPerformanceChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: teamLabels,
                    datasets: [{
                        label: 'Pre-VAR Points Per Game',
                        data: pointsPreVAR,
                        backgroundColor: 'rgba(54, 162, 235, 0.5)',
                        borderColor: 'blue',
                        borderWidth: 1
                    }, {
                        label: 'Post-VAR Points Per Game',
                        data: pointsPostVAR,
                        backgroundColor: 'rgba(255, 99, 132, 0.5)',
                        borderColor: 'red',
                        borderWidth: 1
                    }]
                },
                options: {
                    indexAxis: 'y',
                    scales: {
                        x: {
                            beginAtZero: true
                        }
                    },
                    plugins: {
                        tooltip: {
                            callbacks: {
                                title: function(tooltipItems) {
                                    try {
                                        return tooltipItems[0]?.dataIndex !== undefined ? this._chart.data.labels[tooltipItems[0].dataIndex] : '';
                                    } catch (error) {
                                        console.error('Error accessing tooltip title:', error);
                                        return '';
                                    }
                                },
                                label: function(tooltipItem) {
                                    try {
                                        return `${tooltipItem.dataset.label}: ${tooltipItem.raw.toFixed(2)} points`;
                                    } catch (error) {
                                        console.error('Error formatting tooltip label:', error);
                                        return '';
                                    }
                                },
                                footer: function(tooltipItems) {
                                    try {
                                        return `VAR Impact Ratio: ${varImpactRatio[tooltipItems[0].dataIndex].toFixed(2)}`;
                                    } catch (error) {
                                        console.error('Error accessing tooltip footer:', error);
                                        return '';
                                    }
                                }
                            }
                        }
                    },
                    responsive: true,
                    maintainAspectRatio: false
                }
            });
        })
        .catch(error => {
            console.error('Error initializing chart:', error);
        });
}

// Function to fetch data and create a line chart
function fetchChartData(url, canvasId, chartConfig, dataField) {
    //
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        // Process the data and create the chart
        .then(data => {
            const seasons = data.map(item => item.Season);
            const values = data.map(item => item[dataField]);
            const ctx = document.getElementById(canvasId).getContext('2d');
            const chart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: seasons,
                    datasets: [{
                        label: chartConfig.label,
                        data: values,
                        borderColor: chartConfig.borderColor,
                        backgroundColor: chartConfig.backgroundColor,
                        fill: true,
                        tension: 0.1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            // Remove 'beginAtZero' to allow dynamic range adjustment
                            type: 'linear', // Ensures linear scaling
                            grace: '5%',  // Adds a little grace to top and bottom of scale, adjust as needed
                            position: 'left',
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

