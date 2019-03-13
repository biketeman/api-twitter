module.exports =  {

	PORT: 8080,
	DB: require('knex') ({
		client: 'pg',
		connection: 'postgres://mzbuspezqniksn:05f504555ec915427c38843a702fbbc9c7a16b29cd42d7cdf32af4d2401e58df@ec2-54-75-228-125.eu-west-1.compute.amazonaws.com:5432/de2fqidleathhf?ssl=true'
	})
	
};
