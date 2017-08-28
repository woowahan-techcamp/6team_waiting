import util from "./util.js";
import service from "./services/service.js";


export class Manage {

    constructor(token){
        this.status = "off";
        this.messages = ["입장 5분 전 입니다", "입장 10분 전 입니다", "얼른 안오면 삭제합니다"];
        this.token = token;
        this.storeId = token.storeId;
        this.refresh = undefined;
        this.isShowing = true;
        this.managePage();
    }

    managePage() {
        service.getStoreInfo(this.token).then((info) => {
            console.log(info);
        })
        util.setTemplateInHtml(".board", "manage").then(() => {
            this.switchStatus = document.querySelector("#store-status");
            this.lineStatus = document.querySelector("#line-status");
            this.btnAdd = document.querySelector("#btn-add-client");
            this.on();
        });
    }

    on() {
        this.switchStatus.addEventListener("change", () => { this.switchHandler(); })
        this.lineStatus.addEventListener("change", () => { this.lineHandler(); });
        this.btnAdd.addEventListener("click", () => { this.addClient(); });
    }

    refreshList() {
        clearInterval(this.refresh);
        const id = this.storeId;
        this.refresh = setInterval(() => {
            console.log("get...");
            this.getWaitingList(id);
        }, 5000);
    }

    getWaitingList(id) {
        service.waitingList(id).then((list) => {
            this.setWaitingListInHtml(list);
        })
    }

    setWaitingListInHtml(list) {
        const waitingList = document.querySelector(".waiting-list");
        if (waitingList) {
            util.setTemplateInHtml(".waiting-list", "waiting-member", list)
                .then(() => this.init());
        }
    }

    init() {
        this.btnWaiting = document.querySelectorAll(".waiting-btn-area");

        this.btnWaiting.forEach((btn) => {
            btn.addEventListener("click", (e) => {
                if (e.target && e.target.nodeName === "DIV") {
                    const ticketNum = e.target.parentNode.parentNode.dataset.num;
                    this.btnWaitingHandler(e, ticketNum);
                }
                if (e.target && e.target.nodeName === "LI") {
                    const target = e.target.parentNode.parentNode.parentNode.parentNode;
                    this.sendMessage(e, target);
                }
            })
        })
    }

    btnWaitingHandler(e, num) {
        if (e.target.className === "btn-alarm") {
            this.alarmHandler(e.target);
        } else if (e.target.className === "btn-delete-in"){
            this.cancelHandler(e.target, num);
        } else {
            this.deleteHandler(e.target, num);
        }
    }

    alarmHandler(e) {
        const alarmOptions = e.querySelector(".alarm-opt");
        alarmOptions.classList.toggle("show-opt");
    }

    cancelHandler(e, num) {
        const answer = confirm("고객을 삭제하시겠습니까?");
        if (answer) {
            service.deleteTicket(num, "cancel").then(() => this.getWaitingList(this.storeId));
        }
    }

    deleteHandler(e, num) {
        const answer = confirm("고객이 가게에 입장했습니까?");
        if (answer) {
            service.deleteTicket(num, "in").then(() => this.getWaitingList(this.storeId));
        }
    }

    addClient() {
        const name = document.querySelector("#add-name").value;
        const count = document.querySelector("#add-count").value;
        const tel = document.querySelector("#add-tel").value;

        service.addTicket(this.storeId, name, count, 0, tel).then(() => this.getWaitingList(this.storeId));
    }

    sendMessage(e, target) {
        const opt = e.target.innerHTML;
        let message = this.messages[0];

        if (opt === "5분 전") {
            target.querySelector("#m5").style.visibility = "visible";
            message = this.messages[0];
        } else if (opt === "10분 전") {
            target.querySelector("#m10").style.visibility = "visible";
            message = this.messages[1];
        } 

        service.push(parseInt(target.dataset.num), message);
    }

    switchHandler() {
        if (!this.switchStatus.checked) {
            this.closeStore();
        } else {
            service.changeStatus(this.token, "deny").then((result) => this.getWaitingList(this.storeId));
        }
    }

    closeStore() {
        const answer = confirm("가게를 닫고, 모든 대기 고객을 삭제 하시겠습니까?");
        if (answer) {
            this.switchStatus.checked = false;
            this.lineStatus.checked = false;
            service.changeStatus(this.token, "off").then((result) => {
                this.getWaitingList(this.storeId);
                clearInterval(this.refresh);
            });
        } else {
            this.switchStatus.checked = true;
        }
    }

    lineHandler() {
        if (this.switchStatus.checked) {
            this.allowWaitingLine();
        } else {
            alert("가게가 닫혀있어서 대기를 허용할 수 없습니다.");
            this.lineStatus.checked = false;
        }
    }

    allowWaitingLine() {
        if (!this.lineStatus.checked) {
            this.denyWaitingLine();
        } else {
            service.changeStatus(this.token, "on").then((result) => this.refreshList());
        }
    }

    denyWaitingLine() {
        const answer = confirm("대기 거부를 하시면 앱에서 대기 신청을 할 수 없습니다. 대기 거부를 하시겠습니까?");
        if (answer) {
            this.lineStatus.checked = false;
            service.changeStatus(this.token, "deny").then((result) => {
                this.getWaitingList(this.storeId);
                clearInterval(this.refresh);
            });
        } else {
            this.lineStatus.checked = true;
        }
    }

}