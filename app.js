window.addEventListener('DOMContentLoaded', function(event) {
  console.log('DOM fully loaded and parsed');

  //DOM variables
  const playSvg = document.querySelector('.play');
  const pauseSvg = document.querySelector('.pause');
  const playPauseBtn = document.querySelector('.play-pause-btn');
  const videoBg = document.querySelector('.default-bg');
  const changeBgBtns = document.querySelectorAll('.sound-picker button');


  let play = false;
  let videoSrc = videoBg.firstElementChild.getAttribute('src');
  console.log(videoSrc);

  //Functions
  function playerHandler() {
    if (!play) {
      //Change logic and change the play icon to pause
      play = true;
      playSvg.style.display = 'none';
      pauseSvg.style.display = 'flex';
      
      videoBg.play();
    //Stop video from playing
    } else {
      //Change logic and change the pause icon to play
      play = false;
      playSvg.style.display = 'flex';
      pauseSvg.style.display = 'none';

      videoBg.pause();
    }
  }
  //JS Events
  playPauseBtn.addEventListener('click', function() {
    playerHandler();
  });

  changeBgBtns.forEach(bgOption => {
    bgOption.onclick = function () {
      //Get the video URL
      videoSrc = bgOption.getAttribute('data-video');
      videoBg.firstElementChild.setAttribute('src', videoSrc);
      //Load the video
      videoBg.load();
      //Stops execution if it's playing
      if (play === true) {
        playerHandler();
      }
    }
  })
});
