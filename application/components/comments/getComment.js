const env = process.env.NODE_ENV || 'development';
const config = require(`../../config/${env}`)

const db = config.DB;

module.exports = function(req, res) {

 	db.select('comments.id', 'comments.user_id', 'comments.tweet_id', 'comments.message')
 		.from('comments')
 		.where({
 			'comments.id': req.params.comment_id,
 			'comments.deleted_at': null
 		})
 		.join('users', 'comments.user_id', '=', 'users.id')
 		.select('users.username')
 		.then(function (rows) {
 			return res.json({
 				"status_code": 200,
 				"data": rows
 			})				
 		})
 		.catch(function (err) {
 			return res.json({
 				"message": 'Unable to get this comment',
 				"status_code": 403,
 				"errors": err,
 				"data": null
 			})
 		})
}
