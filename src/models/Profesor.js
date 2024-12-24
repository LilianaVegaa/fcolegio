export default class Profesor {
  constructor(nombres = '', apellidos = '', telefono = '', direccion='', ci = '') {
      this.nombres = nombres;
      this.apellidos = apellidos;
      this.telefono = telefono;
      this.direccion = direccion;
      this.ci = ci;
  }
}
