const env = process.env.NODE_ENV || 'development';
const config = require(`../../config/${env}`)

const db = config.DB;

module.exports = function(req, res) {

	var user_id = req.header.user_id;

 	db('tweets').insert({
 		retweeted_from: req.body.tweet_id,
 		user_id: req.user_id
 	})
 	.then(function (row) {
 		return res.json({
 			"status_code": 200,
 			"data": req.body,
 			"message": 'tweet successfully retweeted'
 		})
 	})
 	.catch(function (err) {	
 		return res.json({
 			"status_code": 403,
 			"errors": 'unable to retweet this one'
 		})
 	})
}