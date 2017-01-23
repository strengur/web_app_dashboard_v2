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
        pointRadius: 5,
        pointHitRadius: 5,
        data: [1003, 344, 2458, 2524, 1647, 2633, 488]
      }]
    },
    options: {
      responsive: true,
      legend: {
        display: false
      },
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

var $dailyTrafficChart = new Chart($dailyTraffic, {
  type: 'bar',
  data: {
    labels: ['Monday', 'Thuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    datasets: [
      {
        label: "Daily Traffic",
        backgroundColor: [
          'rgba(252, 64, 23, 0.4)',
          'rgba(25, 164, 123, 0.4)',
          'rgba(12, 4, 223, 0.4)',
          'rgba(22, 224, 243, 0.4)',
          'rgba(111, 33, 189, 0.4)',
          'rgba(252, 64, 87, 0.4)',
          'rgba(1, 76, 23, 0.4)'
        ],
        borderColor: [
          'rgba(252, 64, 23, 1)',
          'rgba(25, 164, 123, 1)',
          'rgba(12, 4, 223, 1)',
          'rgba(22, 224, 243, 1)',
          'rgba(111, 33, 189, 1)',
          'rgba(252, 64, 87, 1)',
          'rgba(1, 76, 23, 1)'
        ],
        hoverBackgroundColor: [
          'rgba(252, 64, 23, 0.6)',
          'rgba(25, 164, 123, 0.6)',
          'rgba(12, 4, 223, 0.6)',
          'rgba(22, 224, 243, 0.6)',
          'rgba(111, 33, 189, 0.6)',
          'rgba(252, 64, 87, 0.6)',
          'rgba(1, 76, 23, 0.6)'
        ],
        borderWidth: 2,
        data: [226, 283, 234, 237, 223, 254, 264]
      }
    ]
  },
  options: {
    responsive: true,
    layout: {
      padding: 30
    },
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
        data: [457, 542, 384],
        backgroundColor: [
          '#2f45f3',
          '#ff53cd',
          '#cd8dc8'
        ]
      }
    ]
  },
  options: {
    responsive: true,
    cutoutPercentage: 50,
    layout: {
      padding: 30
    }
  }
});
