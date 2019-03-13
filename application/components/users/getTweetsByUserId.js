const env = process.env.NODE_ENV || 'development';
const config = require(`../../config/${env}`)

const db = config.DB;

module.exports = function(req, res) {

 	db.select('tweets.id as tweet_id', 'tweets.message as message', 'tweets.user_id', 'tweets.created_at as timestamp', 'users.username as username')
 		.from('tweets')
 		.join('users', 'users.id', '=', 'tweets.user_id')
 		.where({
 			"tweets.user_id": req.params.user_id,
 			// select only not-deleted users
			"tweets.deleted_at": null,
			"tweets.retweeted_from": null
 		})
	 	.then(function (rows) {

 			response = []

	 		for(var i = 0; i < rows.length; i++) {

	 			response.push({

	 				"id": rows[i]['tweet_id'],
	 				"original_message": rows[i]['message'],
	 				"timestamp": rows[i]['timestamp'],
	 				"user": {
	 					"id": rows[i]['user_id'],
	 					"username": rows[i]['username']
	 				}

	 			})

	 		}

 			return res.json({
				'status_code': 200,
 				"errors": [],
 				"showing_retweets": false,
 				"data": response
 			})
			
 		})
 		.catch(function (err) {
 			console.log(err)
 			return res.json({
				'status_code': 403,
 				'errors': 'unable to display tweets',
 				'data': null
 			})
 		})
}
