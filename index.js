const grid = document.querySelector('.grid')
const startBtn = document.querySelector('#start')
const scoreDisplay = document.querySelector('#score')
let squares = []
let currentSnake = [2,1,0]
let direction = 1
let width = 10 
let appleIndex = 0
let score = 0
let intervalTime = 1000
let speed = 0.9
let timerId = 0

function createGrid(){                                  // Declaring the function
    for ( let i = 0; i < width*width; i++) {                    // Create 100 of these elements with a for loop
        const square = document.createElement('div')    // Create element
        //console.log(square)                             // Checking to see if the code is working
        square.classList.add('square')                  // Add styling to the element 
        grid.appendChild(square)                        // Append the child element to the parent; the element into our grid
        squares.push(square)                            // Push each new square into squares array each you iterate thru the for loop
    } 
}
createGrid()                                            // Invoke the function - without this nothing will happen!
// console.log(squares)                                    // Cheacking to see the array worked

currentSnake.forEach(index => squares[index].classList.add('snake')) //Passing currentSnake into squares array. Applies class to each index on the array. index can be anything as long as they are equal.  but index makes more sense here

//console.log("inital currentSnake: " + currentSnake)

function startGame() {
    currentSnake.forEach(index => squares[index].classList.remove('snake'))  //removing snake from location on gameboard by removing the class on the index, wheverever it may be. 
    squares[appleIndex].classList.remove('apple')//remove the apple from the board
    clearInterval(timerId)
    currentSnake = [2,1,0]
    score = 0
    scoreDisplay.textContent = score
    direction = 1
    intervalTime = 1000
    generateApple()
    currentSnake.forEach(index => squares[index].classList.add('snake'))
    timerID = setInterval(move, intervalTime)
}

function move() {
    if (
        (currentSnake[0] + width >= width*width && direction === width) || //if snake has hit bottom
        (currentSnake[0] % width === width-1 && direction === 1) || //if snake has hit right wall
        (currentSnake[0] % width === 0 && direction === -1) || //if snake has hit left wall
        (currentSnake[0] - width < 0 && direction === -width) || //if snake has hit top
        squares[currentSnake[0] + direction].classList.contains('snake')) { 
            return clearInterval(timerId)
        }

        const tail = currentSnake.pop()                     // Removing the last element from the currentSnake array; saving to a variable so later later use. 
        //console.log("index popped: " + tail)
        //console.log("currentSnake array after pop: " + currentSnake)
        squares[tail].classList.remove('snake')             // Passing the popped off tail thru the squares array to remove the styling aka class of snake from the grid board
        currentSnake.unshift(currentSnake[0] + direction)   // Adding square in direction we are heading.  Unshift methods adds to the beginning of an array
        //console.log("currentSnake array after unshift: " + currentSnake)
        //console.log(squares)                            // squares array now shows only two indices with class of snake
        //squares[currentSnake[0]].classList.add('snake')     // Adding styling by adding class of snake the new index which has a new square
    
    //Snake eats apple what happens?
    if (squares[currentSnake[0].classList.contains('apple')]) {         
        squares[currentSnake[0].classList.remove('apple')]          // remove apple     
        squares[tail].classList.add('snake')                        // grow the snake 
        //console.log(tail)
        currentSnake.push(tail)
        //console.log(currentSnake)
        generateApple()
        score++
        scoreDisplay.textContent = score
        clearInterval(timeID)
        //console.log(intervalTime)
        intervalTime = intervalTime * speed
        //console.log(intervalTime)
        timerId = setInterval(move, intervalTime)
    }
    
    squares[currentSnake[0].classList.add('snake')]
}


function generateApple () {
    do {
        appleIndex = Math.floor(Math.random()* squares.length)
    } while (squares[appleIndex].classList.contains('snake'))
    squares[appleIndex].classList.add('apple')
} 
generateApple()

function control(e) {
    //e.preventDefault()  // so the browser doeesn't move while I'm playing the game
    if (e.keyCode === 39) {
        direction = 1               // resetting 
        // console.log('right arrow pressed')
    } else if (e.keyCode === 38) {
        direction = -width
        // console.log('up arrow pressed')
    } else if (e.keyCode === 37) {
        direction = -1
        // console.log('left arrow pressed')
    } else if (e.keyCode === 40) {
        direction = +width
        // console.log('down arrow pressed')
    }
}

document.addEventListener('keyup', control)   // ('event type', function)  see web for various eventypes
startBtn.addEventListener('click', startGame)