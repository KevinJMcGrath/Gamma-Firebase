var router = new VueRouter({
	mode: 'history',
	routes: []
});

var dataObj = {
	qparam: 'Nothing'
}

var vm = new Vue({
	router,
	el: '#verifyApp',
	data: dataObj,
	mounted: function () {		

		if(this.$router)
		{
			console.log(this.$router.currentRoute.query);

			var params = this.$router.currentRoute.query;

			CheckVerification(params.p);

		}
	}
});

function CheckVerification(verifyString)
{

	var paramObj = { ver: verifyString };

	//Using Axios (invoked by CDN in HTML) to handle HTTP requests.
	//https://github.com/axios/axios
	var axiosConfig = {
		method: 'get',
		url: 'https://us-central1-symphony-gamma-poc.cloudfunctions.net/verifyEmail',
		params: paramObj
	}
	
	axios(axiosConfig).then(function(response) {
		dataObj.qparam = 'Verified'
		console.log(response);
	}).catch(function(error) {
		dataObj.qparam = 'Error';
		console.log(error);
	});
}