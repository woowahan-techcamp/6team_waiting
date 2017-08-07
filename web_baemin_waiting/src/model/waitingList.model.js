export class WaitingListModel {

    // @haeun.kim : 변수 갯수가 충분히 많아서 builder pattern 을 고려해볼 필요가 있을 듯 합니다. 
    constructor(store) {
        this._store = store;
        this._ticket_list = null; 
    }

    set store(store) {
        this._store = store;
    }

    get store() {
        return this._store;
    }

    set ticket_list(ticket_list) {
        this._ticket_list = ticket_list;
    }

    get ticket_list() {
        return this._ticket_list;
    }



}