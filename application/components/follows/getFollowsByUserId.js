const env = process.env.NODE_ENV || 'development';
const config = require(`../../config/${env}`)

const db = config.DB;

module.exports = function(req, res) {

 	db.select('follow.id as follow_id', 'follow.user_id', 'follow.is_following', 'follow.created_at as follow_timestamp')
 		.from('follows as follow')
 		.where({
 			'follow.user_id': req.params.user_id,
 			'follow.deleted_at': null
 		})
 		// follower infos
 		.join('users as user', 'user.id', '=', 'follow.user_id')
 		.select('user.id as follower_id', 'user.username as follower_username')
 		// followed dude infos
 		.join('users as followed', 'followed.id', '=', 'follow.is_following')
 		.select('followed.id as followed_id', 'followed.username as followed_username')
 		.then(function (rows) {

 			response = []

	 		for(var i = 0; i < rows.length; i++) {

	 			response.push({

	 				"id": rows[i]['follow_id'],
	 				"timestamp": rows[i]['follow_timestamp'],
	 				"follower": {
	 					"id": rows[i]['followed_id'],
						"username": rows[i]['followed_username'],
	 				}

	 			})

	 		}

 			return res.json({
 				"status_code": 200,
 				"errors": [],
 				"user": {
	 				"id": rows[0]['follower_id'],
	 				"username": rows[0]['follower_username']
 				},
 				"data": response
 			})

 		})
 		.catch(function (err) {
 			return res.json({
 				"status_code": 403,
 				"message": 'Unable to get these follow list',
 				"errors": err,
 				"data": null
 			})
 		})
}
