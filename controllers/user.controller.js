const db = require('../models');
const User = db.user;
const resMsg = require('../configs/resMsg.config');
const userFuncs = require('../functions/userFuncs');

exports.register = async (_req, _res) => {
    _req.body.userIsActive = false
    if (_req.body.userEmail && _req.body.userEmail.length > 0 && _req.body.userPassword && _req.body.userPassword.length > 0) {
        try {
            let existUser = await User.findOne({ where: { userEmail: _req.body.userEmail } })
            if (!existUser) {
                _req.body.password = await funcs.CreateUUID()
                let user = await User.create(_req.body)

                return _res.status(200).send({ message: resMsg.OK_200.success })

            } else {
                _res.status(400).send({ message: 'this user is already exist (with this email)' })
            }
        } catch (_error) {
            _res.status(500).send({ message: resMsg.INTERNAL_SERVER_500.server_error, _error })
        }
    } else {
        _res.status(400).send({ message: resMsg.BAD_REQUEST_400.error_input })
    }
}


exports.login = async (_req, _res) => {
    if (_req.body.userEmail && _req.body.userEmail.length > 0 && _req.body.userPassword && _req.body.userPassword.length > 0) {

        User.findOne({ userEmail: _req.body.userEmail })
            .then(async (_result) => {
                if (_result) {
                    let result = JSON.parse(JSON.stringify(_result))
                    delete result.password
                    delete result.token
                    delete result.tokenSalt
                    delete result.lastLoginIp
                    delete result.isActive
                    if (_result.userIsActive) {
                        let token = await userFuncs.MakeToken(_req, _result)
                        _res.status(200).send({ message: 'your are entered', token: token, result })
                    }
                    else
                        _res.status(400).send({ message: 'you are not active' })
                }
                else {
                    _res.status(400).send({ message: resMsg.BAD_REQUEST_400.not_found })
                }
            })
            .catch((_error) => {
                _res.status(500).send({ message: resMsg.INTERNAL_SERVER_500.server_error, _error })
            })
    }else{
        _res.status(400).send({ message: resMsg.BAD_REQUEST_400.error_input })
    }
}