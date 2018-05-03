
const mongoose = require("mongoose");
const { Schema } = mongoose;

let imageUploadSchema = new Schema({
    img : {
        type : {data : Buffer, contentType : String},
    }
});

const imageUploadModel = mongoose.model("imageUploads", imageUploadSchema);

module.exports = {  imageUploadModel  };























