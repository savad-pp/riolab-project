const mongoose = require('mongoose');
const schema = mongoose.Schema;
const  catogery = new schema({
    Catogery_name: {type:String,required:true},
    
   
});
module.exports = mongoose.model('catogery',catogery);
