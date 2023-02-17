// Pozyskanie canvasu po id
const canvas = document.getElementById('canvas');

// Uzyskanie contextu do rysowania
const ctx = canvas.getContext('2d');

// Wielkość canvasu
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Tablica kulek
let balls = [];

// Utworzenie zmiennych dla ilości kulek i dystansu między nimi
let numBalls = parseInt(document.getElementById('num-balls').value);
let minDistance = parseFloat(document.getElementById('ball-distance').value);

// Event listenery dla przycisków start i reset
document.getElementById('start-button').addEventListener('click', startAnimation);
document.getElementById('reset-button').addEventListener('click', resetAnimation);

// Rozpoczęcie animacji
function startAnimation() {
  // Usunięcie istniejących kulek
  balls = [];
  
  // Dodanie ilości kulek i dystansu między nimi
  numBalls = parseInt(document.getElementById('num-balls').value);
  minDistance = parseFloat(document.getElementById('ball-distance').value);

  // Dodanie kulek do tablicy z kulkami
  for (let i = 0; i < numBalls; i++) {
    const ball = new Ball(
      Math.random() * canvas.width,
      Math.random() * canvas.height,
      Math.random() * 10 - 5,
      Math.random() * 10 - 5,
      Math.random() * 10 + 10
    );
    balls.push(ball);
  }

  // Uruchomienie pętli animacji
  requestAnimationFrame(animationLoop);
}

// Zresetowanie animacji
function resetAnimation() {
  // Czyszczenie canvasu
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Zatrzymanie pętli animacji
  cancelAnimationFrame(animationLoop);

  // Usunięcie istniejących kulek
  balls = [];
}

// Pętla animacji
let lastTimestamp = 0;
function animationLoop(timestamp) {
  // Obliczanie różnicy czasu od ostatniej klatki
  const delta = (timestamp - lastTimestamp) / 1000;
  lastTimestamp = timestamp;

  // Czyszczenie canvasu
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Aktualizacja i rysowanie kulek
  balls.forEach((ball) => {
    // Aktualizacja pozycji kulki
    ball.x += ball.vx * delta;
    ball.y += ball.vy * delta;

    // Odbijaj się od krawędzi canvasu
    if (ball.x < ball.radius || ball.x > canvas.width - ball.radius) {
      ball.vx *= -1;
    }
    if (ball.y < ball.radius || ball.y > canvas.height - ball.radius) {
      ball.vy *= -1;
    }

    // Rysuj kulkę
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = ball.color;
    ctx.fill();

    // Sprawdź czy kulki się ze sobą zderzają
    for (let i = 0; i < balls.length; i++) {
      if (ball !== balls[i]) {
        const dx = ball.x - balls[i].x;
        const dy = ball.y - balls[i].y;
        const distance = Math.sqrt(dx*dx + dy*dy);
        if (distance < minDistance * canvas.width) {
          // Narysuj linie między kulkami
          ctx.beginPath();
          ctx.moveTo(ball.x, ball.y);
          ctx.lineTo(balls[i].x, balls[i].y);
          ctx.strokeStyle = 'rgba(0, 0, 0, 0.2)';
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }
  });

  // Request o następną klatkę
  requestAnimationFrame(animationLoop);
}

// Klasa kulki
class Ball {
  constructor(x, y, vx, vy, radius) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.radius = radius;
    this.color = getRandomColor();
  }
}

// Funkcja do generowania randomowych kolorów
function getRandomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}