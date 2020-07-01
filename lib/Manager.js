const Employee = require("./Employee");

// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Manager.
class Manager extends Employee {
    constructor(name, id, email, officeNumber){
        super(name, id, email);
        this.officeNumber = officeNumber;
        this.role = this.constructor.name;
    }
}

Manager.prototype.getOfficeNumber = function(){
    return this.officeNumber;
}

Manager.prototype.getRole = function(){
    return this.role;
}

module.exports = Manager;