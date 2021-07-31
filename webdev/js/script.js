//Part A
// Jason wants to build a very simple tip calculator for whenever he goes eating in a restaurant. In his country, it's usual to tip 15% if the bill value is between 30 and 300. If the value is different, the tip is 20%.
// 1. Your task is to calculate the tip, depending on the bill value. Create a variable called 'tip' for this. Try not to use an if/else statement.
// 2. Print a string to the console containing the bill value, the tip, and the final value (bill + tip). Example: 'The bill was 275, the tip was 41.25, and the total value 316.25'
// * TEST DATA: Test for bill values 275, 28 and 430
const billInput = document.getElementById("bill-input")
const calcBtn = document.getElementById("calculate-btn")
const totalBillEl = document.getElementById("total-bill-el")

console.log("Tip Calculator")

function calclateTotal(){
    const bill = Number(billInput.value)
    const tip = (bill > 49 && bill < 301) ? (bill * 0.15) : (bill * 0.2)
    console.log(`Bill: $${bill}
    Tip: $${tip}
    Total bill: $${bill+tip}`)
    totalBillEl.innerHTML = `
        <p> <b>Bill:</b> ${bill} </p>
        <p> <b>Tip:</b> ${tip} </p>
        <p> <b>Your Total Bill:</b> ${bill + tip} </p>
    `
}
calclateTotal()
calcBtn.addEventListener('click',function(){
    calclateTotal()
})


//Part B
// Create a function called celsiusToFahrenheit:
// 1. Store a celsius temperature into a variable. Convert it to fahrenheit and output "NN°C is NN°F".
// Create a function called fahrenheitToCelsius;
// 2. Store a fahrenheit temperature into a variable. Convert it to celsius and output "NN°F is NN°C."
console.log("\nTemperature Converter")
const celsiusInput = document.getElementById("celsius-el")
const fahrenheitInput = document.getElementById("fahrenheit-el")
const cToF = document.getElementById("c-to-f")
const fToC = document.getElementById("f-to-c")
const toFBtn = document.getElementById("convert-to-f")
const toCBtn = document.getElementById("convert-to-c")

function celsiusToFahrenheit(){
    const celsius = Number(celsiusInput.value)
    const fahrenheit = (celsius * 9/5) + 32
    console.log(`${celsius}°C is ${fahrenheit}°F`)
    cToF.innerHTML = `
        <p> ${celsius}°C is ${fahrenheit}°F </p>
    `
}

function fahrenheitToCelsius(){
    const fahrenheit = Number(fahrenheitInput.value)
    const celsius = (fahrenheit - 32) * 5/9
    console.log(`${fahrenheit}°F is ${celsius}°C`)
    fToC.innerHTML = `
    <p> ${fahrenheit}°F is ${celsius}°C </p>
`
}
celsiusToFahrenheit()
fahrenheitToCelsius()
toFBtn.addEventListener('click',function(){
    celsiusToFahrenheit()
})

toCBtn.addEventListener('click',function(){
    fahrenheitToCelsius()
})

// C.
// Back to the two teams game! There is a new discipline, which works differently.
// Each team competes 3 times, and then the average of the 3 scores is calculated (so one average score per team). A team ONLY wins if it has at least DOUBLE the average score of the other team. Otherwise, no team wins!
// 1. Create an arrow function 'calcAverage' to calculate the average of 3 scores
// 2. Use the function to calculate the average for both teams
// 3. Create a function 'checkWinner' that takes the average score of each team as parameters ('avgNets' and 'avgKnicks'), and then logs the winner to the console, together with the victory points, according to the rule above. Example: "Knicks win (30 vs. 13)".
// 4. Use the 'checkWinner' function to determine the winner for both DATA 1 and DATA 2.
// 5. Ignore draws this time.
// TEST DATA 1: Nets score 44, 23 and 71. Knicks score 65, 54 and 49
// TEST DATA 2: Nets score 85, 54 and 41. Knicks score 23, 34 and 27

console.log("\nNets vs Knicks")
const game1Res = document.getElementById("game1-res-el")
const game2Res = document.getElementById("game2-res-el")


const calcAverage = (scores) => {
    let sum = 0
    for(let i=0; i<scores.length; i++){
        sum += scores[i]
    }
    return sum/scores.length
}

console.log("Game 1")
let scoreNets = [44,23,71]
let scoreKnicks = [65,54,49] 
let avgNets = calcAverage(scoreNets)
console.log("Nets average:",avgNets)

let avgKnicks = calcAverage(scoreKnicks)
console.log("Knicks average:",avgKnicks)

const checkWinner = (avgNets, avgKnicks) => {
   const divAverage = (avgNets / avgKnicks) 
   if(divAverage >= 2){
        console.log(`Nets wins the game. (${avgNets} vs. ${avgKnicks})`)
        return `Nets wins the game. (${avgNets} vs. ${avgKnicks})`
   }else if(divAverage <= 0.5){
        console.log(`Knicks wins the game. (${avgKnicks} vs. ${avgNets})`)
        return `Knicks wins the game. (${avgKnicks} vs. ${avgNets})`
   }else{
        console.log("No team has double the average of other team. No one is the winner of the game.")
        return "No team has double the average of other team. No one is the winner of the game."
    }
}

checkWinner(avgNets,avgKnicks)
game1Res.innerHTML = `
    <p> <b>Nets Average: </b> ${avgNets} </p>
    <p> <b>Knicks Average: </b> ${avgKnicks} </p>
    <p> ${checkWinner(avgNets,avgKnicks)} </p>
`

console.log("\nGame 2")
let scoreNets2 = [85,54,41]
let scoreKnicks2 = [23,34,27]

avgNets = calcAverage(scoreNets2)
console.log("Nets average:",avgNets)

avgKnicks = calcAverage(scoreKnicks2)
console.log("Knicks average:",avgKnicks)
checkWinner(avgNets,avgKnicks)
game2Res.innerHTML = `
    <p> <b>Nets Average: </b> ${avgNets} </p>
    <p> <b>Knicks Average: </b> ${avgKnicks} </p>
    <p> ${checkWinner(avgNets,avgKnicks)} </p>
`


// D
// Lucas is still building his tip calculator, using the same rules as before: Tip 15% of the bill if the bill value is between 50 and 300, and if the value is different, the tip is 20%.
// 1. Write a function 'calcTip' that takes any bill value as an input and returns the corresponding tip, calculated based on the rules above (you can check out the code from first tip calculator challenge if you need to). Use the function type you like the most. Test the function using a bill value of 100.
// 2. And now let's use arrays! So create an array 'bills' containing the test data below.
// 3. Create an array 'tips' containing the tip value for each bill, calculated from the function you created before.
// 4. BONUS: Create an array 'total' containing the total values, so the bill + tip.
// TEST DATA: 125, 555 and 44
console.log("\nTip Calculator V2.0")
const totalTipBillsEl = document.getElementById("ttb-el")

const calcTip = (bill) => {
    if(bill >= 50 && bill <= 300){
        return bill * 0.15
    }else{
        return bill * 0.2
    }
};

let bills = [125,555,44]
let tips = []
let totaList = []

const totalBillList = (bills) => {
   
    for(let i=0; i<bills.length; i++){
        tips.push(calcTip(bills[i]))
        totaList.push(bills[i]+tips[i])
    }
    console.log("Total Tips List:",tips)
    return totalBillList
}
totalBillList(bills)
console.log("Total Bill List:",totaList)
totalTipBillsEl.innerHTML = `
    <p> Total Tips List: ${tips} </p>
    <p> Total Bill List : ${totaList} </p>
`


