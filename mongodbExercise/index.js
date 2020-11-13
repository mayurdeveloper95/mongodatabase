let mongoose=require('mongoose');

mongoose.connect("mongodb://localhost:27017/mongo-exercises",{ useNewUrlParser: true ,useUnifiedTopology: true })
.then(()=>console.log("db connected sucessfully"))
.catch((err)=>console.log(`somethin went wrong ,${err.message}`));

let schema=mongoose.Schema({
_id:{type:Number},
tags:[String],
date:{type:Date},
name:{type:String},
author:{type:String},
isPublished:{type:Boolean},
price:{type:Number}
});

let ec=mongoose.model("courses",schema);

//1
async function getData()
{
    let gc=await ec
                    .find({isPublished:true})
                    .find({tags:"backend"})
                    .select("name author")
                    .sort("name")
                    console.log(gc);
}
getData();

//2
async function getData2()
{
    let gc1=await ec
                    .find({isPublished:true})
                    .select("name author")
                    .sort("-price")
                    console.log(gc1);
}
getData2();

//3
async function getData3()
{
    let gc2=await ec
                    .find({isPublished:true})
                    .or([{price:
                    {$gte:15}
                    },{name:/.*by.*/}])
                    console.log(gc2)
}
getData3();