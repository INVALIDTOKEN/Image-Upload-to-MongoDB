
const express = require("express");
const app = express();

app.use("/admin", (request, response, next)=>{
  let keyValues = request.headers.cookie.split("; ");
  let object = {};
  keyValues.forEach(function(eachPair){
    let keyValue = eachPair.split("=");
    object[keyValue[0]] = keyValue[1];
  });
  request.cookies = object;
  next();
});

app.get("/", (request, response)=>{
  response.cookie("iceCream", "vanilla", { path : "/admin" , maxAge : 1000 * 60 * 60 * 24 });
  response.cookie("iceCream2", "choclate", { path : "/admin" , maxAge : 1000 * 60 * 60 * 24 });
  response.cookie("iceCream3", "another-choclate", { path : "/admin" , maxAge : 1000 * 60 * 60 * 24 });
  response.send("The Cookie has been set up");
});

app.get("/admin", (request, response)=>{
  console.log(request.cookies);
  response.setHeader("X-admin", "Going-on-vacation");
  response.send("Is the cookie still working ? ");
});

app.listen(5000, ()=>{console.log("Server Running on Port 5000")});


















