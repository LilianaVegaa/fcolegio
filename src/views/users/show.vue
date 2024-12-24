<template>
  <fieldset class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
    <legend>Mis Datos:</legend>
    <a-spin :spinning="success">
      <div class="container">
        <div class="d-flex flex-row-reverse bd-highlight">
          <small><strong>Los campos con (*) son obligatorios.</strong></small>
        </div>
        <b-form @submit.stop.prevent="submit">
          <div class="row">
            <div class="col-12 col-md-12 col-lg-4 col-xl-4">
              <strong>
                <label for="nombres">Nombres* :</label>
              </strong>
              <b-form-group label-for="nombres" :invalid-feedback="errors.first('nombres')" :state="!errors.has('nombres')">
                <b-form-input
                  v-model="user.nombres"
                  :state="errors.has('nombres') ? false : null"
                  v-validate="'required|max:128'"
                  data-vv-name="nombres"
                  data-vv-as="nombre(s)"
                  type="text"
                ></b-form-input>
              </b-form-group>
            </div>
            <div class="col-12 col-md-12 col-lg-4 col-xl-4">
              <strong>
                <label for="apellidos">Apellidos * :</label>
              </strong>
              <b-form-group label-for="apellidos" :invalid-feedback="errors.first('apellidos')" :state="!errors.has('apellidos')">
                <b-form-input
                  v-model="user.apellidos"
                  :state="errors.has('apellidos') ? false : null"
                  v-validate="'required|max:128'"
                  data-vv-name="apellidos"
                  data-vv-as="apellidos"
                  type="text"
                ></b-form-input>
              </b-form-group>
            </div>
            <div class="col-12 col-md-12 col-lg-4 col-xl-4">
              <strong>
                <label for="telefono">Teléfono * :</label>
              </strong>
              <b-form-group label-for="telefono" :invalid-feedback="errors.first('telefono')" :state="!errors.has('telefono')">
                <b-form-input
                  v-model="user.telefono"
                  :state="errors.has('telefono') ? false : null"
                  v-validate="'required|max:32'"
                  data-vv-name="telefono"
                  data-vv-as="teléfono"
                  type="text"
                ></b-form-input>
              </b-form-group>
            </div>
          </div>
          <div class="row">
            <div class="col-12 col-md-12 col-lg-6 col-xl-6">
              <strong>
                <label for="direccion">Dirección * :</label>
              </strong>
              <b-form-group label-for="direccion" :invalid-feedback="errors.first('direccion')" :state="!errors.has('direccion')">
                <b-form-input
                  v-model="user.direccion"
                  :state="errors.has('direccion') ? false : null"
                  v-validate="'required|max:128'"
                  data-vv-name="direccion"
                  data-vv-as="dirección"
                  type="text"
                ></b-form-input>
              </b-form-group>
            </div>
            <div class="col-12 col-md-12 col-lg-6 col-xl-6">
              <strong>
                <label for="ci">CI * :</label>
              </strong>
              <b-form-group label-for="ci" :invalid-feedback="errors.first('ci')" :state="!errors.has('ci')">
                <b-form-input
                  v-model="user.ci"
                  :state="errors.has('ci') ? false : null"
                  v-validate="'required|max:16'"
                  data-vv-name="ci"
                  data-vv-as="CI"
                  type="text"
                ></b-form-input>
              </b-form-group>
            </div>
          </div>
          <div class="row my-2">
            <div class="col-12 col-md-12 col-lg-6 col-xl-6">
              <router-link class="password" to="password">Cambiar Contraseña</router-link>
            </div>
            <div class="col-12 col-md-12 col-lg-6 col-xl-6">
              <b-button
                type="submit"
                class="float-right"
              >Actualizar</b-button>
            </div>
          </div>
        </b-form>
      </div>
    </a-spin>
  </fieldset>
</template>

<script>
  import { mapGetters } from 'vuex'
  import UserService from '../../services/user.service'
  import User from '../../models/User'
  export default {
    data() {
      return {
        user: new User(),
        success: false,
      }
    },

    computed: {
      ...mapGetters([
        'currentUser'
      ])
    },

    mounted(){
      this.user.id = this.currentUser.id
      this.user.nombres = this.currentUser.nombres
      this.user.apellidos = this.currentUser.apellidos
      this.user.telefono = this.currentUser.telefono
      this.user.direccion = this.currentUser.direccion
      this.user.ci = this.currentUser.ci
    },

    methods: {
      submit: async function() {
        this.$validator.errors.clear()
        this.success = true
        try {
          const response = await UserService.updateUser(this.currentUser.id, this.user)
          if (response.status === 200) {
            let data = {
              nombres: response.data.data.nombres,
              apellidos: response.data.data.apellidos,
              telefono: response.data.data.telefono,
              direccion: response.data.data.direccion,
              ci: response.data.data.ci,
            }
            this.$store.dispatch('updateUser', data)
            this.$message.success(response.data.message)
            this.success = false
          }
        } catch (err) {
          if(err.response.status === 422) this.$setErrorsFromResponse(err.response.data)
          this.success = false
        }
      }
    }
  }
</script>
<style scoped>
  .password {
    color: #9e0207;
    text-decoration: underline;
    font-weight: bold;
    font-size: 1.1em;
  }

  fieldset {
    background-color: #e9e4e6;
    border-radius: 4px;
  }

  legend {
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 4px;
    color: #000;
    font-size: 17px;
    font-weight: bold;
    padding: 3px 5px 3px 7px;
    width: auto;
  }
</style>
