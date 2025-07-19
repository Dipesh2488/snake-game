
const container = document.getElementById("gamecontainer")
const gridSize = 20
const containerSize = 400

let snake = [{ x: 200, y: 200 }]
let direction = { x: 0, y: 0 }
let food = generateFood()

let gameInterval = setInterval(gameloop, 150)

document.addEventListener('keydown', changeDirection)

function changeDirection(e) {
    if (e.key == 'ArrowUp' && direction.y == 0) {
        direction = { x: 0, y: -gridSize }
    }
    else if (e.key == 'ArrowDown' && direction.y == 0) {
        direction = { x: 0, y: gridSize }
    }
    else if (e.key == 'ArrowLeft' && direction.x == 0) {
        direction = { x: -gridSize, y: 0 }
    }
    else if (e.key == 'ArrowRight' && direction.x == 0) {
        direction = { x: gridSize, y: 0 }
    }
}

function gameloop() {
    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y }

    if (head.x < 0 || head.x >= containerSize || head.y < 0 || head.y >= containerSize) {
        alert("Game Over")
        clearInterval(gameInterval)
        return
    }

    snake.unshift(head)

    if (head.x == food.x && head.y == food.y) {
        food = generateFood()
    }
    else {
        snake.pop()
    }
    draw()
}


function draw() {
    container.innerHTML = ''

    // Draw the snake
    snake.forEach(segment => {
        const snakePart = document.createElement("div")
        snakePart.classList.add('snake')
        snakePart.style.left = segment.x + "px"
        snakePart.style.top = segment.y + "px"
        snakePart.style.position = 'absolute'
        container.appendChild(snakePart)
    })

    // Draw the food
    const foodElement = document.createElement("div")
    foodElement.classList.add('food')
    foodElement.style.left = food.x + "px"
    foodElement.style.top = food.y + "px"
    foodElement.style.position = 'absolute'
    container.appendChild(foodElement)
}



function generateFood(){
    const x = Math.floor(Math.random()*(containerSize / gridSize)) * gridSize
    const  y = Math.floor(Math.random()*(containerSize / gridSize)) * gridSize
    return {x,y}
}

draw()