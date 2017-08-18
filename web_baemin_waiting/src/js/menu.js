import { Regex } from "./regex.js";


export class Menu {

    constructor(menus) {
        this.menus = document.querySelector(menus);
        
        this.count = 0;
        this.LIMIT = 10;
    }

    addMenuInput() {
        if (this.count > this.LIMIT) {
            alert(`메뉴는 ${this.LIMIT}개까지만 추가 가능합니다.`);
        } else {
            const newMenu = document.createElement("div");
            const btnAddMenu = document.querySelector(".add-menu");

            newMenu.classList.add("input-menu");
            newMenu.innerHTML = Handlebars.templates["input-menu"]();
            newMenu.insertAdjacentElement("beforeend", btnAddMenu);

            newMenu.querySelector(".remove-menu").addEventListener("click", (e) => {
                this.removeMenuInput(e);
            });

            this.menus.appendChild(newMenu);
            this.count++;
        }
    }

    removeMenuInput(e) {
        if (this.count === 1) {
            alert("1개 이하는 삭제할 수 없습니다.");
        } else {
            const btnAddMenu = document.querySelector(".add-menu");
            e.target.parentNode.remove();
            this.menus.lastChild.insertAdjacentElement("beforeend", btnAddMenu);
            this.count--;
        }
    }

    menusToJSON() {
        const menuList = document.querySelectorAll(".input-menu");
        const menus = this.menuIntoArray(menuList);
        
        return { "menus" : menus };
    }

    menuIntoArray(menuList) {
        const arr = [];
        let isSuccess = true;

        for (let i = 0; i < this.count; i++) {
            const menu = {};
            const menuName = menuList[i].querySelector(".menu-name").value;
            const menuPrice = menuList[i].querySelector(".menu-price").value;
            const menuObj = this.makeMenuToObject(menuName, menuPrice);

            isSuccess = this.objectIntoArray(menuObj, arr);
            if (!isSuccess) {
                alert("한 개 이상의 메뉴(1 - 10 글자) 와 정확한 가격(10 - 1,000,000,000 원)을 입력해주세요");
                break;
            }
        }

        if (isSuccess) {
            return arr;
        }
    }

    objectIntoArray(obj, arr) {
        if (obj) {
            arr.push(obj);
            return true;
        } else {
            return false;
        }
    }

    makeMenuToObject(name, price) {
        const verifiedMenu = this.isVerifiedMenu(name, price);

        if (verifiedMenu) {
            const obj = {};
            obj.name = name;
            obj.price = price;

            return obj;
        }
    }

    isVerifiedMenu(menu, price) {
        const regex = new Regex();
        return regex.verifyMenu(menu, price);
    }

}