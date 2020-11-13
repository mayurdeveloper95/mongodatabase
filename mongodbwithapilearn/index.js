let express=require('express');
let ex=express();
ex.use(express.json());
let emp=require("./routes/employeeapi");
let mongoose=require('mongoose');

ex.use("/empdetails",emp);

//db connection
mongoose.connect("mongodb://localhost:27017/secondDb",{ useNewUrlParser: true ,useUnifiedTopology: true })
.then(()=>console.log("database connected sucessfully"))
.catch((error)=>console.log(`error found ${error.message}`));


ex.listen(4200,()=>console.log(`connect to port 4200`));