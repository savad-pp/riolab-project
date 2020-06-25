const excelToJson = require('convert-excel-to-json');
const chokidar = require('chokidar');
const fs = require('fs')
const brandModel=require('../model/brand.model')
const catogeryModel=require('../model/catogery.model')
const productModel=require('../model/product.model')

const watcher = chokidar.watch('./DATA', { persistent: true });
console.log("working")
watcher.on('add', path => importExcelData2MongoDB(path) )

function importExcelData2MongoDB(filePath){
    
const result = excelToJson({
    sourceFile: filePath,
    header:{
        rows: 1
    },
    columnToKey: {
        A: 'ART_NO',
        B: 'SKU_ID',
        C: 'Special_Category',
        D: 'Category',
        E: 'Brand',
        F: 'Item',
        G: 'DESCRIPTION',
        H: 'Pack_size',
        I: 'Pur_Price',
        J: 'MRP_PRICE'
    }
});
 
 console.log(result.Sheet1)
 uploadDataToDb(result.Sheet1,filePath) 
}

async function uploadDataToDb(data,filePath){
    await saveCatogery(data)
    await saveBrand(data)
    await saveProduct(data)

    fs.unlink(filePath, (err) => {
        if (err) {
          console.error(err)
          return
        }
      
        console.log("file removed")
      })
}

async function saveCatogery(data){
    for(let i in data){
        catogeryModel.find().then(async rst=>{
            //console.log(rst)
            if(rst.length==0){
                d={Catogery_name:data[i].Category}
                data = new catogeryModel(d)
                data.save()
            }
            else{
             //console.log("else")
             var cat=data[i].Category
            await catogeryModel.findOne({Catogery_name:data[i].Category}).then(findOne_rst=>{
                 console.log("**",rst)
                 if(findOne_rst==null){
                        d={Catogery_name:cat}
                        data = new catogeryModel(d)
                        data.save()
                 }
             })
           
            }
        }).catch(err=>{
            console.log(err)
        })
    }
  
}

async function saveBrand(data){

}

async function saveProduct(data){

}