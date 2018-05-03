let mongoose = require("mongoose");
let { Schema } = mongoose;

let fileUploadSchema = new Schema({
    name : String,
    age : Number
});

let fileUploadModel = mongoose.model("fileuploads", fileUploadSchema);

module.exports = { fileUploadModel };



