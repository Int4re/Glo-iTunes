import addZero from './supScript.js';

export default () => {
  const videoPlayer = document.querySelector('.video-player');
  const videoButtonPlay = document.querySelector('.video-button__play');
  const videoButtonStop = document.querySelector('.video-button__stop');
  const videoProgress = document.querySelector('.video-progress');
  const videoTimePassed = document.querySelector('.video-time__passed');
  const videoTimeTotal = document.querySelector('.video-time__total');

  const toggleIcon = () => {
    if (videoPlayer.paused) {
      videoButtonPlay.classList.remove('fa-pause');
      videoButtonPlay.classList.add('fa-play');
    } else {
      videoButtonPlay.classList.add('fa-pause');
      videoButtonPlay.classList.remove('fa-play');
    }
  };

  const togglePlay = () => {
    if (videoPlayer.paused) {
      videoPlayer.play();
    } else {
      videoPlayer.pause();
    }
    toggleIcon();
  };

  const stopPlay = () => {
    videoPlayer.pause();
    videoPlayer.currentTime = 0;
    toggleIcon();
  };

  videoPlayer.addEventListener('click', togglePlay);
  videoButtonPlay.addEventListener('click', togglePlay);

  videoPlayer.addEventListener('play', toggleIcon);
  videoPlayer.addEventListener('stop', toggleIcon);

  videoButtonStop.addEventListener('click', stopPlay);

  videoPlayer.addEventListener('timeupdate', () => {
    const { currentTime } = videoPlayer;
    const { duration } = videoPlayer;

    const minutesPassed = addZero(Math.floor(currentTime / 60));
    const secondsPassed = addZero(Math.floor(currentTime % 60));

    const minutesTotal = addZero(Math.floor(duration / 60));
    const secondsTotal = addZero(Math.floor(duration % 60));

    videoProgress.value = (currentTime / duration) * 100;

    videoTimePassed.textContent = `${minutesPassed}:${secondsPassed}`;
    videoTimeTotal.textContent = `${minutesTotal}:${secondsTotal}`;
  });

  videoProgress.addEventListener('change', () => {
    const { duration } = videoPlayer;
    const { value } = videoProgress;

    videoPlayer.currentTime = (value * duration) / 100;
  });
};
