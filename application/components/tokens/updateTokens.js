const env = process.env.NODE_ENV || 'development';
const config = require(`../../config/${env}`)
const db = config.DB;
const hat = require('hat');

module.exports = function(req, res) {

		const new_key = hat();
		const new_token = hat();

		db('tokens')
		.update({
			'api_key': new_key,
			'api_token': new_token
		})
		.where({
			'api_key': req.headers.x_api_key,
			'api_token': req.headers.x_api_token
		})
		.then(function (rows) {
			console.log('lleladjdjdj')
			return res.json({
				'status_code': 200,
				'message': 'your tokens have been modified check them now',
				'tokens': {
					'api_key': new_key,
					'api_token': new_token
				}
			})			
		})
		.catch(function (err) {
			console.log('catch')
			return res.json({
				'status_code': 403,
				'errors': err,
				'data': null
			})
		})
}