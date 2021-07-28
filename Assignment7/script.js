//Part A
console.log("Part A")
let celsius = 30;
let fahrenheit = (celsius * (9/5)) + 32;
console.log(`${celsius}°C is ${fahrenheit}°F`);

fahrenheit = 86;
celsius = (fahrenheit - 32) * (5/9);
console.log(`${fahrenheit}°F is ${celsius}°C`)


//Part B
console.log("\nPart B")
//Lucas 
const lucasMass = 78
const lucasHeight = 1.69
let lucasBMI = lucasMass / (lucasHeight**2)
console.log("LUCAS'S BMI: ",lucasBMI)

//John
const johnMass = 92
const johnHeight = 1.95
let johnBMI = johnMass / (johnHeight**2)
console.log("JOHN'S BMI: ",johnBMI)

//Comparision
if(lucasBMI > johnBMI){
    console.log(`Lucas' BMI (${lucasBMI}) is higher than John's (${johnBMI}!`)
}else{
    console.log(`John's BMI (${johnBMI}) is higher than Lucas (${lucasBMI})!`)
}

//part C
console.log("\nPart C")
//Nets Score Calculation
let sum = 0
let score = 0
let netsAverage = 0

//Data 1
score = 96
sum += score
score = 108
sum += score
score = 89
sum += score
netsAverage = sum / 3

//Knicks Score Calculation
let knicksAverage = 0
sum = 0
score = 88
sum += score
score = 91
sum += score
score = 110
sum += score
knicksAverage = sum / 3

//Comparision
console.log("Data Analysis 1")
if(netsAverage == knicksAverage){
    console.log("The Game is a Draw.")
}else if(netsAverage > knicksAverage){
    console.log("Nets is the winner.")
}else{
    console.log("Knicks is the winner.")
}

//Data 2
let netsScore = 97 + 112 + 101
let knicksScore = 109 + 95 + 123

netsAverage = netsScore / 3
knicksAverage = knicksScore / 3
let isNetsGreater = netsAverage >= knicksAverage

console.log("\nData Analysis 2")
if(isNetsGreater){
    if(netsAverage == knicksAverage){
        console.log("The game is a Draw.")
    }else{
        console.log("Nets is the winner.")
    }
}else{
    console.log("Knicks is the winner.")
}

//Data 3
console.log("\nData Analysis 3")
netsScore = 97 + 112 + 101
knicksScore = 109 + 95 + 106
netsAverage = netsScore / 3
knicksAverage = knicksScore / 3
if(netsAverage == knicksAverage){
    console.log("The Game is a Draw.")
}else if(netsAverage > knicksAverage){
    console.log("Nets is the winner.")
}else{
    console.log("Knicks is the winner.")
}

//Bonus
console.log("\nBonus")
const team1 = 1
const team2 = 2
const minScore = 100

if(team1 >= minScore || team2 >= minScore){
    if(team1 == team2){
        console.log(`Both team have ${team1} equal score. The Game is a Draw.`)
    }else if(team1 > team2){
        console.log(`Team1 is the winner with ${team1 - team2} score difference.`)
    }else{
        console.log(`Team2 is the winner with ${team2 - team1} score difference.`)
    }
}else{
    console.log(`No Team has score greater or equal to ${minScore}`)
}