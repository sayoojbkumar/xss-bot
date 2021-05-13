var express = require("express")
var assert = require('assert')
var app = express()
var bodyParser = require('body-parser');
const Browser = require("zombie");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'))
Browser.waitDuration = '30s';

browser = new Browser({
    maxWait: 1000,
    waitDuration: 5*1000
});
app.post('/report',function(req,res){
    url=req.body.url;
    browser.visit(url, function() {
        browser.setCookie({ name: 'secret', domain: 'localhost', path:'/' ,value: 'flag{heheheh}'});
        console.log("visiting "+url)
        res.sendFile(__dirname+'/public/response.html')
    })
});
app.get('/',function(req,res){
    res.sendFile(__dirname+'/public/index.html')
})
app.listen(1337,()=>{
    console.log("bot on 1337");
});