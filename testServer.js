
const express = require("express");
const app = express();
const pug = require("pug");

app.set("view engine", "pug");
app.set("views", "./views");

app.use("/uploads", (request, response, next)=>{
  console.log("uploads called");
  var data = new Buffer('');
  request.on('data', function(chunk) {
      data = Buffer.concat([data, chunk]);
  });
  request.on('end', function() {
    request.rawBody = data;
    next();
  });
});

app.get("/", (request, response)=>{
  response.render("home");
});

app.post("/uploads", (request, response)=>{
  console.dir(request.rawBody.length);
  response.send("Check the console");
});

app.listen(5000, ()=>{console.log("Server listening on port 5000")});















































