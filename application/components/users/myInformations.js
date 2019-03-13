const env = process.env.NODE_ENV || 'development';
const config = require(`../../config/${env}`)

const db = config.DB;

module.exports = function(req, res) {

 	db.select('username', 'email', 'first_name', 'last_name')
 		.from('users')
 		.where({
 			id: req.user_id
 		})
 		.then(function (rows) {
 			return res.json({
				'status_code': 200,
 				'errors': [],
 				'message': 'your personnal informations',
 				'data': rows
 			})				
 		})
 		.catch(function (err) {
 			return res.json({
				'status_code': 403,
 				'errors': ['unable to get your personnal informations'],
 				'data': null
 			})
 		})
}
