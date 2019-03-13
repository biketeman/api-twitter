const env = process.env.NODE_ENV || 'development';
const config = require(`../../config/${env}`)

const db = config.DB;

module.exports = function(req, res) {
 	db('comments').insert({
 		message: req.body.message,
 		tweet_id: req.body.tweet_id,
 		user_id: req.user_id
 	})

 	.then(function (row) {
 		return res.json({
 			'status_code': 200,
 			'errors': [],
 			'data': req.body,
 			'message': 'successfully commented this tweet'
 		})
 	})
 	.catch(function (err) {	
 		return res.json({
 			'status_code': 200,
 			'errors': 'dont leave body empty'
 		})
 	})
}