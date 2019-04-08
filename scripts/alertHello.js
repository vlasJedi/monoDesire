define(['./returnName'],function(returnName) {
	var info = returnName;
	return {
		sayHello: function() {
			console.log("hello" + info.name() + " and isTrue:" + info.isTrue);
		},
		sayHelloJquery: function() {
			$('.hello').text("New text from Jquery for you: " + info.name() + " and is True:" + info.isTrue);
		}
	};
});