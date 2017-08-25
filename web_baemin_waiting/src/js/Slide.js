export class Slide {

    constructor(slides) {
        this.index = 1;
        this.slides = document.getElementsByClassName(slides);
        this.slideDots = document.querySelector(".slide-dots");
        this.dots = document.querySelectorAll("[data-n]");
        this.size = this.slides.length;
        this.init();
    }

    init() {
        this.slideDots.addEventListener("click", (e) => {
            if (e.target && e.target.nodeName === "SPAN") {
                this.clearDot();

                this.index = e.target.dataset.n;
                e.target.classList.add("curr");

                this.showSlide(this.index);
            }
        });
    }

    currentSlide(n) {
        this.index = n;
        this.showSlide(n);
    }

    plusSlide(n) {
        this.showSlide(this.index += n);
    }

    showSlide(n) {
        if (n > this.size) {
            this.index = 1;
        } 
        if (n < 1) {
            this.index = this.size;
        } 

        for (let i = 0; i < this.size; i++) {
           this.slides[i].style.display = "none"; 
        }

        this.clearDot();
        this.dots[this.index-1].classList.add("curr");

        this.slides[this.index-1].style.display = "block";
    }

    clearDot() {
        const current = document.querySelector(".curr");
        if (current) {
            current.classList.remove("curr");
        }
    }

}