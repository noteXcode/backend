const db = require('../models');
const User = db.user;
const resMsg = require('../configs/resMsg.config');
const userFuncs = require('../functions/userFuncs');
const mailFuncs = require('../functions/mailFuncs');
const Verify = db.verify;
const Connection = db.connection;

exports.register = async (_req, _res) => {
    _req.body.userIsActive = false
    if (_req.body.userEmail && _req.body.userEmail.length > 0 && _req.body.userPassword && _req.body.userPassword.length > 0) {
        try {
            let existUser = await User.findOne({ where: { userEmail: _req.body.userEmail } })
            if (!existUser) {
                let user = await User.create(_req.body)
                let verifyCode = await userFuncs.MakeVerify(6)
                if (verifyCode) {
                    // console.log('enteredddddddddddddddddddd');
                    let userEmail = _req.body.userEmail
                    let userName = _req.body.userFirstName + ' ' + _req.body.userLastName
                    await mailFuncs.SendVerifyMail(userEmail, userName, verifyCode)
                   let x= await Verify.create({
                        verifyCode: verifyCode+'',
                        verifyUserId: user.userId,
                        verifyType: "register"
                    })
                    console.log('xxxxx',x);
                    _res.status(200).send({ message: resMsg.OK_200.sendActiveCode })
                } else {
                    console.log('ggggg',verifyCode);
                    _res.status(500).send({ message: resMsg.ERROR_500.makeVerifyCode })
                }
            } else {
                _res.status(400).send({ message: 'this user is already exist (with this email)' })
            }
        } catch (_error) {
            console.log("🚀 ~ exports.register= ~ _error:🤢", _error)
            _res.status(500).send({ message: resMsg.INTERNAL_SERVER_500.server_error, _error })
        }
    } else {
        _res.status(400).send({ message: resMsg.BAD_REQUEST_400.error_input })
    }
}

exports.activeUser = async (_req, _res) => {
    if (_req.params.userId) {
        if (_req.body.verifyCode) {
            await Verify.destroy({ where: { createdAt: { [Op.lt]: new Date(new Date() - 2 * 60 * 1000) } } })
            Verify.findOne({
                where: {
                    verifyCode: _req.body.verifyCode,
                    verifyType: 'register'
                }
            })
                .then(async _result => {
                    if (_result) {
                        //TODO
                        let test = await Connection.query(``, {
                            replacements: { userId: _req.params.id },
                            // type: db.Sequelize.QueryTypes.SELECT
                        })
                        _res.status(200).send(test)
                    }
                    else
                        _res.status(409).send({ message: 'the verification code doesn`t match' })
                })
                .catch((_error) => {
                    _res.status(500).send({ message: resMsg.INTERNAL_SERVER_500.server_error, _error })
                })
        }
        else
            _res.status(400).send({ message: 'error in verifyCode' })

    } else {
        _res.status(400).send({ message: 'unknown user!!' })
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
    } else {
        _res.status(400).send({ message: resMsg.BAD_REQUEST_400.error_input })
    }
}


exports.list = async (_req, _res) => {
    await User.findAll()
        .then(_result => {
            if (_result.length > 0)
                _res.status(200).send(_result)
            else
                _res.status(200).send([])
        })
        .catch(error => {
            console.log("🚀 ~ exports.list= ~ error🤔", error)
            _res.status(500).send({ message: resMessage.BAD_REQUEST_400.error_operation, error })
        })

}