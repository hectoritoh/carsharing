require.config({
	baseUrl: 'js',
	paths: {
		zepto:   '../lib/zepto.min',
		touch:   '../lib/touch',
		eventjs: '../lib/Event.min',
		textjs: '../lib/requirejs-text',
	},
	shim: {
		'zepto': {
			exports: '$'
		},
		'touch': {
			exports: 'touch'
		},
		'requirejs-text': {
			exports: 'textjs'
		}
	}
});

require(['zepto', 'eventjs', 'touch', 'textjs', 'index'], function( zepto, eventjs, touch, textjs, App )
{
	/*document.addEventListener('deviceready', onDeviceReady, false);

	var onDeviceReady = function () {*/
		Zepto(function ($) {
			var app = new App();
			app.initialize();
		});
	//}
});