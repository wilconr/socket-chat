class Usuarios {

    constructor() {
        this.personas = [];
    }

    agregarPersona(id, nombre, grupo) {

        let persona = { id, nombre, grupo };
        this.personas.push(persona);
        return this.personas;

    }

    getPersona(id) {

        let persona = this.personas.filter(persona => persona.id === id)[0];
        return persona;

    }

    getPersonas() {
        return this.personas;
    }

    getPersonasPorGrupo(grupo) {

        let personasEnGrupo = this.personas.filter(persona => persona.grupo === grupo);
        return personasEnGrupo;
    }

    borrarPersona(id) {

        let personaBorrada = this.getPersona(id);
        this.personas = this.personas.filter(persona => persona.id != id);
        return personaBorrada;

    }

}

module.exports = {
    Usuarios
}