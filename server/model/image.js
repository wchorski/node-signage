const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/* 
    Image Schema for storing images in the 
    mongodb database
*/
var ImageSchema = new Schema({
    imageName: {
        type: String,
        default: "none",
        required: true
    },
    imageData: {
        type: String,
        required: true
    },
    caption: {
        type: String,
        required: false
    }
});

var Image = mongoose.model('Image', ImageSchema);

module.exports = Image;