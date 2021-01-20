import express from 'express'
import Item from '../models/item.js'
import Location from '../models/location.js'
import User from '../models/user.js'
const router = express.Router()
router.post('/', async (req, res) => {
    const path = req.body.path
    console.log(path);
    const loc = await Location.findOne({ path: path }).populate('locationlist itemlist')
    if (!loc) res.status(404).send(`Path ${path} does not exist!!`)
    else if (loc.locationlist.length > 0) {
        let L_list = []
        for (let i = 0; i < loc.locationlist.length; i++) {
            let a = {
                title: loc.locationlist[i].name,
                path: loc.locationlist[i].path,
                id:loc.locationlist[i]._id,
                description: loc.locationlist[i].description,
                template: loc.locationlist[i].template
            }
            L_list.push(a)
        }
        res.send({
            title: loc.name,
            time: loc.time,
            description: loc.description,
            id:loc._id,
            locationlist: L_list,
            path: loc.path,
            itemlist: [],
            template: loc.template
        })
    }
    else if (loc.itemlist.length > 0) {
        let I_list = []
        for (let i = 0; i < loc.itemlist.length; i++) {
            const u = await User.findOne({ _id: loc.itemlist[i].owner })
            let item = {
                id: loc.itemlist[i]._id,
                name: loc.itemlist[i].name,
                time: loc.itemlist[i].time,
                owner: u.name,
                description: loc.itemlist[i].description
            }
            I_list.push(item)

        }
        res.send({
            title: loc.name,
            time: loc.time,
            description: loc.description,
            id:loc._id,
            locationlist: [],
            path: loc.path,
            itemlist: I_list,
            template: loc.template
        })
    }
    else {
        // console.log(loc.description);
        res.send({
            title: loc.name,
            time: loc.time,
            description: loc.description,
            id:loc._id,
            path: loc.path,
            locationlist: [],
            itemlist: [],
            template: loc.template
        })
    }
    await Location.findOne({ path: req.body.path }).exec((err, qq) => {
        console.log(qq);
    })
})
export default router