const socket = io();
socket.on('add-circle', function(data) {
  addCircle(data);
});

socket.on('clear-display', function() {
  circles.innerHTML = '';
})

const circles = document.getElementById('circles');
let initials = '';
const players = document.getElementById('players')

socket.on('update-player-list', function(data) {
  let playerList = '<li>' + data.join('</li><li>') + '</li>';
  players.innerHTML = playerList;
})

circles.addEventListener('click', function(evt) {
  socket.emit('add-circle', {
    initials: initials,
    x: evt.clientX,
    y: evt.clientY,
    dia: randomBetween(10, 100),
    rgba: getRandomRGBA()
  });
});

document.getElementsByTagName('button')[0].addEventListener('click', function() {
  socket.emit('clear-display');
});

do {
  initials = getInitials();
} while (initials.length < 2 || initials.length > 3);

socket.emit('register-player', initials);

function getInitials() {
  let input = prompt("Please enter your initials");
  return input ? input.toUpperCase() : '';
}

function addCircle({x, y, dia, rgba, initials}) {
  let el = document.createElement('div');
  el.style.left = x - Math.floor(dia / 2 + 0.5) + 'px';
  el.style.top = y - Math.floor(dia / 2 + 0.5) + 'px';
  el.style.width = el.style.height = dia + 'px';
  el.style.backgroundColor = rgba;
  el.style.fontSize = Math.floor(dia / 3) + 'px';
  el.style.color = 'white';
  el.style.textAlign = 'center';
  el.style.lineHeight = dia + 'px';
  el.innerHTML = initials;
  circles.appendChild(el);
}

function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getRandomRGBA() {
  return ['rgba(', randomBetween(0, 255), ',', randomBetween(0, 255), ',',
    randomBetween(0, 255), ',', randomBetween(2, 10) / 10, ')'].join('');
}
