const db = require('../models');
const User = db.user;
const resMsg = require('../configs/resMsg.config');

exports.add = async (_req, _res) => {

    if (_req.body.userName || (_req.body.userName && _req.body.password)) {
        try {
            let _user = await User.create(_req.body)
            return _res.status(200).send({ message: resMsg.OK_200.success })
        } catch (_error) {
            _res.status(500).send({ message: resMsg.INTERNAL_SERVER_500.server_error, _error })
        }

    } else {
        _res.status(400).send({ message: resMsg.BAD_REQUEST_400.error_input });
    }
}

exports.edit = async (_req, _res) => {
    try {
        await User.update(_req.body, {
            where: {
                userId: _req.params.userId
            }
        })
        return _res.status(200).send({ message: resMsg.OK_200.success })
    } catch (_error) {
        _res.status(500).send({ message: resMsg.INTERNAL_SERVER_500.server_error, _error })
    }
}

exports.delete = async (_req, _res) => {
    try {
        await User.destroy({
            where: {
                userId: _req.params.userId
            }
        })
        return _res.status(200).send({ message: resMsg.OK_200.success })
    } catch (_error) {
        _res.status(500).send({ message: resMsg.INTERNAL_SERVER_500.server_error, _error })
    }
}

exports.list = (_req, _res) => {
    User.findAl()
        .then((_result) => {
            if (_result.length > 0) return _res.status(200).send(_result)
            else return _res.status(200).send([])
        })
        .catch((_error)=>{
            _res.status(500).send({ message: resMsg.INTERNAL_SERVER_500.server_error, _error })
        })
}

