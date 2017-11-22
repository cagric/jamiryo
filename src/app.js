require('dotenv').config();

const cron = require('node-cron');
const notifier = require('node-notifier');
const Client = require('node-rest-client').Client;
const client = new Client();

const notify = function (title, message, useSound) {
	notifier.notify({
		'title': title,
		'message': message,
		'sound': useSound
	});
};

cron.schedule(process.env.Cron_Expression, function () {
	client.get("https://openexchangerates.org/api/latest.json?app_id=" + process.env.App_Id, function (data, response) {
		const message = data.rates["TRY"];
		notify('1 USD at ' + new Date(), message.toString(), true);
	}).on('error', function (err) {
		notify('Error', 'An error has occured while getting latest rates!', true);
	});
});



