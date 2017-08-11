(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['home'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"view\"></div>\n\n<div class=\"home\">\n    <h1>배민 웨이팅</h1>\n    <p>맛집의 손님들을 위한 대기 서비스</br>이제 배민웨이팅으로 고객들에게 더 좋은 서비스로</p>\n    <div class=\"btn-area\">\n        <button id=\"btn-intro\">서비스 소개</button>\n        <button id=\"btn-go-login\">로그인 하기</button>\n    </div>\n</div>\n\n\n<div class=\"intro\">\n    <span id=\"btn-intro-close\" class=\"btn-close\"><img src=\"./close.png\"></span>\n</div>\n\n\n<div class=\"sign-in\">\n    <span id=\"btn-login-close\" class=\"btn-close\"><img src=\"./close.png\"></span>\n    <div class=\"sign-area\">\n\n        <input type=\"text\">\n        <input type=\"password\">\n        <button id=\"btn-login\">로그인</button>\n        <button id=\"btn-go-sign-up\">회원가입 하기</button>\n    </div>\n</div>\n\n\n<div class=\"sign-up\">\n    <span id=\"btn-sign-close\" class=\"btn-close\"><img src=\"./close.png\"></span>\n    <span class=\"sign-up-title\">WELCOME</span>\n    <div class=\"sign-up-form\">\n        <dl>\n            <dt>이름</dt>\n            <dd><input type=\"text\"></dd>\n            <dt>아이디</dt>\n            <dd><input type=\"text\"></dd>\n            <dt>비밀번호</dt>\n            <dd><input type=\"password\"></dd>\n            <dt>전화번호</dt>\n            <dd><input type=\"text\"></dd>\n        </dl>\n    </div>\n    <button id=\"btn-sign-up\">회원가입</button>\n</div>\n\n<div class=\"nav\">\n    <ul>\n        <li id=\"navi-home\">홈</li>\n        <li>마이 페이지</li>\n        <li>가게 관리</li>\n    </ul>\n</div>\n\n<div class=\"board\">\n    <div class=\"not-register\">\n        <span>등록된 가게가 없습니다.</span>\n        <span>먼저 가게를 등록해주세요.</span>\n        <button id=\"btn-go-register\">가게 등록 하기</button>\n    </div>\n</div>\n";
},"useData":true});
})();