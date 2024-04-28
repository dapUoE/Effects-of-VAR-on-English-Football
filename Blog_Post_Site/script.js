// A function to record whether a toggle switch is on or off
function toggleSwitch() {
    // Get the toggle switch element
    const toggle = document.getElementById('toggle');
    // Get the current state of the toggle switch
    const toggleState = toggle.checked;
    // Log the state of the toggle switch
    console.log('Toggle switch is ' + (toggleState ? 'on' : 'off'));
    // To use the logic of the toggle switch to chamge how a graph is displayed, use the following code
    // if (toggleState) {
    //     // Code to display the graph in a certain way when the toggle switch is on
    // } else {
    //     // Code to display the graph in a certain way when the toggle switch is off
    // }
}


document.addEventListener('DOMContentLoaded', () => {
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Determine which chart to initialize based on the container ID
                switch(entry.target.id) {
                    case 'graph1':
                        initializeFoulsChart(entry.target.querySelector('canvas').id);
                        break;
                    case 'graph2':
                        initializeYellowCardsChart(entry.target.querySelector('canvas').id);
                        break;
                    case 'graph3':
                        initializeRedCardsChart(entry.target.querySelector('canvas').id);
                        break;
                    case 'graph4':
                        initializeGoalsChart(entry.target.querySelector('canvas').id);
                        break;
                    case 'graph5':
                        initializeHomeAndAwayGoalsChart(entry.target.querySelector('canvas').id);
                        break;
                    case 'graph6':
                        initializeHomeAndAwayGoalsRatioChart(entry.target.querySelector('canvas').id);
                        break;
                    case 'graph7':
                        initializeTeamPerformanceChart(entry.target.querySelector('canvas').id);
                        break;
                        
                    // Add cases for additional graphs as needed
                }
                entry.target.style.opacity = 1;
                observer.unobserve(entry.target); // Stop observing once initialized
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

function adjustGraphDimensions() {
    // Adjust the height of each graph to match its width
    const graphs = document.querySelectorAll('.graph-container canvas');
    graphs.forEach(function(canvas) {
        const width = canvas.offsetWidth; // Get the actual width of the canvas
        canvas.style.height = width + 'px'; // Set the height equal to the width
    });
}

function initializeFoulsChart(canvasId) {
    // Fetch data and initialize the fouls chart
    fetchChartData('foul_data.json', canvasId, {
        label: 'Total Fouls Per Season',
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)'
    }, 'Total_Fouls');  // Pass the specific field name here
}

function initializeYellowCardsChart(canvasId) {
    // Fetch data and initialize the cards chart
    fetchChartData('foul_data.json', canvasId, {
        label: 'Yellow Cards Per Season',
        // Yellow card color
        borderColor: 'rgb(255, 205, 86)',
        backgroundColor: 'rgba(255, 205, 86, 0.5)'
    }, 'Total_Yellows');  // Pass the specific field name here
}

function initializeRedCardsChart(canvasId) {
    // Fetch data and initialize the red cards chart
    fetchChartData('foul_data.json', canvasId, {
        label: 'Red Cards Per Season',
        // Red card color
        borderColor: 'rgb(255, 99, 71)',
        backgroundColor: 'rgba(255, 99, 71, 0.5)'
    }, 'Total_Reds');  // Pass the specific field name here
}

function initializeGoalsChart(canvasId) {
    // Fetch data and initialize the goals chart
    fetchChartData('goal_data.json', canvasId, {
        label: 'Goals Per Season',
        borderColor: 'rgb(54, 162, 235)',
        backgroundColor: 'rgba(54, 162, 235, 0.5)'
    }, 'Total_Goals');  // Pass the specific field name here
}

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

function initializeHomeAndAwayGoalsRatioChart(canvasId) {
    // Fetch data and initialize the home and away goals ratio chart
    fetchChartData('goal_data.json',canvasId, {
        label: 'Home-Away Goal Difference',
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)'
    }, 'Goal_Diff');  // Pass the specific field name here
}

function initializeTeamPerformanceChart(canvasId, sortByTotalPoints = false) {
    fetch('team_data.json')
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.json();
        })
        .then(data => {
            if (!data || !Array.isArray(data) || !data.length) {
                throw new Error('Data is empty or not properly formatted');
            }

            if (sortByTotalPoints) {
                data.sort((a, b) => ((b.Points_Per_Game_Pre_VAR + b.Points_Per_Game_Post_VAR) - (a.Points_Per_Game_Pre_VAR + a.Points_Per_Game_Post_VAR)));
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

// Event listener for the toggle button
document.getElementById('toggleOrder').addEventListener('click', function() {
    // Assuming the chart is in a canvas with id 'teamPerformanceCanvas'
    initializeTeamPerformanceChart('teamPerformanceCanvas', true);
});











function fetchChartData(url, canvasId, chartConfig, dataField) {
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
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

