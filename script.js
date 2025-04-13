const dino = document.querySelector(".dino");
const cacto = document.querySelector(".cacto");
const score = document.querySelector(".score");
const trocarBtn = document.getElementById("trocar-personagem");

let alreadyJump = false;
let count = 0;
let personagemAtual = "car"; // Inicialmente "car"
let podeTrocarPersonagem = false; // Controle para ativar a troca após "Game Over"

// Carrega o áudio do pulo
const jumpSound = new Audio("audio/pulo.m4a.aac");
jumpSound.volume = 0.5; // Ajusta o volume do som de pulo

// Carrega o áudio para scores múltiplos de 900
const scoreSound = new Audio("audio/score1000.m4a");
scoreSound.volume = 0.5; // Ajusta o volume do som do score

// Detecta teclas para o pulo
document.addEventListener("keydown", (e) => {
  if (e.code === "ArrowUp" || e.code === "Space") {
    jump();
  }
});

// Função para o pulo
function jump() {
  if (!dino.classList.contains("jump")) {
    dino.classList.add("jump");

    // Toca o som de pulo
    jumpSound.currentTime = 0; // Reinicia o áudio caso já esteja tocando
    jumpSound.play();

    setTimeout(() => {
      dino.classList.remove("jump");
      alreadyJump = false;
    }, 1400);
  }
}

// Atualiza o jogo periodicamente
setInterval(() => {
  let dinoBottom = parseInt(
    window.getComputedStyle(dino).getPropertyValue("bottom")
  );
  let cactoLeft = parseInt(
    window.getComputedStyle(cacto).getPropertyValue("left")
  );

  // Verifica colisão
  if (cactoLeft > 40 && cactoLeft < 270 && dinoBottom <= 50 && !alreadyJump) {
    alert(`Game Over! Seu score foi: ${count}`);
    count = 0;
    podeTrocarPersonagem = true; // Ativa a troca após o jogador perder

    // Reseta a imagem e a classe do cacto para o padrão
    cacto.style.backgroundImage = "url(img/cacto.png)";
    cacto.classList.remove("cactus");
    cacto.classList.add("cacto");
  }

  // Toca o som de score quando o score for múltiplo de 900
  if (count > 0 && count % 900 === 0) {
    scoreSound.currentTime = 0; // Reinicia o áudio caso já esteja tocando
    scoreSound.play(); // Toca o áudio para cada múltiplo de 900
  }

  // Troca a classe e a imagem do cacto quando o score for >= 900
  if (count >= 900) {
    cacto.style.backgroundImage = "url(img/cactus.png)";
    cacto.classList.remove("cacto");
    cacto.classList.add("cactus");
  }

  count++;
  score.innerHTML = `SCORE: ${count}`;
}, 10);

// Troca de personagem ao clicar no botão
trocarBtn.addEventListener("click", () => {
  if (podeTrocarPersonagem) {
    if (personagemAtual === "car") {
      dino.style.backgroundImage = "url(img/dino.gif)";
      personagemAtual = "dino";
    } else {
      dino.style.backgroundImage = "url(img/carro.png)";
      personagemAtual = "car";
    }
    podeTrocarPersonagem = false; // Desativa a troca até o próximo "Game Over"
  }
});
