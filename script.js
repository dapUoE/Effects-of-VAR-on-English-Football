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

                initializeChart(data, 'yellowCardsChart', {
                    label: 'Total Yellow Cards Per Season',
                    value: item => item.Total_Yellows,
                    borderColor: 'rgba(255, 215, 0, 1)',
                    backgroundColor: 'rgba(255, 215, 0, 0.5)'
                });

                initializeChart(data, 'redCardsChart', {
                    label: 'Total Red Cards Per Season',
                    value: item => item.Total_Reds,
                    borderColor: 'rgba(255, 0, 0, 1)',
                    backgroundColor: 'rgba(255, 0, 0, 0.5)'
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

    // Intersection Observer callback function
    const onIntersection = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const chartId = entry.target.id;
                if (!charts[chartId]) {
                    fetchDataAndInitializeCharts(); // Initialize charts if not done yet
                } else {
                    charts[chartId].update(); // Triggers reanimation
                }
            }
        });
    };

    // Initialize observers for each chart
    const observerOptions = {
        threshold: 0.5 // Trigger when 50% of the canvas is visible
    };
    document.querySelectorAll('.chart').forEach(chart => {
        new IntersectionObserver(onIntersection, observerOptions).observe(chart);
    });

    // Button toggle functionality
    document.getElementById('toggleGraph').addEventListener('click', () => {
        const foulsChartEl = document.getElementById('foulsChart');
        const cardsChartEl = document.getElementById('cardsChart');

        // Toggle which chart is displayed
        if (currentChart === 'foulsChart') {
            foulsChartEl.style.display = 'none';
            cardsChartEl.style.display = 'block';
            currentChart = 'cardsChart';
        } else {
            cardsChartEl.style.display = 'none';
            foulsChartEl.style.display = 'block';
            currentChart = 'foulsChart';
        }
    });
});