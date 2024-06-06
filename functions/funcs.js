
const { HttpStatusCode, ResponseType, ResponseCode, ResponseMessages } = require('../configs/resMsg.config')
const { Op, verify: Verify,user:User} = require('../models')
const dbFuncs = require('../functions/dbFuncs');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const config = require('../configs/auth.config');



function DateFa8(_date) {
  return new Date(_date).toLocaleDateString('fa-IR-u-nu-latn'
    , {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }
  ).replaceAll('/', '')
}



async function MakeVerify(_len = 4) {
  if (_len > 7 || _len < 4)
    _len = 4
  let verifyCode = getRandomIntInclusive(Math.pow(10, _len - 1), Math.pow(10, _len) - 1)
  return verifyCode
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  //The maximum is inclusive and the minimum is inclusive
  return Math.floor(Math.random() * (max - min) + min)
}


async function MakeToken(_req, _result) {
    console.log('hhhhhhhhhhhh',_result);
    let tempUser = {};
    let ip = _req.headers['x-forwarded-for'] || _req.socket.remoteAddress
    let time = Math.floor(Date.now() / 1000)
    tempUser.lastLoginIp = ip
    tempUser.lastLoginTime = time
    tempUser.tokenSalt = bcrypt.hashSync(time + '')
    let token = jwt.sign({ userId: _result.userId, userPassword: _result.userPassword, userLastLoginIp: tempUser.lastLoginIp, userSaltToken: tempUser.tokenSalt  }, config.secret, {
        expiresIn: 86400 // 24 hours
    });
    tempUser.token = token
    let save = await dbFuncs.UpdateModel(false, User, tempUser, { userId: _result.userId })
    if (!save)
        return null
    return token
}


// یک جیسان فلت را به یک جیسان که تمام روابطش مشخص است تبدیل میکند
function FlatToNested(_json) {
  _json = JSON.parse(JSON.stringify(_json))
  let jsonTree = []
  _json.forEach(item => {
    if (!item.parentId)
      return jsonTree.push(item)
    let parentIndex = _json.findIndex(el => el.id === item.parentId)
    if (!_json[parentIndex].children)
      return _json[parentIndex].children = [item]
    else
      _json[parentIndex].children.push(item)
  })
  return jsonTree
}


async function PersianDate() {
  let localToday = new Date().toLocaleDateString('fa-IR-u-nu-latn')
  let date = localToday.split("/")
  if (date[1].toString().length < 2)
    date[1] = '0' + date[1]
  if (date[2].toString().length < 2)
    date[2] = '0' + date[2]
  date = date.toString()
  date = date.replace(/,/g, "")
  return date
}


async function CreateUUID() { // RFC 4122-ish
  return Array.from(Array(32))
    .map((e, i) => {
      let someRandomValue = i === 12 ? 4 : (+new Date() + Math.random() * 16) % 16 | 0;
      return `${~[8, 12, 16, 20].indexOf(i) ? "-" : ""}${(i === 16 ? someRandomValue & 0x3 | 0x8 : someRandomValue).toString(16)}`;
    }).join("");
}

async function PriceValidation(_price) {
  const reg = new RegExp('^[1-9][0-9]*$')
  if (reg.test(_price))
    return true
  return false
}


function PersianNumberFix(_text) {
  return _text.replace(/[۰-۹]/g, d => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d))
}

async function GetVerify(_userId, _code, _type) {
  await Verify.destroy({
    where: {
      verifyCreatedAt: { [Op.lt]: new Date(new Date() - 2 * 60 * 1000) }
    }
  })
  let verifyObj = await Verify.findOne({
    where: {
      verifyUserId: _userId,
      verifyCode: _code,
      verifyType: _type
    }
  })
  return verifyObj
}


function Response200(_res, _data) {
  _res.status(HttpStatusCode.OK_200).send({
    resCode: ResponseCode.success,
    data: _data,
    messages: [{ text: ResponseMessages.success, type: ResponseType.success }]
  })
}
function Response201(_res, _data) {
  _res.status(HttpStatusCode.Created_201).send({
    resCode: ResponseCode.success,
    data: _data,
    messages: [{ text: ResponseMessages.created, type: ResponseType.success }]
  })
}

function Response400(_res, _resCode, _resMessage, _resMsgType = ResponseType.error) {
  _res.status(HttpStatusCode.BadRequest400).send({
    resCode: _resCode,
    data: [],
    messages: [{ text: _resMessage, type: _resMsgType }]
  })
}

function Response500(_res, _resCode = ResponseCode.internal_error, _resMessage = ResponseMessages.server_error, _resMsgType = ResponseType.error) {
  _res.status(HttpStatusCode.InternalServerError_500).send({
    resCode: _resCode,
    data: [],
    messages: [{ text: _resMessage, type: _resMsgType }]
  })
}

const funcs = {
  MakeVerify,
  MakeToken,
  FlatToNested,
  PersianDate,
  CreateUUID,
  PriceValidation,
  DateFa8,
  PersianNumberFix,
  GetVerify,
  Response200,
  Response201,
  Response400,
  Response500,

}
module.exports = funcs
