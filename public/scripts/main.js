let isLoading = false





isLoading = true
if(isLoading){
    $('#message').html('Loading Events...')
}else{
    $('#message').html('')
}
$.ajax({
    type: "get",
    url: "/api/event",
    caches : false,
    success: e =>{
        if(e.message === 'unauthorized'){
            window.location.href = '/pages/login.html?message=unauthorized user.'
        }

        e.forEach(event_data => {
            $('#events').append(`

            <div id='${event_data.event_id}' class="col-xl-5 col-12 d-flex flex-column bg-body-tertiary p-3 rounded-3">
                <h1>${event_data.title}</h1>
                <h4>Event Date: ${event_data.event_date}</h4>
                <p>${event_data.description}</p>    
                <h3>Tickets : ${event_data.ticket_quantity}</h3>
                <button onclick='getTicket(${event_data.event_id})' class="btn btn-success">Get Ticket</button>
            </div>

            `)
        });

        isLoading = false
       

        if(isLoading){
            $('#message').html('Loading Events...')
        }else{
            $('#message').html('')
        }

    }
});

function getTicket(id){
    $.ajax({
        type: "POST",
        url: "/api/event/getticket",
        data: {id : id},
        success: e => {
            $('#message').html(e.message)
            setTimeout(() => {
                window.location.reload()
            }, 2000);
            console.log(e)
        }
    });
}