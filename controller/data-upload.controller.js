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
 
 //console.log(result.Sheet1)
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
    var datas=data
    for(let i in datas){
        var categ=await datas[i].Category
        //console.log(cat)
      await  catogeryModel.findOne({Category_name:categ}).then(async rst=>{
           // console.log(rst,"###",categ)
            
           // console.log(cat)
            if(rst==null){
               // console.log(data[i].Category)
                d={Category_name:categ}
                category = new catogeryModel(d);
                category.save()
            }
           
        }).catch(err=>{
            console.log(err)
        })
    }
  
}

async function saveBrand(data){
    var datas=data
    for(let i in datas){
        var brand=await datas[i].Brand
        //console.log(cat)
      await  brandModel.findOne({brand_name:brand}).then(async rst=>{
            console.log(rst,"###",brand)
            
           // console.log(cat)
            if(rst==null){
               // console.log(data[i].Category)
               d={brand_name:brand}
               data = new brandModel(d);
                data.save()
            }
           
        }).catch(err=>{
            console.log(err)
        })
    }
  
}

async function saveProduct(data){
    let category=[]
    let brand=[]
    let product=data
    category=await catogeryModel.find()
    brand=await brandModel.find()

   // console.log(brand)
    //console.log(category)
for(let k in product){

 for(let c in category){
    if(product[k].Category==category[c].Category_name){
        product[k].Category=  category[c]._id
    }
}
for(let b in brand){
    if(product[k].Brand==brand[b].brand_name){
        product[k].Brand=  brand[b]._id
    }
}
//console.log(product[k])
await productModel.findOneAndUpdate({ART_NO:product[k].ART_NO},product[k]).then(rst=>{
    //console.log(rst)
    if(rst==null){
        prod = new productModel(product[k]);
        prod.save() 
    }else{
        console.log(rst)
    }
}).catch(err=>{
    console.log("err")
})
}

}