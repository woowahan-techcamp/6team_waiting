export class Slide {

    constructor(slides) {
        this.index = 0;
        this.slides = document.getElementsByClassName(slides);
        this.size = this.slides.length;
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

        this.slides[this.index-1].style.display = "block";
    }

}