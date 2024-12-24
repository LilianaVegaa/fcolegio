import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import user from './user'
import auth from './auth'
import perfil from './perfil'
import loader from './loader'
import settings from './settings'
import message from './message'
import profesor from './profesor'
import tutor from './tutor'
import administrativo from './administrativo'
import estudiante from './estudiante'
import curso from './curso'
import gestion from './gestion'
import materia from './materia'
import trimestre from './trimestre'
import asignacion from './asignacion'
import asistencia from './asistencia'
import evaluacion from './evaluacion'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    perfil,
    loader,
    user,
    settings,
    message,
    profesor,
    tutor,
    administrativo,
    estudiante,
    curso,
    gestion,
    materia,
    trimestre,
    asignacion,
    asistencia,
    evaluacion
  },
  plugins: [createPersistedState()]
})
