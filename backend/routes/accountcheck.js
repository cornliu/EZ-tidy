import express from 'express'
import Item from '../models/item.js'
import Location from '../models/location.js'
import User from '../models/user.js'
const router = express.Router()
router.post('/', async (req, res) => {
    await User.findOne({ name: req.body.name }, async (err, user) => {
        if (!user) res.status(404).send('User not found!!')
        else if (res.body.password === user.password){
            res.status(200).send(true)
        }
        else res.status(406).send(false)
    })
})
export default router