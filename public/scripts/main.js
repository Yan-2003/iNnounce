let isLoading = false





isLoading = true
if(isLoading){
    $('#message').html('Loading Events...')
}
$.ajax({
    type: "get",
    url: "/api/home",
    caches : false,
    success: e =>{
        if(e.message === 'unauthorized'){
            window.location.href = '/pages/login.html?message=unauthorized user.'
        }


       


    }
});