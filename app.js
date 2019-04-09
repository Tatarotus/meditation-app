window.addEventListener('DOMContentLoaded', function(event) {
  //DOM variables
  const playSvg = document.querySelector('.play');
  const pauseSvg = document.querySelector('.pause');
  const playPauseBtn = document.querySelector('.play-pause-btn');
  const outline = document.querySelector('.moving-outline circle');
  const videoBg = document.querySelector('.default-bg');
  const song = document.querySelector('.song');
  const changeBgBtns = document.querySelectorAll('.sound-picker button');
  const time = document.querySelector('.time');
  const durationBtns = document.querySelectorAll('.time-select button');

  const outlineLength = outline.getTotalLength();

  let duration = 60;
  let play = false;
  let videoSrc; //Later change this variable thought button press
  let audioSrc; //Later change this variable thought button press

  //Set the progress "blue circle" to 0;
  outline.style.strokeDasharray = outlineLength;
  outline.style.strokeDashoffset = outlineLength;

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

  document.addEventListener('keyup', e => {
    if (e.keyCode === 13 || e.keyCode === 32) {
      playerHandler();
    }
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

  // Get the time left and animate the progress bar "blue circle"
  song.ontimeupdate = () => {
    let remainingTime = duration - song.currentTime;
    let min = ~~((remainingTime % 3600) / 60);
    let secs = ~~(remainingTime % 60);
    if (remainingTime > 0) {
      time.innerHTML = `${min}:${secs}`;
      //#1 checks if it is more than 1 min and adds a leading 0 if seconds is less than 10
      //#2 checks if it is less than 1 (there is no minute = 0) and only displays seconds
      //#3 if it's more than one minute and more than 10 seconds display time normaly
      time.innerHTML =
        min >= 1 && secs < 10
          ? min + ':0' + secs
          : min === 0
          ? secs
          : `${min}:${secs}`;
    } else {
      videoBg.load();
      song.load();
      playerHandler();
    }

    // Animate the circle offset
    let progress =
      outlineLength - (song.currentTime / duration) * outlineLength;
    outline.style.strokeDashoffset = progress;
  };

  durationBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      let newDuration = parseInt(btn.getAttribute('data-time'));
      duration = newDuration;
    });
  });
});
