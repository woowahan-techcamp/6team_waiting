import util from "./util.js";
import service from "./services/service.js";


export class Manage {

    constructor(token){
        this.messages = ["입장 5분 전 입니다", "입장 10분 전 입니다"];
        this.storeId = token.storeId;
        this.getWaitingList();
    }

    getWaitingList() {
        const id = this.storeId;
        service.waitingList(id).then((list) => this.setWaitingListInHtml(list));
    }

    setWaitingListInHtml(list) {
        util.setTemplateInHtml(".board", "manage", list)
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
                    const ticketNum = e.target.parentNode.parentNode.parentNode.parentNode.dataset.num;
                    this.sendMessage(e, ticketNum);
                }
            })
        })
    }

    btnWaitingHandler(e, num) {
        if (e.target.className === "btn-alarm") {
            this.alarmHandler(e.target);
        } else if (e.target.className === "btn-delete"){
            this.deleteHandler(e.target, num);
        }
    }

    alarmHandler(e) {
        const alarmOptions = e.querySelector(".alarm-opt");
        alarmOptions.classList.toggle("show-opt");
    }

    deleteHandler(e, num) {
        const answer = confirm("고객을 삭제하시겠습니까?");
        if (answer) {
            service.deleteTicket(num).then(() => this.getWaitingList());
        }
    }

    sendMessage(e, num) {
        const opt = e.target.innerHTML;
        if (opt === "5분 전") {
            // @TODO : haeun.kim 
            // send message to DB
            const msg = {"msg": this.messages[0]};
            // util.requestAjax("POST", "http://52.78.157.5:8080/push", msg);
            console.log(num, this.messages[0]);
        } else if (opt === "10분 전") {
            console.log(num, this.messages[1]);
        }

        e.target.parentNode.classList.remove("show-opt");
        document.querySelector(".alarm-opt").classList.remove("show-opt");
    }
}