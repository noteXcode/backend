const db = require('./models');
const express = require('express');
const app = express()
const cors = require('cors');
require('dotenv').config({path:'./config.env'});

//ORIGINS (WHICH SOURCES CAN CONNECT TO THIS PROJECT)*****
let origins = {
    origin: ['http://localhost:3001', 'https://localhost:6000', 'http://localhost:8000', 'http://localhost:8000']
}





// OPERTAIONS (MAKE TABLES AND...)*****
db.connection.sync({
    alter:true,
	// { drop: false },
    // force : true
}).then(async ()=>{
    // await initiall()
}).catch((_error)=>{
    console.log('DB couldn`t create or change the tables content🎭🤢',_error);
})


// USAGE SECTION*****
app.use(express.json())
app.use(cors(origins))
app.use(express.urlencoded({ extended: true }));


require('./routes')(app)


// test*****************
app.get("/welcome", async (_req, _res) => {
    _res.json({
        message: "welcome to noteXcode apartment"
    })
})

require('./routes')(app);

app.listen(process.env.PORT, () => {
    console.log('you connected to NOTEX ✔😍');
})
