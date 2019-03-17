define(['module'],
	function(module) {
		return {
			name: function() {
				return "Vlas";
			},
			isTrue: module.config().value
		}
	}
);