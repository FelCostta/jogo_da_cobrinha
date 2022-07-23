// Declaração das Variáveis
let canvas = document.getElementById("snake");
let context = canvas.getContext("2d"); // O context renderiza o desenho que esta no canvas
let box = 32;
let snake = [];
snake[0] = {
    x: 8 * box,
    y: 8 * box
}
let direction = "right"; // Variavel da direção da cobrinha
let food = {
    x: Math.floor(Math.random() * 15 + 1) * box, // Math.floor - Retira  a parte flutuante ----- Match.random - vai colocar a box vermelha em lugares aleatórios ( quando recarrega a página).
    y: Math.floor(Math.random() * 15 + 1) * box
}


//Declaração das funções
// Função que cria o Background
function criarBG(){
    context.fillStyle = "lightgreen"; // fillStyle trabalha com o estilo do canvas
    context.fillRect(0, 0, 16 * box , 16 * box); // fillRect vai desenhar o retângulo, trabalha com 4 parâmetros - posição de x e y, altura e largura
}


function criarCobrinha(){
    for(i=0; i < snake.length; i++){
        context.fillStyle = "green";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

function drawFood(){
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box);
}

document.addEventListener('keydown', update);

// Função que determina os botões que irão realizar as mudanças de direção, no caso os declarados foram as setas.
function update (event){
    if(event.keyCode == 37 && direction != "right") direction = "left";
    if(event.keyCode == 38 && direction != "down") direction = "up";
    if(event.keyCode == 39 && direction != "left") direction = "right";
    if(event.keyCode == 40 && direction != "up") direction = "down";
}


function iniciarJogo(){

    // os if serão criados para após a cobra sair da tela por alguma posição, ela possa retornar do inicio daquela posição, de forma infinita se não houver mudança de posição.
    if(snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
    if(snake[0].x < 0 && direction == "left" ) snake[0].x = 16 * box;
    if(snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
    if(snake[0].y < 0 && direction =="up") snake[0].y = 16* box;


    for(i=1; i < snake.length; i++){
        if(snake[0].x == snake[i].x && snake[0].y ==snake[i].y){
            clearInterval(jogo);
            alert("Gamer Over =[");
        }
    }

    criarBG(); // chama a função
    criarCobrinha(); // chama a função
    drawFood(); // Chama a função de criar a box vermelha

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(direction == "right") snakeX += box;
    if(direction == "left") snakeX -= box;
    if(direction == "up") snakeY -= box;
    if(direction == "down") snakeY += box;

    if(snakeX != food.x || snakeY != food.y){
        snake.pop();
    }
    else{
        food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box;
    }

    

    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead); // Adiciona um quadrado no inicio da cobrinha
    
}

let jogo = setInterval(iniciarJogo, 100); // Intervalo de 100 milessegundos para reiniciar o jogo


