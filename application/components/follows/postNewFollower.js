const env = process.env.NODE_ENV || 'development';
const config = require(`../../config/${env}`)

const db = config.DB;

module.exports = function(req, res) {

	user_id = req.header.user_id

 	db('follows').insert({
 		user_id: req.user_id,
 		is_following: req.body.is_following,
 	})

 	.then(function (row) {
 		return res.json({
 			"status_code": 200,
 			"errors": [],
 			"data": req.body,
 			"message": 'user successfully followed'
 		})
 		console.log('user followed')
 	})
 	.catch(function (err) {	
 		return res.json({
 			"status_code": 200,
 			"errors": 'Unable to post this new follow'
 		})
 	})
}