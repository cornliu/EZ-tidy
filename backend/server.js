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
import Checkrouter from './routes/accountcheck.js'
dotenv.config();
const app = express();
app.use(express.static(__dirname + '/../frontend/build'));
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

app.use(bodyParser.json())
app.use(cors())
app.get('/', async (req, res) => { 
    // Location.findOne({path:'/k'}).exec((err,qq)=>{
    //     console.log(qq);
    // }) 
    const item = await Item.findOne({_id:"600923555dc40ddbe5bdb47b"})
    console.log(item);
    // const item = new Item({
    //     name: 'aaa',
    //     time: 'qqqqq',
    //     description: '1234567898765432',
    //     borrower: ' ',
    //     owner: '60091903098e20dbd16f230a'
    // })
    // console.log(item);
    // await item.save((err) => {
    //     console.log(`item ${item._id} is saved`);
    // })
    res.send('Create');
});
app.use('/add', Addrouter)
app.use('/query', Queryrouter)
app.use('/remove', Removerouter);
app.use('/check', Checkrouter)
db.once('open', () => { 
    app.listen(port, () =>
        console.log(`Example app listening on port ${port}!`)
    );
});