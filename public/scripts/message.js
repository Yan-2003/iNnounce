const message = window.location.search

const URLMessage = new URLSearchParams(message)

console.log()


$('#message').html(URLMessage.get('message'))