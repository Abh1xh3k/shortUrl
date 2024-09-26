const shortid = require("shortid");
const URL = require('../models/url')

async function handleGenerateNewShortUrl(req, res) {
    try {

        const body = req.body;
        // console.log(body);
        // return res.json(req.body);
        if (!body.URL) return res.status(400).json({ error: 'url is required' });
        const shortID = shortid();
        await URL.create({
            shortId: shortID,
            redirecturl: body.URL,
            visitedHistory: [],
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