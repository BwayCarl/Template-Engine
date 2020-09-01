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

let employeesInfo = [];

const enterEmployeeInfo = () => {
   

inquirer.prompt([
    { //Role
        type: "checkbox",
        name: "role",
        message:"What is the employee's job title?",
        choices: [
            "Manager",
            "Engineer",
            "Intern"]
    },
    { //Name
        type: "input",
        name: "name",
        message:"Please enter employee's full name."
    },
    { //Email
        type: "input",
        name: "email",
        message:"Please enter employee's email address."
    },
    { //ID Number
        type: "input",
        name: "id",
        message:"What is the employee's ID number?"
    },
])
.then(answers => {
            const { role } = answers;       //SWITCH - evaluates an expression, matching the expression's value to a case clause, and executes statements associated 
                                            //with that case, as well as statements in cases that follow the matching case.
                                            //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch

                                            //BREAK - terminates the current switch statement and transfers program control to the statement following the terminated statement.
                                            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/break
        switch(role) {
                //Manager Office Number
            case "Manager":
                specificQuestions(role, "officeNumber", "Please enter the Manager's office phone number?", answers);
            break;
                //Engineer Github
            case "Engineer":
                specificQuestions(role, "github", "Please enter the Engineer's Github profile username?", answers);
            break;
                //Intern School
            case "Intern":
                specificQuestions(role, "school", "Please enter the school the Intern attends.", answers);
            break;
        }
    });
}   
    //Answers specific to the employee role entered
    const specificQuestions = (role, inputType, message, answers) => {
        inquirer.prompt([
            {
                type: "input",
                name: inputType,
                message: message
            }
        ])
        .then(answers => {

            let answer;

            for (let key in answers) {
                answer = answers[key];
            }

            const { name, id, email } = answers;
            let employee;
            
            switch(role) {
                case "Manager":
                    employee = new Manager (name, id, email, answer);
                break;
                case "Engineer":
                    employee = new Engineer (name, id, email, answer);
                break;
                case "Intern":
                    employee = new Intern (name, id, email, answer);
                break;
            }
            employeesInfo.push(employee);
            moreEmployees();
        });
}



const moreEmployees = () => {                       // After the user has input all employees desired, call the `render` function (required
                                                    // above) and pass in an array containing all employee objects; the `render` function will
                                                    // generate and return a block of HTML including templated divs for each employee!
    inquirer.prompt ([
        { //More Employees?
            type: "confirm",
            name: "addAnother",
            message:"Would you like to add another employee?"
        }    
    ])
    .then (answer => {
        if (answer.addAnother === true) {
            enterEmployeeInfo();
        }
        else {
            const teamHtml = render(employeesInfo);
            writeHTMLtoFile(teamHTML);
        }
    })
}
const writeHTMLtoFile = (teamHtml) => {
    fs.writeFile(outputPath, teamHtml, function(err) {  // After you have your html, you're now ready to create an HTML file using the HTML
        if (err) {                                      // returned from the `render` function. Now write it to a file named `team.html` in the
            return console.log(err);                    // `output` folder. You can use the variable `outputPath` above target this location.
        }
     console.log ("Your team.html file is complete!")
    })
};

enterEmployeeInfo();