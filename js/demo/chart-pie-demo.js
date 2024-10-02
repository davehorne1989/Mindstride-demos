// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';

// Donut Chart Example
var ctx = document.getElementById("myPieChart");
var myPieChart = new Chart(ctx, {
  type: 'doughnut',
  data: {
    labels: [
      "Workplace Stress and Burnout", 
      "Financial Stress", 
      "Personal Relationships and Family Stress", 
      "Physical Health Issues", 
      "Substance Use and Addiction", 
      "Trauma and Abuse", 
      "Isolation and Loneliness", 
      "Other Contributing Factors (Environmental, Genetic, etc.)"
    ],
    datasets: [{
      data: [30, 20, 15, 15, 10, 5, 5, 5],  // Values corresponding to the labels
      backgroundColor: [
        '#4e73df',  // Color for Workplace Stress and Burnout
        '#1cc88a',  // Color for Financial Stress
        '#36b9cc',  // Color for Personal Relationships and Family Stress
        '#f6c23e',  // Color for Physical Health Issues
        '#e74a3b',  // Color for Substance Use and Addiction
        '#858796',  // Color for Trauma and Abuse
        '#5a5c69',  // Color for Isolation and Loneliness
        '#6f42c1'   // Color for Other Contributing Factors
      ],
      hoverBackgroundColor: [
        '#2e59d9',  // Hover Color for Workplace Stress and Burnout
        '#17a673',  // Hover Color for Financial Stress
        '#2c9faf',  // Hover Color for Personal Relationships and Family Stress
        '#dda20a',  // Hover Color for Physical Health Issues
        '#c82333',  // Hover Color for Substance Use and Addiction
        '#6c757d',  // Hover Color for Trauma and Abuse
        '#343a40',  // Hover Color for Isolation and Loneliness
        '#5a3f91'   // Hover Color for Other Contributing Factors
      ],
      hoverBorderColor: "rgba(234, 236, 244, 1)",
    }],
  },
  options: {
    maintainAspectRatio: false,
    tooltips: {
      backgroundColor: "rgb(255,255,255)",
      bodyFontColor: "#858796",
      borderColor: '#dddfeb',
      borderWidth: 1,
      xPadding: 15,
      yPadding: 15,
      displayColors: true,
      caretPadding: 10,
      callbacks: {
        label: function(tooltipItem, data) {
          var dataset = data.datasets[tooltipItem.datasetIndex];
          var total = dataset.data.reduce(function(previousValue, currentValue) {
            return previousValue + currentValue;
          }, 0);
          var currentValue = dataset.data[tooltipItem.index];
          var percentage = Math.floor(((currentValue / total) * 100) + 0.5);  // Calculate percentage
          return data.labels[tooltipItem.index] + ": " + percentage + "%";  // Return label with percentage
        }
      }
    },
    legend: {
      display: false,  // Show the legend for the labels
      position: 'right'  // Position legend to the right of the chart
    },
    cutoutPercentage: 70,  // The cutout size in the center of the donut (adjust if needed)
  },
});