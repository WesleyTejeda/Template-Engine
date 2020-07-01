const Employee = require("./Employee");

// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Manager.
class Manager extends Employee {
    constructor(name, id, email, officeNumber){
        super(name, id, email);
        this.officeNumber = officeNumber;
        this.role = "Manager";
    }
}
Manager.prototype.getName = function(){
    return this.name;
}

Manager.prototype.getId = function(){
    return this.id;
}

Manager.prototype.getEmail = function(){
    return this.email;
}

Manager.prototype.getOfficeNumber = function(){
    return this.officeNumber;
}

Manager.prototype.getRole = function(){
    return this.role;
}

module.exports = Manager;