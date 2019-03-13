const env = process.env.NODE_ENV || 'development';
const config = require(`../../config/${env}`)

const db = config.DB;


module.exports = function(req, res) {

	db.select('api_key', 'api_token')
		.from('tokens')
		.where({
			'api_key': req.headers.x_api_key,
			'api_token': req.headers.x_api_token,
			'is_enabled': true
		})
		.then(function (rows) {
			return res.json({
				'status_code': 200,
				'data': rows
			})				
		})
		.catch(function (err) {
			return res.json({
				'status_code': 403,
				'errors': ['unable to get all users'],
				'data': null
			})
		})
}