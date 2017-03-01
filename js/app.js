const $alertBell = document.getElementById('alert-bell')
const $closeAlert = document.getElementById('alert-bar-close');
const $userNames = document.querySelectorAll('.registration-name');
const $nameField = document.getElementById('name');
const $messageField = document.getElementById('message');
const $sendButton = document.getElementById('send');
const $webTraffic = document.getElementById('web-traffic').getContext('2d');
const $dailyTraffic = document.getElementById('daily-traffic').getContext('2d');
const $mobileUsers = document.getElementById('mobile-users').getContext('2d');


$alertBell.addEventListener('click', function() {
  $('.alert-messages').fadeToggle('alert-messages-off');
  $('.new-alert').fadeOut();
  $('#alert-bar-close').parent().fadeOut();
});

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
  $('.search-suggestions').removeClass('search-suggestions-framing');
});

$('#name').on('focus', function() {
  $(this).select();
});

$sendButton.addEventListener('click', function() {
  let $reciever = $nameField.value;
  let $message = $messageField.value;
  let $errorMessage = "This field must contain username!"
  if($reciever === "" || $message === "") {
    if($reciever === "") {
      $nameField.value = $errorMessage;
    }
    if($message === "") {
      $messageField.value = $errorMessage;
    }
  } else {
    alert("Thank you. The message has been successfully sent to " + $reciever + "!")
  }
});

// BEGIN: Chart update (hourly, daily, weekly, montly)
function updateChart(i,y) {
  let x = $webTrafficData[i];
  $webTrafficChart.data.datasets[0].data[i] = Math.random() * y;
	$webTrafficChart.update()
}

$('#hour3').click(function() {
  $webTrafficChart.data.datasets[0].data = [0, 100, 344, 258, 254, 164, 233, 488];
  $webTrafficChart.options.scales.yAxes[0].ticks.stepSize = 250;
  $webTrafficChart.update();
});

$('#day3').click(function() {
  let i = 0;
  let y = 10000;
  let $chartLength = $webTrafficChart.data.labels.length;
  $webTrafficChart.options.scales.yAxes[0].ticks.stepSize = y / 10;
  do {
    $webTrafficChart.data.datasets[0].data[0] = 0;
    i++;
    updateChart(i,y);
  } while (i < $chartLength)
});

$('#week3').click(function() {
  let i = 0;
  let y = 100000;
  let $chartLength = $webTrafficChart.data.labels.length;
  $webTrafficChart.options.scales.yAxes[0].ticks.stepSize = y / 10;
  do {
    $webTrafficChart.data.datasets[0].data[0] = 0;
    i++;
    updateChart(i,y);
  } while (i < $chartLength)
});

$('#month3').click(function() {
  let i = 0;
  let y = 1000000;
  let $chartLength = $webTrafficChart.data.labels.length;
  $webTrafficChart.options.scales.yAxes[0].ticks.stepSize = y / 10;
  do {
    $webTrafficChart.data.datasets[0].data[0] = 0;
    i++;
    updateChart(i,y);
  } while (i < $chartLength)
});
// END: Chart update (hourly, daily, weekly, montly)

let $webTrafficData = [0, 100, 344, 258, 254, 164, 233, 488];
let $webTrafficChart = new Chart($webTraffic, {
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
        data: $webTrafficData
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
            stepSize: 250
          }
        }]
      }
    }
});

let $dailyTrafficChart = new Chart($dailyTraffic, {
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
      },
      {
        label: "Daily Traffic",
        backgroundColor: [
          'rgba(177,79,127,0.6)',
          'rgba(177,79,127,0.6)',
          'rgba(177,79,127,0.6)',
          'rgba(177,79,127,0.6)',
          'rgba(177,79,127,0.6)',
          'rgba(177,79,127,0.6)',
          'rgba(177,79,127,0.6)'
        ],
        borderColor: [
          'rgba(177,79,127,1)',
          'rgba(177,79,127,1)',
          'rgba(177,79,127,1)',
          'rgba(177,79,127,1)',
          'rgba(177,79,127,1)',
          'rgba(177,79,127,1)',
          'rgba(177,79,127,1)'
        ],
        hoverBackgroundColor: [
          'rgba(177,79,127,0.8)',
          'rgba(177,79,127,0.8)',
          'rgba(177,79,127,0.8)',
          'rgba(177,79,127,0.8)',
          'rgba(177,79,127,0.8)',
          'rgba(177,79,127,0.8)',
          'rgba(177,79,127,0.8)'
        ],
        borderWidth: 2,
        data: [326, 273, 294, 137, 384, 154, 184]
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

let $mobileUsersChart = new Chart($mobileUsers, {

  type: 'pie',
  data: {
    labels: [
      'Mobile',
      'Desktop',
      'Tablet',
      'TV',
      'Car dashboard'
    ],
    datasets: [
      {
        data: [157, 542, 384, 249, 64],
        backgroundColor: [
          'rgba(77,79,127,0.6)',
          'rgba(39,40,63,0.6)',
          'rgba(124,127,204,0.6)',
          'rgba(39,140,163,0.6)',
          'rgba(124,227,104,0.6)'
        ],
        hoverBackgroundColor: [
          'rgba(77,79,127,0.8)',
          'rgba(39,40,63,0.8)',
          'rgba(124,127,204,0.8)',
          'rgba(39,140,163,0.8)',
          'rgba(124,227,104,0.8)'
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
