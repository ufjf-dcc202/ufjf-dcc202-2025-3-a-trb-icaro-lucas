let sequenciaComandos = [];

const filaComandosElemento = document.getElementById('fila-comandos');
const botoesAcao = document.querySelectorAll('.btn-acao');
const btnLimpar = document.getElementById('btn-limpar');
const btnPlay = document.getElementById('btn-play');

function adicionarComando(tipo) {
    sequenciaComandos.push(tipo);
    renderizarFila();
}

function renderizarFila() {
    filaComandosElemento.innerHTML = ''; /* LIMPA A FILA ANTES DE DESENHAR ELA DE NOVO */

    sequenciaComandos.forEach((comando, index) => {
        const icone = document.createElement('div'); /* CRIA O "QUADRADINHO" */
        icone.classList.add('icone-comando');
        icone.innerText = obterEmoji(comando);
        icone.style.animation = "aparecer 0.3s ease-out";
        
        filaComandosElemento.appendChild(icone);
    });
}

function obterEmoji(tipo) {
    const emojis = {
        'FRENTE': '⬆️',
        'ESQUERDA': '↩️',
        'DIREITA': '↪️',
        'PULAR': '🦘',
        'LUZ': '💡'
    };
    return emojis[tipo] || '?';
}

btnLimpar.addEventListener('click', () => {
    sequenciaComandos = [];
    filaComandosElemento.innerHTML = '';
});

botoesAcao.forEach(botao => {
    botao.addEventListener('click', () => {
        const nomeComando = botao.innerText.split(' ')[1];
        adicionarComando(nomeComando);
    });
});

btnPlay.addEventListener('click', () => {
    if (sequenciaComandos.length === 0) {
        alert("Tentativa inválida! Adicione os comandos.");
        return;
    }
    console.log("Executando sequência:", sequenciaComandos);
    alert("Robô executando: " + sequenciaComandos.join(" -> "));
});

let roboPos = { x: 0, y: 0 };

function atualizarRoboNoTabuleiro() {
    const quadrados = document.querySelectorAll('.quadrado');
    quadrados.forEach(q => q.classList.remove('robo'));

    const quadradoDestino = document.querySelector(`.quadrado[data-x="${roboPos.x}"][data-y="${roboPos.y}"]`);

    if (quadradoDestino) {
        quadradoDestino.classList.add('robo');
    }
}

atualizarRoboNoTabuleiro();