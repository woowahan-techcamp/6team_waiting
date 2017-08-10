document.addEventListener("DOMContentLoaded", () => {

    window.addEventListener("scroll", (ev) => {
        const scrollPosition = window.scrollY;
        if (scrollPosition > 150) {
            document.querySelector(".header-navi").classList.toggle("header-bar", true);
        } else {
            document.querySelector(".header-navi").classList.toggle("header-bar", false);
        }
    });

    const naviHome = document.querySelector("#navi-home");
    const naviIntro = document.querySelector("#navi-introduce");
    const naviManage = document.querySelector("#navi-manage");
    const manage = document.querySelector(".manage-title");

    naviHome.addEventListener("click", () => {
        const target = document.querySelector(".view");
        smoothScroll(target);
    });

    naviIntro.addEventListener("click", () => {
        const target = document.querySelector(".intro");
        smoothScroll(target);
    });

    naviManage.addEventListener("click", () => {
        const target = document.querySelector(".show-manage");
        smoothScroll(target);
    });

    manage.addEventListener("click", () => {
        const manageArea = document.querySelector(".show-manage");
        const manageStatus = document.querySelector("#manage-status");
        const manageArrow = document.querySelector("#manage-arrow");
        const sign = document.querySelector(".sign-box");

        manageArea.classList.toggle("managing");
        if (manageStatus.innerHTML == "서비스 소개 보기") {
            sign.style.display = "none";
            manageStatus.innerHTML = "가게 관리하기";
            // manageArrow.style.backgroundImage = "url('right-arrow.png')";
        } else {
            sign.style.display = "block";
            manageStatus.innerHTML = "서비스 소개 보기";
            // manageArrow.style.backgroundImage = "url('down-arrow.png')";
            smoothScroll(document.querySelector(".intro"));
        }
    })

})

// Menu bar onclick scroll
window.smoothScroll = function(target) {
    let scrollContainer = target;
    do { //find scroll container
        scrollContainer = scrollContainer.parentNode;
        if (!scrollContainer) return;
        scrollContainer.scrollTop += 1;
    } while (scrollContainer.scrollTop == 0);

    let targetY = 0;
    do { //find the top of target relatively to the container
        if (target == scrollContainer) break;
        targetY += target.offsetTop;
    } while (target = target.offsetParent);

    scroll = function(c, a, b, i) {
        if (++i > 30) return;
        c.scrollTop = a + (b - a) / 30 * i;
        setTimeout(() => { scroll(c, a, b, i); }, 10);
    }
    // start scrolling
    scroll(scrollContainer, scrollContainer.scrollTop, targetY, 0);
}