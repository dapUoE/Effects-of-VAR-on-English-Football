document.addEventListener('DOMContentLoaded', function () {
    fetch('foul_data.json')
        .then(response => response.json())
        .then(data => {
            const seasons = data.map(item => item.Season);
            const totalFouls = data.map(item => item.Total_Fouls);

            const ctx = document.getElementById('foulsChart').getContext('2d');
            const foulsChart = new Chart(ctx, {
                type: 'line', // Line chart to show progression over seasons
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
                        duration: 2000 // Animation can be adjusted as needed
                    },
                    responsive: true,
                    maintainAspectRatio: false
                }
            });
        })
        .catch(error => console.error('Error loading the data:', error));
});
