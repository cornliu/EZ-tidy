import { log } from 'console'
import express from 'express'
import Item from '../models/item.js'
import Location from '../models/location.js'
import User from '../models/user.js'
const router = express.Router()
router.post('/item', async (req, res) => {
    Item.findOne({ _id: req.body.id }).exec(async (err, item) => {
        if (!item) {
            console.log(`${req.body.id} is not found`);
            res.status(404).send(`${req.body.id} is not found`)
        }
        else {
            await Item.deleteOne({ _id: req.body.id }, () => console.log(`${req.body.id} has been removed`))
            await Location.findOne({ path: req.body.path }, async (err, loc) => {
                console.log(loc);
                const index = loc.itemlist.indexOf(req.body.id)
                loc.itemlist.splice(index, 1)
                if (loc.itemlist.length === 0) {
                    await loc.updateOne({ itemlist: loc.itemlist, template: 'Empty' }, (err, ss) => {
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
})
router.post('/location', async (req, res) => {
    if (req.body.path === '/') {
        console.log(`You can't delete root '/'`);
        res.status(405).send(`You can't delete root '/'`)
    }
    else {
        await Location.findOne({ path: req.body.path }, async (err, loc) => {
            if (loc.itemlist.length > 0 || loc.locationlist.length > 0) {
                console.log(`Something under ${req.body.path}. Check out to prevent deleteing something importment`);
                res.status(405).send(`Something under ${req.body.path}. Check out to prevent deleteing something importment`)
            }
            else {
                await Location.deleteOne({ path: req.body.path }, () => console.log(`${req.body.path} has been removed`))
                await Location.findOne({ path: req.body.parentpath }, async (err, loc) => {
                    console.log(loc);
                    const index = loc.locationlist.indexOf(req.body.id)
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
    res.send('Delete All');
})
export default router