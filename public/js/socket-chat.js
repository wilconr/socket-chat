var socket = io();

var params = new URLSearchParams(window.location.search);

if (!params.has('nombre') || !params.has('grupo')) {

    window.location = 'index.html';
    throw new Error('El nombre de usuario y el nombre del grupo son necesario');

}

var usuario = {

    nombre: params.get('nombre'),
    grupo: params.get('grupo')

};

socket.on('connect', function() {

    console.log('Conectado al servidor');

    socket.emit('entrarChat', usuario, function(resp) {
        // console.log(usuario);
        console.log('Usuarios conectados', resp);
        renderizarUsuarios(resp);
        renderizarTituloGrupoChat(usuario);
    });

});

// escuchar
socket.on('disconnect', function() {

    console.log('Perdimos conexión con el servidor');

});


// Enviar información a todos los usuarios
// socket.emit('enviarMensaje', {
//     nombre: 'Wilmer',   
//     mensaje: 'Hola Mundo'
// }, function(resp) {
//     console.log('respuesta server: ', resp);
// });

// Escuchar información 
socket.on('enviarMensaje', function(mensaje) {

    // console.log('Servidor:', mensaje);
    renderizarMensajes(mensaje, false);
    scrollBottom();

});

// Escuchar cuando un usuario se conecta o se desconecta del chat
socket.on('listaPersona', function(personas) {

    console.log(personas);
    renderizarUsuarios(personas);

});

// Mensajes privados

socket.on('mensajePrivado', function(mensaje) {

    console.log('Mensaje privado: ', mensaje);

});