const express= require("express"),
app=express(),
cors=require("cors")
PORT=3010;
app.use(cors())
app.use(express.json())
app.use("/",require("./fileRouter"))
// app.listen(procces.env.PORT||PORT,()=>console.log(`connected succesfully to server at port ${PORT}`));
app.listen(PORT,()=>console.log(`connected succesfully to server at port ${PORT}`));
