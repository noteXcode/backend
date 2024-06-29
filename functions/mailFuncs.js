const db = require('../models')
const nodemailer = require('nodemailer')

async function SendVerifyMail(_userMail,_userName, _verifyCode) {
    console.log("🚀 ~ SendVerifyMail ~ _userMail:", _userMail)
    return new Promise((resolve, reject) => {
        let smtpTransport = nodemailer.createTransport({
            host: 'mail.bahloulramesh.ir',
            port: 465,
            secure: true,
            auth: {
                user: 'test1402@bahloulramesh.ir',
                pass: '09146764665bB@'
            }
        })
        let mailOptions = {
            to: _userMail + '',
            from: 'test1402@bahloulramesh.ir',
            subject: 'Verify Code',
            html: `<p>Hi Dear "${_userName}" 🖐 welcome to your website 🌹. your verifyCode is : "${ _verifyCode}"</p>`,
        }
        smtpTransport.sendMail(mailOptions, function (err, sent) {
            if (err){
                console.log("🚀 ~ err:🤢🤔", err)
                resolve(false)
            }
            resolve(true)
        })
    })
}

const mailFuncs = {
    SendVerifyMail,
}
module.exports = mailFuncs