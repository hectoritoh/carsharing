define(function(){
	
	var View = (function() {

		function View( htmlobj ){
			this.screen_display = htmlobj;
		}

		View.prototype.render = function(template, data, callback) {
			var _this = this;
			require(['text!../views/'+template+'.html'], function(source){
				var template = Handlebars.compile(source);
				var content  = template(data);
				$(_this.screen_display).html(content);

				if (typeof callback !== 'undefined')
					callback();
			})
		};

		return View;
	})();

	return View;
});