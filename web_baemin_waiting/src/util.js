const _ = {
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
        const pos = document.querySelector(position);
        const html = Handlebars.templates[temp];
        pos.innerHTML = html(data);
    }
}

export default _;
