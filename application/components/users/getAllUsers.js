const env = process.env.NODE_ENV || 'development';
const config = require(`../../config/${env}`)

const db = config.DB;


module.exports = function(req, res) {

	db.select('username', 'email', 'first_name', 'last_name')
		.from('users')
		//display all the users that are not currently deleted
		.where({
			deleted_at : null
		})
		.then(function (rows) {
			return res.json({
				'status_code': 200,
				'errors': [],
				'data': rows
			})				
		})
		.catch(function (err) {
			return res.json({
				'status_code': 403,
				'errors': ['unable to get all users'],
				'data': null
			})
		})
}