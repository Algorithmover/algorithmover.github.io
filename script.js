let audioLiberado = false;

document.addEventListener("click", () => {
  if (!audioLiberado) {
    somAcerto.play().then(() => {
      somAcerto.pause();
      somAcerto.currentTime = 0;
    }).catch(() => {});

    somErro.play().then(() => {
      somErro.pause();
      somErro.currentTime = 0;
    }).catch(() => {});

    audioLiberado = true;
  }
});

window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  setTimeout(() => {
    loader.style.opacity = "0";
    setTimeout(() => loader.style.display = "none", 500);
  }, 1500);
});

document.querySelectorAll("nav a").forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    document
      .querySelector(link.getAttribute("href"))
      .scrollIntoView({ behavior: "smooth" });
  });
});

const progress = document.getElementById("progress");

window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const docHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;

  const percent = (scrollTop / docHeight) * 100;
  progress.style.width = percent + "%";
});

const toggle = document.getElementById("themeToggle");
const root = document.documentElement;

if (localStorage.theme === "light") {
  root.classList.add("light");
  toggle.textContent = "☀️";
}

toggle.onclick = () => {
  root.classList.toggle("light");
  const light = root.classList.contains("light");
  toggle.textContent = light ? "☀️" : "🌙";
  localStorage.theme = light ? "light" : "dark";
};

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
    }
  });
});

document
  .querySelectorAll(".reveal")
  .forEach(el => observer.observe(el));

function embaralhar(array) {
  return array.sort(() => Math.random() - 0.5);
}

const perguntas = [
  {
    pergunta: "Qual foi um dos primeiros jogos eletrônicos da história?",
    opcoes: ["Pong", "GTA", "Minecraft", "FIFA"],
    correta: 0
  },
  {
    pergunta: "O que significa RPG?",
    opcoes: [
      "Role Playing Game",
      "Real Play Game",
      "Random Play Game",
      "Ready Player Game"
    ],
    correta: 0
  },
  {
    pergunta: "Qual gênero foca em estratégia em equipe?",
    opcoes: ["FPS", "RPG", "MOBA", "Corrida"],
    correta: 2
  }
];

let perguntaAtual = 0;
let pontos = 0;

const perguntaEl = document.getElementById("pergunta");
const opcoesEl = document.querySelectorAll(".opcao");
const resultadoEl = document.getElementById("resultado");
const recordeEl = document.getElementById("recorde");
const btnProxima = document.getElementById("proxima");

const somAcerto = document.getElementById("som-acerto");
const somErro = document.getElementById("som-erro");

function carregarPergunta() {
  resultadoEl.textContent = "";
  recordeEl.textContent = "";
  btnProxima.style.display = "none";

  const q = perguntas[perguntaAtual];
  perguntaEl.textContent = q.pergunta;

  opcoesEl.forEach((btn, index) => {
    btn.textContent = q.opcoes[index];
    btn.className = "opcao";
    btn.disabled = false;
    btn.onclick = () => verificarResposta(index);
  });
}

function verificarResposta(index) {
  const correta = perguntas[perguntaAtual].correta;

  opcoesEl.forEach(btn => btn.disabled = true);

  if (index === correta) {
    opcoesEl[index].classList.add("correta");
    resultadoEl.textContent = "✅ Resposta correta!";
    somAcerto.currentTime = 0;
    somAcerto.play();
    pontos++;
  } else {
    opcoesEl[index].classList.add("errada");
    opcoesEl[correta].classList.add("correta");
    resultadoEl.textContent = "❌ Resposta errada!";
    somErro.currentTime = 0;
    somErro.play();
  }

  btnProxima.style.display = "inline-block";
}

btnProxima.onclick = () => {
  perguntaAtual++;

  if (perguntaAtual < perguntas.length) {
    carregarPergunta();
  } else {
    finalizarQuiz();
  }
};

function finalizarQuiz() {
  const total = perguntas.length;
  const porcentagem = Math.round((pontos / total) * 100);

  perguntaEl.textContent = "🏆 Quiz finalizado!";
  document.querySelector(".opcoes").style.display = "none";

  resultadoEl.textContent = `Você acertou ${pontos} de ${total} perguntas (${porcentagem}%).`;

  const melhorPontuacao = localStorage.getItem("melhorPontuacao");
  if (!melhorPontuacao || pontos > melhorPontuacao) {
    localStorage.setItem("melhorPontuacao", pontos);
    recordeEl.textContent = "🏆 Novo recorde!";
  } else {
    recordeEl.textContent = `🏅 Seu melhor resultado: ${melhorPontuacao} acertos.`;
  }

  btnProxima.textContent = "Jogar Novamente 🔄";
  btnProxima.style.display = "inline-block";
  btnProxima.onclick = () => location.reload(); // Recarrega para resetar tudo
}

embaralhar(perguntas);
carregarPergunta();