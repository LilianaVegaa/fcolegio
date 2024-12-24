export const getMenuData = [
  {
    category: true,
    title: 'Panel de Control',
  },
  {
    title: 'Inicio',
    key: 'inicio',
    icon: 'fa fa-home',
    url: '/inicio',
    permission: 'all'
  },
  {
    category: true,
    title: 'Gestiones',
  },
  {
    title: 'Profesores',
    key: 'profesores',
    icon: 'fa fa-address-book-o',
    url: '/gestiones/profesores',
    children: [
      {
        title: 'registrar nuevo',
        key: 'profesoresNuevo',
        url: '/gestiones/profesores/nuevo',
        permission: 'profesores.create'
      },
      {
        title: 'ver lista',
        key: 'profesores',
        url: '/gestiones/profesores',
        permission: 'profesores.index'
      },
    ],
  },
  {
    title: 'Tutores',
    key: 'tutores',
    icon: 'fa fa-user-circle-o',
    url: '/gestiones/tutores',
    children: [
      {
        title: 'registrar nuevo',
        key: 'tutoresNuevo',
        url: '/gestiones/tutores/nuevo',
        permission: 'padres.create'
      },
      {
        title: 'ver lista',
        key: 'tutores',
        url: '/gestiones/tutores',
        permission: 'padres.index'
      },
    ],
  },
  {
    title: 'Estudiantes',
    key: 'estudiantes',
    icon: 'fa fa-pencil',
    url: '/gestiones/estudiantes',
    children: [
      {
        title: 'registrar nuevo',
        key: 'estudiantesNuevo',
        url: '/gestiones/estudiantes/nuevo',
        permission: 'estudiantes.create'
      },
      {
        title: 'ver lista',
        key: 'estudiantes',
        url: '/gestiones/estudiantes',
        permission: 'estudiantes.index'
      },
    ],
  },
  {
    title: 'Administrativos',
    key: 'administrativos',
    icon: 'fa fa-group',
    url: '/gestiones/administrativos',
    children: [
      {
        title: 'registrar nuevo',
        key: 'administrativosNuevo',
        url: '/gestiones/administrativos/nuevo',
        permission: 'administrativos.create'
      },
      {
        title: 'ver lista',
        key: 'administrativos',
        url: '/gestiones/administrativos',
        permission: 'administrativos.index'
      },
    ],
  },
  {
    title: 'Asignaciones',
    key: 'asignaciones',
    icon: 'fa fa-calendar-check-o',
    url: '/gestiones/asignaciones',
    children: [
      {
        title: 'registrar nuevo',
        key: 'asignacionesNuevo',
        url: '/gestiones/asignaciones/nuevo',
        permission: 'asignaciones.create'
      },
      {
        title: 'ver lista',
        key: 'asignaciones',
        url: '/gestiones/asignaciones',
        permission: 'asignaciones.index'
      },
    ],
  },
  {
    title: 'Asistencias',
    key: 'asistencias',
    icon: 'fa fa-calendar',
    url: '/gestiones/asistencias',
    children: [
      {
        title: 'ver lista',
        key: 'asistencias',
        url: '/gestiones/asistencias',
        permission: 'asistencias.index'
      },
    ],
  },
  {
    title: 'Evaluaciones',
    key: 'evaluaciones',
    icon: 'fa fa-list-alt',
    url: '/gestiones/evaluaciones',
    children: [
      {
        title: 'ver lista',
        key: 'evaluaciones',
        url: '/gestiones/evaluaciones',
        permission: 'evaluaciones.index'
      },
    ],
  },
  {
    title: 'ChatBot',
    key: 'chatbot',
    icon: 'fa fa-comments',
    url: '/gestiones/chatbot',
    permission: 'evaluaciones.index'
  },
  {
    category: true,
    title: 'Administración',
  },
  // {
  //   title: 'Reportes',
  //   key: 'reportes',
  //   icon: 'fa fa-line-chart',
  //   url: '/reportes',
  //   permission: 'reports.index'
  // },
  {
    title: 'Configuración',
    key: 'configuracion',
    icon: 'fa fa-gear',
    children: [
      {
        title: 'Periodos',
        key: 'periodos',
        url: '/configuracion/periodos',
        permission: 'trimestres.index'
      },
      {
        title: 'Cursos',
        key: 'cursos',
        url: '/configuracion/cursos',
        permission: 'cursos.index'
      },
      {
        title: 'Materias',
        key: 'materias',
        url: '/configuracion/materias',
        permission: 'materias.index'
      },
      {
        title: 'Gestiones',
        key: 'gestiones',
        url: '/configuracion/gestiones',
        permission: 'gestiones.index'
      },
      {
        title: 'Perfiles',
        key: 'perfiles',
        url: '/configuracion/perfiles',
        permission: 'perfiles.index'
      },
    ],
  },
]
