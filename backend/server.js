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


const createuser = async (name, password, identity) => {
    // try{
    await User.findOne({ name: name }, async (err, someone) => {
        if (someone) {
            console.log(`User ${name} has been created!!`);
        }
        else {
            const user = new User({
                name: name,
                password: password,
                identity: identity
            })
            try {
                await user.save((err) => {
                    if (err) console.error(err);
                    console.log(`User ${name} is saved`);
                })
            } catch (err) {
                console.log('err' + err);
            }

        }
    })
    // }catch(err){console.log('err' + err);}
}
const createitem = async (name, time, description, ownername, parent) => {
    await User.findOne({ name: ownername }, async (err, user) => {
        // console.log(user);
        if (err) console.error(err);
        else {
            // console.log(user._id);
            const item = new Item({
                name: name,
                time: time,
                description: description,
                owner: user._id
            })
            await item.save((err) => {
                if (err) console.error(err)
                console.log(`item ${name} is saved`);
            })

            Location.findOne({ name: parent }, async (err, loc) => {
                // console.log(loc);
                if (err) console.error(err);
                await loc.updateOne({ itemlist: [...loc.itemlist, item._id] }, (err, ss) => {
                    if (err) console.error(err);
                    // else console.log('success:', ss);
                })
            })
        }
    })
}
const createlocation = async (name, template, time, description, parent = 'root') => {
    await Location.findOne({ name: parent }, (err, par) => {
        if (err) console.error(err);
        if (!par) console.log(`${parent} is not exits 76`);
        else {
            Location.findOne({ name: name }, async (err, location) => {
                if (err) console.error(err);
                else if (location) console.log(`${location} has been created`);
                else {
                    const loc = new Location({
                        name: name,
                        time: time,
                        template: template,
                        description: description,
                        locationlist: [],
                        itemlist: []
                    })
                    await loc.save((err) => {
                        if (err) console.error(err);
                        else console.log(`${name} is created 92`);
                    })
                    par.updateOne({ locationlist: [...par.locationlist, loc._id] }, (err, ss) => {
                        if (err) console.error(err);
                        // else console.log('success:', ss);
                    })
                }
            })
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
app.get('/', async (req, res) => {
    // try{
    //     await createuser('ric', 'qqqq', 'admin')
    // }catch(err){
    //     console.log(err);
    // }

    // console.log('qqq')
    // await createuser('ric', 'qqqq', 'admin')
    // await createlocation('bl','tem1','2020','cool', 'root')
    // await createlocation('mks','tem1','2020','cool','bl')
    // await createitem('tea','2020','cool','ric','mks')
    res.send('Create');
});
app.post('/', (req, res) => {
    const path = req.body.path.split('/').slice(1)
    if (path.length === 1 && path[0] === '') {
        Location.findOne({ name: 'root' }).populate('locationlist').exec((err, loc) => {
            let L_list = []
            for (let i = 0; i < loc.locationlist.length; i++) {
                let temp = ''
                if (loc.locationlist[i].locationlist.length > 0) {
                    temp = 'Location'
                }
                else {
                    temp = 'ShelfTable'
                }
                let a = {
                    title: loc.locationlist[i].name,
                    description: loc.locationlist[i].description,
                    template: temp
                }
                L_list.push(a)
            }
            res.send({
                title: loc.name,
                locationlist: L_list,
                itemlist: [],
                template: "Location"
            })
        })
    }
    else {
        Location.findOne({ name: path[path.length - 1] }).populate('locationlist itemlist owner').exec(async (err, loc) => {
            if (loc.locationlist.length > 0) {
                let L_list = []
                for (let i = 0; i < loc.locationlist.length; i++) {
                    let temp = ''
                    if (loc.locationlist[i].locationlist.length > 0) {
                        temp = 'Location'
                    }
                    else {
                        temp = 'ShelfTable'
                    }
                    let a = {
                        title: loc.locationlist[i].name,
                        description: loc.locationlist[i].description,
                        template: temp
                    }
                    L_list.push(a)
                }
                res.send({
                    title: loc.name,
                    locationlist: L_list,
                    itemlist: [],
                    template: "Location"
                })
            }
            else if (loc.itemlist.length > 0) {
                let I_list = []
                for (let i = 0; i < loc.itemlist.length; i++) {
                    await User.findOne({ _id: loc.itemlist[i].owner }, (err, u) => {
                        let item = {
                            id: loc.itemlist[i]._id,
                            name: loc.itemlist[i].name,
                            time: loc.itemlist[i].time,
                            owner: u.name,
                            description: loc.itemlist[i].description
                        }
                        I_list.push(item)
                    })
                }
                res.send({
                    title: loc.name,
                    locationlist: [],
                    itemlist: I_list,
                    template: "ShelfTable"
                })
            }
            else {
                res.send({
                    title: loc.name,
                    locationlist: [],
                    itemlist: [],
                    template: ""
                })
            }
        })
    }
});
app.put('/', (req, res) => {
    Item.remove({}, () => console.log('All Items have been removed'))
    Location.remove({}, () => console.log('All Locations have been removed'))
    User.remove({}, () => console.log('All Users have been removed'))
    const item = new Location({
        name: 'root',
        time: 'origin',      //time that create this location
        description: 'root of all object',
        template: '',
        locationlist: [],
        itemlist: []
    })
    item.save((err) => {
        if (err) console.error(err);
        else console.log('root is created');
    })
    res.send('Delete All');
});
app.get('/1', (req, res) => {
    Location.countDocuments({ name: 'ms' }, (err, count) => {
        if (count) console.log('exit!!');
    })
    res.send('Received a DELETE HTTP method');
});