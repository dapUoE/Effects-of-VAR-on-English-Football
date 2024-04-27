document.addEventListener('DOMContentLoaded', () => {
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Trigger the chart initialization when the element comes into view
                if (entry.target.id === 'graph1') {
                    initializeChart(entry.target.querySelector('canvas').id);
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

    // Add all graph containers to the observer
    document.querySelectorAll('.graph-container').forEach(graph => {
        observer.observe(graph);
    });
});

function initializeChart(canvasId) {
    fetch('foul_data.json')  // Adjust the path if needed
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const seasons = data.map(item => item.Season);
            const totalFouls = data.map(item => item.Total_Fouls);
            const ctx = document.getElementById(canvasId).getContext('2d');
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

