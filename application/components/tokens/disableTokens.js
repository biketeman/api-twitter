const env = process.env.NODE_ENV || 'development';
const config = require(`../../config/${env}`)
const db = config.DB;

module.exports = function(req, res) {
		db('tokens')
		.update('is_enabled', false)
		.where({
			'api_key': req.headers.x_api_key,
			'api_token': req.headers.x_api_token
		})
		.then(function (rows) {
			return res.json({
				'status_code': 200,
				'message': 'your tokens have been disabled'
			})			
		})
		.catch(function (err) {
			return res.json({
				'status_code': 403,
				'errors': err,
				'data': null
			})
		})
}