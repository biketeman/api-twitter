const env = process.env.NODE_ENV || 'development';
const config = require(`../../config/${env}`)

const db = config.DB;

module.exports = function(req, res) {

 	db('comments')
		.update('deleted_at', db.fn.now())
 		.where({
 			'id': req.body.comment_id,
 		})
 		.then(function (rows) {
 			return res.json({
 				'status_code': 200,
 				'message': 'comment successfully deleted'
 			})				
 		})
 		.catch(function (err) {
 			return res.json({
 				'status_code': 403,
 				'message': 'Unable to delete this follow',
 				'errors': err
 			})
 		})
}
