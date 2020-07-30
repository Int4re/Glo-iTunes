export default () => {
  const radio = document.querySelector('.radio');
  const radioCoverImg = document.querySelector('.radio-cover__img');
  const radioHeaderBig = document.querySelector('.radio-header__big');
  const radioNavigation = document.querySelector('.radio-navigation');
  const radioItem = document.querySelectorAll('.radio-item');
  const radioStop = document.querySelector('.radio-stop');
  const audio = new Audio();

  audio.type = 'audio/aac';
  radioStop.disabled = true;

  const changeIconPlay = () => {
    if (audio.paused) {
      radio.classList.remove('play');
      radioStop.classList.add('fa-play');
      radioStop.classList.remove('fa-stop');
    } else {
      radio.classList.add('play');
      radioStop.classList.remove('fa-play');
      radioStop.classList.add('fa-stop');
    }
  };

  const selectItem = (el) => {
    radioItem.forEach((item) => item.classList.remove('select'));
    el.classList.add('select');
  };

  radioNavigation.addEventListener('change', (event) => {
    const { target } = event;
    const parent = target.closest('.radio-item');
    const title = parent.querySelector('.radio-name').textContent;
    const img = parent.querySelector('.radio-img').src;

    radioCoverImg.src = img;
    radioHeaderBig.textContent = title;
    selectItem(parent);
    radioStop.disabled = false;
    audio.src = target.dataset.radioStantion;
    audio.play();
    changeIconPlay();
  });

  radioStop.addEventListener('click', () => {
    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
    }
    changeIconPlay();
  });
};
