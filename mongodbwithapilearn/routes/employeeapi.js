let express=require('express');
let route=express.Router();
let joi=require('joi');
let Employee=require("../schema/emp.schema");


//get data
route.get("/getEmployees",async(req,res)=>
{
let emp=await Employee.find();
res.send(emp);
});

//get data by id
route.get("/getEmp/:id",async(req,res)=>
{
    let ci=await Employee.findById(req.params.id);
    if(!ci){return res.status(403).send({message:"id not found"})};
    res.send({ci});
});

//create data
route.post("/createEmp",async(req,res)=>
{
    let picheck=validateError(req.body);
    if(picheck.error){return res.status(400).send(picheck.error.details[0].message)};
let pi= new Employee({
    fname:req.body.fname,
    lname:req.body.lname,
    position:req.body.position,
    isAvailable:req.body.isAvailable,
    salary:req.body.salary
})
let c=await pi.save();
res.send(c);
});

//update data by id
route.put("/updateEmp/:id",async(req,res)=>
{
    let upcheck=validateError(req.body);
    if(upcheck.error){return res.status(400).send(upcheck.error.details[0].message)}; 

    let ue=await Employee.findById(req.params.id);
    if(!ue){return res.status(404).send({message:"id not found"})};
    ue.fname=req.body.fname;
    ue.position=req.body.position;
    await ue.save();
    res.send({messgae:"data updated",ue});
});


//delete data by id
route.delete("/deleteEmp/:id",async (req,res)=>
{
    let de=await Employee.findByIdAndRemove(req.params.id);
    if(!de){return res.status(404).send({message:"id not found"})};

res.send({message:"data deleted",de});

});

function validateError(error)
{
let schema=joi.object({
id:joi.number(),
fname:joi.string().min(3).max(15).required(),
lname:joi.string().min(3).max(15),
position:joi.string().min(3).max(40).required(),
isAvailable:joi.string(),
salary:joi.number()
})
return schema.validate(error);
}

module.exports=route;