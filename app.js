window.addEventListener('DOMContentLoaded', function(event) {
  console.log('DOM fully loaded and parsed');

  //DOM variables
  const playSvg = document.querySelector('.play');
  const pauseSvg = document.querySelector('.pause');
  const playPauseBtn = document.querySelector('.play-pause-btn');

  let play = false;

  playPauseBtn.addEventListener('click', function() {
    if (!play) {
      play = true;
      playSvg.style.display = 'none';
      pauseSvg.style.display = 'flex';
    } else {
      play = false;
      playSvg.style.display = 'flex';
      pauseSvg.style.display = 'none';
    }
  });
});
