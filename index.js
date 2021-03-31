const grid = document.querySelector('.grid')
const startBtn = document.querySelector('#start')
const score = document.querySelector('#score')
let squares = []
let currentSnake = [2,1,0]
let direction = 1
let width = 10 

function createGrid(){                                  // Declaring the function
    for ( let i = 0; i < 100; i++) {                    // Create 100 of these elements with a for loop
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

function move() {
    const tail = currentSnake.pop()                     // Removing the last element from the currentSnake array; saving to a variable so later later use. 
        //console.log("index popped: " + tail)
        //console.log("currentSnake array after pop: " + currentSnake)
    squares[tail].classList.remove('snake')             // Passing the popped off tail thru the squares array to remove the styling aka class of snake from the grid board
    currentSnake.unshift(currentSnake[0] + direction)   // Adding square in direction we are heading.  Unshift methods adds to the beginning of an array
        //console.log("currentSnake array after unshift: " + currentSnake)
        //console.log(squares)                            // squares array now shows only two indices with class of snake
    squares[currentSnake[0]].classList.add('snake')     // Adding styling by adding class of snake the new index which has a new square
}

move()



let timeID = setInterval(move, 1000)



function control(e) {
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