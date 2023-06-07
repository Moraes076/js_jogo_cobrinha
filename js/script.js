// Criar elemento que irá rodar o jogo
let canvas = document.getElementById("gamesnake");
let context = canvas.getContext("2d");
let box = 32;
let Score = 0

// Criar cobrinha como vetor, já que ela vai ser uma série de coordenadas, que quando pintadas, criam os quadradinhos
let snake = [];

// Inicio Cobrinha
snake[0] ={
    x: 8 * box,
    y: 8 * box
}

// Direção
let direction = "right"

// Comida
let food ={
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

// Função para criar o Background
function criarBG() {
    context.fillStyle = "lightgreen"
// Desenha o retângulo usando x e y e a largura largura e altura setadas
    context.fillRect(0, 0, 16 * box, 16 * box);
}

// Função parra criar a cobrinha
function criaCobrinha (){
    for(i = 0; i < snake.length; i++) {
        context.fillStyle = "green"
        context.fillRect(snake[i].x, snake[i].y, box, box)
    }
}

// Desenha Comida
function drawFood() {
    context.fillStyle = "red"
    context.fillRect(food.x, food.y, box, box)
}

// Quando um evento acontece, detecta e chama a função update
document.addEventListener('keydown', update);

function update(event) {
    if (event.keyCode == 37 && direction != 'right') direction = 'left';
    if (event.keyCode == 38 && direction != 'down') direction = 'up';
    if (event.keyCode == 39 && direction != 'left') direction = 'right';
    if (event.keyCode == 40 && direction != 'up') direction = 'down';
}

// Função principal
function iniciarJogo() {
    if (snake[0].x > 15*box && direction == "right") {
        snake[0].x = 0;
    }
    if (snake[0].x < 0 && direction == "left") {
        snake[0].x = 16 * box;
    }
    if (snake[0].y > 15*box && direction == "down") {
        snake[0].y = 0;
    }
    if (snake[0].y < 0 && direction == "up") {
        snake[0].y = 16 * box;
    }

    for (i = 1; i < snake.length; i++) {
        document.getElementById("scr").innerText = Score;
        if (snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            clearInterval(jogo);
            alert('Game Over')
        }
    }

    criarBG();
    criaCobrinha();
    drawFood();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (direction == "right") snakeX += box; 
    if (direction == "left") snakeX -= box; 
    if (direction == "up") snakeY -= box; 
    if (direction == "down") snakeY += box;
    
    if (snakeX != food.x || snakeY != food.y) {
        // Pop tira o último elemento da lista
        snake.pop(); 
    } else {
        food.x = Math.floor(Math.random() * 15 +1) * box;
        food.y = Math.floor(Math.random() * 15 +1) * box;
        Score += 1
    }
    Score.innerText

    let newHead ={
        x: snakeX,
        y: snakeY
    }
// Método unshift adiciona como primeiro quadrinho da cobrinha
    snake.unshift(newHead)
}

let jogo = setInterval(iniciarJogo, 200)