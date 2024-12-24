export default class Estudiante {
  constructor(nombres = '', apellidos = '', telefono = '', direccion='', ci = '', padre_id = null) {
      this.nombres = nombres;
      this.apellidos = apellidos;
      this.telefono = telefono;
      this.ci = ci;
      this.padre_id = padre_id;
  }
}
