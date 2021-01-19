import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors'
import mongoose from 'mongoose'
import Item from './models/item.js'
import Location from './models/location.js'
import User from './models/user.js'
import dotenv from 'dotenv-defaults'
import Addrouter from './routes/add.js'
import Removerouter from './routes/remove.js'
import Queryrouter from './routes/query.js'
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
    await User.findOne({ name: name }, async (err, someone) => {
        if (err) {
            console.error(err);
        }
        else if (someone) {
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
}
const createitem = async (name, time, description, ownername, parentpath) => {
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

            Location.findOne({ path: parentpath }, async (err, loc) => {
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
const createlocation = async (name, template, time, description, path, parentpath = '/') => {
    await Location.findOne({ path: parentpath }, (err, par) => {
        if (err) console.error(err);
        if (!par) console.log(`${parentpath} is not exits`);
        else {
            Location.findOne({ path: path }, async (err, location) => {
                if (err) console.error(err);
                else if (location) console.log(`${location.path} has been created`);
                else {
                    const loc = new Location({
                        name: name,
                        time: time,
                        template: template,
                        description: description,
                        path: path,
                        locationlist: [],
                        itemlist: []
                    })
                    await loc.save((err) => {
                        if (err) console.error(err);
                        else console.log(`${name} is created`);
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

app.use(bodyParser.json())
app.use(cors())
app.get('/', async (req, res) => {
    // console.log('qqq')
    // await createuser('ric', 'qqqq', 'admin')
    // await createlocation('博理','tem1','2020','cool', '/bl', '/')
    // await createlocation('maker空間','tem1','2020','cool', '/bl/mks','/bl')
    // await createitem('tea','2020','cool','ric','/bl/mks')
    res.send('Createeeeee');
});
app.use('/add', Addrouter)
app.use('/query', Queryrouter)
app.use('/remove', Removerouter);
db.once('open', () => {
    app.listen(port, () =>
        console.log(`Example app listening on port ${port}!`)
    );
});