// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';

function number_format(number, decimals, dec_point, thousands_sep) {
  number = (number + '').replace(',', '').replace(' ', '');
  var n = !isFinite(+number) ? 0 : +number,
    prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
    sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
    dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
    s = '',
    toFixedFix = function(n, prec) {
      var k = Math.pow(10, prec);
      return '' + Math.round(n * k) / k;
    };
  s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
  if (s[0].length > 3) {
    s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
  }
  if ((s[1] || '').length < prec) {
    s[1] += new Array(prec - s[1].length + 1).join('0');
  }
  return s.join(dec);
}

// Bar Chart Example
var ctx = document.getElementById("myAreaChart");
var myBarChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ["Depression", "Bipolar", "Anxiety", "Social Phobia"],
    datasets: [
      {
        label: "2012",
        backgroundColor: "rgba(78, 115, 223, 0.8)", // Color for 2012
        hoverBackgroundColor: "rgba(78, 115, 223, 1)",
        borderColor: "rgba(78, 115, 223, 1)",
        data: [4.5, 1.5, 2.5, 3], // Data for 2012
      },
      {
        label: "2022",
        backgroundColor: "rgba(28, 200, 138, 0.8)", // Color for 2022
        hoverBackgroundColor: "rgba(28, 200, 138, 1)",
        borderColor: "rgba(28, 200, 138, 1)",
        data: [7.5, 2.1, 5.1, 7.1], // Data for 2022
      }
    ],
  },
  options: {
    maintainAspectRatio: false,
    layout: {
      padding: {
        left: 10,
        right: 25,
        top: 25,
        bottom: 0
      }
    },
    scales: {
      xAxes: [{
        gridLines: {
          display: false,
          drawBorder: false
        },
        ticks: {
          maxTicksLimit: 6
        },
        maxBarThickness: 50, // Controls bar width
      }],
      yAxes: [{
        ticks: {
          min: 0,
          max: 10, // Adjust the y-axis maximum to fit your data
          padding: 10,
          callback: function(value) {
            return number_format(value) + '%'; // Show percentage on y-axis
          }
        },
        gridLines: {
          color: "rgb(234, 236, 244)",
          zeroLineColor: "rgb(234, 236, 244)",
          drawBorder: false,
          borderDash: [2],
          zeroLineBorderDash: [2]
        }
      }],
    },
    legend: {
      display: true, // Show the legend for 2012 and 2022
      position: 'top',
    },
    tooltips: {
      backgroundColor: "rgb(255,255,255)",
      bodyFontColor: "#858796",
      titleMarginBottom: 10,
      titleFontColor: '#6e707e',
      titleFontSize: 14,
      borderColor: '#dddfeb',
      borderWidth: 1,
      xPadding: 15,
      yPadding: 15,
      displayColors: true,
      caretPadding: 10,
      callbacks: {
        label: function(tooltipItem, chart) {
          var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
          var value = chart.datasets[tooltipItem.datasetIndex].data[tooltipItem.index]; // Use value instead of yLabel
          
          // Add a check to ensure value is valid
          if (typeof value === 'undefined' || value === null || isNaN(value)) {
            return datasetLabel + ': N/A'; // Handle invalid value
          }
          
          return datasetLabel + ': ' + number_format(value, 1) + '%';
        }
      }
    }
  }
});