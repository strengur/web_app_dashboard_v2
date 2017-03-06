var $alertBell = document.getElementById('alert-bell');
var $closeAlert = document.getElementById('alert-bar-close');
var $userNames = document.querySelectorAll('.registration-name');
var $nameField = document.getElementById('name');
var $messageField = document.getElementById('message');
var $sendButton = document.getElementById('send');
var $webTraffic = document.getElementById('web-traffic').getContext('2d');
var $dailyTraffic = document.getElementById('daily-traffic').getContext('2d');
var $mobileUsers = document.getElementById('mobile-users').getContext('2d');

var $emailSettings = document.getElementById('email-settings');
var $profileSettings = document.getElementById('profile-settings');
var $timeZoneSettings = document.getElementById('timezone');

var $saveButton = document.getElementById('save');

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
var $searchField = $('#name');
function isSearchPresent() {
  return $searchField.val().length <= 0;
}

function searchUser() {
    var $usersArray = [];
    var $searchString = $searchField.val().toLowerCase();
    if(!isSearchPresent()) {
    for (var i=0; i < $userNames.length; ++i) {
      if($userNames[i].innerText.toLowerCase().includes($searchString)) { //&& !$userNames[i].innerText.replace(/\s/g,"") == "") {
        $usersArray.push($userNames[i].innerText);
      }
    }
    $('.search-suggestions').addClass('search-suggestions-framing');
    $('.search-suggestions ul').empty();
    if($usersArray.length > 0) {
      for (var x = 0; x < $usersArray.length; ++x) {
        $('.search-suggestions ul').append('<li><p>' + $usersArray[x] + '</p></li>');
      }
    }
  } else {
    $('.search-suggestions ul').empty();
    $('.search-suggestions').removeClass('search-suggestions-framing');
  }
}

$searchField.keyup(searchUser);

$('.search-suggestions').on('click', 'li', function() {
  var $nameSelection = $(this).text();
  $nameField.value = $nameSelection;
  $('.search-suggestions ul').empty();
  $('.search-suggestions').removeClass('search-suggestions-framing');
});

$('#name').on('focus', function() {
  $(this).select();
});

$sendButton.addEventListener('click', function() {
  var $reciever = $nameField.value;
  var $message = $messageField.value;
  var $errorMessage = "* This field can't be empty!";
  if($reciever === "" || $message === "") {
    if($reciever === "") {
      document.getElementById('user-error-message').innerHTML = $errorMessage;
    } else {
      document.getElementById('user-error-message').innerHTML = "";
    }
    if($message === "") {
      document.getElementById('message-error-message').innerHTML = $errorMessage;
    } else {
      document.getElementById('message-error-message').innerHTML = "";
    }
  } else {
    document.getElementById('user-error-message').innerHTML = "";
    document.getElementById('message-error-message').innerHTML = "";
    alert("Thank you. The message has been successfully sent to " + $reciever + "!");
  }
});

// BEGIN: Chart update (hourly, daily, weekly, montly)
function updateChart(i,y) {
  $webTrafficChart.data.datasets[0].data[i] = Math.random() * y;
	$webTrafficChart.update();
}

$('#hour3').click(function() {
  $webTrafficChart.data.datasets[0].data = [0, 100, 344, 258, 254, 164, 233, 488];
  $webTrafficChart.options.scales.yAxes[0].ticks.stepSize = 250;
  $webTrafficChart.update();
});

$('#day3').click(function() {
  var i = 0;
  var y = 10000;
  var $chartLength = $webTrafficChart.data.labels.length;
  $webTrafficChart.options.scales.yAxes[0].ticks.stepSize = y / 10;
  do {
    $webTrafficChart.data.datasets[0].data[0] = 0;
    i++;
    updateChart(i,y);
  } while (i < $chartLength);
});

$('#week3').click(function() {
  var i = 0;
  var y = 100000;
  var $chartLength = $webTrafficChart.data.labels.length;
  $webTrafficChart.options.scales.yAxes[0].ticks.stepSize = y / 10;
  do {
    $webTrafficChart.data.datasets[0].data[0] = 0;
    i++;
    updateChart(i,y);
  } while (i < $chartLength);
});

$('#month3').click(function() {
  var i = 0;
  var y = 1000000;
  var $chartLength = $webTrafficChart.data.labels.length;
  $webTrafficChart.options.scales.yAxes[0].ticks.stepSize = y / 10;
  do {
    $webTrafficChart.data.datasets[0].data[0] = 0;
    i++;
    updateChart(i,y);
  } while (i < $chartLength);
});
// END: Chart update (hourly, daily, weekly, montly).

// BEGIN: Saving settings for the page in local storage.
// When page is loaded it needs to check if local storage is present.
$(document).ready(function() {
  // Check if one of stored settings are present to avoid error in JS console.
  if (localStorage.sendEmailNotification || localStorage.setProfileToPublic || localStorage.timeZone) {
    // If local storage is present, make adjustments to the settings.
    var $updateEmailSettings = JSON.parse(localStorage.sendEmailNotification);
    var $updateProfileSettings = JSON.parse(localStorage.setProfileToPublic);
    var $updateTimeZone = localStorage.timeZone;
    $emailSettings.checked = $updateEmailSettings;
    $profileSettings.checked = $updateProfileSettings;
    $timeZoneSettings[$updateTimeZone].selected = true;
  }
});


// When clicked on Save button settings needs to be stored in a local storage.
// Save selected settings to local storage.
$saveButton.addEventListener('click', function() {
  // Check if localstorage is enabled.
  if(window.localStorage) {
  // If local storage is present, add these settings to local storage.
    // Collect information about the email, profile and timezone to use for stored settings.
    var $emailStatus = $emailSettings.checked;
    var $profileStatus = $profileSettings.checked;
    var $timeZoneIndex = $timeZoneSettings.selectedOptions[0].index;
    var $locationPath = window.location.pathname;
    // Update/create local storage with collected information.
    localStorage.setItem('sendEmailNotification', $emailStatus);
    localStorage.setItem('setProfileToPublic', $profileStatus);
    localStorage.setItem('timeZone', $timeZoneIndex);
    localStorage.setItem('locationPath', $locationPath);
    // Display message for successful saving of settings.
    alert('Settings has been saved!');
  }
});
// END: Saving settings for the page in local storage.

// BEGIN: Charts

var $webTrafficData = [0, 100, 344, 258, 254, 164, 233, 488];
var $webTrafficChart = new Chart($webTraffic, {
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

var $dailyTrafficChart = new Chart($dailyTraffic, {
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

var $mobileUsersChart = new Chart($mobileUsers, {

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

// END: Charts
