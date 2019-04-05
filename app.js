window.addEventListener('DOMContentLoaded', function(event) {
  console.log('DOM fully loaded and parsed');

  //DOM variables
  const playSvg = document.querySelector('.play');
  const pauseSvg = document.querySelector('.pause');
  const playPauseBtn = document.querySelector('.play-pause-btn');
  const videoBg = document.querySelector('.default-bg');
  const song = document.querySelector('.song');
  const changeBgBtns = document.querySelectorAll('.sound-picker button');


  let play = false;
  let videoSrc; //Later change this variable thought button press
  let audioSrc; //Later change this variable thought button press

  //Functions
  function playerHandler() {
    if (!play) {
      //Change logic and change the play icon to pause
      play = true;
      playSvg.style.display = 'none';
      pauseSvg.style.display = 'flex';
      
      song.play();
      videoBg.play();
    //Stop video from playing
    } else {
      //Change logic and change the pause icon to play
      play = false;
      playSvg.style.display = 'flex';
      pauseSvg.style.display = 'none';

      song.pause();
      videoBg.pause();
    }
  }
  //JS Events
  playPauseBtn.addEventListener('click', function() {
    playerHandler();
  });

  //Change Bg and Audio Event
  changeBgBtns.forEach(bgOption => {
    bgOption.onclick = function () {
      //Get the video URL
      videoSrc = bgOption.getAttribute('data-video');
      //Set video URL
      videoBg.firstElementChild.setAttribute('src', videoSrc);
      //Get audio URL
      audioSrc = (this.getAttribute('data-sound'));
      //Set audio URL
      song.firstElementChild.setAttribute('src', audioSrc);
      //Load audio and video
      videoBg.load();
      song.load();
      //Stops execution if it's playing
      if (play === true) {
        playerHandler();
      }
    }
  })

});
