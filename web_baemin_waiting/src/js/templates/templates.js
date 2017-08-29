(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['home'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "        <p>"
    + container.escapeExpression(container.lambda(depth0, depth0))
    + "</p>\n";
},"3":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression;

  return "        <div class=\"slide-box\">\n            <div class=\"slides-img\"><img src="
    + alias2(alias1((depth0 != null ? depth0.img : depth0), depth0))
    + "></div>\n            <p>"
    + alias2(alias1((depth0 != null ? depth0.content : depth0), depth0))
    + "</p>  \n        </div>\n";
},"5":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression;

  return "        <li id="
    + alias2(alias1((depth0 != null ? depth0.id : depth0), depth0))
    + " data-dest="
    + alias2(alias1((depth0 != null ? depth0.dest : depth0), depth0))
    + ">"
    + alias2(alias1((depth0 != null ? depth0.to : depth0), depth0))
    + "</li>\n";
},"7":function(container,depth0,helpers,partials,data) {
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
    + "    <div class=\"btn-area\">\n        <button id=\"btn-intro\">서비스 소개</button>\n        <button id=\"btn-go-store\">가게 관리 하기</button>\n    </div>\n</div>\n\n\n<div class=\"intro\">\n    <span id=\"btn-intro-close\" class=\"btn-close\"><img src=\"/dist/public/images/close.png\"></span>\n    <div class=\"intro-title\">배민웨이팅, 이렇게 사용하세요</div>\n\n    <div class=\"slide-navi\">\n        <a class=\"prev\">&#10094;</a>\n        <a class=\"next\">&#10095;</a>\n    </div>\n\n    <div class=\"slide-dots\">\n        <span data-n=\"1\" class=\"curr\"></span>\n        <span data-n=\"2\"></span>\n        <span data-n=\"3\"></span>\n        <span data-n=\"4\"></span>\n    </div>\n\n    <div class=\"slides\">\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0["serv-desc"] : depth0),{"name":"each","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "    </div>\n</div>\n\n\n<div class=\"sign-in\">\n    <span id=\"btn-login-close\" class=\"btn-close\"><img src=\"/dist/public/images/close.png\"></span>\n    <div class=\"sign-area\">\n        <img class=\"logo\" src=\"/dist/public/images/logo.png\" alt=\"logo\">\n        <input type=\"text\" id=\"login-id\" placeholder=\"ID\">\n        <input type=\"password\" id=\"login-pwd\" placeholder=\"●●●●●●\">\n        <p class=\"sign-warning\">아이디와 비밀번호를 확인해주세요<p>\n        <button id=\"btn-login\">로그인</button>\n        <button id=\"btn-go-sign-up\">회원가입 하기</button>\n    </div>\n</div>\n\n\n<div class=\"sign-up\">\n    <span id=\"btn-sign-close\" class=\"btn-close\"><img src=\"/dist/public/images/close.png\"></span>\n    <span class=\"sign-up-title\">WELCOME</span>\n    <div class=\"sign-up-form\">\n        <dl>\n            <dt>이름</dt>\n            <dd><input type=\"text\" id=\"sign-name\" placeholder=\"ex) 크롱 (2-20 글자)\"></dd>\n            <dt>아이디</dt>\n            <dd>\n                <input type=\"text\" id=\"sign-id\" placeholder=\"ex) crong12 (4-10 글자)\">\n                <span id=\"check-dup\">아이디 중복확인을 해주세요</span><button id=\"btn-duplication\">중복확인</button>    \n            </dd>\n            <dt>비밀번호</dt>\n            <dd><input type=\"password\" id=\"sign-pwd\" placeholder=\"문자와 숫자를 포함한 6-16 글자\"></dd>\n            <dt>전화번호</dt>\n            <dd><input type=\"text\" id=\"sign-tel\" placeholder=\"ex) 01012345678\"></dd>\n        </dl>\n        <button id=\"btn-sign-up\">회원가입</button>\n    </div>\n</div>\n\n\n<div class=\"nav\">\n    <ul class=\"navigator\">\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0["navi-list"] : depth0),{"name":"each","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "    </ul>\n    <div class=\"dropdown\">\n        <a href=\"javascript:;\"><img src=\"/dist/public/images/menu.png\" id=\"drop\"></a>\n        <ul class=\"dropdown-list\">\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0["navi-list"] : depth0),{"name":"each","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "        </ul>\n    </div>\n</div>\n\n\n<div class=\"board\"></div>\n";
},"useData":true});
templates['input-menu'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<input class=\"menu-name\" type=\"text\" placeholder=\"메뉴 이름\">\n<input class=\"menu-price\" type=\"number\" placeholder=\"메뉴 가격\">\n<button class=\"remove-menu\">-</button>\n";
},"useData":true});
templates['manage'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var alias1=container.escapeExpression, alias2=depth0 != null ? depth0 : (container.nullContext || {}), alias3=helpers.helperMissing;

  return "<div class=\"manage\">\n    <h1>"
    + alias1(container.lambda((depth0 != null ? depth0.title : depth0), depth0))
    + "</h1>\n\n    <div class=\"manage-switch\">\n        <div class=\"onoff\">\n            <div id=\"switch-off\"></div>\n            <label class=\"switch\">\n                <input type=\"checkbox\" id=\"store-status\" "
    + alias1((helpers.storeStatus || (depth0 && depth0.storeStatus) || alias3).call(alias2,(depth0 != null ? depth0.opened : depth0),0,{"name":"storeStatus","hash":{},"data":data}))
    + ">\n                <span class=\"slider round\"></span>\n            </label>\n            <div id=\"switch-on\"></div>\n        </div>\n\n        <div class=\"line\">\n            <div id=\"switch-deny\"></div>\n            <label class=\"switch\">\n                <input type=\"checkbox\" id=\"line-status\" "
    + alias1((helpers.storeStatus || (depth0 && depth0.storeStatus) || alias3).call(alias2,(depth0 != null ? depth0.opened : depth0),1,{"name":"storeStatus","hash":{},"data":data}))
    + ">\n                <span class=\"slider round\"></span>\n            </label>\n            <div id=\"switch-allow\"></div>\n        </div>\n    </div>\n\n    <div class=\"waiting-list\">\n    </div>\n\n    <div class=\"manage-input-area\">\n        <dl class=\"client-form\">\n            <dt>이름</dt>\n            <dd><input type=\"text\" id=\"add-name\"></dd>\n            <dt>인원</dt>\n            <dd><input type=\"number\" id=\"add-count\"></dd>\n            <dt>전화번호</dt>\n            <dd><input type=\"number\" id=\"add-tel\"></dd>\n        </dl>\n        <button id=\"btn-add-client\">추가</button>\n    </div>\n</div>\n";
},"useData":true});
templates['modify-store'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression;

  return "<div class=\"register-store\">\n    <h1 class=\"regist-title\">사장님의 가게를 수정해주세요</h1>\n    <div>\n        <dl class=\"reg-form\">\n            \n            <dt>업체명</dt>\n            <dd>\n                <input type=\"text\" id=\"mod-name\" value=\""
    + alias2(alias1((depth0 != null ? depth0.title : depth0), depth0))
    + "\">\n            </dd>\n\n            <dt>업체 위치</dt>\n            <dd>\n                <input type=\"text\" id=\"mod-location\" value=\""
    + alias2(alias1((depth0 != null ? depth0.addr : depth0), depth0))
    + "\">\n                <button id=\"btn-search-location\">지도확인</button>\n            </dd>\n\n\n            <dt>업체 설명</dt>\n            <dd><input type=\"text\" id=\"mod-desc\" value=\""
    + alias2(alias1((depth0 != null ? depth0.desc : depth0), depth0))
    + "\"></dd>\n\n            <dt>업체 사진</dt>\n            <dd><input type=\"file\" placeholder=\"파일선택을 눌러 변경\"></dd>\n\n            <dt>메뉴</dt>\n            <dd class=\"menus\">\n                <button class=\"add-menu\">+</button>\n            </dd>\n            \n        </dl>\n    </div>\n\n    <button id=\"btn-reg-store\">가게등록</button>\n\n</div>\n\n\n\n<div class=\"map-modal\">\n    <div class=\"map-modal-content\">\n        <span id=\"btn-map-close\" class=\"btn-close\"><img src=\"/dist/public/images/close.png\"></span>\n        <div id=\"map\"></div>\n        <button id=\"btn-map-confirm\">확인</button>\n    </div>\n</div>";
},"useData":true});
templates['my-info'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.blockHelperMissing.call(depth0,container.lambda(depth0, depth0),{"name":"this","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"2":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression;

  return "                        <tr>\n                            <td class=\"menu-name\">"
    + alias2(alias1((depth0 != null ? depth0.name : depth0), depth0))
    + "</td>\n                            <td class=\"menu-line\">· · · · · ·</td>\n                            <td class=\"menu-price\">"
    + alias2(alias1((depth0 != null ? depth0.price : depth0), depth0))
    + "</td>\n                        </tr>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "<div class=\"my-info\">\n    <div class=\"my-auth\">\n        <dl class=\"my-auth-form\">\n            <dt>이름</dt>\n            <dd><input type=\"text\" id=\"mod-name\" value="
    + alias2(alias1((depth0 != null ? depth0.memberName : depth0), depth0))
    + "></dd>\n\n            <dt>비밀번호</dt>\n            <dd><input type=\"password\" id=\"mod-pwd\"></dd>\n\n            <dt>연락처</dt>\n            <dd><input type=\"number\" id=\"mod-tel\" value="
    + alias2(alias1((depth0 != null ? depth0.memberTel : depth0), depth0))
    + "></dd>\n        </dl>\n\n        <button id=\"btn-info-modify\">수정하기</button>\n    </div>\n\n    <div class=\"vertical-line\"></div>\n\n    <div class=\"my-store\">\n        <dl class=\"my-store-form\">\n            <dt>우리가게 이름</dt>\n            <dd>"
    + alias2(alias1((depth0 != null ? depth0.title : depth0), depth0))
    + "</dd>\n\n            <dt>우리가게 설명</dt>\n            <dd>"
    + alias2(alias1((depth0 != null ? depth0.desc : depth0), depth0))
    + "</dd>\n\n            <dt>우리가게 전화번호</dt>\n            <dd>"
    + alias2(alias1((depth0 != null ? depth0.tel : depth0), depth0))
    + "</dd>\n\n            <dt>우리가게 사진</dt>\n            <dd class=\"my-img-box\">\n                <img src="
    + alias2(alias1((depth0 != null ? depth0.imgUrl : depth0), depth0))
    + " alt=\"\">\n            </dd>\n\n            <dt>우리가게 메뉴</dt>\n            <dd class=\"menus\">\n                <table>\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.menus : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "                </table>\n            </dd>\n        </dl>\n\n        <button id=\"btn-go-modify\">수정하러가기</button>\n    </div>\n\n</div>";
},"useData":true});
templates['my-page'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"my-page\">\n    <h1>마이 페이지</h1>\n    <div class=\"my-page-area\">\n        <div class=\"my-confirm\">\n            <p>본인 인증을 위해 비밀번호를 입력해주세요.</p>\n            <input id=\"pwd-confirm\" type=\"password\" autofocus>\n            <button id=\"btn-confirm\">확인</button>\n        </div>\n    </div>\n</div>";
},"useData":true});
templates['no-store'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"go-register\">\n    <span>등록된 가게가 없습니다.</span>\n    <span>먼저 가게를 등록해주세요.</span>\n    <button id=\"btn-go-register\">가게 등록 하기</button>\n</div>";
},"useData":true});
templates['register'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression;

  return "<div class=\"register-store\">\n    <h1 class=\"regist-title\">우리 가게 정보</h1>\n    <div>\n        <dl class=\"reg-form\">\n            \n            <dt>업체명</dt>\n            <dd>\n                <input type=\"text\" id=\"regist-name\" value=\""
    + alias2(alias1((depth0 != null ? depth0.title : depth0), depth0))
    + "\" placeholder=\"가게명을 입력해주세요\">\n            </dd>\n\n            <dt>업체 위치</dt>\n            <dd>\n                <input type=\"text\" id=\"regist-location\" placeholder=\"도로명 주소 입력 후 '위치 확인' 버튼을 눌러주세요\" value=\""
    + alias2(alias1((depth0 != null ? depth0.addr : depth0), depth0))
    + "\">\n                <button id=\"btn-search-location\">위치 확인</button>\n            </dd>\n\n            <dt>전화번호</dt>\n            <dd><input type=\"number\" id=\"regist-tel\" value=\""
    + alias2(alias1((depth0 != null ? depth0.tel : depth0), depth0))
    + "\" placeholder=\"가게 연락처를 입력해주세요('-'를 제외한 숫자)\"></dd>\n\n            <dt>업체 설명</dt>\n            <dd><input type=\"text\" id=\"regist-desc\" value=\""
    + alias2(alias1((depth0 != null ? depth0.desc : depth0), depth0))
    + "\" placeholder=\"우리 가게에 대해 간단하게 설명해주세요\"></dd>\n\n            <dt>업체 사진</dt>\n            <dd><input type=\"file\" id=\"regist-file\"></dd>\n\n            <dt>메뉴</dt>\n            <dd class=\"menus\">\n                <button class=\"add-menu\">+</button>\n            </dd>\n            \n        </dl>\n    </div>\n\n    <button id=\"btn-reg-store\">가게등록</button>\n</div>\n\n\n<div class=\"map-modal\">\n    <div class=\"map-modal-content\">\n        <span id=\"btn-map-close\" class=\"btn-close\"><img src=\"/dist/public/images/close.png\"></span>\n        <div id=\"map\"></div>\n        <button id=\"btn-map-confirm\">확인</button>\n    </div>\n</div>";
},"useData":true});
templates['statistic'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"stat\">\n    <h1>가계 통계</h1>\n\n    <div class=\"chart-area\">\n        <div class=\"weekCount-area\">\n            <h3>최근 4주간 주별 고객 수 통계</h3>\n            <canvas id=\"weekHeadCount\"></canvas>\n        </div>\n\n        <div class=\"age-area\">\n            <h3>최근 4주간 연령대별 고객 통계</h3>\n            <canvas id=\"clientAge\"></canvas>\n        </div>\n\n        <div class=\"time-area\">\n            <h3>시간대 별 평균 고객 수</h3>\n            <canvas id=\"clientTime\"></canvas>\n        </div>\n\n        <div class=\"party-area\">\n            <h3>동반 인원수별 고객 비율</h3>\n            <canvas id=\"clientParty\"></canvas>\n        </div>\n    </div>\n\n</div>";
},"useData":true});
templates['store-detail'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression;

  return "<div class=\"detail-btn-area\">\n    <button id=\"btn-back\">뒤로가기</button>\n</div>\n<div class=\"store-detail\">\n    <div class=\"store-detail-img\">\n        <img src=\""
    + alias2(alias1((depth0 != null ? depth0.imgUrl : depth0), depth0))
    + "\">\n    </div>\n    <div class=\"store-detail-info\">\n        <h2 class=\"store-detail-title\">"
    + alias2(alias1((depth0 != null ? depth0.title : depth0), depth0))
    + "</h2>\n        <p class=\"store-detail-desc\">\n            상세설명 :: "
    + alias2(alias1((depth0 != null ? depth0.desc : depth0), depth0))
    + " <br>\n            전화번호 :: "
    + alias2(alias1((depth0 != null ? depth0.tel : depth0), depth0))
    + " <br>\n            주소 :: "
    + alias2(alias1((depth0 != null ? depth0.addr : depth0), depth0))
    + " \n        </p>\n    </div>\n</div>";
},"useData":true});
templates['store-list'] = template({"1":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {}), alias4=helpers.helperMissing;

  return "        <div class=\"store-card\" id=\""
    + alias2(alias1((depth0 != null ? depth0.storeId : depth0), depth0))
    + "\">\n            <img class=\"card-img\" id=\""
    + alias2(alias1((depth0 != null ? depth0.storeId : depth0), depth0))
    + "\" src= \""
    + alias2(alias1((depth0 != null ? depth0.storeImgUrl : depth0), depth0))
    + "\" alt=\"\">\n            <dl>\n                <dt class=\"card-title\" id=\""
    + alias2(alias1((depth0 != null ? depth0.storeId : depth0), depth0))
    + "\">"
    + alias2((helpers.trimString || (depth0 && depth0.trimString) || alias4).call(alias3,(depth0 != null ? depth0.storeName : depth0),0,10,{"name":"trimString","hash":{},"data":data}))
    + "</dt>\n                <dd class=\"card-desc\" id=\""
    + alias2(alias1((depth0 != null ? depth0.storeId : depth0), depth0))
    + "\">"
    + alias2((helpers.trimString || (depth0 && depth0.trimString) || alias4).call(alias3,(depth0 != null ? depth0.storeAddress : depth0),0,38,{"name":"trimString","hash":{},"data":data}))
    + "</dd>\n            </dl>\n        </div>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"store-list\">\n    <h1>가게 둘러보기</h1>\n    <div class=\"store-card-list\">\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),depth0,{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "    </div>\n\n</div>";
},"useData":true});
templates['waiting-member'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "<div class=\"waiting-member\" data-num="
    + alias2(alias1((depth0 != null ? depth0.ticketNumber : depth0), depth0))
    + ">\n    <div class=\"waiting-info\">\n        <div class=\"waiting-cli\">\n            <p class=\"waiting-name\">"
    + alias2(alias1((depth0 != null ? depth0.name : depth0), depth0))
    + " <span class=\"waiting-num\">"
    + alias2(alias1((depth0 != null ? depth0.headCount : depth0), depth0))
    + "명</span> </p>\n            <p class=\"waiting-tel\">"
    + alias2(alias1((depth0 != null ? depth0.contactNumber : depth0), depth0))
    + "</p>\n        </div>\n    </div>\n    \n    <div class=\"waiting-btn-area\">\n        <div class=\"btn-alarm\">\n            <ul class=\"alarm-opt\">\n                <li>5분 전</li>\n                <li>10분 전</li>\n            </ul>\n        </div>\n        <div class=\"btn-delete-can\"></div>\n        <div class=\"btn-delete-in\"></div>\n            \n    </div>\n</div>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),depth0,{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true});
})();