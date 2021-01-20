import express from 'express'
import Item from '../models/item.js'
import Location from '../models/location.js'
import User from '../models/user.js'
const router = express.Router()
router.post('/item', async (req, res) => {
    if (req.body.path === '/') {
        return res.status(405).send("You can't put any item in the root.")
    }
    const user = await User.findOne({ name: req.body.owner })
    if (!user) {
        console.log(`${req.body.owner} does not exist!!`);
        return res.status(404).send(`${req.body.owner} does not exist!!`)
    }
    const loc = await Location.findOne({ path: req.body.path })
    if (!loc) {
        console.log(`Path ${req.body.path} does not exist!!`);
        return res.status(404).send(`Path ${req.body.path} does not exist!!`)
    }
    else if (loc.locationlist.length > 0) {
        console.log(`Locationlist is not empty, you can't add item in this location.`);
        return res.status(405).send(`Locationlist is not empty, you can't add item in this location.`)
    }
    else {
        const item = new Item({
            name: req.body.name,
            time: req.body.time,
            description: req.body.description,
            owner: user._id
        })
        await item.save((err) => {
            console.log(`item ${item._id} is saved`);
        })
        // await Location.updateOne({ path: loc.path }, { $set: { itemlist: [...loc.itemlist, item._id], template: "ShelfTable" } })
        await loc.update({ itemlist: [...loc.itemlist, item._id], template: "ShelfTable" })
        return res.status(200).send(`item ${req.body.name} is saved`)
    }


})
router.post('/location', async (req, res) => {
    const user = await User.findOne({ name: req.body.username })
    if (user.identity === 'Admin') {
        const par = await Location.findOne({ path: req.body.parentpath })
        if (!par) {
            console.log(`${req.body.parentpath} is not exits`);
            return res.status(404).send(`Path ${req.body.parentpath} does not exist!!`)
        }
        const location = await Location.findOne({ path: req.body.path })
        if (location) {
            console.log(`${location.path} has been created`);
            return res.status(404).send(`Path ${location.path} has been created`)
        }
        else if (par.itemlist.length > 0) {
            console.log(`Itemlist is not empty, you can't add location in this location.`);
            return res.status(405).send(`Itemlist is not empty, you can't add location in this location.`)
        }
        else {
            console.log('==============');
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
            })
            console.log([...par.locationlist, loc._id]);
            console.log(par);
            // Location.updateOne({ path: req.body.parentpath }, { $set: { locationlist: [...par.locationlist, loc._id], template: "Location" } })
            await par.update({ locationlist: [...par.locationlist, loc._id], template: "Location" })
            return res.status(200).send(`Location ${req.body.title} is saved`)
        }
    }
    else {
        console.log("User's identity is not Admin, user can't remove location.");
        return res.status(403).send("User's identity is not Admin, user can't remove location.")
    }

})
router.post('/user', async (req, res) => {
    const user = await User.findOne({ name: req.body.name })
    if (user) {
        console.log(`${user.name} has been created!!`);
        return res.status(405).send(`${user.name} has been created!!`)
    }
    else {
        const newuser = new User({
            name: req.body.name,
            password: req.body.password,
            identity: req.body.admin
        })
        await newuser.save((err) => {
            if (err) console.error(err)
            console.log(`User ${req.body.name} is saved`);
            return res.status(200).send(`User ${req.body.name} is saved`)
        })
    }
})
export default router