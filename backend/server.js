import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors'
import mongoose from 'mongoose'
import Item from './models/item.js'
import Location from './models/location.js'
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

// const createlocation = (name, locationlist, itemlist) => {
//     Location.create({
//         name: name,
//         locationlist: locationlist,
//         items: itemlist
//     })
// }
const createitem = (name, time, description, owner) => {
    const a = new Item({
        name: name,
        time: time,
        description: description,
        owner: owner
    })
    a.save((err) => {
        if (err) console.error(err)
        console.log(`item ${name} is saved`);
    })
}
const createlocation = (name, time, description, locationlist, itemlist) => {
    // console.log(locationlist);
    const loc = new Location({
        name: name,
        time: time,
        description: description,
        locationlist: locationlist,
        itemlist: itemlist
    })
    // console.log(loc);
    loc.save((err) => {
        if (err) console.log(err);
        console.log(`location ${name} is saved`);
    })
    return loc
}


// const saveUser = (id, name) => {
//     User.countDocuments({ name }, (err, count) => {
//         if (count)
//             console.log(`data ${name} exists!!`);
//         else {
//             const user = new User({ id, name });
//             user.save((err) => {
//                 if (err) console.error(err);
//                 console.log(`data ${name} saved!!!`);
//             });
//         }
//     });
// };

db.once('open', () => {
    app.listen(port, () =>
        console.log(`Example app listening on port ${port}!`)
    );
});

app.use(bodyParser.json())
app.use(cors())
app.get('/', (req, res) => {
    res.send('Received a GET HTTP method');
});
app.post('/', (req, res) => {
    // Item.deleteMany({},()=>{})
    // Location.deleteMany({},()=>{})
    // createitem('tea', '2020/10/11', 'cool', 'ric')
    Item.find({}).exec((err, item)=>{
        Location
        .findOne({name:'K'})
        .exec((err, loc)=>{
            const newloc = createlocation('K2','2020', 'suck', [loc._id], [item[0]._id])
            console.log(newloc);
        })
        
    })
    
    Location
    .findOne({_id:'6004200bfd074c02d401d095'})
    .populate('itemlist locationlist')
    .exec((err,loc)=>{
        console.log(loc);
    })
    res.send('POST')
});
app.put('/', (req, res) => {
    res.send('Received a PUT HTTP method');
});
app.delete('/', (req, res) => {
    res.send('Received a DELETE HTTP method');
});