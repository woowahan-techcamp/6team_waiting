export class Menu {

    constructor(menus) {
        this.menus = document.querySelector(menus);

        this.count = 0;
        this.LIMIT = 10;
    }

    addMenuInput() {
        if (this.count > this.LIMIT) {
            alert("메뉴는 10개까지만 추가 가능합니다.");
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

    menuToJSON() {
        const menuList = document.querySelectorAll(".input-menu");
        console.log(menuList);
    }


}