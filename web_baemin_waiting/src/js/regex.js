export class Regex {

    constructor() {}

    isAddrress(add) {
        // 모든 문자열에 대한 {2,30} 글자 수 확인
        const regAdd = /^[\w\Wㄱ-ㅎㅏ-ㅣ가-힣]{2,30}$/;
        return regAdd.test(add);
    }

    isDescription(desc) {
        // 모든 문자열에 대한 {2,40} 글자 수 확인
        const regName = /^[\w\Wㄱ-ㅎㅏ-ㅣ가-힣]{2,20}$/;
        return regName.test(desc);
    }

    isID(id) {
        // 대소문자의 알파벳과 숫자에 대한 {4,10} 글자 확인
        const regId = /^[\w]{4,10}$/;
        return regId.test(id);
    }

    isImage(file) {
        // jpg, jpeg, gif 또는 png 확장자를 가진 그림 파일명
        const regImg = /([^\s]+(?=\.(jpg|jpeg|gif|png))\.\2)/;
        return regImg.test(file);
    }

    isMenu(menu) {
        // 모든 문자열에 대한 {1,10} 글자 수 확인
        const regMenu = /^[\w\Wㄱ-ㅎㅏ-ㅣ가-힣]{1,10}$/;
        return regMenu.test(menu);
    }

    isName(name) {
        // 숫자를 제외한 모든 문자열에 대한 {2,20} 글자 수 확인
        const regName = /^[a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣]{2,20}$/;
        return regName.test(name);
    }

    isPassword(pwd) {
        // 문자, 숫자의 조합 {6,16} 자리의 문자열 확인
        const regPwd = /^(?=.*[a-zA-Z])(?=.*[0-9]).{6,16}/;
        return regPwd.test(pwd);
    }

    isPrice(price) {
        // 숫자에 대한 {2,10} 글자 확인
        const regPrice = /^[0-9_]{2,10}$/;
        return regPrice.test(price);
    }

    isTel(tel) {
        // 0 으로 시작하는 숫자에 대한 {7,12} 글자 확인
        const regId = /^0[0-9_]{7,12}$/;
        return regId.test(tel);
    }

    isTitle(title) {
        // 띄어쓰기를 포함한 모든 문자열에 대한 {1,10} 글자 수 확인
        const regName = /^[a-zA-Z0-9ㄱ-ㅎㅏ-ㅣ가-힣](.+\s?){1,10}$/;
        return regName.test(title);
    }

    verifyMenu(menu, price) {
        if (this.isMenu(menu) && this.isPrice(price)) {
            return true;
        }
        return false;
    }
}