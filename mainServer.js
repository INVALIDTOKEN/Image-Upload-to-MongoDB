// MONGOOSE AND OTHER SETUP JS FILES
const { upload }  = require("./mongoose/mongooseSetup.js");
const objWithEvents = require("./mongoose/mongooseSetup.js");

// CORE MODULES
const express = require("express");
const pug = require("pug");
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
let gfs = undefined;

objWithEvents.on("connected" , (data)=>{
    console.log("Connected");
    gfs = data;
});

// PARSERS
const bodyParser = require("body-parser");

// EXPRESS SETUP PROPERTISE     
const app = express();
app.use("/static", express.static("./public"));
app.set("view engine", "pug");
app.set("views", "./views");
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());

// MONGOOSE MODELS
const { fileUploadModel } = require("./mongoose/mongoose-model/fileUploadModel.js");
const { imageUploadModel } = require("./mongoose/mongoose-model/imageUploadSChema.js");


// MULTER FOR FILE UPLOAD AND GRIDFS FOR MONGODB FILE LIMIT
const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");
const Grid = require("gridfs-stream");
const methodOverride = require("method-override");
app.use(methodOverride("_method"));

// @ROUTE GET /
// @desc Render home page
app.get("/", (request, response)=>{
    gfs.files.find().toArray((error, files)=>{
		if(error){
			return response.render("home");
		}

		if(!files || files.length === 0){
			return response.render("home");			
		}

		return response.render("home", { files });

	});
});

// @ROUTE POST /uploads
// @desc Uploads files to DB
app.post("/uploads", (request, response)=>{
    upload(request, response, function(error){
        if(error){
            return response.status(404).send({ error : "Error uploading data" });
        }

        return response.send(request.files);
    });
});

// @ROUTE GET /files 
// @desc shows all the files in json format
app.get("/files", (request, response)=>{
    gfs.files.find().toArray((error, files)=>{
        // Check if files
        if(!files || files.length === 0){
            return response.status(404).json({ err : "Cannot get any file" });
        }

        return response.json(files);
    });
});

// @ROUTE GET /files/:filename
// @decs shows the file with the filename

app.get("/files/:filename", (request, response)=>{
    gfs.files.findOne( { filename : request.params.filename } , (error, file)=>{
        if(file === null){
            return response.status(404).send({ error : "No file found" });
        }

        return response.send(file);
    });
});

// @ROUTE GET /images/:filename
// @desc Shows the images for the given fileName

app.get("/image/:filename", (request, response)=>{
    gfs.files.findOne({ filename : request.params.filename }, (error, file )=>{
        if(file === null){
            response.status(404).json({ error : "No file for this filename" });
        }

        if(file.contentType == "image/png" || file.contentType == "image/jpeg" || file.contentType == "image/jpg"){
            let readableStream = gfs.createReadStream(file.filename);
            readableStream.pipe(response);
        }else{
            response.status(404).json({ error : "No Image file present" });
        }
    });
});

app.delete("/files/:id", (request, response)=>{
	gfs.remove( { _id : request.params.id , root : "uploads" }, function(error, gridStore){
		if(error){
			return response.status.send({ error : "error deleting the msg" });
		}

		response.redirect("/");
	});
});

// SERVER LISTEN FUNCTION
app.listen(5000, "127.0.0.1", ()=>{
    console.log("Server Running at port 5000");
});













































