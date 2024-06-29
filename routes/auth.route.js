const controller = require('../controllers/auth.controller');
// const { authJwt } = require('../middleware')



module.exports = (app) => {
	app.use((req, res, next) => {
		res.header(
			'Access-Control-Allow-Headers',
			'Origin, Content-Type, Accept'
		)
		next()
	})
	app.get("/auth/google", controller.authGoogle)
	app.get("/auth/google/callback", controller.callbackGoogle)
	// app.get("/auth/logout", controller.)
}