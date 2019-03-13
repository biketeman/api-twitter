const env = process.env.NODE_ENV || 'development';
const config = require(`../../config/${env}`)

const db = config.DB;

module.exports = function(req, res) {

 	db('follows')
		.update('deleted_at', db.fn.now())
 		.where({
 			'follows.id': req.body.follow_id,
 			'follows.user_id': req.user_id
 		})
 		.then(function (rows) {
 			return res.json({
 				'status_code': 200,
 				'message': 'follows successfully deleted'
 			})				
 		})
 		.catch(function (err) {
 			return res.json({
 				'status': 403,
 				'message': 'Unable to delete this follow',
 				'errors': err
 			})
 		})
}
