const env = process.env.NODE_ENV || 'development';
const config = require(`../../config/${env}`)

const db = config.DB;

module.exports = function(req, res) {

 	db.select('follows.user_id', 'follows.is_following', 'follows.deleted_at')
 		.from('follows')
 		.where({
 			"follows.deleted_at": null,
 			"follows.is_following": req.params.user_id
 		})
 		.join('users', 'follows.user_id', '=', 'users.id')
 		.select('users.username')
 		.then(function (rows) {
 			return res.json({
 				'status_code': 200,
 				'data': rows
 			})				
 		})
 		.catch(function (err) {
 			return res.json({
 				'status': 403,
 				'message': 'Unable to get these follow list',
 				'errors': err,
 				'data': null
 			})
 		})
}
