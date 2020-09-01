// TODO: Write code to define and export the Employee class


class Employee {
    constructor(name, id, email) {
        this.name = name;
        this.id = id;
        this.email = email;
    }
 
    getName () {
        return this.name = name;
    };

    getId() {
        return this.id = id;
    }

    getEmail () {
        return this.email = email;
    }

    getRole () {
        return "Employee";
    }
}
module.exports = Employee