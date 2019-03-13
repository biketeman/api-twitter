const env = process.env.NODE_ENV || 'development';
const config = require(`../../config/${env}`)
const db = config.DB;

module.exports = function(req, res) {
	 db('users')
		.update('deleted_at', db.fn.now())
		.where({ 'id': req.body.user_id })
		.then(function (rows) {
			return res.json({
				'status_code': 200,
				'message': 'user successfully deleted'
			})			
		})
		.catch(function (err) {
			return res.json({
				'status_code': 403,
				errors: err,
				data: null
			})
		})
}