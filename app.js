window.addEventListener('DOMContentLoaded', function(event) {
  console.log('DOM fully loaded and parsed');
  console.log(event);
  const soundPicker = document.querySelector('.sound-picker');

  soundPicker.addEventListener('click', () => {
    alert('I was clicked');
  })
});
