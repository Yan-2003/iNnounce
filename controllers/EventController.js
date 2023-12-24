const db = require('../database/DB')

class EventController{

    async MakeEvent(event){
    
        const create_event = `INSERT INTO events(title , description , ticket_quantity , event_date) VALUES('${event.title}' , '${event.description}' , '${event.quantity}' , '${event.event_date}')`
    
        const event_tbl = await db.query(create_event)
    
        console.log(event)
        
    
        if(event_tbl.command === 'INSERT'){
            return true
        }else{
            return false
        }
    
    
    }

    async GetEvent(){
        const events = `
        SELECT e.event_id , e.title , e.description , TO_CHAR(e.event_date, 'Mon DD YYYY') AS event_date , ( e.ticket_quantity - COUNT(t.ticket_id) ) ticket_quantity
        FROM events e LEFT JOIN ticket t ON t.event_id = e.event_id
        GROUP BY e.event_id
        `

        const events_data = await db.query(events)
        if(events_data){
            return events_data.rows
        }
        return false
    }

    async GetTicket(user_id , event_id){

        const digits = 10;
        let randomNumber = '';
      
        for (let i = 0; i < digits; i++) {
          const digit = Math.floor(Math.random() * 10);
          randomNumber += digit.toString();
        }

        console.log('ticket no. ' + randomNumber)

        const ticket_ammount = `
            SELECT ( e.ticket_quantity - COUNT(t.ticket_id) ) ticket_quantity
            FROM events e LEFT JOIN ticket t ON t.event_id = e.event_id
            WHERE e.event_id = ${event_id}
            GROUP BY e.event_id

        `
        const get_ammount = await db.query(ticket_ammount)

        console.log('totoal ticket ammount : ' + get_ammount.rows[0].ticket_quantity)

        if((parseInt(get_ammount.rows[0].ticket_quantity) - 1) <= 0 ){
            return false
        }

        const ticket = `INSERT INTO ticket(user_id , event_id , code) VALUES(${user_id}  , ${event_id} , '${randomNumber}' )`

        const getTicket = await db.query(ticket)

        console.log(getTicket)

        if(getTicket.command === 'INSERT'){
            return true
        }else{
            return false
        }

    }


}




module.exports = EventController