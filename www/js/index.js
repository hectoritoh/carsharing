define(['route', 'view'], function(Route,View){
	
	var App = (function() {

		function App(){
			this.route = new Route();
			this.view = new View('#screen');
			this.route_id = 0;
			this.facebook_id = 'Sergio Suarez';
			this.new_route = {};
		}

		App.prototype.initialize = function() {

			var _this = this;
			this.view.render('home_screen',{},function() { _this.inithome(_this); });

		}

		App.prototype.inithome = function(scope) {
			var _this = scope;
			$('#my-routes').on('tap', function() { _this.list_my_routes(); });

			$('#list-routes').on('tap', function() { _this.list_routes(); });
		};


		/* ACCIONES
		/******************************************************************/
		App.prototype.create_route = function(first_argument) {
			var _this = this;
			this.view.render('origen',{},function() { _this.initcreateroute(_this); });
		};

		App.prototype.initcreateroute = function(_this) {
			$('#next_btn').on('tap', function() { _this.get_origen(_this); });
		};

		App.prototype.get_origen = function(_this) {
			this.new_route['lat_start_point']=lat;
			this.new_route['lng_start_point']=lng;
			this.view.render('destino',{},function() { _this.initdestino(_this); });
		};

		App.prototype.initdestino = function(_this) {
			$('#next_btn2').on('tap', function() { _this.get_destination(_this); });
		};


		App.prototype.get_destination = function(_this) {
			this.new_route['lat_end_point']=lat;
			this.new_route['lng_end_point']=lng;
			this.view.render('horario',{},function() { _this.inithorario(_this); });
		};


		App.prototype.inithorario = function(_this) {
			$('#next_btn3').on('tap', function() { _this.get_horario(_this); });
		};



		App.prototype.get_horario = function(_this) {
			this.new_route['facebook_id']= this.facebook_id;
			this.new_route['start_time']=$('#hora').val();
			this.new_route['capacidad']=$('#puestos').val();
			$('#next_btn3').off('tap');

			lat = 0;
			lng = 0;
			map = null;
			formulario_valido = 0;
			marker = null;
			initialize = null;
			this.route.create(this.new_route, function(data) { _this.on_create(data,_this); });
		};


		App.prototype.initsuccess = function(_this) {
			$('#gohome').on('tap', function() { _this.initialize(); });
		};


		App.prototype.initerror = function(_this) {
			$('#gohome').on('tap', function() { _this.initialize(); });
		};

		App.prototype.list_routes = function() {
			var _this = this;
			this.route.list(function(data){ _this.on_list_routes(data, _this)});
		};

		App.prototype.list_my_routes = function() {
			var _this = this;
			this.route.list( function(data){ _this.on_list_my_routes(data, _this)} );
		};


		/* CALLBACKS
		/******************************************************************/
		App.prototype.on_create = function(data, _this) {
			//if ( !this.validate(data) ) return;
			this.view.render('success_screen',{'mensaje':'la ruta fue creada con exito'},function() { _this.initsuccess(_this); })
		};

		App.prototype.on_list_routes = function(data, _this) {
			if ( !_this.validate(data) ) return;
			_this.view.render('routes_screen', data, function() { _this.initroutes(_this); })
		};

		App.prototype.on_list_my_routes = function(data,_this) {
			if ( !this.validate(data) ) return;

			this.view.render('my_routes_screen', data, function() { _this.initmyroutes(_this); })
		};

		App.prototype.initroutes = function(_this) {
			$('#create-route').on('tap', function() { _this.create_route(); });
			alert('lllllllllf');

			$('a.ruta').on('tap', function() {alert('adsfasdfasdfasdfasdfasd');});

			/*
				alert(e);
				_this.route_id= e.target.attr('rel');
				var route_desc= e.target.html();
				alert(_this.route_id);
				_this.join_route(route_desc);*/
		};


		App.prototype.initmyroutes = function(_this) {
			$('#create-route').on('tap', function() { _this.create_route(); });
		};

		App.prototype.join_route = function(route_desc) {
			var _this = this;
			this.view.render('join_screen',{ruta:route_desc},function() { _this.initjoinroute(_this); });
		};

		App.prototype.initjoinroute = function(_this) {
			$('#join-route').on('tap', function() { _this.confirm_join_route(); });
		};

		App.prototype.confirm_join_route = function() {
			var _this = this;
			this.route.join(this.route_id, this.facebook_id);
			this.view.render('success_screen',{mensaje:'Te has unido a una ruta'},function() { _this.initjoinroute(_this); });
		};

		/* GENERALES
		/******************************************************************/
		App.prototype.validate = function(data) {
			if(data === null)
				return this.error_null_data();

			if(typeof data === 'undefined')
				return this.error_null_data();

			if ( data.hasOwnProperty('codigo') )
				if ( data.codigo === -1 )
					return this.error_server(data.mensaje);
				else if ( data.codigo === 0 )
					return this.error_transaction(data.mensaje);
			return true;
		};

		App.prototype.error_transaction = function(error_message) {
			var _this = this;
			this.view.render('error_screen',{mensaje:'hubo un error en la transaccion',desc:error_message},function() { _this.initerror(_this); });
			return false;
		};

		App.prototype.error_server = function(error_message) {
			var _this = this;
			this.view.render('error_screen',{mensaje:'hubo un error con el servidor',desc:error_message},function() { _this.initerror(_this); });
			return false;
		};
		App.prototype.error_null_data = function() {
			var _this = this;
			this.view.render('error_screen',{mensaje:'hubo un problema en la conexion',desc:''},function() { _this.initerror(_this); });
			return false;
		};

		return App;
	})();

	return App;
});