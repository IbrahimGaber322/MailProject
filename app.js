const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const client = require("@mailchimp/mailchimp_marketing");
const { json } = require("body-parser");
const app = express();
//const listId = "186a4006c8";
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

client.setConfig({
  apiKey: "5d1a5933494bea448f4f25240be97acb",
  server: "us21",
});

app.post("/", function (req, res) {
  const fName = req.body.firstName;
  const lName = req.body.lastName;
  const eMail = req.body.e_mail;
  const data = {
    update_existing: true ,
    members:[
      {email_address:eMail,
      status: "subscribed",
      merge_fields : {
        FNAME : fName,
        LNAME : lName
      }

      }
    ]
  }
  const jsonData = JSON.stringify(data) ;
  const url = "https://us21.api.mailchimp.com/3.0/lists/186a4006c8" ;
  const options = {
    method: "POST",
    auth: "h:5d1a5933494bea448f4f25240be97acb"
    
  }
const request = https.request(url, options, function(response){
response.on("data", function(data){
  const zaData = JSON.parse(data) ;
console.log(zaData);
console.log(response.statusCode);
var check = zaData.total_created ;
var check2 = zaData.total_updated ;
if (check == 1 || check2 == 1){
  res.sendFile(__dirname+"/success.html");
}
else{
  res.sendFile(__dirname+"/failure.html");
}
});
}) ;

request.write(jsonData);
request.end() ;
  
});

app.post("/fail", function(req, res){
res.redirect("/");
});










app.listen(process.env.PORT || 3000, function(){
  console.log("SERVER IS RUNNING !");
});


//5d1a5933494bea448f4f25240be97acb-us21
