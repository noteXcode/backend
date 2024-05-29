const controller = require('../controllers/user.controller');
// const { authJwt } = require('../middleware')



module.exports = (app) => {
	app.use((req, res, next) => {
		res.header(
			'Access-Control-Allow-Headers',
			'Origin, Content-Type, Accept'
		)
		next()
	})
	app.post("/user/register", controller.register)
	app.post("/user/login", controller.login)

}