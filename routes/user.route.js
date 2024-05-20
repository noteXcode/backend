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
	app.post("/user/add", controller.add)
	app.put("/user/edit/:userId", controller.edit)
	app.delete("/user/delete/:userId", controller.delete)
	app.get("/user/list", controller.list)
}