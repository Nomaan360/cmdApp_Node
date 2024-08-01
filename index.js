#!/usr/bin/env node
import chalk from "chalk";
import figlet from "figlet";
import inquirer from "inquirer";
import gradient from "gradient-string";
import chalkanimation from "chalk-animation";
import { createSpinner } from 'nanospinner';

let playerName;

// const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms))
let sleep =(ms = 2000)=> new Promise(function(myResolve, myReject) {
    setTimeout(function() { 
        myResolve();
     }, ms);
  });

async function welcome() {
    const rainbowTitle = chalkanimation.rainbow(
        'Who Wants To Be A JavaScript Millionaire? \n'
      );
    await sleep();
    rainbowTitle.stop();
    console.log(chalk.blue('lets play'));
}
async function uname() {
    const answers =await inquirer.prompt([
    { 
        name: 'uname',
        message: 'Your Name?',
        type: 'input',
        default() {
            return 'Player';
        },
    }])
    playerName=answers.uname

}
async function checkans(ans) {
    const spinner = createSpinner('Checking answer...').start();
    await sleep();
    if(ans){
        spinner.success({ text: `Nice work ${playerName}. That's a legit answer` });
    }
    else{
        spinner.error({ text: `💀💀💀 Game over, you lose ${playerName}!` });
        process.exit(1); 
    }
}
function winner() {
    console.clear()
    figlet(`Congrats ${playerName} ! you won`, function (err, data) {
        console.log(gradient.rainbow(data))
        process.exit(0); 
    });
 
}
async function q1() {
    const answers =await inquirer.prompt([
    { 
        name: 'q1',
        message: ' Which of the three banks will be merged with the other two to create India third-largest bank?',
        type: 'list',
        choices: ['Punjab National Bank','Indian Bank','Bank of Baroda','Dena Bank'],
    }])
    checkans(answers.q1=='Indian Bank')

}
async function q2() {
    const answers =await inquirer.prompt([
    { 
        name: 'q2',
        message: 'Where was India’s first national Museum opened?',
        type: 'input',
    }])
    checkans(answers.q2=='Mumbai')

}
async function q3() {
    const answers =await inquirer.prompt([
    { 
        name: 'q3',
        message: 'The green planet in the solar system is?',
        type: 'list',
        choices: ['Mars','Uranus','Venus','Earth'],
    }])
    checkans(answers.q3=='Uranus')
}

await welcome()
await uname()
await q1()
await q2()
await q3()
winner()