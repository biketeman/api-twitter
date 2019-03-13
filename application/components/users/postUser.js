const env = process.env.NODE_ENV || 'development';
const config = require(`../../config/${env}`)
const hat = require('hat');

const db = config.DB;

module.exports = function(req, res) {
	db('users').insert({
		username: req.body.username,
		email: req.body.email,
		first_name: req.body.first_name,
		last_name: req.body.last_name
	})
	.returning('id')
	.then((rows) => {
		const api_key = hat();
		const api_token = hat();
		db('tokens').insert({
			api_key,
			api_token,
			user_id: rows[0],
		})
		.then((row) => {
			return res.json({
				'status_code': 201,
				'access': {
					api_key,
					api_token,
				},
				'message': 'user successfully added'
			})
		})
	})
	.catch(function(err){
		return res.json({
			'status_code': 400,
			'error': err
		})
	})
}
