(function() {
	
	NWM.WebModule = function(el) {
		this.el = el;
		this.header = el.find('.js-web-module-header');

		this.addEventListener();
	};

	NWM.WebModule.prototype.addEventListener = function() {
		this.header.on('click', function() {
			var main = $(this).next('.js-web-module-main');
			main.toggle();
		});
	};

})();