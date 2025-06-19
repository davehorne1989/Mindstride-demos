// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';

function number_format(number, decimals, dec_point, thousands_sep) {
  // *     example: number_format(1234.56, 2, ',', ' ');
  // *     return: '1 234,56'
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
  // Fix for IE parseFloat(0.55).toFixed(0) = 0;
  s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
  if (s[0].length > 3) {
    s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
  }
  if ((s[1] || '').length < prec) {
    s[1] = s[1] || '';
    s[1] += new Array(prec - s[1].length + 1).join('0');
  }
  return s.join(dec);
}

// Initialize chart after DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  var ctx = document.getElementById("myAreaChart");
  if (!ctx) return;

  var myLineChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ["Depression", "Bipolar", "Anxiety", "Social Phobia"],
      datasets: [
        {
          label: "2012",
          backgroundColor: "rgba(78, 115, 223, 0.9)",
          hoverBackgroundColor: "rgba(78, 115, 223, 1)",
          borderColor: "rgba(78, 115, 223, 1)",
          data: [4.5, 1.5, 2.5, 3.0],
          barPercentage: 0.8,
          categoryPercentage: 0.9
        },
        {
          label: "2022",
          backgroundColor: "rgba(75, 192, 192, 0.9)",
          hoverBackgroundColor: "rgba(75, 192, 192, 1)",
          borderColor: "rgba(75, 192, 192, 1)",
          data: [7.5, 2.0, 5.0, 7.0],
          barPercentage: 0.8,
          categoryPercentage: 0.9
        }
      ]
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
            maxTicksLimit: 7
          }
        }],
        yAxes: [{
          ticks: {
            min: 0,
            max: 10,
            maxTicksLimit: 5,
            padding: 10,
            callback: function(value, index, values) {
              return number_format(value, 1) + '%';
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
        display: true,
        position: 'top'
      },
      tooltips: {
        titleMarginBottom: 10,
        titleFontColor: '#6e707e',
        titleFontSize: 14,
        backgroundColor: "rgb(255,255,255)",
        bodyFontColor: "#858796",
        borderColor: '#dddfeb',
        borderWidth: 1,
        xPadding: 15,
        yPadding: 15,
        displayColors: true,
        caretPadding: 10,
        callbacks: {
          label: function(tooltipItem, chart) {
            var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
            return datasetLabel + ': ' + number_format(tooltipItem.yLabel, 1) + '%';
          }
        }
      }
    }
  });
});