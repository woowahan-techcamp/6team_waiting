import util from "./util.js";
import service from "./services/service.js";


export class Manage {

    constructor(token){
        this.status = "off";
        this.messages = ["입장 5분 전 입니다", "입장 10분 전 입니다", "얼른 안오면 삭제합니다"];
        this.storeId = token.storeId;
        this.managePage();
    }

    managePage() {
        util.setTemplateInHtml(".board", "manage").then(() => {
            this.switchStatus = document.querySelector("#store-status");
            this.lineStatus = document.querySelector("#line-status");
            this.on();
        });
    }

    on() {
        this.switchStatus.addEventListener("change", () => {
            if (!this.switchStatus.checked) {
                this.switchHandler();
            }
        })
        this.lineStatus.addEventListener("change", () => {
            if (!this.lineStatus.checked) {
                this.lineHandler();
            }
        })

        this.getWaitingList();
    }

    getWaitingList() {
        const id = this.storeId;
        service.waitingList(id).then((list) => this.setWaitingListInHtml(list));
        setInterval(() => {
            // @TODO : haeun.kim
            // 가게 관리 페이지를 보고 있을 때만, 지속적으로 받아와야함
            console.log("Get!!");
            service.waitingList(id).then((list) => this.setWaitingListInHtml(list));
        }, 5000);
    }

    setWaitingListInHtml(list) {
        util.setTemplateInHtml(".waiting-list", "waiting-member", list)
            .then(() => this.init());
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
            service.deleteTicket(num, "cancel").then(() => this.getWaitingList());
        }
    }

    deleteHandler(e, num) {
        const answer = confirm("고객이 가게에 입장했습니까?");
        if (answer) {
            service.deleteTicket(num, "in").then(() => this.getWaitingList());
        }
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

        service.push(target.dataset.num, message);
    }

    switchHandler() {
        const answer = confirm("가게를 닫고, 모든 대기 고객을 삭제 하시겠습니까?");
        if (answer) {
            this.switchStatus.checked = false;
            this.lineStatus.checked = false;
        } else {
            this.switchStatus.checked = true;
        }
    }

    lineHandler() {
        const answer = confirm("대기 거부를 하시면 앱에서 대기 신청을 할 수 없습니다. 대기 거부를 하시겠습니까?");
        if (answer) {
            this.lineStatus.checked = false;
        } else {
            this.lineStatus.checked = true;
        }
    }
}