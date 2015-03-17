window.onload = function() {
	alert("here");  

	var username = "iwood@uwo.ca";
	var password = "thisisapassword";

	console.log("sdkfsdjkfjlkds");

	$("#spiffy").val('SPIFFY');

	

	$.ajax({
		type: 'POST',
		url: 'https://sso.dexit.co/openam/oauth2/access_token?realm=spiffy&grant_type=password&username=' + username + '&password=' + password,
		headers: {
			'Authorization':'Basic ZHgtc2VydmljZToxMjMtNDU2LTc4OQ==',
			'Content-Type' : 'application/x-www-form-urlencoded'
		}
	}).done(function(token) {
		alert("in dis bitch");

		// MAKE SURE TO ENCODE URI ENCODE THIS BITCH
		var query = "SELECT course_id FROM spiffy.developer_course_student WHERE student_email = 'iwood@uwo.ca';";

		$.ajax({
			type: 'POST',
			url: 'http://developer.kb.dexit.co/access/stores/course_admin/query?query=' + query,
			headers: {
				'Authorization':'Bearer' + token.access_token
			}
		}).done(function(courses) {
			alert("in da other bitch");
			
		});

	});

	alert("over here");

	

	// token.getToken('iwood@uwo.ca', 'thisisapassword', function(_token) {
	// 	var query = "SELECT course_id FROM spiffy.developer_course_student WHERE student_email = 'iwood@uwo.ca'";
	// 	token.query(query, "course_admin", _token, function(Returned_Value) {
	// 		console.log("here");
	// 		debugger;
	// 	});
	// });
}