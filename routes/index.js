

module.exports=(app)=>{
    const user = require('./user.route')(app);
    require('./auth.route')(app);
}