const env = process.env.NODE_ENV || 'development';
const config = require(`../../config/${env}`)

const db = config.DB;

module.exports = function(req, res, next) {
	// checking if api exists
	if (!req.headers.x_api_key || !req.headers.x_api_token) {
		return res.json({
			'status_code': 401,
			'message': 'You are disconnected'
		});
	}
	// checking if the datas are correct
	db('tokens')
		.where({
			api_key: req.headers.x_api_key,
			api_token: req.headers.x_api_token,
			is_enabled: true,
			deleted_at: null,
		})
		.select('user_id')
		.returning('user_id')
		.then((rows) => {
			req.user_id = rows[0].user_id;
			next();
		})
		.catch((err) => {
			//error got caught
			res.json({
				'status_code': 403,
				'message': 'Api and key does not match',
				'error': err
			});
		});
}