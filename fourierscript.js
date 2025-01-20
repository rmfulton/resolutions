// Google Sheets CSV link for Fourier Page Progress
const sheetURL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTdZ_6JVmclMJmua6_fQE6NVStUITYcHChhDbkLfu9D7c_dSochTIq9_5kTSl8gZ4kwvm7zMxvAAuEs/pub?output=csv&sheet=FourierAnalysisProgress';

// Fallback fake data for Fourier Page Progress
const fakeData = [
    { Date: '2025-01-10', pages: 50 },
    { Date: '2025-01-11', pages: 60 },
    { Date: '2025-01-12', pages: 70 },
    { Date: '2025-01-13', pages: 74 },
    { Date: '2025-01-14', pages: 79 }
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
        const pages = [];

        // Extract dates and times from the data
        data.forEach(row => {
            dates.push(row.Date);
            pages.push(row['Pages read']);
        });

        // Create the line chart
        const ctx = document.getElementById('fourierChart').getContext('2d');
        const fourierChart = new Chart(ctx, {
            type: 'line', // Line chart type
            data: {
                labels: dates, // Dates as labels
                datasets: [
                    {
                        label: 'Pages Read',
                        data: pages,
                        backgroundColor: 'rgba(0, 123, 255, 0.7)', // Blue line color
                        borderColor: 'rgba(0, 123, 255, 1)', // Blue line border
                        borderWidth: 2,
                        fill: false, // Do not fill below the line
                        tension: 0.1 // Line smoothing
                    },
                    {
                        label: 'Target Goal (280)',
                        data: Array(dates.length).fill(280), // Gold line at 280
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
                        beginAtZero: true,
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
        const pages = fakeData.map(row => row.pages);

        // Create the line chart with fake data
        const ctx = document.getElementById('fourierChart').getContext('2d');
        const fourierChart = new Chart(ctx, {
            type: 'line', // Line chart type
            data: {
                labels: dates,
                datasets: [
                    {
                        label: 'Pages Read',
                        data: pages,
                        backgroundColor: 'rgba(0, 123, 255, 0.7)', // Blue line color
                        borderColor: 'rgba(0, 123, 255, 1)', // Blue line border
                        borderWidth: 2,
                        fill: false, // Do not fill below the line
                        tension: 0.1 // Line smoothing
                    },
                    {
                        label: 'Target Goal (280)',
                        data: Array(dates.length).fill(280), // Gold line at 280 pages
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
                        beginAtZero: true,
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
