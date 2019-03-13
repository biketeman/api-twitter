const env = process.env.NODE_ENV || 'development';
const config = require(`../../config/${env}`)

const db = config.DB;

module.exports = function(req, res) {

 	db('likes')
		.update('deleted_at', db.fn.now())
 		.where({
 			'likes.id': req.body.like_id,
 			'likes.user_id': req.user_id
 		})
 		.then(function (rows) {
 			return res.json({
 				'status_code': 200,
 				'message': 'like successfully deleted'
 			})				
 		})
 		.catch(function (err) {
 			return res.json({
 				'status_code': 403,
 				'message': 'Unable to delete this like',
 				'errors': err
 			})
 		})
}
