//Funtions to renders the users connected

var params = new URLSearchParams(window.location.search);

function renderUsers(users) {



    var html = '';
    html += '<li>'
    html += '   <a href="javascript:void(0)" class="active"> Chat de <span> ' + params.get('room') + '</span></a>'
    html += '</li>'

    for (var i = 0; i < users.length; i++) {
        html += '<li>'
        html += '<a data-id="' + users[i].id + '" href="javascript:void(0)"><img src="assets/images/users/1.jpg" alt="user-img" class="img-circle"> <span>' + users[i].name + ' <small class="text-success">online</small></span></a>'
        html += '</li>'
    }

    $("#divUsuarios").html(html);
}

//Click event
$("#divUsuarios").on('click', 'a', function() {
    var id = $(this).data('id');
    /* if (id) {

    } */
});

$("#formSendMessage").on('submit', function(evt) {
    evt.preventDefault();
    if ($("#txtMessage").val().trim().length === 0) {
        return;
    }



    socket.emit('sendMessage', {
        name: params.get('name'),
        message: $("#txtMessage").val()
    }, function(resp) {
        $("#txtMessage").val('').focus();
        drawMessageChat(resp, true);
        scrollBottom();
    });

});

function drawMessageChat(message, isMe) {
    var html = '';
    var date = new Date(message.date);
    var hour = date.getHours() + ':' + date.getMinutes();

    var adminClass = 'info';

    if (message.name === 'Admin') {
        adminClass = 'danger';
    }

    if (isMe) {
        html += '<li class="reverse">';
        html += '<div class="chat-content">';
        html += '<h5>' + message.name + '</h5>';
        html += '<div class="box bg-light-inverse">' + message.message + '</div>';
        html += '</div>';
        html += '<div class="chat-img"><img src="assets/images/users/5.jpg" alt="user" /></div>';
        html += '<div class="chat-time">' + hour + '</div>';
        html += '</li>';

    } else {
        html += '<li class="animated fadeIn">'
        if (message.name !== 'Admin') {
            html += '<div class="chat-img"><img src="assets/images/users/1.jpg" alt="user" /></div>'

        }
        html += '<div class="chat-content">'
        html += '<h5>' + message.name + '</h5>'
        html += '<div class="box bg-light-' + adminClass + '">' + message.message + '</div>'
        html += '</div>'
        html += '<div class="chat-time">' + hour + '</div>'
        html += '</li>';
    }

    $("#divChatbox").append(html);



}

function scrollBottom() {

    var divChatbox = $("#divChatbox");
    // selectors
    var newMessage = divChatbox.children('li:last-child');

    // heights
    var clientHeight = divChatbox.prop('clientHeight');
    var scrollTop = divChatbox.prop('scrollTop');
    var scrollHeight = divChatbox.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight() || 0;

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        divChatbox.scrollTop(scrollHeight);
    }
}