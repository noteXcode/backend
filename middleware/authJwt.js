const jwt = require('jsonwebtoken')
const config = require('../configs/auth.config')
const db = require('../models')
const User = db.user


const verifyToken = (_req, _res, _next) => {
	// ========= use bearer token
	const authHeader = _req.headers['authorization']
	let isBasic = false;
	if (authHeader && authHeader.toLowerCase().includes('bearer')) {
		const bearer = authHeader.split(' ')
		const bearerToken = bearer[1]
		_req.token = bearerToken
	}
	else if (authHeader && authHeader.toLowerCase().includes('basic')) {
		const basic = authHeader.split(' ')
		const basicToken = basic[1]
		_req.token = basicToken
		isBasic = true
	}
	token = _req.token
	if (!token) {
		return _res.status(401).send({
			message: 'توکن وجود ندارد'
		})
	}
	if (isBasic) {
		// const clientIP = _req.headers['x-forwarded-for']?.split(',').shift() || _req.socket?.remoteAddress;
		// console.log('xxxxxxxx',clientIP);
		let secret64 = atob(token)
		if (secret64.trim() == config.secret.trim()) {
			_req.isBasic = true
			return _next()
		}
		else
			return _res.status(403).send({ message: 'دسترسی لازم وجود ندارد' })
	}
	jwt.verify(token, config.secret, async (err, decoded) => {
		if (err){
			console.log(err);
			return _res.status(402).send({ message: 'دسترسی لازم وجود ندارد' })
		}
		await User.findOne({
			where: {
				id: decoded.id.trim(),
				password: decoded.password,
				lastLoginIp: decoded.lastLoginIp,
				tokenSalt: decoded.tokenSalt
			}
		})
			.then(_result => {
				if (_result && _result.isActive) {
					console.log('!!!!!!!!!!!!!!!!!! Request Path = ', _req.originalUrl);
					_req.userId = decoded.id
					return _next()
				}
				else
					return _res.status(401).send({ message: 'دسترسی لازم وجود ندارد' })
			}).catch(error => {
				return _res.status(401).send({ message: 'خطا در سمت سرور' })
			})
	})
}


const authJwt = {
	verifyToken,
}
module.exports = authJwt