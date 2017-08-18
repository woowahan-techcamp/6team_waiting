export class Scroll {
    
    constructor() {
        this.position = 0;
    }

    saveScrollPosition(ele) {
        this.position = document.querySelector(ele).scrollTop;
    }

    setScrollPosition(ele) {
        const scroll = this.getScrollPosition();
        if (scroll) {
            document.querySelector(ele).scrollTop += scroll;
        }
    }

    scrollPositionReset() {
        this.position = 0;
    }

    getScrollPosition() {
        return this.position;
    }
}