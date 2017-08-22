export class Manage {

    constructor(){
        this.btnWaiting = document.querySelectorAll(".waiting-btn-area");
        this.init();
    }

    init() {
        this.btnWaiting.forEach((btn) => {
            btn.addEventListener("click", (e) => {
                if (e.target && e.target.nodeName === "DIV") {
                    this.btnWaitingHandler(e);
                }
                if (e.target && e.target.nodeName === "LI") {
                    this.sendMessage(e);
                }
            })
        })
    }

    btnWaitingHandler(e) {
        if (e.target.className === "btn-alarm") {
            this.alarmHandler(e.target);
        } else if (e.target.className === "btn-delete"){
            this.deleteHandler(e.target);
        }
    }

    alarmHandler(e) {
        const alarmOptions = e.querySelector(".alarm-opt");
        alarmOptions.classList.toggle("show-opt");
    }

    deleteHandler() {
        const answer = confirm("고객을 삭제하시겠습니까?");
        // @TODO : haeun.kim
        // delete waiting ticket
    }

    sendMessage(e) {
        const opt = e.target.innerHTML;
        if (opt === "5분 전") {
            // @TODO : haeun.kim 
            // send message to DB
            console.log("입장 5분 전 입니다. 매장으로 와주시기 바랍니다.");
        } else if (opt === "10분 전") {
            console.log("입장 10분 전 입니다. 매장 근처에서 대기 해주시기 바랍니다.");
        }
        document.querySelector(".alarm-opt").classList.remove("show-opt");
    }
}