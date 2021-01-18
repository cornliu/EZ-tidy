import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors'
import mongoose from 'mongoose'
import Item from './models/item.js'
import Location from './models/location.js'
import User from './models/user.js'
import dotenv from 'dotenv-defaults'
dotenv.config();
const app = express();
const port = process.env.PORT || 4000

if (!process.env.MONGO_URL) {
    console.error('Missing MONGO_URL!!!')
    process.exit(1)
}
const dbOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};
mongoose.connect(process.env.MONGO_URL, dbOptions)
    .then(res => {
        console.log('mongo db connection created')
    })
const db = mongoose.connection;


const createuser = (name, password, identity) => {
    User.countDocuments({name:name}, (err, count)=>{
        if (count) console.log(`User ${name} has been created!!`);
        else{
            const user = new User({
                name: name,
                password: password,
                identity: identity
            })
            user.save((err)=>{
                if (err) console.error(err);
                console.log(`User ${name} is saved`);
            })
            return user
        }
    })
}
const createitem = (name, time, description, owner) => {
    const item = new Item({
        name: name,
        time: time,
        description: description,
        owner: owner
    })
    item.save((err) => {
        if (err) console.error(err)
        console.log(`item ${name} is saved`);
    })
    return item
}
const createlocation = (name, time, description, locationlist, itemlist) => {
    Location.countDocuments({name:name}, (err, count)=>{
        if (count) console.log(`data ${name} exit!!`);
        else{
            const loc = new Location({
                name: name,
                time: time,
                description: description,
                locationlist: locationlist,
                itemlist: itemlist
            })
            loc.save((err) => {
                if (err) console.log(err);
                console.log(`location ${name} is saved`);
            })
            return loc
        }
    })
}
db.once('open', () => {
    app.listen(port, () =>
        console.log(`Example app listening on port ${port}!`)
    );
});
app.use(bodyParser.json())
app.use(cors())
app.get('/', (req, res) => {
    let me = createuser('ric','qqqq','admin')
    let itemid = []
    for(let i=0;i<3;i++){
        itemid.push(createitem(`tea${i}`, '2020/10/11', 'cool', me._id)._id)
    }
    let mks = createlocation('mks', '2020', 'cool', [], itemid)
    let bl = createlocation('bl', '2020', 'cool', [mks._id], [])
    console.log(mks);
    console.log(bl);
    res.send('Create');
});
app.post('/', (req, res) => {
    const path = req.body.path.split('/').slice(1)
    // for (let i=0;i<path.length;i++){
    //     Location.find({name:path[i]}, (err, loc)=>{
    //         if(loc.length === 0) res.status(404).send(`${path[i]} not found!!`)
    //     })
    // }
    // res.send('POST')
    // console.log(Location.findOne({name:path[0]}));
    // Location.findOne({name:path[0]}).populate('locationlist itemlist').exec((err, loc)=>{
    //     const a = loc.locationlist[0]
    //     // console.log(a);
    //     Location.findOne({name:a.name}).populate('locationlist itemlist').exec((err, item)=>{
    //          console.log(item);
    //     })
    // })
    Location.findOne({name:path[path.length-1]}).populate('locationlist itemlist').exec((err,loc)=>{
        res.send(loc);
    })
    // res.send('POST')
});
app.put('/', (req, res) => {
    Item.remove({},()=>console.log('All Items have been removed'))
    Location.remove({},()=>console.log('All Locations have been removed'))
    User.remove({},()=>console.log('All Users have been removed'))
    res.send('Delete All');
});
app.get('/1', (req, res) => {
    Location.countDocuments({name:'ms'}, (err, count)=>{
        if (count) console.log('exit!!');
    })
    res.send('Received a DELETE HTTP method');
});