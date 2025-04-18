// Google Sheets CSV link for Mile Times
const sheetURL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTdZ_6JVmclMJmua6_fQE6NVStUITYcHChhDbkLfu9D7c_dSochTIq9_5kTSl8gZ4kwvm7zMxvAAuEs/pub?output=csv&sheet=MileTimes';

// Fallback fake data for Mile Times
const fakeData = [
    { Date: '2025-01-10', time_seconds: 320 },
    { Date: '2025-01-11', time_seconds: 330 },
    { Date: '2025-01-12', time_seconds: 310 },
    { Date: '2025-01-13', time_seconds: 290 },
    { Date: '2025-01-14', time_seconds: 305 }
];

// Fetch the CSV file using PapaParse
Papa.parse(sheetURL, {
    download: true,
    header: true,
    skipEmptyLines: true,
    dynamicTyping: true,
    complete: function(results) {
        const data = results.data.length > 0 ? results.data : fakeData;
        
        const dates = [];
        const times = [];

        // Extract dates and times from the data
        data.forEach(row => {
            dates.push(row.Date);
            times.push(row['Time (seconds)']);
        });

        // Create the line chart
        const ctx = document.getElementById('mileChart').getContext('2d');
        const mileChart = new Chart(ctx, {
            type: 'line', // Line chart type
            data: {
                labels: dates, // Dates as labels
                datasets: [
                    {
                        label: 'Mile Time (Seconds)',
                        data: times,
                        backgroundColor: 'rgba(0, 123, 255, 0.7)', // Blue line color
                        borderColor: 'rgba(0, 123, 255, 1)', // Blue line border
                        borderWidth: 2,
                        fill: false, // Do not fill below the line
                        tension: 0.1 // Line smoothing
                    },
                    {
                        label: 'Target Goal (300s)',
                        data: Array(dates.length).fill(300), // Gold line at 300s
                        backgroundColor: 'rgba(255, 215, 0, 0.5)', // Gold color
                        borderColor: 'rgba(255, 215, 0, 1)',
                        borderWidth: 2,
                        fill: false, // Do not fill below the line
                        pointRadius: 0, // Remove points on the target line
                        tension: 0.1 // Line smoothing
                    }
                ]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        suggestedMin: 270,
                        ticks: {
                            color: '#fff'
                        },
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        }
                    },
                    x: {
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        ticks: {
                            color: '#fff'
                        }
                    }
                },
                plugins: {
                    legend: {
                        labels: {
                            color: '#fff'
                        }
                    }
                }
            }
        });
    },
    error: function(error) {
        console.error('Error fetching the CSV: ', error);
        // Use fake data if fetch fails
        const dates = fakeData.map(row => row.Date);
        const times = fakeData.map(row => row.pages);

        // Create the line chart with fake data
        const ctx = document.getElementById('mileChart').getContext('2d');
        const mileChart = new Chart(ctx, {
            type: 'line', // Line chart type
            data: {
                labels: dates,
                datasets: [
                    {
                        label: 'Mile Time (Seconds)',
                        data: times,
                        backgroundColor: 'rgba(0, 123, 255, 0.7)', // Blue line color
                        borderColor: 'rgba(0, 123, 255, 1)', // Blue line border
                        borderWidth: 2,
                        fill: false, // Do not fill below the line
                        tension: 0.1 // Line smoothing
                    },
                    {
                        label: 'Target Goal (300s)',
                        data: Array(dates.length).fill(300), // Gold line at 300s
                        backgroundColor: 'rgba(255, 215, 0, 0.5)', // Gold color
                        borderColor: 'rgba(255, 215, 0, 1)',
                        borderWidth: 2,
                        fill: false, // Do not fill below the line
                        pointRadius: 0, // Remove points on the target line
                        tension: 0.1 // Line smoothing
                    }
                ]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: false,
                        ticks: {
                            color: '#fff'
                        },
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        }
                    },
                    x: {
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        ticks: {
                            color: '#fff'
                        }
                    }
                },
                plugins: {
                    legend: {
                        labels: {
                            color: '#fff'
                        }
                    }
                }
            }
        });
    }
});
