// TODO: Write code to define and export the Employee class


class Employee {
    constructor(name, id, email) {
        this.name = name;
        this.id = id;
        this.email = email;
    }
 
    getName () {
        this.name = name;
    };

    getId() {
        this.id = id;
    }

    getEmail () {
        this.email = email;
    }
}
module.exports = Employee