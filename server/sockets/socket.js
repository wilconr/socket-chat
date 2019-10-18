const { io } = require('../server');
const { Usuarios } = require('../classes/usuarios');
const { crearMensaje } = require('../utils/utils');

const usuarios = new Usuarios();


io.on('connection', (client) => {

    client.on('entrarChat', (data, callback) => {

        if (!data.nombre || !data.grupo) {
            return callback({
                error: true,
                mensaje: 'El nombre / grupo es necesario'
            });
        }

        client.join(data.grupo);

        usuarios.agregarPersona(client.id, data.nombre, data.grupo);

        client.broadcast.to(data.grupo).emit('listaPersona', usuarios.getPersonasPorGrupo(data.grupo));

        client.broadcast.to(data.grupo).emit('enviarMensaje', crearMensaje('Administrador', `${data.nombre} Ingreso a el chat`));

        callback(usuarios.getPersonasPorGrupo(data.grupo));

    });

    client.on('enviarMensaje', (data, callback) => {

        let persona = usuarios.getPersona(client.id);
        let mensaje = crearMensaje(persona.nombre, data.mensaje);
        client.broadcast.to(persona.grupo).emit('enviarMensaje', mensaje);
        callback(mensaje);
    });

    client.on('disconnect', () => {

        let personaBorrada = usuarios.borrarPersona(client.id);

        client.broadcast.to(personaBorrada.grupo).emit('enviarMensaje', crearMensaje('Administrador', `${personaBorrada.nombre} abandonó el chat`));

        client.broadcast.to(personaBorrada.grupo).emit('listaPersona', usuarios.getPersonasPorGrupo(personaBorrada.grupo));

    });

    client.on('mensajePrivado', data => {

        let persona = usuarios.getPersona(client.id);
        client.broadcast.to(data.para).emit('mensajePrivado', crearMensaje(persona.nombre, data.mensaje));
    });

});