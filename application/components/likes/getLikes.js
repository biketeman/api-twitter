const env = process.env.NODE_ENV || 'development';
const config = require(`../../config/${env}`)

const db = config.DB;

module.exports = function(req, res) {

 	db.select('likes.user_id', 'likes.tweet_id')
 		.from('likes')
 		.where({
 			'likes.user_id': req.params.user_id
 		})
 		.join('tweets', 'likes.tweet_id', '=', 'tweets.id')
 		.select('tweets.message')
 		.then(function (rows) {
 			return res.json({
 				'status_code': 200,
 				'data': rows
 			})				
 		})
 		.catch(function (err) {
 			return res.json({
 				'status_code': 404,
 				'message': 'Unable to get these follow list',
 				'errors': err,
 				'data': null
 			})
 		})
}
