const $closeAlert = document.getElementById('alert-bar-close');
const $userNames = document.querySelectorAll('.registration-name');
const $nameField = document.getElementById('name');
const $webTraffic = document.getElementById('web-traffic').getContext('2d');
const $dailyTraffic = document.getElementById('daily-traffic').getContext('2d');
const $mobileUsers = document.getElementById('mobile-users').getContext('2d');

$closeAlert.addEventListener('click', function() {
  $(this).parent().fadeOut();
  $('.new-alert').fadeOut();
});

// Message live Search function
const $searchField = $('#name');
function isSearchPresent() {
  return $searchField.val().length <= 0;
}

function searchUser() {
    let $usersArray = [];
    let $searchString = $searchField.val().toLowerCase();
    if(!isSearchPresent()) {
    for (let i=0; i < $userNames.length; ++i) {
      if($userNames[i].innerText.toLowerCase().includes($searchString)) { //&& !$userNames[i].innerText.replace(/\s/g,"") == "") {
        $usersArray.push($userNames[i].innerText);
      }
    }
    $('.search-suggestions').addClass('search-suggestions-framing');
    $('.search-suggestions ul').empty();
    if($usersArray.length > 0) {
      for (let i = 0; i < $usersArray.length; ++i) {
        $('.search-suggestions ul').append('<li><p>' + $usersArray[i] + '</p></li>');
      }
    }
  } else {
    $('.search-suggestions ul').empty();
    $('.search-suggestions').removeClass('search-suggestions-framing');
  }
}

$searchField.keyup(searchUser);

$('.search-suggestions').on('click', 'li', function() {
  let $nameSelection = $(this).text();
  $nameField.value = $nameSelection;
  $('.search-suggestions ul').empty();
});

$('#name').on('focus', function() {
  $(this).select();
});

const $webTrafficChart = new Chart($webTraffic, {
    type: 'line',
    data: {
      labels: ["", "16-22", "23-29", "30-36", "37-43", "44-50", "51-57", "58-64"],
      datasets: [{
        //label: 'Web Traffic',
        fill: true,
        lineTension: 0,
        backgroundColor: "rgba(77,79,127,0.6)",
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

const $dailyTrafficChart = new Chart($dailyTraffic, {
  type: 'bar',
  data: {
    labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
    datasets: [
      {
        label: "Daily Traffic",
        backgroundColor: [
          'rgba(77,79,127,0.6)',
          'rgba(77,79,127,0.6)',
          'rgba(77,79,127,0.6)',
          'rgba(77,79,127,0.6)',
          'rgba(77,79,127,0.6)',
          'rgba(77,79,127,0.6)',
          'rgba(77,79,127,0.6)'
        ],
        borderColor: [
          'rgba(77,79,127,1)',
          'rgba(77,79,127,1)',
          'rgba(77,79,127,1)',
          'rgba(77,79,127,1)',
          'rgba(77,79,127,1)',
          'rgba(77,79,127,1)',
          'rgba(77,79,127,1)'
        ],
        hoverBackgroundColor: [
          'rgba(77,79,127,0.8)',
          'rgba(77,79,127,0.8)',
          'rgba(77,79,127,0.8)',
          'rgba(77,79,127,0.8)',
          'rgba(77,79,127,0.8)',
          'rgba(77,79,127,0.8)',
          'rgba(77,79,127,0.8)'
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

const $mobileUsersChart = new Chart($mobileUsers, {

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
          'rgba(77,79,127,0.6)',
          'rgba(39,40,63,0.6)',
          'rgba(124,127,204,0.6)'
        ],
        hoverBackgroundColor: [
          'rgba(77,79,127,0.8)',
          'rgba(39,40,63,0.8)',
          'rgba(124,127,204,0.8)'
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
