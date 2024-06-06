const { user: User, op: Op, verify: Verify, connection: Connection, sequelize } = require('../models')
const Funcs = require('../functions/funcs');
const mailFuncs = require('../functions/mailFuncs');

const { HttpStatusCode, ResponseType, ResponseCode, ResponseMessages } = require('../configs/resMsg.config')

exports.register = async (_req, _res) => {
    _req.body.userIsActive = false
    if (_req.body.userEmail && _req.body.userEmail.length > 0 && _req.body.userPassword && _req.body.userPassword.length > 0) {
        try {
            let existUser = await User.findOne({ where: { userEmail: _req.body.userEmail } })
            if (!existUser) {
                let user = await User.create(_req.body)
                let verifyCode = await Funcs.MakeVerify(6)
                if (verifyCode) {
                    let userEmail = _req.body.userEmail
                    let userName = _req.body.userFirstName + ' ' + _req.body.userLastName
                    await mailFuncs.SendVerifyMail(userEmail, userName, verifyCode)
                    let x = await Verify.create({
                        verifyCode: verifyCode + '',
                        verifyUserId: user.userId,
                        verifyType: "register"
                    })
                    console.log('xxxxx', x);
                    Funcs.Response200(_res, user)
                } else {
                    Funcs.Response400(_res, ResponseCode.internal_error, ResponseMessages.otp_send_error)
                }
            } else {
                Funcs.Response400(_res, ResponseCode.duplicate_record, ResponseMessages.user_is_exist)
            }
        } catch (_error) {
            Funcs.Response500(_res)
        }
    } else {
        Funcs.Response400(_res, ResponseCode.error_input, ResponseMessages.error_input)
    }
}

exports.activeUser = async (_req, _res) => {
    if (_req.params.userId) {
        if (_req.body.verifyCode) {
            await Verify.destroy({ where: { createdAt: { [Op.lt]: new Date(new Date() - 10 * 60 * 1000) } } })
            Verify.findOne({
                where: {
                    verifyCode: _req.body.verifyCode,
                    verifyType: 'register'
                }
            })
                .then(async _result => {
                    if (_result) {
                        //check if number is true then go and find USER 
                        //TODO
                    //    Verify.findByPk(_req.params.userId)
                        console.log('tesssstttt', test);
                        _result.userIsActive = true
                        if (_result.userIsActive) {
                            let token = await Funcs.MakeToken(_req, _result)
                            Funcs.Response200(_res, _result)
                        }
                        else
                            Funcs.Response400(_res, ResponseCode.error_input, ResponseMessages.user_is_not_active)
                        _res.status(200).send(test)
                    }
                    else
                        Funcs.Response400(_res, ResponseCode.error_input, ResponseMessages.verification_code_not_match)
                })
                .catch((_error) => {
                    console.log('erooorrrr🤷‍♀️', _error);
                    Funcs.Response500(_res)
                })
        }
        else
            Funcs.Response400(_res, ResponseCode.error_input, ResponseMessages.error_input)
    } else {
        Funcs.Response400(_res, ResponseCode.error_input, ResponseMessages.error_input)
    }
}


exports.login = async (_req, _res) => {
    if (_req.body.userEmail && _req.body.userEmail.length > 0 && _req.body.userPassword && _req.body.userPassword.length > 0) {

        User.findOne({ userEmail: _req.body.userEmail, userPassword: _req.body.userPassword })
            .then(async (_result) => {
                if (_result) {
                    let result = JSON.parse(JSON.stringify(_result))
                    delete result.password
                    delete result.token
                    delete result.tokenSalt
                    delete result.lastLoginIp
                    delete result.isActive
                    if (_result.userIsActive) {
                        let token = await Funcs.MakeToken(_req, _result)
                        Funcs.Response200(_res, _result)
                    }
                    else
                        Funcs.Response400(_res, ResponseCode.error_input, ResponseMessages.user_is_not_active)
                }
                else {
                    _res.status(400).send({ message: resMsg.BAD_REQUEST_400.not_found })
                }
            })
            .catch((_error) => {
                Funcs.Response500(_res)
            })
    } else {
        Funcs.Response400(_res, ResponseCode.error_input, ResponseMessages.error_input)
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