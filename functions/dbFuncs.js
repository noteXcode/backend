const db = require('../models')
const Connection = db.connection


async function CreateModel(_model, _req, _res, _transaction) {
    _req.body.ownerId = _req.userId
    return await _model.create(_req.body, {
        transaction: _transaction
    })
        .then(_result => {
            if (_result) {
                _res && _res.status(200).send({ message: 'عملیات اضافه کردن با موفقیت انجام شد', _result })
                return true
            } else {
                _res && _res.status(400).send({ message: 'عملیات با شکست مواجه شد' })
                return false
            }
        })
        .catch(error => {
            _res && _res.status(500).send({ message: 'خطا در سمت سرور', e: error.message })
            return false
        })
}

// آپدیت کردن مقادیر جداول در دیتابیس
async function UpdateModel(_req, _model, _data, _where, _res, _transaction) {
    // _req.body.editorId=_req.userId
    
    
    let _result = await _model.update(_data, {
        where: _where,
        transaction: _transaction,
        individualHooks: true,
    })
    if (_result[0] > 0 || (_result[0] == 0 && _result[1].length > 0)) {
      
        _res && _res.status(200).send({ message: 'عملیات ویرایش با موفقیت انجام شد' })
        return true
    } else {
        _res && _res.status(400).send({ message: 'عملیات ویرایش با خطا مواجه شد' })
        return false
    }
}

// حذف ریکورد مورد نظر
async function DestroyModel(_model, _where, _req = false, _res,_transaction) {

        return _model.destroy({ where: _where })
            .then(async _result => {
                if (_result) {
                    _res && _res.status(200).send({ message: 'عملیات حذف با موفقیت انجام شد' })
                    return true
                } else {
                    _res && _res.status(400).send({ message: 'عملیات حذف با شکست مواجه شد' })
                    return false
                }
            })
            .catch(error => {
                _res && _res.status(500).send({ message: 'خطا در سمت سرور', error: error.message })
                return false
            })
}






// async function PermissionCheckWithAuth(_userId, _permitCode) {
//     let hasPermit = await GetPermissions(_userId, `code='${_permitCode}'`)
//     if (hasPermit.length == 0 || hasPermit[0].totalAllow != 1)
//         return false
//     return true
// }






const dbFuncs = {
    CreateModel,
    UpdateModel,
    DestroyModel
}
module.exports = dbFuncs