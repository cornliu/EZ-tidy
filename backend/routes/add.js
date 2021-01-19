import express from 'express'
import Item from '../models/item.js'
import Location from '../models/location.js'
import User from '../models/user.js'
const router = express.Router()
router.post('/item', async (req, res) => {
    await User.findOne({ name: req.body.owner }, async (err, user) => {
        if (err) console.error(err);
        else if (!user) {
            console.log(`${req.body.owner} does not exist!!`);
            res.status(404).send(`${req.body.owner} does not exist!!`)
        }
        else {
            await Location.findOne({ path: req.body.path }, async (err, loc) => {
                if (err) console.error(err);
                else if (!loc) {
                    console.log(`Path ${req.body.path} does not exist!!`);
                    res.status(404).send(`Path ${req.body.path} does not exist!!`)
                }
                else if (loc.locationlist.length > 0){
                    console.log(`Locationlist is not empty, you can't add item in this location.`);
                    res.status(405).send(`Locationlist is not empty, you can't add item in this location.`)
                }
                else {
                    const item = new Item({
                        name: req.body.name,
                        time: req.body.time,
                        description: req.body.description,
                        owner: user._id
                    })
                    await item.save((err) => {
                        if (err) console.error(err)
                        console.log(`item ${item._id} is saved`);
                        res.status(200).send(`item ${req.body.name} is saved`)
                    })
                    await loc.updateOne({ itemlist: [...loc.itemlist, item._id], template: "ShelfTable"}, (err, ss) => {
                        if (err) console.error(err);
                    })
                }
            })
        }
    })
})
router.post('/location', async (req,res)=>{
    await Location.findOne({ path: req.body.parentpath }, (err, par) => {
        if (err) console.error(err);
        if (!par) {
            console.log(`${req.body.parentpath} is not exits`);
            res.status(404).send(`Path ${req.body.parentpath} does not exist!!`)
        }
        else {
            Location.findOne({ path: req.body.path }, async (err, location) => {
                if (err) console.error(err);
                else if (location) {
                    console.log(`${location.path} has been created`);
                    res.status(404).send(`Path ${location.path} has been created`)
                }
                else if (par.itemlist.length>0){
                    console.log(`Itemlist is not empty, you can't add location in this location.`);
                    res.status(405).send(`Itemlist is not empty, you can't add location in this location.`)
                }
                else {
                    const loc = new Location({
                        name: req.body.title,
                        time: req.body.time,
                        template: 'Empty',
                        description: req.body.description,
                        path: req.body.path,
                        locationlist: [],
                        itemlist: []
                    })
                    await loc.save((err) => {
                        if (err) console.error(err);
                        console.log(`${req.body.title} is created`);
                        res.status(200).send(`Location ${req.body.title} is saved`)
                    })
                    par.updateOne({ locationlist: [...par.locationlist, loc._id],template: "Location" }, (err, ss) => {
                        if (err) console.error(err);
                    })
                }
            })
        }
    })
})
router.post('/user',async (req, res)=>{
    await User.findOne({name:req.body.name}, async (err,user)=>{
        if (err) console.error(err);
        else if (user){
            console.log(`${user.name} has been created!!`);
            res.status(405).send(`${user.name} has been created!!`)
        }
        else{
            const newuser = new User({
                name: req.body.name,
                password: req.body.password,
                identity: req.body.admin
            })
            await newuser.save((err)=>{
                if (err) console.error(err)
                console.log(`User ${req.body.name} is saved`);
                res.status(200).send(`User ${req.body.name} is saved`)
            })
        }
    })
})
export default router