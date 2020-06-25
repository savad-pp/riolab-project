const mongoose = require('mongoose')
require('dotenv').config();
const url = process.env.DB_URL;
 mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }).then(res=>{
        console.log('db connected')
    }).catch(err=>{
        console.log('connection error')
        console.log(err)
    });


