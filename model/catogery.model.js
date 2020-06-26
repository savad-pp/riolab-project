const mongoose = require('mongoose');
const schema = mongoose.Schema;
const  catogery = new schema({
    Category_name: {type:String,unique:true},
    
   
});
module.exports = mongoose.model('catogery',catogery);
