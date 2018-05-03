const mongoose = require("mongoose");
const Grid = require("gridfs-stream");
const GridFsStorage = require("multer-gridfs-storage");
const path = require("path");
const crypto = require("crypto");
const multer = require("multer");
const EventEmitter = require("events");

// STRATERGY FOR EXPORTING VALUES
const toExport = {};
toExport.__proto__ = EventEmitter.prototype;
module.exports = toExport;

mongoose.Promise = global.Promise;
const database = "fileUpload";
const url = "mongodb://localhost:27017/";

let connection = mongoose.createConnection(url + database);
connection.once("open", function(){
    // INITIALIZE OUR STREAM
    let gfs = Grid(connection.db, mongoose.mongo);
    gfs.collection("uploads");
    module.exports.emit("connected", gfs);
    // all set !
});


let storage = new GridFsStorage({
    url : url + database,
    file : function(request, file){
        return new Promise((resolve, reject)=>{
            crypto.randomBytes(16, (err, buf)=>{
                if(err){
                    return reject(err);
                }

                const filename = buf.toString("hex") + path.extname(file.originalname);
                const fileInfo = {
                    filename : filename,
                    bucketName : "uploads"
                };
                resolve(fileInfo);
            });
        });
    }
});

const upload = multer({
    storage,
    limits : { fileSize : 1024 * 1024 * 10 }
}).array("myImage", 4);
module.exports.upload = upload; 




















