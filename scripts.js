// script.js
document.addEventListener('DOMContentLoaded', function () {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.dataset.initialized) {
                entry.target.dataset.initialized = true; // Mark as initialized
                let canvas = entry.target.querySelector('canvas');
                if (canvas) {
                    initGraph(canvas, canvas.id);
                }
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
});

function initGraph(canvas, id) {
    fetch(`${id}.json`) // Assuming you have separate JSON files for each graph
        .then(response => response.json())
        .then(data => {
            new Chart(canvas, {
                type: data.type,
                data: {
                    labels: data.labels,
                    datasets: data.datasets
                },
                options: {
                    animations: {
                        tension: {
                            duration: 1000,
                            easing: 'linear',
                            from: 1,
                            to: 0,
                            loop: true
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        });
}
