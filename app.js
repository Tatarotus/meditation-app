window.addEventListener('DOMContentLoaded', function(event) {
  console.log('DOM fully loaded and parsed');

  //DOM variables
  const playSvg = document.querySelector('.play');
  const pauseSvg = document.querySelector('.pause');
  const playPauseBtn = document.querySelector('.play-pause-btn');
  const videoBg = document.querySelector('.default-bg');
  const song = document.querySelector('.song');
  const changeBgBtns = document.querySelectorAll('.sound-picker button');
  const time = document.querySelector('.time');
  const durationBtns = document.querySelectorAll('.time-select button');

  let duration = 120;
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
    bgOption.onclick = function() {
      //Get the video URL
      videoSrc = bgOption.getAttribute('data-video');
      //Set video URL
      videoBg.firstElementChild.setAttribute('src', videoSrc);
      //Get audio URL
      audioSrc = this.getAttribute('data-sound');
      //Set audio URL
      song.firstElementChild.setAttribute('src', audioSrc);
      //Load audio and video
      videoBg.load();
      song.load();
      //Stops execution if it's playing
      if (play === true) {
        playerHandler();
      }
    };
  });

  function updateTimer() {
    let remainingTime = duration - song.currentTime;
    let min = ~~((remainingTime % 3600) / 60);
    let secs = ~~(remainingTime % 60);
    console.log(min, secs);
    if (remainingTime > 0) {
      time.innerHTML = `${min}:${secs}`;
      //#1 checks if it is more than 1 min and adds a leading 0 if seconds is less than 10
      //#2 checks if it is less than 1 (there is no minute = 0) and only displays seconds
      //#3 if it's more than one minute and more than 10 seconds display time normaly
      time.innerHTML = min >=1 && secs < 10 ? min + ':0' + secs : min === 0 ? secs : `${min}:${secs}`;
    } else {
      videoBg.load();
      song.load();
      playerHandler();
      stop();
    }
  }
  //Get the time left
  song.addEventListener('timeupdate', () => {
    updateTimer();
  });

  durationBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      let newDuration = parseInt(btn.getAttribute('data-time'));

      switch (newDuration) {
        case 120:
          duration = newDuration;
          break;
        case 300:
          duration = newDuration;
          break;
        case 600:
          duration = newDuration;
          break;
      }
    });
  });
});
