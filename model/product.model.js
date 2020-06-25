const mongoose = require('mongoose');
const schema = mongoose.Schema;
const  product = new schema({
    ART_NO: {type:Number,required:true},
    SKU_ID: {type:String},
    Special_Category: {type:String},
    Category: {type:String},
    Brand: {type:String},
    Item: {type:String},
    DESCRIPTION: {type:String},
    Pack_size: {type:String},
    Pur_Price: {type:String},
    MRP_PRICE: {type:String},
    
   
});
module.exports = mongoose.model('product',product);
