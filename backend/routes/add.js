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
                else {
                    const item = new Item({
                        name: req.body.name,
                        time: req.body.time,
                        description: req.body.description,
                        owner: user._id
                    })
                    await item.save((err) => {
                        if (err) console.error(err)
                        console.log(`item ${req.body.name} is saved`);
                        res.status(200).send(`item ${req.body.name} is saved`)
                    })
                    await loc.updateOne({ itemlist: [...loc.itemlist, item._id] }, (err, ss) => {
                        if (err) console.error(err);
                    })
                }
            })
        }
    })
})
export default router