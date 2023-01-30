const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");


// Code to gather information about the development team members, and render the HTML file.

const teamMembers = []

function managerInfo() {
 inquirer
  .prompt([
   {
    type: 'input',
    message: 'Please enter name of the team manager.',
    name: 'name',
    validate: (value) => { if (value) { return true } else { return 'Please enter team manager`s Name.' } },
   },
   {
    type: 'input',
    message: 'Please enter the employee ID for the team manager.',
    name: 'employeeID',
    validate: (value) => { if (value) { return true } else { return 'Please enter manager`s employee ID.' } },
   },
   {
    type: 'input',
    message: 'Please enter the email address for the team manager.',
    name: 'managerEmail',
    validate: (value) => { if (value) { return true } else { return 'Please enter manager`s email address.' } },
   },
   {
    type: 'input',
    message: 'Please enter the phone number for the team manager.',
    name: 'managerPhone',
    validate: (value) => { if (value) { return true } else { return 'Please enter manager`s phone number.' } },
   }]).then((answers) => {
    const { name, employeeID, managerEmail, managerPhone } = answers;
    const manager = new Manager(name, employeeID, managerEmail, managerPhone);
    console.log(manager)
    teamMembers.push(manager)
    employeeOptions();
   })
}
//function to prompt for employee type
function employeeOptions() {
 console.log('----------------------------------------------------------------');
 inquirer
  .prompt([
   {
    type: 'list',
    message: 'What type of employee do you want to add?',
    name: 'employeeType',
    choices: ['Engineer', 'Intern', 'Save and exit'],
    validate: (value) => { if (value) { return true } else { return 'Please select an option.' } },
   }]).then(data => {
    switch (data.employeeType) {
     case 'Engineer':
      return engineerInfo();
     case 'Intern':
      return internInfo();
     case 'Save and exit':
      return quit();
     default:
      break;
    }
    console.log(data);
   })
}
//function to prompt engineer questions
function engineerInfo() {
 inquirer
  .prompt([
   {
    type: 'input',
    message: 'Please enter the name of the Engineer.',
    name: 'name',
    validate: (value) => { if (value) { return true } else { return 'Please enter Engineer`s name.' } },
   },
   {
    type: 'input',
    message: 'Please enter employee ID.',
    name: 'employeeID',
    validate: (value) => { if (value) { return true } else { return 'Please enter Engineer`s employee ID.' } },
   },
   {
    type: 'input',
    message: 'Please enter email address for the team member.',
    name: 'employeeEmail',
    validate: (value) => { if (value) { return true } else { return 'Please enter Engineer`s email address.' } },
   },
   {
    type: 'input',
    message: 'Please enter GitHub username for the team member.',
    name: 'github',
    validate: (value) => { if (value) { return true } else { return 'Please enter Engineer`s GitHub username.' } },
   },
  ]).then(info => {
   const { name, employeeID, employeeEmail, github } = info;
   const engineer = new Engineer(name, employeeID, employeeEmail, github)
   teamMembers.push(engineer)
   employeeOptions();
  });
}
//function to prompt intern questions
function internInfo() {
 inquirer
  .prompt([
   {
    type: 'input',
    message: 'Please enter name of the Intern. ',
    name: 'name',
    validate: (value) => { if (value) { return true } else { return 'Please enter name of the Intern.' } },
   },
   {
    type: 'input',
    message: 'Please enter employee ID.',
    name: 'employeeID',
    validate: (value) => { if (value) { return true } else { return 'Please enter an employee ID of the Intern.' } },
   },
   {
    type: 'input',
    message: 'Please enter email address for the team member.',
    name: 'employeeEmail',
    validate: (value) => { if (value) { return true } else { return 'Please enter the email  address of the Intern.' } },
   },
   {
    type: 'input',
    message: 'Please enter the school name for the Intern.',
    name: 'school',
    validate: (value) => { if (value) { return true } else { return 'Please enter the school for the Intern.' } },
   },
  ]).then(internInfo => {
   const { name, employeeID, employeeEmail, school } = internInfo;
   const intern = new Intern(name, employeeID, employeeEmail, school)
   teamMembers.push(intern)
   employeeOptions();
  });
}
//function to quit prompting and generate html file
function quit() {
 console.log('\x1b[33m%s\x1b[0m','Page created! Check out team.html in the output/ folder to see it!');
 const employeeProfile = render(teamMembers);
 // console.log(teamMembers);

 fs.writeFile(outputPath, employeeProfile, (error) => {
  if (error) {
   console.log(error)
  }
 });
}

managerInfo();