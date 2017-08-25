export class StoreModel {
    constructor(title, desc, tel, addr, addrX, addrY, id, menu, img){
        this.storeName = title;
        this.storeTel = tel;
        this.storeAddress = addr;
        this.storeDesc = desc;
        this.storeLongitude = addrX;
        this.storeLatitude = addrY;
        this.memberId = id;
        this.menus = menu;
        this.storeImgUrl = img;
    }
}
