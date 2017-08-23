import service from "./services/service.js";

const util = {
    log(content) {
        if (window.console) console.log(content);
        else alert(content);
    },

    requestAjax(protocol, url, data) {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open(protocol, url);
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    resolve(xhr.response);
                }
            };
            xhr.send(JSON.stringify(data));
        });
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

Handlebars.registerHelper('trimString', function(passedString, startstring, endstring) {
   var theString = passedString.substring(startstring, endstring);
   if (passedString.length > endstring) {
       theString += "...";
   }
   return new Handlebars.SafeString(theString);
});

export default util;
