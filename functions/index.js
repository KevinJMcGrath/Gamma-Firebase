//Firebase SDK
const functions = require('firebase-functions');

//Firebase Admin SDK
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.addMessage = functions.https.onRequest((req, res) => { 
	//Grab text param
	const original = req.query.text;

	console.log('Submitted text: ' + original);

	res.send({ status: 'success'});
});