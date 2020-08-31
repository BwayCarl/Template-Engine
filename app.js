const Manager = require("./Develop/lib/Manager");
const Engineer = require("./Develop/lib/Engineer");
const Intern = require("./Develop/lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./Develop/lib/htmlRenderer");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
const employeeInfo = [];

const enterEmployeeInfo = () => {

inquirer.prompt([
    { //Name
        type: "input",
        name: "name",
        message:"Please enter employee's full name.",
        validate: function validateName(name) {
            return name !== '';
        }
    },
    { //Email
        type: "input",
        name: "email",
        message:"Please enter employee's email address.",
        validate: function validateName(email) {
            return email !== '';
        }
    },
    { //ID Number
        type: "input",
        name: "id",
        message:"What is the employee's ID number?",
        validate: function validateId(id) {
            var isValid = !_.isNaN(parseFloat(id));
            return isValid || "ID should be a number.";
        }
    },
    { //Role
        type: "checkbox",
        name: "role",
        message:"What is the employee's job title?",
        choices: [
            "Manager",
            "Engineer",
            "Intern"]
    }])
.then(answers => {
            const { role } = answers;

            //SWITCH https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch
            //BREAK https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/break
        switch(role) {
            //Manager Office Number
            case "Manager":
                specificQuestions(role, "officeNumber", "What is the Manager's office number?", commonAnswers);
            break;
            //Engineer Github
            case "Engineer":
                specificQuestions(role, "github", "What is the Engineer's Github profile username?", commonAnswers);
            break;
            //Intern School
            case "Intern":
                specificQuestions(role, "school", "Where does the Intern go to school?", commonAnswers);
            break;
        }
    });
}
//     const specificQuestions = (role, )
//     { 
//         type: "input",
//         name: "officeNumber",
//         message:"If you are a Manager, please enter your office phone number."
//     },
//     {
//         type: "input",
//         name: "github",
//         message:"If you are an Engineer, please enter your Github user name."
//     },
//     { 
//         type: "input",
//         name: "school",
//         message:"If you are an Intern, please enter the school you attend."
//     },
//     { //More Employees?
//         type: "confirm",
//         name: "addAnother",
//         message:"Would you like to add another employee?"
//     },
// ])
// addEmployee(); 




// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

render();

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
