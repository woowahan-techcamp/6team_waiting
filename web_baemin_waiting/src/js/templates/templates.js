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
},"5":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression;

  return "            <li id="
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
    + "</div>\n\n\n<div class=\"sign-in\">\n    <span id=\"btn-login-close\" class=\"btn-close\"><img src=\"/dist/public/images/close.png\"></span>\n    <div class=\"sign-area\">\n        <img class=\"logo\" src=\"/dist/public/images/facebook-logo.png\" alt=\"logo\">\n        <input type=\"text\" id=\"login-id\">\n        <input type=\"password\" id=\"login-pwd\">\n        <p class=\"sign-warning\">아이디와 비밀번호를 확인해주세요<p>\n        <button id=\"btn-login\">로그인</button>\n        <button id=\"btn-go-sign-up\">회원가입 하기</button>\n    </div>\n</div>\n\n\n<div class=\"sign-up\">\n    <span id=\"btn-sign-close\" class=\"btn-close\"><img src=\"/dist/public/images/close.png\"></span>\n    <span class=\"sign-up-title\">WELCOME</span>\n    <div class=\"sign-up-form\">\n        <dl>\n            <dt>이름</dt>\n            <dd><input type=\"text\" id=\"sign-name\"></dd>\n            <dt>아이디</dt>\n            <dd><input type=\"text\" id=\"sign-id\"></dd>\n            <dt>비밀번호</dt>\n            <dd><input type=\"password\" id=\"sign-pwd\"></dd>\n            <dt>전화번호</dt>\n            <dd><input type=\"text\" id=\"sign-tel\"></dd>\n        </dl>\n        <button id=\"btn-sign-up\">회원가입</button>\n    </div>\n</div>\n\n\n<div class=\"nav\">\n    <ul class=\"navigator\">\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0["navi-list"] : depth0),{"name":"each","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "    </ul>\n    <div class=\"dropdown\">\n        <a href=\"javascript:;\"><img src=\"/dist/public/images/menu.png\" id=\"drop\"></a>\n        <ul class=\"dropdown-list\">\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0["navi-list"] : depth0),{"name":"each","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "        </ul>\n    </div>\n</div>\n\n\n<div class=\"board\"></div>\n";
},"useData":true});
templates['input-menu'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<input class=\"menu-name\" type=\"text\" placeholder=\"메뉴 이름\">\n<input class=\"menu-price\" type=\"number\" placeholder=\"메뉴 가격\">\n<button class=\"remove-menu\">-</button>\n";
},"useData":true});
templates['manage'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"manage\">\n    <h1>가게 이름</h1>\n\n    <div class=\"waiting-list\">\n        <div class=\"waiting-member\">\n            \n            <div class=\"waiting-btn-area\">\n                <div class=\"btn-alarm\"></div>\n                <div class=\"btn-delete\"></div>\n            </div>\n        </div>\n\n    </div>\n\n    <div class=\"input-client\">\n    </div>\n</div>";
},"useData":true});
templates['modify-store'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"register-store\">\n    <h1 class=\"regist-title\">사장님의 가게를 수정해주세요</h1>\n    <div>\n        <dl class=\"reg-form\">\n            \n            <dt>업체명</dt>\n            <dd>\n                <input type=\"text\" id=\"mod-name\" value=\"원래 저장된 이름\">\n                <button id=\"btn-search-store\">검색</button>\n            </dd>\n\n            <dt>업체 위치</dt>\n            <dd><input type=\"text\" id=\"mod-location\" value=\"원래 저장된 설명\"></dd>\n\n            <dt>업체 설명</dt>\n            <dd><input type=\"text\" id=\"mod-desc\"></dd>\n\n            <dt>업체 사진</dt>\n            <dd><input type=\"file\"></dd>\n\n            <dt>메뉴</dt>\n            <dd class=\"menus\">\n                <button class=\"add-menu\">+</button>\n            </dd>\n            \n        </dl>\n    </div>\n\n    <button id=\"btn-reg-store\">가게등록</button>\n\n</div>";
},"useData":true});
templates['my-info'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "<div class=\"my-info\">\n    <div class=\"my-auth\">\n        <dl class=\"my-auth-form\">\n            <dt>이름</dt>\n            <dd><input type=\"text\" id=\"mod-name\" value="
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.user : depth0)) != null ? stack1._name : stack1), depth0))
    + "></dd>\n\n            <dt>비밀번호</dt>\n            <dd><input type=\"password\" id=\"mod-pwd\"></dd>\n\n            <dt>연락처</dt>\n            <dd><input type=\"number\" id=\"mod-tel\" value="
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.user : depth0)) != null ? stack1._user_tel : stack1), depth0))
    + "></dd>\n        </dl>\n\n        <button id=\"btn-info-modify\">수정하기</button>\n    </div>\n\n    <div class=\"vertical-line\"></div>\n\n    <div class=\"my-store\">\n        <dl class=\"my-store-form\">\n            <dt>우리가게 이름</dt>\n            <dd>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.store : depth0)) != null ? stack1._title : stack1), depth0))
    + "</dd>\n\n            <dt>우리가게 설명</dt>\n            <dd>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.store : depth0)) != null ? stack1._description : stack1), depth0))
    + "</dd>\n\n            <dt>우리가게 전화번호</dt>\n            <dd>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.store : depth0)) != null ? stack1._store_tel : stack1), depth0))
    + "</dd>\n\n            <dt>우리가게 사진</dt>\n            <dd class=\"my-img-box\">\n                <img src="
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.store : depth0)) != null ? stack1._picture : stack1), depth0))
    + " alt=\"\">\n            </dd>\n\n            <dt>우리가게 메뉴</dt>\n            <dd class=\"menus\">\n                <table>\n                    <tr>\n                        <td class=\"menu-name\">메뉴이름</td>\n                        <td class=\"menu-line\">· · · · · ·</td>\n                        <td class=\"menu-price\">메뉴가격</td>\n                    </tr>\n                </table>\n            </dd>\n        </dl>\n\n        <button id=\"btn-go-modify\">수정하러가기</button>\n    </div>\n\n</div>";
},"useData":true});
templates['my-page'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"my-page\">\n    <h1>마이 페이지</h1>\n    <div class=\"my-page-area\">\n        <div class=\"my-confirm\">\n            <p>본인 인증을 위해 비밀번호를 입력해주세요.</p>\n            <input type=\"password\" autofocus>\n            <button id=\"btn-confirm\">확인</button>\n        </div>\n    </div>\n</div>";
},"useData":true});
templates['no-store'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"go-register\">\n    <span>등록된 가게가 없습니다.</span>\n    <span>먼저 가게를 등록해주세요.</span>\n    <button id=\"btn-go-register\">가게 등록 하기</button>\n</div>";
},"useData":true});
templates['register'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"register-store\">\n    <h1 class=\"regist-title\">사장님의 가게를 등록해주세요</h1>\n    <div>\n        <dl class=\"reg-form\">\n            \n            <dt>업체명</dt>\n            <dd>\n                <input type=\"text\" id=\"regist-name\">\n                <button id=\"btn-search-store\">검색</button>\n            </dd>\n\n            <dt>업체 위치</dt>\n            <dd><input type=\"text\" id=\"regist-location\"></dd>\n\n            <dt>전화번호</dt>\n            <dd><input type=\"number\" id=\"regist-tel\"></dd>\n\n            <dt>업체 설명</dt>\n            <dd><input type=\"text\" id=\"regist-desc\"></dd>\n\n            <dt>업체 사진</dt>\n            <dd><input type=\"file\" id=\"regist-file\"></dd>\n\n            <dt>메뉴</dt>\n            <dd class=\"menus\">\n                <button class=\"add-menu\">+</button>\n            </dd>\n            \n        </dl>\n    </div>\n\n    <button id=\"btn-reg-store\">가게등록</button>\n\n</div>";
},"useData":true});
templates['store-list'] = template({"1":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression;

  return "        <div class=\"store-card\">\n            <img class=\"card-img\" src= \""
    + alias2(alias1((depth0 != null ? depth0._picture : depth0), depth0))
    + "\" alt=\"\">\n            <dl>\n                <dt class=\"card-title\">"
    + alias2(alias1((depth0 != null ? depth0._title : depth0), depth0))
    + "</dt>\n                <dd class=\"card-desc\">"
    + alias2((helpers.trimString || (depth0 && depth0.trimString) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0._description : depth0),0,38,{"name":"trimString","hash":{},"data":data}))
    + "</dd>\n            </dl>\n        </div>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"store-list\">\n    <h1>가게 둘러보기</h1>\n\n    <div class=\"store-card-list\">\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),depth0,{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "    </div>\n\n</div>";
},"useData":true});
})();