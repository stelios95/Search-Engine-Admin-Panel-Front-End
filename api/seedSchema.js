const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const Schema = mongoose.Schema

//define the seed document schema
const seedSchema = new Schema({
    parentUrl:{
        type: String,
        required: true,
        unique: true
    },
    childrenUrls: [
        {child: String}
    ],
    depth:{
        type: Number,
        required: true
    }
})
seedSchema.plugin(uniqueValidator)
module.exports = mongoose.model('Seed', seedSchema)