const db = require('../models')
const Connection = db.connection
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('../configs/auth.config')
const User = db.user
const dbFuncs = require('../functions/dbFuncs')


async function MakeToken(_req, _result) {
    let tempUser = {};
    let ip = _req.headers['x-forwarded-for'] || _req.socket.remoteAddress
    let time = Math.floor(Date.now() / 1000)
    tempUser.lastLoginIp = ip
    tempUser.lastLoginTime = time
    tempUser.tokenSalt = bcrypt.hashSync(time + '')
    let token = jwt.sign({ id: _result.id, password: _result.password, lastLoginIp: tempUser.lastLoginIp, tokenSalt: tempUser.tokenSalt }, config.secret, {
        expiresIn: 86400 // 24 hours
    });
    tempUser.token = token
    let save = await dbFuncs.UpdateModel(false, User, tempUser, { id: _result.id })
    if (!save)
        return null
    return token
}








const userFuncs = {
    MakeToken,
    
}
module.exports = userFuncs