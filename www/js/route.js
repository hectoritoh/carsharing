define(function(){
	
	var Route = (function() {

		function Route(){
			//this.server_url = 'http://localhost:8000/json';
			this.server_url = 'http://104.131.8.100/services/web/app.php';
			this.callback = null;
		}

		Route.prototype.create = function(data, callback) {
			this.callback = callback;
			var _this = this;

			var properties = ['lat_start_point','lng_start_point','lat_end_point',
							  'lng_end_point','facebook_id','start_time','capacidad'];
			

			if ( !this.validate_data(data, properties) )
				this.dispatch_error(null,null);

			$.ajax({
				type: 'GET',
				url: this.server_url+'/crear/ruta'+this.serialize(data),
				success: callback,
				error: function(data) { _this.dispatch_error(data); }
			});
		};

		Route.prototype.list = function(callback) {
			this.callback = callback;
			var _this = this;

			
			$.ajax({
				type: 'GET',
				url: this.server_url+'/get/rutas',
				success: callback,
				error: function(data) { _this.dispatch_error(data); }
			});
		};



		Route.prototype.my_list = function(facebook_id, callback) {
			this.callback = callback;
			var _this = this;

			$.ajax({
				type: 'GET',
				url: this.server_url+'/list/route/'+facebook_id,
				success: callback,
				error: function(data) { _this.dispatch_error(data); }
			});
		};


		/********************************************************/

		Route.prototype.serialize = function(data) {
			var serialized = '';
			for (var property in data) {
				serialized+='/'+data[property];
			};
			return serialized;
		};

		Route.prototype.validate_data = function(data, properties) {
			for (var property in properties) {
				if ( !data.hasOwnProperty(property) ) 
					return false
			};
			return true;
		};

		Route.prototype.dispatch_error = function(xhr, type) {
			this.callback(null);
		};

		return Route;
	})();

	return Route;
});