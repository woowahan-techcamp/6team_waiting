export class StoreModel {

    constructor(owner, title, description, address, store_tel, picture, is_opened) {
        this._owner = owner;
        this._title = title; 
        this._description = description;
        this._address = address;
        this._store_tel = store_tel;
        this._picture = picture;
        this._is_opened = is_opened;
    }

    set owner(owner) {
        this._owner = owner;
    }

    get owner() {
        return this._owner;
    }

    set title(title) {
        this._title = title;
    }

    get title() {
        return this._title;
    }

    set store_tel(store_tel) {
        this._store_tel = store_tel;
    }

    get store_tel() {
        return this._store_tel;
    }

    set address(address) {
        this._address = address;
    } 

    get address() {
        return this._address;
    }

    set picture(picture) {
        this._picture = picture;
    } 

    get picture() {
        return this._picture;
    }

    set description(description) {
        this._description = description;
    } 

    get description() {
        return this._description;
    }
    
    set is_opened(is_opened) {
        this._is_opened = is_opened;
    } 

    get is_opened() {
        return this._is_opened;
    }


}