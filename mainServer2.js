require("./mongoose/mongooseSetup.js");
const express = require("express");
const pug = require("pug");
const mongoose = require("mongoose");
const fs = require("fs");
const { fileUploadModel } = require("./mongoose/mongoose-model/fileUploadModel.js");
const app = express();
const bodyParser = require("body-parser");
const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");
const Grid = require("gridfs-stream");
const methodOverride = require("method-override");
const { imageUploadModel } = require("./mongoose/mongoose-model/imageUploadSChema.js");
const path = require("path");

app.use("/static", express.static("./public"));
app.set("view engine", "pug");
app.set("views", "./views");

// SET STORAGE ENGINE 
const storage = multer.diskStorage({
    destination : "./public/uploads/",
    filename : function(req, file, cb){
        cb(null, file.originalname + "-" + Date.now() + path.extname(file.originalname));
    }
});

function checkFileType(file, cb){
    // EXPRESSION OF RILETYPE 
    const fileTypes = /jpeg|jpg|png|gif/;
    // CHECK THE EXTENSION 
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType = fileTypes.test(file.mimetype);

    if(extname && mimeType){
        return cb(null, true);
    }else{
        return cb(new Error("Error : Images only!"), false);
    }
}

// INITIALIZE THE UPLOAD VARIABLE.
const upload = multer({
    storage,
    limits : { fileSize : 1000000000000 },
    fileFilter : function(request, file, cb){
        checkFileType(file, cb);
    }
}).array("myImage", 4); // .single("myImage") for single file upload 

app.use(bodyParser.urlencoded({extended : false}));

app.get("/", (request, response)=>{
    response.render("home", { titleName : "Simple File Upload App" });
});

app.post("/uploads", (request, response)=>{
    upload(request, response, (error)=>{
        if(error){
            response.render("home", { msg : "Size to large to upload" , titleName : "Error Uploading" });
        }else{
            // if(typeof request.file !== "undefined"){
            //     response.render("home", { msg : "File Uploaded to the Database" ,  imageUrl : `/static/uploads/${request.file.filename}` , msgColor : "bg-success"});
            // }

            response.send({ files : request.files , body : request.body });
        }
    });
});

app.listen(5000, "127.0.0.1", ()=>{
    console.log("Server Running at port 5000");
});













































