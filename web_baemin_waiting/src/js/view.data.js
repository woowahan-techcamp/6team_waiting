const viewData = (() => {
    const whichViewNow = "";

    return {
        setWhichViewNow(viewName){
            this.whichViewNow = viewName;
        },

        getWhichViewNow(){
            console.log(this.whichViewNow);
            return this.whichViewNow;
        }
    }
})();

export default viewData;