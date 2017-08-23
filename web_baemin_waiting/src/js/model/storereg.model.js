export class StoreRegModel {
    constructor(title, desc, tel, addr, addrX, addrY, id, menu, img){
        this.storeName = title;
        this.storeTel = tel;
        this.storeAddress = addr;
        this.storeDesc = desc;
        this.storeLatitude = addrX;
        this.storeLongitude = addrY;
        this.memberId = id;
        this.menus = menu;
        this.storeImgUrl = img;
    }
}
