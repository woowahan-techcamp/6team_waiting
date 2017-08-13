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
    }
}

export default util;
