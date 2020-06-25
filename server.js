const express = require('express')
const app = express()
const bodyparser=require('body-parser')
require('dotenv').config();
require('./service/db.service')
const port = process.env.PORT;
app.use(bodyparser.urlencoded({ extended: true })); 
var formidable = require('formidable');
var fs = require('fs');
require('./controller/data-upload.controller')

app.get('/', (req, res) => res.sendFile(__dirname +'/index.html'))


function base64_decode(base64str, file) {
    var bitmap = new Buffer(base64str, 'base64');
    fs.writeFileSync("./DATA/"+file, bitmap);
    
}

app.post('/upload',(req,res) => {
    console.log("post called");
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
      //console.log(files);
     // console.log(fields);
      base64_decode(fields.data, 'Data.xlsx'); 
})
})
app.listen(port,()=>{
    console.log(`App listening on port ${port}!`)       
})