var closeAlert = document.getElementById('alert-bar-close');

closeAlert.addEventListener('click', function() {
  $(this).parent().fadeOut();
  $('.new-alert').fadeOut();
});
