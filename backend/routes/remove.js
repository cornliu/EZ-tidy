import { log } from 'console'
import express from 'express'
import send from 'send'
import Item from '../models/item.js'
import Location from '../models/location.js'
import User from '../models/user.js'
const router = express.Router()
router.post('/item', async (req, res) => {
    const checkitem = await Item.findOne({ _id: req.body.itemlist[0] }).populate('owner')
    if (checkitem.owner.name === 'Admin' && req.body.identity === 'User') {
        for (let i = 0; i < req.body.itemlist.length; i++) {
            let item = await Item.findOne({ _id: req.body.itemlist[i] }).populate('owner')
            await item.update({ borrower: req.body.username },(err)=>{
                if (err) console.log(err);
            })
            return res.status(200).send('Borrow success')
        }
    }
    else {
        for (let i = 0; i < req.body.itemlist.length; i++) {
            let item = await Item.findOne({ _id: req.body.itemlist[i] }).populate('owner')
            console.log(item.owner);
            if (req.body.username !== item.owner.name && req.body.identity !== 'Admin') {
                return res.status(403).send('There are something not belongs to you!!')
            }
        }
        for (let i = 0; i < req.body.itemlist.length; i++) {
            await Item.deleteOne({ _id: req.body.itemlist[i] }, (err, ss) => {
                if (!err) console.log(`delete ${req.body.itemlist[i]}`);
            })
        }
        const loc = await Location.findOne({ path: req.body.path })
        if (!loc) {
            console.log(`Can't find ${req.body.path}`);
            return res.status(404).send(`Can't find ${req.body.path}`)
        }

        if (checkitem.owner.name === 'Admin') {
            let newitemlist = loc.commonitemlist.filter((v) => {
                return (req.body.itemlist.indexOf(v.toString()) == -1)
            })
            console.log(newitemlist);
            if (newitemlist.length === 0 && loc.path !== '/' && loc.itemlist.length === 0) {
                await loc.update({ commonitemlist: newitemlist, template: 'Empty' }, async (err, ss) => {
                    if (err) console.error(err);
                    else console.log(loc);
                    return res.status(200).send('delete done')
                })
            }
            else {
                await loc.update({ commonitemlist: newitemlist }, async (err, ss) => {
                    if (err) console.error(err);
                    else console.log(loc);
                    return res.status(200).send('delete done')
                })
            }
        }
        else {
            let newitemlist = loc.itemlist.filter((v) => {
                return (req.body.itemlist.indexOf(v.toString()) == -1)
            })
            console.log(newitemlist);
            if (newitemlist.length === 0 && loc.path !== '/' && loc.commonitemlist.length === 0) {
                await loc.update({ itemlist: newitemlist, template: 'Empty' }, async (err, ss) => {
                    if (err) console.error(err);
                    else console.log(loc);
                    return res.status(200).send('delete done')
                })
            }
            else {
                await loc.update({ itemlist: newitemlist }, async (err, ss) => {
                    if (err) console.error(err);
                    else console.log(loc);
                    return res.status(200).send('delete done')
                })
            }
        }
    }
})
router.post('/location', async (req, res) => {
    if (req.body.path === '/') {
        console.log(`You can't delete root '/'`);
        return res.status(405).send(`You can't delete root '/'`)
    }
    const user = await User.findOne({ name: req.body.username })
    if (user.identity !== 'Admin') {
        return res.status(403).send(`You are not admin, you can't delete Location.`)
    }
    const loc = await Location.findOne({ path: req.body.path })
    if (loc.itemlist.length > 0 || loc.locationlist.length > 0 || loc.commonitemlist.length > 0) {
        console.log(`Something under ${req.body.path}. Check out to prevent deleteing something importment`)
        return res.status(405).send(`Something under ${req.body.path}. Check out to prevent deleteing something importment`)
    }
    await Location.deleteOne({ path: req.body.path }, () => console.log(`${req.body.path} has been removed`))
    const parentloc = await Location.findOne({ path: req.body.parentpath })
    let index = -1
    for (let i = 0; i < parentloc.locationlist.length; i++) {
        if (parentloc.locationlist[i].toString() === req.body.id) {
            index = i
        }
    }
    parentloc.locationlist.splice(index, 1)
    if (parentloc.locationlist.length === 0 && parentloc.path !== '/') {
        await parentloc.update({ locationlist: parentloc.locationlist, template: 'Empty' })
        console.log(`${parentloc.name} update complete`);
        return res.send(`${req.body.id} has been removed`)
    }
    else {
        await parentloc.update({ locationlist: parentloc.locationlist })
        console.log(`${parentloc.name} update complete`);
        return res.send(`${req.body.id} has been removed`)
    }



})
router.get('/All', async (req, res) => {
    await Item.remove({}, () => console.log('All Items have been removed'))
    await Location.remove({}, () => console.log('All Locations have been removed'))
    await User.remove({}, () => console.log('All Users have been removed'))
    const item = new Location({
        name: 'HOME',
        time: 'origin',      //time that create this location
        description: '',
        template: 'Location',
        path: '/',
        locationlist: [],
        itemlist: [],
        commonitemlist: []
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
    return res.send('Delete All');
})
export default router