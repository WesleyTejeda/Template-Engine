const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

let employeeArr = [];
let managerCreated = false;
init();
function init(){
    //Entry prompt
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
            if(!managerCreated){
                managerInfo();
                function managerInfo(){
                    //Manager prompt
                    inquirer.prompt([
                        {
                            type: "input",
                            message: "Enter the following info for new manager respectively: Name ID# Email:(sample@mail.com) Office#",
                            name: "info"
                        }
                    ]).then(function(resp){
                        //Creates an object with properties based on user input and pushes to our employee array.
                        let obj = {};
                        let placeHolder = resp.info.split(" ");
                        obj.name = placeHolder[0];
                        obj.id = placeHolder[1] || "empty";
                        obj.email = placeHolder[2] || "empty";
                        obj.officeNumber = placeHolder[3] || "empty";
                        //Checks validation for format and undefined answers. Routes back to info submission if not formatted correctly
                        if(obj.name == undefined || !(obj.id.match(/^[1-9]\d*$/)) || !(obj.email.match(/\S+@\S+\.\S+/)) || !(obj.officeNumber.match(/^[1-9]\d*$/))){
                            console.log("You've left some fields empty or entered the wrong format. Please re-enter the information for manager with the correct format.");
                            managerInfo();
                        }
                        else {
                            //Creates new instance and pushes to array if formatted correctly. Routes back to main prompt.
                            const person = new Manager(obj.name, obj.id, obj.email, obj.officeNumber);
                            employeeArr.push(person);
                            managerCreated = true;
                            init();
                        }
                    })
                }
            }
            else {
                console.log("Manager already created.");
                init();
            }
        }
        if (resp.role === "Engineer"){
            engineerInfo();
            function engineerInfo(){
                inquirer.prompt([
                    {
                        type: "input",
                        message: "Enter the following info for new manager respectively: Name ID Email:(sample@mail.com) GithubUserName",
                        name: "info"
                    }
                ]).then(function(resp){
                    //Creates an object with properties based on user input and pushes to our employee array.
                    let obj = {};
                    let placeHolder = resp.info.split(" ");
                    obj.name = placeHolder[0];
                    obj.id = placeHolder[1] || "empty";
                    obj.email = placeHolder[2] || "empty";
                    obj.github = placeHolder[3] || "empty";
                    //Checks validation for format and undefined answers. Routes back to info submission if not formatted correctly
                    if(obj.name == undefined || !(obj.id.match(/^[1-9]\d*$/)) || !(obj.email.match(/\S+@\S+\.\S+/)) || obj.github == "empty"){
                        console.log("You've left some fields empty or entered the wrong format. Please re-enter the information for engineer with the correct format.");
                        engineerInfo();
                    }
                    else {
                        //Creates new instance and pushes to array if formatted correctly. Routes back to main prompt.
                        const person = new Engineer(obj.name, obj.id, obj.email, obj.github);
                        employeeArr.push(person);
                        managerCreated = true;
                        init();
                    }
                });
            }
        }
        if (resp.role === "Intern"){
            internInfo();
            function internInfo(){
                inquirer.prompt([
                    {
                        type: "input",
                        message: "Enter the following info for new intern respectively: Name ID# Email:(sample@mail.com) School",
                        name: "info"
                    }
                ]).then(function(resp){
                    //Creates an object with properties based on user input and pushes to our employee array.
                    let obj = {};
                    let placeHolder = resp.info.split(" ");
                    obj.name = placeHolder[0];
                    obj.id = placeHolder[1] || "empty";
                    obj.email = placeHolder[2] || "empty";
                    obj.school = placeHolder[3];
                    //Checks validation for format and undefined answers. Routes back to info submission if not formatted correctly
                    if(obj.name == undefined || !(obj.id.match(/^[1-9]\d*$/)) || !(obj.email.match(/\S+@\S+\.\S+/)) || obj.school == undefined){
                        console.log("You've left some fields empty or entered the wrong format. Please re-enter the information for intern with the correct format.");
                        internInfo();
                    }
                    else {
                        //Creates new instance and pushes to array if formatted correctly. Routes back to main prompt.
                        const person = new Intern(obj.name, obj.id, obj.email, obj.school);
                        employeeArr.push(person);
                        managerCreated = true;
                        init();
                    }
                });
            }
        }
        if(resp.role === "Exit"){
            //Breaks recursive prompt
            console.log("Exiting input. Generating HTML...");
            generateHTML();
        }
    });
}

//Generates HTML based on members created
function generateHTML(){
    let html = render(employeeArr);
    console.log("Rendering!");
    console.log("HTML generated!");
    writeToFile(html);
}


//Takes in html markup and creates html file
function writeToFile(html){
    //If output directory exists, write to it
    if(fs.existsSync(OUTPUT_DIR)){
        fs.writeFile(outputPath, html, (err) => {
            if (err)
                throw err;
            else console.log("Successfully created and wrote to HTML file. Open the file team.html to view webpage.");
        })
    }
    //If output directory doesn't exist, create it then call writeToFile again.
    else {
        fs.mkdirSync(OUTPUT_DIR);
        writeToFile(html);
    }   
}