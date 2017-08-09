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
    }
}

export default _;
