var $closeAlert = document.getElementById('alert-bar-close');
var $webTraffic = document.getElementById('web-traffic').getContext('2d');
var $dailyTraffic = document.getElementById('daily-traffic').getContext('2d');
var $mobileUsers = document.getElementById('mobile-users').getContext('2d');

$closeAlert.addEventListener('click', function() {
  $(this).parent().fadeOut();
  $('.new-alert').fadeOut();
});

var $webTrafficChart = new Chart($webTraffic, {
    type: 'line',
    data: {
      labels: ["", "16-22", "23-29", "30-36", "37-43", "44-50", "51-57", "58-64"],
      datasets: [{
        //label: 'Web Traffic',
        fill: true,
        lineTension: 0,
        backgroundColor: "rgba(77,79,127,0.4)",
        borderColor: "rgba(77,79,127,1)",
        pointBorderColor: "rgba(77,79,127,1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 2,
        pointHoverRadius: 10,
        pointHoverBackgroundColor: "rgba(77,79,127,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 5,
        pointHitRadius: 5,
        data: [0, 1003, 1344, 2458, 2524, 1647, 2633, 1488]
      }]
    },
    options: {
      responsive: true,
      legend: {
        display: false
      },
      title: {
        display: true,
        text: 'Web Traffic',
        fontSize: 18,
        fontStyle: 'normal'
      },
      scales: {
        xAxes: [{
          gridLines: {
            offsetGridLines: false
          },
          display: true,
          ticks: {
            beginAtZero: true,
          }
        }],
        yAxes: [{
          gridLines: {
            offsetGridLines: false
          },
          ticks: {
            beginAtZero: true,
            stepSize: 500
          }
        }]
      }
    }
});

var $dailyTrafficChart = new Chart($dailyTraffic, {
  type: 'bar',
  data: {
    labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
    datasets: [
      {
        label: "Daily Traffic",
        backgroundColor: [
          'rgba(191,176,116,0.4)',
          'rgba(191,176,116,0.4)',
          'rgba(191,176,116,0.4)',
          'rgba(191,176,116,0.4)',
          'rgba(191,176,116,0.4)',
          'rgba(191,176,116,0.4)',
          'rgba(191,176,116,0.4)'
        ],
        borderColor: [
          'rgba(191,176,116,1)',
          'rgba(191,176,116,1)',
          'rgba(191,176,116,1)',
          'rgba(191,176,116,1)',
          'rgba(191,176,116,1)',
          'rgba(191,176,116,1)',
          'rgba(191,176,116,1)'
        ],
        hoverBackgroundColor: [
          'rgba(191,176,116,0.6)',
          'rgba(191,176,116,0.6)',
          'rgba(191,176,116,0.6)',
          'rgba(191,176,116,0.6)',
          'rgba(191,176,116,0.6)',
          'rgba(191,176,116,0.6)',
          'rgba(191,176,116,0.6)'
        ],
        borderWidth: 2,
        data: [226, 283, 234, 237, 223, 254, 264]
      }
    ]
  },
  options: {
    responsive: true,
    maintainAspectRatio: true,
    layout: {
      padding: 30
    },
    legend: {
      display: false
    },
    title: {
      display: true,
      text: 'Daily Traffic',
      fontSize: 18,
      fontStyle: 'normal'
    },
    yAxes: [{
      gridLines: {
        offsetGridLines: false
      },
      ticks: {
        stepSize: 5
      }
    }]
  }
});

var $mobileUsersChart = new Chart($mobileUsers, {

  type: 'pie',
  data: {
    labels: [
      'Mobile',
      'Desktop',
      'Tablet'
    ],
    datasets: [
      {
        data: [157, 542, 384],
        backgroundColor: [
          'rgba(77,79,127,0.7)',
          'rgba(202,161,143,0.7)',
          'rgba(91,140,71,0.7)'
        ],
        hoverBackgroundColor: [
          'rgba(77,79,127,1)',
          'rgba(202,161,143,1)',
          'rgba(91,140,71,1)'
        ]
      }
    ]
  },
  options: {
    responsive: true,
    cutoutPercentage: 50,
    rotation: -0.2 * Math.PI,
    layout: {
      padding: 0
    },

    title: {
      display: true,
      text: 'Mobile Users',
      fontSize: 18,
      fontStyle: 'normal'
    },

    legend: {
      position: 'right',
      fullWidth: true,
      labels: {
        boxWidth: 20,
        fontSize: 16
      }
    }
  }
});
