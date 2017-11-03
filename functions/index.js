//Firebase SDK
const functions = require('firebase-functions');

//Firebase Admin SDK
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

