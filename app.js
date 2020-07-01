const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
let employeeArr = [];
function addMember(){
    inquirer.prompt([
        {
            type: "rawlist",
            message: "Please add a member of the team. If no more entries, please choose `Exit` choice.",
            name: "role",
            choices: [
                "Manager",
                "Engineer",
                "Intern",
                "Exit"
            ]
        },
    ]).then(function(resp){
        if (resp.role === "Manager"){
            inquirer.prompt([
                {
                    type: "input",
                    message: "Enter the following info for new manager respectively: Name ID Email Office#",
                    name: "info"
                }
            ]).then(function(resp){
                let obj = {};
                let placeHolder = resp.info.split(" ");
                obj.name = placeHolder[0];
                obj.id = placeHolder[1];
                obj.email = placeHolder[2];
                obj.officeNumber = placeHolder[3];
                const person = new Manager(obj.name, obj.id, obj.email, obj.officeNumber);
                employeeArr.push(person);
                addMember();
            })
            
        }
        if (resp.role === "Engineer"){
            inquirer.prompt([
                {
                    type: "input",
                    message: "Enter the following info for new engineer respectively: `Name` `ID` `Email` `GithubUserName`",
                    name: "info"
                }
            ]).then(function(resp){
                let obj = {};
                let placeHolder = resp.info.split(" ");
                obj.name = placeHolder[0];
                obj.id = placeHolder[1];
                obj.email = placeHolder[2];
                obj.github = placeHolder[3];
                const person = new Engineer(obj.name, obj.id, obj.email, obj.github);
                employeeArr.push(person);
                addMember();
            })
        }
        if (resp.role === "Intern"){
            inquirer.prompt([
                {
                    type: "input",
                    message: "Enter the following info for new intern respectively: Name ID Email School",
                    name: "info"
                }
            ]).then(function(resp){
                let obj = {};
                let placeHolder = resp.info.split(" ");
                obj.name = placeHolder[0];
                obj.id = placeHolder[1];
                obj.email = placeHolder[2];
                obj.school = placeHolder[3];
                const person = new Intern(obj.name, obj.id, obj.email, obj.school);
                employeeArr.push(person);
                addMember();
            })
        }
        if(resp.role === "Exit"){
            console.log("Exiting input. Generating HTML...");
            return render(employeeArr);

            // let html = render(employeeArr);
            // console.log(html);
            // console.log("HTML generated!");
            // return null;
        }
    });
}
// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

let html = addMember();
console.log(html);
console.log("HTML generated!");

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
