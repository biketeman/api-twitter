const env = process.env.NODE_ENV || 'development';
const config = require(`../../config/${env}`)

const db = config.DB;

module.exports = function(req, res) {
 	db('likes').insert({
 		user_id: req.user_id,
 		tweet_id: req.body.tweet_id,
 	})

 	.then(function (row) {
 		return res.json({
			'status_code': 200,
 			'errors': [],
 			'data': req.body,
 			'message': 'tweet successfully liked'
 		})
 		console.log('user followed')
 	})
 	.catch(function (err) {	
 		return res.json({
			'status_code': 403,
 			'errors': err
 		})
 	})
}