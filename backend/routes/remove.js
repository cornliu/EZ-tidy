import express from 'express'
import Item from '../models/item.js'
import Location from '../models/location.js'
import User from '../models/user.js'
const router = express.Router()
router.get('/All', async (req,res)=>{
    Item.remove({}, () => console.log('All Items have been removed'))
    Location.remove({}, () => console.log('All Locations have been removed'))
    User.remove({}, () => console.log('All Users have been removed'))
    const item = new Location({
        name: 'root',
        time: 'origin',      //time that create this location
        description: 'root of all object',
        template: 'Location',
        path: '/',
        locationlist: [],
        itemlist: []
    })
    item.save((err) => {
        if (err) console.error(err);
        else console.log('root is created');
    })
    res.send('Delete All');
})
export default router