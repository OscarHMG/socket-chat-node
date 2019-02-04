//Funtions to renders the users connected

function renderUsers(users) {

    var params = new URLSearchParams(window.location.search);

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