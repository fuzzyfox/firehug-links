var request = require('request'),
	moment = require('moment'),
	toMarkdown = require('to-markdown').toMarkdown;

request.get('http://schedule.mozillafestival.org/schedule', function(error, response, body){
	if(!error && response.statusCode === 200){
		var schedule = JSON.parse(body).schedule;

		for(var track in schedule){
			var day = schedule[track];

			for(var session in day){
				console.log('Track: ' + day[session].id);
				console.log('Session: ' + day[session].name.replace('\n', '').trim());
				console.log('Format: ' + day[session].format);
				console.log('Start Time: ' + moment('1/1/13 ' + day[session].startTime).format('H:mm'));
				console.log('End Time: ' + moment('1/1/13 ' + day[session].endTime).format('H:mm'));

				var facilitators = day[session].speaker;
				if(facilitators) facilitators = toMarkdown(facilitators);
				console.log('Facilitators: ' + facilitators);
				console.log('Link: ' + day[session].link);

				var description = day[session].description;
				if(description) description = toMarkdown(description);
				console.log('Description:\n' + description);

				console.log('\n----------------\n');
			}
		}

		return;
	}
	console.log(error);
});