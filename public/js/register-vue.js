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
	verifyemail: ""	,
	thankyou: false
}



var vmForElements = {	
	data: function() { return dataObj },
	methods: {
		onClickSubmit: function(e) {
			e.preventDefault();

			this.thankyou = true;

			var emailAddress = this.verifyemail;

			var payload = { email: emailAddress };

			//Using Axios (invoked by CDN in HTML) to handle HTTP requests.
			//https://github.com/axios/axios
			var axiosConfig = {
				method: 'post',
				url: 'https://us-central1-symphony-gamma-poc.cloudfunctions.net/sendEmailVerification',
				data: payload
			}
			
			axios(axiosConfig).then(function(response) {
				console.log(response);
			});
		}
	}
};

var vm = Vue.extend(vmForElements);
new vm().$mount('#vueContainerDiv');