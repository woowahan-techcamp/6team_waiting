import util from "./util.js";


export class Statistic {

    constructor() {
        util.setTemplateInHtml(".board", "statistic").then(() => {
            this.on();
        });
    }

    on() {
        this.headCountChart();
        this.clientAge();
        this.clientTime();
        this.partyRate();
    }

    headCountChart() {
        const ctx = document.getElementById("weekHeadCount").getContext("2d");
        const weekChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ["7월 4주", "8월 1주", "8월 2주", "8월 3주"],
                datasets: [{
                    label: "인원 수",
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: "transparent",
                    data: [260, 250, 300, 280]
                }]
            },
            options: {responsive:true}
        });
    }

    clientAge() {
        const ctx = document.getElementById("clientAge").getContext("2d");
        const ageChart = new Chart(ctx, {
            type: 'horizontalBar',
            data: {
                labels: ["10대", "20대", "30대", "40대"],
                datasets: [{
                    label: "인원 수",
                    data: [170, 370, 340, 150],
                    backgroundColor: ["#ff9292", "	#ffbbb3", "#ffd1aa", "#ffefae"]
                }],  
            },
            options: {responsive:true}
        });
    }

    clientTime() {
        const ctx = document.getElementById("clientTime").getContext("2d");
        const timeChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ["10시","11시","12시","13시","14시","15시","16시","17시","18시","19시","20시","21시"],
                datasets: [{
                    label: "평균 인원 수",
                    data: [5, 25, 35, 23, 15, 3, 4, 18, 32, 40, 33, 15],
                    backgroundColor: "rgba(116, 217, 203, .6)",
                    borderColor: "rgb(116, 217, 203)"
                }],  
            },
            options: {responsive:true}
        });
    }

    partyRate() {
        const ctx = document.getElementById("clientParty").getContext("2d");
        const partyChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ["2인","3인","4인","기타"],
                datasets: [{
                    data: [60,15,20,5],
                    backgroundColor: ["#e5dffb","#d9e9ff","#b8dbfb","#b8bafb"]
                }]
            }
        })
    }
}