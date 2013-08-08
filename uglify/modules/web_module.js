(function() {
	
	NWM.WebModule = function(el) {
		this.el = el;

		this.addEventListener();
	};

	NWM.WebModule.prototype.addEventListener = function() {
		var header = this.el.find('.js-web-module-header');
		header.on('click', function() {
			var main = $(this).next('.js-web-module-main');
			main.toggle('slide');
		});
	};

})();