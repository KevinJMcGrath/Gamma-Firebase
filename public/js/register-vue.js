//Getting started sample:
//https://jsfiddle.net/hzfpyvg6/14/

var dataObj = {
	items: [
		{ datum: "Test 1" },
		{ datum: "Test 2" },
		{ datum: "Test 3" }
	],
	fftest: "Hello",
	button: {
		label: "Click Me"
	},
	verifyemail: ""	
}

var vmForElements = {	
	data: function() { return dataObj }
};

var vm = Vue.extend(vmForElements);
new vm().$mount('#testDiv');