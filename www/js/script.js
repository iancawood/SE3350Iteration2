window.onload = function() {
	var username = "iwood@uwo.ca";
	var password = "thisisapassword";

	$.ajax({
		type: 'POST',
		url: 'https://sso.dexit.co/openam/oauth2/access_token?realm=spiffy&grant_type=password&username=' + username + '&password=' + password,
		headers: {
			'Authorization':'Basic ZHgtc2VydmljZToxMjMtNDU2LTc4OQ==',
			'Content-Type' : 'application/x-www-form-urlencoded'
		}
	}).done(function(token) {

		var query = "SELECT course_id FROM spiffy.developer_course_student WHERE student_email = '" + username + "';";
		$.ajax({
			type: 'POST',
			url: 'http://developer.kb.dexit.co/access/stores/course_admin/query?query=' + encodeURIComponent(query),
			headers: {
				'Authorization':'Bearer ' + token.access_token
			}
		}).done(function(data) {

			for (var i = 0; i < data.result.rows.length; i++)
			{
				var buttonID = data.result.rows[i][0];
				var $button = $('<button/>', 
				{
			  		type: 'button',
					'class': 'dynBtn',
					id: buttonID,
					text: buttonID,
					click: function() 
					{
						window.alert('Hello! My id is '+ this.id);
					}
				});
				$button.appendTo('#buttons');
			}
			
		});

	});
}