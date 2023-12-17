$.ajax({
    type: "get",
    url: "/api/home",
    caches : false,
    success: e =>{
        if(e.message === 'unauthorized'){
            window.location.href = '/pages/login.html?message=unauthorized user.'
        }


        $('#message').html(e)


    }
});