(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['home'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "        <p>"
    + container.escapeExpression(container.lambda(depth0, depth0))
    + "</p>\n";
},"3":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression;

  return "        <li id="
    + alias2(alias1((depth0 != null ? depth0.id : depth0), depth0))
    + " data-dest="
    + alias2(alias1((depth0 != null ? depth0.dest : depth0), depth0))
    + ">"
    + alias2(alias1((depth0 != null ? depth0.to : depth0), depth0))
    + "</li>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "<div class=\"view\"></div>\n\n\n<div class=\"home\">\n    <h1>배민 웨이팅</h1>\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0["main-desc"] : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "    <div class=\"btn-area\">\n        <button id=\"btn-intro\">서비스 소개</button>\n        <button id=\"btn-go-store\">가게 관리 하기</button>\n    </div>\n</div>\n\n\n<div class=\"intro\">\n    <span id=\"btn-intro-close\" class=\"btn-close\"><img src=\"/dist/public/images/close.png\"></span>\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0["serv-desc"] : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</div>\n\n\n<div class=\"sign-in\">\n    <span id=\"btn-login-close\" class=\"btn-close\"><img src=\"/dist/public/images/close.png\"></span>\n    <div class=\"sign-area\">\n        <img class=\"logo\" src=\"/dist/public/images/logo.png\" alt=\"logo\">\n        <input type=\"text\" id=\"login-id\">\n        <input type=\"password\" id=\"login-pwd\">\n        <button id=\"btn-login\">로그인</button>\n        <button id=\"btn-go-sign-up\">회원가입 하기</button>\n    </div>\n</div>\n\n\n<div class=\"sign-up\">\n    <span id=\"btn-sign-close\" class=\"btn-close\"><img src=\"/dist/public/images/close.png\"></span>\n    <span class=\"sign-up-title\">WELCOME</span>\n    <div class=\"sign-up-form\">\n        <dl>\n            <dt>이름</dt>\n            <dd><input type=\"text\" id=\"sign-name\"></dd>\n            <dt>아이디</dt>\n            <dd><input type=\"text\" id=\"sign-id\"></dd>\n            <dt>비밀번호</dt>\n            <dd><input type=\"password\" id=\"sign-pwd\"></dd>\n            <dt>전화번호</dt>\n            <dd><input type=\"text\" id=\"sign-tel\"></dd>\n        </dl>\n    </div>\n    <button id=\"btn-sign-up\">회원가입</button>\n</div>\n\n\n<div class=\"nav\">\n    <ul class=\"navigator\">\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0["navi-list"] : depth0),{"name":"each","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "    </ul>\n</div>\n\n\n<div class=\"board\"></div>\n";
},"useData":true});
templates['manage'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"manage\">\n    <h1>가게 이름</h1>\n\n    <div class=\"waiting-list\">\n        <div class=\"waiting-member\">\n            \n            <div class=\"waiting-btn-area\">\n                <div class=\"btn-alarm\"></div>\n                <div class=\"btn-delete\"></div>\n            </div>\n        </div>\n\n    </div>\n\n    <div class=\"input-client\">\n    </div>\n</div>";
},"useData":true});
templates['my-page-auth'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"my-page-area\">\n    <p>본인 인증을 위해 비밀번호를 입력해주세요.</p>\n    <input type=\"password\">\n    <button id=\"btn-my-auth\">확인</button>\n</div>";
},"useData":true});
templates['my-page'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"my-page\">\n    <h1>마이 페이지</h1>\n    <div class=\"my-page-area\">\n    </div>\n</div>";
},"useData":true});
templates['no-store'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"go-register\">\n    <span>등록된 가게가 없습니다.</span>\n    <span>먼저 가게를 등록해주세요.</span>\n    <button id=\"btn-go-register\">가게 등록 하기</button>\n</div>";
},"useData":true});
templates['register'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"register-store\">\n    <h1>사장님의 가게를 등록해주세요</h1>\n    <dl class=\"reg-form\">\n        <dt>업체명</dt>\n        <dd><input type=\"text\" id=\"regis-title\"></dd>\n\n        <dt>업체 설명</dt>\n        <dd><input type=\"text\" id=\"regis-desc\"></dd>\n\n        <dt>메뉴</dt>\n        <dd><input></dd>\n\n        <dt>사진 등록</dt>\n        <dd><input type=\"file\"></dd>\n    </dl>\n    <button id=\"btn-reg-store\">가게등록</button>\n\n</div>";
},"useData":true});
})();