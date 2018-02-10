const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId
const commentSchema = mongoose.model('Comment').schema
//TODO 
//category = category required

const picture = new mongoose.Schema({
    title: {type: String, required: true},
    location: {type: String, required: true},
    image: {type: String, required:true},
    category: {type: String},
    description:{type:String},
    like:[{type: ObjectId, ref: 'User'}],
    viewCounter:{type:Number, default: 0},
    dateCreation: {type: Date, required: true},
    comments: [commentSchema]
})
module.exports = mongoose.model('Picture', picture)