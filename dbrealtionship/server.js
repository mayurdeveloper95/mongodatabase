let express=require('express');
let mongoose=require('mongoose');
let app=express();
app.use(express.json());
let Genre=require("./routes/genre");
let Music=require("./routes/music");
let Customer=require("./routes/customer");
let User=require('./routes/user');
let Fawn=require('fawn');

app.use("/api",Genre);
app.use("/api",Music);
app.use("/api",Customer);
app.use("/api",User);

Fawn.init(mongoose);
//db connection
mongoose.connect("mongodb://localhost:27017/firstDb",{ useNewUrlParser: true ,useUnifiedTopology: true })
.then(()=>console.log("database connected sucessfully"))
.catch((error)=>console.log(`error found ${error.message}`));

app.listen(4900,()=>console.log(`connect to port 4900`));