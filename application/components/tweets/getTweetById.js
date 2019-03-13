const env = process.env.NODE_ENV || 'development';
const config = require(`../../config/${env}`)

const db = config.DB;

module.exports = function(req, res) {

 	db('tweets as tweet')
 		.join('users as poster', 'tweet.user_id', 'poster.id')
 		// .join('tweets as retweet', 'tweet.retweeted_from', 'retweet.id')
 		// .join('users as retweeted', 'retweet.user_id', 'retweeted.id')
 		.select(
 		'tweet.id as tweet_id', 'tweet.message as tweet_message', 'tweet.retweeted_from as retweet_id', 'tweet.user_id', 'tweet.created_at as timestamp',
 		// 'retweeted.id as rt_user_id', 'retweeted.username as rt_user_username',
 		// 'retweet.id as rt_id', 'retweet.message as rt_message', 'retweet.created_at as rt_timestamp', 'retweet.user_id as rt_user_id',
 		'poster.id as user_id', 'poster.username as user_username')
 		.where({
 			"tweet.id": req.params.tweet_id
 		})
 		.then(function (row) {

 			console.log(row)

 			var retweet_id = row[0]['retweet_id'];

 			var response = []
 			
 			// check if it's a retweet
 			// if it is not, return first data
 			if ( retweet_id == null ) {

 				response.push({

 					"id": row[0]['tweet_id'],
 					"message": row[0]['tweet_message'],
 					"timestamp": row[0]['timestamp'],
 					"user": {
 						"id": row[0]['user_id'],
 						"username": row[0]['user_username']
 					}

 				})

 				return res.json({
 					status_code: 200,
 					errors: [],
 					is_retweet: false,
 					data: response
 				})

			// if it's a retweet
 			} else {

 				response.push({

 					"id": row[0]['tweet_id'],
 					"message": null,
 					"timestamp": row[0]['timestamp'],
 					"original_tweet": {
 						"id": row[0]['retweet_id']
 					}

 				})

 				return res.json({
 					errors: [],
 					status_code: 200,
 					is_retweet: true,
 					data: response
 				})

 			}

 		})
 		.catch(function (err) {
 			return res.json({
 				status_code: 403,
 				errors: 'error',
 				data: err
 			})
 		})
}
