const express = require('express')
const routes = express.Router();
const fileUploadController = require('../controller/data-upload.controller');


routes.post('/',()=>{
    console.log("test")
     fileUploadController.fileUpload();
})


module.exports.route = routes;