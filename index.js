const express= require("express");
const app= express();
const {connectMongo}= require('./connect')
const urlRoutes=require('./routes/url')
const PORT= 8001;

connectMongo('mongodb://127.0.0.1:27017/shortUrl').then(()=>console.log("mogodb connected"))
app.use(express.json());
app.use("/url",urlRoutes)

app.listen(PORT,()=>console.log(`server started at port: ${PORT}`))