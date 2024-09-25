const express = require("express");
const app = express();
const { connectMongo } = require('./connect')
const urlRoutes = require('./routes/url')
const PORT = 8001;
const URL = require("./models/url");

connectMongo('mongodb://127.0.0.1:27017/shortUrl').then(() => console.log("mongodb connected"))
app.use(express.json());
app.use("/url", urlRoutes)
app.get('/test' ,async(req,res)=>{
  const allUrl= await URL.find({});
  return res.end(`<html>
    <head></head>
    <body>
    <ol>
    ${allUrl.map(url=>`<li>${url.shortId} - ${url.redirecturl} - ${url.visitHistory.length}</li>`).join('')}
    </ol>
    </body>
    </html>`);
})
app.get('/:shortId', async (req, res) => {
  try {
    const shortId = req.params.shortId;

    const entry = await URL.findOne({
      shortId
    });
    // entry.save()
    console.log(entry);
    // return res.json(entry);
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