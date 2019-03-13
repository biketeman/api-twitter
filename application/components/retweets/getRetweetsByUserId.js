const env = process.env.NODE_ENV || 'development';
const config = require(`../../config/${env}`)

const db = config.DB;

module.exports = function(req, res) {

 	db.select('retweets.id as rt_id', 'retweets.retweeted_from', 'retweets.created_at as timestamp', 'tweets.message as original_message', 'users.username as original_user', 'users.id as original_user_id')
 		.from('tweets as retweets')
 		.join('tweets as tweets', 'tweets.id', '=', 'retweets.retweeted_from')
 		.join('users', 'users.id', '=', 'tweets.user_id')
 		.where({
 			"retweets.user_id": req.params.user_id,
 			// select only not-deleted users
			"retweets.deleted_at": null
 		})
 		.whereNotNull('retweets.retweeted_from')
	 	.then(function (rows) {

	 		response = []

	 		for(var i = 0; i < rows.length; i++) {

	 			response.push({

	 				"id": rows[i]['rt_id'],
	 				"original_message": rows[i]['original_message'],
	 				"timestamp": rows[i]['timestamp'],
	 				"original_poster": {
	 					"id": rows[i]['original_user_id'],
	 					"username": rows[i]['original_user']
	 				}

	 			})

	 		}

 			return res.json({
 				"status_code": 200,
 				"errors": [],
 				"showing_retweets": true,
 				"data": response
 			})
			
 		})
 		.catch(function (err) {
 			console.log(err)
 			return res.json({
 				"status_code": 403,
 				"errors": 'unable to display tweets'
 			})
 		})
}
