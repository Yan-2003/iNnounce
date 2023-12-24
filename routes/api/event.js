const express = require('express')
const router = express.Router()
const EventController = require('../../controllers/EventController')
const auth = require('../../middlewares/auth') 

const Event = new EventController()



router.post('/' , (req, res)=>{


    if(Event.MakeEvent(req.body)) return res.redirect('/pages/eventform.html?message=Event posted Successfull')
    return res.redirect('/pages/eventform.html?message=Event posted Unsuccessfull')

})

router.get('/' , auth, async (req ,res)=>{

    const events = await Event.GetEvent()

    res.send(events)
})


router.post('/getticket', auth, async (req, res)=>{
    const ticket = await Event.GetTicket(req.session.user.user_id, req.session.user.email , req.body.id)

    console.log(ticket)

    if(ticket){
        return res.send({message : 'successfully get a ticket'})
    }

    return res.send({message : 'unsuccessfully to get a ticket'})

})


module.exports = router