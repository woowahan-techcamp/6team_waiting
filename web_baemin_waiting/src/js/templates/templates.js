(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['main'] = template({"1":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression;

  return "      <li id="
    + alias2(alias1((depth0 != null ? depth0.id : depth0), depth0))
    + ">"
    + alias2(alias1((depth0 != null ? depth0.content : depth0), depth0))
    + "</li>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<section id=\"main\">\n  <div class=\"header-navi\">\n    <ul class=\"inline-list\">\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),depth0,{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "    </ul>\n  </div>\n  <div id=\"view\"></div>\n  <div id=\"introduce\"></div>\n</section>";
},"useData":true});
templates['view'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"img-slide\">\n    <img src=\"http://www.heatherhook.com/wp-content/uploads/2016/09/Fine-Dining.jpg\">\n</div>";
},"useData":true});
})();