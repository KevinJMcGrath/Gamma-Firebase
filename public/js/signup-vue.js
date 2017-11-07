var router = new VueRouter({
	mode: 'history',
	routes: []
});

var dataObj = {
	qparam: 'Nothing',
	hasQParam: false,
	confirmed: true,
	signupStep: 0,
	signup_data: {
		firstname: "",
		lastname: "",
		email: "",
		company: "",
		subdomain: "",
		seats: 0,
		region: "",
		eula: false,
		billing: {
			firstname: "",
			lastname: "",
			phone: "",
			street1: "",
			street2: "",
			city: "",
			state: "",
			country: "",
			zip: ""
		},
		promocode: "",
		price: 0
	}
}

var vm = new Vue({
	router,
	el: '#verifyApp',
	data: dataObj,
	mounted: function () {

		if(this.$router)
		{
			if (this.$router.currentRoute.query)
			{
				var params = this.$router.currentRoute.query;

				if (params.p)
				{
					CheckVerification(params.p);


				}				
			}
		}

		MountStripeElements();
	},
	methods: {
		handleChange(value) {
			console.log(value);

			//This handleChange method is called before the Vue model is updated - presumably so the value
			//can be modified before it's committed to the Vue data object.
			UpdatePrice(value);

			console.log(dataObj.signup_data.price);
		},
		nextStep() {
			dataObj.signupStep++;
			console.log(dataObj.signupStep);

			UpdatePrice(dataObj.signup_data.seats);			
		},
		prevStep() {
			dataObj.signupStep--;
			console.log(dataObj.signupStep);
		}
	}
});

function MountStripeElements()
{
	var stripe = Stripe('pk_test_gUJYd9BdGY6XdYL9RltHkmRe');
	var elements = stripe.elements();

	var card = elements.create('card', {
      hidePostalCode: true,
      style: {
        base: {
          iconColor: '#F99A52',
          color: '#32315E',
          lineHeight: '24px', /*48*/
          fontWeight: 400,
          fontFamily: '"Helvetica Neue", "Helvetica", sans-serif',
          fontSize: '15px',

          '::placeholder': {
            color: 'steelblue',
          }
        },
      }
    });
    card.mount('#card-element');
}

function UpdatePrice(seats)
{
	dataObj.signup_data.price = '$' + (20 * seats * 12) + '.00';
}

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
		dataObj.signup_data.email = response.email;
		console.log(response);
	}).catch(function(error) {
		dataObj.qparam = 'Error';
		console.log(error);
	});
}