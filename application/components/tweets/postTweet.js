const env = process.env.NODE_ENV || 'development';
const config = require(`../../config/${env}`)

const db = config.DB;

module.exports = function(req, res) {

 	db('tweets').insert({
 		user_id: req.user_id,
 		message: req.body.message
 	})

 	.then(function (row) {
 		return res.json({
 			status_code: 200,
 			errors: [],
 			message: "tweet successfully posted",
 			data: req.body
 		})
 	})
 	.catch(function (err) {	
 		return res.json({
 			status_code: 403,
 			errors: "could not post tweet",
 			data: {}
 		})
 	})
}