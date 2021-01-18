var express = require('express');  
const fileUpload = require('express-fileupload');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false});
var app = express();

app.use(express.static('public'));


app.use(fileUpload({
    createParentPath:true
}));

app.get('/',function(req,res){
    res.sendFile(__dirname + "/" + "index.html");
});

app.post('/loginpage', urlencodedParser, function(req,res) {
    //Prepare output in JSON format
    console.log(req.body.myusername);
    if (req.body.myusername == 'purple' && req.body.mypassword == '123') {
        res.sendFile(__dirname + '/' + 'profile.html');
    } else {
        res.sendFile(__dirname + '/' + 'register.html');
    }
});

app.post('/registerpage', urlencodedParser, function(req,res) {
    //Prepare output in JSON format
    console.log(req.body);

    console.log(req.files.myphoto.name);
    console.log(req.files.myphoto.size);
    console.log(req.files.myphoto.mimetype);
    req.files.myphoto.mv(__dirname + "/upload/" + req.files.myphoto.name);
    res.end("Registered successfully");
   
});

var server = app.listen(8080, function() {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
});