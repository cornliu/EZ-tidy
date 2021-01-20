import { log } from 'console'
import express from 'express'
import send from 'send'
import Item from '../models/item.js'
import Location from '../models/location.js'
import User from '../models/user.js'
const router = express.Router()
router.post('/item', async (req, res) => {
    for (let i = 0; i < req.body.itemlist.length; i++) {
        await Item.deleteOne({ _id: req.body.itemlist[i] }, (err, ss) => {
            if (!err) console.log(`delete ${req.body.itemlist[i]}`);
        })
    }
    await Location.findOne({ path: req.body.path }, async (err, loc) => {
        if (!loc) console.log(`Can't find ${req.body.path}`);
        let newitemlist = loc.itemlist.filter((v) => {
            return (req.body.itemlist.indexOf(v.toString()) == -1)
        })
        if (newitemlist.length === 0) {
            await loc.updateOne({ itemlist: newitemlist, template:'Empty' }, async (err, ss) => {
                if (err) console.error(err);
                else console.log(loc);
                res.status(200).send('delete done')
            })
        }
        else{
            await loc.updateOne({ itemlist: newitemlist, template:'Empty' }, async (err, ss) => {
                if (err) console.error(err);
                else console.log(loc);
                res.status(200).send('delete done')
            })
        }
    })
    // console.log('26');
    // for (let i = 0; i < req.body.itemlist.length; i++) {
    //     await Item.findOne({ _id: req.body.itemlist[i].id }).exec(async (err, item) => {
    //         if (!item) {
    //             console.log(`${req.body.itemlist[i].id} is not found`);
    //             // return res.status(404).send(`${req.body.itemlist[i].id} is not found`)
    //         }
    //         else {
    //             await Item.deleteOne({ _id: req.body.itemlist[i].id }, () => console.log(`${req.body.itemlist[i].id} has been removed`))
    //             await Location.findOne({ path: req.body.path }, async (err, loc) => {
    //                 console.log(loc);
    //                 const index = loc.itemlist.indexOf(req.body.itemlist[i].id)
    //                 loc.itemlist.splice(index, 1)
    //                 if (loc.itemlist.length === 0) {
    //                     await loc.updateOne({ itemlist: loc.itemlist, template: 'Empty' }, (err, ss) => {
    //                         if (err) console.error(err);
    //                         else console.log(`${loc.name} update complete`);
    //                         // res.send(`${req.body.itemlist[i].id} has been removed`)
    //                     })
    //                 }
    //                 else {
    //                     await loc.updateOne({ itemlist: loc.itemlist }, (err, ss) => {
    //                         if (err) console.error(err);
    //                         else console.log(`${loc.name} update complete`);
    //                         // res.send(`${req.body.itemlist[i].id} has been removed`)
    //                     })
    //                 }
    //             })
    //         }
    //     })
    // }
    // res.send(`Item has been removed`)
})
router.post('/location', async (req, res) => {
    if (req.body.path === '/') {
        console.log(`You can't delete root '/'`);
        res.status(405).send(`You can't delete root '/'`)
    }
    else {
        await Location.findOne({ path: req.body.path }, async (err, loc) => {
            if (loc.itemlist.length > 0 || loc.locationlist.length > 0) {
                console.log(`Something under ${req.body.path}. Check out to prevent deleteing something importment`)
                res.status(405).send(`Something under ${req.body.path}. Check out to prevent deleteing something importment`)
            }
            else {
                await Location.deleteOne({ path: req.body.path }, () => console.log(`${req.body.path} has been removed`))
                await Location.findOne({ path: req.body.parentpath }, async (err, loc) => {
                    let index = -1
                    for (let i=0;i<loc.locationlist.length;i++){
                        if (loc.locationlist[i].toString() === req.body.id){
                            index = i
                        }
                    }
                    console.log(index);
                    loc.locationlist.splice(index, 1)
                    if (loc.locationlist.length === 0) {
                        await loc.updateOne({ locationlist: loc.locationlist, template: 'Empty' }, (err, ss) => {
                            if (err) console.error(err);
                            else console.log(`${loc.name} update complete`);
                            res.send(`${req.body.id} has been removed`)
                        })
                    }
                    else {
                        await loc.updateOne({ itemlist: loc.itemlist }, (err, ss) => {
                            if (err) console.error(err);
                            else console.log(`${loc.name} update complete`);
                            res.send(`${req.body.id} has been removed`)
                        })
                    }
                })
            }
        })
    }

})
router.get('/All', async (req, res) => {
    await Item.remove({}, () => console.log('All Items have been removed'))
    await Location.remove({}, () => console.log('All Locations have been removed'))
    await User.remove({}, () => console.log('All Users have been removed'))
    const item = new Location({
        name: 'root',
        time: 'origin',      //time that create this location
        description: 'root of all object',
        template: 'Location',
        path: '/',
        locationlist: [],
        itemlist: []
    })
    await item.save((err) => {
        if (err) console.error(err);
        else console.log('root is created');
    })
    const newUser = new User({
        name: 'Admin',
        password: 'Admin',
        identity: 'Admin'
    })
    await newUser.save((err) => {
        if (err) console.error(err);
        else console.log('Admin is created');
    })
    res.send('Delete All');
})
export default router