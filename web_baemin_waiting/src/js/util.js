import service from "./services/service.js";

const util = {
    log(content) {
        if (window.console) console.log(content);
        else alert(content);
    },

    requestAjax(url, callback) {
        var oReq = new XMLHttpRequest();
        oReq.addEventListener("load", callback);
        oReq.open("GET", url);
        oReq.send();
    },

    setTemplateInHtml(position, temp, data) {
        return new Promise((resolve, reject) => {
            const pos = document.querySelector(position);
            const html = Handlebars.templates[temp];

            if (pos && html) {
                pos.innerHTML = html(data);
                resolve(true);
            } else {
                reject(Error("pos or html is not defined"));
            }
            
        });
    },

}

Handlebars.registerHelper("imgUrl", function(url) {
    // @TODO : haeun.kim 
    // 저장된 url 을 다운로드 가능한 url 로 변환하는 건 비동기 함수 
    // Handlebars.registerHelper 는 비동기를 지원하지 않음 
    service.getStoreImageUrl(url).then((img) => {
        console.log(img);
    });
});

Handlebars.registerHelper('trimString', function(passedString, startstring, endstring) {
   var theString = passedString.substring(startstring, endstring);
   if (passedString.length > endstring) {
       theString += "...";
   }
   return new Handlebars.SafeString(theString);
});

export default util;
