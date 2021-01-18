// import Item from './item'
import mongoose from'mongoose'
const Schema = mongoose.Schema
const locationSchema = new Schema({
    name: String,
    time: String,      //time that create this location
    description: String,
    locationlist: [{type: Schema.Types.ObjectId, ref: 'location'}],
    itemlist: [{type: Schema.Types.ObjectId, ref: 'item'}]
})
const Location = mongoose.model('location', locationSchema)
export default Location