document.addEventListener('DOMContentLoaded', function () {
    fetch('foul_data.json')  // Make sure the path is correct
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
                        duration: 2000 // Make sure the duration is reasonable
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
});
