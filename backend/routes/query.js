import express from 'express'
import Item from '../models/item.js'
import Location from '../models/location.js'
import User from '../models/user.js'
const router = express.Router()
router.post('/', async (req, res) => {
    const path = req.body.path
    Location.findOne({ path: path }).populate('locationlist itemlist').exec(async (err, loc) => {
        if (!loc) res.status(404).send(`Path ${path} does not exist!!`)
        else if (loc.locationlist.length > 0) {
            let L_list = []
            for (let i = 0; i < loc.locationlist.length; i++) {
                let temp = ''
                if (loc.locationlist[i].locationlist.length > 0) {
                    temp = 'Location'
                }
                else {
                    temp = 'ShelfTable'
                }
                let a = {
                    title: loc.locationlist[i].name,
                    path: loc.locationlist[i].path,
                    description: loc.locationlist[i].description,
                    template: temp
                }
                L_list.push(a)
            }
            res.send({
                title: loc.name,
                time: loc.time,
                description: loc.description,
                locationlist: L_list,
                path: loc.path,
                itemlist: [],
                template: "Location"
            })
        }
        else if (loc.itemlist.length > 0) {
            let I_list = []
            for (let i = 0; i < loc.itemlist.length; i++) {
                await User.findOne({ _id: loc.itemlist[i].owner }, (err, u) => {
                    let item = {
                        id: loc.itemlist[i]._id,
                        name: loc.itemlist[i].name,
                        time: loc.itemlist[i].time,
                        owner: u.name,
                        description: loc.itemlist[i].description
                    }
                    I_list.push(item)
                })
            }
            res.send({
                title: loc.name,
                time: loc.time,
                description: loc.description,
                locationlist: [],
                path: loc.path,
                itemlist: I_list,
                template: "ShelfTable"
            })
        }
        else {
            res.send({
                title: loc.name,
                time: loc.time,
                description: loc.description,
                path: loc.path,
                locationlist: [],
                itemlist: [],
                template: ""
            })
        }
    })
})
export default router