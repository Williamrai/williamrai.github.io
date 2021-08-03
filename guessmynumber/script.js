//Elements 
const scoreEl = document.getElementById("score-el")
const highScoreEl = document.getElementById("high-score-el")
const userInput = document.getElementById('user-input')
const feedEl = document.getElementById("feed-el")
const gameImgEl = document.getElementById("img-el")
const mySecretNumberEl = document.getElementById("mynumber-el")
const finalScoreEl = document.getElementById("final-score-el")
const achievedScoreEl = document.getElementById("achieved-score-el")
const bestScoreEl = document.getElementById("best-score-el")

//Buttons
const checkBtn = document.getElementById('check-btn')
const resetBtn = document.getElementById("reset-btn")
const tryAgainBtn = document.getElementById("try-again-btn")
const playAgainBtn = document.getElementById("play-again-btn")//after user wins the game, clicks to play again

//Divs
const gamePlayDiv = document.getElementById("gameplay-el")
const gameOverDiv = document.getElementById("game-over-el")
const gameWinnerDiv = document.getElementById("game-winner-el")
const mainGameDiv =  document.getElementById("maingw-div")
const scoreDiv = document.querySelector(".score")
const guessList = document.getElementById("guess-list")

//Generate a random value between 1 and 100, inclusive
const randomNumber = () => {
    return Math.trunc((Math.random() * 100) + 1)
}

//Default values
let myNumber = randomNumber()
let currentScore = 10
let highScore = 0
let guessHistory = ""


console.log("mynumber:",myNumber) 

//Default Settings
scoreEl.innerHTML = currentScore
highScoreEl.textContent = highScore
gameOverDiv.remove()
gameWinnerDiv.remove()

//Checks if the userInput number is in Range
const inRange = function(number){
    // console.log(number)
    if(number >=1 && number <=100){
        return true
    }else{
        return false
    }
}

//keeps track of the each key input from the user and validates 
//input is not allowed if it is greater than 100
userInput.addEventListener('keyup',(input) =>{
    //as user presse the key value is tracked here
    // console.log(input.target.value)
    if(!inRange(input.target.value)){
        addShakyAnim()
        userInput.value = ""
        feedEl.textContent = "You can only enter numbers between 1 and 100"
    }
    removeShakyAnim()
})

//Main Game Functions

//Shaky Animation
//addShakyAnim() -> adds feed-zoom class(where animation is defined) written in CSS to feed-el class
function addShakyAnim(){
    feedEl.classList.add("feed-zoom")
}

//removes the animation of feed-zoom class after 500ms
//a delay is set in order to avoid the addition and removal of class at the same time
function removeShakyAnim(){
    setTimeout(function(){
        feedEl.classList.remove("feed-zoom")
    },800)
}

//gives hints to the user
//When user input is less than or greater than my random number it displays hints based on the result of their division
//if their result is less than 0.5 then the user input is considered low
//if the result is between 0.5 and 1, then  the user number is getting closer
//if the result is between than 1 and 1.5, then user number is high but not by much
//if greater than 1.5 then is considered too high
const lowOrHigh = (number) => {
    const div = number / myNumber
    // console.log(div)
    if(div < 0.5){
        feedEl.textContent = "Your Guess is too low"
    }else if(div == 0.5){
        feedEl.textContent = "You are geeting there, but it's still low."
    }else if(div < 1 && div > 0.5){
        feedEl.textContent = "Closer, but not there, go higher"
    }else if(div > 1 && div < 1.5){
        feedEl.textContent = "Your number is high"
    }else{
        feedEl.textContent = "Too High, lower down"
    }
}

//compare the user and my number,
//if they are equal then show game winner div
//if not pass number to lowOrHigh function 
const compareNumber = (number) => {
    //Game is won
    if(number === myNumber){
        // feedEl.textContent = "You guess the correct number" 
        //Main Game Play Div is removed from the DOM
        //Game Winner Div is added to the Main Game Div
        gamePlayDiv.remove()
        mainGameDiv.appendChild(gameWinnerDiv)

        //score view and reset button are hidden
        scoreDiv.style.visibility = "hidden"
        resetBtn.style.visibility = "hidden"
        mainGameDiv.style.backgroundColor = "#C9E4C5"
        finalScoreEl.textContent = "Your Score : " + currentScore
        mySecretNumberEl.textContent = myNumber
        
        if(currentScore > highScore){
            highScore = currentScore
        }
        bestScoreEl.textContent = highScore
        gameImgEl.src = "img/you.png"

    }else{
        currentScore-- 
        if(currentScore > 0){ 
            scoreEl.textContent = currentScore
            lowOrHigh(number)
        }else{ 
            //game is over, no more chance left
            //Game Over Div is shown
            scoreEl.textContent = currentScore
            gameImgEl.src = "img/game-over-3.png"
            resetBtn.style.visibility = "hidden"

            //Main Gameplay Div is removed
            //and Game Over Div is appended to Main Game Div
            gamePlayDiv.remove()
            mainGameDiv.appendChild(gameOverDiv);
            document.getElementById("secret-no-el").textContent = myNumber
        }
       
    }
}


//when user input is not empty
const ifNotEmpty = () =>{
    addShakyAnim()
    const number = Number(userInput.value)
    if(number){
        //Guessing number histrory tracker
        guessHistory += `
            <li>${userInput.value}</li>
            `
        guessList.innerHTML = guessHistory

        compareNumber(number)
    }else{
        feedEl.textContent = "The input box is empty. Enter a number between 1 and 100."
    }
    removeShakyAnim()
}

//Reset or play Again Function
const reset = function(){
    userInput.value = ""
    highScoreEl.textContent = highScore
    currentScore = 10
    scoreEl.textContent = currentScore
    feedEl.textContent = "Guess a Number"
    myNumber = randomNumber()
    console.log("newNumber:",myNumber)
    
    guessHistory = ""
    guessList.innerHTML = guessHistory

}

//Try Again
const tryAgain = () => {
    gameOverDiv.remove()
    mainGameDiv.appendChild(gamePlayDiv);
    reset()
    resetBtn.style.visibility = "visible"
    gameImgEl.src = "img/guess.png"
}

const playAfterWinning = function(){
    gameWinnerDiv.remove();
    mainGameDiv.appendChild(gamePlayDiv);
    scoreDiv.style.visibility = "visible"
    gameImgEl.src = "img/guess.png"
    resetBtn.style.visibility = "visible"
    mainGameDiv.style.backgroundColor = "#C1AC95"
    reset()
}

//remove the parenthesis to stop function from self executing without waiting for click event
checkBtn.addEventListener('click',ifNotEmpty);
resetBtn.addEventListener('click',reset);
tryAgainBtn.addEventListener('click',tryAgain);
playAgainBtn.addEventListener('click',playAfterWinning);
// checkBtn.addEventListener('click', ifNotEmpty(userInput.value))


