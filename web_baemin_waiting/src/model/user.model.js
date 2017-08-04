class User {

    constructor(email, name, role, user_tel) {
        this.email = email;
        this.name = name; 
        this.role = role;
        this.user_tel = user_tel;
    }

    set email(email) {
        this.email = email;
    }

    get email() {
        return this.email;
    }

    set name(name) {
        this.name = name;
    }

    get name() {
        return this.name;
    }

    set role(role) {
        this.role = role;
    }

    get role() {
        return this.role;
    }

    set user_tel(tel) {
        this.user_tel = tel;
    } 

    get user_tel() {
        return this.user_tel;
    }


}