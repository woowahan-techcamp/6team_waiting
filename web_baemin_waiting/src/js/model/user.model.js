export class UserModel {

    constructor(email, name, role, user_tel) {
        this._email = email;
        this._name = name; 
        this._role = role;
        this._user_tel = user_tel;
    }

    set email(email) {
        this._email = email;
    }

    get email() {
        return this._email;
    }

    set name(name) {
        this._name = name;
    }

    get name() {
        return this._name;
    }

    set role(role) {
        this._role = role;
    }

    get role() {
        return this._role;
    }

    set user_tel(tel) {
        this._user_tel = tel;
    } 

    get user_tel() {
        return this._user_tel;
    }


}