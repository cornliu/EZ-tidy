// import Item from './item'
import mongoose from'mongoose'
const Schema = mongoose.Schema
const UserSchema = new Schema({
    name: String,
    password: String,
    identity: String
})
const User = mongoose.model('user', UserSchema)
export default User