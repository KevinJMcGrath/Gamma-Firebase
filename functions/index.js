//Firebase SDK
const functions = require('firebase-functions');

//Request-Promise
const rp = require('request-promise');

//CORS
const cors = require('cors');

//Firebase Admin SDK
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);


function postVerifyToSalesforce(emailAddress)
{
	return rp({
		method: 'POST',
		uri: 'https://dev-symphonyinc.cs4.force.com/services/apexrest/symphony/gamma/265645cc5eac48b7a5bb79ac8f9b3593',
		body: { email: emailAddress },
		json: true
	});
}

function getEmailVerificationSalesforce(verificationString)
{
	var ep = 'https://dev-symphonyinc.cs4.force.com/services/apexrest/symphony/gamma/265645cc5eac48b7a5bb79ac8f9b3593';

	//The API key below is stored in functions.config() as shown here:
	//https://firebase.google.com/docs/functions/config-env?authuser=1
	return rp({
		uri: ep,
		qs: {
			apikey: functions.config().salesforce.key,
			p: verificationString
		},
		json: true
	});

}

exports.sendEmailVerification = functions.https.onRequest((req, res) => {

	//Adding CORS Middleware to make sure the preflight OPTIONS request passes
	//Because the Cloud Functions use a direct URL which will not match the register page
	//the preflight will fail without it.
	var corsFN = cors();

	corsFN(req, res, function() { 
		postVerifyToSalesforce(req.body.email).then(() => {
			console.log('Sent Email: ' + req.body.email);
			res.end();
		}).catch(error => {
			console.error(error);
			res.status(500).send('Problem sending email to Salesforce.')
		});
	});

	
});

exports.verifyEmail = functions.https.onRequest((req, res) => { 

	var corsFN = cors();

	corsFN(req, res, function() { 

		var verifyString = req.query.ver;
		console.log('Verification String: ' + verifyString);

		getEmailVerificationSalesforce(verifyString).then(function(resp) {
			console.log('Success: ' + resp.success);
			console.log('Email: ' + resp.email);
			console.log('Verified On: ' + resp.verified_on);
			//Don't forget this piece. If you don't end the stream, apparently Axios keeps resending
			res.end();
		}).catch(error => {
			console.error(error);
			res.status(500).send('Verification failed for some reason.');
		});
	});	
});

exports.addMessage = functions.https.onRequest((req, res) => { 
	//Grab text param
	const original = req.query.text;

	console.log('Submitted text: ' + original);

	res.send({ status: 'success'});
});