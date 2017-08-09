(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['footer'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"corp-desc\">\n    (주) 우아한형제들 | 우아한테크캠프 | 전투민족\n</div>";
},"useData":true});
templates['header'] = template({"1":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression;

  return "    <li id="
    + alias2(alias1((depth0 != null ? depth0.id : depth0), depth0))
    + ">"
    + alias2(alias1((depth0 != null ? depth0.content : depth0), depth0))
    + "</li>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"header-navi\">\n  <ul class=\"inline-list\">\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),depth0,{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "  </ul>\n</div>";
},"useData":true});
templates['main'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"view\">\n</div>\n\n<div class=\"intro\">\n    <h1 id=\"intro-title\">배민 웨이팅, 이렇게 사용하세요</h1>\n    <div class=\"intro-area\">\n        <div class=\"intro-box\">\n            <div class=\"circle intro-img\"></div>\n            <p class=\"intro-desc\">\n                먼저 배민 웨이팅 회원가입으로</br> 사장님의 계정을 만들어주세요.\n            </p>\n        </div>\n        <div class=\"intro-box\">\n            <div class=\"circle intro-img\"></div>\n            <p class=\"intro-desc\">\n                로그인 후, 가게등록에서 </br> 가게명, 가게 소개, 위치, 메뉴 등을</br> 입력해주세요.\n            </p>\n        </div>\n        <div class=\"intro-box\">\n            <div class=\"circle intro-img\"></div>\n            <p class=\"intro-desc\">\n                배민 웨이팅 가게관리 페이지에서</br> 대기 고객들을 </br>효율적으로 관리하세요!\n            </p>\n        </div>\n    </div>\n    <div class=\"show-manage\">\n    <div class=\"manage-title\">\n        <div id=\"manage-status\">가게 관리하기</div>\n        <div id=\"manage-arrow\"></div>\n    </div>\n\n    <div class=\"sign-box\">\n        <div class=\"sign-up-box\">\n            <span class=\"sign-up-title\">Welcome to 배민 웨이팅</span>\n            <dl>\n                <dt>아이디</dt>\n                <dd><input type=\"text\"></dd>\n                <dt>이름</dt>\n                <dd><input type=\"text\"></dd>\n                <dt>비밀번호</dt>\n                <dd><input type=\"password\"></dd>\n                <dt>전화번호</dt>\n                <dd><input type=\"tel\"></dd>\n            </dl>\n            <button class=\"sign-up-button\">회원가입</button>\n        </div>\n        <div class=\"vertical-line\"></div>\n        <div class=\"sign-in-box\">\n\n        </div>\n    </div>\n</div>\n<script src=\"../main.js\"></script>";
},"useData":true});
})();