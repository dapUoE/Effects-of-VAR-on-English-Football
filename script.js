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
});

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
    fetchChartData('card_data.json', canvasId, {
        label: 'Yellow Cards Per Season',
        borderColor: 'rgb(54, 162, 235)',
        backgroundColor: 'rgba(54, 162, 235, 0.5)'
    }, 'Total_Yellows');  // Pass the specific field name here
}

function initializeRedCardsChart(canvasId) {
    // Fetch data and initialize the red cards chart
    fetchChartData('card_data.json', canvasId, {
        label: 'Red Cards Per Season',
        borderColor: 'rgb(255, 205, 86)',
        backgroundColor: 'rgba(255, 205, 86, 0.5)'
    }, 'Total_Reds');  // Pass the specific field name here
}

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
            const values = data.map(item => item[dataField]); // Use dynamic field name
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
