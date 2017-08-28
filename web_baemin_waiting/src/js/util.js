import service from "./services/service.js";


const util = {
    log(content) {
        if (window.console) console.log(content);
        else alert(content);
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

Handlebars.registerHelper("trimString", function(passedString, startstring, endstring) {
   let theString = passedString.substring(startstring, endstring);

   if (passedString.length > endstring) {
       theString += "...";
   }
   return new Handlebars.SafeString(theString);
});

Handlebars.registerHelper("storeStatus", function(status, num) {
    let storeStatus = [];

    if (status === 0) {
        storeStatus = ["", ""];
    } else if (status === 1) {
        storeStatus = ["checked", "checked"];
    } else {
        storeStatus = ["checked", ""];
    }

    console.log(storeStatus);
    return storeStatus[num];
});

export default util;
