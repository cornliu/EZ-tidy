import express from 'express'
import Item from '../models/item.js'
import Location from '../models/location.js'
import User from '../models/user.js'
const router = express.Router()
router.post('/returnitem', async (req, res) => {
    const item = await Item.findOne({ _id: req.body.id })
    if (item.borrower === req.body.username || req.body.username === 'Admin') {
        await item.update({ borrower: ' ' })
        return res.status(200).send('Return success')
    }
    else {
        console.log('You are not the borrower of this item');
        return res.status(406).send('You are not the borrower of this item')
    }
})

router.post('/item', async (req, res) => {
    if (req.body.name === ''||req.body.name === undefined){
        return res.status(405).send('Something is missing')
    }
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
            borrower: ' ',
            owner: user._id
        })
        console.log(item);
        await item.save((err) => {
            if (err) console.log(err);
        })
        if (req.body.owner === 'Admin') {
            await loc.update({ commonitemlist: [...loc.commonitemlist, item._id], template: "ShelfTable" })
            return res.status(200).send(`item ${req.body.name} is saved in the commonitemlist`)
        }
        else {
            await loc.update({ itemlist: [...loc.itemlist, item._id], template: "ShelfTable" })
            return res.status(200).send(`item ${req.body.name} is saved int the itemlist`)
        }
    }
})
router.post('/location', async (req, res) => {
    if (req.body.title === '' || req.body.title === undefined){
        return res.status(405).send('Something is missing')
    }
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
        else if (par.itemlist.length > 0 || par.commonitemlist.length > 0) {
            console.log(`Itemlist is not empty, you can't add location in this location.`);
            return res.status(405).send(`Itemlist is not empty, you can't add location in this location.`)
        }
        else {
            let image = 'https://www.popdaily.com.tw/shaper/wp-content/uploads/2019/01/5pn9cgij8ko4c0wk884kksg0oqdtbs2-1000x626.jpg'
            if (req.body.image !== '') {
                image = req.body.image
            }
            const loc = new Location({
                name: req.body.title,
                time: req.body.time,
                template: 'Empty',
                description: req.body.description,
                path: req.body.path,
                image: image,
                locationlist: [],
                itemlist: [],
                commonitemlist: []
            })
            await loc.save((err) => {
                if (err) console.error(err);
                console.log(`${req.body.title} is created`);
            })
            // console.log([...par.locationlist, loc._id]);
            // console.log(par);
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
    console.log(req.body.name);
    console.log(req.body.password);
    if (req.body.name === '' || req.body.password === '' || req.body.name === undefined || req.body.password === undefined) {
        return res.status(405).send('Something is missing.')
    }
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