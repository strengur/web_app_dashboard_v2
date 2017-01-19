var $closeAlert = document.getElementById('alert-bar-close');
var $webTraffic = document.getElementById('web-traffic').getContext("2d");

$closeAlert.addEventListener('click', function() {
  $(this).parent().fadeOut();
  $('.new-alert').fadeOut();
});


var $webTrafficChart = new Chart($webTraffic, {
    type: 'line',
    data: {
      labels: ["16-22", "23-29", "30-36", "37-43", "44-50", "51-57", "58-64"],

      datasets: [{
        //label: 'Web Traffic',
        fill: true,
        lineTension: 0,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        pointBorderColor: "rgba(75,192,192,1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 2,
        pointHoverRadius: 10,
        pointHoverBackgroundColor: "rgba(75,192,192,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 10,
        pointHitRadius: 10,
        data: [2003, 1344, 3458, 3524, 2647, 3633, 1488]
      }]
    },
    options: {
      responsive: true,
      layout: {
        padding: 30
      },
      title: {
        display: true,
        text: 'Custom Chart Title'
      },
      scales: {
        xAxes: [{
          gridLines: {
            offsetGridLines: true
          },
          display: true,
          ticks: {
            beginAtZero: true,
            autoSkipPadding: 1
          }
        }],
        yAxes: [{
          gridLines: {
            offsetGridLines: true
          },
          ticks: {
            beginAtZero: true,
            stepSize: 500
          }
        }]
      }
    }
});
