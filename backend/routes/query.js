import express from 'express'
import Item from '../models/item.js'
import Location from '../models/location.js'
import User from '../models/user.js'
const router = express.Router()
router.post('/', async (req, res) => {
    const path = req.body.path
    // console.log(path);
    const loc = await Location.findOne({ path: path }).populate('locationlist itemlist commonitemlist')
    if (!loc) res.status(404).send(`Path ${path} does not exist!!`)
    else if (loc.locationlist.length > 0) {
        let L_list = []
        for (let i = 0; i < loc.locationlist.length; i++) {
            let a = {
                title: loc.locationlist[i].name,
                path: loc.locationlist[i].path,
                id: loc.locationlist[i]._id,
                image: loc.locationlist[i].image,
                description: loc.locationlist[i].description,
                template: loc.locationlist[i].template
            }
            L_list.push(a)
        }
        res.send({
            title: loc.name,
            time: loc.time,
            description: loc.description,
            id: loc._id,
            locationlist: L_list,
            path: loc.path,
            itemlist: [],
            commonitemlist: [],
            template: loc.template
        })
    } 
    else if (loc.itemlist.length > 0 || loc.commonitemlist.length > 0) {
        console.log('2');
        let I_list = []
        for (let i = 0; i < loc.itemlist.length; i++) {
            console.log('aaaa');
            const u = await User.findOne({ _id: loc.itemlist[i].owner })
            let item = {
                id: loc.itemlist[i]._id,
                name: loc.itemlist[i].name,
                time: loc.itemlist[i].time,
                owner: u.name, 
                borrower:loc.itemlist[i].borrower,
                description: loc.itemlist[i].description
            }
            I_list.push(item)
        }
        let CI_list = []
        for (let i = 0; i < loc.commonitemlist.length; i++) {
            // console.log(loc.commonitemlist[i].owner);
            const uu = await User.findOne({ _id: loc.commonitemlist[i].owner })
            let commonitem = {
                id: loc.commonitemlist[i]._id,
                name: loc.commonitemlist[i].name,
                time: loc.commonitemlist[i].time,
                owner: uu.name,
                borrower:loc.commonitemlist[i].borrower,
                description: loc.commonitemlist[i].description
            }
            CI_list.push(commonitem)
        }
        res.send({ 
            title: loc.name,
            time: loc.time,
            description: loc.description,
            id: loc._id,
            locationlist: [],
            path: loc.path,
            itemlist: I_list,
            commonitemlist: CI_list,
            template: loc.template
        })
    }
    else {
        console.log(loc.commonitemlist);
        console.log('3');
        res.send({
            title: loc.name,
            time: loc.time,
            description: loc.description,
            id: loc._id,
            path: loc.path,
            locationlist: [],
            commonitemlist: [],
            itemlist: [],
            template: loc.template
        })
    }
})
export default router