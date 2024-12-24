export default class User {
    constructor(name = '', nombres = '', apellidos = '', telefono = '', direccion='', ci = '', password_current, password = '', password_confirmation = '', perfil_id = null) {
        this.name = name;
        this.nombres = nombres;
        this.apellidos = apellidos;
        this.telefono = telefono;
        this.direccion = direccion;
        this.ci = ci;
        this.password_current = password_current;
        this.password = password;
        this.password_confirmation = password_confirmation;
        this.perfil_id = perfil_id;
    }
}
