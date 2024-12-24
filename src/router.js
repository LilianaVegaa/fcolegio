import Vue from 'vue'
import Router from 'vue-router'
import AuthLayout from '@/layouts/Auth'
import AppLayout from '@/layouts/App'
import store from '@/store'

Vue.use(Router)

const router = new Router({
  mode: 'history',

  routes: [
    //Inicio
    {
      path: '/',
      component: AppLayout,
      redirect: '/inicio',
      meta: { authRequired: true, hidden: true, breadcrumb: 'Inicio'},
      children: [
        {
          path: '/inicio',
          name: 'Inicio',
          meta: {
            title: 'Inicio',
          },
          component: () => import('./views/dashboard/home'),
        }
      ],
    },

    //profesores
    {
      path: '/gestiones/profesores',
      component: AppLayout,
      meta: { authRequired: true, hidden: true, breadcrumb: 'Profesores' },
      children: [
        {
          path: '/',
          name: 'ListProfesores',
          meta: {
            title: 'Profesores',
          },
          component: () => import('./views/profesores'),
        },
        {
          path: '/gestiones/profesores/nuevo',
          name: 'CreateProfesor',
          meta: {
            title: 'Profesores | Nuevo',
            breadcrumb: 'Nuevo Registro'
          },
          component: () => import('./views/profesores/form')
        },
        {
          path: '/gestiones/profesores/:id/edit',
          name: 'EditProfesor',
          meta: {
            title: 'Profesores | Editar',
            breadcrumb: 'Editar Registro'
          },
          component: () => import('./views/profesores/form'),
        },
      ],
    },

    //tutores
    {
      path: '/gestiones/tutores',
      component: AppLayout,
      meta: { authRequired: true, hidden: true, breadcrumb: 'Tutores' },
      children: [
        {
          path: '/',
          name: 'ListTutores',
          meta: {
            title: 'Tutores',
          },
          component: () => import('./views/tutores'),
        },
        {
          path: '/gestiones/tutores/nuevo',
          name: 'CreateTutor',
          meta: {
            title: 'Tutores | Nuevo',
            breadcrumb: 'Nuevo Registro'
          },
          component: () => import('./views/tutores/form')
        },
        {
          path: '/gestiones/tutores/:id/edit',
          name: 'EditTutor',
          meta: {
            title: 'Tutores | Editar',
            breadcrumb: 'Editar Registro'
          },
          component: () => import('./views/tutores/form'),
        },
      ],
    },

    //estudiantes
    {
      path: '/gestiones/estudiantes',
      component: AppLayout,
      meta: { authRequired: true, hidden: true, breadcrumb: 'Estudiantes' },
      children: [
        {
          path: '/',
          name: 'ListEstudiantes',
          meta: {
            title: 'Estudiantes',
          },
          component: () => import('./views/estudiantes'),
        },
        {
          path: '/gestiones/estudiantes/nuevo',
          name: 'CreateEstudiante',
          meta: {
            title: 'Estudiantes | Nuevo',
            breadcrumb: 'Nuevo Registro'
          },
          component: () => import('./views/estudiantes/form')
        },
        {
          path: '/gestiones/estudiantes/:id/edit',
          name: 'EditEstudiante',
          meta: {
            title: 'Estudiantes | Editar',
            breadcrumb: 'Editar Registro'
          },
          component: () => import('./views/estudiantes/form'),
        },
      ],
    },

    //administrativos
    {
      path: '/gestiones/administrativos',
      component: AppLayout,
      meta: { authRequired: true, hidden: true, breadcrumb: 'Administrativos' },
      children: [
        {
          path: '/',
          name: 'ListAdministrativos',
          meta: {
            title: 'Administrativos',
          },
          component: () => import('./views/administrativos'),
        },
        {
          path: '/gestiones/administrativos/nuevo',
          name: 'CreateAdministrativo',
          meta: {
            title: 'Administrativos | Nuevo',
            breadcrumb: 'Nuevo Registro'
          },
          component: () => import('./views/administrativos/form')
        },
        {
          path: '/gestiones/administrativos/:id/edit',
          name: 'EditAdministrativo',
          meta: {
            title: 'Administrativos | Editar',
            breadcrumb: 'Editar Registro'
          },
          component: () => import('./views/administrativos/form'),
        },
      ],
    },

    //asignaciones
    {
      path: '/gestiones/asignaciones',
      component: AppLayout,
      meta: { authRequired: true, hidden: true, breadcrumb: 'Asignaciones' },
      children: [
        {
          path: '/',
          name: 'ListAsignaciones',
          meta: {
            title: 'Asignaciones',
          },
          component: () => import('./views/asignaciones'),
        },
        {
          path: '/gestiones/asignaciones/nuevo',
          name: 'CreateAsignacion',
          meta: {
            title: 'Asignaciones | Nuevo',
            breadcrumb: 'Nuevo Registro'
          },
          component: () => import('./views/asignaciones/form')
        },
        {
          path: '/gestiones/asignaciones/:id/edit',
          name: 'EditAsignacion',
          meta: {
            title: 'Asignaciones | Editar',
            breadcrumb: 'Editar Registro'
          },
          component: () => import('./views/asignaciones/form'),
        },
      ],
    },

    //asistencias
    {
      path: '/gestiones/asistencias',
      component: AppLayout,
      meta: { authRequired: true, hidden: true, breadcrumb: 'Asistencias' },
      children: [
        {
          path: '/',
          name: 'ListAsistencias',
          meta: {
            title: 'Asistencias',
          },
          component: () => import('./views/asistencias'),
        },
        {
          path: '/gestiones/:gestion/asistencias/:id',
          name: 'CreateAsistencia',
          meta: {
            title: 'Asistencias | Registro',
            breadcrumb: 'Registro'
          },
          component: () => import('./views/asistencias/form')
        },
      ],
    },

    //evaluaciones
    {
      path: '/gestiones/evaluaciones',
      component: AppLayout,
      meta: { authRequired: true, hidden: true, breadcrumb: 'Evaluaciones' },
      children: [
        {
          path: '/',
          name: 'ListEvaluaciones',
          meta: {
            title: 'Evaluaciones',
          },
          component: () => import('./views/evaluaciones'),
        },
        {
          path: '/gestiones/:gestion/evaluaciones/:id',
          name: 'CreateEvaluacion',
          meta: {
            title: 'Evaluaciones | Registro',
            breadcrumb: 'Registro'
          },
          component: () => import('./views/evaluaciones/form')
        },
      ],
    },

    //chatbot
    {
      path: '/gestiones/chatbot',
      component: AppLayout,
      meta: { authRequired: true, hidden: true, breadcrumb: 'ChatBot' },
      children: [
        {
          path: '/',
          name: 'ChatBot',
          meta: {
            title: 'ChatBot',
          },
          component: () => import('./views/chatbots'),
        },
      ],
    },

    //cursos
    {
      path: '/configuracion/cursos',
      component: AppLayout,
      meta: { authRequired: true, hidden: true, breadcrumb: 'Cursos' },
      children: [
        {
          path: '/',
          name: 'ListCursos',
          meta: {
            title: 'Cursos',
          },
          component: () => import('./views/cursos'),
        },
        {
          path: '/configuracion/cursos/nuevo',
          name: 'CreateCurso',
          meta: {
            title: 'Cursos | Nuevo',
            breadcrumb: 'Nuevo Registro'
          },
          component: () => import('./views/cursos/form')
        },
        {
          path: '/configuracion/cursos/:id/edit',
          name: 'EditCurso',
          meta: {
            title: 'Cursos | Editar',
            breadcrumb: 'Editar Registro'
          },
          component: () => import('./views/cursos/form'),
        },
      ],
    },

    //materias
    {
      path: '/configuracion/materias',
      component: AppLayout,
      meta: { authRequired: true, hidden: true, breadcrumb: 'Materias' },
      children: [
        {
          path: '/',
          name: 'ListMaterias',
          meta: {
            title: 'Materias',
          },
          component: () => import('./views/materias'),
        },
        {
          path: '/configuracion/materias/nuevo',
          name: 'CreateMateria',
          meta: {
            title: 'Materias | Nuevo',
            breadcrumb: 'Nuevo Registro'
          },
          component: () => import('./views/materias/form')
        },
        {
          path: '/configuracion/materias/:id/edit',
          name: 'EditMateria',
          meta: {
            title: 'Materias | Editar',
            breadcrumb: 'Editar Registro'
          },
          component: () => import('./views/materias/form'),
        },
      ],
    },

    //gestiones
    {
      path: '/configuracion/gestiones',
      component: AppLayout,
      meta: { authRequired: true, hidden: true, breadcrumb: 'Gestiones' },
      children: [
        {
          path: '/',
          name: 'ListGestiones',
          meta: {
            title: 'Gestiones',
          },
          component: () => import('./views/gestiones'),
        },
        {
          path: '/configuracion/gestiones/nuevo',
          name: 'CreateGestion',
          meta: {
            title: 'Gestiones | Nuevo',
            breadcrumb: 'Nuevo Registro'
          },
          component: () => import('./views/gestiones/form')
        },
        {
          path: '/configuracion/gestiones/:id/edit',
          name: 'EditGestion',
          meta: {
            title: 'Gestiones | Editar',
            breadcrumb: 'Editar Registro'
          },
          component: () => import('./views/gestiones/form'),
        },
      ],
    },

    //periodos
    {
      path: '/configuracion/periodos',
      component: AppLayout,
      meta: { authRequired: true, hidden: true, breadcrumb: 'Periodos' },
      children: [
        {
          path: '/',
          name: 'ListPeriodos',
          meta: {
            title: 'Periodos',
          },
          component: () => import('./views/periodos'),
        },
        {
          path: '/configuracion/periodos/nuevo',
          name: 'CreatePeriodo',
          meta: {
            title: 'Periodos | Nuevo',
            breadcrumb: 'Nuevo Registro'
          },
          component: () => import('./views/periodos/form')
        },
        {
          path: '/configuracion/periodos/:id/edit',
          name: 'EditPeriodo',
          meta: {
            title: 'Periodos | Editar',
            breadcrumb: 'Editar Registro'
          },
          component: () => import('./views/periodos/form'),
        },
      ],
    },

    //Perfiles
    {
      path: '/configuracion/perfiles',
      component: AppLayout,
      meta: { authRequired: true, hidden: true, breadcrumb: 'Perfiles' },
      children: [
        {
          path: '/',
          name: 'ListPerfiles',
          meta: {
            title: 'Perfiles',
          },
          component: () => import('./views/perfiles'),
        },
        {
          path: '/configuracion/perfiles/nuevo',
          name: 'CreatePerfil',
          meta: {
            title: 'Perfiles | Nuevo',
            breadcrumb: 'Nuevo Registro'
          },
          component: () => import('./views/perfiles/form')
        },
        {
          path: '/configuracion/perfiles/:id/edit',
          name: 'EditPerfil',
          meta: {
            title: 'Perfiles | Editar',
            breadcrumb: 'Editar Registro'
          },
          component: () => import('./views/perfiles/form'),
        },
      ],
    },

    //Usuarios
    {
      path: '/configuracion/usuarios',
      component: AppLayout,
      meta: { authRequired: true, hidden: true, breadcrumb: 'Usuarios' },
      children: [
        {
          path: '/',
          name: 'ListUsers',
          meta: {
            title: 'Usuarios',
          },
          component: () => import('./views/users'),
        },
        {
          path: '/configuracion/usuarios/nuevo',
          name: 'CreateUser',
          meta: {
            title: 'Usuarios | Nuevo',
            breadcrumb: 'Nuevo Registro'
          },
          component: () => import('./views/users/form')
        },
        {
          path: '/configuracion/usuarios/perfil',
          name: 'ShowUser',
          meta: {
            title: 'Usuarios | Perfil',
            breadcrumb: 'Perfil'
          },
          component: () => import('./views/users/show'),
        },
        {
          path: '/configuracion/usuarios/password',
          name: 'UserPassword',
          meta: {
            title: 'Usuarios | Password',
          },
          component: () => import('./views/users/password'),
        },
        {
          path: '/configuracion/usuarios/:id/edit',
          name: 'EditUser',
          meta: {
            title: 'Usuarios | Editar',
            breadcrumb: 'Editar Registro'
          },
          component: () => import('./views/users/form'),
        },
      ],
    },

    // System Pages
    {
      path: '/system',
      component: AuthLayout,
      redirect: '/system/login',
      children: [
        {
          path: '/system/login',
          meta: {
            title: 'Login',
            redirectIfLogged: true
          },
          component: () => import('./views/system/login'),
        },
        {
          path: '/system/404',
          meta: {
            title: 'Error 404',
          },
          component: () => import('./views/system/404'),
        },
        {
          path: '/system/403',
          meta: {
            title: 'Error 403',
          },
          component: () => import('./views/system/403'),
        },
      ],
    },

    {
      path: '*', redirect: 'system/404', hidden: true,
    },
  ],
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.authRequired)) {
    if (!store.getters.authenticating) {
      next({
        path: '/system/login',
        query: { redirect: to.fullPath },
      })
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.redirectIfLogged)) {
    if (store.getters.authenticating) {
      next({
        path: '/'
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
