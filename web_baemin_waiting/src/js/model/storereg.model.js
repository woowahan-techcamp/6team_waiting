export class StoreRegModel {
    constructor(title, desc, tel, addr, addrX, addrY, id){
        this.storeName = title;
        this.storeTel = tel;
        this.storeAddress = addr;
        this.storeDesc = desc;
        this.storeLatitude = addrX;
        this.storeLongitude = addrY;
        this.memberId = id;
    }
}