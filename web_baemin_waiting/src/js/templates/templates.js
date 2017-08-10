(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
<<<<<<< Updated upstream
templates['home'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<section id=\"home\">\n  This is "
    + container.escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"name","hash":{},"data":data}) : helper)))
    + ".\n</section>";
=======
templates['board'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"board\">\n</div>";
},"useData":true});
templates['home'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"home\">\n    <h1>배민 웨이팅</h1>\n    <p>맛집의 손님들을 위한 대기 서비스</p>\n    <p>이제 배민웨이팅으로 고객들에게 더 좋은 서비스로</p>\n    <div class=\"btn-area\">\n        <button id=\"btn-intro\">서비스 소개</button>\n        <button id=\"btn-go-login\">로그인 하기</button>\n    </div>\n</div>";
},"useData":true});
templates['intro'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"intro\">\n    서비스 소개\n    <span id=\"btn-intro-close\" class=\"btn-close\"><img src=\"./close.png\"></span>\n</div>";
},"useData":true});
templates['nav'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"nav\">\n    <ul>\n        <li id=\"navi-home\">홈</li>\n        <li>마이 페이지</li>\n        <li>가게 관리</li>\n    </ul>\n</div>";
},"useData":true});
templates['sign-in'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"sign-in\">\n    <span id=\"btn-login-close\" class=\"btn-close\"><img src=\"./close.png\"></span>\n    <div class=\"sign-area\">\n\n        <input type=\"text\">\n        <input type=\"password\">\n        <button id=\"btn-login\">로그인</button>\n        <button id=\"btn-go-sign-up\">회원가입 하기</button>\n    </div>\n</div>";
},"useData":true});
templates['sign-up'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"sign-up\">\n    <span id=\"btn-sign-close\" class=\"btn-close\"><img src=\"./close.png\"></span>\n    <span class=\"sign-up-title\">WELCOME</span>\n    <div class=\"sign-up-form\">\n        <dl>\n            <dt>이름</dt>\n            <dd><input type=\"text\"></dd>\n            <dt>아이디</dt>\n            <dd><input type=\"text\"></dd>\n            <dt>비밀번호</dt>\n            <dd><input type=\"password\"></dd>\n            <dt>전화번호</dt>\n            <dd><input type=\"text\"></dd>\n        </dl>\n    </div>\n    <button id=\"btn-sign-up\">회원가입</button>\n</div>";
>>>>>>> Stashed changes
},"useData":true});
})();