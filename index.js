const express = require("express");
const app = express();
const { connectMongo } = require('./connect')
const urlRoutes = require('./routes/url')
const path = require('path');
const staticRoute=require('./routes/staticRouter')
const userRoutes=require('./routes/user')
const PORT = 8001;
const URL = require("./models/url");
const cookieParser=require('cookie-parser')

const {restrictToLoggedinUserOnly,checkAuth}=require('./middlewares/auth')

connectMongo('mongodb://127.0.0.1:27017/shortUrl').then(() => console.log("mongodb connected"))
app.set("view engine","ejs");

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}))  //for supporting form data
app.set('views' , path.resolve('./views'));
app.use("/url", restrictToLoggedinUserOnly,urlRoutes)
app.get('/test' ,async(req,res)=>{
  const allUrl= await URL.find({});
  console.log(Array.from(allUrl))
  return res.render('home',{
    urls:allUrl,   ////passing variable in ejs
  })
})
app.use('/', checkAuth, staticRoute)
app.use('/user',userRoutes)




app.get('/:shortId', async (req, res) => {
  try {
    const shortId = req.params.shortId;
    
    const entry = await URL.findOne({
      shortId
    });
    if (entry?.redirecturl) {
      
      entry?.visitHistory.push( Date.now() )
      entry.save();
      res.redirect(entry.redirecturl)
    }
    else res.send("Incorrect URL")
  }
  
  catch (error) {
    console.log(error)
    return res.send("Error Occured")
  }
  
})


app.listen(PORT, () => console.log(`server started at port: ${PORT}`))