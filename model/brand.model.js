const mongoose = require('mongoose');
const schema = mongoose.Schema;
const  brand = new schema({
    brand_name: {type:String,required:true},
    
   
});
module.exports = mongoose.model('brand',brand);
