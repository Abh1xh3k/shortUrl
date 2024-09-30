const shortid = require("shortid");
const URL = require('../models/url')

async function handleGenerateNewShortUrl(req, res) {
    try {

        const body = req.body;
        // console.log(body.url);
        
        if (!body.url) return res.status(400).json({ error: 'url is required' });
        const shortID = shortid();
        await URL.create({
            shortId: shortID,
            redirecturl: body.url,
            visitedHistory: [],
            createdBy:req.user._id,   // req.user is coming from middleware 
        })
        return res.render('home',{
            id:shortID,

        })
        // return res.json({ id: shortID });
    }catch(e){
        
        return res.status(404).json({id:false, data: null})
    }
}
async function handleGetAnalytics(req,res){
  const shortId=req.params.shortId;
  const result= await URL.findOne({shortId});
  return res.json({totalClicks:result.visitHistory.length,analytics:result.visitHistory})
}
module.exports = {
    handleGenerateNewShortUrl,
    handleGetAnalytics
}