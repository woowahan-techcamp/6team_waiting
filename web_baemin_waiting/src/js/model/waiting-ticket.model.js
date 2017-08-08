export class WaitingTicketModel {

    // @haeun.kim : 변수 갯수가 충분히 많아서 builder pattern 을 고려해볼 필요가 있을 듯 합니다. 
    constructor(user, store, name, user_tel, head_count, is_staying, create_time, push, ticket_number) {
        this._user = user;
        this._store = store; 
        this._name = name;
        this._user_tel = user_tel;
        this._head_count = head_count;
        this._is_staying = is_staying;
        this._create_time = create_time;
        this._push = push;
        this._ticket_number = ticket_number;
    }

    set user(user) {
        this._user = user;
    }

    get user() {
        return this._user;
    }

    set store(store) {
        this._store = store;
    }

    get store() {
        return this._store;
    }

    set name(name) {
        this._name = name;
    }

    get name() {
        return this._name;
    }

    set user_tel(user_tel) {
        this._user_tel = user_tel;
    } 

    get user_tel() {
        return this._user_tel;
    }

    set head_count(head_count) {
        this._head_count = head_count;
    } 

    get head_count() {
        return this._head_count;
    }

    set is_staying(is_staying) {
        this._is_staying = is_staying;
    } 

    get is_staying() {
        return this._is_staying;
    }
    
    set create_time(create_time) {
        this._create_time = create_time;
    } 

    get create_time() {
        return this._create_time;
    }

    set push(push) {
        this._push = push;
    } 

    get push() {
        return this._push;
    }
    
    set ticket_number(ticket_number) {
        this._ticket_number = ticket_number;
    } 

    get ticket_number() {
        return this._ticket_number;
    }
}