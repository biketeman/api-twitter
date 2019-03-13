const env = process.env.NODE_ENV || 'development';
const config = require(`../../config/${env}`)
const db = config.DB;

module.exports = function(req, res) {
		 db('tweets')
		.update('deleted_at', db.fn.now())
		.where({
			'id': req.body.tweet_id,
			'user_id': req.user_id
		})
		.then(function (rows) {
			return res.json({
				status_code: 200,
				'message': 'tweet successfully deleted'
			})			
		})
		.catch(function (err) {
			return res.json({
				status_code: 403,
				errors: err,
				data: null
			})
		})
}