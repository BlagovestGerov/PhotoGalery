const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

let categorySchema = new mongoose.Schema({
    categoryName:{type:String,required:true, unique:true},
    pictures:[{type: ObjectId, ref: 'Picture'}]
})

module.exports = mongoose.model('Category', categorySchema)