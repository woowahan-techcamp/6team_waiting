(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['home'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "        <p>"
    + container.escapeExpression(container.lambda(depth0, depth0))
    + "</p>\n";
},"3":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression;

  return "        <div class=\"slides\">\n            <img src="
    + alias2(alias1((depth0 != null ? depth0.img : depth0), depth0))
    + ">\n            <p>"
    + alias2(alias1((depth0 != null ? depth0.content : depth0), depth0))
    + "</p>\n        </div>\n";
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
    + "    <div class=\"btn-area\">\n        <button id=\"btn-intro\">서비스 소개</button>\n        <button id=\"btn-go-store\">가게 관리 하기</button>\n    </div>\n</div>\n\n\n<div class=\"intro\">\n    <span id=\"btn-intro-close\" class=\"btn-close\"><img src=\"/dist/public/images/close.png\"></span>\n    <div class=\"intro-title\">배민웨이팅, 이렇게 사용하세요</div>\n\n    <div class=\"slide-navi\">\n        <a class=\"prev\">&#10094;</a>\n        <a class=\"next\">&#10095;</a>\n    </div>\n\n    <div class=\"intro-desc\">\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0["serv-desc"] : depth0),{"name":"each","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "    </div> \n</div>\n\n\n<div class=\"sign-in\">\n    <span id=\"btn-login-close\" class=\"btn-close\"><img src=\"/dist/public/images/close.png\"></span>\n    <div class=\"sign-area\">\n        <img class=\"logo\" src=\"/dist/public/images/facebook-logo.png\" alt=\"logo\">\n        <input type=\"text\" id=\"login-id\">\n        <input type=\"password\" id=\"login-pwd\">\n        <p class=\"sign-warning\">아이디와 비밀번호를 확인해주세요<p>\n        <button id=\"btn-login\">로그인</button>\n        <button id=\"btn-go-sign-up\">회원가입 하기</button>\n    </div>\n</div>\n\n\n<div class=\"sign-up\">\n    <span id=\"btn-sign-close\" class=\"btn-close\"><img src=\"/dist/public/images/close.png\"></span>\n    <span class=\"sign-up-title\">WELCOME</span>\n    <div class=\"sign-up-form\">\n        <dl>\n            <dt>이름</dt>\n            <dd><input type=\"text\" id=\"sign-name\"></dd>\n            <dt>아이디</dt>\n            <dd><input type=\"text\" id=\"sign-id\"></dd>\n            <dt>비밀번호</dt>\n            <dd><input type=\"password\" id=\"sign-pwd\"></dd>\n            <dt>전화번호</dt>\n            <dd><input type=\"text\" id=\"sign-tel\"></dd>\n        </dl>\n        <button id=\"btn-sign-up\">회원가입</button>\n    </div>\n</div>\n\n\n<div class=\"nav\">\n    <ul class=\"navigator\">\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0["navi-list"] : depth0),{"name":"each","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "    </ul>\n    <div class=\"dropdown\">\n        <a href=\"javascript:;\"><img src=\"/dist/public/images/menu.png\" id=\"drop\"></a>\n        <ul class=\"dropdown-list\">\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0["navi-list"] : depth0),{"name":"each","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "        </ul>\n    </div>\n</div>\n\n\n<div class=\"board\"></div>\n";
},"useData":true});
templates['input-menu'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<input class=\"menu-name\" type=\"text\" placeholder=\"메뉴 이름\">\n<input class=\"menu-price\" type=\"number\" placeholder=\"메뉴 가격\">\n<button class=\"remove-menu\">-</button>\n";
},"useData":true});
templates['manage'] = template({"1":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression;

  return "        <div class=\"waiting-member\" data-num="
    + alias2(alias1((depth0 != null ? depth0.ticketNumber : depth0), depth0))
    + ">\n            <div class=\"waiting-info\">\n                <p class=\"waiting-name\">"
    + alias2(alias1((depth0 != null ? depth0.name : depth0), depth0))
    + " <span class=\"waiting-num\">"
    + alias2(alias1((depth0 != null ? depth0.headCount : depth0), depth0))
    + "명</span> </p>\n                <p class=\"waiting-tel\">"
    + alias2(alias1((depth0 != null ? depth0.contactNumber : depth0), depth0))
    + "</p>\n            </div>\n            <div class=\"waiting-btn-area\">\n                <div class=\"btn-alarm\">\n                    <ul class=\"alarm-opt\">\n                        <li>5분 전</li>\n                        <li>10분 전</li>\n                    </ul>\n                </div>\n                <div class=\"btn-delete\"></div>\n            </div>\n        </div>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"manage\">\n    <h1>가게 이름</h1>\n\n    <div class=\"waiting-list\">\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),depth0,{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "    </div>\n</div>\n\n<div class=\"manage-input-area\">\n    <dl class=\"client-form\">\n        <dt>이름</dt>\n        <dd><input type=\"text\"></dd>\n        <dt>인원</dt>\n        <dd><input type=\"number\"></dd>\n        <dt>전화번호</dt>\n        <dd><input type=\"number\"</dd>\n    </dl>\n    <button id=\"btn-add-client\">추가</button>\n</div>";
},"useData":true});
templates['modify-store'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"register-store\">\n    <h1 class=\"regist-title\">사장님의 가게를 수정해주세요</h1>\n    <div>\n        <dl class=\"reg-form\">\n            \n            <dt>업체명</dt>\n            <dd>\n                <input type=\"text\" id=\"mod-name\" value=\"원래 저장된 이름\">\n                <button id=\"btn-search-store\">검색</button>\n            </dd>\n\n            <dt>업체 위치</dt>\n            <dd><input type=\"text\" id=\"mod-location\" value=\"원래 저장된 설명\"></dd>\n\n            <dt>업체 설명</dt>\n            <dd><input type=\"text\" id=\"mod-desc\"></dd>\n\n            <dt>업체 사진</dt>\n            <dd><input type=\"file\"></dd>\n\n            <dt>메뉴</dt>\n            <dd class=\"menus\">\n                <button class=\"add-menu\">+</button>\n            </dd>\n            \n        </dl>\n    </div>\n\n    <button id=\"btn-reg-store\">가게등록</button>\n\n</div>";
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
    + " alt=\"\">\n            </dd>\n\n            <dt>우리가게 메뉴</dt>\n            <dd class=\"menus\">\n                <table>\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.menus : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "                </table>\n            </dd>\n        </dl>\n\n        <button id=\"btn-go-modify\">수정하러가기</button>\n    </div>\n\n</div>";
},"useData":true});
templates['my-page'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"my-page\">\n    <h1>마이 페이지</h1>\n    <div class=\"my-page-area\">\n        <div class=\"my-confirm\">\n            <p>본인 인증을 위해 비밀번호를 입력해주세요.</p>\n            <input type=\"password\" autofocus>\n            <button id=\"btn-confirm\">확인</button>\n        </div>\n    </div>\n</div>";
},"useData":true});
templates['no-store'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"go-register\">\n    <span>등록된 가게가 없습니다.</span>\n    <span>먼저 가게를 등록해주세요.</span>\n    <button id=\"btn-go-register\">가게 등록 하기</button>\n</div>";
},"useData":true});
templates['register'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"register-store\">\n    <h1 class=\"regist-title\">사장님의 가게를 등록해주세요</h1>\n    <h1 class=\"m-regist-title\">가게등록</h1>\n    <div>\n        <dl class=\"reg-form\">\n            \n            <dt>업체명</dt>\n            <dd>\n                <input type=\"text\" id=\"regist-name\">\n                <button id=\"btn-search-store\">검색</button>\n            </dd>\n\n            <dt>업체 위치</dt>\n            <dd>\n                <input type=\"text\" id=\"regist-location\" placeholder=\"도로명 주소를 검색해주세요\">\n                <button id=\"btn-search-location\">지도검색</button>\n            </dd>\n\n            <dt>전화번호</dt>\n            <dd><input type=\"number\" id=\"regist-tel\"></dd>\n\n            <dt>업체 설명</dt>\n            <dd><input type=\"text\" id=\"regist-desc\"></dd>\n\n            <dt>업체 사진</dt>\n            <dd><input type=\"file\" id=\"regist-file\"></dd>\n\n            <dt>메뉴</dt>\n            <dd class=\"menus\">\n                <button class=\"add-menu\">+</button>\n            </dd>\n            \n        </dl>\n    </div>\n\n    <button id=\"btn-reg-store\">가게등록</button>\n</div>\n\n\n<div class=\"map-modal\">\n    <div class=\"map-modal-content\">\n        <span id=\"btn-map-close\" class=\"btn-close\"><img src=\"/dist/public/images/close.png\"></span>\n        <div id=\"map\"></div>\n        <button id=\"btn-map-confirm\">확인</button>\n    </div>\n</div>";
},"useData":true});
templates['statistic'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "<div class=\"stat\">\n\n    <h1>가계 통계</h1>\n    <div>\n        <figure class=\"time-chart\">\n            <figcaption>주간 시간별 고객 수</figcaption>\n            <svg class=\"chart\" width=\"360\" height=\"160\" aria-labelledby=\"title\" role=\"img\">\n                <title id=\"title\">시간별 고객 수</title>\n                <g class=\"bar\">\n                    <rect width=\"20\" height=\"calc("
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.time : depth0)) != null ? stack1["0"] : stack1), depth0))
    + " * 2)\" y=\"calc(140 - "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.time : depth0)) != null ? stack1["0"] : stack1), depth0))
    + " * 2)\"></rect>\n                    <text y=\"150\" dy=\".35em\">9시</text>\n                </g>\n\n                <g class=\"bar\">\n                    <rect width=\"20\" height=\"calc("
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.time : depth0)) != null ? stack1["1"] : stack1), depth0))
    + " * 2)\" x=\"30\" y=\"calc(140 - "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.time : depth0)) != null ? stack1["1"] : stack1), depth0))
    + " * 2)\"></rect>\n                    <text x=\"30\" y=\"150\" dy=\".35em\">10시</text>\n                </g>\n\n                <g class=\"bar\">\n                    <rect width=\"20\" height=\"calc("
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.time : depth0)) != null ? stack1["2"] : stack1), depth0))
    + " * 2)\" x=\"60\" y=\"calc(140 - "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.time : depth0)) != null ? stack1["2"] : stack1), depth0))
    + " * 2)\"></rect>\n                    <text x=\"60\" y=\"150\" dy=\".35em\">11시</text>\n                </g>\n\n                <g class=\"bar\">\n                    <rect width=\"20\" height=\"calc("
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.time : depth0)) != null ? stack1["3"] : stack1), depth0))
    + " * 2)\" x=\"90\" y=\"calc(140 - "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.time : depth0)) != null ? stack1["3"] : stack1), depth0))
    + " * 2)\"></rect>\n                    <text x=\"90\" y=\"150\" dy=\".35em\">12시</text>\n                </g>\n\n                <g class=\"bar\">\n                    <rect width=\"20\" height=\"calc("
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.time : depth0)) != null ? stack1["4"] : stack1), depth0))
    + " * 2)\" x=\"120\" y=\"calc(140 - "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.time : depth0)) != null ? stack1["4"] : stack1), depth0))
    + " * 2)\"></rect>\n                    <text x=\"120\" y=\"150\" dy=\".35em\">13시</text>\n                </g>\n\n                <g class=\"bar\">\n                    <rect width=\"20\" height=\"calc("
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.time : depth0)) != null ? stack1["5"] : stack1), depth0))
    + " * 2)\" x=\"150\" y=\"calc(140 - "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.time : depth0)) != null ? stack1["5"] : stack1), depth0))
    + " * 2)\"></rect>\n                    <text x=\"150\" y=\"150\" dy=\".35em\">14시</text>\n                </g>\n\n                <g class=\"bar\">\n                    <rect width=\"20\" height=\"calc("
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.time : depth0)) != null ? stack1["6"] : stack1), depth0))
    + " * 2)\" x=\"180\" y=\"calc(140 - "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.time : depth0)) != null ? stack1["6"] : stack1), depth0))
    + " * 2)\"></rect>\n                    <text x=\"180\" y=\"150\" dy=\".35em\">15시</text>\n                </g>\n\n                <g class=\"bar\">\n                    <rect width=\"20\" height=\"calc("
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.time : depth0)) != null ? stack1["7"] : stack1), depth0))
    + " * 2)\" x=\"210\" y=\"calc(140 - "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.time : depth0)) != null ? stack1["7"] : stack1), depth0))
    + " * 2)\"></rect>\n                    <text x=\"210\" y=\"150\" dy=\".35em\">16시</text>\n                </g>\n\n                <g class=\"bar\">\n                    <rect width=\"20\" height=\"calc("
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.time : depth0)) != null ? stack1["8"] : stack1), depth0))
    + " * 2)\" x=\"240\" y=\"calc(140 - "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.time : depth0)) != null ? stack1["8"] : stack1), depth0))
    + " * 2)\"></rect>\n                    <text x=\"240\" y=\"150\" dy=\".35em\">17시</text>\n                </g>\n\n                <g class=\"bar\">\n                    <rect width=\"20\" height=\"calc("
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.time : depth0)) != null ? stack1["9"] : stack1), depth0))
    + " * 2)\" x=\"270\" y=\"calc(140 - "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.time : depth0)) != null ? stack1["9"] : stack1), depth0))
    + " * 2)\"></rect>\n                    <text x=\"270\" y=\"150\" dy=\".35em\">18시</text>\n                </g>\n\n                <g class=\"bar\">\n                    <rect width=\"20\" height=\"calc("
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.time : depth0)) != null ? stack1["10"] : stack1), depth0))
    + " * 2)\" x=\"300\" y=\"calc(140 - "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.time : depth0)) != null ? stack1["10"] : stack1), depth0))
    + " * 2)\"></rect>\n                    <text x=\"300\" y=\"150\" dy=\".35em\">19시</text>\n                </g>\n\n                <g class=\"bar\">\n                    <rect width=\"20\" height=\"calc("
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.time : depth0)) != null ? stack1["11"] : stack1), depth0))
    + " * 2)\" x=\"330\" y=\"calc(140 - "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.time : depth0)) != null ? stack1["11"] : stack1), depth0))
    + " * 2)\"></rect>\n                    <text x=\"330\" y=\"150\" dy=\".35em\">20시</text>\n                </g>\n            </svg>\n        </figure>\n\n        <figure class=\"age-chart\">\n            <figcaption>주간 연령별 고객 수</figcaption>\n                <svg class=\"age-chart\" width=\"400\" height=\"150\" aria-labelledby=\"title\" role=\"img\">\n                    <title id=\"title\">A bart chart showing information</title>\n                    <g class=\"age-bar\">\n                        <rect width="
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.age : depth0)) != null ? stack1["0"] : stack1), depth0))
    + " height=\"20\"></rect>\n                        <text x="
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.age : depth0)) != null ? stack1["0"] : stack1), depth0))
    + " y=\"10\" dy=\".35em\">10대</text>\n                    </g>\n                    <g class=\"age-bar\">\n                        <rect width="
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.age : depth0)) != null ? stack1["1"] : stack1), depth0))
    + " height=\"20\" y=\"30\"></rect>\n                        <text x="
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.age : depth0)) != null ? stack1["1"] : stack1), depth0))
    + " y=\"40\" dy=\".35em\">20대</text>\n                    </g>\n                    <g class=\"age-bar\">\n                        <rect width="
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.age : depth0)) != null ? stack1["2"] : stack1), depth0))
    + " height=\"20\" y=\"60\"></rect>\n                        <text x="
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.age : depth0)) != null ? stack1["2"] : stack1), depth0))
    + " y=\"70\" dy=\".35em\">30대</text>\n                    </g>\n                    <g class=\"age-bar\">\n                        <rect width="
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.age : depth0)) != null ? stack1["3"] : stack1), depth0))
    + " height=\"20\" y=\"90\"></rect>\n                        <text x="
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.age : depth0)) != null ? stack1["3"] : stack1), depth0))
    + " y=\"100\" dy=\".35em\">40대</text>\n                    </g>\n                    <g class=\"age-bar\">\n                        <rect width="
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.age : depth0)) != null ? stack1["4"] : stack1), depth0))
    + " height=\"20\" y=\"120\"></rect>\n                        <text x="
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.age : depth0)) != null ? stack1["4"] : stack1), depth0))
    + " y=\"130\" dy=\".35em\">50대</text>\n                    </g>\n                </svg>\n        </figure>\n\n    </div>\n</div>";
},"useData":true});
templates['store-detail'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"detail-btn-area\">\n    <button id=\"btn-back\">뒤로가기</button>\n</div>\n<div class=\"store-detail\">\n    <div class=\"store-detail-img\">\n        <img src=\"/dist/public/images/background.jpg\">\n    </div>\n    <div class=\"store-detail-info\">\n        <h2 class=\"store-detail-title\">가게 이름</h2>\n        <p class=\"store-detail-desc\">\n            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.\n        </p>\n    </div>\n</div>";
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

  return "<div class=\"store-list\">\n    <h1>가게 둘러보기</h1>\n    <div class=\"store-card-list\">\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),depth0,{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "    </div>\n\n</div>";
},"useData":true});
})();