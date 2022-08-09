const alarm = new Audio('./sounds/alarm.mp3')
const forestBg = new Audio('./sounds/forest.wav')
const cafeBg = new Audio('./sounds/cafe.wav')
const rainBg = new Audio('./sounds/rain.wav')
const fireplaceBg = new Audio('./sounds/fireplace.wav')

const forestBtn = document.querySelector('.forestButton')
const cafeBtn = document.querySelector('.cafeButton')
const rainBtn = document.querySelector('.rainButton')
const fireplaceBtn = document.querySelector('.fireplaceButton')

const forest = document.querySelector('.forest')
const rain = document.querySelector('.rain')
const fireplace = document.querySelector('.fire')
const cafe = document.querySelector('.cafe')

const timerDisplay = document.querySelector('.timer')
let hrDisplay = document.querySelector('.timer .hour .hr')
let minDisplay = document.querySelector('.timer .minute .min')
let secDisplay = document.querySelector('.timer .second .sec')

let hourUp = document.querySelector('.timer .hour .hour-up')
let hourDown = document.querySelector('.timer .hour .hour-down')
let minUp = document.querySelector('.timer .minute .min-up')
let minDown = document.querySelector('.timer .minute .min-down')
let secUp = document.querySelector('.timer .second .sec-up')
let secDown = document.querySelector('.timer .second .sec-down')

const buttonPlay = document.querySelector('.play')
const buttonPause = document.querySelector('.pause')
const buttonStop = document.querySelector('.stop')
const buttonSet = document.querySelector('.set')
const buttonSetPlus = document.querySelector('.setPlus')
const buttonSetMinus = document.querySelector('.setMinus')

let hours
let minutes
let seconds
let timerTimeout


// Event Listeners
buttonPlay.addEventListener('click', countdown)
buttonPause.addEventListener('click', pause)
buttonStop.addEventListener('click', stop)
buttonSet.addEventListener('click', setTime)
buttonSetPlus.addEventListener('click', addFive)
buttonSetMinus.addEventListener('click', subFive)

hourUp.addEventListener('click', hrUp)
hourDown.addEventListener('click', hrDown)
minUp.addEventListener('click', mnUp)
minDown.addEventListener('click', mnDown)
secUp.addEventListener('click', scUp)
secDown.addEventListener('click', scDown)

hrDisplay.addEventListener('wheel', hrUp)
minDisplay.addEventListener('wheel', mnUp)
secDisplay.addEventListener('wheel', scUp)

hrDisplay.disabled = true
minDisplay.disabled = true
secDisplay.disabled = true



alarm.loop = true
forestBg.loop = true
cafeBg.loop = true
rainBg.loop = true
fireplaceBg.loop = true


forestBtn.addEventListener('click', forestOn)
cafeBtn.addEventListener('click', cafeOn)
rainBtn.addEventListener('click', rainOn)
fireplaceBtn.addEventListener('click', fireplaceOn)

// Functions

// Pressing play
function countdown() {
  buttonPlay.classList.add('hide')
  buttonPause.classList.remove('hide')
  buttonSet.classList.add('hide')

  hideArrows()

  timerTimeout = setTimeout(function () {
    let hours = hrDisplay.value
    let minutes = minDisplay.value
    let seconds = secDisplay.value

    if (hours == 0 && minutes == 0 && seconds == 0) {
      updateDisplay(0, 0, 0)
      hrDisplay.style.color = 'red'
      minDisplay.style.color = 'red'
      secDisplay.style.color = 'red'
      timerDisplay.style.color = 'red'
      alarm.play()
      return

    } else if (seconds != 0) {
      updateDisplay(hours, minutes, seconds - 1)
    } else if (minutes != 0 && seconds == 0) {
      seconds = 59
      updateDisplay(hours, minutes - 1, seconds)
    } else if (hours != 0 && minutes == 0 && seconds == 0) {
      minutes = 59
      seconds = 59
      updateDisplay(hours - 1, minutes, seconds)
    }

    countdown()
  }, 1000)
}

function pause() {
  alarm.pause()
  reset()
  clearTimeout(timerTimeout)
}


function setTime() {
  hourUp.classList.remove('hide')
  hourDown.classList.remove('hide')
  minUp.classList.remove('hide')
  minDown.classList.remove('hide')
  secUp.classList.remove('hide')
  secDown.classList.remove('hide')
}

function stop() {
  alarm.pause()
  reset()
  clearTimeout(timerTimeout)
  updateDisplay(0, 0, 0)
}

function addFive() {
  let hours = Number(hrDisplay.value)
  let minutes = Number(minDisplay.value)
  let seconds = Number(secDisplay.value)
  if (minutes < 60) {
    updateDisplay(hours, (minutes + 5), seconds);
  }
}

function subFive() {
  let hours = Number(hrDisplay.value)
  let minutes = Number(minDisplay.value)
  let seconds = Number(secDisplay.value)
  if (minutes >= 5) {
    updateDisplay(hours, (minutes - 5), seconds);
  }
}

function reset() {
  buttonPlay.classList.remove('hide')
  buttonPause.classList.add('hide')
  buttonSet.classList.remove('hide')
  hrDisplay.style.color = 'var(--text-color)'
  minDisplay.style.color = 'var(--text-color)'
  secDisplay.style.color = 'var(--text-color)'
  timerDisplay.style.color = 'var(--text-color)'
}

function updateDisplay(hours, minutes, seconds) {
  hrDisplay.value = String(hours).padStart(2, '0')
  minDisplay.value = String(minutes).padStart(2, '0')
  secDisplay.value = String(seconds).padStart(2, '0')
}


// Arrow functions

function hideArrows() {
  hourUp.classList.add('hide')
  hourDown.classList.add('hide')
  minUp.classList.add('hide')
  minDown.classList.add('hide')
  secUp.classList.add('hide')
  secDown.classList.add('hide')
}

function hrUp() {
  hrDisplay.value++
  if (hrDisplay.value > 24) {
    hrDisplay.value = String(hrDisplay.value = 0).padStart(2, '0')
  } else if (hrDisplay.value < 10) {
    hrDisplay.value = String(hrDisplay.value).padStart(2, '0')
  }
}

function hrDown() {
  hrDisplay.value--
  if (hrDisplay.value < 0) {
    hrDisplay.value = 24
  } else if (hrDisplay.value < 10) {
    hrDisplay.value = String(hrDisplay.value).padStart(2, '0')
  }
}

function mnUp() {
  minDisplay.value++
  if (minDisplay.value > 59) {
    minDisplay.value = String(minDisplay.value = 0).padStart(2, '0')
  } else if (minDisplay.value < 10) {
    minDisplay.value = String(minDisplay.value).padStart(2, '0')
  }
}

function mnDown() {
  minDisplay.value--
  if (minDisplay.value < 0) {
    minDisplay.value = 59
  } else if (minDisplay.value < 10) {
    minDisplay.value = String(minDisplay.value).padStart(2, '0')
  }
}

function scUp() {
  secDisplay.value++
  if (secDisplay.value > 59) {
    secDisplay.value = String(secDisplay.value = 0).padStart(2, '0')
  } else if (secDisplay.value < 10) {
    secDisplay.value = String(secDisplay.value).padStart(2, '0')
  }
}

function scDown() {
  secDisplay.value--
  if (secDisplay.value < 0) {
    secDisplay.value = 59
  } else if (secDisplay.value < 10) {
    secDisplay.value = String(secDisplay.value).padStart(2, '0')
  }
}

function forestOn(){
  if(forestBtn.classList.toggle('select')){
    forestBg.play()
   }else{
    forestBg.pause()
   }
}

function cafeOn(){
  if(cafeBtn.classList.toggle('select')){
    cafeBg.play()
   }else{
    cafeBg.pause()
   }
}

function rainOn(){
  if(rainBtn.classList.toggle('select')){
    rainBg.play()
  }else{
    rainBg.pause()
  }
}

function fireplaceOn(){
  if(fireplaceBtn.classList.toggle('select')){
    fireplaceBg.play()
  }else{
    fireplaceBg.pause()
  }
}
