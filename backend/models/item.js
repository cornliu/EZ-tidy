// item and location
import mongoose from 'mongoose'
const Schema = mongoose.Schema
const itemSchema = new Schema({
    name: String,
    time: String,
    description: String,
    borrower: String,
    owner:{type: Schema.Types.ObjectId, ref: 'user'}  //user.js
});
const Item = mongoose.model('item', itemSchema);
export default Item