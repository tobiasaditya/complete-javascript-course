////////////////////////////////////
// Coding Challenge #1

/*
Mark and John are trying to compare their BMI (Body Mass Index), which is calculated using the formula: 
BMI = mass / height ** 2 = mass / (height * height). (mass in kg and height in meter).

1. Store Mark's and John's mass and height in variables
2. Calculate both their BMIs using the formula (you can even implement both versions)
3. Create a boolean variable 'markHigherBMI' containing information about whether Mark has a higher BMI than John.

TEST DATA 1: Marks weights 78 kg and is 1.69 m tall. John weights 92 kg and is 1.95 m tall.
TEST DATA 2: Marks weights 95 kg and is 1.88 m tall. John weights 85 kg and is 1.76 m tall.

GOOD LUCK 😀
*/

// let m_mark = 78
// let h_mark = 1.69
// let m_john = 92
// let h_john = 1.95

let m_mark = 95
let h_mark = 1.88
let m_john = 85
let h_john = 1.76

let bmi_mark = m_mark / (h_mark ** 2)
let bmi_john = m_john / (h_john ** 2)

let markHigherBMI = bmi_mark > bmi_john
console.log(markHigherBMI)

////////////////////////////////////
// Coding Challenge #2

/*
Use the BMI example from Challenge #1, and the code you already wrote, and improve it:

1. Print a nice output to the console, saying who has the higher BMI. The message can be either "Mark's BMI is higher than John's!" or "John's BMI is higher than Mark's!"
2. Use a template literal to include the BMI values in the outputs. Example: "Mark's BMI (28.3) is higher than John's (23.9)!"

HINT: Use an if/else statement 😉

GOOD LUCK 😀
*/

if (markHigherBMI) {
    console.log(`Mark ${bmi_mark} has higher BMI than John ${bmi_john}`)
} else {
    console.log(`John ${bmi_john} has higher BMI than Mark ${bmi_mark}`)
}


////////////////////////////////////
// Coding Challenge #3

/*
There are two gymnastics teams, Dolphins and Koalas. They compete against each other 3 times. 
The winner with the highest average score wins the a trophy!

1. Calculate the average score for each team, using the test data below
2. Compare the team's average scores to determine the winner of the competition, and print it to the console.
Don't forget that there can be a draw, so test for that as well (draw means they have the same average score).

3. BONUS 1: Include a requirement for a minimum score of 100. With this rule, a team only wins if it has a 
higher score than the other team, and the same time a score of at least 100 points. HINT: Use a logical operator 
to test for minimum score, as well as multiple else-if blocks 😉
4. BONUS 2: Minimum score also applies to a draw! So a draw only happens when both teams have the same score 
and both have a score greater or equal 100 points. Otherwise, no team wins the trophy.

TEST DATA: Dolphins score 96, 108 and 89. Koalas score 88, 91 and 110
TEST DATA BONUS 1: Dolphins score 97, 112 and 101. Koalas score 109, 95 and 123
TEST DATA BONUS 2: Dolphins score 97, 112 and 101. Koalas score 109, 95 and 106

GOOD LUCK 😀
*/

//Normal
// let avgD = (96 + 108 + 89) / 3;
// let avgK = (88 + 91 + 110) / 3;

//Bonus 2
let avgD = (97 + 112 + 101) / 3;
let avgK = (109 + 95 + 123) / 3;


if (avgD > 100 && avgK > 100) {
    if (avgD > avgK) {
        console.log("Team D wins!")
    } else if (avgD == avgK) {
        console.log("Draw!")
    } else {
        console.log("Team K wins!")
    }
} else {
    console.log("A team is totally sucks ass")
}

