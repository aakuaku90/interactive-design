document.getElementById('contact-form').addEventListener('submit', function (e) {
  e.preventDefault();

  var name = document.getElementById('name').value.trim();
  var email = document.getElementById('email').value.trim();
  var message = document.getElementById('message').value.trim();

  if (!name || !email || !message) {
    alert('Please fill all fields');
    return;
  }

  // No loading indicator, no disabled state — user gets zero feedback
  setTimeout(function () {
    document.getElementById('done-message').textContent = 'Done.';
  }, 4000);
});
